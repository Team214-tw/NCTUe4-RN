import React, { Component } from 'react'
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native'
import * as KeyChain from 'react-native-keychain'
import AsyncStorage from '@react-native-community/async-storage';
import { goSignIn } from '../navigation';
import { clean_datas } from '../client/NewE3ApiAdapter';

interface Props { }
interface States {
  fullname: string,
  email: string,
}

export default class Settings extends Component<Props, States> {
  constructor(props: Props) {
    super(props)
    this.state = {
      fullname: '',
      email: '',
    }
  }

  async componentDidMount() {
    let studentEmail = await AsyncStorage.getItem('studentEmail')
    let studentName = await AsyncStorage.getItem('studentName')
    if (studentEmail && JSON.parse(studentEmail)) this.setState({ email: JSON.parse(studentEmail) })
    if (studentName && JSON.parse(studentName)) this.setState({ fullname: JSON.parse(studentName) })
  }

  logout = async () => {
    clean_datas()
    goSignIn()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>{this.state.fullname}</Text>
        <Text style={styles.welcome}>{this.state.email}</Text>
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