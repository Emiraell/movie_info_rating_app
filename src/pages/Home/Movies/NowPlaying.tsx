import { useEffect, useState } from "react";
import SliderCarousel from "../../../components/Slider";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { fetchNowPlaying } from "../../../store/features/movies/NowPlaying";
import { Button, ButtonGroup } from "@mui/material";

export default function NowPlayingMovies() {
  // get now playing movies from redux store
  const { nowPlaying, status } = useAppSelector((state) => state.nowPlaying);

  // To determine if to display tvshow or movies
  const [displayMovies, setDisplayMovies] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  // dispatch fetchNowplaying on page load
  useEffect(() => {
    !nowPlaying.movies && dispatch(fetchNowPlaying("movie"));
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
            !nowPlaying.movies && dispatch(fetchNowPlaying("movie"));
            setDisplayMovies(true);
          }}
        >
          movie
        </Button>
        <Button
          sx={{ backgroundColor: !displayMovies ? "red" : "transparent" }}
          onClick={() => {
            // fetch tvshows when button is clicked
            !nowPlaying.tvshows && dispatch(fetchNowPlaying("tv"));
            setDisplayMovies(false);
          }}
        >
          Tvshows
        </Button>
      </ButtonGroup>
      {displayMovies ? (
        !nowPlaying.movies ? (
          <>
            <p className="py-4 text-lg">Now Playing Movies</p>
            <div className=" italic text-lg text-yellow-100 text-center px-2">
              {status === "pending" && (
                <p className="py-9">Loading now playing movies....</p>
              )}
              {status === "error" && (
                <p className="py-9">
                  Unable to load now playing movies, check your connection
                  <br /> and try again
                </p>
              )}
            </div>
          </>
        ) : (
          <>
            {/* display movies  */}
            <p className="py-4 text-lg">Now Playing Movies</p>
            <SliderCarousel data={nowPlaying.movies} type={"movie"} />
          </>
        )
      ) : !nowPlaying.tvshows ? (
        <>
          <p className="py-4 text-lg">On the air tv shows</p>
          <div className=" italic text-lg text-yellow-100 text-center px-2">
            {status === "pending" && (
              <p className="py-4">Loading on the air tv shows....</p>
            )}
            {status === "error" && (
              <p className="py-4">
                Unable to load on the air tv shows, check your connection
                <br /> and try again
              </p>
            )}
          </div>
        </>
      ) : (
        <>
          {/* display movies  */}
          <p className="pb-3 text-lg">On the air tv shows</p>
          <SliderCarousel data={nowPlaying.tvshows} type={"tv"} />
        </>
      )}
    </div>
  );
}
