import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const MovieSlice = createSlice({
  name: "movies",
  initialState: "",
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchPopularMovies.fulfilled, (state, action) => {});
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

    const data = res.json();
    console.log(data);

    return data;
  }
);

export default MovieSlice.reducer;
