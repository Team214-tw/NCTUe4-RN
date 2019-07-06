import React, {Component} from 'react'
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native'
import { pushCourse } from '../../navigation';

interface Props {
  title: string,
}
export default class Developing extends Component<Props> {

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