import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  PermissionsAndroid,
  Image

} from 'react-native';

import Orientation from 'react-native-orientation';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

// import RNFS from 'react-native-fs'

import HomeScreen  from './HomeScreen'
import VideoScreen from './VideoScreen'

var Stack = createStackNavigator();

class App extends React.Component {
  render(){
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} initialParams={{path:''}} />
          <Stack.Screen name="VideoScreen" component={VideoScreen} initialParams={{path_location:''}} options={{headerShown:false}} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
 
}

export default App;