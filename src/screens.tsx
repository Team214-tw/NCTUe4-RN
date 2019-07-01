import { Navigation } from 'react-native-navigation'

export function registerScreens() {
  let AnnScreen = require('./screens/Ann').default
  let CourseScreen = require('./screens/Course').default
  let TimetableScreen = require('./screens/Timetable').default
  let FilesScreen = require('./screens/Files').default
  let SignInScreen = require('./screens/SignIn').default
  let SettingsScreen = require('./screens/Settings').default
  let DevelopingScreen = require('./screens/Developing').default
  // Regist all screens
  Navigation.registerComponent('Ann', () => AnnScreen)
  Navigation.registerComponent('Course', () => CourseScreen)
  Navigation.registerComponent('Timetable', () => TimetableScreen)
  Navigation.registerComponent('Files', () => FilesScreen)
  Navigation.registerComponent('Settings', () => SettingsScreen)
  Navigation.registerComponent('SignIn', () => SignInScreen)
  Navigation.registerComponent('Developing', () => DevelopingScreen)
}