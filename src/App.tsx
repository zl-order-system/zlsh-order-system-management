import { HashRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { PageRoutes } from "./util/types/pages";
import Home from "./pages/Home";
import Stats from "./pages/Stats";
import Payments from "./pages/Payments";
import Meal from "./pages/Meal";
import { useEffect } from "react";
import { getToken, redirectToLoginPage } from "./util/util";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  useEffect(() => {
    if (getToken() !== null && getToken() !== "") return;
    console.log("Redirecting to Login Page - Token Not Found");
    redirectToLoginPage(window);
  }, []);

  return (
    <div className="font-['Inter']">
      <QueryClientProvider client={new QueryClient()}>
        <Router>
          <Routes>
            <Route path={PageRoutes.HOME} element={<Home/>} />
            <Route path={PageRoutes.STATS} element={<Stats/>} />
            <Route path={PageRoutes.PAYMENTS} element={<Payments/>} />
            <Route path={PageRoutes.MEAL} element={<Meal/>} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
