import { Card, CardMedia, Grid, Rating } from "@mui/material";
import { MovieDetails } from "../../hooks/useFetch";

// received props interface
interface RatedProps {
  type: string;
  movie: MovieDetails;
  refetch: () => void;
}
import CalendarMonthSharpIcon from "@mui/icons-material/CalendarMonthSharp";

export default function RatedTemplate({ type, movie, refetch }: RatedProps) {
  // delete rating functionality by user
  const deleteRating = () => {
    const options = {
      method: "DELETE",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${import.meta.env.VITE_MY_AUTH_KEY}`,
      },
    };

    // delete if it's either a movie or tv show by using logged in user guest id
    fetch(
      `https://api.themoviedb.org/3/${type}/${
        movie.id
      }/rating?guest_session_id=${localStorage.getItem("guestId")}`,
      options
    )
      .then((response) => response.json())
      .then((res) => {
        refetch();
        console.log(res);
      })
      .catch((err) => console.error(err));
  };

  return (
    // display using grid api from material ui
    <Grid key={movie.id} xs={12} sm={6} md={4} item>
      <Card>
        {/* movie image */}
        <CardMedia
          component="img"
          image={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          alt={`${movie.poster_path} image`}
          sx={{ height: "60vh", objectFit: "fill" }}
        />
        <div className="p-2 bg-rose-950 text-lg text-gray-50">
          <div>
            <p className="text-xl font-bold text-center h-12 py-1">
              {/* display name if it's a tv show and title if it's a movie */}
              {type === "movie" ? movie.title : movie.name}
            </p>
          </div>
          <div className=" flex text-sm justify-between py-3 text-start">
            <div className="py-2">
              <span className="flex items-center">
                Release Date
                <CalendarMonthSharpIcon fontSize="inherit" />:
              </span>
              {/* display air date if it's a tv show and release if it's a movie */}
              <p>
                {type === "movie" ? movie.release_date : movie.first_air_date}
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

            {/* delete rating button */}
            <button
              className="bg-red-700 py-1 px-3 hover:opacity-80 rounded"
              onClick={deleteRating}
            >
              Delete
            </button>
          </div>
        </div>
      </Card>
    </Grid>
  );
}
