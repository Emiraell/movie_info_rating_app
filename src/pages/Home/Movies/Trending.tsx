import { useEffect, useState } from "react";
import SliderCarousel from "../../../components/Slider";
import { Data } from "../../../store/features/movies/Popular";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { fetchTrending } from "../../../store/features/movies/Trending";

export default function TrendingMovies() {
  const { movies, tvshows }: Data = useAppSelector(
    (state) => state.trending.trending
  );
  const [displayMovies, setDisplayMovies] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchTrending("movie"));
    return () => {};
  }, []);
  return (
    <div className="text-gray-100 text-center w-[95%] m-auto my-10">
      <p className="movieTitle">Trending</p>
      <div className="flex gap-6 justify-center py-10">
        <button
          className={`movieBtn ${!displayMovies && "bg-yellow-500 "}`}
          onClick={() => {
            dispatch(fetchTrending("movie"));
            setDisplayMovies(true);
          }}
        >
          movie
        </button>
        <button
          className={`movieBtn ${!displayMovies && "bg-yellow-500 "}`}
          onClick={() => {
            dispatch(fetchTrending("tv"));
            setDisplayMovies(false);
          }}
        >
          Tvshows
        </button>
      </div>
      {displayMovies ? (
        <>
          <p className="py-4 text-lg">Trending Movies</p>
          <SliderCarousel data={movies} />
        </>
      ) : (
        <>
          <p className="py-4 text-lg">Trending Tv shows</p>
          <SliderCarousel data={tvshows} />
        </>
      )}
    </div>
  );
}
