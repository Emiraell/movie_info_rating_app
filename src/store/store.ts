import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AuthUserSlice } from "./features/Auth";
import { PopularSlice } from "./features/movies/Popular";
import { TopRatedSlice } from "./features/movies/TopRated";
import { TrendingSlice } from "./features/movies/Trending";

export const store = configureStore({
  reducer: {
    userAuth: AuthUserSlice.reducer,
    popularMovie: PopularSlice.reducer,
    topRated: TopRatedSlice.reducer,
    trending: TrendingSlice.reducer,
  },
  // middleware:(getDefaultMiddleware) =>
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
