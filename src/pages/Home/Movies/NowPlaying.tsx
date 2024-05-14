import { useEffect, useState } from "react";
import SliderCarousel from "../../../components/Slider";
import { Data } from "../../../store/features/movies/Popular";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { fetchNowPlaying } from "../../../store/features/movies/NowPlaying";
import { Button, ButtonGroup } from "@mui/material";

export default function NowPlayingMovies() {
  // get now playing movies from redux store
  const { movies, tvshows }: Data = useAppSelector(
    (state) => state.nowPlaying.nowPlaying
  );

  // To determine if to display tvshow or movies
  const [displayMovies, setDisplayMovies] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  // dispatch fetchNowplaying on page load
  useEffect(() => {
    dispatch(fetchNowPlaying("movie"));
    return () => {};
  }, []);

  return (
    <div className="text-gray-100 text-center w-[95%] m-auto mt-10 mb-40">
      <p className="movieTitle">Now Playing </p>
      <ButtonGroup className="py-10">
        <Button
          sx={{ backgroundColor: displayMovies ? "red" : "transparent" }}
          onClick={() => {
            //  fetch movies when button is clicked
            dispatch(fetchNowPlaying("movie"));
            setDisplayMovies(true);
          }}
        >
          movie
        </Button>
        <Button
          sx={{ backgroundColor: !displayMovies ? "red" : "transparent" }}
          onClick={() => {
            // fetch tvshows when button is clicked
            dispatch(fetchNowPlaying("tv"));
            setDisplayMovies(false);
          }}
        >
          Tvshows
        </Button>
      </ButtonGroup>
      {displayMovies ? (
        <>
          {/* display movies  */}
          <p className="py-4 text-lg">Now Playing Movies</p>
          <SliderCarousel data={movies} type={"movie"} />
        </>
      ) : (
        <>
          {/* display tv shows */}
          <p className="py-4 text-lg">On the air Tv shows</p>
          <SliderCarousel data={tvshows} type={"tv"} />
        </>
      )}
    </div>
  );
}
