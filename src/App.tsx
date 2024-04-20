import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/Home/Main";
import { useEffect } from "react";
import { getAuth } from "./store/features/Auth";
import { useAppDispatch, useAppSelector } from "./store/features/store";
import Login from "./pages/Login";

function App() {
  const { guestId, userIn, name } = useAppSelector((state) => state.userAuth);
  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   dispatch(getAuth());
  // console.log(guestId, userIn, name);
  // }, []);
  // const { guestId } = useAppSelector((state) => state.userAuth);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={guestId ? <Main /> : <Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
