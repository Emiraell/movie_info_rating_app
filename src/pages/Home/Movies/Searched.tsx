import { useContext } from "react";
import MovieTemplate from "../../../components/MovieTemplate";
import { MovieContext } from "../Main";
import { Button } from "@mui/material";
import Footer from "../../../components/Footer";

export default function Searched() {
  // get ssearched movies from the movie context
  const { searchedMovies, setShowingSearch } = useContext(MovieContext);
  console.log(searchedMovies);
  return (
    <div className="mt-10 mb-44">
      <p className="pb-5 text-bold text-gray-100 text-center text-lg font-bold">
        {searchedMovies[0].media_type === "movie" ? "Movie" : "Tv Show"}
      </p>
      <div className="text-center mx-4">
        {searchedMovies.length === 0 ? (
          // message to display if no movie was found from the search
          <div className="text-center">
            <p className=" italic text-gray-100 text-lg">
              Invalid Movie Name, Enter a movie name or <br />
              check your connection and try again
            </p>
          </div>
        ) : (
          // display the first movie on the array if any
          <div className=" md:w-[60vh] m-auto">
            <MovieTemplate
              data={searchedMovies[0]}
              type={searchedMovies[0]?.media_type}
            />
          </div>
        )}
        {/* return to display other movies */}
        <Button
          sx={{ backgroundColor: "red", my: 2 }}
          onClick={() => setShowingSearch(false)}
        >
          Return
        </Button>
      </div>
      <Footer />
    </div>
  );
}
