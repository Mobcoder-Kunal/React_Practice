import { useState, useEffect } from "react";
import { developers as devData } from "../api/developers";

function useDevelopers() {
  const [developers, setDevelopers] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setDevelopers(devData);
    }, 500);
  }, []);
  return developers;
}

export default useDevelopers;
