import { Box, Toolbar } from "@mui/material";
import Header from "../../components/Header";
import Hero from "./Hero";
import PopularMovies from "./Movies/Popular";
import TrendingMovies from "./Movies/Trending";
import TopRatedMovies from "./Movies/TopRated";

export default function Main() {
  return (
    <>
      <Box sx={{}}>
        <Header />
        <Toolbar />
        <Hero />
        <>
          <PopularMovies />
          <TrendingMovies />
          <TopRatedMovies />
        </>
        {/* <>
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
        </> */}
      </Box>
    </>
  );
}
