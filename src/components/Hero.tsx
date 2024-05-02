import { Typography } from "@mui/material";
import movie from "../assets/Images/movie_1.jpg";
import { useContext } from "react";
import { MovieContext } from "../pages/Home/Main";

interface HeroProps {
  // setShowingSearch: Dispatch<SetStateAction<boolean>>;
  homePage: boolean;
  pageName: string;
}

export default function Hero({ homePage, pageName }: HeroProps) {
  const { searchedMovie, setSearchMovie } = useContext(MovieContext);
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
              value={searchedMovie}
              onChange={(e) => {
                e.preventDefault();
                setSearchMovie(e.target.value);
              }}
            />
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
