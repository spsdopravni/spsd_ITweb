import { SearchResult, SearchCategory, SearchFilters } from '@/types/search';

// Mock data for demonstration - replace with actual API calls
const mockData: SearchResult[] = [
  // Projects
  {
    id: 'proj-1',
    title: 'AI-Powered Study Assistant',
    description: 'Machine learning application that helps students organize and optimize their study sessions using personalized algorithms.',
    category: 'projects',
    url: '/projects/ai-study-assistant',
    tags: ['AI', 'Machine Learning', 'Education', 'Python'],
    date: new Date('2025-03-15'),
    author: 'Sarah Chen',
    thumbnail: '/projects/ai-assistant.jpg',
  },
  {
    id: 'proj-2',
    title: 'Campus Navigation App',
    description: 'Mobile application providing real-time indoor navigation for university buildings with AR features.',
    category: 'projects',
    url: '/projects/campus-nav',
    tags: ['Mobile', 'AR', 'Navigation', 'React Native'],
    date: new Date('2025-03-10'),
    author: 'Michael Torres',
  },
  {
    id: 'proj-3',
    title: 'Sustainable Energy Dashboard',
    description: 'Real-time monitoring system for campus energy consumption with predictive analytics.',
    category: 'projects',
    url: '/projects/energy-dashboard',
    tags: ['IoT', 'Sustainability', 'Data Visualization', 'Node.js'],
    date: new Date('2025-03-05'),
    author: 'Emily Johnson',
  },
  
  // Events
  {
    id: 'event-1',
    title: 'Hackathon 2025: Innovation Challenge',
    description: 'Annual 48-hour hackathon focused on solving real-world problems using cutting-edge technology.',
    category: 'events',
    url: '/events/hackathon-2025',
    tags: ['Hackathon', 'Competition', 'Coding', 'Innovation'],
    date: new Date('2025-04-20'),
    author: 'Tech Club',
  },
  {
    id: 'event-2',
    title: 'AI & Ethics Symposium',
    description: 'Expert panel discussion on the ethical implications of artificial intelligence in education.',
    category: 'events',
    url: '/events/ai-ethics-symposium',
    tags: ['AI', 'Ethics', 'Conference', 'Discussion'],
    date: new Date('2025-04-15'),
    author: 'CS Department',
  },
  {
    id: 'event-3',
    title: 'Career Fair: Tech Industry',
    description: 'Connect with leading tech companies for internships and full-time opportunities.',
    category: 'events',
    url: '/events/career-fair-tech',
    tags: ['Career', 'Networking', 'Jobs', 'Internships'],
    date: new Date('2025-04-10'),
    author: 'Career Services',
  },
  
  // Resources
  {
    id: 'res-1',
    title: 'Python Programming Guide',
    description: 'Comprehensive guide to Python programming from basics to advanced concepts.',
    category: 'resources',
    url: '/resources/python-guide',
    tags: ['Python', 'Programming', 'Tutorial', 'Guide'],
    date: new Date('2025-03-01'),
    author: 'Prof. David Kim',
  },
  {
    id: 'res-2',
    title: 'Research Paper Writing Templates',
    description: 'Collection of templates and guidelines for writing academic research papers.',
    category: 'resources',
    url: '/resources/paper-templates',
    tags: ['Research', 'Writing', 'Academic', 'Templates'],
    date: new Date('2025-02-28'),
    author: 'Academic Writing Center',
  },
  {
    id: 'res-3',
    title: 'Data Science Toolkit',
    description: 'Essential tools and libraries for data science projects with practical examples.',
    category: 'resources',
    url: '/resources/data-science-toolkit',
    tags: ['Data Science', 'Tools', 'Analytics', 'R', 'Python'],
    date: new Date('2025-02-25'),
    author: 'Data Science Lab',
  },
  
  // Announcements
  {
    id: 'ann-1',
    title: 'New Computer Lab Opening',
    description: 'State-of-the-art computer lab with high-performance workstations now open 24/7.',
    category: 'announcements',
    url: '/announcements/new-lab',
    tags: ['Facility', 'Lab', 'Announcement'],
    date: new Date('2025-03-18'),
    author: 'IT Department',
  },
  {
    id: 'ann-2',
    title: 'Scholarship Applications Open',
    description: 'Merit-based scholarships for CS students now accepting applications.',
    category: 'announcements',
    url: '/announcements/scholarships',
    tags: ['Scholarship', 'Financial Aid', 'Application'],
    date: new Date('2025-03-12'),
    author: 'Financial Aid Office',
  },
];

