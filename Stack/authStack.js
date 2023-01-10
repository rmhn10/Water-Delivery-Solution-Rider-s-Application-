import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Screens/AuthScreens/login'
import Signup from '../Screens/AuthScreens/signup'
import Home from '../Screens/AppScreens/home';
import NavStack from './navStack';
import GetStarted from '../Screens/AuthScreens/getStarted';
import { DrawerRoutes } from './navStack';
const Stack = createNativeStackNavigator();

export default function AuthStack({navigation}) {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='GetStarted'>
          <Stack.Screen name='GetStarted' component={GetStarted} options={{headerShown:false}}/>
        <Stack.Screen name='LoginScreen' component={Login} options={{headerShown: false}}/>
        <Stack.Screen name='SignupScreen' component={Signup} options={{headerShown: false}}/>
        <Stack.Screen name='HomeScreen' component={DrawerRoutes} options={{headerShown: false}}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}