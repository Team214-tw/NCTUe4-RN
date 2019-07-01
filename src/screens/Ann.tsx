import React, {Component} from 'react'
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native'
import * as Keychain from 'react-native-keychain'
import { goSignIn } from '../navigation';
import SplashScreen from 'react-native-splash-screen';

interface Props {}
export default class Ann extends Component<Props> {
  async componentDidMount() {
    const credentials = await Keychain.getGenericPassword()
    const username = credentials && credentials.username;
    const password = credentials && credentials.password;
    if (!username || !password) {
      goSignIn();
    }
    else {
      SplashScreen.hide()
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Ann</Text>
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
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});