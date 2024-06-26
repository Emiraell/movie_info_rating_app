import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// user interface
interface User {
  name: string;
  guestId: string | null;
  status: string;
}

const initialState: User = {
  name: sessionStorage.getItem("name") || "",
  guestId: sessionStorage.getItem("guestId") || null,
  status: "",
};

// User Auth slice
export const AuthUserSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to login user
    loginUser: (state, action: PayloadAction<string>) => {
      state.guestId && (state.name = action.payload);
      sessionStorage.setItem("name", action.payload);
    },
    // action to logout user
    logout: (state) => {
      state.name = "";
      state.guestId = null;
      sessionStorage.removeItem("guestId");
      sessionStorage.removeItem("name");
      sessionStorage.removeItem("nowPlaying");
      sessionStorage.removeItem("popular");
      sessionStorage.removeItem("trending");
      sessionStorage.removeItem("topRated");
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAuth.fulfilled, (state, action) => {
        state.guestId = action.payload.guest_session_id;
        state.guestId && sessionStorage.setItem("guestId", state.guestId);
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
      Authorization: `Bearer ${import.meta.env.VITE_MY_AUTH_KEY}`,
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
export const { loginUser, logout } = AuthUserSlice.actions;
export default AuthUserSlice.reducer;
