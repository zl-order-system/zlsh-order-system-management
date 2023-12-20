import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PageRoutes } from "./pages/pages";
import Home from "./pages/home/Home";
import Stats from "./pages/statistics/Stats";

function App() {
  return (
    <div className="font-['Inter']">
      <Router>
        <Routes>
          <Route path={PageRoutes.HOME} element={<Home/>} />
          <Route path={PageRoutes.STATS} element={<Stats/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
