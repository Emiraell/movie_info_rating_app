import { useEffect, useState } from "react";
import usefetch, { Data } from "../hooks/useFetch";
import SliderCarousel from "../Slider";

export default function Popular() {
  const popularStorage = localStorage.getItem("popular");

  let popularData;
  try {
    popularData = popularStorage && (JSON.parse(popularStorage) as Data);
  } catch (err) {
    console.log(err);
  }

  const [genre, setGenre] = useState<string>("movie");
  const { movies, tvshows } = usefetch({
    url: `https://api.themoviedb.org/3/${genre}/popular?language=en-US&page=1`,
    genre,
    storageName: "popular",
  });

  const [popular, setPopular] = useState<Data>(
    popularData || { movies: [], tvshows: [] }
  );
  useEffect(() => {
    movies && setPopular({ ...popular, movies });
    tvshows && setPopular({ ...popular, tvshows });
  }, [genre]);

  const [showingPopularMovie, setShowingPopularMovie] = useState<boolean>(true);

  return (
    <div className="my-12 text-white">
      <button
        onClick={() => {
          setGenre("movie");
          setShowingPopularMovie(true);
        }}
        className=" text-white mx-3"
      >
        Movie
      </button>
      <button
        onClick={() => {
          setGenre("tv");
          setShowingPopularMovie(false);
        }}
        className=" text-white mx-3"
      >
        Tvshows
      </button>

      <>
        <div className="text-gray-50 text-right pr-10 py-5 text-lg">
          see all
        </div>
        {showingPopularMovie ? (
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
