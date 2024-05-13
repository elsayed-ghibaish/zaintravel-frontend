import { useEffect, useState } from "react";
import { fetchApiTwo } from "./fetchApiTwo";

const userFetch = (endPoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetchApiTwo.get(endPoint);
        setData(res.data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };

    fetchData();
  }, [endPoint]);

  return { data, loading, error };
};

export default userFetch;