export class SearchEngine {
  private static instance: SearchEngine;
  private searchIndex: SearchResult[] = mockData;

  private constructor() {}

  static getInstance(): SearchEngine {
    if (!SearchEngine.instance) {
      SearchEngine.instance = new SearchEngine();
    }
    return SearchEngine.instance;
  }

  // Calculate relevance score based on query match
  private calculateRelevance(item: SearchResult, query: string): number {
    const lowerQuery = query.toLowerCase();
    let score = 0;

    // Title match (highest weight)
    if (item.title.toLowerCase().includes(lowerQuery)) {
      score += 10;
      if (item.title.toLowerCase().startsWith(lowerQuery)) {
        score += 5;
      }
    }

    // Description match
    if (item.description.toLowerCase().includes(lowerQuery)) {
      score += 5;
    }

    // Tags match
    if (item.tags) {
      item.tags.forEach(tag => {
        if (tag.toLowerCase().includes(lowerQuery)) {
          score += 3;
        }
      });
    }

    // Author match
    if (item.author && item.author.toLowerCase().includes(lowerQuery)) {
      score += 2;
    }

    return score;
  }

  // Apply filters to search results
  private applyFilters(results: SearchResult[], filters: SearchFilters): SearchResult[] {
    let filtered = [...results];

    // Category filter
    if (filters.categories.length > 0 && !filters.categories.includes('all')) {
      filtered = filtered.filter(item => 
        filters.categories.includes(item.category)
      );
    }

    // Date range filter
    if (filters.dateRange) {
      filtered = filtered.filter(item => {
        if (!item.date) return true;
        return item.date >= filters.dateRange!.start && 
               item.date <= filters.dateRange!.end;
      });
    }

    // Tags filter
    if (filters.tags && filters.tags.length > 0) {
      filtered = filtered.filter(item => {
        if (!item.tags) return false;
        return filters.tags!.some(tag => 
          item.tags!.some(itemTag => 
            itemTag.toLowerCase().includes(tag.toLowerCase())
          )
        );
      });
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'date':
          if (!a.date || !b.date) return 0;
          return filters.sortOrder === 'asc' 
            ? a.date.getTime() - b.date.getTime()
            : b.date.getTime() - a.date.getTime();
        case 'title':
          return filters.sortOrder === 'asc'
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
        case 'relevance':
        default:
          return filters.sortOrder === 'asc'
            ? (a.relevanceScore || 0) - (b.relevanceScore || 0)
            : (b.relevanceScore || 0) - (a.relevanceScore || 0);
      }
    });

    return filtered;
  }

  // Main search function
  async search(query: string, filters: SearchFilters): Promise<SearchResult[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));

    if (!query.trim()) {
      return this.applyFilters(this.searchIndex, filters);
    }

    // Search and calculate relevance
    const results = this.searchIndex
      .map(item => ({
        ...item,
        relevanceScore: this.calculateRelevance(item, query)
      }))
      .filter(item => item.relevanceScore > 0);

    // Apply filters
    return this.applyFilters(results, filters);
  }

  // Get search suggestions based on partial query
  async getSuggestions(query: string): Promise<string[]> {
    if (!query.trim()) return [];

    const lowerQuery = query.toLowerCase();
    const suggestions = new Set<string>();

    // Extract suggestions from titles
    this.searchIndex.forEach(item => {
      if (item.title.toLowerCase().includes(lowerQuery)) {
        suggestions.add(item.title);
      }
    });

    // Extract suggestions from tags
    this.searchIndex.forEach(item => {
      if (item.tags) {
        item.tags.forEach(tag => {
          if (tag.toLowerCase().includes(lowerQuery)) {
            suggestions.add(tag);
          }
        });
      }
    });

    return Array.from(suggestions).slice(0, 5);
  }

  // Get trending searches (mock implementation)
  async getTrendingSearches(): Promise<string[]> {
    return [
      'Machine Learning',
      'Hackathon 2025',
      'Python Programming',
      'Career Fair',
      'Research Papers',
      'Data Science',
    ];
  }

  // Add new items to search index (for dynamic content)
  addToIndex(items: SearchResult[]): void {
    this.searchIndex.push(...items);
  }

  // Clear search index
  clearIndex(): void {
    this.searchIndex = [];
  }

  // Reload index with fresh data
  reloadIndex(items: SearchResult[]): void {
    this.searchIndex = items;
  }
}