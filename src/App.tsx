import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/Home/Main";
import { useAppSelector } from "./store/store";
import Login from "./pages/Login";
import Movies from "./pages/Movies";
import Tvshows from "./pages/Tvshows";

function App() {
  const guestId: string | null = useAppSelector(
    (state) => state.userAuth.guestId
  );
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={guestId ? <Main /> : <Login />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/tvshows" element={<Tvshows />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
