import { useState, useEffect } from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  if (currentPath === "/movie") {
    return <MoviePage />;
  }

  return <HomePage />;
}

export default App;
