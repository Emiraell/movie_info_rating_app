import { useParams, Params } from "react-router-dom";
import usefetch from "../../../hooks/useFetch";
import Header from "../../../components/Header";
import { Toolbar } from "@mui/material";
import Hero from "../../../components/Hero";
import Footer from "../../../components/Footer";
import Details from "./Details";
import { useEffect } from "react";

export default function MovieDetail() {
  const { id }: Readonly<Params<string>> = useParams();
  const { details, isLoading, error } = usefetch({
    url: `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
    detail: true,
  });

  useEffect(() => {
    !isLoading && !error && console.log(details);
  }, [details]);
  return (
    <>
      <Header />
      <Toolbar />
      <Hero homePage={false} pageName="movie" />
      {(isLoading || error) && (
        <div className="mt-15 mb-40 text-center tracking-wider text-gray-100 italic text-lg">
          {isLoading && <div>Loading......</div>}
          {error && (
            <div>
              Error in fetching movie detial <br /> please refresh the page
            </div>
          )}
        </div>
      )}
      {!isLoading && !error && <Details details={details} />}
      <Footer />
    </>
  );
}
