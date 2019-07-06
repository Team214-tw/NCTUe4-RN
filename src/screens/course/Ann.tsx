import React, {Component} from 'react'
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native'
import { getActiveChildNavigationOptions } from 'react-navigation';

interface Props {
  navigation: any,
}
export default class CourseAnnScreen extends Component<Props> {

  async componentDidMount() {
    // this.props.navigation.setParams({ title: this.props.navigation.getParam("title", '') })
  }

  constructor(props: Props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>CourseAnn</Text>
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