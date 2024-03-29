import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
  ListRenderItemInfo,
  FlatList,
  ActivityIndicator,
  Platform,
} from 'react-native'
import { NavigationScreenProp } from 'react-navigation';
import * as Progress from 'react-native-progress';
import { ListItem } from 'react-native-elements';

interface Props {
  navigation: NavigationScreenProp<States, { courseName: string }>,
}
interface States {
  loading: boolean,
  refreshing: boolean,
  courseId: number,
  AnnList: Array<{ key: string, data: ann_type, }>,
}

export default class CourseAnnScreen extends Component<Props, States> {

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

  async updateAnnList() { }

  async componentDidMount() {
    await this.updateAnnList()
    this.setState({ loading: false })
  }

  _onRefresh = async () => {
    this.setState({ refreshing: true })
    await this.updateAnnList()
    this.setState({ refreshing: false })
  }

  _renderItem = ({ item }: ListRenderItemInfo<{ key: string, data: ann_type }>) => (
    <ListItem
      title={
        <Text numberOfLines={1} style={styles.title}>
          {item.data.title}
        </Text>
      }
      subtitle={
        <Text numberOfLines={2} style={styles.content}>
          {item.data.content.replace(/<[^>]*>/g, '')}
        </Text>
      }
      onPress={() => { this.props.navigation.push('AnnDetail', { annDetail: JSON.stringify(item.data), courseName: this.props.navigation.getParam('courseName', '') }) }}
      topDivider={true}
      containerStyle={styles.annListItem}
    />
  )

  _renderEmptyComponent = () => {
    if (this.state.loading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size={Platform.OS === 'ios' ? 'large' : 60} color='#555' />
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
    fontWeight: 'bold',
    marginBottom: 2,
  },
  content: {
    fontSize: 14,
    lineHeight: 20,
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