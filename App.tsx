import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { withIAPContext } from 'react-native-iap';
import SubscriptionScreen from './SubscriptionScreen';
import MainAppContent from './MainAppContent';
import * as RNIap from 'react-native-iap';

const itemSubs = ['com.idenikey.subscription']; // Your subscription product ID

const App = () => {
  const [isSubscribed, setIsSubscribed] = useState(null);

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        await RNIap.initConnection();
        const purchases = await RNIap.getAvailablePurchases();
        console.log(purchases);
        const subscription = purchases.find(
          (purchase) => purchase.productId === itemSubs[0]
        );
        console.log("==========1======");
        setIsSubscribed(!!subscription);
      } catch (err) {
        console.log("==========2======");
        console.warn(err.code, err.message);
        setIsSubscribed(false);
      } finally {
        await RNIap.endConnection();
      }
    };

    checkSubscription();
  }, []);

  if (isSubscribed === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return isSubscribed ? <MainAppContent /> : <SubscriptionScreen />;
};

export default withIAPContext(App);
