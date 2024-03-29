import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

interface Props {}

export default class HomeAnnScreen extends Component<Props> {
  async componentDidMount() {

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