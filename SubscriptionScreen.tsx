import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { useIAP, getSubscriptions, requestSubscription } from 'react-native-iap';

const subscriptionSkus = ['com.idenikey.subscription'];
// const subscriptionSkus = ['monthly'];

const SubscriptionScreen = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const { connected, getProducts, currentPurchase, finishTransaction } = useIAP();

  useEffect(() => {
    if (connected) {
      console.log("=======SubscriptionScreen");
      getSubscriptions({ skus: subscriptionSkus }).then((products) => {
        console.log(products);
        console.log(products[0].subscriptionOfferDetails);
        setSubscriptions(products);
      }).catch((error) => {
        console.error('Error fetching subscriptions', error);
      });
    }
  }, [connected]);

  useEffect(() => {
    if (currentPurchase) {
      finishTransaction(currentPurchase);
      // Handle purchase validation and server-side verification here
    }
  }, [currentPurchase]);

  const handleSubscribe = async (subscription) => {
    const subscriptionOffers = [{sku: subscription.productId, offerToken: subscription.subscriptionOfferDetails[0].offerToken,}]
    try {
      await requestSubscription({ subscriptionOffers });
    } catch (error) {
      console.error('Error requesting subscription', error);
    }
  };

  return (
    <View>
      {subscriptions.map((subscription) => (
        <View key={subscription.productId}>
          <Text>{subscription.title}</Text>
          <Text>{subscription.localizedPrice}</Text>
          <Button title="Subscribe" onPress={() => handleSubscribe(subscription)} />
        </View>
      ))}
    </View>
  );
};

export default SubscriptionScreen;
