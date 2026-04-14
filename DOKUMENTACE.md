# SPŠD IT Web

**Moderní oborový web pro IT obor SPŠD Motol — propagace oboru, portál pro studenty a ukázka toho, co IT obor reálně umí.**

---

## 1. Úvod a motivace

Projekt **SPŠD IT Web** vznikl jako vlastní iniciativa studenta třetího ročníku oboru Informační technologie na Střední průmyslové škole dopravní Praha (Motol). Cílem bylo vytvořit moderní, samostatný web, který by na Dni otevřených dveří a podobných akcích dokázal zájemcům o studium srozumitelně a atraktivně představit, co IT obor na SPŠD obnáší — a zároveň ukázat, že studenti dokáží technologicky postavit plnohodnotnou webovou aplikaci, ne jen statickou prezentaci.

Motivací byl rozdíl mezi tím, jak se obor prezentuje navenek, a tím, co se na něm reálně učí a dělá. Běžný školní web podává obecné informace; tenhle projekt má poskytnout hlubší „inside" pohled do oboru — předměty, projekty, technologie, atmosféru — a zároveň doplnit stávající školní prezentaci o něco, co spravují a vyvíjejí sami studenti. Web tedy nemá existující školní stránky nahrazovat, ale stavět vedle nich jako ukázka a rozšíření.

Druhou motivací byla samotná příležitost postavit netriviální full‑stack aplikaci od nuly: od databázového schématu, přes autentizační vrstvu, až po propracované UI s dvěma vizuálními režimy a lokalizací. Projekt tak zároveň slouží jako portfoliová práce a podklad pro prezentaci na veletrhu studentských projektů SPŠD Motol (10. 6. 2026).

---

## 2. Cíle projektu

Hlavním cílem bylo vytvořit **oborový web**, který plní tři funkce najednou: marketingovou (přilákat zájemce o studium IT), informační (poskytnout hlubší pohled do náplně oboru — předměty, ročníky, projekty, uplatnění) a portálovou (ukázat funkční prototyp studentského portálu s přihlášením, dashboardem a napojením na školní systémy typu Bakaláři či Moodle).

Z technického hlediska si projekt kladl za cíl být postaven na aktuálních technologiích, mít čistou architekturu oddělující UI, business logiku a datovou vrstvu, podporovat vícejazyčnost (čeština, angličtina, slovenština, ruština, ukrajinština) a nabídnout uživateli volbu mezi dvěma vizuálními styly — moderním (animovaným, s hero sekcemi a particle efekty) a klasickým (střídmějším, textově orientovaným). Bezpečnost byla od začátku brána vážně: hashování hesel, JWT tokeny, auditní logování a role‑based přístup (student / učitel / administrátor).

Rozsah a priority si autor definoval sám — neexistovalo žádné formální zadání. To na jednu stranu znamenalo svobodu ve volbě technologií a funkcí, na druhou nutnost si sám určovat, co je „hotovo" a co ještě stojí za doladění.

---

## 3. Použité technologie

**Frontend a framework:** Projekt je postaven na **Next.js 16** s App Routerem a **Reactu 19**, psaný kompletně v **TypeScriptu**. Next.js byl zvolen proto, že kombinuje serverový rendering, file‑based routing a API routes v jednom frameworku, takže není potřeba řešit oddělený backend pro běžné endpointy. TypeScript zajišťuje typovou bezpečnost napříč celou aplikací — od databázového modelu (díky Prismě) až po React komponenty.

**Styling a animace:** O vzhled se stará **Tailwind CSS 4** (utility‑first přístup, který umožňuje rychlou iteraci bez psaní vlastních CSS souborů), animace řeší **Framer Motion** a **React Spring** (fyzikálně založené animace pro hero sekce a přechody). Ikony pocházejí z knihovny **Lucide React**. Volba těchto nástrojů byla praktická — autor s nimi už delší dobu pracuje a jsou to de‑facto standardy v moderním React ekosystému.

