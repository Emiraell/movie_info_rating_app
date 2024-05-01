import { useEffect, useState } from "react";
import Slider from "react-slick";
import MovieTemplate from "../MovieTemplate";
import usefetch from "../hooks/useFetch";

interface Movies {
  first_air_date: string;
  id: number;
  original_title: string;
  overview: string;
  name: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
}

export interface NowPlayingData {
  movie: Movies[];
  tvshows: Movies[];
}
export default function NowPlaying() {
  // const nowPlaying = localStorage.getItem("nowPlaying");

  // let nowPlayingData;
  // try {
  //   nowPlayingData = nowPlaying && (JSON.parse(nowPlaying) as NowPlayingData);
  // } catch (err) {
  //   console.log(err);
  // }
  // const [playing, setPlaying] = useState<NowPlayingData>(
  // movie: Movies[];
  // tvshows: Movies[];
  //   nowPlayingData || { movie: [], tvshows: [] }
  // );
  let genre = "movie";
  const { ...data } = usefetch(
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

  useEffect(() => {
    console.log(data);
  }, [data]);

  // const fetchNowPlaying = async (genre: string) => {
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       accept: "application/json",
  //       Authorization:
  //         "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjc1YzEyYjhlYTI4ODFkODRhODA4ZDZiOTgwODA0ZSIsInN1YiI6IjY2MTk5YWZjOTBjZjUxMDE3Y2EyNmYwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A4OG4SnjnTSJY4f6Kiy1HMCN5qxlVn2pa6xJImqLXvc",
  //     },
  //   };

  //   const res =
  //     genre === "movie"
  //       ? await fetch(
  //           `https://api.themoviedb.org/3/${genre}/now_playing?language=en-US&page=1`,
  //           options
  //         )
  //       : await fetch(
  //           `https://api.themoviedb.org/3/${genre}/on_the_air?language=en-US&page=1`,
  //           options
  //         );

  //   const data = await res.json();
  //   // const returenedData = { ...data, genre };
  //   genre === "movie"
  //     ? setPlaying({ ...playing, movie: data.results })
  //     : setPlaying({ ...playing, tvshows: data.results });
  //   localStorage.setItem("nowPlating", JSON.stringify(playing));
  //   console.log(data, genre, "toprated");

  //   // return returenedData;
  // };
  const [showingMovie, setShowingMovie] = useState<boolean>(true);
  const settings = {
    autoplay: true,
    autoplaySpeed: 8000,
    cssEase: "ease",
    draggable: true,
    pauseOnHover: true,
    pauseOnFocus: true,
    speed: 1500,
    swipe: true,
    dots: true,
    slidesToShow: 3,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1040,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToScroll: 1,
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div className="my-12 text-white">
      <p>now Playing</p>
      <button
        onClick={() => {
          // fetchNowPlaying("movie");
          setShowingMovie(true);
        }}
        className=" text-white mx-3"
      >
        Movie
      </button>
      <button
        onClick={() => {
          // fetchNowPlaying("tv");
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
            <Slider {...settings}>
              {data.movies?.map((movie: any) => (
                <MovieTemplate data={movie} key={movie.id} genre={"movie"} />
              ))}
            </Slider>
          </div>
        ) : (
          <div className=" px-5">
            <p className="text-white">TV</p>
            <Slider {...settings}>
              {data.tvshows?.map((show: any) => (
                <MovieTemplate data={show} key={show.id} genre={"tvshow"} />
              ))}
            </Slider>
          </div>
        )}
      </>
    </div>
  );
}
