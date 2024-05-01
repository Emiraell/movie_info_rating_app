import { useEffect, useState } from "react";
import usefetch, { Data } from "../hooks/useFetch";
import SliderCarousel from "../Slider";

export default function Trending() {
  const storedTrending = localStorage.getItem("trending");

  let trendingData;
  try {
    trendingData = storedTrending && (JSON.parse(storedTrending) as Data);
  } catch (err) {
    console.log(err);
  }

  const [genre, setGenre] = useState<string>("movie");
  const { movies, tvshows } = usefetch({
    url: `https://api.themoviedb.org/3/trending/${genre}/day?language=en-US`,
    genre,
    storageName: "trending",
  });

  const [trending, setTrending] = useState<Data>(
    trendingData || { movies: [], tvshows: [] }
  );
  useEffect(() => {
    movies && setTrending({ ...trending, movies });
    tvshows && setTrending({ ...trending, tvshows });
  }, [genre]);

  const [showingTrendingMovie, setShowingTrendingMovie] =
    useState<boolean>(true);

  return (
    <div className="my-12 text-white">
      <button
        onClick={() => {
          setGenre("movie");
          setShowingTrendingMovie(true);
        }}
        className=" text-white mx-3"
      >
        Movie
      </button>
      <button
        onClick={() => {
          setGenre("tv");
          setShowingTrendingMovie(false);
        }}
        className=" text-white mx-3"
      >
        Tvshows
      </button>

      <>
        <div className="text-gray-50 text-right pr-10 py-5 text-lg">
          see all
        </div>
        {showingTrendingMovie ? (
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
