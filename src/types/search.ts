export type SearchCategory = 'all' | 'page' | 'projects' | 'events' | 'resources' | 'students' | 'announcements';

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: SearchCategory;
  url: string;
  tags?: string[];
  date?: Date;
  author?: string;
  thumbnail?: string;
  relevanceScore?: number;
}

export interface SearchFilters {
  categories: SearchCategory[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  tags?: string[];
  sortBy?: 'relevance' | 'date' | 'title';
  sortOrder?: 'asc' | 'desc';
}

export interface SearchState {
  query: string;
  results: SearchResult[];
  filters: SearchFilters;
  isLoading: boolean;
  error: string | null;
  totalResults: number;
  currentPage: number;
  resultsPerPage: number;
  recentSearches: string[];
  suggestions: string[];
}