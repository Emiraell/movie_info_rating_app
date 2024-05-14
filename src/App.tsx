import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/Home/Main";
import { useAppSelector } from "./store/store";
import Login from "./pages/Login";
import Movies from "./pages/Movies";
import Tvshows from "./pages/Tvshows";
import MovieDetail from "./pages/movieDetails/movie/Movie";
import TvshowDetail from "./pages/movieDetails/tv/Tvshows";
import Rated from "./pages/rated/Rated";

function App() {
  // guest id gotten when user is authenticated
  const guestId: string | null = useAppSelector(
    (state) => state.userAuth.guestId
  );
  return (
    <div className="font-roboto">
      <Router>
        <Routes>
          {/* display content of each page if user is authenticated */}
          <Route path="/" element={guestId ? <Main /> : <Login />} />
          <Route path="/movies" element={guestId ? <Movies /> : <Login />} />
          <Route path="/tvshows" element={guestId ? <Tvshows /> : <Login />} />
          <Route
            path="/movie/:id"
            element={guestId ? <MovieDetail /> : <Login />}
          />
          <Route
            path="/tvshows/:id"
            element={guestId ? <TvshowDetail /> : <Login />}
          />
          <Route path="/rated" element={guestId ? <Rated /> : <Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
