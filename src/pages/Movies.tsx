import { Toolbar } from "@mui/material";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import { useAppDispatch, useAppSelector } from "../store/store";
import SliderCarousel from "../components/Slider";
import { useEffect } from "react";
import { fetchNowPlaying } from "../store/features/movies/NowPlaying";
import { fetchTrending } from "../store/features/movies/Trending";
import { fetchTopRated } from "../store/features/movies/TopRated";
import { fetchPopular } from "../store/features/movies/Popular";

export default function Movies() {
  // Movie state from store
  const { popular, status: popular_status } = useAppSelector(
    (state) => state.popular
  );
  const { trending, status: trending_status } = useAppSelector(
    (state) => state.trending
  );
  const { topRated, status: topRated_status } = useAppSelector(
    (state) => state.topRated
  );
  const { nowPlaying, status: playing_status } = useAppSelector(
    (state) => state.nowPlaying
  );

  // fetch popular movies on page load
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchNowPlaying("movie"));
    dispatch(fetchTrending("movie"));
    dispatch(fetchTopRated("movie"));
    dispatch(fetchPopular("movie"));
  }, []);

  return (
    <>
      <Header />
      <Toolbar />
      <Hero homePage={false} pageName="Movies" />

      <div className="text-gray-100 text-center w-[95%] m-auto mt-10 mb-36">
        {/* trending */}
        <>
          <p className="movieTitle pt-14 mb-9">Trending</p>

          {/* display message status of fetching trending movies*/}
          <div className="status_message">
            {trending_status === "pending" && (
              <p className="py-5">Loading trending movies....</p>
            )}
            {trending_status === "error" && (
              <p className="py-5">
                Unable to load trending movies, check your connection <br /> and
                try again
              </p>
            )}
          </div>

          {/* display trending movies on sucess  */}
          {trending_status === "success" && (
            <SliderCarousel data={trending.movies} type={"movie"} />
          )}
        </>

        {/* popular */}
        <>
          <p className="movieTitle pt-20 mb-9">Popular</p>

          {/* display message status of fetching popular movies*/}
          <div className="status_message">
            {trending_status === "pending" && (
              <p className="py-5">Loading popular movies....</p>
            )}
            {popular_status === "error" && (
              <p className="py-5">
                Unable to load popular movies, check your connection <br /> and
                try again
              </p>
            )}
          </div>

          {/* display popular movies on success */}
          {popular_status === "success" && (
            <SliderCarousel data={popular.movies} type={"movie"} />
          )}
        </>

        {/* top rated */}
        <>
          <p className="movieTitle pt-20 mb-9">Top Rated</p>

          {/* display message status of fetching top rated movies*/}
          <div className="status_message">
            {topRated_status === "pending" && (
              <p className="py-5">Loading top rated movies....</p>
            )}
            {topRated_status === "error" && (
              <p className="py-5">
                Unable to load top rated movies, check your connection <br />{" "}
                and try again
              </p>
            )}
          </div>

          {/* display top rated movies on success */}
          {topRated_status === "success" && (
            <SliderCarousel data={topRated.movies} type={"movie"} />
          )}
        </>

        {/* now playing */}
        <>
          <p className="movieTitle pt-20 mb-9">Now Playing</p>
          {/* display message status of fetching trending movies*/}
          <div className="status_message">
            {playing_status === "pending" && (
              <p className="py-5">Loading now playing movies....</p>
            )}
            {playing_status === "error" && (
              <p className="py-5">
                Unable to load now playing movies, check your connection <br />
                and try again
              </p>
            )}
          </div>

          {/* display now playing movies on success */}
          {playing_status === "success" && (
            <SliderCarousel data={nowPlaying.movies} type={"movie"} />
          )}
        </>
      </div>
      <Footer />
    </>
  );
}
