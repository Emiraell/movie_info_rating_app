import { Box, Toolbar } from "@mui/material";
import Header from "../../components/Header";
import Hero from "./Hero";
import Popular from "../../components/movies/Popular";
import Trending from "../../components/movies/Trending";
import TopRated from "../../components/movies/TopRated";
import NowPlaying from "../../components/movies/NowPlaying";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Data, fetchPopular } from "../../store/features/movies/Popular";
import SliderCarousel from "../../components/Slider";
import { useState } from "react";

export default function Main() {
  const { movies, tvshows }: Data = useAppSelector(
    (state) => state.popular.popular
  );
  const [displayMovies, setDisplayMovies] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  return (
    <>
      <Box sx={{}}>
        <Header />
        <Toolbar />
        <Hero />
        <>
          <div className="text-gray-100 text-center">
            <p className="movieTitle">popular</p>
            <div className="flex gap-6 justify-center py-7">
              <button
                className={`bg-yellow-500 px-3`}
                onClick={() => {
                  dispatch(fetchPopular("movie"));
                  setDisplayMovies(true);
                }}
              >
                movie
              </button>
              <button
                className={`bg-yellow-500 px-3`}
                onClick={() => {
                  dispatch(fetchPopular("tv"));
                  setDisplayMovies(false);
                }}
              >
                Tvshows
              </button>
            </div>
            {displayMovies ? (
              <>
                <p>Popular Movies</p>
                <SliderCarousel data={movies} />
              </>
            ) : (
              <>
                <p>Popular Tv shows</p>
                <SliderCarousel data={tvshows} />
              </>
            )}
          </div>
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
