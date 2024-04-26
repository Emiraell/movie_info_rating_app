import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Movies } from "./Popular";

export interface Trending {
  trendingMovies: Movies[];
  trendingTvshows: Movies[];
}
const storedMovies = localStorage.getItem("trending");

let movieData;

try {
  movieData = storedMovies && (JSON.parse(storedMovies) as Trending);
} catch (err) {
  console.log(err);
}
const initialState: Trending = movieData || {
  trendingMovies: [],
  trendingTvshows: [],
};
export const TrendingSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchTrending.fulfilled, (state, action) => {
      const data = action.payload;
      data.genre === "movie"
        ? (state.trendingMovies = data.results)
        : (state.trendingTvshows = data.results);

      localStorage.setItem("trending", JSON.stringify(state));
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
      `https://api.themoviedb.org/3/${genre}/trending/day?language=en-US`,
      options
    );

    const data = await res.json();
    const returenedData = { ...data, genre };
    console.log(returenedData);

    return returenedData;
  }
);

export default TrendingSlice.reducer;
