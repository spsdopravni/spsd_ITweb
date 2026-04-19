import { SearchResult, SearchFilters } from '@/types/search';

// Real content from the application pages
const siteContent: SearchResult[] = [
  // Main Pages
  {
    id: 'page-home',
    title: 'Informační technologie - SPŠD',
    description: 'Čtyřleté maturitní studium zaměřené na programování, správu systémů a počítačové sítě. Fakultní škola Fakulty dopravní ČVUT.',
    category: 'page',
    url: '/',
    tags: ['Domů', 'Home', 'IT', 'SPŠD', 'Programování', 'Sítě', 'Škola', 'Obor'],
    date: new Date('2025-01-01'),
  },
  {
    id: 'page-about',
    title: 'O oboru Informační technologie',
    description: 'Obor Informační technologie je čtyřletý maturitní obor, který připravuje studenty na práci v dynamicky se rozvíjející oblasti informačních technologií. Programování v moderních jazycích, databázové systémy, počítačové sítě, grafický design.',
    category: 'page',
    url: '/about',
    tags: ['O oboru', 'IT vzdělávání', 'Maturita', 'Programování', 'Databáze', 'Sítě', 'Design', 'Informace', 'Škola'],
    date: new Date('2025-01-01'),
  },
  {
    id: 'page-curriculum',
    title: 'Učební plán - Informační technologie',
    description: 'Školní vzdělávací program 18-20-M/01 Informační technologie – Aplikace, grafika a webdesign. Čtyřleté denní studium s platností od 1. září 2021.',
    category: 'page',
    url: '/curriculum',
    tags: ['Učební plán', 'ŠVP', 'RVP', 'Předměty', 'Studium', 'Rozvrh', 'Hodiny'],
    date: new Date('2025-01-01'),
  },
  {
    id: 'page-projects',
    title: 'Projekty IT oboru',
    description: 'Aktuální a plánované projekty studentů a pedagogů IT oboru. Maturitní práce, praxe, školní prezentace a interaktivní aplikace.',
    category: 'page',
    url: '/projects',
    tags: ['Projekty', 'Projekt', 'Studentské práce', 'Maturitní práce', 'Praxe', 'IT'],
    date: new Date('2025-01-01'),
  },

  // Projects - Real data linked to detail pages
  {
    id: 'proj-certifications',
    title: 'Certifikace IT',
    description: 'Přehled a návrh certifikací do výuky',
    category: 'projects',
    url: '/projects/itCertifications',
    tags: ['Projekt', 'Certifikace', 'IT', 'Vzdělávání'],
    date: new Date('2025-01-01'),
    author: 'J.T, VEDENÍ',
  },
  {
    id: 'proj-literacy-test',
    title: 'Úvodní test digitální gramotnosti',
    description: 'Tvorba testu pro nové žáky',
    category: 'projects',
    url: '/projects/digitalLiteracyTest',
    tags: ['Projekt', 'Test', 'Digitální gramotnost', 'Žáci'],
    date: new Date('2025-10-01'),
    author: 'M.N, IŠ',
  },
  {
    id: 'proj-specialized-test',
    title: 'Úvodní test z odborných předmětů',
    description: 'Sledování vývoje žáků',
    category: 'projects',
    url: '/projects/specializedTest',
    tags: ['Projekt', 'Test', 'Odborné předměty', 'Vývoj žáků'],
    date: new Date('2025-11-01'),
    author: 'M.N',
  },
  {
    id: 'proj-game',
    title: 'Interaktivní hra',
    description: 'Vývoj hry s tématem školy / IT pro Den otevřených dveří',
    category: 'projects',
    url: '/projects/interactiveGame',
    tags: ['Projekt', 'Hra', 'Vývoj', 'IT', 'DOD', 'Den otevřených dveří', 'Škola'],
    date: new Date('2025-11-01'),
    author: 'Š.B, D.K',
  },
  {
    id: 'proj-thesis-evidence',
    title: 'Evidence MZ prací',
    description: 'Přihlašovací a evidenční systém pro maturitní a závěrečné práce',
    category: 'projects',
    url: '/projects/thesisEvidence',
    tags: ['Projekt', 'Evidence', 'Maturitní práce', 'Systém'],
    date: new Date('2026-01-01'),
    author: 'J.T',
  },
  {
    id: 'proj-survey',
    title: 'Anketní systém',
    description: 'Aplikace pro zpětnou vazbu od studentů a pedagogů',
    category: 'projects',
    url: '/projects/surveySystem',
    tags: ['Projekt', 'Anketa', 'Zpětná vazba', 'Aplikace'],
    date: new Date('2025-10-01'),
    author: 'A.B',
  },
  {
    id: 'proj-competition',
    title: 'IT soutěž',
    description: 'Návrh a organizace soutěže pro žáky',
    category: 'projects',
    url: '/projects/itCompetition',
    tags: ['Projekt', 'Soutěž', 'IT', 'Organizace', 'Žáci'],
    date: new Date('2025-12-01'),
    author: 'J.T',
  },
  {
    id: 'proj-classroom',
    title: 'Návrh učebny IT',
    description: 'Model nové/fiktivní IT učebny - Maturitní práce',
    category: 'projects',
    url: '/projects/classroomDesign',
    tags: ['Projekt', 'Učebna', 'IT', 'Návrh', 'Maturitní práce'],
    date: new Date('2026-01-01'),
    author: 'J.T',
  },
  {
    id: 'proj-departure-board',
    title: 'Odjezdová tabule',
    description: 'Rozšíření a grafika tabule MHD',
    category: 'projects',
    url: '/projects/departureBoard',
    tags: ['Projekt', 'Tabule', 'MHD', 'Grafika', 'IoT'],
    date: new Date('2025-10-01'),
    author: 'A.B, V.F',
  },
  {
    id: 'proj-departure-board-hw',
    title: 'HW realizace odjezdové tabule',
    description: 'Hardwarová implementace odjezdové tabule MHD - Praxe',
    category: 'projects',
    url: '/projects/departureBoardHW',
    tags: ['Projekt', 'Hardware', 'Tabule', 'MHD', 'Praxe', 'IoT'],
    date: new Date('2025-10-01'),
    author: 'A.B, V.F',
  },
  {
    id: 'proj-chatbot',
    title: 'Chatbot pro obor / školu',
    description: 'Chatbot pro dotazy uchazečů a studentů',
    category: 'projects',
    url: '/projects/chatbot',
    tags: ['Projekt', 'Chatbot', 'AI', 'Dotazy', 'Studenti'],
    date: new Date('2026-01-01'),
    author: 'O.B, D.Z',
  },
  {
    id: 'proj-promo-video',
    title: 'Propagační video',
    description: 'Video o oboru IT, pro DOD nebo sociální sítě - Maturitní práce',
    category: 'projects',
    url: '/projects/promoVideo',
    tags: ['Projekt', 'Video', 'Propagace', 'IT', 'Maturitní práce', 'DOD'],
    date: new Date('2025-11-01'),
    author: 'O.P.L.T',
  },
  {
    id: 'proj-competitions-overview',
    title: 'Přehled IT soutěží',
    description: 'Sběr a prezentace aktuálních soutěží pro studenty',
    category: 'projects',
    url: '/projects/competitionsOverview',
    tags: ['Projekt', 'Soutěže', 'IT', 'Přehled', 'Studenti'],
    date: new Date('2025-12-01'),
    author: 'V.G',
  },
  {
    id: 'proj-antivandal-pc',
    title: 'Přestavba "antivandal" PC stanice',
    description: 'Rekonstrukce odolné PC stanice - Maturitní práce + Praxe',
    category: 'projects',
    url: '/projects/antivandalPC',
    tags: ['Projekt', 'Hardware', 'PC', 'Rekonstrukce', 'Maturitní práce', 'Praxe'],
    date: new Date('2026-01-01'),
    author: 'ČERNÍK',
  },
  {
    id: 'proj-graphic-presentation',
    title: 'Grafická prezentace oboru IT / realizace nástěnky IT oboru',
    description: 'Vizuální reprezentace IT oboru - Maturitní práce',
    category: 'projects',
    url: '/projects/graphicPresentation',
    tags: ['Projekt', 'Grafika', 'Prezentace', 'IT obor', 'Maturitní práce', 'Design'],
    date: new Date('2026-01-01'),
    author: 'ZAJÍČEK',
  },
  {
    id: 'proj-attendance-tracking',
    title: 'Sledování prezence školních akcí',
    description: 'Systém pro sledování účasti na školních akcích',
    category: 'projects',
    url: '/projects/attendanceTracking',
    tags: ['Projekt', 'Prezence', 'Sledování', 'Akce', 'Systém'],
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
    tags: ['Předmět', 'Programování', 'C++', 'Python', 'Java', 'OOP', 'Algoritmy'],
    date: new Date('2025-01-01'),
  },
  {
    id: 'subject-networks',
    title: 'Datové sítě',
    description: 'Cisco technologie, síťová architektura, routing, switching, bezpečnost sítí.',
    category: 'page',
    url: '/curriculum',
    tags: ['Předmět', 'Sítě', 'Cisco', 'Routing', 'Switching', 'Bezpečnost'],
    date: new Date('2025-01-01'),
  },
  {
    id: 'subject-databases',
    title: 'Databázové systémy',
    description: 'SQL, Oracle, MySQL, návrh databází, relační databáze, dotazovací jazyky.',
    category: 'page',
    url: '/curriculum',
    tags: ['Předmět', 'Databáze', 'SQL', 'Oracle', 'MySQL', 'Relační databáze'],
    date: new Date('2025-01-01'),
  },
  {
    id: 'subject-cad',
    title: 'CAD systémy',
    description: 'AutoCAD, 3D modelování, technické kreslení, počítačem podporovaný design.',
    category: 'page',
    url: '/curriculum',
    tags: ['Předmět', 'CAD', 'AutoCAD', '3D modelování', 'Design'],
    date: new Date('2025-01-01'),
  },
  {
    id: 'subject-webdesign',
    title: 'Webdesign',
    description: 'Tvorba webových stránek, HTML, CSS, JavaScript, responzivní design, UX/UI.',
    category: 'page',
    url: '/curriculum',
    tags: ['Předmět', 'Webdesign', 'HTML', 'CSS', 'JavaScript', 'UX/UI', 'Web'],
    date: new Date('2025-01-01'),
  },
  {
    id: 'subject-graphics',
    title: 'Grafická tvorba',
    description: '2D a 3D grafika, Adobe Creative Suite, grafický design, digitální zpracování obrazu.',
    category: 'page',
    url: '/curriculum',
    tags: ['Předmět', 'Grafika', 'Design', 'Adobe', '2D', '3D'],
    date: new Date('2025-01-01'),
  },
  {
    id: 'subject-virtualization',
    title: 'Virtualizace',
    description: 'Virtualizační technologie, VMware, VirtualBox, cloud computing, serverová infrastruktura.',
    category: 'page',
    url: '/curriculum',
    tags: ['Předmět', 'Virtualizace', 'Cloud', 'VMware', 'Servery'],
    date: new Date('2025-01-01'),
  },
];

