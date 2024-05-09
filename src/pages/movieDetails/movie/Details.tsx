import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  Companies,
  Countries,
  Genres,
  MovieDetails,
} from "../../../hooks/useFetch";
import RatingForm from "../RatingForm";

interface MovieProps {
  details: MovieDetails | undefined;
}
export default function Details({ details }: MovieProps) {
  return (
    <div className="mb-40 mt-20 relative md:w-[90%] m-auto text-gray-100 text-center tracking-wide ">
      <RatingForm id={details?.id} type="movie" name={details?.title} />
      <div className=" border  border-blue-950 shadow-lg">
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
                  <Box>
                    <Typography variant="h6" className="typography">
                      Adult
                    </Typography>
                    <Typography>{details?.adult ? "Yes" : "No"}</Typography>
                  </Box>

                  <Box>
                    <Typography className="typography">Release Date</Typography>
                    <Typography>{details?.release_date}</Typography>
                  </Box>

                  <Box>
                    <Typography className="typography">Revenue</Typography>
                    <Typography>{details?.revenue}</Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    ml: 3,
                  }}
                >
                  <Box>
                    <p className="typography">Runtime</p>
                    <Typography>{details?.runtime} Minutes</Typography>
                  </Box>

                  <Box>
                    <p className="typography">Popularity</p>
                    <p>{details?.popularity}</p>
                  </Box>

                  <Box>
                    <p className="typography">Vote count</p>
                    <p>{details?.vote_count}</p>
                  </Box>
                </Box>
              </Box>

              <Box mt={5}>
                <p className="typography">Genres</p>
                <List sx={{ display: "flex" }}>
                  {details?.genres.map((genre: Genres) => (
                    <ListItem key={genre.id}>
                      <ListItemText primary={genre.name} sx={{}} />
                    </ListItem>
                  ))}
                </List>
              </Box>

              <Box mt={4}>
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
                            {company.name[0]}
                          </Avatar>
                        )}
                      </ListItemAvatar>
                      <ListItemText primary={company.name} />
                    </ListItem>
                  ))}
                </List>
              </Box>

              <Box mt={5}>
                <p className="typography">Production countries</p>
                <List sx={{ display: "flex" }}>
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
        <Typography
          sx={{ display: { xs: "none", sm: "block" } }}
          variant="h6"
          component="div"
          m={3}
        >
          {details?.overview}
        </Typography>
      </div>
    </div>
  );
}
