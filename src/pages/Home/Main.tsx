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
        <div
          className="text-center m-auto text-gray-50 text-lg md:text-2xl mt-5
           font-bold tracking-wider w-fit border-b-4 pb-2 border-dashed border-yellow-500"
        >
          Popular
        </div>
        <NavButtons />
      </Box>
    </>
  );
}
