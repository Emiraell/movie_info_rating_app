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
interface PopularData {
  movie: Movies[];
  tvshows: Movies[];
}
export default function Popular() {
  // const popularData = localStorage.getItem("popularData");

  // let allPopular;
  // try {
  //   allPopular = popularData && (JSON.parse(popularData) as PopularData);
  // } catch (err) {
  //   console.log(err);
  // }
  // const [popular, setPopular] = useState<PopularData>(
  //   allPopular || { movie: [], tvshows: [] }
  // );
  // const fetchPopularMovies = async (genre: string) => {
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       accept: "application/json",
  //       Authorization:
  //         "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjc1YzEyYjhlYTI4ODFkODRhODA4ZDZiOTgwODA0ZSIsInN1YiI6IjY2MTk5YWZjOTBjZjUxMDE3Y2EyNmYwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A4OG4SnjnTSJY4f6Kiy1HMCN5qxlVn2pa6xJImqLXvc",
  //     },
  //   };

  //   const res = await fetch(
  //     `https://api.themoviedb.org/3/${genre}/popular?language=en-US&page=1`,
  //     options
  //   );

  //   const data = await res.json();
  //   // const returenedData = { ...data, genre };
  //   genre === "movie"
  //     ? setPopular({ ...popular, movie: data.results })
  //     : setPopular({ ...popular, tvshows: data.results });
  //   localStorage.setItem("popularData", JSON.stringify(popular));
  //   console.log(data, genre, "popularmovies");

  //   // return returenedData;
  // };
  let genre = "movie";
  const { ...data } = usefetch(
    genre === "movie"
      ? {
          url: "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
          genre,
          storageName: "popular",
        }
      : {
          url: "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
          genre: "tv",
          storageName: "popular",
        }
  );

  useEffect(() => {
    console.log(data);
  }, [data]);
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
    <div className="white my-14">
      <p>popular</p>
      <button
        onClick={() => {
          // fetchPopularMovies("movie");
          setShowingMovie(true);
        }}
        className=" text-white"
      >
        Movie
      </button>
      <button
        onClick={() => {
          // fetchPopularMovies("tv");
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
              {data.movies?.map((movie) => (
                <MovieTemplate data={movie} key={movie.id} genre={"movie"} />
              ))}
            </Slider>
          </div>
        ) : (
          <div className=" px-5">
            <p className="text-white">TV</p>
            <Slider {...settings}>
              {data.tvshows?.map((show) => (
                <MovieTemplate data={show} key={show.id} genre={"tvshow"} />
              ))}
            </Slider>
          </div>
        )}
      </>
    </div>
  );
}
