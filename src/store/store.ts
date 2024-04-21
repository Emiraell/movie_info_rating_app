import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AuthUserSlice } from "./features/Auth";
import { PopularSlice } from "./features/movies/Popular";

export const store = configureStore({
  reducer: {
    userAuth: AuthUserSlice.reducer,
    movieReducer: PopularSlice.reducer,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
