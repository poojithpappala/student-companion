
import activitiesData from '@/lib/stubs/activities.json';
import { useState, useEffect } from 'react';

export type Activity = (typeof activitiesData)[0];

export function useActivities(podId: string | null) {
    const [activities, setActivities] = useState<Activity[]>([]);

    useEffect(() => {
        if (podId) {
            // In a real app, this would fetch activities for the given podId.
            // For now, we return all activities that match the podId, or all activities as a stub if none match
            const podActivities = activitiesData.filter(a => a.podId === podId);
             setActivities(podActivities.length > 0 ? podActivities : activitiesData.slice(0, 4));
        }
    }, [podId]);

    // In a real app, you would have functions here for fetching more activities (infinite scroll)
    return { activities };
}
