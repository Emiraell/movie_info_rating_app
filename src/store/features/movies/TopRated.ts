import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Data } from "./Popular";

// Initial state interface
export interface Rated {
  topRated: Data;
  status: string;
}
// get top rated movies data from the local storage
const storedTopRated = sessionStorage.getItem("topRated");

// check if the movie data in the local storage isn't a falsy value
let topRatedMovies;
try {
  topRatedMovies = storedTopRated && (JSON.parse(storedTopRated) as Data);
} catch (err) {
  console.log(err);
}

// initial state for top rated movies
const initialState: Rated = {
  topRated: topRatedMovies || {
    movies: null,
    tvshows: null,
  },
  status: "",
};

// Top rated slice
export const TopRatedSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTopRated.fulfilled, (state, action) => {
        const data = action.payload;
        // assign returned data to either tvshows or movies based on the type
        data.type === "movie"
          ? (state.topRated.movies = data.results)
          : (state.topRated.tvshows = data.results);
        sessionStorage.setItem("topRated", JSON.stringify(state.topRated));
        state.status = "success";
      })
      .addCase(fetchTopRated.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchTopRated.rejected, (state) => {
        state.status = "error";
        state.topRated.movies = state.topRated.movies;
        state.topRated.tvshows = state.topRated.tvshows;
        sessionStorage.setItem("topRated", JSON.stringify(state.topRated));
        state.status = "error";
      });
  },
});

// A request to fetch Top Rated movies and tvshows
export const fetchTopRated = createAsyncThunk(
  "getTopRatedMovies",
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
      `https://api.themoviedb.org/3/${type}/top_rated?language=en-US&page=1`,
      options
    );

    const data = await res.json();
    return { ...data, type };
  }
);
export default TopRatedSlice.reducer;
