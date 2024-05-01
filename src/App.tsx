import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/Home/Main";
import { useAppSelector } from "./store/store";
import Login from "./pages/Login";
import { createContext, useState } from "react";

interface Movies {
  first_air_date: string;
  id: number;
  original_title: string;
  overview: string;
  name: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
}

export interface Data {
  movies: Movies[];
  tvshows: Movies[];
}
export interface Context {
  popular: Data;
  trending: Data;
  topRated: Data;
  playing: Data;
}
export const MoviesContext = createContext<Context>({
  popular: { movies: [], tvshows: [] },
  trending: { movies: [], tvshows: [] },
  topRated: { movies: [], tvshows: [] },
  playing: { movies: [], tvshows: [] },
});
function App() {
  const guestId: string | null = useAppSelector(
    (state) => state.userAuth.guestId
  );
  const [popular, setPopular] = useState<{
    movies: Movies[];
    tvshows: Movies[];
  }>({ movies: [], tvshows: [] });
  const [trending, setTrending] = useState<{
    movies: Movies[];
    tvshows: Movies[];
  }>({ movies: [], tvshows: [] });
  const [topRated, setTopRated] = useState<{
    movies: Movies[];
    tvshows: Movies[];
  }>({ movies: [], tvshows: [] });
  const [playing, setPlaying] = useState<{
    movies: Movies[];
    tvshows: Movies[];
  }>({ movies: [], tvshows: [] });
  return (
    <>
      <MoviesContext.Provider value={{ popular, trending, topRated, playing }}>
        <Router>
          <Routes>
            <Route path="/" element={guestId ? <Main /> : <Login />} />
          </Routes>
        </Router>
      </MoviesContext.Provider>
    </>
  );
}

export default App;
