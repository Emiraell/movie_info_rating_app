import { Button, ButtonGroup, Toolbar } from "@mui/material";
import Header from "../../components/Header";
import RatedMovies from "./Movies";
import Footer from "../../components/Footer";
import { useState } from "react";
import RatedTvShows from "./TvShows";

export default function Rated() {
  const [displayMovies, setDisplayMovies] = useState<boolean>(true);
  return (
    <div>
      <Header />
      <Toolbar />
      <div>
        <Button disableElevation onClick={() => setDisplayMovies(true)}>
          Movies
        </Button>
        <Button disableElevation onClick={() => setDisplayMovies(false)}>
          Tv shows
        </Button>
      </div>
      {displayMovies ? <RatedMovies /> : <RatedTvShows />}
      <Footer />
    </div>
  );
}
