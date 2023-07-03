/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App.tsx';
import {name as appName} from './app.json';
import {NotificationBackground} from './src/push_notif.js';

NotificationBackground();

AppRegistry.registerComponent(appName, () => App);
