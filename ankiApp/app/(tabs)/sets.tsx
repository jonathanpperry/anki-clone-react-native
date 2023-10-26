import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { getMySets } from "../../data/api";

const Page = () => {
  useEffect(() => {
    loadSets();
  });

  const loadSets = async () => {
    const data = await getMySets();
    // setSets(data);
    console.log("the sets that are favorite: ", data);
  };

  return (
    <View>
      <Text>User Sets</Text>
    </View>
  );
};

export default Page;
