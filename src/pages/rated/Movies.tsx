import { useEffect, useState } from "react";
import usefetch, { MovieDetails } from "../../hooks/useFetch";
import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Rating,
} from "@mui/material";
import CalendarMonthSharpIcon from "@mui/icons-material/CalendarMonthSharp";

export default function RatedMovies() {
  const { data, isLoading, error } = usefetch({
    url: `https://api.themoviedb.org/3/guest_session/${localStorage.getItem(
      "guestId"
    )}/rated/movies?language=en-US&page=1&sort_by=created_at.asc&api_key=e275c12b8ea2881d84a808d6b980804e`,
    detail: false,
  });
  useEffect(() => {
    console.log(data);
  }, []);
  return (
    <Box mx={2}>
      <Grid container gap={2}>
        {data?.map((movie) => (
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
                      {movie.title}
                    </p>
                  </div>
                  {/* <div className="py-2"> */}
                  <div className=" flex text-sm justify-between py-3 text-start">
                    <div className="py-2">
                      <span className="flex items-center">
                        Release Date
                        <CalendarMonthSharpIcon fontSize="inherit" />:
                      </span>
                      <p>{movie.release_date}</p>
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
        ))}
      </Grid>
    </Box>
  );
}
