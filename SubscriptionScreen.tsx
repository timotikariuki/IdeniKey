import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useIAP, getSubscriptions } from 'react-native-iap';

const subscriptionSkus = ['com.idenikey.subscription'];

const SubscriptionScreen = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const { connected, getProducts } = useIAP();

  useEffect(() => {
    if (connected) {
      getProducts(subscriptionSkus).then((products) => {
        setSubscriptions(products);
      }).catch((error) => {
        console.error('Error fetching subscriptions', error);
      });
    }
  }, [connected]);

  return (
    <View>
      {subscriptions.map((subscription) => (
        <View key={subscription.productId}>
          <Text>{subscription.title}</Text>
          <Text>{subscription.localizedPrice}</Text>
        </View>
      ))}
    </View>
  );
};

export default SubscriptionScreen;
