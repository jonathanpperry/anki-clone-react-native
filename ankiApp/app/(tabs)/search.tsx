import {
  View,
  Text,
  ListRenderItem,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Set, getSets } from "../../data/api";
import { defaultStyleSheet } from "../../constants/Styles";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { transformImage } from "@xata.io/client";
import "react-native-url-polyfill/auto";

const Page = () => {
  const [sets, setSets] = useState<Set[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    loadSets();
  });

  const loadSets = async () => {
    const data = await getSets();

    setSets(data);
  };

  const renderSetRow: ListRenderItem<Set> = ({ item }) => {
    return (
      <Link href={`/(modals)/set/${item.id}`} asChild>
        <TouchableOpacity style={styles.setRow}>
          <View style={{ flexDirection: "row", gap: 10 }}>
            {item.image && (
              <Image
                source={{
                  uri: transformImage(item.image.url, {
                    width: 100,
                    height: 100,
                  }),
                }}
                style={{ width: 50, height: 50, borderRadius: 8 }}
              />
            )}
            {!item.image && <View style={{ width: 50, height: 50 }} />}
            <View style={{ flex: 1 }}>
              <Text style={styles.rowTitle}>{item.title}</Text>
              <Text style={{ color: Colors.darkGrey }}>{item.cards} Cards</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={24} color={"#ccc"} />
          </View>
        </TouchableOpacity>
      </Link>
    );
  };

  return (
    <View style={defaultStyleSheet.container}>
      <FlatList
        renderItem={renderSetRow}
        data={sets}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={loadSets} />
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
