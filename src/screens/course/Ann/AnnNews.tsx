import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
  ListRenderItemInfo,
  FlatList,
} from 'react-native'
import { NavigationScreenProp } from 'react-navigation';
import NewE3ApiClient from '../../../client/NewE3ApiClient';
import AsyncStorage from '@react-native-community/async-storage';
import { ListItem } from 'react-native-elements';

interface Props {
  navigation: NavigationScreenProp<States, Props>,
}
interface States {
  refreshing: boolean,
  courseId: number,
  AnnList: Array<{ key: string, data: ann_type, }>,
}

export default class CourseAnnNewsScreen extends Component<Props, States> {

  constructor(props: Props) {
    super(props)
    const parent_nav = this.props.navigation.dangerouslyGetParent()
    this.state = {
      refreshing: false,
      courseId: parent_nav ? parent_nav.getParam('courseId') : 0,
      AnnList: [],
    }
  }

  async updateAnnList() {
    let client = new NewE3ApiClient
    await client.updateCourseAnn(this.state.courseId)

    let courseAnn = await AsyncStorage.getItem('courseAnn' + this.state.courseId)
    if (!courseAnn) { return }
    let annList = JSON.parse(courseAnn)

    var renderList: Array<{ key: string, data: ann_type }> = []
    annList['news'].ann.forEach((ann: ann_type, i: number) => {
      renderList.push({key: String(i), data: ann})
    })

    this.setState({ AnnList: renderList })
  }

  async componentDidMount() {
    await this.updateAnnList()
  }

  _onRefresh = async () => {
    this.setState({ refreshing: true })
    await this.updateAnnList()
    this.setState({ refreshing: false })
  }

  _renderItem = ({item}: ListRenderItemInfo<{ key: string, data: ann_type }>) => (
    <ListItem
      title={
        <View>
          <Text numberOfLines={1} style={styles.title}>
            {item.data.title}
          </Text>
          <Text numberOfLines={1} style={styles.content}>
            {item.data.content}
          </Text>
        </View>
      }
      onPress={() => {this.props.navigation.push('Developing')}}
      topDivider={true}
      containerStyle={styles.annListItem}
    />
  )

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.inner}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
          renderItem={this._renderItem}
          data={this.state.AnnList}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    marginBottom: 2,
  },
  content: {
    fontSize: 14,
  },
  annListItem: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 14,
  },
});