import { SearchResult, SearchCategory, SearchFilters } from '@/types/search';

// Real content from the application pages
const siteContent: SearchResult[] = [
  // Main Pages
  {
    id: 'page-home',
    title: 'Informační technologie - SPŠD',
    description: 'Čtyřleté maturitní studium zaměřené na programování, správu systémů a počítačové sítě. Fakultní škola Fakulty dopravní ČVUT.',
    category: 'page',
    url: '/',
    tags: ['Home', 'IT', 'SPŠD', 'Programování', 'Sítě'],
    date: new Date('2025-01-01'),
  },
  {
    id: 'page-about',
    title: 'O oboru Informační technologie',
    description: 'Obor Informační technologie je čtyřletý maturitní obor, který připravuje studenty na práci v dynamicky se rozvíjející oblasti informačních technologií. Programování v moderních jazycích, databázové systémy, počítačové sítě, grafický design.',
    category: 'page',
    url: '/about',
    tags: ['O oboru', 'IT vzdělávání', 'Maturita', 'Programování', 'Databáze', 'Sítě', 'Design'],
    date: new Date('2025-01-01'),
  },
  {
    id: 'page-curriculum',
    title: 'Učební plán - Informační technologie',
    description: 'Školní vzdělávací program 18-20-M/01 Informační technologie – Aplikace, grafika a webdesign. Čtyřleté denní studium s platností od 1. září 2021.',
    category: 'page',
    url: '/curriculum',
    tags: ['Učební plán', 'ŠVP', 'RVP', 'Předměty', 'Studium'],
    date: new Date('2025-01-01'),
  },

  // Projects - Real data from your application
  {
    id: 'proj-certifications',
    title: 'Certifikace IT',
    description: 'Přehled a návrh certifikací do výuky',
    category: 'projects',
    url: '/projects',
    tags: ['Certifikace', 'IT', 'Vzdělávání'],
    date: new Date('2025-01-01'),
    author: 'J.T, VEDENÍ',
  },
  {
    id: 'proj-literacy-test',
    title: 'Úvodní test digitální gramotnosti',
    description: 'Tvorba testu pro nové žáky',
    category: 'projects',
    url: '/projects',
    tags: ['Test', 'Digitální gramotnost', 'Žáci'],
    date: new Date('2025-10-01'),
    author: 'M.N, IŠ',
  },
  {
    id: 'proj-specialized-test',
    title: 'Úvodní test z odborných předmětů',
    description: 'Sledování vývoje žáků',
    category: 'projects',
    url: '/projects',
    tags: ['Test', 'Odborné předměty', 'Vývoj žáků'],
    date: new Date('2025-11-01'),
    author: 'M.N',
  },
  {
    id: 'proj-game',
    title: 'Interaktivní hra',
    description: 'Vývoj hry s tématem školy / IT pro Den otevřených dveří',
    category: 'projects',
    url: '/projects',
    tags: ['Hra', 'Vývoj', 'IT', 'DOD', 'Škola'],
    date: new Date('2025-11-01'),
    author: 'Š.B, D.K',
  },
  {
    id: 'proj-thesis-evidence',
    title: 'Evidence MZ prací',
    description: 'Přihlašovací a evidenční systém pro maturitní a závěrečné práce',
    category: 'projects',
    url: '/projects',
    tags: ['Evidence', 'Maturitní práce', 'Systém'],
    date: new Date('2026-01-01'),
    author: 'J.T',
  },
  {
    id: 'proj-survey',
    title: 'Anketní systém',
    description: 'Aplikace pro zpětnou vazbu od studentů a pedagogů',
    category: 'projects',
    url: '/projects',
    tags: ['Anketa', 'Zpětná vazba', 'Aplikace'],
    date: new Date('2025-10-01'),
    author: 'A.B',
  },
  {
    id: 'proj-competition',
    title: 'IT soutěž',
    description: 'Návrh a organizace soutěže pro žáky',
    category: 'projects',
    url: '/projects',
    tags: ['Soutěž', 'IT', 'Organizace', 'Žáci'],
    date: new Date('2025-12-01'),
    author: 'J.T',
  },
  {
    id: 'proj-classroom',
    title: 'Návrh učebny IT',
    description: 'Model nové/fiktivní IT učebny - Maturitní práce',
    category: 'projects',
    url: '/projects',
    tags: ['Učebna', 'IT', 'Návrh', 'Maturitní práce'],
    date: new Date('2026-01-01'),
    author: 'J.T',
  },
  {
    id: 'proj-departure-board',
    title: 'Odjezdová tabule',
    description: 'Rozšíření a grafika tabule MHD',
    category: 'projects',
    url: '/projects',
    tags: ['Tabule', 'MHD', 'Grafika', 'IoT'],
    date: new Date('2025-10-01'),
    author: 'A.B, V.F',
  },
  {
    id: 'proj-departure-board-hw',
    title: 'HW realizace odjezdové tabule',
    description: 'Hardwarová implementace odjezdové tabule MHD - Praxe',
    category: 'projects',
    url: '/projects',
    tags: ['Hardware', 'Tabule', 'MHD', 'Praxe', 'IoT'],
    date: new Date('2025-10-01'),
    author: 'A.B, V.F',
  },
  {
    id: 'proj-chatbot',
    title: 'Chatbot pro obor / školu',
    description: 'Chatbot pro dotazy uchazečů a studentů',
    category: 'projects',
    url: '/projects',
    tags: ['Chatbot', 'AI', 'Dotazy', 'Studenti'],
    date: new Date('2026-01-01'),
    author: 'O.B, D.Z',
  },
  {
    id: 'proj-promo-video',
    title: 'Propagační video',
    description: 'Video o oboru IT, pro DOD nebo sociální sítě - Maturitní práce',
    category: 'projects',
    url: '/projects',
    tags: ['Video', 'Propagace', 'IT', 'Maturitní práce', 'DOD'],
    date: new Date('2025-11-01'),
    author: 'O.P.L.T',
  },
  {
    id: 'proj-competitions-overview',
    title: 'Přehled IT soutěží',
    description: 'Sběr a prezentace aktuálních soutěží pro studenty',
    category: 'projects',
    url: '/projects',
    tags: ['Soutěže', 'IT', 'Přehled', 'Studenti'],
    date: new Date('2025-12-01'),
    author: 'V.G',
  },
  {
    id: 'proj-antivandal-pc',
    title: 'Přestavba "antivandal" PC stanice',
    description: 'Rekonstrukce odolné PC stanice - Maturitní práce + Praxe',
    category: 'projects',
    url: '/projects',
    tags: ['Hardware', 'PC', 'Rekonstrukce', 'Maturitní práce', 'Praxe'],
    date: new Date('2026-01-01'),
    author: 'ČERNÍK',
  },
  {
    id: 'proj-graphic-presentation',
    title: 'Grafická prezentace oboru IT / realizace nástěnky IT oboru',
    description: 'Vizuální reprezentace IT oboru - Maturitní práce',
    category: 'projects',
    url: '/projects',
    tags: ['Grafika', 'Prezentace', 'IT obor', 'Maturitní práce', 'Design'],
    date: new Date('2026-01-01'),
    author: 'ZAJÍČEK',
  },
  {
    id: 'proj-attendance-tracking',
    title: 'Sledování prezence školních akcí',
    description: 'Systém pro sledování účasti na školních akcích',
    category: 'projects',
    url: '/projects',
    tags: ['Prezence', 'Sledování', 'Akce', 'Systém'],
    date: new Date('2026-01-01'),
    author: 'J.S',
  },

  // Curriculum Subjects
  {
    id: 'subject-programming',
    title: 'Programování',
    description: 'Programování v jazycích C/C++, Python, Java. Objektově orientované programování, algoritmy a datové struktury.',
    category: 'page',
    url: '/curriculum',
    tags: ['Programování', 'C++', 'Python', 'Java', 'OOP', 'Algoritmy'],
    date: new Date('2025-01-01'),
  },
  {
    id: 'subject-networks',
    title: 'Datové sítě',
    description: 'Cisco technologie, síťová architektura, routing, switching, bezpečnost sítí.',
    category: 'page',
    url: '/curriculum',
    tags: ['Sítě', 'Cisco', 'Routing', 'Switching', 'Bezpečnost'],
    date: new Date('2025-01-01'),
  },
  {
    id: 'subject-databases',
    title: 'Databázové systémy',
    description: 'SQL, Oracle, MySQL, návrh databází, relační databáze, dotazovací jazyky.',
    category: 'page',
    url: '/curriculum',
    tags: ['Databáze', 'SQL', 'Oracle', 'MySQL', 'Relační databáze'],
    date: new Date('2025-01-01'),
  },
  {
    id: 'subject-cad',
    title: 'CAD systémy',
    description: 'AutoCAD, 3D modelování, technické kreslení, počítačem podporovaný design.',
    category: 'page',
    url: '/curriculum',
    tags: ['CAD', 'AutoCAD', '3D modelování', 'Design'],
    date: new Date('2025-01-01'),
  },
  {
    id: 'subject-webdesign',
    title: 'Webdesign',
    description: 'Tvorba webových stránek, HTML, CSS, JavaScript, responzivní design, UX/UI.',
    category: 'page',
    url: '/curriculum',
    tags: ['Webdesign', 'HTML', 'CSS', 'JavaScript', 'UX/UI'],
    date: new Date('2025-01-01'),
  },
  {
    id: 'subject-graphics',
    title: 'Grafická tvorba',
    description: '2D a 3D grafika, Adobe Creative Suite, grafický design, digitální zpracování obrazu.',
    category: 'page',
    url: '/curriculum',
    tags: ['Grafika', 'Design', 'Adobe', '2D', '3D'],
    date: new Date('2025-01-01'),
  },
  {
    id: 'subject-virtualization',
    title: 'Virtualizace',
    description: 'Virtualizační technologie, VMware, VirtualBox, cloud computing, serverová infrastruktura.',
    category: 'page',
    url: '/curriculum',
    tags: ['Virtualizace', 'Cloud', 'VMware', 'Servery'],
    date: new Date('2025-01-01'),
  },
];

export class SearchEngine {
  private static instance: SearchEngine;
  private searchIndex: SearchResult[] = siteContent;

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