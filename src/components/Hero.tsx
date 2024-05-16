import { Typography } from "@mui/material";
import movie from "../assets/Images/movie_1.jpg";
import { useContext } from "react";
import { MovieContext } from "../pages/Home/Main";

// received props interface
interface HeroProps {
  homePage: boolean;
  pageName: string;
}

export default function Hero({ homePage, pageName }: HeroProps) {
  // get state passed into the MovieContext
  const {
    movieToSearch,
    setMovieToSearch,
    setShowingSearch,
    setSerachedMovies,
  } = useContext(MovieContext);

  //  function to fetch searched movies
  const fetchSearched = async () => {
    setShowingSearch(true);
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_MY_AUTH_KEY}`,
      },
    };

    // fetch movie with the movie name provided by user
    const res = await fetch(
      `https://api.themoviedb.org/3/search/multi?query=${movieToSearch}&include_adult=false&language=en-US&page=1`,
      options
    );
    const data = await res.json();
    setSerachedMovies(data.results);
  };
  return (
    <div
      className=" h-[60vh] text-gray-100 flex justify-center items-center md:h-[75vh] bg-gray-700 bg-cover bg-no-repeat bg-blend-multiply"
      style={{ backgroundImage: `url(${movie})` }}
    >
      {homePage ? (
        // display if in homepage
        <div className=" w-[70%] m-auto md:w-[50%] py-10 tracking-wider">
          <div className=" font-bold text-2xl">
            <p className=" text-yellow-300 py-2 italic">Emiflix</p>

            <p className=" text-gray-200">
              Unlimited <span className=" text-yellow-300">Movies</span> <br />
              TVs Shows, & More.
            </p>
          </div>
          <div className="py-10">
            <Typography color="white" component="p">
              Start streaming now
            </Typography>

            {/* form to input movie name */}
            <form
              className="flex"
              onSubmit={(e) => {
                e.preventDefault();
                fetchSearched();
              }}
            >
              <input
                type="text"
                className=" outline-none bg-gray-300 rounded-l-md w-full p-1 text-gray-950"
                value={movieToSearch}
                onChange={(e) => {
                  e.preventDefault();
                  setMovieToSearch(e.target.value);
                }}
              />
              <button
                type="submit"
                className="p-2 bg-yellow-800 rounded-r-md cursor-pointer hover:bg-blue-800 ease-in-out duration-300"
              >
                search
              </button>
            </form>
          </div>
        </div>
      ) : (
        // display if not on home page with the name of the provided homepage
        <div className="font-bold text-2xl">
          <span>Home</span> |
          <span className=" text-yellow-300 italic "> {pageName}</span>
        </div>
      )}
    </div>
  );
}
