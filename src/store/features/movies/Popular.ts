import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Movies {
  first_air_date: string;
  // adult: boolean;
  // backdrop_path: string;
  // genre_ids: number[];
  id: number;
  // original_language: string;
  original_title: string;
  overview: string;
  name: string;
  // popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  // video: boolean;
  vote_average: number;
  // vote_count: number;
  // genre: string;
}
export interface TvShows {
  // adult: boolean;
  // backdrop_path: string;
  first_air_date: string;
  // genre_ids: number[];
  id: number;
  name: string;
  // origin_country: string[];
  // original_language: string;
  original_name: string;
  overview: string;
  release_date: string;
  title: string;
  // popularity: number;
  poster_path: string;
  vote_average: number;
  // vote_count: number;
  // genre: string;
}

export interface Data {
  popularMovies: Movies[];
  popularTv: TvShows[];
}
const storedMovies = localStorage.getItem("movies");

let movieData;

try {
  movieData = storedMovies && (JSON.parse(storedMovies) as Data);
} catch (err) {
  console.log(err);
}
const initialState: Data = movieData || { popularMovies: [], popularTv: [] };
export const PopularSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchPopularMovies.fulfilled, (state, action) => {
      const data = action.payload;
      data.genre === "movie"
        ? (state.popularMovies = data.results)
        : (state.popularTv = data.results);

      localStorage.setItem("movies", JSON.stringify(state));
    });
  },
});

export const fetchPopularMovies = createAsyncThunk(
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
      `https://api.themoviedb.org/3/${genre}/popular?language=en-US&page=1`,
      options
    );

    const data = await res.json();
    const returenedData = { ...data, genre };
    console.log(returenedData);

    return returenedData;
  }
);

export default PopularSlice.reducer;
