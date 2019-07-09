import * as KeyChain from 'react-native-keychain'
import AsyncStorage from '@react-native-community/async-storage';
import { clean_datas } from './NewE3ApiAdapter';

export default class NewE3ApiClient {

    static readonly API_URL = "https://e3new.nctu.edu.tw/webservice/rest/server.php?moodlewsrestformat=json"

    /*
     * Post form to API_URL
     * Throw error if [token not exist / KeyChain error / fetch error]
     */
    private async post(form: { [field: string]: string}) {
        let formData = new FormData()
        Object.keys(form).forEach(field => {
            formData.append(field, form[field])
        })
        // get token
        await KeyChain.getInternetCredentials("NewE3")
          .then(result => {
                if (result) formData.append("wstoken", result.password)
                else throw new Error("Token not exist")
          })
          .catch(err => {
                throw err
          })
        // fetch api
        return fetch(NewE3ApiClient.API_URL, {
            method: 'POST',
            headers: {},
            body: formData,
          })
          .then(response => response.json())
          .then(responseJson => { return responseJson })
          .catch(err => { throw err })
    }

    private async saveUserInfo(studentId: string) {
        let formData = {
            "wsfunction": "core_user_get_users_by_field",
            "values[0]": studentId,
            "field": "username",
        }
        await this.post(formData)
          .then(async result => {
                await AsyncStorage.setItem('newE3UserId', JSON.stringify(result[0].id))
                await AsyncStorage.setItem('studentEmail', JSON.stringify(result[0].email))
                await AsyncStorage.setItem('studentName', JSON.stringify(result[0].fullname))
          })
          .catch(err => { throw err })
    }

    /*
     * Save course info (cname, ename, code, id, startdate, enddate)
     * Save all course announcements
     */
    private async saveCourseInfo() {
        let exist = await AsyncStorage.getItem('newE3UserId')
        if (!exist) { throw new Error("New E3 User ID not exists") }
        let newE3UserId: string = JSON.parse(exist)

        let formData = {
            "wsfunction": "core_enrol_get_users_courses",
            "userid": newE3UserId,
        }

        await this.post(formData)
          .then(async result => {
                let parseList:course_list = {}
                for (let course of result) {
                    let courseCName:string, courseEName:string, courseCode:number, courseSemester: number
                    let courseFullname = course.fullname.split(".")
                    let courseInfo = course.shortname.split(".")

                    if (courseFullname.length >= 3) {
                        courseCName = courseFullname[2].split(/ (.+)/)[0]
                        courseEName = courseFullname[2].split(/ (.+)/)[1]
                    }
                    else {
                        courseCName = courseFullname[0]
                        courseEName = courseFullname[0]
                    }
                    courseCode = Number(courseInfo[1])
                    courseSemester = courseInfo[0]
                    
                    if (parseList[courseSemester] == undefined) parseList[courseSemester] = []
                    let parseCourse: course_type = {
                        cname     : courseCName,
                        ename     : courseEName,
                        code      : courseCode, // defined by school
                        id        : course.id, // used in New E3
                        startdate : course.startdate,
                        enddate   : course.enddate,
                    }
                    parseList[courseSemester].push(parseCourse)
                    this.saveCourseAnn(parseCourse.id).catch(err => { throw err })
                }
                await AsyncStorage.setItem('courseInfo', JSON.stringify(parseList))
          })
          .catch(err => { throw err })
    }

    private async getCourseAnnDetail(form_id: number) {
        let formData = {
            "wsfunction": "mod_forum_get_forum_discussions_paginated",
            "forumid": String(form_id),
            "sortdirection": 'DESC',
            "perpage": '100',
            "sortby": "timemodified",
        }

        let token: string
        await KeyChain.getInternetCredentials("NewE3")
          .then(credentials => {
                token = credentials.password
          })
          .catch(err => { throw err })
        let ann_list: Array<ann_type> = []

        return await this.post(formData)
          .then(result => result['discussions'])
          .then(result => {
                result.forEach((ann: any) => {
                    let parseAnn: ann_type = {
                        title           : ann.name,
                        content         : ann.message,
                        isRead          : false,
                        timeCreated     : new Date(ann.created * 1000),
                        timeModified    : new Date(ann.modified * 1000),
                        attach          : [],
                        pinned          : ann.pinned,
                    }
                    if ('attachments' in ann) {
                        ann.attachments.forEach((file: any) => {
                            parseAnn.attach.push({
                                name            : file.filename,
                                type            : file.filename.split('.').pop(),
                                size            : file.filesize,
                                timemodified    : new Date(file.timemodified * 1000),
                                url             : file.fileurl + "?token=" + token,
                            })
                        })
                    }
                    if ('messageinlinefiles' in ann) {
                        ann.messageinlinefiles.forEach((file: any) => { // image link need token
                            parseAnn.content = parseAnn.content.replace(
                                file.fileurl,
                                file.fileurl + "?token=" + token
                            )
                        })
                    }
                    ann_list.push(parseAnn)
                })
                // sort by create time (DESC)
                ann_list.sort((a, b) => {
                    if (a.timeCreated < b.timeCreated) return 1;
                    else return -1;
                })
                return ann_list
          })
          .catch(err => { throw err })
    }

    private async saveCourseAnn(course_id: number) {
        let formData = {
            "wsfunction": "mod_forum_get_forums_by_courses",
            "courseids[0]": String(course_id),
        }

        await this.post(formData)
          .then(async result => {
                let parseList: ann_list = {
                    "news": {
                        form_id: 0,
                        ann: [],
                    },
                    "general": {
                        form_id: 0,
                        ann: [],
                    },
                }

                parseList["news"].form_id = result[0].id
                await this.getCourseAnnDetail(result[0].id)
                  .then(result => { parseList["news"].ann = result })
                  .catch(err => { throw err })

                if (result.length > 1) { // if result has general field
                    parseList["general"].form_id = (result.length > 1) ? 0 : result[1].id
                    await this.getCourseAnnDetail(result[1].id)
                      .then(result => { parseList["general"].ann = result })
                      .catch(err => { throw err })
                }
                
                await AsyncStorage.setItem('courseAnn' + course_id, JSON.stringify(parseList))
          })
          .catch(err => { throw err })
    }

    /* -----------------------
     * Public member functions
     * -----------------------
     * Login New E3 API, store username, password, token in KeyChain, store userId, email, name in AsyncStorage
     * Throw error if [Empty input / Login failed / fetch error]
     */
    async login(userId: string, password: string) {
        if (!userId || !password) throw new Error("Empty input")

        let formData = new FormData();
        formData.append('username', userId)
        formData.append('password', password)
        formData.append('service', 'moodle_mobile_app')

        return fetch('https://e3new.nctu.edu.tw/login/token.php', {
            method: 'POST',
            headers: {},
            body: formData,
          })
          .then(response => response.json())
          .then(async responseJson => {
                // save critical informations
                if ('token' in responseJson) {
                    await KeyChain.setGenericPassword(userId, password)
                    await KeyChain.setInternetCredentials("NewE3", userId, responseJson.token)
                    await this.saveUserInfo(userId).catch(err => { throw err })
                    await this.saveCourseInfo().catch(err => { throw err })
                }
                else {
                    clean_datas()
                    throw new Error("Login failed")
                }
          })
          .catch(err => {
                clean_datas()
                throw err
          })
    }

    async updateCourseList() {
        return this.saveCourseInfo().catch(err => { throw err })
    }

    async updateCourseAnn(courseId: number) {
        return this.saveCourseAnn(courseId).catch(err => { throw err })
    }
}

