import { Navigation } from 'react-native-navigation'

export const goSignIn = () =>
  Navigation.setRoot({
    root: {
      component: {
        id: 'SignIn',
        name: 'SignIn',
      },
    },
  })

export const goAnn = () =>
  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [
          {
            stack: {
              id: 'HomeAnn',
              options: {
                bottomTab: {
                  text: 'Announcement',
                  icon: require('NCTUe4/src/img/ic_ann/ic_ann.png'),
                  iconColor: '#AAAAAA',
                  selectedIconColor: '#000000',
                  textColor: '#AAAAAA',
                  selectedTextColor: '#000000',
                  //fontFamily: 'ArialRoundedMTBold',
                },
                topBar: {
                  visible: false,
                  drawBehind: true
                },
              },
              children: [
                {
                  component: {
                    name: 'HomeAnn',
                  },
                },
              ],
            }
          },
          {
            stack: {
              id: 'HomeCourse',
              options: {
                bottomTab: {
                  text: 'Course',
                  icon: require('NCTUe4/src/img/ic_course/ic_course.png'),
                  iconColor: '#AAAAAA',
                  selectedIconColor: '#000000',
                  textColor: '#AAAAAA',
                  selectedTextColor: '#000000',
                  //fontFamily: 'ArialRoundedMTBold',
                },
                topBar: {
                  visible: false,
                  drawBehind: true
                },
              },
              children: [
                {
                  component: {
                    name: 'HomeCourse',
                  },
                },
              ],
            },
          },
          {
            stack: {
              id: 'HomeTimetable',
              options: {
                bottomTab: {
                  text: 'Timetable',
                  icon: require('NCTUe4/src/img/ic_timetable/ic_timetable.png'),
                  iconColor: '#AAAAAA',
                  selectedIconColor: '#000000',
                  textColor: '#AAAAAA',
                  selectedTextColor: '#000000',
                  //fontFamily: 'ArialRoundedMTBold',
                },
                topBar: {
                  visible: false,
                  drawBehind: true
                },
              },
              children: [
                {
                  component: {
                    name: 'HomeTimetable',
                  },
                },
              ],
            },
          },
          {
            stack: {
              id: 'HomeFiles',
              options: {
                bottomTab: {
                  text: 'Files',
                  icon: require('NCTUe4/src/img/ic_files/ic_files.png'),
                  iconColor: '#AAAAAA',
                  selectedIconColor: '#000000',
                  textColor: '#AAAAAA',
                  selectedTextColor: '#000000',
                  //fontFamily: 'ArialRoundedMTBold',
                },
                topBar: {
                  visible: false,
                  drawBehind: true
                },
              },
              children: [
                {
                  component: {
                    name: 'HomeFiles',
                  },
                },
              ],
            },
          },
          {
            stack: {
              id: 'HomeSettings',
              options: {
                bottomTab: {
                  text: 'Settings',
                  icon: require('NCTUe4/src/img/ic_settings/ic_settings.png'),
                  iconColor: '#AAAAAA',
                  selectedIconColor: '#000000',
                  textColor: '#AAAAAA',
                  selectedTextColor: '#000000',
                  //fontFamily: 'ArialRoundedMTBold',
                },
                topBar: {
                  visible: false,
                  drawBehind: true
                },
              },
              children: [
                {
                  component: {
                    name: 'HomeSettings',
                  },
                },
              ],
            },
          }
        ]
      }
    },
  })

var courseTempleate = (id: string, text: string, icon: any, title: string) => {
  return {
    stack: {
      id: id,
      options: {
        bottomTab: {
          text: text,
          icon: icon,
          iconColor: '#AAAAAA',
          selectedIconColor: '#000000',
          textColor: '#AAAAAA',
          selectedTextColor: '#000000',
          //fontFamily: 'ArialRoundedMTBold',
        },
        topBar: {
          title: {
            text: title
          },
          leftButtons: [
            {
              id: 'back_btn',
              icon: require('NCTUe4/src/img/ic_arrowback/ic_arrowback.png')
            }
          ],
        }
      },
      children: [
        {
          component: {
            name: id,
          },
        },
      ],
    }
  }
}


export const pushCourse = (cname: string) =>
  Navigation.showModal({
    bottomTabs: {
      children: [
        courseTempleate('CourseAnn', 'Announcement', require('NCTUe4/src/img/ic_ann/ic_ann.png'), cname),
        courseTempleate('CourseDoc', 'Document', require('NCTUe4/src/img/ic_course/ic_course.png'), cname),
        courseTempleate('CourseTask', 'Task', require('NCTUe4/src/img/ic_timetable/ic_timetable.png'), cname),
        courseTempleate('CourseScore', 'Score', require('NCTUe4/src/img/ic_score/ic_score.png'), cname),
        courseTempleate('CourseMembers', 'Members', require('NCTUe4/src/img/ic_person/ic_person.png'), cname),
      ],
    }
  });