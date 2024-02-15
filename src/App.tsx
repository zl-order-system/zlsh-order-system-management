import { HashRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { PageRoutes } from "./util/types/pages";
import Home from "./pages/Home";
import Stats from "./pages/Stats";
import Payments from "./pages/Payments";
import Meal from "./pages/Meal";
import Messages from "./pages/Messages";
import { useEffect, useRef, useState } from "react";
import { getToken, redirectToLoginPage } from "./util/util";
import appConstants from "./util/AppConstants"

function App() {
  const [roles, setRoles] = useState<string[]>([]);

  useEffect(() => {
    if (getToken() !== null && getToken() !== "") return;
    console.log("Redirecting to Login Page - Token Not Found");
    redirectToLoginPage(window);
  }, [])

  useEffect(() => {
    (async function() {
      // setRoles(await (await fetch(`${getAppConstants().backendHost}/api/user/role`)).json());
      setRoles(await (await fetch(`${appConstants.backendHost}/api/user/roles`, {headers: {"Authorization": `Bearer ${getToken()}`}})).json());
    })()
  }, [])

  return (
    <div className="font-['Inter']">
      <Router>
        <Routes>
          <Route path={PageRoutes.HOME} element={<Home roles={roles}/>} />
          <Route path={PageRoutes.STATS} element={<Stats/>} />
          <Route path={PageRoutes.PAYMENTS} element={<Payments/>} />
          <Route path={PageRoutes.MEAL} element={<Meal/>} />
          <Route path={PageRoutes.MESSAGES} element={<Messages/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