**Datová vrstva a autentizace:** Databáze běží na **PostgreSQL**, přístup k ní zajišťuje ORM **Prisma 6**, které generuje typově bezpečného klienta přímo z definice schématu. Autentizace je řešena vlastní implementací nad knihovnou **Jose** (JWT access a refresh tokeny) a **bcryptjs** (hashování hesel). Validace vstupů probíhá přes **Zod**. Schéma počítá i s navázáním účtu přes Microsoft OAuth (školní účty `@sps-mot.dopravni.cz`), i když plné napojení zůstává rozpracované.

**Integrace:** Aplikace obsahuje klientskou vrstvu pro **Bakaláři API v3** a strukturu API routes pro získávání rozvrhu, známek, úkolů a zpráv. V aktuálním stavu jde o testovací/ukázkové rozhraní — reálné napojení na produkční Bakaláři nebylo v plánu projektu a zůstává spíš jako demonstrace architektury integrační vrstvy.

---

## 4. Architektura a fungování

Aplikace je **monolitická Next.js aplikace** organizovaná podle principu feature‑based structure: veškerý kód související s jednou funkcionalitou (autentizace, Bakaláři, dashboard) žije pohromadě napříč vrstvami. Adresář `src/app/` obsahuje jak veřejné stránky (homepage, curriculum, projects, login), tak API endpointy v `src/app/api/`. Znovupoužitelné React komponenty jsou v `src/components/` rozdělené podle funkce (`auth/`, `dashboard/`, `sections/`, `ui/`). Business logika, integrace a utility sedí v `src/lib/` (`auth/`, `bakalari/`, `db/`, `search/`, `theme/`). Globální stav (přihlášený uživatel, jazyk, téma, command palette, vyhledávání) je řešen přes React Context providers v `src/contexts/`.

**Datový tok při přihlášení:** Uživatel zadá e‑mail/uživatelské jméno a heslo na stránce `/login`. Formulář volá endpoint `POST /api/auth/login`, který přes Prismu najde uživatele v PostgreSQL, ověří hash hesla pomocí bcryptu, vygeneruje dvojici JWT tokenů (`access` a `refresh`) pomocí knihovny Jose, vytvoří záznam v tabulce `Session`, zapíše událost do tabulky `AuditLog` a tokeny vrátí v HTTP‑only cookies. Frontendový `AuthContext` pak drží informaci o přihlášeném uživateli a řídí přístup do chráněných částí (`/dashboard/*`). Role uživatele (STUDENT / TEACHER / ADMIN) určuje, které sekce dashboardu se zobrazí.

**Datový tok pro Bakaláři:** Po přihlášení si uživatel může v dashboardu propojit Bakaláři účet — zadané údaje se zašifrovaně uloží k jeho profilu. API routes v `src/app/api/bakalari/` pak přes klienta v `src/lib/bakalari/bakalari-client.ts` volají Bakaláři API v3, stahují rozvrh, známky nebo úkoly a vrací je frontendové části dashboardu. Díky tomu, že frontend nikdy nemluví s Bakaláři přímo, lze snadno přidat cachování, audit, nebo tokeny rotovat na jednom místě.

**Databázové schéma:** Čtyři hlavní entity — `User` (včetně Microsoft OAuth polí a zašifrovaných Bakaláři credentials), `Session` (aktivní JWT relace s metadaty o zařízení a IP), `AuditLog` (bezpečnostní a přístupové události s typovaným enumem akcí) a `PasswordResetToken` (pro budoucí obnovu hesla e‑mailem).

---

## 5. Klíčové funkce

**Veřejná prezentace oboru.** Homepage nabízí dva vizuální režimy — moderní (animovaný hero s particle efekty, časová osa studijního programu, call‑to‑action s plynulými přechody) a klasický (textově orientovaná verze pro uživatele, kteří preferují střídmější design). Mezi režimy lze přepínat za běhu, volba se uloží do preferencí uživatele. Součástí jsou stránky **Curriculum** (přehled předmětů a ročníků), **Projects** (studentské projekty), **About**, **Privacy** a **Terms**.

