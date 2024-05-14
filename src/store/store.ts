import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AuthUserSlice } from "./features/Auth";
import { PopularSlice } from "./features/movies/Popular";
import { TopRatedSlice } from "./features/movies/TopRated";
import { TrendingSlice } from "./features/movies/Trending";
import { NowPlayingSlice } from "./features/movies/NowPlaying";

export const store = configureStore({
  reducer: {
    // import all redux
    userAuth: AuthUserSlice.reducer,
    popular: PopularSlice.reducer,
    topRated: TopRatedSlice.reducer,
    trending: TrendingSlice.reducer,
    nowPlaying: NowPlayingSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// useAppDispatch for dispatching any actions
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
// useAppSelector for accessing any state slice state
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
