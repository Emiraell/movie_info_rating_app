import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const MovieRating = createSlice({
  name: "rating_movie",
  initialState: "",
  reducers: {
    addRating: (state, action: PayloadAction<number>) => {
      const options = {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json;charset=utf-8",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjc1YzEyYjhlYTI4ODFkODRhODA4ZDZiOTgwODA0ZSIsInN1YiI6IjY2MTk5YWZjOTBjZjUxMDE3Y2EyNmYwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A4OG4SnjnTSJY4f6Kiy1HMCN5qxlVn2pa6xJImqLXvc",
        },
      };

      fetch(
        `https://api.themoviedb.org/3/movie/movie_id/${action.payload}`,
        options
      )
        .then((res) => res.json())
        .then((data) => {})
        .catch((err) => console.error(err));
    },
  },
});
