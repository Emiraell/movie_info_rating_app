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
    nowPlaying.tvshows && dispatch(fetchNowPlaying("tv"));
    trending.tvshows && dispatch(fetchTrending("tv"));
    topRated.tvshows && dispatch(fetchTopRated("tv"));
    popular.tvshows && dispatch(fetchPopular("tv"));
  }, []);

  return (
    <>
      <Header />
      <Toolbar />
      <Hero homePage={false} pageName="Tv Shows" />

      <div className="text-gray-100 text-center w-[95%] m-auto mt-10 mb-28">
        <>
          <p className="movieTitle pt-14 mb-9">Trending</p>
          {!trending.tvshows ? (
            /* display message status of fetching trending tv shows*/
            <div className="status_message">
              {trending_status === "pending" && (
                <p className="py-5">Loading trending tv shows....</p>
              )}
              {trending_status === "error" && (
                <p className="py-5">
                  Unable to load trending tv Shows, check your connection <br />
                  and try again
                </p>
              )}
            </div>
          ) : (
            /* display trending tv shows on sucess  */
            <SliderCarousel data={trending.tvshows} type={"tv"} />
          )}
        </>

        <>
          <p className="movieTitle pt-20 mb-9">Popular</p>
          {!popular.tvshows ? (
            /* display message status of fetching popular tv shows*/
            <div className="status_message">
              {popular_status === "pending" && (
                <p className="py-5">Loading popular tv shows....</p>
              )}
              {popular_status === "error" && (
                <p className="py-5">
                  Unable to load popular tv Shows, check your connection <br />
                  and try again
                </p>
              )}
            </div>
          ) : (
            /* display popular tv shows on sucess  */
            <SliderCarousel data={popular.tvshows} type={"tv"} />
          )}
        </>

        <>
          <p className="movieTitle pt-20 mb-9">Top Rated</p>
          {!topRated.tvshows ? (
            /* display message status of fetching trending tv shows*/
            <div className="status_message">
              {topRated_status === "pending" && (
                <p className="py-5">Loading top rated tv shows....</p>
              )}
              {topRated_status === "error" && (
                <p className="py-5">
                  Unable to load top rated tv Shows, check your connection
                  <br />
                  and try again
                </p>
              )}
            </div>
          ) : (
            /* display top rated tv shows on sucess  */
            <SliderCarousel data={topRated.tvshows} type={"tv"} />
          )}
        </>

        <>
          <p className="movieTitle pt-20 mb-9">On The Air</p>

          {!nowPlaying.tvshows ? (
            /* display message status of fetching on the air tv shows*/
            <div className="status_message">
              {playing_status === "pending" && (
                <p className="py-5">Loading on the air tv shows....</p>
              )}
              {playing_status === "error" && (
                <p className="py-5">
                  Unable to load on the air tv Shows, check your connection
                  <br />
                  and try again
                </p>
              )}
            </div>
          ) : (
            /* display on the air tv shows on sucess  */
            <SliderCarousel data={nowPlaying.tvshows} type={"tv"} />
          )}
        </>
      </div>
      <Footer />
    </>
  );
}
