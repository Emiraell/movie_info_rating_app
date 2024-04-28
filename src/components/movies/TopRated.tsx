import { useState } from "react";
import Slider from "react-slick";
import MovieTemplate from "../MovieTemplate";

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
export default function TopRated() {
  const [topRated, setTopRated] = useState<{
    movie: Movies[];
    tvshows: Movies[];
  }>({ movie: [], tvshows: [] });
  const fetchPopularMovies = async (genre: string) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjc1YzEyYjhlYTI4ODFkODRhODA4ZDZiOTgwODA0ZSIsInN1YiI6IjY2MTk5YWZjOTBjZjUxMDE3Y2EyNmYwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A4OG4SnjnTSJY4f6Kiy1HMCN5qxlVn2pa6xJImqLXvc",
      },
    };

    const res = await fetch(
      `https://api.themoviedb.org/3/${genre}/topRated?language=en-US&page=1`,
      options
    );

    const data = await res.json();
    // const returenedData = { ...data, genre };
    genre === "movie"
      ? setTopRated({ ...topRated, movie: data.results })
      : setTopRated({ ...topRated, tvshows: data.results });
    console.log(topRated, genre, "popularmovies");

    // return returenedData;
  };
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
    <div>
      <button
        onClick={() => {
          fetchPopularMovies("movie");
          setShowingMovie(true);
        }}
      >
        Movie
      </button>
      <button
        onClick={() => {
          fetchPopularMovies("tv");
          setShowingMovie(false);
        }}
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
              {topRated.movie?.map((movie) => (
                <MovieTemplate data={movie} key={movie.id} genre={"movie"} />
              ))}
            </Slider>
          </div>
        ) : (
          <div className=" px-5">
            <p className="text-white">TV</p>
            <Slider {...settings}>
              {topRated.tvshows?.map((show) => (
                <MovieTemplate data={show} key={show.id} genre={"tvshow"} />
              ))}
            </Slider>
          </div>
        )}
      </>
    </div>
  );
}
