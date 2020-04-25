import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import PlacesListScreen from "../screens/PlacesListScreen";
import { Platform } from "react-native";
import Colors from "../constants/Colors";
import NewPlaceScreen from "../screens/NewPlaceScreen";
import PLaceDetailScreen from "../screens/PLaceDetailScreen";
import MapScreen from "../screens/MapScreen";
const PlacesNavigator = createStackNavigator(
  {
    PlacesList: PlacesListScreen,
    NewPlace: NewPlaceScreen,
    PlaceDetail: PLaceDetailScreen,
    Map: MapScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primary : "white",
      },
      headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
    },
  }
);

export default createAppContainer(PlacesNavigator);
