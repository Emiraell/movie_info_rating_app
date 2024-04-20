import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = { name: "", userIn: false, guestId: null };
export const AuthUserSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    Loginn: (state, action) => {
      // const dispatch = useAppDispatch();
      // dispatch(getAuth());
      state.guestId && (state.name = action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(getAuth.fulfilled, (state, action) => {
      state.guestId = action.payload.guest_session_id;
      state.guestId &&
        (localStorage.setItem("guest", state.guestId), (state.userIn = true));
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

export const { Loginn } = AuthUserSlice.actions;
export default AuthUserSlice.reducer;
