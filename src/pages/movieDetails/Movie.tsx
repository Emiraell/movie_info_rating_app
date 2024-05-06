import { useParams } from "react-router-dom";
import usefetch from "../../hooks/useFetch";
import { Movie } from "../../store/features/movies/Popular";
import Header from "../../components/Header";
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import Hero from "../../components/Hero";
import MovieTemplate from "../../components/MovieTemplate";

interface Genres {
  id: number;
  name: string;
}

interface Companies {
  id: number;
  logo_path: string;
  name: string;
  original_countries: string;
}
interface Countries {
  iso_3166_1: string;
  name: string;
}
interface Details {
  adult: boolean;
  title: string;
  poster_path: string;
  genres: Genres[];
  overview: string;
  popularity: number;
  production_companies: Companies[];
  production_countries: Countries[];
  revenue: number;
  release_date: string;
  runtime: number;
  vote_average: number;
  vote_count: number;
}
type FetchProps = {
  details: Details | any;
  isLoading: boolean;
  error: boolean;
};
export default function MovieDetail() {
  const { id } = useParams();
  const { details, isLoading, error }: FetchProps = usefetch({
    url: `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
    detail: true,
  });

  console.log(details);

  return (
    <>
      <Header />
      <Toolbar />
      <Hero homePage={false} pageName="movie" />
      <div className="text-gray-100 text-center tracking-wide w-[90%] m-auto border my-5 border-blue-950 shadow-lg">
        <Box sx={{ my: 5 }}>
          <Typography variant="h4" component="div" sx={{ fontWeight: "bold" }}>
            {details?.title}
          </Typography>
          <Box
            sx={{
              display: { sm: "flex", gap: 20 },
              m: 5,
            }}
          >
            <Box>
              <img src={details.poster_path} alt={`${details.title} image`} />
              <Typography variant="h6" component="div">
                {details.overview}
              </Typography>
            </Box>
            <Divider />
            <Box sx={{ textAlign: "start" }}>
              <Box sx={{ display: "flex", gap: 10 }}>
                <Box>
                  <Typography>Adult</Typography>
                  <Typography>{details.adult ? "Yes" : "No"}</Typography>
                </Box>
                <Box>
                  <Typography>Runtime</Typography>
                  <Typography>{details.runtime} Minutes</Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 10 }}>
                <Box>
                  <Typography>Release Date</Typography>
                  <Typography>{details?.release_date}</Typography>
                </Box>
                <Box>
                  <Typography>Popularity</Typography>
                  <Typography>{details?.popularity}</Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 10 }}>
                <Box>
                  <Typography>Revenue</Typography>
                  <Typography>{details?.revenue}</Typography>
                </Box>
                <Box>
                  <Typography>Vote count</Typography>
                  <Typography>{details?.vote_count}</Typography>
                </Box>
              </Box>

              <Box>
                <Typography>Genres</Typography>
                <List sx={{ display: "flex" }}>
                  {details?.genres.map((genre: Genres) => (
                    <ListItem key={genre.id} sx={{ verticalAlign: "text-top" }}>
                      <ListItemText
                        primary={genre.name}
                        sx={{ display: "inline" }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>

              <Box>
                <Typography>Production companies</Typography>
                <List>
                  {details?.production_companies.map((company: Companies) => (
                    <ListItem key={company.id}>
                      <ListItemAvatar>
                        <Avatar src={company.logo_path} />
                      </ListItemAvatar>
                      <ListItemText primary={company.name} />
                    </ListItem>
                  ))}
                </List>
              </Box>

              <Box>
                <Typography>Production countries</Typography>
                <List>
                  {details?.production_countries.map((country: Countries) => (
                    <ListItem key={country.iso_3166_1}>
                      <ListItemText primary={country.name} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Box>
          </Box>
        </Box>
      </div>
    </>
  );
}
