import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MovieDetails } from "../../../hooks/useFetch";

// interface for needed info goten from the request made to fetch movies
export interface Movie {
  first_air_date: string;
  id: number;
  original_title: string;
  overview: string;
  name: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
}

// interface for both the tvshow and movie
export interface Data {
  movies: MovieDetails[] | null;
  tvshows: MovieDetails[] | null;
}

// initial state interface
export interface Popular {
  popular: Data;
  status: string;
}

// get popular movies data from the local storage
const storedPopularMovies = localStorage.getItem("popular");

// check if the movie data in the local storage isn't a falsy value
let popularMovies;
try {
  popularMovies =
    storedPopularMovies && (JSON.parse(storedPopularMovies) as Data);
} catch (err) {
  console.log(err);
}
// initial state for popular movies
const initialState: Popular = {
  popular: popularMovies || { movies: null, tvshows: null },
  status: "",
};

// Popular slice
export const PopularSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPopular.fulfilled, (state, action) => {
        const data = action.payload;
        // assign returned data to either tvshows or movies based on the type
        if (data.type === "movie") {
          state.popular.movies = data.results;
        } else {
          state.popular.tvshows = data.results;
        }
        localStorage.setItem("popular", JSON.stringify(state.popular));
        state.status = "success";
      })
      .addCase(fetchPopular.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchPopular.rejected, (state) => {
        state.status = "error";
        state.popular.movies = state.popular.movies;
        state.popular.tvshows = state.popular.tvshows;
        localStorage.setItem("popular", JSON.stringify(state.popular));
        state.status = "error";
      });
  },
});

// A request to fetch popular movies and tvshows
export const fetchPopular = createAsyncThunk(
  "getPopularMovies",
  async (type: string) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjc1YzEyYjhlYTI4ODFkODRhODA4ZDZiOTgwODA0ZSIsInN1YiI6IjY2MTk5YWZjOTBjZjUxMDE3Y2EyNmYwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A4OG4SnjnTSJY4f6Kiy1HMCN5qxlVn2pa6xJImqLXvc",
      },
    };

    // fetch data based on the type i.e either tvshow or movies
    const res = await fetch(
      `https://api.themoviedb.org/3/${type}/popular?language=en-US&page=1`,
      options
    );

    const data = await res.json();
    return { ...data, type };
  }
);
export default PopularSlice.reducer;
