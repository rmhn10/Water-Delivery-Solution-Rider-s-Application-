import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../Screens/AppScreens/home';
import Riderprofile from '../Screens/AppScreens/riderprofile';
import NotificationScreen from '../Screens/AppScreens/notification';

import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Logout from '../Screens/AuthScreens/logout';
import { color } from 'react-native-reanimated';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
export function DrawerRoutes({route}) {
    
  return (

      <Drawer.Navigator initialRouteName="Home" 
      screenOptions={{
        drawerActiveBackgroundColor:'#0A6376',
        drawerInactiveBackgroundColor:'grey',
        drawerInactiveTintColor:'black',
        drawerActiveTintColor:'white',
        headerTintColor:'#0A6376',
      }}
      
      >
        <Drawer.Screen name="Home" component={Home} options={{title:'PANI LAO',headerTitleAlign:"center"}}/>
        <Drawer.Screen name="Notifications" component={NotificationScreen} />
        <Drawer.Screen name="Profile" component={Riderprofile} />

      </Drawer.Navigator>

  );
}

const NavStack = ({navigation}) => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='HomeScreen' component={DrawerRoutes} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({})

export default NavStack;
