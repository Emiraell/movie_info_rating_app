import { useEffect, useState } from "react";
import SliderCarousel from "../../../components/Slider";
import { Data, fetchPopular } from "../../../store/features/movies/Popular";
import { useAppDispatch, useAppSelector } from "../../../store/store";

export default function PopularMovies() {
  const { movies, tvshows }: Data = useAppSelector(
    (state) => state.popular.popular
  );
  const [displayMovies, setDisplayMovies] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPopular("movie"));
    return () => {};
  }, []);
  return (
    <div className="text-gray-100 text-center w-[95%] m-auto my-10">
      <p className="movieTitle">popular</p>
      <div className="flex gap-6 justify-center pt-8 pb-4">
        <button
          className={`movieBtn ${displayMovies && "bg-yellow-500 "}`}
          onClick={() => {
            dispatch(fetchPopular("movie"));
            setDisplayMovies(true);
          }}
        >
          movie
        </button>
        <button
          className={`movieBtn ${!displayMovies && "bg-yellow-500 "}`}
          onClick={() => {
            dispatch(fetchPopular("tv"));
            setDisplayMovies(false);
          }}
        >
          Tvshows
        </button>
      </div>
      {displayMovies ? (
        <>
          <p className="py-4 text-lg">Popular Movies</p>
          <SliderCarousel data={movies} genre={"movie"} />
        </>
      ) : (
        <>
          <p className="py-4 text-lg">Popular Tv shows</p>
          <SliderCarousel data={tvshows} genre={"tv"} />
        </>
      )}
    </div>
  );
}
