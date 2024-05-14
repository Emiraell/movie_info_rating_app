import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Companies,
  Countries,
  Genres,
  Languages,
  MovieDetails,
  Seasons,
} from "../../../hooks/useFetch";
import RatingForm from "../RatingForm";

// received props interface
interface MovieProps {
  details: MovieDetails | undefined;
}
export default function Details({ details }: MovieProps) {
  return (
    <div
      className="text-gray-100 relative text-center tracking-wide md:w-[90%] g m-auto 
  border mb-48 mt-10 border-blue-950 shadow-lg"
    >
      <RatingForm id={details?.id} type="tv" name={details?.name} />
      <Box sx={{ my: 5 }}>
        <Typography variant="h4" component="div" sx={{ fontWeight: "bold" }}>
          {details?.name}
        </Typography>
        <p className=" italic text-lg">{details?.tagline}</p>
      </Box>
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
            alt={`${details?.name} image`}
          />
          <Typography variant="h6" component="div" mx={2}>
            {details?.overview}
          </Typography>
        </Box>
        <Box sx={{ textAlign: "start", flex: 1.5 }}>
          <Box mx={5}>
            <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 4 }}>
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
                  <p className="typography">Vote count</p>
                  <Typography>{details?.vote_count}</Typography>
                </Box>

                <Box>
                  <Typography className="typography">
                    Number of Seasons
                  </Typography>
                  <Typography>{details?.number_of_seasons} Seasons</Typography>
                </Box>

                <Box>
                  <Typography className="typography">First air date</Typography>
                  <Typography>{details?.first_air_date}</Typography>
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
                  <Typography className="typography">
                    Spoken Languages
                  </Typography>
                  <div>
                    {details?.spoken_languages.map((language: Languages) => (
                      <Typography component="div" key={language.iso_639_1}>
                        {language.name}
                      </Typography>
                    ))}
                  </div>
                </Box>

                <Box>
                  <p className="typography">Popularity</p>
                  <Typography>{details?.popularity}</Typography>
                </Box>

                <Box>
                  <p className="typography">Number of Episodes</p>
                  <Typography>
                    {details?.number_of_episodes} Episodes
                  </Typography>
                </Box>
                {details?.last_air_date && (
                  <Box>
                    <Typography className="typography">
                      Last air date
                    </Typography>
                    <Typography>{details?.last_air_date}</Typography>
                  </Box>
                )}
              </Box>
            </Box>

            <p className="typography my-4">Seasons</p>
            <Box sx={{ height: 200, overflowY: "scroll" }}>
              {details?.seasons.map((season: Seasons) => (
                <Accordion
                  className=""
                  key={season.id}
                  sx={{
                    backgroundColor: "blue",
                    color: "white",
                    overflowY: "scroll",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    Season {season.season_number}
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography sx={{ letterSpacing: 1, opacity: 0.9 }}>
                      Air Date: {season.air_date}
                    </Typography>
                    <Typography sx={{ letterSpacing: 1, opacity: 0.9 }}>
                      {season.episode_count} episodes
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
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
    </div>
  );
}
