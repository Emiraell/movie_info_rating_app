import { Box, Toolbar } from "@mui/material";
import Header from "../../components/Header";
import Hero from "./Hero";
import PopularMovies from "./Movies/Popular";
import TrendingMovies from "./Movies/Trending";
import TopRatedMovies from "./Movies/TopRated";
import NowPlayingMovies from "./Movies/NowPlaying";
import Footer from "../../components/Footer";
import { useState } from "react";

export default function Main() {
  const [searchedMovie, setSearchMovie] = useState();
  const [showingSearched, setShowingSearch] = useState<boolean>(false);
  return (
    <>
      <Box sx={{}}>
        <Header />
        <Toolbar />
        <Hero
          setShowingSearch={setSearchMovie}
          homePage={true}
          pageName="home"
        />
        <>
          <PopularMovies />
          <TrendingMovies />
          <TopRatedMovies />
          <NowPlayingMovies />
        </>
        <Footer />
      </Box>
    </>
  );
}
