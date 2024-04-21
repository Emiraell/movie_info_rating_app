import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface Movies {
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
}
interface TvShows {
  first_air_date: string;
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  name: string;
  vote_average: number;
}

interface Data {
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
      data.name === "movie"
        ? (state.popularMovies = data.results)
        : (state.popularTv = data.results);

      localStorage.setItem("movies", JSON.stringify(state));
    });
  },
});

export const fetchPopularMovies = createAsyncThunk(
  "getMovies",
  async (name: string) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjc1YzEyYjhlYTI4ODFkODRhODA4ZDZiOTgwODA0ZSIsInN1YiI6IjY2MTk5YWZjOTBjZjUxMDE3Y2EyNmYwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A4OG4SnjnTSJY4f6Kiy1HMCN5qxlVn2pa6xJImqLXvc",
      },
    };

    const res = await fetch(
      `https://api.themoviedb.org/3/${name}/popular?language=en-US&page=1`,
      options
    );

    const data = await res.json();
    const returenedData = { ...data, name };
    console.log(returenedData);

    return returenedData;
  }
);

export default PopularSlice.reducer;
