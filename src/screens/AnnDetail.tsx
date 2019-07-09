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
import ScrollableNavigationBar, {
  StatusBarComponent,
  NavigationBarIcon,
  BackButton
} from 'react-native-scrollable-navigation-bar';
import AutoHeightWebView from 'react-native-autoheight-webview'

interface Props {
  navigation: NavigationScreenProp<States, { annDetail: string, courseId: number }>,
  collapsible: any,
}
interface States {
  ann: ann_type,
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
    let courseId = this.props.navigation.getParam('courseId', 0)
    
    return (
      <ScrollableNavigationBar
        transitionPoint={150}
        StatusBar={() => (
          <StatusBarComponent
            barStyle="dark-content"
            backgroundColor="#f5f5f5"
          />
        )}
        title={courseId}
        backgroundColor="#f5f5f5"
        borderColor="lightgrey"
        BackButton={() => (
          <BackButton
            onPress={() => this.props.navigation.goBack()}
          />
        )}
        collapsible
      >
        <View style={styles.annFrontMatter}>
          <Text style={styles.annTitle}>{ann.title}</Text>
        </View>
        <AutoHeightWebView
          source={{ html: ann.content }}
          zoomable={false}
          scrollEnable={false}
        />

      </ScrollableNavigationBar>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  placeholder: {
    height: 300,
    justifyContent: 'flex-end',
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
  annFrontMatter: {
    flex: 1,
    padding: 5,
  },
  annTitle: {
    fontSize: 30,
    lineHeight: 36,
  },
  annContent: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'blue'
  }
});