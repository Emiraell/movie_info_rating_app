import { useEffect, useState } from "react";
import SliderCarousel from "../../../components/Slider";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { fetchTopRated } from "../../../store/features/movies/TopRated";
import { Button, ButtonGroup } from "@mui/material";

export default function TopRatedMovies() {
  // get now playing movies from redux store
  const { topRated, status } = useAppSelector((state) => state.topRated);

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
          <div className=" italic text-lg text-yellow-100 text-center px-2">
            {status === "pending" && (
              <p className="py-5">Loading top rated movies....</p>
            )}
            {status === "error" && (
              <p className="py-5">
                Unable to load top rated movies, chech your connection <br />{" "}
                and try again
              </p>
            )}
          </div>

          {status === "success" && (
            <SliderCarousel data={topRated.movies} type={"movie"} />
          )}
        </>
      ) : (
        // display top rated tv shows
        <>
          <p className="py-4 text-lg">Top Rated Tv shows</p>
          <div className=" italic text-lg text-yellow-100 text-center px-2 py-9">
            {status === "pending" && (
              <p className="py-9">Loading top rated tv shows....</p>
            )}
            {status === "error" && (
              <p className="py-9">
                Unable to load top rated movies, chech your connection <br />{" "}
                and try again
              </p>
            )}
          </div>

          {status === "success" && (
            <SliderCarousel data={topRated.tvshows} type={"tv"} />
          )}
        </>
      )}
    </div>
  );
}
