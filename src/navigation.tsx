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
              id: 'Ann',
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
                    name: 'Ann',
                  },
                },
              ],
            }
          },
          {
            stack: {
              id: 'Course',
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
                    name: 'Course',
                  },
                },
              ],
            },
          },
          {
            stack: {
              id: 'Timetable',
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
                    name: 'Timetable',
                  },
                },
              ],
            },
          },
          {
            stack: {
              id: 'Files',
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
                    name: 'Files',
                  },
                },
              ],
            },
          },
          {
            stack: {
              id: 'Settings',
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
                    name: 'Settings',
                  },
                },
              ],
            },
          }
        ]
      }
    },
  })