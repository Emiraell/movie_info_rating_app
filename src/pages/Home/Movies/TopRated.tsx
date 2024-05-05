import { useEffect, useState } from "react";
import SliderCarousel from "../../../components/Slider";
import { Data } from "../../../store/features/movies/Popular";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { fetchTopRated } from "../../../store/features/movies/TopRated";

export default function TopRatedMovies() {
  const { movies, tvshows }: Data = useAppSelector(
    (state) => state.topRated.topRated
  );
  const [displayMovies, setDisplayMovies] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchTopRated("movie"));
    return () => {};
  }, []);
  return (
    <div className="text-gray-100 text-center w-[95%] m-auto my-10">
      <p className="movieTitle">Top Rated</p>
      <div className="flex gap-6 justify-center pt-8 pb-4">
        <button
          className={`movieBtn ${displayMovies && "bg-yellow-500 "}`}
          onClick={() => {
            dispatch(fetchTopRated("movie"));
            setDisplayMovies(true);
          }}
        >
          movie
        </button>
        <button
          className={`movieBtn ${!displayMovies && "bg-yellow-500 "}`}
          onClick={() => {
            // dispatch(fetchTopRated("tv"));
            setDisplayMovies(false);
          }}
        >
          Tvshows
        </button>
      </div>
      {displayMovies ? (
        <>
          <p className="py-4 text-lg">Top Rated Movies</p>
          <SliderCarousel data={movies} genre={"movie"} />
        </>
      ) : (
        <>
          <p className="py-4 text-lg">Top Rated Tv shows</p>
          <SliderCarousel data={tvshows} genre={"tv"} />
        </>
      )}
    </div>
  );
}
