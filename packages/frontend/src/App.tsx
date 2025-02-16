import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Header } from "./components/header";
import { Home } from "./pages/home";
import { Footer } from "./components/footer";

import "./App.css";

function App() {
  return (
    <Router basename="/news">
      <Header />
      <Routes>
        <Route path="/" Component={Home} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
