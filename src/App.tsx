import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import { PageRoutes } from "./pages/pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={PageRoutes.HOME} element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
