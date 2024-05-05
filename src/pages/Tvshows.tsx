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
import { fetchPopular, Movie } from "../store/features/movies/Popular";

export default function Tvshows() {
  const popularTvshows: Movie[] | null = useAppSelector(
    (state) => state.popular.popular.tvshows
  );
  const trendingTvshows: Movie[] | null = useAppSelector(
    (state) => state.trending.trending.tvshows
  );
  const topRatedTvshows: Movie[] | null = useAppSelector(
    (state) => state.topRated.topRated.tvshows
  );
  const nowPlayingTvshows: Movie[] | null = useAppSelector(
    (state) => state.nowPlaying.nowPlaying.tvshows
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    // dispatch(fetchNowPlaying("tv"));
    // dispatch(fetchTrending("tv"));
    // dispatch(fetchTopRated("tv"));
    // dispatch(fetchPopular("tv"));
  }, []);
  return (
    <>
      <Header />
      <Toolbar />
      <Hero homePage={false} pageName="Tv Shows" />

      <div className="text-gray-100 text-center w-[95%] m-auto my-10">
        <>
          <p className="movieTitle" style={{ marginBottom: 23, marginTop: 40 }}>
            Trending
          </p>
          <SliderCarousel data={trendingTvshows} genre={"tv"} />
        </>

        <>
          <p className="movieTitle" style={{ marginBottom: 23, marginTop: 40 }}>
            Popular
          </p>
          <SliderCarousel data={popularTvshows} genre={"tv"} />
        </>

        <>
          <p className="movieTitle" style={{ marginBottom: 23, marginTop: 40 }}>
            Top Rated
          </p>
          <SliderCarousel data={topRatedTvshows} genre={"tv"} />
        </>

        <>
          <p className="movieTitle" style={{ marginBottom: 23, marginTop: 40 }}>
            Now Playing
          </p>
          <SliderCarousel data={nowPlayingTvshows} genre={"tv"} />
        </>
      </div>
      <Footer />
    </>
  );
}
