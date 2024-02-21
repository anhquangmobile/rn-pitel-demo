import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {LogBox} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from './src/screens/home_screen';
import {CallScreen} from './src/screens/call_screen';
import {StartScreen} from './src/screens/start_screen';
import {PitelSDKProvider} from 'react-native-pitel-voip';
import BackgroundTimer from 'react-native-background-timer';

LogBox.ignoreAllLogs();
BackgroundTimer.start();

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PitelSDKProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="StartPage" component={StartScreen} />
          <Stack.Screen
            name="Call"
            component={CallScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PitelSDKProvider>
  );
}
