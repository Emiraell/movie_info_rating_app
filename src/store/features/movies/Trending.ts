import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Data } from "./Popular";

// initial state slice
export interface State {
  trending: Data;
  status: string;
}
// get top rated movies data from the local storage
const storedTrendingMovies = sessionStorage.getItem("trending");

// check if the movie data in the local storage isn't a falsy value
let trendingMovies;
try {
  trendingMovies =
    storedTrendingMovies && (JSON.parse(storedTrendingMovies) as Data);
} catch (err) {
  console.log(err);
}

// initial state for trending movies
const initialState: State = {
  trending: trendingMovies || {
    movies: null,
    tvshows: null,
  },
  status: "",
};

// Trending slice
export const TrendingSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTrending.fulfilled, (state, action) => {
        const data = action.payload;
        // assign returned data to either tvshows or movies based on the type
        data.type === "movie"
          ? (state.trending.movies = data.results)
          : (state.trending.tvshows = data.results);

        sessionStorage.setItem("trending", JSON.stringify(state.trending));
        state.status = "success";
      })
      .addCase(fetchTrending.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchTrending.rejected, (state) => {
        state.status = "error";
        state.trending.movies = state.trending.movies;
        state.trending.tvshows = state.trending.tvshows;
        sessionStorage.setItem("trending", JSON.stringify(state.trending));
        state.status = "error";
      });
  },
});

// A request to fetch trending movies and tvshows
export const fetchTrending = createAsyncThunk(
  "getTrendingMovies",
  async (type: string) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_MY_AUTH_KEY}`,
      },
    };

    // fetch data based on the type i.e either tvshow or movies
    const res = await fetch(
      `https://api.themoviedb.org/3/trending/${type}/day?language=en-US`,
      options
    );

    const data = await res.json();
    return { ...data, type };
  }
);
export default TrendingSlice.reducer;
