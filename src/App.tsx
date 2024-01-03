import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PageRoutes } from "./util/types/pages";
import Home from "./pages/Home";
import Stats from "./pages/Stats";
import Payments from "./pages/Payments";
import Meal from "./pages/Meal";

function App() {
  return (
    <div className="font-['Inter']">
      <Router>
        <Routes>
          <Route path={PageRoutes.HOME} element={<Home/>} />
          <Route path={PageRoutes.STATS} element={<Stats/>} />
          <Route path={PageRoutes.PAYMENTS} element={<Payments/>} />
          <Route path={PageRoutes.MEAL} element={<Meal/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
