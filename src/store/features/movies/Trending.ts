import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Movies } from "./Popular";

export interface Trending {
  trendingMovies: Movies[];
  trendingTvshows: Movies[];
}
export interface State {
  trending: Trending;
}
const storedTrending = localStorage.getItem("trending");

let movieData;

try {
  movieData = storedTrending && (JSON.parse(storedTrending) as Trending);
} catch (err) {
  console.log(err);
}
const initialState: State =
  // movieData ||
  {
    trending: {
      trendingMovies: [],
      trendingTvshows: [],
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
        ? (state.trending.trendingMovies = data.results)
        : (state.trending.trendingTvshows = data.results);

      sessionStorage.setItem("trending", JSON.stringify(state.trending));
    });
  },
});

export const fetchTrending = createAsyncThunk(
  "getMovies",
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
