import React, { useEffect, useRef } from "react";
import { View, ActivityIndicator, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  InterstitialAd,
  AdEventType,
  TestIds,
} from "react-native-google-mobile-ads";
import { router } from "expo-router";

const AdScreen = () => {
  const navigation = useNavigation();
  const interstitialRef = useRef<InterstitialAd | null>(null);

  useEffect(() => {
    // Replace with your real AdMob ID when not testing
    const adUnitId =
      Platform.OS === "android"
        ? 'ca-app-pub-1071099494556372/7474463312'
        : TestIds.INTERSTITIAL;

    const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
      requestNonPersonalizedAdsOnly: true,
    });
    interstitialRef.current = interstitial;

    // 👇 new API: addAdEventListener instead of onAdEvent
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        router.replace("/ai"); // Go to Ai.tsx after ad closes
      }
    );

    const errorListener = interstitial.addAdEventListener(
      AdEventType.ERROR,
      () => {
        router.replace("/ai"); // If ad fails, still go to Ai
      }
    );

    interstitial.load();

    // Try to show ad when loaded
    const checkInterval = setInterval(() => {
      if (interstitial.loaded) {
        interstitial.show();
        clearInterval(checkInterval);
      }
    }, 1000);

    return () => {
      unsubscribe();
      errorListener();
      clearInterval(checkInterval);
    };
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default AdScreen;
