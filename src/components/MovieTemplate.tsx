import { Card, CardActionArea, CardMedia, Rating } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CalendarMonthSharpIcon from "@mui/icons-material/CalendarMonthSharp";
import { Link } from "react-router-dom";
import { MovieDetails } from "../hooks/useFetch";

// received props interface
interface IProps {
  data: MovieDetails;
  type: string;
}
export default function MovieTemplate({ data: movie, type }: IProps) {
  return (
    <>
      <Card key={movie.id} sx={{ maxHeight: "fit-content", mx: 1 }}>
        <CardActionArea>
          <Link
            to={
              // link to page based on the type of movie
              type === "movie"
                ? `/movie_info_rating_app/movie/${movie.id}`
                : `/movie_info_rating_app/tvshows/${movie.id}`
            }
          >
            <CardMedia
              component="img"
              image={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt={`${movie.poster_path} image`}
              sx={{ height: "60vh", objectFit: "fill" }}
            />
          </Link>
          <div className="p-3 tracking-wide bg-gray-950 text-gray-300">
            <div>
              <p className="text-xl font-bold text-center h-12 py-1">
                {/* display name if it's a tv show and title if it's a movie */}
                {type === "movie" ? movie.title : movie.name}
              </p>
            </div>
            <div className=" flex text-sm justify-between py-3 text-start text-yellow-100">
              <div className="">
                <span className="flex items-center">
                  Release Date
                  <CalendarMonthSharpIcon fontSize="inherit" />:
                </span>
                <p>
                  {/* display air date if it's a tv show and release if it's a movie */}
                  {type === "movie" ? movie.release_date : movie.first_air_date}
                </p>
              </div>

              <div>
                <p>Rating: {movie.vote_average.toFixed(1)}</p>
                {/* rating use rating api from material ui */}
                <Rating
                  defaultValue={movie.vote_average / 2}
                  precision={0.1}
                  readOnly
                  color="inherit"
                />
              </div>
            </div>

            <p className="text-lg h-24">
              {movie.overview.substring(0, 90)} ....
            </p>
          </div>
        </CardActionArea>
      </Card>
    </>
  );
}
