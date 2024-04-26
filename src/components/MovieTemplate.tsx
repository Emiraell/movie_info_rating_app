import { Card, CardActionArea, CardMedia, Rating } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CalendarMonthSharpIcon from "@mui/icons-material/CalendarMonthSharp";

interface Movie {
  first_air_date: string;
  id: number;
  name: string;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  vote_average: number;
}

interface IProps {
  data: Movie;
  genre: string;
}
export default function MovieTemplate({ data: movie, genre }: IProps) {
  return (
    <>
      <Card key={movie.id} sx={{ maxHeight: "fit-content" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            image={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt={`${movie.poster_path} image`}
            sx={{ height: "60vh", objectFit: "fill" }}
          ></CardMedia>
          <div className="p-3 tracking-wide bg-gray-950 text-gray-300">
            <div>
              <p className="text-xl font-bold text-center">
                {genre === "movie" ? movie.title : movie.name}
              </p>
            </div>
            <div className=" flex text-sm justify-between py-3">
              <div className="">
                <span className="flex items-center">
                  Release Date
                  <CalendarMonthSharpIcon fontSize="inherit" />:
                </span>
                <p>
                  {genre === "movie"
                    ? movie.release_date
                    : movie.first_air_date}
                </p>
              </div>

              <div>
                <p>Rating: </p>
                <Rating
                  defaultValue={movie.vote_average / 2}
                  precision={0.1}
                  readOnly
                  color="inherit"
                  // size="small"
                />
              </div>
            </div>

            <p className="text-lg">{movie.overview.substring(0, 90)} ....</p>
          </div>
        </CardActionArea>
      </Card>
    </>
  );
}
