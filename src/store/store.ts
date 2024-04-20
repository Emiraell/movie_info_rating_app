import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AuthUserSlice } from "./features/Auth";
import { MovieSlice } from "./features/Movies";

export const store = configureStore({
  reducer: {
    userAuth: AuthUserSlice.reducer,
    movieReducer: MovieSlice.reducer,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
