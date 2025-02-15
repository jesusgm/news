import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Header } from "./components/header";
import { Home } from "./pages/home";
import { Status } from "./pages/status";
import { Footer } from "./components/footer";

import "./App.css";

function App() {
  return (
    <Router basename="/news">
      <Header />
      <Routes>
        <Route path="/status" Component={Status} />
        <Route path="/" Component={Home} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
