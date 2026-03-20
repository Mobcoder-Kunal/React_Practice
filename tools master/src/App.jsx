import { useContext } from "react";
import Navbar from "./components/Navbar";
import CardPage from "./pages/CardPage";
import TodoPage from "./pages/TodoPage";
import WeatherPage from "./pages/WeatherPage";
import { Routes, Route } from "react-router-dom";
import { ThemeContext } from "./context/ThemeContext";
import Home from "./pages/Home";
import StopwatchPage from "./pages/StopwatchPage";

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={theme}>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/card" element={<CardPage />} />
        <Route path="/todo" element={<TodoPage />} />
        <Route path="/weather" element={<WeatherPage />} />
        <Route path="/stopwatch" element={<StopwatchPage />} />
      </Routes>
    </div>
  );
}

export default App;
