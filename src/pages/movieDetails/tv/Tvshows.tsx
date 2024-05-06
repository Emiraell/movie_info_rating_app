import { useParams } from "react-router-dom";
import usefetch from "../../../hooks/useFetch";
import Header from "../../../components/Header";
import { Toolbar } from "@mui/material";
import Hero from "../../../components/Hero";
import Footer from "../../../components/Footer";
import Details from "./Details";

export default function TvshowDetail() {
  const { id } = useParams();
  const { details, isLoading, error } = usefetch({
    url: `https://api.themoviedb.org/3/tv/${id}?language=en-US`,
    detail: true,
  });
  console.log(details);
  return (
    <>
      <Header />
      <Toolbar />
      <Hero homePage={false} pageName="Tv Show" />
      <div className="mt-20 mb-40 text-center tracking-wider text-gray-100 italic text-lg">
        {isLoading && <div className="">Loading......</div>}
        {error && (
          <div className="">
            Error in fetching movie detail <br /> please refresh the page
          </div>
        )}
      </div>
      {!isLoading && !error && <Details details={details} />}
      <Footer />
    </>
  );
}
