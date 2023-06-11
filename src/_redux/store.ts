import { contactsSlice } from './contactsReducer';
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { groupsSlice } from "./groupsReducer";
import { groupSlice } from "./groupReducer";
import { logActionMiddleware } from "./logActionMiddleware";
import { favoriteSlice } from './favoriteReducer';
import { contactSlice } from './contactReducer';


const rootReducer = combineReducers({
  groups: groupsSlice.reducer,
  group: groupSlice.reducer,
  contacts: contactsSlice.reducer,
  contact: contactSlice.reducer,
  favorite: favoriteSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: [
    logActionMiddleware
  ]
})

export type RootState = ReturnType<typeof rootReducer>
