
import hackathonsData from '@/lib/stubs/hackathons.json';

export type Hackathon = (typeof hackathonsData)[0];

export const hackathonDomains = ["AI", "Web", "Mobile", "Cybersecurity", "Data", "Social Impact"];

export function useHackathons() {
    // In a real app, this would be an async fetch.
    const hackathons: Hackathon[] = hackathonsData;

    return { hackathons };
}
