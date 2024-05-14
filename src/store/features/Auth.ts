import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// user interface
interface User {
  name: string;
  guestId: string | null;
  status: string;
}

// initial state for authorized user stored in local storage
const initialState: User = {
  name: localStorage.getItem("guestId") || "",
  guestId: localStorage.getItem("name") || null,
  status: "",
};

// User Auth slice
export const AuthUserSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to login user
    LoginUser: (state, action: PayloadAction<string>) => {
      state.guestId && (state.name = action.payload);
      localStorage.setItem("name", action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAuth.fulfilled, (state, action) => {
        state.guestId = action.payload.guest_session_id;
        state.guestId && localStorage.setItem("guestId", state.guestId);
        state.status = "succesful";
      })
      .addCase(getAuth.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getAuth.rejected, (state) => {
        state.status = "error";
      });
  },
});

// Login user as a guest action/function
export const getAuth = createAsyncThunk("getAuth", async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjc1YzEyYjhlYTI4ODFkODRhODA4ZDZiOTgwODA0ZSIsInN1YiI6IjY2MTk5YWZjOTBjZjUxMDE3Y2EyNmYwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A4OG4SnjnTSJY4f6Kiy1HMCN5qxlVn2pa6xJImqLXvc",
    },
  };
  // make a request to login the user as a guest and generate a guest id on success
  const res = await fetch(
    "https://api.themoviedb.org/3/authentication/guest_session/new",
    options
  );
  const result = res.json();

  // return result on sucess
  return result;
});

// export actions
export const { LoginUser } = AuthUserSlice.actions;
export default AuthUserSlice.reducer;
