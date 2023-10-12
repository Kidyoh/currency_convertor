import axios, { AxiosResponse } from "axios";
import { useState, useEffect } from "react";

interface UseAxiosResponse<T> {
  data: T;
  error: any;
  loaded: boolean;
}

function useAxios<T>(url: string): UseAxiosResponse<T> {
  const [data, setData] = useState<T>({} as T);
  const [error, setError] = useState<any>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoaded(true);
        const response: AxiosResponse<T> = await axios(url);
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoaded(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, loaded };
}

export default useAxios;
