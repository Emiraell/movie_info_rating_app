import { useContext } from "react";
import MovieTemplate from "../../../components/MovieTemplate";
import { MovieContext } from "../Main";
import { Button } from "@mui/material";

export default function Searched() {
  const { searchedMovies, setShowingSearch } = useContext(MovieContext);
  console.log(searchedMovies);
  return (
    <div className="mt-10 mb-44">
      <div className="text-center">
        {searchedMovies.length === 0 ? (
          <div className="text-center">
            <p className=" italic text-gray-100 text-lg">
              Invalid Movie Name, Enter a movie name and try again
            </p>
          </div>
        ) : (
          <div className=" md:w-[60vh] m-auto">
            <MovieTemplate
              data={searchedMovies[0]}
              genre={searchedMovies[0]?.media_type}
            />
          </div>
        )}
        <Button
          sx={{ backgroundColor: "red", my: 2 }}
          onClick={() => setShowingSearch(false)}
        >
          Return
        </Button>
      </div>
    </div>
  );
}