**Autentizační systém.** Vlastní implementace přihlašování e‑mailem nebo uživatelským jménem s bcrypt hashováním hesel, JWT tokeny (access + refresh), session managementem v databázi a auditním logováním všech přihlašovacích pokusů, změn hesla i podezřelých aktivit. Schéma je připraveno i na **Microsoft OAuth** přes školní účty a dvoufaktorovou autentizaci (2FA pole jsou už v databázi). Účty mají tři role — student, učitel, administrátor — s rozdílným přístupem do dashboardu.

**Dashboard.** Po přihlášení se uživatel dostane do dashboardu s postranní navigací a sekcemi pro **rozvrh**, **známky**, **profil**, **komunikaci**, propojení s **Moodle** a **Bakaláři**. Většina sekcí je buď plně funkční (profil, připojení Bakaláři), nebo obsahuje komponentu „Coming Soon" jako ukázku plánovaného rozsahu. Dashboard podporuje **command palette** (rychlé vyhledávání a navigaci klávesovou zkratkou) a globální **search** napříč obsahem webu.

**Vícejazyčnost a tématizace.** Aplikace je přeložena do **pěti jazyků** (CS, EN, SK, RU, UK) přes vlastní `LanguageContext`. Kombinace vizuálního tématu (modern/classic) a světlého/tmavého režimu dává čtyři varianty vzhledu; všechny jsou udržovány tak, aby se uživatel mohl volně přepínat bez ztráty kontextu.

**Bezpečnostní prvky.** Kromě hashování a JWT aplikace počítá a částečně implementuje: uzamykání účtu po neúspěšných pokusech (`failedLoginAttempts`, `lockedUntil`), vynucení změny hesla (`mustChangePassword`), šifrování Bakaláři credentials před uložením, HTTP‑only cookies pro tokeny a kompletní auditní log přes enum `AuditAction` pokrývající přihlášení, změny účtu, čtení/zápis dat i bezpečnostní události.

---

## 6. Postup vývoje

Projekt jsem začal v **říjnu 2025** jako sólo práci — bez zadání, bez deadline, s cílem postavit něco, co bych mohl ukázat na Dni otevřených dveří a později na veletrhu studentských projektů. První commity ze začátku října byly inicializace Next.js aplikace s TypeScriptem a Tailwindem a první verze veřejné prezentace.

