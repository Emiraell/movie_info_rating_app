import { useEffect, useState } from "react";
import SliderCarousel from "../../../components/Slider";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { fetchTrending } from "../../../store/features/movies/Trending";
import { Button, ButtonGroup } from "@mui/material";

export default function TrendingMovies() {
  // get now playing movies from redux store
  const { trending, status } = useAppSelector((state) => state.trending);

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
          <div className=" italic text-lg text-yellow-100 text-center px-2">
            {status === "pending" && (
              <p className="py-9">Loading trending movies....</p>
            )}
            {status === "error" && (
              <p className="py-9">
                Unable to load trending movies, chech your connection <br /> and
                try again
              </p>
            )}
          </div>

          {status === "success" && (
            <SliderCarousel data={trending.movies} type={"movie"} />
          )}
        </>
      ) : (
        // display trending tv shows
        <>
          <p className="py-4 text-lg">Trending Tv shows</p>
          <div className=" italic text-lg text-yellow-100 text-center px-2 py-9">
            {status === "pending" && (
              <p className="py-9">Loading trending tv shows....</p>
            )}
            {status === "error" && (
              <p className="py-9">
                Unable to load trending tv shows, chech your connection <br />{" "}
                and try again
              </p>
            )}
          </div>

          {status === "success" && (
            <SliderCarousel data={trending.tvshows} type={"tv"} />
          )}
        </>
      )}
    </div>
  );
}
