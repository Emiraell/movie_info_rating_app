import { Box, Toolbar } from "@mui/material";
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import PopularMovies from "./Movies/Popular";
import TrendingMovies from "./Movies/Trending";
import TopRatedMovies from "./Movies/TopRated";
import NowPlayingMovies from "./Movies/NowPlaying";
import Footer from "../../components/Footer";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import Searched from "./Movies/Searched";
import { MovieDetails } from "../../hooks/useFetch";

// context interface
interface ContextProps {
  setShowingSearch: Dispatch<SetStateAction<boolean>>;
  movieToSearch: string;
  setMovieToSearch: Dispatch<SetStateAction<string>>;
  setSerachedMovies: Dispatch<SetStateAction<MovieDetails[] | null>>;
  searchedMovies: MovieDetails[] | null;
}

// context wrapping components in the home page page
export const MovieContext = createContext<ContextProps>({
  movieToSearch: "",
  setMovieToSearch: () => "",
  setShowingSearch: () => false,
  setSerachedMovies: () => [] || null,
  searchedMovies: [] || null,
});

export default function Main() {
  // name of movie to search to be provided by user
  const [movieToSearch, setMovieToSearch] = useState<string>("");
  // to show searched movies
  const [showingSearched, setShowingSearch] = useState<boolean>(false);
  // store result of searched movies
  const [searchedMovies, setSerachedMovies] = useState<MovieDetails[] | null>(
    null
  );
  return (
    <>
      <MovieContext.Provider
        value={{
          movieToSearch,
          setMovieToSearch,
          setShowingSearch,
          setSerachedMovies,
          searchedMovies,
        }}
      >
        <Box sx={{}}>
          <Header />
          <Toolbar />
          <Hero homePage={true} pageName="Home" />
          <>
            {!showingSearched ? (
              // display home content movies if user isn't searching for movies
              <>
                <PopularMovies />
                <TrendingMovies />
                <TopRatedMovies />
                <NowPlayingMovies />
              </>
            ) : (
              // display result of searched movies
              <Searched />
            )}
          </>
          <Footer />
        </Box>
      </MovieContext.Provider>
    </>
  );
}
