import React, {Component} from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native'
import { NavigationScreenProp } from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<States, Props>,
}
interface States {
  
}

export default class CourseAnnGeneralScreen extends Component<Props> {

  async componentDidMount() {
    // console.log(this.props.navigation.dangerouslyGetParent().getParam('courseId'))
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