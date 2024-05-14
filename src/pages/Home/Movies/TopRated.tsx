import { useEffect, useState } from "react";
import SliderCarousel from "../../../components/Slider";
import { Data } from "../../../store/features/movies/Popular";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { fetchTopRated } from "../../../store/features/movies/TopRated";
import { Button, ButtonGroup } from "@mui/material";

export default function TopRatedMovies() {
  // get now playing movies from redux store
  const { movies, tvshows }: Data = useAppSelector(
    (state) => state.topRated.topRated
  );

  // To determine if to display tvshow or movies
  const [displayMovies, setDisplayMovies] = useState<boolean>(true);

  const dispatch = useAppDispatch();

  // dispatch fetchTopRated on page load
  useEffect(() => {
    dispatch(fetchTopRated("movie"));
    return () => {};
  }, []);
  return (
    <div className="text-gray-100 text-center w-[95%] m-auto my-10">
      <p className="movieTitle">Top Rated</p>
      <ButtonGroup className="py-10">
        <Button
          sx={{ backgroundColor: displayMovies ? "red" : "transparent" }}
          onClick={() => {
            //  fetch movies when button is clicked
            dispatch(fetchTopRated("movie"));
            setDisplayMovies(true);
          }}
        >
          movie
        </Button>
        <Button
          sx={{ backgroundColor: !displayMovies ? "red" : "transparent" }}
          onClick={() => {
            // fetch tvshows when button is clicked
            dispatch(fetchTopRated("tv"));
            setDisplayMovies(false);
          }}
        >
          Tvshows
        </Button>
      </ButtonGroup>
      {displayMovies ? (
        // display top rated movies
        <>
          <p className="py-4 text-lg">Top Rated Movies</p>
          <SliderCarousel data={movies} type={"movie"} />
        </>
      ) : (
        // display top rated tv shows
        <>
          <p className="py-4 text-lg">Top Rated Tv shows</p>
          <SliderCarousel data={tvshows} type={"tv"} />
        </>
      )}
    </div>
  );
}
