import { useContext } from "react";
import MovieTemplate from "../../../components/MovieTemplate";
import { MovieContext } from "../Main";

export default function Searched() {
  const { searchedMovies } = useContext(MovieContext);
  console.log(searchedMovies);
  return (
    <div>
      <MovieTemplate
        data={searchedMovies[0]}
        genre={searchedMovies[0]?.media_type}
      />
    </div>
  );
}
