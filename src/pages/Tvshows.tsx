import { Toolbar } from "@mui/material";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import { useAppDispatch, useAppSelector } from "../store/store";
import SliderCarousel from "../components/Slider";
import { fetchPopular } from "../store/features/movies/Popular";
import { useEffect } from "react";
import { fetchNowPlaying } from "../store/features/movies/NowPlaying";
import { fetchTrending } from "../store/features/movies/Trending";
import { fetchTopRated } from "../store/features/movies/TopRated";

export default function Tvshows() {
  // tv shows  from store
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

  // fetch popular tv shows on page load
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchNowPlaying("tv"));
    dispatch(fetchTrending("tv"));
    dispatch(fetchTopRated("tv"));
    dispatch(fetchPopular("tv"));
  }, []);

  return (
    <>
      <Header />
      <Toolbar />
      <Hero homePage={false} pageName="Tv Shows" />

      <div className="text-gray-100 text-center w-[95%] m-auto mt-10 mb-28">
        <>
          <p className="movieTitle pt-14 mb-9">Trending</p>
          {/* display message status of fetching trending tv shows*/}
          <div className="status_message">
            {trending_status === "pending" && (
              <p className="py-5">Loading trending tv shows....</p>
            )}
            {trending_status === "error" && (
              <p className="py-5">
                Unable to load trending movies, check <br /> your connection and
                try again
              </p>
            )}
          </div>

          {/* display trending tv shows on sucess  */}
          {trending_status === "success" && (
            <SliderCarousel data={trending.tvshows} type={"tv"} />
          )}
        </>

        <>
          <p className="movieTitle pt-20 mb-9">Popular</p>
          {/* display message status of fetching popular tv shows*/}
          <div className="status_message">
            {trending_status === "pending" && (
              <p className="py-5">Loading popular tv shows....</p>
            )}
            {popular_status === "error" && (
              <p className="py-5">
                Unable to load popular movies, check <br /> your connection and
                try again
              </p>
            )}
          </div>

          {/* display popular tv shows on success */}
          {popular_status === "success" && (
            <SliderCarousel data={popular.tvshows} type={"tv"} />
          )}
        </>

        <>
          <p className="movieTitle pt-20 mb-9">Top Rated</p>

          {/* display message status of fetching top rated movies*/}
          <div className="status_message">
            {topRated_status === "pending" && (
              <p className="py-5">Loading top rated tv shows....</p>
            )}
            {topRated_status === "error" && (
              <p className="py-5">
                Unable to load top rated tv shows, check <br /> your connection
                and try again
              </p>
            )}
          </div>

          {/* display top rated on success */}
          {topRated_status === "success" && (
            <SliderCarousel data={topRated.tvshows} type={"tv"} />
          )}
        </>

        <>
          <p className="movieTitle pt-20 mb-9">Now Playing</p>
          {/* display message status of fetching trending movies*/}
          <div className="status_message">
            {playing_status === "pending" && (
              <p className="py-5">Loading now playing movies....</p>
            )}
            {playing_status === "error" && (
              <p className="py-5">
                Unable to load on the air tv shows, check <br /> your connection
                and try again
              </p>
            )}
          </div>

          {/* display on the air tv shows on success */}
          {playing_status === "success" && (
            <SliderCarousel data={nowPlaying.tvshows} type={"tv"} />
          )}
        </>
      </div>
      <Footer />
    </>
  );
}
