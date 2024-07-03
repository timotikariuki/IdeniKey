/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {Text, View,Image, SafeAreaView,StyleSheet, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



const handleWebViewNavigationStateChange = newNavState => {
    console.log(newNavState);
    /*if(newNavState.url.includes('clksupplies')){
       console.log('clk active');
          //navigation.push('clk');
    }else{
        console.log('idenikey active');
        //navigation.push('calik');
    }*/
  };

function CalikScreen() {
  return (
    <SafeAreaView style={{flex: 1}}>
       <WebView
           source={{uri: 'http://13.235.246.221/'}}
           onNavigationStateChange={handleWebViewNavigationStateChange}
           />
    </SafeAreaView>
  );
}

function ClkScreen() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <WebView source={{uri: 'https://www.clksupplies.com/'}} />
    </SafeAreaView>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
        screenOptions={{
           headerShown:false,
           tabBarShowLabel : false,
           tabBarActiveBackgroundColor:'#CCD5DB',
           tabBarInactiveBackgroundColor:'#0E3050',
           tabBarStyle: {
            backgroundColor:'#071828',
            borderTopWidth: 0,
            borderTopColor: '#000000',
            ...style.shadowProp
           },
           tabBarItemStyle:{
                 margin:5,
                 borderRadius:10,
               }
        }}
    >
      <Tab.Screen name="Calik" component={CalikScreen}
       options={{
        tabBarIcon:({focused}) => (
           <View
              style={{
                 alignItems:'center',
                 justifyContent:'center',
              }}>
              <Text style={{color:focused ? '#071828' : '#ffffff', ...style.menuDesign }}>ideniKey</Text>
           </View>
        ),
    }}  />
      <Tab.Screen name="CLK" component={ClkScreen}
      options={{
              tabBarIcon:({focused}) => (
                 <View
                 style={{
                    alignItems:'center',
                    justifyContent:'center',
                 }}>
                  <Text style={{color:focused ? '#071828' : '#ffffff', ...style.menuDesign}}>CLK</Text>
                 </View>
              ),
          }}  />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <>
      <NavigationContainer>
            <MyTabs />
      </NavigationContainer>
    </>
  );
};

const style = StyleSheet.create({
  menuDesign:{
    fontWeight:'bold',
    fontSize:20,
  },
  shadowProp: {
      shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
});


export default App;


