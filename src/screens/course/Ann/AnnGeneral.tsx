import React, {Component} from 'react'
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native'
import { getActiveChildNavigationOptions } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation';

interface Props {
  navigation: any,
}

export default class CourseAnnGeneralScreen extends Component<Props> {

  async componentDidMount() {
    console.log(this.props.navigation.dangerouslyGetParent().getParam('courseId'))
    // this.props.navigation.setParams({ title: this.props.navigation.getParam("title", '') })
  }

  constructor(props: Props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>CourseAnnGeneral</Text>
        <Button title="go" onPress={()=>{this.props.navigation.navigate('Developing')}}></Button>
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