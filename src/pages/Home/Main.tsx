import { Box, Toolbar } from "@mui/material";
import Header from "../../components/Header";
import Hero from "./Hero";
import NavButtons from "../../components/NavButtons";

export default function Main() {
  return (
    <>
      <Box sx={{}}>
        <Header />
        <Toolbar />
        <Hero />
        <NavButtons />
      </Box>
    </>
  );
}
