import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Data } from "./Popular";

export interface NowPlaying {
  nowPlaying: Data;
}
const storedNowData = localStorage.getItem("nowPlaying");

let NowPlayingData;

try {
  NowPlayingData = storedNowData && (JSON.parse(storedNowData) as Data);
} catch (err) {
  console.log(err);
}
const initialState: NowPlaying = {
  nowPlaying: NowPlayingData || {
    movies: null,
    tvshows: null,
  },
};
export const NowPlayingSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchNowPlaying.fulfilled, (state, action) => {
      const data = action.payload;
      data.genre === "movie"
        ? (state.nowPlaying.movies = data.results)
        : (state.nowPlaying.tvshows = data.results);

      localStorage.setItem("nowPlaying", JSON.stringify(state.nowPlaying));
    });
  },
});

export const fetchNowPlaying = createAsyncThunk(
  "getNowPlayingMovies",
  async (genre: string) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjc1YzEyYjhlYTI4ODFkODRhODA4ZDZiOTgwODA0ZSIsInN1YiI6IjY2MTk5YWZjOTBjZjUxMDE3Y2EyNmYwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A4OG4SnjnTSJY4f6Kiy1HMCN5qxlVn2pa6xJImqLXvc",
      },
    };

    const res =
      genre === "movie"
        ? await fetch(
            `https://api.themoviedb.org/3/${genre}/now_playing?language=en-US&page=1`,
            options
          )
        : await fetch(
            `https://api.themoviedb.org/3/${genre}/on_the_air?language=en-US&page=1`,
            options
          );

    const data = await res.json();
    const returenedData = { ...data, genre };
    console.log(returenedData, "nowPlaying");

    return returenedData;
  }
);

export default NowPlayingSlice.reducer;
