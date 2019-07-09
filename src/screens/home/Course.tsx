import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  RefreshControl,
  Alert,
  ListRenderItemInfo,
  SectionListData,
  StatusBar
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { ListItem } from 'react-native-elements'
import NewE3ApiClient from '../../client/NewE3ApiClient';
import { NavigationScreenProp } from 'react-navigation';
import ScrollableNavigationBar, { StatusBarComponent } from 'react-native-scrollable-navigation-bar';

interface Props {
  navigation: NavigationScreenProp<States, {}>,
}
interface States {
  refreshing: boolean,
  courseList: any
}

export default class HomeCourseScreen extends Component<Props, States> {
  
  constructor(props: Props) {
    super(props)
    this.state = {
      refreshing: false,
      courseList: [],
    }
  }

  async updateState() {
    let courseInfo = await AsyncStorage.getItem('courseInfo')
    if (!courseInfo) { return }
    let courseList = JSON.parse(courseInfo)

    var renderList: Array<{ semester: string, data: course_type }> = []
    Object.keys(courseList).forEach(sems => {
      renderList.push({ semester: String(sems), data: courseList[sems] })
    })
    renderList.reverse() // let latest semester on top of list

    this.setState({ courseList: renderList })
  }

  componentDidMount() {
    this.updateState()
  }

  _onRefresh = async () => {
    this.setState({ refreshing: true })
    let client = new NewE3ApiClient
    await client.updateCourseList().catch(err => { Alert.alert('Refresh failed', err.message) })
    await this.updateState()
    this.setState({ refreshing: false })
  }

  _renderSectionHeader = ({ section: { semester } }: { section: SectionListData<string> }) => (
    <View style={styles.sectionHeaders} >
      <Text style={styles.sectionHeadersTitle}>{semester}</Text>
    </View>
  )

  _renderItem = ({ item, index }: ListRenderItemInfo<course_type>) => (
    <ListItem
      title={
        <View>
          <Text numberOfLines={1} style={styles.cname} key={'cname' + index}>
            {item.cname}
          </Text>
          <Text numberOfLines={1} style={styles.ename} key={'ename' + index}>
            {item.ename}
          </Text>
        </View>
      }
      onPress={() => {this.props.navigation.push('CourseTab', { title: item.cname, courseId: item.id })}}
      topDivider={true}
      containerStyle={styles.courseListItem}
    />
  )

  render() {
    return (
      <View style={styles.container}>
        <SectionList
          style={styles.inner}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
          renderSectionHeader={this._renderSectionHeader}
          renderItem={this._renderItem}
          stickySectionHeadersEnabled={false}
          sections={this.state.courseList}
          keyExtractor={(item, index) => item + index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  inner: {
    flex: 1,
  },
  sectionHeaders: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 14,
    paddingLeft: 18,
    paddingBottom: 10,
    paddingRight: 16,
  },
  sectionHeadersTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cname: {
    fontSize: 16,
    marginBottom: 2,
  },
  ename: {
    fontSize: 14,
  },
  courseListItem: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 14,
  },
});