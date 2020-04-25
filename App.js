import React from "react";
import { Provider } from "react-redux";
import { combineReducers, createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

import PlacesNavigator from "./navigation/PlacesNavigator";
import placeReducer from "./store/places-reducer";
import { init } from "./helpers/db";

init()
  .then(() => {
    console.log("oki");
  })
  .catch((err) => {
    console.log("fail");
    console.log(err);
  });
const rootReducer = combineReducers({
  places: placeReducer,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}
