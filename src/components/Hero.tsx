import { Typography } from "@mui/material";
import movie from "../assets/Images/movie_1.jpg";
import { useContext, useState } from "react";
import { MovieContext } from "../pages/Home/Main";

interface HeroProps {
  // setShowingSearch: Dispatch<SetStateAction<boolean>>;
  homePage: boolean;
  pageName: string;
}

export default function Hero({ homePage, pageName }: HeroProps) {
  const {
    movieToSearch,
    setMovieToSearch,
    setShowingSearch,
    setSerachedMovies,
  } = useContext(MovieContext);

  const fetchSearched = async () => {
    setShowingSearch(true);

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjc1YzEyYjhlYTI4ODFkODRhODA4ZDZiOTgwODA0ZSIsInN1YiI6IjY2MTk5YWZjOTBjZjUxMDE3Y2EyNmYwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A4OG4SnjnTSJY4f6Kiy1HMCN5qxlVn2pa6xJImqLXvc",
      },
    };
    const res = await fetch(
      `https://api.themoviedb.org/3/search/multi?query=${movieToSearch}&include_adult=false&language=en-US&page=1`,
      options
    );
    const data = await res.json();
    console.log(data);
    setSerachedMovies(data.results);
  };
  return (
    <div
      className=" h-[60vh] text-gray-100 flex justify-center items-center md:h-[75vh] bg-gray-700 bg-cover bg-no-repeat bg-blend-multiply"
      style={{ backgroundImage: `url(${movie})` }}
    >
      {homePage ? (
        <div className=" w-[70%] m-auto md:w-[50%] py-10 tracking-wider">
          <div className=" font-bold text-2xl">
            <p className=" text-yellow-300 py-2 italic">Emiflix</p>

            <p className=" text-gray-200">
              Unlimited <span className=" text-yellow-300">Movies</span> <br />
              TVs Shows, & More.
            </p>
          </div>
          <div className="py-10">
            <Typography color="white">Start streaming now</Typography>
            <input
              type="text"
              className=" outline-none bg-gray-300 rounded w-full p-1"
              value={movieToSearch}
              onChange={(e) => {
                e.preventDefault();
                setMovieToSearch(e.target.value);
              }}
            />
            <button className="p-2 bg-yellow-300" onClick={fetchSearched}>
              search
            </button>
          </div>
        </div>
      ) : (
        <div className="font-bold text-2xl">
          <span>Home</span> |{" "}
          <span className=" text-yellow-300 italic">{pageName}</span>
        </div>
      )}
    </div>
  );
}
