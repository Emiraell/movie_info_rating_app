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
    !trending.movies && dispatch(fetchTrending("movie"));
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
            !trending.movies && dispatch(fetchTrending("movie"));
            setDisplayMovies(true);
          }}
        >
          movie
        </Button>
        <Button
          sx={{ backgroundColor: !displayMovies ? "red" : "transparent" }}
          onClick={() => {
            // fetch tvshows when button is clicked
            !trending.tvshows && dispatch(fetchTrending("tv"));
            setDisplayMovies(false);
          }}
        >
          Tvshows
        </Button>
      </ButtonGroup>
      {displayMovies ? (
        !trending.movies ? (
          <>
            <p className="py-4 text-lg">Trending Movies</p>
            <div className=" italic text-lg text-yellow-100 text-center px-2">
              {status === "pending" && (
                <p className="py-9">Loading trending movies....</p>
              )}
              {status === "error" && (
                <p className="py-9">
                  Unable to load trending movies, check your connection
                  <br /> and try again
                </p>
              )}
            </div>
          </>
        ) : (
          <>
            {/* display movies  */}
            <p className="py-4 text-lg">Trending Movies</p>
            <SliderCarousel data={trending.movies} type={"movie"} />
          </>
        )
      ) : !trending.tvshows ? (
        <>
          <p className="py-4 text-lg">Trending Tv Shows</p>
          <div className=" italic text-lg text-yellow-100 text-center px-2">
            {status === "pending" && (
              <p className="py-4">Loading trending tv shows....</p>
            )}
            {status === "error" && (
              <p className="py-4">
                Unable to load trending tv shows, check your connection
                <br /> and try again
              </p>
            )}
          </div>
        </>
      ) : (
        <>
          {/* display Tvshows  */}
          <p className="pb-3 text-lg">Trending Tv Shows</p>
          <SliderCarousel data={trending.tvshows} type={"tv"} />
        </>
      )}
    </div>
  );
}
