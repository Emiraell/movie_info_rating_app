import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { TopRatedMovies } from "./Popular";

export interface TopRatedMovies {
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
export interface TopRated {
  topRatedMovies: TopRatedMovies[];
  topRatedTvshows: TopRatedMovies[];
}
export interface Rated {
  rated: TopRated;
}
const storedTopRated = localStorage.getItem("topRated");

let topRatedData;

try {
  topRatedData = storedTopRated && (JSON.parse(storedTopRated) as TopRated);
} catch (err) {
  console.log(err);
}
const initialState: Rated =
  // topRatedData ||
  {
    rated: {
      topRatedMovies: [],
      topRatedTvshows: [],
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
        ? (state.rated.topRatedMovies = data.results)
        : (state.rated.topRatedTvshows = data.results);

      localStorage.setItem("topRated", JSON.stringify(state.rated));
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
    console.log(returenedData, "topRated");

    return returenedData;
  }
);

export default TopRatedSlice.reducer;
