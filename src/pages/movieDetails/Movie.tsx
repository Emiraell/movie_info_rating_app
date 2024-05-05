import { useParams } from "react-router-dom";
import usefetch from "../../hooks/useFetch";
import { Movie } from "../../store/features/movies/Popular";
import Header from "../../components/Header";
import { Toolbar } from "@mui/material";
import Hero from "../../components/Hero";
import MovieTemplate from "../../components/MovieTemplate";

type FetchProps = {
  details: {};
  isLoading: boolean;
  error: boolean;
};
export default function MovieDetail() {
  const { id } = useParams();
  const { details, isLoading, error }: FetchProps = usefetch({
    url: `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
    detail: true,
  });
  console.log(details);

  // if (isLoading) {
  //   return <div className="text-white">Loading....</div>;
  // }
  // if (error) {
  //   return <div className="text-white">Couldn't get movie, refresh page..</div>;
  // }
  return (
    <>
      <Header />
      <Toolbar />
      <Hero homePage={false} pageName={`movie${id}`} />
      <div className="text-white">
        {/* <MovieTemplate data={data[0]} genre="movie" /> */}
      </div>
    </>
  );
}
