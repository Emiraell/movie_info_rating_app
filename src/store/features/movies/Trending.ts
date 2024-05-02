import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Data } from "./Popular";

export interface State {
  trending: Data;
}
const storedTrendingMovies = localStorage.getItem("trending");

let trendingMovies;

try {
  trendingMovies =
    storedTrendingMovies && (JSON.parse(storedTrendingMovies) as Data);
} catch (err) {
  console.log(err);
}
const initialState: State = {
  trending: trendingMovies || {
    movies: [],
    tvshows: [],
  },
};
export const TrendingSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchTrending.fulfilled, (state, action) => {
      const data = action.payload;
      data.genre === "movie"
        ? (state.trending.movies = data.results)
        : (state.trending.tvshows = data.results);

      localStorage.setItem("trending", JSON.stringify(state.trending));
    });
  },
});

export const fetchTrending = createAsyncThunk(
  "getTrendingMovies",
  async (genre: string) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjc1YzEyYjhlYTI4ODFkODRhODA4ZDZiOTgwODA0ZSIsInN1YiI6IjY2MTk5YWZjOTBjZjUxMDE3Y2EyNmYwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A4OG4SnjnTSJY4f6Kiy1HMCN5qxlVn2pa6xJImqLXvc",
      },
    };

    const res = await fetch(
      `https://api.themoviedb.org/3/trending/${genre}/day?language=en-US`,
      options
    );

    const data = await res.json();
    const returenedData = { ...data, genre };

    return returenedData;
  }
);
export default TrendingSlice.reducer;
