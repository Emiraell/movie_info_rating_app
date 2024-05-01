import { Box, Toolbar } from "@mui/material";
import Header from "../../components/Header";
import Hero from "./Hero";
import Popular from "../../components/movies/Popular";
import Trending from "../../components/movies/Trending";
import TopRated from "../../components/movies/TopRated";
import NowPlaying from "../../components/movies/NowPlaying";

export default function Main() {
  return (
    <>
      <Box sx={{}}>
        <Header />
        <Toolbar />
        <Hero />
        <>
          <div
            className="text-center m-auto text-gray-50 text-lg md:text-2xl mt-5
           font-bold tracking-wider w-fit border-b-4 pb-2 border-dashed border-yellow-500"
          >
            Popular
          </div>
          <Popular />
        </>
        <>
          <div
            className="text-center m-auto text-gray-50 text-lg md:text-2xl mt-5
           font-bold tracking-wider w-fit border-b-4 pb-2 border-dashed border-yellow-500"
          >
            Trending
          </div>
          <Trending />
        </>
        <>
          <div
            className="text-center m-auto text-gray-50 text-lg md:text-2xl mt-5
           font-bold tracking-wider w-fit border-b-4 pb-2 border-dashed border-yellow-500"
          >
            Top Rated
          </div>
          <TopRated />
        </>
        <>
          <div
            className="text-center m-auto text-gray-50 text-lg md:text-2xl mt-5
           font-bold tracking-wider w-fit border-b-4 pb-2 border-dashed border-yellow-500"
          >
            Now playing
          </div>
          <NowPlaying />
        </>
      </Box>
    </>
  );
}
