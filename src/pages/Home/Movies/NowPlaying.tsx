import { useEffect, useState } from "react";
import SliderCarousel from "../../../components/Slider";
import { Data } from "../../../store/features/movies/Popular";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { fetchNowPlaying } from "../../../store/features/movies/NowPlaying";
import { Button, ButtonGroup } from "@mui/material";

export default function NowPlayingMovies() {
  const { movies, tvshows }: Data = useAppSelector(
    (state) => state.nowPlaying.nowPlaying
  );
  const [displayMovies, setDisplayMovies] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchNowPlaying("movie"));
    return () => {};
  }, []);
  return (
    <div className="text-gray-100 text-center w-[95%] m-auto mt-10 mb-40">
      <p className="movieTitle">Now Playing </p>
      <ButtonGroup className="py-10">
        <Button
          // className={`movieBtn ${displayMovies && "bg-yellow-500 "}`}
          sx={{ backgroundColor: displayMovies ? "red" : "transparent" }}
          onClick={() => {
            dispatch(fetchNowPlaying("movie"));
            setDisplayMovies(true);
          }}
        >
          movie
        </Button>
        <Button
          sx={{ backgroundColor: !displayMovies ? "red" : "transparent" }}
          // className={`movieBtn ${!displayMovies && "bg-yellow-500 "}`}
          onClick={() => {
            dispatch(fetchNowPlaying("tv"));
            setDisplayMovies(false);
          }}
        >
          Tvshows
        </Button>
      </ButtonGroup>
      {displayMovies ? (
        <>
          <p className="py-4 text-lg">Now Playing Movies</p>
          <SliderCarousel data={movies} genre={"movie"} />
        </>
      ) : (
        <>
          <p className="py-4 text-lg">On the air Tv shows</p>
          <SliderCarousel data={tvshows} genre={"tv"} />
        </>
      )}
    </div>
  );
}
