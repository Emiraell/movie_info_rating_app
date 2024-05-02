import { Box, Toolbar } from "@mui/material";
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import PopularMovies from "./Movies/Popular";
import TrendingMovies from "./Movies/Trending";
import TopRatedMovies from "./Movies/TopRated";
import NowPlayingMovies from "./Movies/NowPlaying";
import Footer from "../../components/Footer";
import { createContext, Dispatch, SetStateAction, useState } from "react";

interface ContextProps {
  // setShowingSearch: Dispatch<SetStateAction<boolean>>;
  searchedMovie: string;
  setSearchMovie: Dispatch<SetStateAction<string>>;
}
export const MovieContext = createContext<ContextProps>({
  searchedMovie: "",
  setSearchMovie: () => "",
  // setShowingSearch: () => false,
});

export default function Main() {
  const [searchedMovie, setSearchMovie] = useState<string>("");
  // const [showingSearched, setShowingSearch] = useState<boolean>(false);
  return (
    <>
      <MovieContext.Provider value={{ searchedMovie, setSearchMovie }}>
        <Box sx={{}}>
          <Header />
          <Toolbar />
          <Hero
            // setShowingSearch={setShowingSearch}
            homePage={true}
            pageName="home"
          />
          <>
            {searchedMovie === "" ? (
              <>
                <PopularMovies />
                <TrendingMovies />
                <TopRatedMovies />
                <NowPlayingMovies />
              </>
            ) : (
              <div>movie</div>
            )}
          </>
          <Footer />
        </Box>
      </MovieContext.Provider>
    </>
  );
}
