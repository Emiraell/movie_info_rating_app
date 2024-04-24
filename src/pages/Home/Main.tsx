import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Container,
  Icon,
  Rating,
  Toolbar,
  // Typography,
} from "@mui/material";
import Header from "../../components/Header";
import Hero from "./Hero";
import NavButtons from "../../components/NavButtons";
import { useAppSelector } from "../../store/store";
import { Data } from "../../store/features/movies/Popular";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieTemplate from "../../components/MovieTemplate";

interface Settings {
  autoplay: boolean;
  autoplaySpeed: number;
  cssEase: string;
  draggable: boolean;
  pauseOnHover: boolean;
  pauseOnFocus: boolean;
  speed: number;
  swipe: boolean;
  dots: boolean;
  slidesToShow: number;
  slidesToScroll: number;
  responsive: {
    breakpoint: number;
    settings: {
      slidesToShow: number;
      slidesToScroll: number;
    };
  }[];
}
export default function Main() {
  const { popularMovies: movies, popularTv: tvshows }: Data = useAppSelector(
    (state) => state.movieReducer
  );
  const settings: Settings = {
    autoplay: true,
    autoplaySpeed: 8000,
    cssEase: "ease",
    draggable: true,
    pauseOnHover: true,
    pauseOnFocus: true,
    speed: 1500,
    swipe: true,
    dots: true,
    slidesToShow: 3,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1040,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToScroll: 1,
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <>
      <Box sx={{}}>
        <Header />
        <Toolbar />
        <Hero />
        <div
          className="text-center m-auto text-gray-50 text-lg md:text-2xl mt-5
           font-bold tracking-wider w-fit border-b-4 pb-2 border-dashed border-yellow-500"
        >
          Popular
        </div>
        <NavButtons />
        <div className="text-gray-50 text-right pr-10 py-5 text-lg">
          see all
        </div>
        <div className=" px-5">
          <Slider {...settings}>
            {movies.map((movie) => (
              <MovieTemplate data={movie} key={movie.id} />
            ))}
          </Slider>
        </div>

        {/* <Container>
          {tvshows.map((show) => (
            <Card key={show.id}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={`https://image.tmdb.org/t/p/original/${show.poster_path}`}
                  alt={`${show.poster_path} image`}
                ></CardMedia>
              </CardActionArea>
            </Card>
          ))}
        </Container> */}
      </Box>
    </>
  );
}
