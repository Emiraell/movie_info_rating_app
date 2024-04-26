import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Movies {
  first_air_date: string;
  id: number;
  overview: string;
  name: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
}
// export interface TvShows {
//   first_air_date: string;
//   id: number;
//   name: string;
//   overview: string;
//   release_date: string;
//   title: string;
//   poster_path: string;
//   vote_average: number;
// }

export interface TopRated {
  topRatedMovies: Movies[];
  topRatedTvshows: Movies[];
}
const storedMovies = localStorage.getItem("topRated");

let movieData;

try {
  movieData = storedMovies && (JSON.parse(storedMovies) as TopRated);
} catch (err) {
  console.log(err);
}
const initialState: TopRated = movieData || {
  topRatedMovies: [],
  topRatedTvshows: [],
};
export const TopRatedSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchTopRated.fulfilled, (state, action) => {
      const data = action.payload;
      data.genre === "movie"
        ? (state.topRatedMovies = data.results)
        : (state.topRatedTvshows = data.results);

      localStorage.setItem("topRated", JSON.stringify(state));
    });
  },
});

export const fetchTopRated = createAsyncThunk(
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
      `https://api.themoviedb.org/3/${genre}/top_rated?language=en-US&page=1`,
      options
    );

    const data = await res.json();
    const returenedData = { ...data, genre };
    console.log(returenedData);

    return returenedData;
  }
);

export default TopRatedSlice.reducer;
