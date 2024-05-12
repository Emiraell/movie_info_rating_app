import { Card, CardActionArea, CardMedia, Grid, Rating } from "@mui/material";
import { MovieDetails } from "../../hooks/useFetch";
interface RatedProps {
  genre: string;
  movie: MovieDetails;
}
import CalendarMonthSharpIcon from "@mui/icons-material/CalendarMonthSharp";

export default function RatedTemplate({ genre, movie }: RatedProps) {
  return (
    <Grid key={movie.id} xs={12} sm={4}>
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            image={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt={`${movie.poster_path} image`}
            sx={{ height: "60vh", objectFit: "fill" }}
          />
          <div className="p-2 bg-gray-100 text-lg">
            <div>
              <p className="text-xl font-bold text-center h-12 py-1">
                {genre === "movie" ? movie.title : movie.name}
              </p>
            </div>
            {/* <div className="py-2"> */}
            <div className=" flex text-sm justify-between py-3 text-start">
              <div className="py-2">
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
                <p>Rating: {movie.vote_average.toFixed(1)}</p>
                <Rating
                  defaultValue={movie.vote_average / 2}
                  precision={0.1}
                  readOnly
                  color="inherit"
                />
              </div>
            </div>
            <div className="py-1 h-20">
              {movie.overview.substring(0, 105) + "..."}
            </div>
            <div className="m-3 flex justify-center text-gray-50 py-2 bg-emerald-700 items-center">
              <p>Your rating: {movie.rating}</p>
            </div>
            {/* </div> */}
          </div>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
