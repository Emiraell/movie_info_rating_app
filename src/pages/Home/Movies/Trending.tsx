import { useEffect, useState } from "react";
import SliderCarousel from "../../../components/Slider";
import { Data } from "../../../store/features/movies/Popular";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { fetchTrending } from "../../../store/features/movies/Trending";
import { Button, ButtonGroup } from "@mui/material";

export default function TrendingMovies() {
  // get now playing movies from redux store
  const { movies, tvshows }: Data = useAppSelector(
    (state) => state.trending.trending
  );

  // To determine if to display tvshow or movies
  const [displayMovies, setDisplayMovies] = useState<boolean>(true);

  const dispatch = useAppDispatch();

  // dispatch fetchTopRated on page load
  useEffect(() => {
    dispatch(fetchTrending("movie"));
    return () => {};
  }, []);
  return (
    <div className="text-gray-100 text-center w-[95%] m-auto my-10">
      <p className="movieTitle">Trending</p>
      <ButtonGroup className="py-10">
        <Button
          sx={{ backgroundColor: displayMovies ? "red" : "transparent" }}
          onClick={() => {
            //  fetch movies when button is clicked
            dispatch(fetchTrending("movie"));
            setDisplayMovies(true);
          }}
        >
          movie
        </Button>
        <Button
          sx={{ backgroundColor: !displayMovies ? "red" : "transparent" }}
          onClick={() => {
            // fetch tvshows when button is clicked
            dispatch(fetchTrending("tv"));
            setDisplayMovies(false);
          }}
        >
          Tvshows
        </Button>
      </ButtonGroup>
      {displayMovies ? (
        // display trending movies
        <>
          <p className="py-4 text-lg">Trending Movies</p>
          <SliderCarousel data={movies} type={"movie"} />
        </>
      ) : (
        // display trending tv shows
        <>
          <p className="py-4 text-lg">Trending Tv shows</p>
          <SliderCarousel data={tvshows} type={"tv"} />
        </>
      )}
    </div>
  );
}
