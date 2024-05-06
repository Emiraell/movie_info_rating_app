import { useParams } from "react-router-dom";
import usefetch from "../../hooks/useFetch";
import { Movie } from "../../store/features/movies/Popular";
import Header from "../../components/Header";
import {
  Avatar,
  Box,
  Divider,
  Grid,
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

export default function MovieDetail() {
  const { id } = useParams();
  const { details, isLoading, error } = usefetch({
    url: `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
    detail: true,
  });

  console.log(details);

  return (
    <>
      <Header />
      <Toolbar />
      <Hero homePage={false} pageName="movie" />
      <div className="text-gray-100 text-center tracking-wide md:w-[90%] m-auto border my-5 border-blue-950 shadow-lg">
        {/* <Box sx={{ my: 5 }}> */}
        <Typography
          variant="h4"
          component="div"
          sx={{ fontWeight: "bold", my: 4 }}
        >
          {details?.title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 3, sm: 5 },
          }}
        >
          <Box sx={{ flex: 1, p: 2 }}>
            <img
              className="pb-5 rounded-sm"
              src={`https://image.tmdb.org/t/p/original/${details?.poster_path}`}
              alt={`${details?.title} image`}
            />
            <Typography
              sx={{ display: { sm: "none" } }}
              variant="h6"
              component="div"
              mx={2}
            >
              {details?.overview}
            </Typography>
          </Box>
          <Box sx={{ textAlign: "start", flex: 1.5 }}>
            <Box mx={5}>
              <Box
                sx={{ display: "flex", justifyContent: "flex-start", mb: 4 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    mr: 3,
                  }}
                >
                  {details?.adult ||
                    (!details?.adult && (
                      <Box>
                        <Typography variant="h6" className="typography">
                          Adult
                        </Typography>
                        <Typography>{details?.adult ? "Yes" : "No"}</Typography>
                      </Box>
                    ))}
                  {details?.release_date && (
                    <Box>
                      <Typography className="typography">
                        Release Date
                      </Typography>
                      <Typography>{details?.release_date}</Typography>
                    </Box>
                  )}
                  {details?.revenue ||
                    (!details?.revenue && (
                      <Box>
                        <Typography className="typography">Revenue</Typography>
                        <Typography>{details?.revenue}</Typography>
                      </Box>
                    ))}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    ml: 3,
                  }}
                >
                  {details?.runtime && (
                    <Box>
                      <p className="typography">Runtime</p>
                      <Typography>{details?.runtime} Minutes</Typography>
                    </Box>
                  )}
                  {details?.popularity && (
                    <Box>
                      <p className="typography">Popularity</p>
                      <p>{details?.popularity}</p>
                    </Box>
                  )}
                  {details?.vote_count && (
                    <Box>
                      <p className="typography">Vote count</p>
                      <p>{details?.vote_count}</p>
                    </Box>
                  )}
                </Box>{" "}
              </Box>

              {details?.genres && (
                <Box>
                  <p className="typography">Genres</p>
                  <List sx={{ display: "flex" }}>
                    {details?.genres.map((genre: Genres) => (
                      <ListItem key={genre.id}>
                        <ListItemText primary={genre.name} sx={{}} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}

              {details?.production_companies && (
                <Box>
                  <p className="typography">Production companies</p>
                  <List>
                    {details?.production_companies.map((company: Companies) => (
                      <ListItem key={company.id}>
                        <ListItemAvatar>
                          {company.logo_path ? (
                            <Avatar
                              src={`https://image.tmdb.org/t/p/original/${company.logo_path}`}
                            />
                          ) : (
                            <Avatar sx={{ backgroundColor: "blue" }}>
                              {company.name.substring(0, 2)}
                            </Avatar>
                          )}
                        </ListItemAvatar>
                        <ListItemText primary={company.name} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}

              {details?.production_countries && (
                <Box>
                  <p className="typography">Production countries</p>
                  <List>
                    {details?.production_countries.map((country: Countries) => (
                      <ListItem key={country.iso_3166_1}>
                        <ListItemText primary={country.name} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
        <Typography
          sx={{ display: { xs: "none", sm: "block" } }}
          variant="h6"
          component="div"
          m={3}
        >
          {details?.overview}
        </Typography>

        {/* </Box> */}
      </div>
    </>
  );
}
