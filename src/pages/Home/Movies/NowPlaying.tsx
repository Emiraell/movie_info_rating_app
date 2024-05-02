import { useEffect, useState } from "react";
import SliderCarousel from "../../../components/Slider";
import { Data } from "../../../store/features/movies/Popular";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { fetchNowPlaying } from "../../../store/features/movies/NowPlaying";

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
    <div className="text-gray-100 text-center w-[95%] m-auto my-10">
      <p className="movieTitle">Now Playing </p>
      <div className="flex gap-6 justify-center py-10">
        <button
          className={`movieBtn ${displayMovies && "bg-yellow-500 "}`}
          onClick={() => {
            dispatch(fetchNowPlaying("movie"));
            setDisplayMovies(true);
          }}
        >
          movie
        </button>
        <button
          className={`movieBtn ${!displayMovies && "bg-yellow-500 "}`}
          onClick={() => {
            dispatch(fetchNowPlaying("tv"));
            setDisplayMovies(false);
          }}
        >
          Tvshows
        </button>
      </div>
      {displayMovies ? (
        <>
          <p className="py-4 text-lg">Now Playing Movies</p>
          <SliderCarousel data={movies} />
        </>
      ) : (
        <>
          <p className="py-4 text-lg">On the air Tv shows</p>
          <SliderCarousel data={tvshows} />
        </>
      )}
    </div>
  );
}
