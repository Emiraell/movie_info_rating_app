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

export default function Movies() {
  const popularMovies: Movie[] | null = useAppSelector(
    (state) => state.popular.popular.movies
  );
  const trendingMovies: Movie[] | null = useAppSelector(
    (state) => state.trending.trending.movies
  );
  const topRatedMovies: Movie[] | null = useAppSelector(
    (state) => state.topRated.topRated.movies
  );
  const nowPlayingMovies: Movie[] | null = useAppSelector(
    (state) => state.nowPlaying.nowPlaying.movies
  );

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

      <div className="text-gray-100 text-center w-[95%] m-auto my-10">
        <>
          <p className="movieTitle" style={{ marginBottom: 23, marginTop: 40 }}>
            Trending
          </p>
          <SliderCarousel data={trendingMovies} genre={"movie"} />
        </>

        <>
          <p className="movieTitle" style={{ marginBottom: 23, marginTop: 40 }}>
            Popular
          </p>
          <SliderCarousel data={popularMovies} genre={"movie"} />
        </>

        <>
          <p className="movieTitle" style={{ marginBottom: 23, marginTop: 40 }}>
            Top Rated
          </p>
          <SliderCarousel data={topRatedMovies} genre={"movie"} />
        </>

        <>
          <p className="movieTitle" style={{ marginBottom: 23, marginTop: 40 }}>
            Now Playing
          </p>
          <SliderCarousel data={nowPlayingMovies} genre={"movie"} />
        </>
      </div>
      <Footer />
    </>
  );
}
