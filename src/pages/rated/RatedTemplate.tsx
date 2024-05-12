import { Card, CardActionArea, CardMedia, Grid, Rating } from "@mui/material";
import { MovieDetails } from "../../hooks/useFetch";
interface RatedProps {
  genre: string;
  movie: MovieDetails;
}
import CalendarMonthSharpIcon from "@mui/icons-material/CalendarMonthSharp";
import { useEffect } from "react";

export default function RatedTemplate({ genre, movie }: RatedProps) {
  const deleteRating = () => {
    const options = {
      method: "DELETE",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjc1YzEyYjhlYTI4ODFkODRhODA4ZDZiOTgwODA0ZSIsInN1YiI6IjY2MTk5YWZjOTBjZjUxMDE3Y2EyNmYwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A4OG4SnjnTSJY4f6Kiy1HMCN5qxlVn2pa6xJImqLXvc",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/${genre}/${
        movie.id
      }/rating?guest_session_id=${localStorage.getItem("guestId")}`,
      options
    )
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };

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
            <div className="m-3 flex justify-center gap-4 text-gray-50 py-2 items-center">
              <p className=" bg-emerald-700 px-4 py-1">
                Your rating: {movie.rating}
              </p>
              <button
                className="bg-red-700 py-1 px-3 hover:opacity-80 rounded"
                onClick={deleteRating}
              >
                Delete
              </button>
            </div>
            {/* </div> */}
          </div>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
