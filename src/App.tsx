import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/Home/Main";
import { useEffect } from "react";
import { getAuth } from "./store/features/Auth";
import { useAppDispatch, useAppSelector } from "./store/features/store";
import Login from "./pages/Login";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAuth());
  }, []);
  const { userIn } = useAppSelector((state) => state.userAuth);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={userIn ? <Main /> : <Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
