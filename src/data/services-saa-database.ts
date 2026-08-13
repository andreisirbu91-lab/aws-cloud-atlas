import type { Service } from '@/types';

/**
 * SAA-C03-only DATABASE services (level 'saa', exams ['saa']).
 * Added by Claude in the SAA gap-fill batch 1 (2026-08-13).
 * Append new SAA database services here; claimed via AGENTS.md Status Log.
 */
export const saaDatabaseServices: Service[] = [
  {
    id: 'rdsproxy',
    abbreviation: 'RDS Proxy',
    fullName: 'Amazon RDS Proxy',
    category: 'database',
    level: 'saa',
    exams: ['saa'],
    difficulty: 2,
    examFrequency: 'high',
    description: {
      en: 'A fully managed database proxy that pools and shares connections to RDS/Aurora, protecting the database from connection storms and cutting failover time — essential in front of Lambda.',
      ro: 'Un proxy de bază de date complet gestionat care pune în pool și partajează conexiunile către RDS/Aurora, protejând baza de date de avalanșe de conexiuni și scurtând timpul de failover — esențial în fața Lambda.',
    },
    analogy: {
      en: 'A maître d’ at a busy restaurant: instead of 1,000 guests each demanding their own table (connection), the maître d’ seats them efficiently at shared tables and keeps the kitchen from being overwhelmed.',
      ro: 'Un maître d’ la un restaurant aglomerat: în loc ca 1.000 de clienți să ceară fiecare masa lui (conexiunea lui), maître d’-ul îi așază eficient la mese comune și ferește bucătăria de supraîncărcare.',
    },
    examTips: [
      {
        key: 'lambda',
        content: {
          en: 'Trigger phrase: "Lambda functions exhaust database connections" or "too many connections errors" → RDS Proxy. It is THE canonical fix.',
          ro: 'Formulare-declanșator: „funcțiile Lambda epuizează conexiunile bazei de date" sau „erori too many connections" → RDS Proxy. E rezolvarea canonică.',
        },
      },
      {
        key: 'failover',
        content: {
          en: 'Second trigger: "reduce failover time" — the proxy holds client connections open during a Multi-AZ failover and reconnects them, up to 66% faster.',
          ro: 'Al doilea declanșator: „redu timpul de failover" — proxy-ul ține conexiunile clienților deschise în timpul unui failover Multi-AZ și le reconectează, cu până la 66% mai rapid.',
        },
      },
    ],
    pricing: {
      en: 'Per vCPU-hour of the underlying database instance. No charge for the pooled connections themselves.',
      ro: 'Per vCPU-oră a instanței de bază de date de dedesubt. Fără cost pentru conexiunile din pool în sine.',
    },
    connections: ['rds', 'aurora', 'lambda', 'secretsmanager', 'iam'],
    docsUrl: 'https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html',
    visual: { color: 'hsl(280, 75%, 60%)', icon: 'database' },
    examDomains: ['design-resilient', 'design-performant'],
    howItWorks: [
      { en: 'You create the proxy in front of an RDS or Aurora database; apps connect to the proxy endpoint instead of the DB endpoint.', ro: 'Creezi proxy-ul în fața unei baze RDS sau Aurora; aplicațiile se conectează la endpoint-ul proxy-ului în loc de endpoint-ul DB-ului.' },
      { en: 'The proxy maintains a warm pool of database connections and multiplexes many client connections onto few DB connections.', ro: 'Proxy-ul menține un pool cald de conexiuni la baza de date și multiplexează multe conexiuni de client pe puține conexiuni DB.' },
      { en: 'Database credentials live in Secrets Manager; the proxy can also enforce IAM authentication.', ro: 'Credențialele bazei de date stau în Secrets Manager; proxy-ul poate impune și autentificare IAM.' },
      { en: 'On failover, the proxy keeps client connections alive and routes them to the new primary automatically.', ro: 'La failover, proxy-ul ține conexiunile clienților în viață și le direcționează automat către noul primary.' },
    ],
    keyFacts: [
      { en: 'Connection pooling/multiplexing — absorbs connection storms from serverless (Lambda) apps.', ro: 'Pooling/multiplexare de conexiuni — absoarbe avalanșele de conexiuni din aplicațiile serverless (Lambda).' },
      { en: 'Cuts Multi-AZ failover time by up to 66% by preserving client connections.', ro: 'Reduce timpul de failover Multi-AZ cu până la 66% păstrând conexiunile clienților.' },
      { en: 'Integrates with Secrets Manager (credentials) and can require IAM auth end-to-end.', ro: 'Se integrează cu Secrets Manager (credențiale) și poate impune autentificare IAM cap-la-cap.' },
      { en: 'Never publicly accessible — it lives in your VPC only.', ro: 'Niciodată accesibil public — trăiește doar în VPC-ul tău.' },
      { en: 'Works with RDS (MySQL, PostgreSQL, MariaDB, SQL Server) and Aurora.', ro: 'Funcționează cu RDS (MySQL, PostgreSQL, MariaDB, SQL Server) și Aurora.' },
    ],
    whenToUse: [
      { en: 'Lambda (or any spiky serverless workload) talks to RDS/Aurora — pool the connections.', ro: 'Lambda (sau orice workload serverless cu vârfuri) vorbește cu RDS/Aurora — pui conexiunile în pool.' },
      { en: 'Applications that open/close many short-lived connections (per-request connections).', ro: 'Aplicații care deschid/închid multe conexiuni de scurtă durată (conexiuni per cerere).' },
      { en: 'You need faster, transparent failover for a Multi-AZ database.', ro: 'Ai nevoie de failover mai rapid și transparent pentru o bază Multi-AZ.' },
    ],
    whenNotToUse: [
      { en: 'The problem is READ latency/throughput → read replicas or ElastiCache, not a proxy.', ro: 'Problema e latența/debitul la CITIRE → read replicas sau ElastiCache, nu un proxy.' },
      { en: 'A few long-lived connections from a steady EC2 fleet — the proxy adds cost with little benefit.', ro: 'Puține conexiuni de lungă durată de la o flotă EC2 stabilă — proxy-ul adaugă cost cu beneficiu mic.' },
    ],
    examTraps: [
      { en: 'RDS Proxy is NOT a cache — it does not speed up queries. "Cache frequent reads" → ElastiCache/DAX; "too many connections" → RDS Proxy.', ro: 'RDS Proxy NU e cache — nu accelerează interogările. „Cache pentru citiri frecvente" → ElastiCache/DAX; „prea multe conexiuni" → RDS Proxy.' },
      { en: 'It cannot be made publicly accessible — clients must be in (or connected to) the VPC.', ro: 'Nu poate fi făcut accesibil public — clienții trebuie să fie în (sau conectați la) VPC.' },
      { en: 'Read replicas scale reads; RDS Proxy scales CONNECTIONS. The exam mixes these two on purpose.', ro: 'Read replicas scalează citirile; RDS Proxy scalează CONEXIUNILE. Examenul le amestecă intenționat.' },
    ],
    keyNumbers: [
      { label: { en: 'Failover time reduction', ro: 'Reducerea timpului de failover' }, value: { en: 'up to 66%', ro: 'până la 66%' } },
      { label: { en: 'Public accessibility', ro: 'Accesibilitate publică' }, value: { en: 'never (VPC-only)', ro: 'niciodată (doar VPC)' } },
    ],
    retrievalQuestions: [
      {
        q: { en: 'A Lambda-based API intermittently fails with "too many connections" on RDS MySQL. What is the fix and why?', ro: 'Un API pe Lambda pică intermitent cu „too many connections" pe RDS MySQL. Care e rezolvarea și de ce?' },
        a: { en: 'Put RDS Proxy between Lambda and the database — it multiplexes the many short-lived Lambda connections onto a small pooled set of real DB connections.', ro: 'Pui RDS Proxy între Lambda și baza de date — multiplexează numeroasele conexiuni scurte ale Lambda pe un set mic de conexiuni DB reale din pool.' },
      },
      {
        q: { en: 'RDS Proxy vs read replica — which problem does each solve?', ro: 'RDS Proxy vs read replica — ce problemă rezolvă fiecare?' },
        a: { en: 'Proxy = too many connections / slow failover (connection management). Read replica = read-heavy traffic that needs more read throughput (query capacity).', ro: 'Proxy = prea multe conexiuni / failover lent (managementul conexiunilor). Read replica = trafic intens de citire care cere mai mult debit la citire (capacitate de interogare).' },
      },
    ],
    mermaidDiagram: {
      code: 'flowchart LR; L1[Lambda] --> P{{RDS Proxy}}; L2[Lambda] --> P; L3[Lambda ×1000] --> P; P -->|few pooled connections| DB[(RDS / Aurora)]; SM[Secrets Manager] -.credentials.-> P',
      caption: { en: 'Thousands of client connections collapse into a small pooled set; credentials come from Secrets Manager.', ro: 'Mii de conexiuni de client se restrâng într-un set mic din pool; credențialele vin din Secrets Manager.' },
    },
  },
  {
    id: 'dax',
    abbreviation: 'DAX',
    fullName: 'DynamoDB Accelerator',
    category: 'database',
    level: 'saa',
    exams: ['saa'],
    difficulty: 2,
    examFrequency: 'high',
    description: {
      en: 'A fully managed, in-memory cache purpose-built for DynamoDB that delivers microsecond read latency and is API-compatible — no application rewrite needed.',
      ro: 'Un cache in-memory complet gestionat, construit special pentru DynamoDB, care oferă latență de citire de microsecunde și e compatibil la nivel de API — fără rescrierea aplicației.',
    },
    analogy: {
      en: 'A barista who keeps the five most-ordered drinks already made on the counter: regulars get served in seconds without the barista brewing (querying the table) each time.',
      ro: 'Un barista care ține cele mai comandate cinci băuturi gata făcute pe tejghea: clienții fideli sunt serviți în secunde, fără ca barista să prepare (interogheze tabela) de fiecare dată.',
    },
    examTips: [
      {
        key: 'drop-in',
        content: {
          en: 'Trigger phrase: "microsecond latency for DynamoDB reads" + "minimal/no code changes" → DAX. If the cache must serve other data stores too → ElastiCache.',
          ro: 'Formulare-declanșator: „latență de microsecunde pentru citiri DynamoDB" + „modificări minime/deloc de cod" → DAX. Dacă cache-ul trebuie să servească și alte surse de date → ElastiCache.',
        },
      },
      {
        key: 'read-heavy',
        content: {
          en: 'DAX helps READ-heavy and read-hot-key workloads. It does nothing for write throughput — writes still go to the table.',
          ro: 'DAX ajută workload-urile intense la CITIRE și cheile fierbinți la citire. Nu face nimic pentru debitul de scriere — scrierile merg tot în tabelă.',
        },
      },
    ],
    pricing: {
      en: 'Per node-hour of the DAX cluster. The savings come from needing far less provisioned read capacity on the table.',
      ro: 'Per nod-oră al clusterului DAX. Economiile vin din faptul că tabela are nevoie de mult mai puțină capacitate de citire provizionată.',
    },
    connections: ['dynamodb', 'vpc', 'ec2'],
    docsUrl: 'https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.html',
    visual: { color: 'hsl(280, 75%, 60%)', icon: 'zap' },
    examDomains: ['design-performant'],
    howItWorks: [
      { en: 'You launch a DAX cluster in your VPC and point the app at it using the DAX SDK client (same API shape as DynamoDB).', ro: 'Pornești un cluster DAX în VPC și îndrepți aplicația spre el folosind clientul DAX din SDK (aceeași formă de API ca DynamoDB).' },
      { en: 'Reads hit the item cache (GetItem) or query cache (Query/Scan) first — cache hits return in microseconds.', ro: 'Citirile lovesc întâi item cache-ul (GetItem) sau query cache-ul (Query/Scan) — hiturile de cache răspund în microsecunde.' },
      { en: 'Cache misses are fetched from DynamoDB, returned, and cached with a TTL (default 5 minutes).', ro: 'Miss-urile de cache sunt aduse din DynamoDB, returnate și puse în cache cu un TTL (implicit 5 minute).' },
      { en: 'Writes go through DAX to the table (write-through), updating the cache on the way.', ro: 'Scrierile trec prin DAX către tabelă (write-through), actualizând cache-ul pe drum.' },
    ],
    keyFacts: [
      { en: 'Microsecond reads (DynamoDB alone = single-digit milliseconds) — up to 10× faster.', ro: 'Citiri în microsecunde (DynamoDB singur = milisecunde cu o cifră) — de până la 10× mai rapid.' },
      { en: 'API-compatible with DynamoDB — swap the client, keep the code.', ro: 'Compatibil la nivel de API cu DynamoDB — schimbi clientul, păstrezi codul.' },
      { en: 'Two caches: item cache (GetItem/BatchGet) and query cache (Query/Scan results).', ro: 'Două cache-uri: item cache (GetItem/BatchGet) și query cache (rezultate Query/Scan).' },
      { en: 'Default item TTL 5 minutes; cluster of up to 11 nodes (1 primary + 10 replicas) in a VPC.', ro: 'TTL implicit pentru itemi 5 minute; cluster de până la 11 noduri (1 primary + 10 replici) într-un VPC.' },
      { en: 'Serves only EVENTUALLY consistent reads — strongly consistent reads bypass the cache.', ro: 'Servește doar citiri EVENTUALLY consistent — citirile strongly consistent ocolesc cache-ul.' },
    ],
    whenToUse: [
      { en: 'Read-heavy DynamoDB workloads needing the fastest possible response (gaming leaderboards, product pages).', ro: 'Workload-uri DynamoDB intense la citire care cer răspuns cât mai rapid (clasamente de gaming, pagini de produs).' },
      { en: 'Hot-key/hot-partition read patterns — the cache absorbs repeated reads of the same items.', ro: 'Tipare de citire cu chei/partiții fierbinți — cache-ul absoarbe citirile repetate ale acelorași itemi.' },
      { en: 'Cutting cost: fewer RCUs provisioned because most reads never reach the table.', ro: 'Reducerea costului: mai puține RCU-uri provizionate pentru că majoritatea citirilor nu mai ajung la tabelă.' },
    ],
    whenNotToUse: [
      { en: 'The app needs strongly consistent reads — DAX cannot serve them from cache.', ro: 'Aplicația are nevoie de citiri strongly consistent — DAX nu le poate servi din cache.' },
      { en: 'Write-heavy workloads — DAX adds no write throughput.', ro: 'Workload-uri intense la scriere — DAX nu adaugă debit de scriere.' },
      { en: 'Caching for RDS, Redis data structures, sessions, or multiple data sources → ElastiCache.', ro: 'Cache pentru RDS, structuri de date Redis, sesiuni sau surse multiple de date → ElastiCache.' },
    ],
    examTraps: [
      { en: 'DAX vs ElastiCache: DAX = DynamoDB-only, drop-in, no code change; ElastiCache = general-purpose cache (needs cache-aside code). "Without modifying application logic" → DAX.', ro: 'DAX vs ElastiCache: DAX = doar DynamoDB, drop-in, fără schimbări de cod; ElastiCache = cache generic (cere cod cache-aside). „Fără modificarea logicii aplicației" → DAX.' },
      { en: 'Strongly consistent reads are passed through to DynamoDB — a scenario requiring strong consistency eliminates DAX as the performance answer.', ro: 'Citirile strongly consistent sunt pasate direct la DynamoDB — un scenariu care cere consistență strictă elimină DAX ca răspuns de performanță.' },
      { en: 'DAX ≠ DynamoDB global tables (multi-Region replication) and ≠ DynamoDB Streams (change events). Three different features.', ro: 'DAX ≠ DynamoDB global tables (replicare multi-regiune) și ≠ DynamoDB Streams (evenimente de modificare). Trei feature-uri diferite.' },
    ],
    keyNumbers: [
      { label: { en: 'Cache-hit read latency', ro: 'Latență citire la cache hit' }, value: { en: 'microseconds', ro: 'microsecunde' } },
      { label: { en: 'Default item cache TTL', ro: 'TTL implicit item cache' }, value: { en: '5 minutes', ro: '5 minute' } },
      { label: { en: 'Max cluster size', ro: 'Dimensiune maximă cluster' }, value: { en: '11 nodes (1 + 10 replicas)', ro: '11 noduri (1 + 10 replici)' } },
    ],
    retrievalQuestions: [
      {
        q: { en: 'When is DAX the answer over ElastiCache for a caching scenario?', ro: 'Când e DAX răspunsul în locul ElastiCache pentru un scenariu de caching?' },
        a: { en: 'When the data store is DynamoDB and the scenario stresses microsecond latency with minimal or no application changes — DAX is API-compatible, so only the client changes.', ro: 'Când sursa de date e DynamoDB și scenariul accentuează latența de microsecunde cu modificări minime sau zero în aplicație — DAX e compatibil la nivel de API, deci se schimbă doar clientul.' },
      },
      {
        q: { en: 'Which two DynamoDB read types does DAX NOT accelerate?', ro: 'Ce tipuri de citiri DynamoDB NU accelerează DAX?' },
        a: { en: 'Strongly consistent reads (passed through to the table) and, by extension, transactional reads — only eventually consistent reads are served from cache.', ro: 'Citirile strongly consistent (pasate direct la tabelă) și, prin extensie, citirile tranzacționale — doar citirile eventually consistent sunt servite din cache.' },
      },
    ],
    mermaidDiagram: {
      code: 'flowchart LR; APP[Application] --> DAX{{DAX cluster}}; DAX -->|cache hit: microseconds| APP; DAX -->|cache miss| DDB[(DynamoDB)]; DDB --> DAX; APP -. strongly consistent read .-> DDB',
      caption: { en: 'Hits return from memory; misses fall through to the table and get cached; strong reads bypass DAX.', ro: 'Hiturile răspund din memorie; miss-urile merg la tabelă și intră în cache; citirile strong ocolesc DAX.' },
    },
  },
];
