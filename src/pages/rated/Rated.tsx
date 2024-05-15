import { Button, ButtonGroup, Toolbar } from "@mui/material";
import Header from "../../components/Header";
import RatedMovies from "./Movies";
import Footer from "../../components/Footer";
import { useState } from "react";
import RatedTvShows from "./TvShows";
import Hero from "../../components/Hero";

export default function Rated() {
  const [displayMovies, setDisplayMovies] = useState<boolean>(true);
  return (
    <div>
      <Header />
      <Toolbar />

      <Hero homePage={false} pageName="Rated" />
      <ButtonGroup className="p-5">
        <Button
          disableElevation
          onClick={() => setDisplayMovies(true)}
          sx={{ backgroundColor: displayMovies ? "red" : "transparent" }}
        >
          Movies
        </Button>
        <Button
          disableElevation
          onClick={() => setDisplayMovies(false)}
          sx={{ backgroundColor: !displayMovies ? "red" : "transparent" }}
        >
          Tv shows
        </Button>
      </ButtonGroup>
      {/* display rated movies if displaymovies and tv shows if other wise */}
      {displayMovies ? <RatedMovies /> : <RatedTvShows />}
      <Footer />
    </div>
  );
}
