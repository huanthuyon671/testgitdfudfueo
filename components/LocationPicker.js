import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import Colors from "../constants/Colors";

const LocationPicker = () => {
  const [pickLocation, setPickLocation] = useState();
  const [isFetching, setIsFetching] = useState(false);
  const verifyPermission = async () => {
    const res = await Permissions.askAsync(Permissions.LOCATION);
    if (res.status !== "grandted") {
      Alert.alert("Cho phep ung dung", "Ban can cho phep vi tri cua ban", [
        { text: "Oki" },
      ]);
      return false;
    }
    return true;
  };
  const getLocationHandler = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }
    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });
      console.log(location);
    } catch (error) {
      Alert.alert("Could not fectch locaation!", "Please try agian later", [
        { text: "oki" },
      ]);
      setIsFetching(false);
    }
  };
  return (
    <View style={styles.locationPicker}>
      <View style={styles.mapPreview}>
        {isFetching ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Text>No Location chosen yet!</Text>
        )}
      </View>
      <Button
        title="Get User Location"
        color={Colors.primary}
        onPress={getLocationHandler}
      />
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
  },
});
