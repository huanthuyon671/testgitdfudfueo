import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Image, Alert } from "react-native";
import Colors from "../constants/Colors";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
const ImgPicker = ({ onImageTaken }) => {
  const [Pickimg, setPickimg] = useState("");
  const verifyPermissions = async () => {
    const res = await Permissions.askAsync(Permissions.CAMERA);
    if (res.status !== "granted") {
      Alert.alert(
        "Insufficient permissions",
        "You need to grant camera to use this app",
        [
          {
            text: "Okay",
          },
        ]
      );
      return false;
    }
    return true;
  };
  const takeImageHandler = async () => {
    const hasPermissions = await verifyPermissions();
    if (!hasPermissions) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setPickimg(image.uri);
    onImageTaken(image.uri);
  };
  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!Pickimg ? (
          <Text>No image picked yet.</Text>
        ) : (
          <Image style={styles.image} source={{ uri: Pickimg }} />
        )}
      </View>
      <Button
        title="Take Image"
        color={Colors.primary}
        onPress={takeImageHandler}
      />
    </View>
  );
};

export default ImgPicker;

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
    marginBottom: 15,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
