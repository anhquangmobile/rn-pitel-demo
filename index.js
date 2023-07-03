/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App.tsx';
import {name as appName} from './app.json';
import {NotificationBackground} from 'react-native-pitel-voip';

NotificationBackground();

AppRegistry.registerComponent(appName, () => App);
