import { useEffect, useState } from "react";
import SliderCarousel from "../../../components/Slider";
import { Data, fetchPopular } from "../../../store/features/movies/Popular";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { Button, ButtonGroup } from "@mui/material";

export default function PopularMovies() {
  // get now playing movies from redux store
  const { movies, tvshows }: Data = useAppSelector(
    (state) => state.popular.popular
  );

  // To determine if to display tvshow or movies
  const [displayMovies, setDisplayMovies] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  // dispatch fetchPopular on page load
  useEffect(() => {
    dispatch(fetchPopular("movie"));
    return () => {};
  }, []);

  return (
    <div className="text-gray-100 text-center w-[95%] m-auto my-10">
      <p className="movieTitle">popular</p>
      <ButtonGroup className="py-10">
        <Button
          sx={{ backgroundColor: displayMovies ? "red" : "transparent" }}
          onClick={() => {
            //  fetch movies when button is clicked
            dispatch(fetchPopular("movie"));
            setDisplayMovies(true);
          }}
        >
          movie
        </Button>
        <Button
          sx={{ backgroundColor: !displayMovies ? "red" : "transparent" }}
          onClick={() => {
            // fetch tvshows when button is clicked
            dispatch(fetchPopular("tv"));
            setDisplayMovies(false);
          }}
        >
          Tvshows
        </Button>
      </ButtonGroup>
      {displayMovies ? (
        // display popular movies
        <>
          <p className="py-4 text-lg">Popular Movies</p>
          <SliderCarousel data={movies} type={"movie"} />
        </>
      ) : (
        // display popular tvshow
        <>
          <p className="py-4 text-lg">Popular Tv shows</p>
          <SliderCarousel data={tvshows} type={"tv"} />
        </>
      )}
    </div>
  );
}
