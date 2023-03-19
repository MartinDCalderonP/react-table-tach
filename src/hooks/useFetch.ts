import { useState, useEffect } from "react";

export default function useFetch<T>(url: string, options?: RequestInit) {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const fetchData = async (url: string, options?: RequestInit) => {
    setLoading(true);

    if (!url) return;

    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
        setError(undefined);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const optionsWithSignal: RequestInit = {
      ...options,
      signal,
    };

    fetchData(url, optionsWithSignal);

    return () => {
      abortController.abort();
    };
  }, [url, options]);

  return { data, loading, error };
}
