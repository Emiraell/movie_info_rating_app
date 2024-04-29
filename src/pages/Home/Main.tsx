import { Box, Toolbar } from "@mui/material";
import Header from "../../components/Header";
import Hero from "./Hero";
// import NavButtons from "../../components/NavButtons";
// import { useAppDispatch, useAppSelector } from "../../store/store";
// import { Data, fetchPopularMovies } from "../../store/features/movies/Popular";
// import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import MovieTemplate from "../../components/MovieTemplate";
// import { useEffect, useState } from "react";
// import { fetchTopRated, TopRated } from "../../store/features/movies/TopRated";
// import { fetchTrending, Trending } from "../../store/features/movies/Trending";
import Popular from "../../components/movies/Popular";
import Trending from "../../components/movies/Trending";
import TopRated from "../../components/movies/TopRated";
import NowPlaying from "../../components/movies/NowPlaying";
// import TopRated from "../../components/movies/TopRated";

// interface Settings {
//   autoplay: boolean;
//   autoplaySpeed: number;
//   cssEase: string;
//   draggable: boolean;
//   pauseOnHover: boolean;
//   pauseOnFocus: boolean;
//   speed: number;
//   swipe: boolean;
//   dots: boolean;
//   slidesToShow: number;
//   slidesToScroll: number;
//   responsive: {
//     breakpoint: number;
//     settings: {
//       slidesToShow: number;
//       slidesToScroll: number;
//     };
//   }[];
// }

