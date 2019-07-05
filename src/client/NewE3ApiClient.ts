import * as KeyChain from 'react-native-keychain'
import AsyncStorage from '@react-native-community/async-storage';
import { clean_datas } from './NewE3ApiAdapter';

export default class NewE3ApiClient {

    static readonly API_URL = "https://e3new.nctu.edu.tw/webservice/rest/server.php?moodlewsrestformat=json"

    /*
     * Post form to API_URL
     * Throw error if [token not exist / KeyChain error / fetch error]
     */
    private async post(form: FormData) {
        // get token
        await KeyChain.getInternetCredentials("NewE3")
          .then(result => {
                if (result) form.append("wstoken", result.password)
                else throw new Error("Token not exist")
          })
          .catch(err => {
                throw err
          })
        // fetch api
        return fetch(NewE3ApiClient.API_URL, {
            method: 'POST',
            headers: {},
            body: form,
          })
          .then(response => response.json())
          .then(responseJson => { return responseJson })
          .catch(err => { throw err })
    }

    private async saveUserInfo(studentId: string) {
        let formData = new FormData();
        formData.append("wsfunction", "core_user_get_users_by_field")
        formData.append("values[0]", studentId)
        formData.append("field", "username")
        await this.post(formData)
          .then(async result => {
                await AsyncStorage.setItem('newE3UserId', JSON.stringify(result[0].id))
                await AsyncStorage.setItem('studentEmail', JSON.stringify(result[0].email))
                await AsyncStorage.setItem('studentName', JSON.stringify(result[0].fullname))
          })
          .catch(err => {
                throw err
          })
    }

    private async saveCourseInfo() {
        let newE3UserId = await AsyncStorage.getItem('newE3UserId')
        if (!newE3UserId) throw new Error("New E3 User ID not exists")
        newE3UserId = JSON.parse(newE3UserId)

        let formData = new FormData();
        formData.append("wsfunction", "core_enrol_get_users_courses")
        formData.append("userid", newE3UserId)
        
        await this.post(formData)
          .then(async result => {
                var parseInfo:course_list = {}
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
                    
                    if (parseInfo[courseSemester] == undefined) parseInfo[courseSemester] = []
                    parseInfo[courseSemester].push({
                        cname     : courseCName,
                        ename     : courseEName,
                        code      : courseCode, // defined by school
                        id        : course.id, // used in New E3
                        startdate : course.startdate,
                        enddate   : course.enddate,
                    })
                }
                await AsyncStorage.setItem('courseInfo', JSON.stringify(parseInfo))
          })
          .catch(err => {
                throw err
          })
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
}

