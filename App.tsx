import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './libs/screens/home_screen';
import { CallScreen } from './libs/screens/call_screen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Call" component={CallScreen} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}