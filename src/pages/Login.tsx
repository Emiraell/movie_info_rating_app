import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { getAuth, LoginUser } from "../store/features/Auth";
import Header from "../components/Header";
import { motion } from "framer-motion";

export default function Login() {
  // user name state
  const [name, setName] = useState<string>("");
  // dispatch
  const dispatch = useAppDispatch();
  const { guestId } = useAppSelector((state) => state.userAuth);

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
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            className=" rounded bg-blue-700 text-lg outline-none w-[80%] p-2 text-gray-50
						 placeholder:text-gray-50"
          />
          {name !== "" && (
            // display login button if name is not empty
            <motion.button
              className="block w-[70%] my-3 rounded-full p-1 m-auto bg-white"
              initial={{ y: 200, opacity: 0 }}
              whileInView={{ y: 0, opacity: 0.9 }}
              transition={{ duration: 0.5 }}
              whileHover={{ opacity: 0.6 }}
              onClick={async (e) => {
                e.preventDefault();

                // dispatch getauth function
                await dispatch(getAuth());
                // dispatch login function after authorizing user
                guestId && dispatch(LoginUser(name));
              }}
            >
              Login as guest
            </motion.button>
          )}
        </Box>
      </Box>
    </>
  );
}
