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

interface TrendingData {
  movie: Movies[];
  tvshows: Movies[];
}
export default function Trending() {
  const storedTrendingData = localStorage.getItem("trending_movies");

  let allTrending;
  try {
    allTrending =
      storedTrendingData && (JSON.parse(storedTrendingData) as TrendingData);
  } catch (err) {
    console.log(err);
  }
  const [trending, setTrending] = useState<TrendingData>(
    allTrending || {
      movie: [],
      tvshows: [],
    }
  );
  const fetchTrending = async (genre: string) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjc1YzEyYjhlYTI4ODFkODRhODA4ZDZiOTgwODA0ZSIsInN1YiI6IjY2MTk5YWZjOTBjZjUxMDE3Y2EyNmYwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A4OG4SnjnTSJY4f6Kiy1HMCN5qxlVn2pa6xJImqLXvc",
      },
    };

    const res = await fetch(
      `https://api.themoviedb.org/3/trending/${genre}/day?language=en-US`,
      options
    );

    const data = await res.json();
    // const returenedData = { ...data, genre };
    genre === "movie"
      ? setTrending({ ...trending, movie: data.results })
      : setTrending({ ...trending, tvshows: data.results });
    localStorage.setItem("trending_movies", JSON.stringify(trending));
    console.log(data, genre, "trending");

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
    <div className="text-white my-10">
      <p>Trending</p>
      <button
        onClick={() => {
          fetchTrending("movie");
          setShowingMovie(true);
        }}
        className=" text-white mx-3"
      >
        Movie
      </button>
      <button
        onClick={() => {
          fetchTrending("tv");
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
              {trending.movie?.map((movie) => (
                <MovieTemplate data={movie} key={movie.id} genre={"movie"} />
              ))}
            </Slider>
          </div>
        ) : (
          <div className=" px-5">
            <p className="text-white">TV</p>
            <Slider {...settings}>
              {trending.tvshows?.map((show) => (
                <MovieTemplate data={show} key={show.id} genre={"tvshow"} />
              ))}
            </Slider>
          </div>
        )}
      </>
    </div>
  );
}
