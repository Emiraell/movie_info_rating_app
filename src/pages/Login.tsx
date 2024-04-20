import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/features/store";
import { getAuth, Loginn } from "../store/features/Auth";
import Header from "../components/Header";

export default function Login() {
  const [namee, setName] = useState<string>("");
  const dispatch = useAppDispatch();

  const { guestId, userIn, name } = useAppSelector((state) => state.userAuth);

  return (
    <>
      <Header />
      <Box
        sx={{
          textAlign: "center",
          justifyContent: "center",
          backgroundColor: "#1d4689",
          height: "100vh",
          justifyItems: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          px: 5,
        }}
      >
        <Box>
          <Typography color="white" variant="h5" marginY={5}>
            Welcome! Enter Name below and login as a guest
          </Typography>
          <TextField
            sx={{ width: "90%", py: 2 }}
            color="warning"
            variant="standard"
            label="Enter name"
            value={name}
            InputLabelProps={{
              sx: { fontSize: 25, letterSpacing: 2, color: "gray" },
            }}
            onChange={(e) => setName(e.target.value)}
            required
          ></TextField>
          {namee !== "" && (
            <Button
              onClick={async (e) => {
                e.preventDefault();
                await dispatch(getAuth());
                dispatch(Loginn(namee));
                console.log(guestId, name, userIn);
              }}
              sx={{
                my: 3,
                color: "#1d4689",
                backgroundColor: "whitesmoke",
                borderRadius: 7,
                width: "60%",
              }}
            >
              Login as guest
            </Button>
          )}
        </Box>
      </Box>
    </>
  );
}
