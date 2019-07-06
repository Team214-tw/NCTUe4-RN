import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";
import * as Keychain from 'react-native-keychain'
import { get_home_navigator, get_signin_navigator, get_course_navigator } from '../navigation';
import SplashScreen from 'react-native-splash-screen';
import NewE3ApiClient from '../client/NewE3ApiClient';

import AnnScreen from './home/Ann';
import SignInScreen from './SignIn';

interface Props {
  navigation: any
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
    Home: {
      screen: get_home_navigator(),
    },
    Course: {
      screen: get_course_navigator(),
      navigationOptions: ({ navigation }: any) => ({
        title: navigation.getParam('title', ''),
      }),
    }
  },
  {

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