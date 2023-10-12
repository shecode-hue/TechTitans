import { useState, useEffect } from "react";
import axios from "axios";

const { REACT_APP_API_URL_PROD, REACT_APP_API_URL_DEV, NODE_ENV } = process.env;

export function useFetchActivities() {
  const [activities, setActivities] = useState([]);
  const [loadingActivities, setLoadingActivities] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch activities from the database
    async function fetchData() {
      try {
        const response = await axios.get(
          `${
            NODE_ENV === "production"
              ? REACT_APP_API_URL_PROD
              : REACT_APP_API_URL_DEV
          }/api/activities`
        );
        const { data } = response;
        setActivities(data.activities);
      } catch (error) {
        setError(error);
        console.error("Error: ", error);
      } finally {
        setLoadingActivities(false);
      }
    }

    fetchData();
  }, []);

  return { activities, loadingActivities, error };
}

export default useFetchActivities;
