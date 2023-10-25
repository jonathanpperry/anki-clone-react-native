import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_STORAGE_KEY } from "../data/api";

const Page = () => {
  const [hasId, setHasID] = useState(false);

  useEffect(() => {
    const loadId = async () => {
      const id = await AsyncStorage.getItem(USER_STORAGE_KEY);
      console.log('file, index.tsx:13 ~ loadId ~ id: ', id);
      if (!id) {
        const randomUserId = Math.random().toString(36);

        await AsyncStorage.setItem(USER_STORAGE_KEY, randomUserId);
      }
      setHasID(true);
    };
    loadId();
  }, []);

  if (hasId) {
    return <Redirect href="/(tabs)/sets" />;
  } else {
    return <View />;
  }
};

export default Page;
