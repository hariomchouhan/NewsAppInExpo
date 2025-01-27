import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Link, Stack } from "expo-router";
import Loading from "@/components/Loading";
import { NewsItem } from "@/components/NewsList";
import { useIsFocused } from "@react-navigation/native";
import { Colors } from "@/constants/Colors";

type Props = {};

const Page = (props: Props) => {
  const [bookmarkNews, setBookmarkNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    fetchBookmark();
  }, [isFocused]);

  const fetchBookmark = async () => {
    try {
      setIsLoading(true); // Set loading at the beginning
      const token = await AsyncStorage.getItem("bookmark");
      const res = token ? JSON.parse(token) : [];

      if (res.length > 0) {
        const query_string = res.join(",");
        const response = await axios.get(
          `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&id=${query_string}`
        );

        if (response.data && response.data.results) {
          setBookmarkNews(response.data.results);
        } else {
          setBookmarkNews([]);
        }
      } else {
        setBookmarkNews([]);
      }
    } catch (error: any) {
      console.error("Error fetching bookmarks:", error.message);
      setBookmarkNews([]); // Reset bookmarkNews on error
    } finally {
      setIsLoading(false); // Always stop loading
    }
  };
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
        }}
      />
      <View style={styles.container}>
        {isLoading ? (
          <Loading size={"large"} />
        ) : bookmarkNews.length > 0 ? (
          <FlatList
            data={bookmarkNews}
            keyExtractor={(_, index) => `list_item${index}`}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <Link href={`/news/${item.article_id}`} asChild key={index}>
                  <TouchableOpacity>
                    <NewsItem item={item} />
                  </TouchableOpacity>
                </Link>
              );
            }}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Bookmark is Empty</Text>
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.black,
    opacity: 0.5,
  },
});

export default Page;
