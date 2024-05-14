import { Toolbar } from "@mui/material";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import { useAppSelector } from "../store/store";
import SliderCarousel from "../components/Slider";
import { Movie } from "../store/features/movies/Popular";

export default function Movies() {
  // Movie state from store
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
          <SliderCarousel data={trendingMovies} type={"movie"} />
        </>

        <>
          <p className="movieTitle" style={{ marginBottom: 23, marginTop: 40 }}>
            Popular
          </p>
          <SliderCarousel data={popularMovies} type={"movie"} />
        </>

        <>
          <p className="movieTitle" style={{ marginBottom: 23, marginTop: 40 }}>
            Top Rated
          </p>
          <SliderCarousel data={topRatedMovies} type={"movie"} />
        </>

        <>
          <p className="movieTitle" style={{ marginBottom: 23, marginTop: 40 }}>
            Now Playing
          </p>
          <SliderCarousel data={nowPlayingMovies} type={"movie"} />
        </>
      </div>
      <Footer />
    </>
  );
}
