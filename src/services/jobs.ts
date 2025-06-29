
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
    if (!APP_ID || !API_KEY || APP_ID === 'YOUR_ADZUNA_APP_ID' || API_KEY === 'YOUR_ADZUNA_API_KEY') {
        throw new Error("Adzuna API keys not configured. Please add ADZUNA_APP_ID and ADZUNA_API_KEY to your .env file.");
    }

    const url = `https://api.adzuna.com/v1/api/jobs/${country}/search/${page}?app_id=${APP_ID}&app_key=${API_KEY}&results_per_page=${resultsPerPage}&what=${encodeURIComponent(query)}&content-type=application/json`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorBody = await response.text();
            console.error('Adzuna API error body:', errorBody);
            throw new Error(`Adzuna API error: ${response.status} ${response.statusText}`);
        }
        const data: AdzunaResponse = await response.json();
        return data.results || [];
    } catch (error) {
        if (error instanceof Error) {
            console.error("Failed to fetch jobs from Adzuna:", error.message);
            throw new Error(`Failed to fetch jobs: ${error.message}`);
        }
        console.error("An unknown error occurred while fetching jobs from Adzuna:", error);
        throw new Error("An unknown error occurred while fetching jobs.");
    }
}