export default function Main() {
  // const { popularMovies, popularTv }: Data = useAppSelector(
  //   (state) => state.popularMovie.popular
  // );
  // const { topRatedMovies, topRatedTvshows }: TopRated = useAppSelector(
  //   (state) => state.topRated.rated
  // );
  // const { trendingMovies, trendingTvshows }: Trending = useAppSelector(
  //   (state) => state.trending.trending
  // );

  // const buttons: string[] = ["Movies", "Tv Shows"];
  // const dispatch = useAppDispatch();
  // const settings: Settings = {
  //   autoplay: true,
  //   autoplaySpeed: 8000,
  //   cssEase: "ease",
  //   draggable: true,
  //   pauseOnHover: true,
  //   pauseOnFocus: true,
  //   speed: 1500,
  //   swipe: true,
  //   dots: true,
  //   slidesToShow: 3,
  //   slidesToScroll: 2,
  //   responsive: [
  //     {
  //       breakpoint: 1040,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 1,
  //       },
  //     },
  //     {
  //       breakpoint: 600,
  //       settings: {
  //         slidesToScroll: 1,
  //         slidesToShow: 1,
  //       },
  //     },
  //   ],
  // };
  // const [showingPopularMovie, setShowingPopularMovie] = useState<boolean>(true);

  // const [showingTopRatedMovie, setShowingTopRatedMovie] =
  //   useState<boolean>(true);

  // const [showingTrendingMovie, setShowingTrendingMovie] =
  //   useState<boolean>(true);

  // useEffect(() => {
  //   setShowingPopularMovie(true);
  //   setShowingTopRatedMovie(true);
  //   setShowingTrendingMovie(true);
  // }, []);
  return (
    <>
      <Box sx={{}}>
        <Header />
        <Toolbar />
        <Hero />
        {/* <div
          className="text-center m-auto text-gray-50 text-lg md:text-2xl mt-5
           font-bold tracking-wider w-fit border-b-4 pb-2 border-dashed border-yellow-500"
        >
          Popular
        </div> */}
        {/* <NavButtons
          setPopular={setShowingPopularMovie}
          setTopRated={setShowingTopRatedMovie}
          setTrending={setShowingTrendingMovie}
          popular={true}
          topRated={false}
          trending={false}
        /> */}
        {/* <div className="flex text-gray-50 gap-2 justify-center my-2">
          <button
            onClick={() => {
              dispatch(fetchPopularMovies("movie"));
              setShowingPopularMovie(true);
            }}
          >
            movie
          </button>
          <button
            onClick={() => {
              dispatch(fetchPopularMovies("tv"));
              setShowingPopularMovie(false);
            }}
          >
            Tvshow
          </button>
        </div>
        <>
          <div className="text-gray-50 text-right pr-10 py-5 text-lg">
            see all
          </div>
          {showingPopularMovie ? (
            <div className=" px-5">
              <p className="text-white">MOVIES</p>
              <Slider {...settings}>
                {popularMovies?.map((movie) => (
                  <MovieTemplate data={movie} key={movie.id} genre={"movie"} />
                ))}
              </Slider>
            </div>
          ) : (
            <div className=" px-5">
              <p className="text-white">TV</p>
              <Slider {...settings}>
                {popularTv?.map((show) => (
                  <MovieTemplate data={show} key={show.id} genre={"tvshow"} />
                ))}
              </Slider>
            </div>
          )}
        </> */}
        {/* top rated */}
        {/* <div
          className="text-center m-auto text-gray-50 text-lg md:text-2xl mt-5
           font-bold tracking-wider w-fit border-b-4 pb-2 border-dashed border-yellow-500"
        >
          Top Rated
        </div> */}
        {/* <NavButtons
          setPopular={setShowingPopularMovie}
          setTopRated={setShowingTopRatedMovie}
          setTrending={setShowingTrendingMovie}
          topRated={true}
          popular={false}
          trending={false}
        /> */}
        {/* <div className="flex text-gray-50 gap-2 justify-center my-2">
          <button
            onClick={() => {
              dispatch(fetchTopRated("movie"));
              setShowingTopRatedMovie(true);
            }}
          >
            movie
          </button>
          <button
            onClick={() => {
              dispatch(fetchTopRated("tv"));
              setShowingTopRatedMovie(false);
            }}
          >
            Tvshow
          </button>
        </div>
        <></>
        <>
          <div className="text-gray-50 text-right pr-10 py-5 text-lg">
            see all
          </div>
          {showingTopRatedMovie ? (
            <div className=" px-5">
              <p className="text-white">MOVIES</p>
              <Slider {...settings}>
                {topRatedMovies?.map((movie) => (
                  <MovieTemplate data={movie} key={movie.id} genre={"movie"} />
                ))}
              </Slider>
            </div>
          ) : (
            <div className=" px-5">
              <p className="text-white">TV</p>
              <Slider {...settings}>
                {topRatedTvshows?.map((show) => (
                  <MovieTemplate data={show} key={show.id} genre={"tvshow"} />
                ))}
              </Slider>
            </div>
          )}
        </> */}
        {/* trending */}
        {/* <div
          className="text-center m-auto text-gray-50 text-lg md:text-2xl mt-5
           font-bold tracking-wider w-fit border-b-4 pb-2 border-dashed border-yellow-500"
        >
          Trending
        </div>{" "} */}
        {/* <div className="flex text-gray-50 gap-2 justify-center my-2">
          <button
            onClick={() => {
              dispatch(fetchTrending("movie"));
              setShowingTrendingMovie(true);
            }}
          >
            movie
          </button>
          <button
            onClick={() => {
              dispatch(fetchTrending("tv"));
              setShowingTrendingMovie(false);
            }}
          >
            Tvshow
          </button>
        </div> */}
        {/* <NavButtons
          setPopular={setShowingPopularMovie}
          setTopRated={setShowingTopRatedMovie}
          setTrending={setShowingTrendingMovie}
          topRated={false}
          popular={false}
          trending={true}
        /> */}
        <></>
        {/* <>
          <div className="text-gray-50 text-right pr-10 py-5 text-lg">
            see all
          </div>
          {showingTrendingMovie ? (
            <div className=" px-5">
              <p className="text-white">MOVIES</p>
              <Slider {...settings}>
                {trendingMovies?.map((movie) => (
                  <MovieTemplate data={movie} key={movie.id} genre={"movie"} />
                ))}
              </Slider>
            </div>
          ) : (
            <div className=" px-5">
              <p className="text-white">TV</p>
              <Slider {...settings}>
                {trendingTvshows?.map((show) => (
                  <MovieTemplate data={show} key={show.id} genre={"tvshow"} />
                ))}
              </Slider>
            </div>
          )}
        </> */}
        <Popular />
        <>
          <Trending />
        </>
        <TopRated />
        <NowPlaying />
      </Box>
    </>
  );
}
