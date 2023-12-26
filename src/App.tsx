import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PageRoutes } from "./types/pages";
import Home from "./pages/Home";
import Stats from "./pages/Stats";
import { Payments } from "./pages/Payments";

function App() {
  return (
    <div className="font-['Inter']">
      <Router>
        <Routes>
          <Route path={PageRoutes.HOME} element={<Home/>} />
          <Route path={PageRoutes.STATS} element={<Stats/>} />
          <Route path={PageRoutes.PAYMENTS} element={<Payments/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
