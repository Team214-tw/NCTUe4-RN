import { Navigation } from 'react-native-navigation'

export function registerScreens() {
  let HomeAnnScreen = require('./screens/home/Ann').default
  let HomeCourseScreen = require('./screens/home/Course').default
  let HomeTimetableScreen = require('./screens/home/Timetable').default
  let HomeFilesScreen = require('./screens/home/Files').default
  let HomeSettingsScreen = require('./screens/home/Settings').default
  let CourseAnnScreen = require('./screens/course/Ann').default
  let CourseDocScreen = require('./screens/course/Doc').default
  let CourseTaskScreen = require('./screens/course/Task').default
  let CourseScoreScreen = require('./screens/course/Score').default
  let CourseMembersScreen = require('./screens/course/Members').default
  let SignInScreen = require('./screens/SignIn').default
  let DevelopingScreen = require('./screens/Developing').default
  let InitScreen = require('./screens/Init').default
  // Regist all screens
  Navigation.registerComponent('HomeAnn', () => HomeAnnScreen)
  Navigation.registerComponent('HomeCourse', () => HomeCourseScreen)
  Navigation.registerComponent('HomeTimetable', () => HomeTimetableScreen)
  Navigation.registerComponent('HomeFiles', () => HomeFilesScreen)
  Navigation.registerComponent('HomeSettings', () => HomeSettingsScreen)
  Navigation.registerComponent('CourseAnn', () => CourseAnnScreen)
  Navigation.registerComponent('CourseDoc', () => CourseDocScreen)
  Navigation.registerComponent('CourseTask', () => CourseTaskScreen)
  Navigation.registerComponent('CourseScore', () => CourseScoreScreen)
  Navigation.registerComponent('CourseMembers', () => CourseMembersScreen)
  Navigation.registerComponent('SignIn', () => SignInScreen)
  Navigation.registerComponent('Developing', () => DevelopingScreen)
  Navigation.registerComponent('Init', () => InitScreen)
}