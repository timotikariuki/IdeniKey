
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useRef } from 'react';
import {Linking,ActivityIndicator,Button,Text, View, SafeAreaView,StyleSheet,TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


export default function App() {
    const webViewRef = useRef();
    const webViewRef1 = useRef();

    const [canGoBack, setCanGoBack] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [isclk, setclk] = useState('https://www.clksupplies.com/');
    const [isIdenikey, setIdenikey] = useState('https://calik.app/');

    var isdata = 0;



    /*  const handleWebViewNavigationStateChange = newNavState => {
      if(newNavState.url.includes('calik.app/resultKey')){
        //console.log(newNavState.url);
          setIdenikey(newNavState.url);
      }
        if(newNavState.url.includes('clksupplies')){
          console.log(isdata);
          setclk(newNavState.url);
            isdata = 1;
            navigation.navigate('CLK');
        }
      };

       function webViewgoback() {
          if (webViewRef.current) webViewRef.current.goBack();
        }

        function webViewNext() {
          if (webViewRef.current) webViewRef.current.goForward();
        } */


    const CalikScreen = ({navigation}) => {
      return (
        <SafeAreaView style={{flex: 1}}>
        <WebView
               ref={webViewRef}
               source={{ uri: isIdenikey }}
               onNavigationStateChange={(newNavState) => {
                     //console.log(isIdenikey);
                   if(newNavState.url.includes('calik.app/frontKey')){
                        setIdenikey(newNavState.url);
                   }
                   if(newNavState.url.includes('calik.app/resultKey')){
                        //console.log(isIdenikey);
                        if(isIdenikey.includes('calik.app/resultKey'))
                        {}
                        else{
                             //console.log('newNavState_url');
                             setIdenikey(newNavState.url);
                       }
                  }
                  if(newNavState.url.includes('clksupplies.com/pages/how-to-use-idenikey')){
                     setIdenikey('https://calik.app/');
                  }
                   if(newNavState.url.includes('clksupplies')){
                     webViewRef.current.goBack();
                     setclk(newNavState.url);
                       isdata = 1;
                       navigation.navigate('CLK');
                   }
                }}
               onContentProcessDidTerminate={() => webViewRef.current.reload()}
               startInLoadingState={true}
               renderLoading={() => <ActivityIndicator
                       style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
                       size="large" color="#176FCE" />
               }
           />

        </SafeAreaView>
      );
    }

    const ClkScreen = ({navigation}) => {
      return (
        <SafeAreaView style={{flex: 1}}>
          <WebView
            ref={webViewRef1}
            source={{uri: isclk}}
            onContentProcessDidTerminate={() => webViewRef1.current.reload()}

         />
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
           listeners={({ navigation, route }) => ({
                tabPress: e => {
                            //console.log(isIdenikey);
                            navigation.navigate('Calik');
                          },
                      })}


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

    return (
      <>
            <NavigationContainer>
                  <MyTabs />
            </NavigationContainer>
          </>
      );
  }
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
