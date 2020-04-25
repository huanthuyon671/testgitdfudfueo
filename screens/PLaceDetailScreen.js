import React from "react";
import { StyleSheet, Text, View } from "react-native";

const PLaceDetailScreen = () => {
  return (
    <View>
      <Text>ok</Text>
    </View>
  );
};

PLaceDetailScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("title"),
  };
};

export default PLaceDetailScreen;

const styles = StyleSheet.create({});
