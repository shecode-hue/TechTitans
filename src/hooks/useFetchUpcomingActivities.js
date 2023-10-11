import { useState, useEffect } from 'react';

const useFetchUpcomingActivities = () => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await fetch('/api/upcoming-activities');
                const data = await response.json();
                setActivities(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchActivities();
    }, []);

    return { activities, loading, error };
};

export default useFetchUpcomingActivities;
