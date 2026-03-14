import { giphyApi } from '../api/giphy.api';

interface SuggestionItem {
  name: string;
}

interface SuggestionsResponse {
  data: SuggestionItem[];
}

export const getSuggestions = async (query: string): Promise<string[]> => {
  try {
    const response = await giphyApi.get<SuggestionsResponse>('/search/tags', {
      params: { 
        q: query, 
        limit: 5 
      }
    });
    
    return response.data.data.map(item => item.name);
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    return [];
  }
};
