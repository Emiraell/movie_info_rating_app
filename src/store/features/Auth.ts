import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface User {
  name: string;
  guestId: string | null;
  expire: string | null;
}

let storedUserId = localStorage.getItem("guestId");
let storedUserName = localStorage.getItem("name");

const initialState: User = {
  name: storedUserName || "",
  guestId: storedUserId || null,
  expire: null,
};
export const AuthUserSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    LoginUser: (state, action) => {
      state.guestId && (state.name = action.payload);
      localStorage.setItem("name", action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(getAuth.fulfilled, (state, action) => {
      state.guestId = action.payload.guest_session_id;
      state.guestId && localStorage.setItem("guestId", state.guestId);
    });
  },
});

export const getAuth = createAsyncThunk("getAuth", async () => {
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
  return result;
});

export const { LoginUser } = AuthUserSlice.actions;
export default AuthUserSlice.reducer;
