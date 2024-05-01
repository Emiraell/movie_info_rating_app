import { useEffect, useState } from "react";
import usefetch, { Data } from "../hooks/useFetch";
import SliderCarousel from "../Slider";

export default function TopRated() {
  const storedTopRated = localStorage.getItem("top_rated");

  let topRatedData;
  try {
    topRatedData = storedTopRated && (JSON.parse(storedTopRated) as Data);
  } catch (err) {
    console.log(err);
  }

  const [genre, setGenre] = useState<string>("movie");
  const { movies, tvshows } = usefetch({
    url: `https://api.themoviedb.org/3/${genre}/top_rated?language=en-US&page=1`,
    genre,
    storageName: "top_rated",
  });

  const [top_rated, setTopRated] = useState<Data>(
    topRatedData || { movies: [], tvshows: [] }
  );
  useEffect(() => {
    movies && setTopRated({ ...top_rated, movies });
    tvshows && setTopRated({ ...top_rated, tvshows });
  }, [genre]);

  const [showingTopRatedMovie, setShowingTopRatedMovie] =
    useState<boolean>(true);

  return (
    <div className="my-12 text-white">
      <button
        onClick={() => {
          setGenre("movie");
          setShowingTopRatedMovie(true);
        }}
        className=" text-white mx-3"
      >
        Movie
      </button>
      <button
        onClick={() => {
          setGenre("tv");
          setShowingTopRatedMovie(false);
        }}
        className=" text-white mx-3"
      >
        Tvshows
      </button>

      <>
        <div className="text-gray-50 text-right pr-10 py-5 text-lg">
          see all
        </div>
        {showingTopRatedMovie ? (
          <div className=" px-5">
            <p className="text-white">MOVIES</p>
            <SliderCarousel data={movies} />
          </div>
        ) : (
          <div className=" px-5">
            <p className="text-white">TV</p>
            <SliderCarousel data={tvshows} />
          </div>
        )}
      </>
    </div>
  );
}
