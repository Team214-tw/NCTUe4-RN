import React, { Component } from 'react'
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native'
import * as Keychain from 'react-native-keychain'
import { goSignIn } from '../navigation';

interface Props { }
export default class Settings extends Component<Props> {
  logout = async () => {
    await Keychain.resetGenericPassword()
    goSignIn()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Settings</Text>
        <Button
          onPress={this.logout}
          title="Logout"
        />
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