import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  StatusBar
} from 'react-native'
import * as Keychain from 'react-native-keychain'
import SplashScreen from 'react-native-splash-screen';
// import react-navigation
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  NavigationScreenProp,
  NavigationScreenConfigProps
} from "react-navigation";
import {
  get_home_navigator,
  get_signin_navigator,
  get_course_navigator
} from '../navigation';
import DevelopingScreen from './Developing';
import AnnDetailScreen from './AnnDetail';

interface Props {
  navigation: NavigationScreenProp<States, {}>,
}
interface States {
  
}

class InitScreen extends Component<Props> {
  async componentDidMount() {
    const credentials = await Keychain.getInternetCredentials("NewE3") // store NewE3UserId / Token
    this.props.navigation.navigate(credentials.password ? 'App' : 'SignIn');
    SplashScreen.hide()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Init</Text>
      </View>
    );
  }
}

const SignIn = get_signin_navigator();
const AppStack = createStackNavigator(
  {
    HomeTab: {
      screen: get_home_navigator(),
    },
    CourseTab: {
      screen: get_course_navigator(),
      navigationOptions: ({ navigation }: NavigationScreenConfigProps) => ({
        title: navigation.getParam('title', ''),
      }),
    },
    AnnDetail: {
      screen: AnnDetailScreen,
      navigationOptions: {
        header: null,
      }
    },
    Developing: { // a modal screen
      screen: DevelopingScreen,
    },
  },
  {
    initialRouteName: 'HomeTab',
    defaultNavigationOptions: {
      headerStyle: { marginTop: StatusBar.currentHeight }, // because StatusBar.setTranslucent(true) in 'react-native-scrollable-navigation-bar'
    }
  }
)

export default createAppContainer(createSwitchNavigator(
  {
    Init: InitScreen,
    App: AppStack,
    SignIn: SignIn,
  },
  {
    initialRouteName: 'Init',
  }
));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});