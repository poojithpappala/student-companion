
import suggestionsData from '@/lib/stubs/friend-suggestions.json';

export type FriendSuggestion = (typeof suggestionsData)[0];

export function useFriendSuggestions() {
    // In a real app, this would be an async fetch from an AI recommendation engine.
    const suggestions: FriendSuggestion[] = suggestionsData;

    return { suggestions };
}
