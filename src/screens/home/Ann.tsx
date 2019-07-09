import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import ScrollableNavigationBar, { StatusBarComponent } from 'react-native-scrollable-navigation-bar';

interface Props {}

export default class HomeAnnScreen extends Component<Props> {
  async componentDidMount() {

  }
  
  render() {
    return (
      <ScrollableNavigationBar
        transitionPoint={150}
        StatusBar={() => (
          <StatusBarComponent
            barStyle="dark-content"
            backgroundColor="#f5f5f5"
          />
        )}
        title="Announcement"
        backgroundColor="#f5f5f5"
        borderColor="lightgrey"
        collapsible
      >
        <Text style={styles.welcome}>Ann</Text>
        <Text style={styles.welcome}>Ann</Text>
        <Text style={styles.welcome}>Ann</Text>
        <Text style={styles.welcome}>Ann</Text>
        <Text style={styles.welcome}>Ann</Text>
        <Text style={styles.welcome}>Ann</Text>
        <Text style={styles.welcome}>Ann</Text>
        <Text style={styles.welcome}>Ann</Text>
        <Text style={styles.welcome}>Ann</Text>
        <Text style={styles.welcome}>Ann</Text>
        <Text style={styles.welcome}>Ann</Text>
        <Text style={styles.welcome}>Ann</Text>
        <Text style={styles.welcome}>Ann</Text>
        <Text style={styles.welcome}>Ann</Text>
        <Text style={styles.welcome}>Ann</Text>
        <Text style={styles.welcome}>Ann</Text>
      </ScrollableNavigationBar>
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