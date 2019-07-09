import { NavigationScreenProp } from 'react-navigation';
import NewE3ApiClient from '../../../client/NewE3ApiClient';
import AsyncStorage from '@react-native-community/async-storage';
import CourseAnnScreen from './Ann';

interface Props {
  navigation: NavigationScreenProp<States, Props>,
}
interface States {
  loading: boolean,
  refreshing: boolean,
  courseId: number,
  AnnList: Array<{ key: string, data: ann_type, }>,
}

export default class CourseAnnNewsScreen extends CourseAnnScreen {

  constructor(props: Props) {
    super(props)
  }

  // override updateAnnList function
  async updateAnnList() {
    let client = new NewE3ApiClient
    await client.updateCourseAnn(this.state.courseId)

    let courseAnn = await AsyncStorage.getItem('courseAnn' + this.state.courseId)
    if (!courseAnn) { return }
    let annList = JSON.parse(courseAnn)

    var renderList: Array<{ key: string, data: ann_type }> = []
    annList['news'].ann.forEach((ann: ann_type, i: number) => {
      ann.content = ann.content.replace(/<[^>]*>/g, '')
      renderList.push({key: String(i), data: ann})
    })

    this.setState({ AnnList: renderList })
  }
}