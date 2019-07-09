import { createBottomTabNavigator, createStackNavigator, NavigationActions, createSwitchNavigator } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Icon from 'react-native-vector-icons/Ionicons';
import React from "react";
import I18n from "./utils/I18n"

import HomeAnnScreen from "./screens/home/Ann";
import HomeCourseScreen from "./screens/home/Course";
import HomeTimetableScreen from "./screens/home/Timetable";
import HomeFilesScreen from "./screens/home/Files";
import HomeSettingsScreen from "./screens/home/Settings";
import SignInScreen from "./screens/SignIn";
import CourseDocScreen from "./screens/course/Doc";
import CourseTaskScreen from "./screens/course/Task";
import CourseScoreScreen from "./screens/course/Score";
import CourseMembersScreen from "./screens/course/Members";
import { createMaterialTopTabNavigator } from "react-navigation";
import CourseAnnNewsScreen from "./screens/course/Ann/AnnNews";
import CourseAnnGeneralScreen from "./screens/course/Ann/AnnGeneral";

export const get_signin_navigator = () => {
  return createStackNavigator({
    SignIn: {
      screen: SignInScreen,
      navigationOptions: {
        headerTransparent: true,
      }
    },
  });
}

export const get_home_navigator = () => {
  const HomeAnnStk = createStackNavigator({
    HomeAnn: {
      screen: HomeAnnScreen,
      navigationOptions: {
        header: null,
      },
    }
  })
  const HomeCourseStk = createStackNavigator({
    HomeCourse: {
      screen: HomeCourseScreen,
      navigationOptions: {
        header: null,
      },
    }
  })
  const HomeTimetableStk = createStackNavigator({
    HomeTimetable: {
      screen: HomeTimetableScreen,
      navigationOptions: {
        header: null,
      },
    }
  })
  const HomeFilesStk = createStackNavigator({
    HomeFiles: {
      screen: HomeFilesScreen,
      navigationOptions: {
        header: null,
      },
    }
  })
  const HomeSettingsStk = createStackNavigator({
    HomeSettings: {
      screen: HomeSettingsScreen,
      navigationOptions: {
        header: null,
      },
    }
  })
  const HomeTabNavigator = createMaterialBottomTabNavigator(
    {
      HomeAnn: {
        screen: HomeAnnStk,
        navigationOptions: {
          title: 'Ann',
          tabBarIcon: (<Icon name="md-megaphone" size={24} color="#111" />),
        }
      },
      HomeCourse: {
        screen: HomeCourseStk,
        navigationOptions: {
          title: 'Course',
          tabBarIcon: (<Icon name="ios-book" size={24} color="#111" />),
        }
      },
      HomeTimetable: {
        screen: HomeTimetableStk,
        navigationOptions: {
          title: 'Timetable',
          tabBarIcon: (<Icon name="md-calendar" size={24} color="#111" />),
        }
      },
      HomeFiles: {
        screen: HomeFilesStk,
        navigationOptions: {
          title: 'Files',
          tabBarIcon: (<Icon name="ios-download" size={24} color="#111" />),
        }
      },
      HomeSettings: {
        screen: HomeSettingsStk,
        navigationOptions: {
          title: 'Settings',
          tabBarIcon: (<Icon name="md-settings" size={24} color="#111" />),
        }
      },
    },
    {
      initialRouteName: 'HomeAnn',
      barStyle: { backgroundColor: '#FFFFFF' },
      backBehavior: 'none',
    }
  )

  return createStackNavigator(
    {
      HomeTab: {
        screen: HomeTabNavigator,
        navigationOptions: {
          header: null,
        },
      }
    },
    {
      navigationOptions: {
        header: null,
      },
    }
  )
}

export const get_course_navigator = () => {
  const CourseAnnTab = createMaterialTopTabNavigator(
    {
      CourseAnnNews: {
        screen: CourseAnnNewsScreen,
        navigationOptions: {
          title: I18n.t("CourseAnnNews"),
        }
      },
      CourseAnnGeneralStk: {
        screen: CourseAnnGeneralScreen,
        navigationOptions: {
          title: I18n.t("CourseAnnGeneral"),
        }
      }
    },
    {
      backBehavior: 'none',
      animationEnabled: true,
    }
  )
  const CourseDocStk = createStackNavigator({
    CourseDoc: {
      screen: CourseDocScreen,
      navigationOptions: {
        header: null,
      },
    }
  })
  const CourseTaskStk = createStackNavigator({
    CourseTask: {
      screen: CourseTaskScreen,
      navigationOptions: {
        header: null,
      },
    }
  })
  const CourseScoreStk = createStackNavigator({
    CourseScore: {
      screen: CourseScoreScreen,
      navigationOptions: {
        header: null,
      },
    }
  })
  const CourseMembersStk = createStackNavigator({
    CourseMembers: {
      screen: CourseMembersScreen,
      navigationOptions: {
        header: null,
      },
    }
  })
  const CourseTabNavigator = createMaterialBottomTabNavigator(
    {
      CourseAnnTab: {
        screen: CourseAnnTab,
        navigationOptions: {
          title: 'Ann',
          tabBarIcon: (<Icon name="md-megaphone" size={24} color="#111" />)
        }
      },
      CourseDocTab: {
        screen: CourseDocStk,
        navigationOptions: {
          title: 'Doc',
          tabBarIcon: (<Icon name="md-attach" size={24} color="#111" />),
          header: null,
        }
      },
      CourseTaskTab: {
        screen: CourseTaskStk,
        navigationOptions: {
          title: 'Task',
          tabBarIcon: (<Icon name="md-checkbox-outline" size={24} color="#111" />),
          header: null,
        }
      },
      CourseScoreTab: {
        screen: CourseScoreStk,
        navigationOptions: {
          title: 'Score',
          tabBarIcon: (<Icon name="ios-stats" size={24} color="#111" />),
          header: null,
        }
      },
      CourseMembersTab: {
        screen: CourseMembersStk,
        navigationOptions: {
          title: 'Members',
          tabBarIcon: (<Icon name="ios-people" size={24} color="#111" />),
          header: null,
        }
      }
    },
    {
      initialRouteName: 'CourseAnnTab',
      barStyle: { backgroundColor: '#FFFFFF' },
      backBehavior: 'none',
    }
  )
  return CourseTabNavigator
}