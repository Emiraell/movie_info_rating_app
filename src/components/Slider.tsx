import MovieTemplate from "./MovieTemplate";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Movies } from "./hooks/useFetch";

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

interface IProps {
  data: Movies[] | null;
}
export default function SliderCarousel({ data }: IProps) {
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
      <Slider {...settings}>
        {data?.map((movie: any) => (
          <MovieTemplate data={movie} key={movie.id} genre={"movie"} />
        ))}
      </Slider>
    </>
  );
}
