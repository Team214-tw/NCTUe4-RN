import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import * as Keychain from 'react-native-keychain'
import { goSignIn, goAnn } from '../navigation';
import SplashScreen from 'react-native-splash-screen';
import NewE3ApiClient from '../client/NewE3ApiClient';

interface Props { }

export default class Timetable extends Component<Props> {
  async componentDidMount() {
    const credentials = await Keychain.getGenericPassword()
    const username = credentials && credentials.username;
    const password = credentials && credentials.password;
    if (!username || !password) {
      goSignIn()
    }
    else {
      let client = new NewE3ApiClient
      await client.login(username, password).catch(err => {
        console.log(err)
        goSignIn()
      })
      goAnn()
    }
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