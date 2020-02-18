/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { Client } from 'bugsnag-react-native';
import App from './App';
import { name as appName } from './app.json';

new Client("0f31065ba6a8f376650644cb481c4420");

AppRegistry.registerComponent(appName, () => App);
