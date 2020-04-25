import Place from "../models/Place";
import { ADD_NEW_PLACE, SET_PLACE } from "./places-action";

const initialState = {
  places: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_PLACE:
      return {
        places: payload.map(
          (pl) => new Place(pl.id.toString(), pl.title, pl.imageUri)
        ),
      };
    case ADD_NEW_PLACE:
      const newPlace = new Place(
        payload.id.toString(),
        payload.title,
        payload.image
      );
      console.log(newPlace);
      return {
        places: state.places.concat(newPlace),
      };

    default:
      return state;
  }
};
