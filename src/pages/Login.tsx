import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../store/features/store";
import { getAuth } from "../store/features/Auth";

export default function Login() {
  const [name, setName] = useState<string>("");
  const dispatch = useAppDispatch();

  const Login = async () => {
    await dispatch(getAuth());
  };
  return (
    <>
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
          {name !== "" && (
            <Button
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
