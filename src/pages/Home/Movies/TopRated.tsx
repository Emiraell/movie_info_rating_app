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
    !topRated.movies && dispatch(fetchTopRated("movie"));
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
            !topRated.movies && dispatch(fetchTopRated("movie"));
            setDisplayMovies(true);
          }}
        >
          movie
        </Button>
        <Button
          sx={{ backgroundColor: !displayMovies ? "red" : "transparent" }}
          onClick={() => {
            // fetch tvshows when button is clicked
            !topRated.tvshows && dispatch(fetchTopRated("tv"));
            setDisplayMovies(false);
          }}
        >
          Tvshows
        </Button>
      </ButtonGroup>
      {displayMovies ? (
        !topRated.movies ? (
          <>
            <p className="py-4 text-lg">Top RatedMovies</p>
            <div className=" italic text-lg text-yellow-100 text-center px-2">
              {status === "pending" && (
                <p className="py-9">Loading top rated movies....</p>
              )}
              {status === "error" && (
                <p className="py-9">
                  Unable to load top rated movies, check your connection
                  <br /> and try again
                </p>
              )}
            </div>
          </>
        ) : (
          <>
            {/* display movies  */}
            <p className="py-4 text-lg">Top Rated Movies</p>
            <SliderCarousel data={topRated.movies} type={"movie"} />
          </>
        )
      ) : !topRated.tvshows ? (
        <>
          <p className="py-4 text-lg">On the air tv shows</p>
          <div className=" italic text-lg text-yellow-100 text-center px-2">
            {status === "pending" && (
              <p className="py-4">Loading top rated tv shows....</p>
            )}
            {status === "error" && (
              <p className="py-4">
                Unable to load top rated tv shows, check your connection
                <br /> and try again
              </p>
            )}
          </div>
        </>
      ) : (
        <>
          {/* display Tvshows  */}
          <p className="pb-3 text-lg">Top rated tv shows</p>
          <SliderCarousel data={topRated.tvshows} type={"tv"} />
        </>
      )}
    </div>
  );
}
