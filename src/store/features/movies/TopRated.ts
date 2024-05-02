import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Data } from "./Popular";

export interface Rated {
  topRated: Data;
}
const storedTopRated = localStorage.getItem("topRated");

let topRatedMovies;

try {
  topRatedMovies = storedTopRated && (JSON.parse(storedTopRated) as Data);
} catch (err) {
  console.log(err);
}
const initialState: Rated = {
  topRated: topRatedMovies || {
    movies: [],
    tvshows: [],
  },
};
export const TopRatedSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchTopRated.fulfilled, (state, action) => {
      const data = action.payload;
      data.genre === "movie"
        ? (state.topRated.movies = data.results)
        : (state.topRated.tvshows = data.results);

      localStorage.setItem("topRated", JSON.stringify(state.topRated));
    });
  },
});

export const fetchTopRated = createAsyncThunk(
  "getTopRatedMovies",
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
      `https://api.themoviedb.org/3/${genre}/top_rated?language=en-US&page=1`,
      options
    );

    const data = await res.json();
    const returenedData = { ...data, genre };
    console.log(returenedData, "topRated");

    return returenedData;
  }
);

export default TopRatedSlice.reducer;
