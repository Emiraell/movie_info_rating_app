import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Data } from "./Popular";

// initial state interface
export interface NowPlaying {
  nowPlaying: Data;
  status: string;
}
// get Now playing movies data from the local storage
const storedNowData = sessionStorage.getItem("nowPlaying");

// check if the movie data in the local storage isn't a falsy value
let NowPlayingData;
try {
  NowPlayingData = storedNowData && (JSON.parse(storedNowData) as Data);
} catch (err) {
  console.log(err);
}

// initial state for now playing movies
const initialState: NowPlaying = {
  nowPlaying: NowPlayingData || {
    movies: null,
    tvshows: null,
  },
  status: "",
};

// Now playing slice
export const NowPlayingSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchNowPlaying.fulfilled, (state, action) => {
        const data = action.payload;
        // assign returned data to either tvshows or movies based on the type
        data.type === "movie"
          ? (state.nowPlaying.movies = data.results)
          : (state.nowPlaying.tvshows = data.results);
        // store in local storage
        sessionStorage.setItem("nowPlaying", JSON.stringify(state.nowPlaying));
        state.status = "success";
      })
      .addCase(fetchNowPlaying.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchNowPlaying.rejected, (state) => {
        state.status = "error";
        state.nowPlaying.movies = state.nowPlaying.movies;
        state.nowPlaying.tvshows = state.nowPlaying.tvshows;
        sessionStorage.setItem("nowPlaying", JSON.stringify(state.nowPlaying));
        state.status = "error";
      });
  },
});

// A request to fetch Now playing movies and tvshows
export const fetchNowPlaying = createAsyncThunk(
  "getNowPlayingMovies",
  async (type: string) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_MY_AUTH_KEY}`,
      },
    };

    // fetch data based on the type i.e either tvshow or movies
    const res =
      type === "movie"
        ? await fetch(
            `https://api.themoviedb.org/3/${type}/now_playing?language=en-US&page=1`,
            options
          )
        : await fetch(
            `https://api.themoviedb.org/3/${type}/on_the_air?language=en-US&page=1`,
            options
          );

    const data = await res.json();
    return { ...data, type };
  }
);

export default NowPlayingSlice.reducer;
