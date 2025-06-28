
'use server';

export interface Job {
    id: string;
    title: string;
    company: {
        display_name: string;
    };
    location: {
        display_name: string;
    };
    description: string;
    redirect_url: string;
}

interface AdzunaResponse {
    results: Job[];
}

const APP_ID = process.env.ADZUNA_APP_ID;
const API_KEY = process.env.ADZUNA_API_KEY;

export async function fetchAdzunaJobs({
    query = 'software engineer',
    country = 'us',
    resultsPerPage = 5,
    page = 1
}: { query?: string, country?: string, resultsPerPage?: number, page?: number }): Promise<Job[]> {
    if (!APP_ID || !API_KEY) {
        console.error("Adzuna API credentials are not set in .env file");
        // Return empty array but don't crash the app
        return [];
    }

    const url = `https://api.adzuna.com/v1/api/jobs/${country}/search/${page}?app_id=${APP_ID}&app_key=${API_KEY}&results_per_page=${resultsPerPage}&what=${encodeURIComponent(query)}&content-type=application/json`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            // Log the error but don't throw, to avoid crashing the page
            console.error(`Adzuna API error: ${response.status} ${response.statusText}`);
            const errorBody = await response.text();
            console.error('Error body:', errorBody);
            return [];
        }
        const data: AdzunaResponse = await response.json();
        return data.results || [];
    } catch (error) {
        console.error("Failed to fetch jobs from Adzuna:", error);
        return [];
    }
}
