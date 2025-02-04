import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

type Props = {};

const Header = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image
          source={{ uri: "https://xsgames.co/randomusers/avatar.php?g=male" }}
          style={styles.userImage}
        />
        <View style={{ gap: 3 }}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.username}>Hariom Chouhan!</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          alert("Feature is not available");
        }}
      >
        <Ionicons name="notifications-outline" size={24} color={Colors.black} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  welcomeText: {
    fontSize: 12,
    color: Colors.darkGrey,
  },
  username: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.black,
  },
});

export default Header;
