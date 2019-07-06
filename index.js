/**
 * @format
 */

import {AppRegistry} from 'react-native';
import InitScreen from './src/screens/Init';
import {name as appName} from './app.json';

import {Alert} from 'react-native';
import RNRestart from 'react-native-restart';
import { setJSExceptionHandler, setNativeExceptionHandler } from 'react-native-exception-handler';

const reporter = error => {
  console.log(error) // inform develop team
}

setJSExceptionHandler((e, isFatal) => {
  if (isFatal) {
    reporter(e)
    Alert.alert(
      `${e.name}`,
      `\n${e.message}\n
We have reported this to our team !
Please restart the app !`,
      [
        {
          text: 'Restart',
          onPress: () => {
            RNRestart.Restart()
          },
        },
      ]
    )
  } else {
    console.log(e)
  }
})

setNativeExceptionHandler(exceptionString => {
  Alert.alert(
    "Error",
    `\n${exceptionString}\n
We have reported this to our team !
Please restart the app !`,
    [
      {
        text: 'Restart',
        onPress: () => {
          RNRestart.Restart()
        },
      },
    ]
  )
}, false);

AppRegistry.registerComponent(appName, () => InitScreen);
