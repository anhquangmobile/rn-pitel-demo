import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from './src/screens/home_screen';
import {CallScreen} from './src/screens/call_screen';
import {PitelSDKProvider} from './src/pitel_sdk_context';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PitelSDKProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
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
