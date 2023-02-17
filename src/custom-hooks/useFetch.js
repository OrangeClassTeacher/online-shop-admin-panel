import React, { useEffect, useState } from "react";
import axios from "axios";

export default function useFetch(url, option) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    axios
      .get(url, option)
      .then(({ data: { status, result } }) => {
        if (status) {
          setData(result);
        } else {
          setError("Aldaa garlaa");
        }
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };
  return { data, error, loading };
}
