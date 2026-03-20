import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import "../styles/navbar.css";

function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <nav className="navbar">
      <Link to="/"> Home </Link>
      <Link to="card"> Card </Link>
      <Link to="/todo"> Todo </Link>
      <Link to="/weather"> Weather </Link>
      <Link to="/stopwatch"> Stopwatch </Link>

      <button onClick={toggleTheme}>
        {theme === "light" ? "dark" : "light"} mode
      </button>
    </nav>
  );
}

export default Navbar;