// Normalize Czech characters for search (háčky, čárky)
function normalize(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

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
    const normalizedQuery = normalize(query);
    const queryWords = normalizedQuery.split(/\s+/).filter(w => w.length > 0);
    let score = 0;

    const normalizedTitle = normalize(item.title);
    const normalizedDesc = normalize(item.description);

    // Exact substring match in title (highest weight)
    if (normalizedTitle.includes(normalizedQuery)) {
      score += 15;
      if (normalizedTitle.startsWith(normalizedQuery)) {
        score += 5;
      }
    }

    // Exact substring match in description
    if (normalizedDesc.includes(normalizedQuery)) {
      score += 5;
    }

    // Word-level matching: each query word found in title/description/tags scores points
    for (const word of queryWords) {
      if (word.length < 2) continue;

      if (normalizedTitle.includes(word)) {
        score += 4;
      }
      if (normalizedDesc.includes(word)) {
        score += 2;
      }

      // Tags match (per word)
      if (item.tags) {
        for (const tag of item.tags) {
          if (normalize(tag).includes(word)) {
            score += 3;
            break; // count each word only once across tags
          }
        }
      }
    }

    // Author match
    if (item.author && normalize(item.author).includes(normalizedQuery)) {
      score += 3;
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
    if (!query.trim()) {
      return this.applyFilters(this.searchIndex, filters);
    }

    if (query.trim().length < 2) {
      return [];
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
    if (!query.trim() || query.trim().length < 2) return [];

    const normalizedQuery = normalize(query);
    const suggestions = new Set<string>();

    // Extract suggestions from titles (prefer starts-with, then includes)
    const startsWithTitles: string[] = [];
    const includesTitles: string[] = [];
    this.searchIndex.forEach(item => {
      const normalizedTitle = normalize(item.title);
      if (normalizedTitle.startsWith(normalizedQuery)) {
        startsWithTitles.push(item.title);
      } else if (normalizedTitle.includes(normalizedQuery)) {
        includesTitles.push(item.title);
      }
    });
    startsWithTitles.forEach(t => suggestions.add(t));
    includesTitles.forEach(t => suggestions.add(t));

    // Extract suggestions from tags (only if tag starts with or closely matches query)
    this.searchIndex.forEach(item => {
      if (item.tags) {
        item.tags.forEach(tag => {
          const normalizedTag = normalize(tag);
          if (normalizedTag.startsWith(normalizedQuery) || normalizedQuery.startsWith(normalizedTag)) {
            suggestions.add(tag);
          }
        });
      }
    });

    return Array.from(suggestions).slice(0, 5);
  }

  // Get trending searches
  async getTrendingSearches(): Promise<string[]> {
    return [
      'Projekty',
      'Maturitní práce',
      'Učební plán',
      'Programování',
      'Chatbot',
      'Soutěže',
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
