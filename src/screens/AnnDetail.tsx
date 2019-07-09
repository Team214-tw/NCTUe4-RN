import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Button,
  Animated,
  StatusBar,
  Linking,
} from 'react-native'
import { NavigationScreenProp, ScrollView } from 'react-navigation';
import AutoHeightWebView from 'react-native-autoheight-webview'

interface Props {
  navigation: NavigationScreenProp<States, { annDetail: string, courseName: string }>,
  collapsible: any,
}
interface States {
}

export default class AnnDetailScreen extends Component<Props, States> {

  constructor(props: Props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    let annStr = this.props.navigation.getParam('annDetail', '')
    let ann = JSON.parse(annStr)
    let courseName = this.props.navigation.getParam('courseName', '')
    
    return (
      <View style={styles.container}>
        <Text style={styles.annTitle}>{ann.title}</Text>
        <Text style={styles.annTitle}>{courseName}</Text>
        <AutoHeightWebView
          source={{ html: ann.content }}
          zoomable={false}
          scrollEnable={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  annTitle: {
    fontSize: 30,
    lineHeight: 36,
  },
});