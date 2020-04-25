import * as FileSystem from "expo-file-system";
import { insertPlace, fetchPlaces } from "../helpers/db";
export const SET_PLACE = "SET_PLACE";
export const ADD_NEW_PLACE = "ADD_NEW_PLACE";

export const addNewPlace = (title, image) => {
  return async (dispatch) => {
    const fileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;
    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });
      const dbResutl = await insertPlace(
        title,
        newPath,
        "Dummy address",
        15.6,
        12.3
      );
      console(dbResutl);
    } catch (error) {
      console.log(error);
      throw error;
    }

    dispatch({
      type: ADD_NEW_PLACE,
      payload: { id: dbResutl.insertId, title, newPath },
    });
  };
};

export const loadPlaces = () => {
  return async (dispatch) => {
    try {
      const dbResutl = await fetchPlaces();
      dispatch({
        type: SET_PLACE,
        payload: dbResutl.rows._array,
      });
      console.log(dbResutl);
    } catch (error) {
      throw error;
    }
  };
};
