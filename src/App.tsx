import { HashRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { PageRoutes } from "./util/types/pages";
import Home from "./pages/Home";
import Stats from "./pages/Stats";
import Payments from "./pages/Payments";
import Meal from "./pages/Meal";
import Messages from "./pages/Messages";
import { useEffect } from "react";
import { getToken } from "./util/util";

function App() {
  return (
    <div className="font-['Inter']">
      <Router>
        <TokenManager/>
        <Routes>
          <Route path={PageRoutes.HOME} element={<Home/>} />
          <Route path={PageRoutes.STATS} element={<Stats/>} />
          <Route path={PageRoutes.PAYMENTS} element={<Payments/>} />
          <Route path={PageRoutes.MEAL} element={<Meal/>} />
          <Route path={PageRoutes.MESSAGES} element={<Messages/>} />
        </Routes>
      </Router>
    </div>
  );
}

function TokenManager() {
  useEffect(() => {
    if (getToken() !== null && getToken() !== "") return;
    const win: Window = window;
    console.log("REDIRECT - TOKEN")
    // win.location = "https://zl-order-system.github.io/staging/app/#/login";
  }, [])

  return <></>
}

export default App;
