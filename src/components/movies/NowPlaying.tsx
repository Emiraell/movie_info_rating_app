import { useEffect, useState } from "react";
import usefetch, { Data } from "../hooks/useFetch";
import SliderCarousel from "../Slider";

export default function NowPlaying() {
  const nowPlaying = localStorage.getItem("now_playing");

  let nowPlayingData;
  try {
    nowPlayingData = nowPlaying && (JSON.parse(nowPlaying) as Data);
  } catch (err) {
    console.log(err);
  }

  const [genre, setGenre] = useState<string>("movie");
  const { movies, tvshows } = usefetch(
    genre === "movie"
      ? {
          url: "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
          genre,
          storageName: "now_playing",
        }
      : {
          url: "https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1",
          genre: "tv",
          storageName: "now_playing",
        }
  );

  const [playing, setPlaying] = useState<Data>(
    nowPlayingData || { movies: [], tvshows: [] }
  );
  useEffect(() => {
    movies && setPlaying({ ...playing, movies });
    tvshows && setPlaying({ ...playing, tvshows });
  }, [genre]);

  const [showingMovie, setShowingMovie] = useState<boolean>(true);

  return (
    <div className="my-12 text-white">
      <button
        onClick={() => {
          setGenre("movie");
          setShowingMovie(true);
        }}
        className=" text-white mx-3"
      >
        Movie
      </button>
      <button
        onClick={() => {
          setGenre("tv");
          setShowingMovie(false);
        }}
        className=" text-white mx-3"
      >
        Tvshows
      </button>

      <>
        <div className="text-gray-50 text-right pr-10 py-5 text-lg">
          see all
        </div>
        {showingMovie ? (
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
