import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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

export interface Data {
  movies: Movie[] | null;
  tvshows: Movie[] | null;
}

export interface Popular {
  popular: Data;
}
const storedPopularMovies = localStorage.getItem("popular");
let popularMovies;

try {
  popularMovies =
    storedPopularMovies && (JSON.parse(storedPopularMovies) as Data);
} catch (err) {
  console.log(err);
}
const initialState: Popular = {
  popular: popularMovies || { movies: null, tvshows: null },
};
export const PopularSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchPopular.fulfilled, (state, action) => {
      const data = action.payload;
      if (data.genre === "movie") {
        state.popular.movies = data.results;
        localStorage.setItem("popular", JSON.stringify(state.popular));
      } else {
        state.popular.tvshows = data.results;
        localStorage.setItem("popular", JSON.stringify(state.popular));
      }
    });
  },
});

export const fetchPopular = createAsyncThunk(
  "getPopularMovies",
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
      `https://api.themoviedb.org/3/${genre}/popular?language=en-US&page=1`,
      options
    );

    const data = await res.json();
    console.log(data);
    return { ...data, genre };
  }
);
export default PopularSlice.reducer;
