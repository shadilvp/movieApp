import { Route, Routes, useLocation } from "react-router-dom";
import SignUp from "./pages/authantication/SignUp";
import SignIn from "./pages/authantication/SignIn";
import Home from "./pages/Home";
import AddMovie from "./pages/AddMovie";
import Header from "./Components/Header";
import MovieDetailedView from "./pages/MovieDetailedView";

const App = () => {
  const location = useLocation();
  const hideHeaderRoutes = ["/login", "/register"];
  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

  return (
    <div>
      {!shouldHideHeader && <Header />}
      <Routes>
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<MovieDetailedView />} />
        <Route path="/addMovie" element={<AddMovie />} />
      </Routes>
    </div>
  );
};

export default App;
