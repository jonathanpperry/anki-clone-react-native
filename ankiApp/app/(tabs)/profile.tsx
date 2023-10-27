import {
  FlatList,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Set, getUserLearnings } from "../../data/api";
import { defaultStyleSheet } from "../../constants/Styles";
import Colors from "../../constants/Colors";

const Page = () => {
  const [sets, setSets] = useState<
    {
      set: Set;
      score: number;
      cards_correct: number;
      cards_wrong: number;
      id: string;
      xata: any;
    }[]
  >([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    const data = await getUserLearnings();
    setSets(data);
  };

  const renderSetRow: ListRenderItem<{
    set: Set;
    score: number;
    cards_correct: number;
    cards_wrong: number;
    id: string;
    xata: any;
  }> = ({ item }) => (
    <View style={styles.setRow}>
      <View>
        <Text style={styles.rowTitle}>{item.set.title}</Text>
        <Text style={{ color: Colors.darkGrey }}>
          Score: {item.score.toFixed(2)}, {item.xata.createdAt.substring(0, 10)}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={defaultStyleSheet.container}>
      <Text style={defaultStyleSheet.header}>{sets.length} sessions</Text>

      <FlatList
        data={sets}
        renderItem={renderSetRow}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={loadProgress} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  setRow: {
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey,
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
});

export default Page;
