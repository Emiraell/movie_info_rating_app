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
      <div className="text-center mx-4">
        <>
          {!searchedMovies && (
            <p className="status_message">
              Couldn't fetch movie, check connection <br />
              and try again
            </p>
          )}
          {searchedMovies && searchedMovies?.length === 0 && (
            // message to display if no movie was found from the search
            <div className="text-center">
              <p className="status_message">
                Invalid Movie Name, enter a valid movie name
                <br />
                or check if movie is correctly spelled
              </p>
            </div>
          )}

          {searchedMovies && searchedMovies.length !== 0 && (
            //  display the first movie on the list if movie(s) was found
            <div className=" md:w-[60vh] m-auto">
              <p className="pb-5 text-bold text-gray-100 text-center text-lg font-bold">
                {searchedMovies && searchedMovies[0].media_type === "movie"
                  ? "Movie"
                  : "Tv Show"}
              </p>

              {searchedMovies && (
                <MovieTemplate
                  data={searchedMovies[0]}
                  type={searchedMovies[0].media_type}
                />
              )}
            </div>
          )}
        </>
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
