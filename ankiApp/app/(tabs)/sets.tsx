import {
  FlatList,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Set, getMySets } from "../../data/api";
import { defaultStyleSheet } from "../../constants/Styles";
import { Link } from "expo-router";
import Colors from "../../constants/Colors";

const Page = () => {
  const [sets, setSets] = useState<
    { id: string; set: Set; canEdit: boolean }[]
  >([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    loadSets();
  });

  const loadSets = async () => {
    const data = await getMySets();
    setSets(data);
  };

  const renderSetRow: ListRenderItem<{
    id: string;
    set: Set;
    canEdit: boolean;
  }> = ({ item: { set, canEdit } }) => (
    <View style={styles.setRow}>
      <View>
        <Text style={styles.rowTitle}>{set.title}</Text>

        <View style={{ flexDirection: "row", gap: 4, marginTop: 10 }}>
          <Link href={`/(learn)/${set.id}?limit=3`} asChild>
            <TouchableOpacity style={defaultStyleSheet.button}>
              <Text style={defaultStyleSheet.buttonText}>3 cards</Text>
            </TouchableOpacity>
          </Link>

          <Link href={`/(learn)/${set.id}?limit=6`} asChild>
            <TouchableOpacity style={defaultStyleSheet.button}>
              <Text style={defaultStyleSheet.buttonText}>6 cards</Text>
            </TouchableOpacity>
          </Link>

          <Link href={`/(learn)/${set.id}?limit=10`} asChild>
            <TouchableOpacity style={defaultStyleSheet.button}>
              <Text style={defaultStyleSheet.buttonText}>10 cards</Text>
            </TouchableOpacity>
          </Link>

          {canEdit && (
            <Link href={`/(modals)/(cards)/${set.id}`} asChild>
              <TouchableOpacity style={defaultStyleSheet.button}>
                <Text style={defaultStyleSheet.buttonText}>Edit</Text>
              </TouchableOpacity>
            </Link>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <View style={defaultStyleSheet.container}>
      {!sets.length && (
        <Link href={"/(tabs)/search"} asChild>
          <TouchableOpacity style={{}}>
            <Text
              style={{ textAlign: "center", padding: 20, color: "#3f3f3f" }}
            >
              Add your first set!
            </Text>
          </TouchableOpacity>
        </Link>
      )}
      <FlatList
        data={sets}
        renderItem={renderSetRow}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={loadSets} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  setRow: {
    margin: 8,
    padding: 16,
    backgroundColor: "#fff",
    flexDirection: "row",
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
});

export default Page;
