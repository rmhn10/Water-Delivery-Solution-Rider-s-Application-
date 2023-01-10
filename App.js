/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import AuthStack from './Stack/authStack';
import NavStack from './Stack/navStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */
import {enableLatestRenderer} from 'react-native-maps';
import SplashScreen from 'react-native-splash-screen';

enableLatestRenderer();
const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  
  },[])
  const [initializing, setInitializing] = useState(true);
  const [auth, setauth] = useState();
  

  
  useEffect(() => {

    getToken();
  }, [])
  
  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      console.log(value+"Token recieved");
      if(value !== null) {
        console.log(value+"User Code");
        setauth(value);
        
      }
      else{
        setauth(value);
      }
      
    } catch(e) {
      console.log("Sorry cant retrieved key"+e);
    }
}
if(!auth){
  return(
    <AuthStack/>
  )
}
else{
  return(
    <NavStack/>
  )
}
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
