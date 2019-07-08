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
import * as Progress from 'react-native-progress';
import { ListItem } from 'react-native-elements';

interface Props {
  navigation: NavigationScreenProp<States, Props>,
}
interface States {
  loading: boolean,
  refreshing: boolean,
  courseId: number,
  AnnList: Array<{ key: string, data: ann_type, }>,
}

export default class CourseAnnNewsScreen extends Component<Props, States> {

  constructor(props: Props) {
    super(props)
    const parent_nav = this.props.navigation.dangerouslyGetParent()
    this.state = {
      loading: true,
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
    this.setState({ loading: false })
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

  _renderEmptyComponent = () => {
    if (this.state.loading) {
      return (
        <View style={styles.centerContainer}>
          <Progress.Circle
            borderWidth={3}
            size={55}
            indeterminate={true}
            thickness={1}
          />
        </View>
      )
    }
    else {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>Nothing here</Text>
        </View>
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
          ListEmptyComponent={this._renderEmptyComponent}
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
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 20,
  },
});