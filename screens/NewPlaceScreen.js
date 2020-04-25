import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import Colors from "../constants/Colors";

import { useDispatch } from "react-redux";
import * as placesAtions from "../store/places-action";
import ImagePicker from "../components/ImagePicker";
import LocationPicker from "../components/LocationPicker";

const NewPlaceScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [seletedImage, setSelectedImage] = useState();

  const titleChangeHandler = (text) => {
    setTitle(text);
  };
  const submitHandler = () => {
    dispatch(placesAtions.addNewPlace(title, seletedImage));
    navigation.goBack();
  };
  const imageTakenHandler = (imagePath) => {
    setSelectedImage(imagePath);
  };
  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          value={title}
          onChangeText={titleChangeHandler}
          style={styles.input}
        />
        <ImagePicker onImageTaken={imageTakenHandler} />
        <LocationPicker />
        <Button
          title="Save Place"
          color={Colors.primary}
          onPress={submitHandler}
        />
      </View>
    </ScrollView>
  );
};

export default NewPlaceScreen;

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  input: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});
