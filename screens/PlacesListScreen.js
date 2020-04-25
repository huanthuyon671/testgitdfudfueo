import React, { useEffect } from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { useSelector, useDispatch } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import PlaceItem from "../components/PlaceItem";
import * as placesActions from "../store/places-action";
const PlacesListScreen = ({ navigation }) => {
  const places = useSelector((state) => state.places.places);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(placesActions.loadPlaces());
  }, [dispatch]);
  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PlaceItem
          title={item.title}
          imageUrl={item.imageUri}
          address={null}
          onSelect={() =>
            navigation.navigate("PlaceDetail", {
              title: item.title,
              id: item.id,
            })
          }
        />
      )}
    />
  );
};

PlacesListScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "All places",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add Places"
          iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
          onPress={() => navData.navigation.navigate("NewPlace")}
        />
      </HeaderButtons>
    ),
  };
};

export default PlacesListScreen;

const styles = StyleSheet.create({});
