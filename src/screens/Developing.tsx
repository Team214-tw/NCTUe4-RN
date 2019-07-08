import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Button,
} from 'react-native'
import { NavigationScreenProp } from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<States, Props>,
}
interface States {

}

export default class DevelopingScreen extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Developing</Text>
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Dismiss"
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