**První fáze (říjen 2025) — veřejná část a design.** Začal jsem stavět landing page: hero sekce, navigační bar (který se postupně vyvinul do „Dynamic Island" stylu s plynulými přechody a burger menu pro mobily), `ProgramTimeline` s přehledem ročníků, call‑to‑action sekce. V této fázi vznikly i stránky **Privacy**, **Terms**, **Projects** a **About**. Zároveň jsem přidal lokalizaci do pěti jazyků — nejpracnější na tom nebylo technické řešení, ale získání a udržení konzistentních překladů.

**Druhá fáze — dual‑theme a refaktoring.** Chtěl jsem nabídnout dvě vizuální varianty (modern/classic) místo pouhého light/dark přepínače. To se ukázalo jako největší designový oříšek celého projektu: udržet dvě paralelní verze všech hlavních sekcí konzistentní, přepínat mezi nimi za běhu bez blikání a zároveň nenarušit lokalizaci ani přístupnost. Nakonec jsem to vyřešil oddělenými komponentami pro každé téma (`ModernHero` / `ClassicHero`, `ProgramTimeline` / `ClassicProgramTimeline` atd.), které si sdílí jen data a překlady, a volbou v `PreferencesContext`. V téhle fázi proběhl i refoldering celého repa z podadresáře `web/` do rootu.

**Třetí fáze — autentizace a databáze.** Přidal jsem PostgreSQL, navrhl schéma v Prismě (uživatelé, sessions, auditní log, reset tokeny), napsal vlastní JWT vrstvu nad knihovnou Jose a propojil ji s frontendovým `AuthContext`. Tady vznikly i přihlašovací API routes, seed skript pro testovací účty a struktura pro Microsoft OAuth (plně napojit na školní účty už jsem ale v rámci tohoto projektu neplánoval).

**Čtvrtá fáze — dashboard a Bakaláři.** Postavil jsem layout dashboardu s postranní navigací, stránky pro rozvrh, známky, úkoly, komunikaci, docházku a platby, a naprogramoval jsem klienta pro Bakaláři API v3 včetně API routes. Reálné napojení na produkční Bakaláři server ale **není v plánu** — integrace zůstává jako demonstrace architektury a testovací rozhraní pro administrátora.

**Pátá fáze (listopad–prosinec 2025) — příprava nasazení a úklid.** Přidal jsem konfiguraci pro Vercel, refaktoring autentizace a bezpečnostních nastavení, aktualizace závislostí a ladění Next.js konfigurace (Turbopack, Webpack). Nasazené to ale zatím není — projekt běží lokálně a rozhodnutí o případném zveřejnění je otevřené.

Co se volby stacku týče: **Next.js, React a Tailwind** používám už delší dobu a jsem s nimi spokojený, takže tady žádné velké překvapení nepřišlo. **Prisma** byla pro mě novější zkušenost, ale její vygenerovaný typovaný klient výborně zapadl do TypeScriptového zbytku projektu. Největším reálným problémem nebyl žádný konkrétní framework, ale právě udržení dvou kompletních vizuálních verzí vedle sebe — což jsem nakonec vyřešil spíš disciplínou než nějakým elegantním abstraktním řešením.

---

## 7. Výsledek a využití

Výsledkem je **funkční prototyp** oborového webu pro IT obor SPŠD Motol: běží lokálně, má kompletní veřejnou prezentaci oboru v pěti jazycích a dvou vizuálních stylech, funkční přihlášení s testovacími účty a dashboard s rozpracovanou integrací Bakaláři. Projekt **není v současné době veřejně nasazen** ani ho nikdo mimo autora zatím aktivně nevyužívá, i když do budoucna se s reálným nasazením počítá.

Primární přínos je v tuhle chvíli **prezentační a ukázkový** — projekt slouží jako demonstrace toho, co student třetího ročníku IT oboru zvládne postavit sám od nuly: plnohodnotnou full‑stack aplikaci s moderním frontendem, vlastní autentizační vrstvou, typovanou databázovou vrstvou, vícejazyčností a propracovaným UI. V tomhle smyslu je projekt sám sobě zároveň obsahem i formou — obor IT prezentuje právě tím, že je sám produktem toho, co se na oboru učí.

Sekundárním přínosem je, že se projektem vytvořil solidní základ, na kterém lze dál stavět — ať už jako školní portál spravovaný studenty, podklad pro maturitní práci, nebo portfolio.

---

## 8. Možná budoucí vylepšení

Nejpřirozenější pokračování je **reálné nasazení** (Vercel, doména) a napojení **Microsoft OAuth** na školní účty `@sps-mot.dopravni.cz`, aby se studenti mohli přihlašovat bez zakládání samostatných hesel. S tím souvisí i dokončení **refresh token flow**, endpointu pro odhlášení a celého password reset procesu přes e‑mail (tabulka v databázi už na to čeká).

Dashboard by si zasloužil **naplnit obsahem** sekce, které jsou zatím „Coming Soon": plnohodnotná správa profilu, zobrazení rozvrhu a známek (ať už z Bakaláři, nebo z vlastní databáze), napojení na Moodle, interní komunikace mezi studenty a učiteli. Zajímavým směrem by bylo přidat **sekci pro studentské projekty**, kde by si studenti mohli sami publikovat, na čem dělají — to by z webu udělalo skutečně živou, studenty spravovanou platformu, kterou školní web není.

Z čistě technických vylepšení by dávala smysl **cachovací vrstva** (Redis) před Bakaláři integrací, **testy** (zatím projekt testy nemá), vylepšení přístupnosti, a případně **PWA** režim pro mobilní použití. Dlouhodobě by se dal projekt rozšířit i o **administrátorský panel** pro správu obsahu, uživatelů a auditních logů bez nutnosti sahat do databáze přímo.
