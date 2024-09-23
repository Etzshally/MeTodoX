import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

export const useFetch = <T>(url: string) => {
    const [data, setData] = useState<T | null>(null); // Response data
    const [error, setError] = useState<string | null>(null); // Error state
    const [loading, setLoading] = useState<boolean>(false); // Loading state

    useEffect(() => {
        // Fetch data
        const fetchData = async () => {
            setLoading(true);
            try {
                const response: AxiosResponse<T> = await axios.get(url); // Type-safe axios call
                setData(response.data);
                setError(null);
            } catch (err) {
                setError((err as Error).message);
                setData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]); // Re-run fetch if URL changes

    return { data, error, loading };
};