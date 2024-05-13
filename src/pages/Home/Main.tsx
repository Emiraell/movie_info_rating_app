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

interface ContextProps {
  setShowingSearch: Dispatch<SetStateAction<boolean>>;
  movieToSearch: string;
  setMovieToSearch: Dispatch<SetStateAction<string>>;
  setSerachedMovies: Dispatch<SetStateAction<MovieDetails[]>>;
  searchedMovies: MovieDetails[];
}
export const MovieContext = createContext<ContextProps>({
  movieToSearch: "",
  setMovieToSearch: () => "",
  setShowingSearch: () => false,
  setSerachedMovies: () => [],
  searchedMovies: [],
});

export default function Main() {
  const [movieToSearch, setMovieToSearch] = useState<string>("");
  const [showingSearched, setShowingSearch] = useState<boolean>(false);
  const [searchedMovies, setSerachedMovies] = useState<MovieDetails[]>([]);
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
          <Hero
            // setShowingSearch={setShowingSearch}
            homePage={true}
            pageName="home"
          />
          <>
            {!showingSearched ? (
              <>
                <PopularMovies />
                <TrendingMovies />
                <TopRatedMovies />
                <NowPlayingMovies />
              </>
            ) : (
              <Searched />
            )}
          </>
          <Footer />
        </Box>
      </MovieContext.Provider>
    </>
  );
}
