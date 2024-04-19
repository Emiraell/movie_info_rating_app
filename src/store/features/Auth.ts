import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = { name: "", userIn: false };
export const AuthUserSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAuth.fulfilled, (state, action) => {
      action.payload.result.success === true
        ? (state.userIn = true)
        : (state.userIn = false);
      // state.userIn = true;
    });
  },
});

export const getAuth = createAsyncThunk("getAuth", async (name) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjc1YzEyYjhlYTI4ODFkODRhODA4ZDZiOTgwODA0ZSIsInN1YiI6IjY2MTk5YWZjOTBjZjUxMDE3Y2EyNmYwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A4OG4SnjnTSJY4f6Kiy1HMCN5qxlVn2pa6xJImqLXvc",
    },
  };

  const res = await fetch(
    "https://api.themoviedb.org/3/authentication/guest_session/new",
    options
  );

  const result = res.json();
  console.log(result);

  return { ...result, name: name };
});

export default AuthUserSlice.reducer;
