import React, { Component } from 'react'
import { View, Text, Button, StyleSheet, ScrollView, RefreshControl } from 'react-native'
import { getActiveChildNavigationOptions, SectionList, FlatList } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation';
import NewE3ApiClient from '../../../client/NewE3ApiClient';
import AsyncStorage from '@react-native-community/async-storage';
import { ListItem } from 'react-native-elements';

interface Props {
  navigation: any,
}
interface States {
  refreshing: boolean,
  courseId: number,
  AnnList: Array<{ key: string, data: ann_type, }>,
}

export default class CourseAnnNewsScreen extends Component<Props, States> {

  constructor(props: Props) {
    super(props)
    this.state = {
      refreshing: false,
      courseId: this.props.navigation.dangerouslyGetParent().getParam('courseId'),
      AnnList: []
    }
  }

  async updateState() {
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
    await this.updateState()
  }

  _onRefresh = async () => {
    this.setState({ refreshing: true })
    await this.updateState()
    this.setState({ refreshing: false })
  }

  _renderItem: any = ({item}: any) => (
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