import type { Service } from '@/types';

/**
 * SAA-C03-only ANALYTICS services (level 'saa', exams ['saa']).
 * Added by Claude in the SAA gap-fill batch 1 (2026-08-13).
 * Append new SAA analytics services here; claimed via AGENTS.md Status Log.
 */
export const saaAnalyticsServices: Service[] = [
  {
    id: 'opensearch',
    abbreviation: 'OpenSearch',
    fullName: 'Amazon OpenSearch Service',
    category: 'analytics',
    level: 'saa',
    exams: ['saa'],
    difficulty: 2,
    examFrequency: 'medium',
    description: {
      en: 'Managed search and log-analytics engine (successor to Amazon Elasticsearch Service): full-text and fuzzy search over indexed data, plus OpenSearch Dashboards for visualization.',
      ro: 'Motor gestionat de căutare și analiză de loguri (succesorul Amazon Elasticsearch Service): căutare full-text și fuzzy peste date indexate, plus OpenSearch Dashboards pentru vizualizare.',
    },
    analogy: {
      en: 'The index at the back of a huge book collection: instead of reading every page (scanning every record), you look up any word and jump straight to every place it appears — even with typos.',
      ro: 'Indexul de la finalul unei colecții uriașe de cărți: în loc să citești fiecare pagină (să scanezi fiecare înregistrare), cauți orice cuvânt și sari direct la toate locurile unde apare — chiar și cu greșeli de tipar.',
    },
    examTips: [
      {
        key: 'full-text',
        content: {
          en: 'Trigger phrase: "full-text search", "fuzzy/partial match search", "search across fields" → OpenSearch. DynamoDB and RDS LIKE-queries are the trap answers.',
          ro: 'Formulare-declanșator: „căutare full-text", „căutare fuzzy/parțială", „căutare pe mai multe câmpuri" → OpenSearch. DynamoDB și interogările LIKE din RDS sunt răspunsurile-capcană.',
        },
      },
      {
        key: 'ddb-pattern',
        content: {
          en: 'Classic exam pattern: DynamoDB (source of truth) → DynamoDB Streams → Lambda → OpenSearch (search index). Search the index, read the item from the table.',
          ro: 'Pattern clasic de examen: DynamoDB (sursa de adevăr) → DynamoDB Streams → Lambda → OpenSearch (index de căutare). Cauți în index, citești itemul din tabelă.',
        },
      },
    ],
    pricing: {
      en: 'Per instance-hour (data + master nodes) + EBS storage; UltraWarm/cold tiers cut costs for older log data. OpenSearch Serverless bills per OCU.',
      ro: 'Per instanță-oră (noduri de date + master) + stocare EBS; tier-ele UltraWarm/cold reduc costurile pentru loguri vechi. OpenSearch Serverless facturează per OCU.',
    },
    connections: ['dynamodb', 'kinesis', 'cloudwatch', 'lambda', 's3'],
    docsUrl: 'https://docs.aws.amazon.com/opensearch-service/latest/developerguide/what-is.html',
    visual: { color: 'hsl(170, 80%, 45%)', icon: 'activity' },
    examDomains: ['design-performant'],
    howItWorks: [
      { en: 'You create a domain (cluster) with data nodes — or use OpenSearch Serverless for spiky workloads.', ro: 'Creezi un domain (cluster) cu noduri de date — sau folosești OpenSearch Serverless pentru workload-uri cu vârfuri.' },
      { en: 'Data is ingested from Kinesis Data Firehose, CloudWatch Logs, or Lambda and stored as JSON documents in indexes.', ro: 'Datele sunt ingerate din Kinesis Data Firehose, CloudWatch Logs sau Lambda și stocate ca documente JSON în indexuri.' },
      { en: 'Queries (full-text, fuzzy, aggregations) run against the inverted index — fast even across millions of documents.', ro: 'Interogările (full-text, fuzzy, agregări) rulează pe indexul inversat — rapid chiar și peste milioane de documente.' },
      { en: 'OpenSearch Dashboards visualizes the results (the "K" of the old ELK stack).', ro: 'OpenSearch Dashboards vizualizează rezultatele („K"-ul din vechiul stack ELK).' },
    ],
    keyFacts: [
      { en: 'Two jobs on the exam: (1) full-text/fuzzy SEARCH, (2) log analytics with dashboards.', ro: 'Două roluri la examen: (1) CĂUTARE full-text/fuzzy, (2) analiză de loguri cu dashboard-uri.' },
      { en: 'Not a primary database — pair it with a durable source of truth (DynamoDB, S3, RDS).', ro: 'Nu e bază de date primară — o cuplezi cu o sursă de adevăr durabilă (DynamoDB, S3, RDS).' },
      { en: 'Ingestion partners: Kinesis Data Firehose, CloudWatch Logs subscription filters, Lambda.', ro: 'Parteneri de ingest: Kinesis Data Firehose, subscription filters din CloudWatch Logs, Lambda.' },
      { en: 'Multi-AZ with dedicated master nodes = the production HA setup.', ro: 'Multi-AZ cu noduri master dedicate = configurația de producție pentru HA.' },
      { en: 'Storage tiers: hot (EBS) → UltraWarm (S3-backed) → cold — big cost lever for log retention.', ro: 'Tier-e de stocare: hot (EBS) → UltraWarm (pe S3) → cold — pârghie mare de cost pentru retenția logurilor.' },
    ],
    whenToUse: [
      { en: 'Product/catalog search with typo tolerance, relevance ranking, and filters.', ro: 'Căutare de produse/catalog cu toleranță la typo-uri, ranking de relevanță și filtre.' },
      { en: 'Centralized log analytics: application + VPC Flow + CloudTrail logs, visualized in dashboards.', ro: 'Analiză centralizată de loguri: loguri de aplicație + VPC Flow + CloudTrail, vizualizate în dashboard-uri.' },
      { en: 'Adding search capability on top of DynamoDB via Streams + Lambda indexing.', ro: 'Adăugarea capacității de căutare peste DynamoDB via indexare cu Streams + Lambda.' },
    ],
    whenNotToUse: [
      { en: 'Ad-hoc SQL over files already sitting in S3 → Athena (serverless, per-query pricing).', ro: 'SQL ad-hoc peste fișiere aflate deja în S3 → Athena (serverless, plată per interogare).' },
      { en: 'Data warehouse / BI over structured data at petabyte scale → Redshift.', ro: 'Data warehouse / BI peste date structurate la scară de petabytes → Redshift.' },
      { en: 'Primary transactional storage — OpenSearch is an index, not a system of record.', ro: 'Stocare tranzacțională primară — OpenSearch e un index, nu un system of record.' },
    ],
    examTraps: [
      { en: 'DynamoDB cannot do full-text search — if the scenario wants search over item text, the answer adds OpenSearch (fed by Streams), not a GSI.', ro: 'DynamoDB nu poate face căutare full-text — dacă scenariul vrea căutare în textul itemilor, răspunsul adaugă OpenSearch (alimentat din Streams), nu un GSI.' },
      { en: 'Athena vs OpenSearch: Athena = occasional SQL on S3 data (no infrastructure); OpenSearch = interactive search/dashboards on continuously indexed data.', ro: 'Athena vs OpenSearch: Athena = SQL ocazional pe date din S3 (fără infrastructură); OpenSearch = căutare interactivă/dashboard-uri pe date indexate continuu.' },
      { en: '"ELK stack on AWS" = OpenSearch (Elasticsearch) + OpenSearch Dashboards (Kibana); ingestion via Firehose or CloudWatch Logs.', ro: '„Stack ELK pe AWS" = OpenSearch (Elasticsearch) + OpenSearch Dashboards (Kibana); ingest prin Firehose sau CloudWatch Logs.' },
    ],
    keyNumbers: [
      { label: { en: 'Production HA setup', ro: 'Configurație HA de producție' }, value: { en: '3 dedicated masters + Multi-AZ data nodes', ro: '3 mastere dedicate + noduri de date Multi-AZ' } },
      { label: { en: 'Cost tiers for logs', ro: 'Tier-e de cost pentru loguri' }, value: { en: 'hot → UltraWarm → cold', ro: 'hot → UltraWarm → cold' } },
    ],
    retrievalQuestions: [
      {
        q: { en: 'Users must search products by partial, misspelled names stored in DynamoDB. What is the architecture?', ro: 'Utilizatorii trebuie să caute produse după nume parțiale, scrise greșit, stocate în DynamoDB. Care e arhitectura?' },
        a: { en: 'Keep DynamoDB as the source of truth; stream changes via DynamoDB Streams to Lambda, which indexes them into OpenSearch; the app searches OpenSearch.', ro: 'Păstrezi DynamoDB ca sursă de adevăr; trimiți modificările prin DynamoDB Streams către Lambda, care le indexează în OpenSearch; aplicația caută în OpenSearch.' },
      },
      {
        q: { en: 'When is Athena the better answer than OpenSearch for analyzing logs?', ro: 'Când e Athena răspunsul mai bun decât OpenSearch pentru analiza logurilor?' },
        a: { en: 'When logs already live in S3 and queries are occasional/ad-hoc SQL — Athena needs no cluster and bills per query. OpenSearch wins for continuous, interactive dashboards.', ro: 'Când logurile stau deja în S3 și interogările sunt SQL ocazional/ad-hoc — Athena nu cere cluster și facturează per interogare. OpenSearch câștigă la dashboard-uri continue, interactive.' },
      },
    ],
    mermaidDiagram: {
      code: 'flowchart LR; DDB[(DynamoDB)] --> STR[DynamoDB Streams]; STR --> LAM[Lambda]; LAM --> OS{{OpenSearch index}}; CW[CloudWatch Logs] --> FH[Kinesis Firehose]; FH --> OS; OS --> DASH[OpenSearch Dashboards]; APP[App search query] --> OS',
      caption: { en: 'Two canonical feeds: DynamoDB Streams for search, Firehose/CloudWatch Logs for log analytics.', ro: 'Două fluxuri canonice: DynamoDB Streams pentru căutare, Firehose/CloudWatch Logs pentru analiza logurilor.' },
    },
  },
  {
    id: 'msk',
    abbreviation: 'MSK',
    fullName: 'Amazon Managed Streaming for Apache Kafka',
    category: 'analytics',
    level: 'saa',
    exams: ['saa'],
    difficulty: 3,
    examFrequency: 'medium',
    description: {
      en: 'Fully managed Apache Kafka: AWS runs the brokers and ZooKeeper/KRaft, you keep the standard Kafka APIs — the migration path for existing Kafka applications.',
      ro: 'Apache Kafka complet gestionat: AWS rulează brokerii și ZooKeeper/KRaft, tu păstrezi API-urile Kafka standard — calea de migrare pentru aplicațiile Kafka existente.',
    },
    analogy: {
      en: 'Moving your band’s rehearsals to a rented studio: same instruments and songs (Kafka APIs and code), but someone else maintains the room, power, and soundproofing (brokers, patching, HA).',
      ro: 'Muți repetițiile trupei într-un studio închiriat: aceleași instrumente și piese (API-urile și codul Kafka), dar altcineva întreține sala, curentul și izolația fonică (brokerii, patching-ul, HA).',
    },
    examTips: [
      {
        key: 'kafka-keyword',
        content: {
          en: 'Trigger phrase: "existing Apache Kafka application/ecosystem" or "Kafka APIs required" → MSK. New AWS-native streaming with no Kafka requirement → Kinesis Data Streams.',
          ro: 'Formulare-declanșator: „aplicație/ecosistem Apache Kafka existent" sau „sunt necesare API-uri Kafka" → MSK. Streaming nou nativ AWS fără cerință Kafka → Kinesis Data Streams.',
        },
      },
      {
        key: 'serverless',
        content: {
          en: 'MSK Serverless exists for unpredictable/spiky throughput — no broker capacity planning. Provisioned MSK = you size the brokers.',
          ro: 'MSK Serverless există pentru debit imprevizibil/cu vârfuri — fără planificarea capacității brokerilor. MSK provisioned = tu dimensionezi brokerii.',
        },
      },
    ],
    pricing: {
      en: 'Provisioned: per broker-hour + storage. Serverless: per cluster-hour + per GB in/out. Kafka itself is open-source (no license fee).',
      ro: 'Provisioned: per broker-oră + stocare. Serverless: per cluster-oră + per GB in/out. Kafka în sine e open-source (fără licență).',
    },
    connections: ['kinesis', 'lambda', 'glue', 'ec2', 'vpc'],
    docsUrl: 'https://docs.aws.amazon.com/msk/latest/developerguide/what-is-msk.html',
    visual: { color: 'hsl(170, 80%, 45%)', icon: 'send' },
    examDomains: ['design-performant', 'design-resilient'],
    howItWorks: [
      { en: 'AWS provisions Kafka brokers across multiple AZs in your VPC and manages patching, metrics, and broker recovery.', ro: 'AWS provizionează brokeri Kafka în mai multe AZ-uri în VPC-ul tău și gestionează patching-ul, metricile și recuperarea brokerilor.' },
      { en: 'Producers publish records to topics, split into partitions replicated across brokers.', ro: 'Producătorii publică înregistrări în topicuri, împărțite în partiții replicate între brokeri.' },
      { en: 'Consumers (apps, Lambda, Kinesis Data Analytics/Flink, Glue) read the partitions in order.', ro: 'Consumatorii (aplicații, Lambda, Kinesis Data Analytics/Flink, Glue) citesc partițiile în ordine.' },
      { en: 'Data is retained on broker storage for a configurable period (or indefinitely with tiered storage).', ro: 'Datele sunt reținute pe stocarea brokerilor pentru o perioadă configurabilă (sau nelimitat cu tiered storage).' },
    ],
    keyFacts: [
      { en: 'Full Kafka API compatibility — existing producers/consumers work unchanged.', ro: 'Compatibilitate completă cu API-urile Kafka — producătorii/consumatorii existenți funcționează neschimbați.' },
      { en: 'Brokers spread across up to 3 AZs with replication = built-in HA.', ro: 'Brokeri distribuiți în până la 3 AZ-uri cu replicare = HA integrat.' },
      { en: 'Ordering is guaranteed WITHIN a partition (same as Kinesis shards).', ro: 'Ordinea e garantată ÎN CADRUL unei partiții (la fel ca shard-urile Kinesis).' },
      { en: 'MSK Serverless removes capacity planning for spiky workloads.', ro: 'MSK Serverless elimină planificarea capacității pentru workload-uri cu vârfuri.' },
      { en: 'Encryption in transit (TLS) and at rest (KMS); auth via IAM, SASL/SCRAM, or mTLS.', ro: 'Criptare în tranzit (TLS) și la repaus (KMS); autentificare via IAM, SASL/SCRAM sau mTLS.' },
    ],
    whenToUse: [
      { en: 'Lift-and-shift of an on-premises Kafka cluster without rewriting producers/consumers.', ro: 'Lift-and-shift al unui cluster Kafka on-premises fără rescrierea producătorilor/consumatorilor.' },
      { en: 'The team depends on the Kafka ecosystem: Kafka Connect, Kafka Streams, Schema Registry, exactly-once semantics.', ro: 'Echipa depinde de ecosistemul Kafka: Kafka Connect, Kafka Streams, Schema Registry, semantici exactly-once.' },
      { en: 'High-throughput event streaming with long/custom retention and replay.', ro: 'Streaming de evenimente cu debit mare, retenție lungă/personalizată și replay.' },
    ],
    whenNotToUse: [
      { en: 'New AWS-native streaming with no Kafka dependency → Kinesis Data Streams (simpler, tighter AWS integration).', ro: 'Streaming nou nativ AWS fără dependență de Kafka → Kinesis Data Streams (mai simplu, integrare AWS mai strânsă).' },
      { en: 'Just load streaming data into S3/Redshift/OpenSearch → Kinesis Data Firehose (zero administration).', ro: 'Doar încarci date de streaming în S3/Redshift/OpenSearch → Kinesis Data Firehose (zero administrare).' },
      { en: 'Simple app-to-app decoupling → SQS/SNS, not a streaming platform.', ro: 'Decuplare simplă aplicație-la-aplicație → SQS/SNS, nu o platformă de streaming.' },
    ],
    examTraps: [
      { en: 'MSK vs Kinesis Data Streams: the deciding keyword is "Kafka". Existing Kafka apps → MSK; otherwise Kinesis is usually the AWS-native answer.', ro: 'MSK vs Kinesis Data Streams: cuvântul decisiv e „Kafka". Aplicații Kafka existente → MSK; altfel Kinesis e de obicei răspunsul nativ AWS.' },
      { en: 'Kafka/MSK is a streaming LOG with replay — not a queue. "Each message processed once then deleted" describes SQS.', ro: 'Kafka/MSK e un LOG de streaming cu replay — nu o coadă. „Fiecare mesaj procesat o dată apoi șters" descrie SQS.' },
      { en: 'MSK lives in your VPC — consumers outside need VPC connectivity (peering/TGW/PrivateLink), an easy architecture-question detail.', ro: 'MSK trăiește în VPC-ul tău — consumatorii din afară au nevoie de conectivitate VPC (peering/TGW/PrivateLink), un detaliu ușor de întrebat la arhitectură.' },
    ],
    keyNumbers: [
      { label: { en: 'AZs for broker HA', ro: 'AZ-uri pentru HA brokeri' }, value: { en: 'up to 3', ro: 'până la 3' } },
      { label: { en: 'Ordering guarantee scope', ro: 'Domeniul garanției de ordine' }, value: { en: 'per partition', ro: 'per partiție' } },
    ],
    retrievalQuestions: [
      {
        q: { en: 'A company migrates an on-premises Kafka pipeline to AWS with minimal changes. MSK or Kinesis, and why?', ro: 'O companie migrează un pipeline Kafka on-premises în AWS cu modificări minime. MSK sau Kinesis, și de ce?' },
        a: { en: 'MSK — it keeps full Kafka API compatibility, so producers, consumers, and Kafka Connect jobs move unchanged. Kinesis would require rewriting them against AWS APIs.', ro: 'MSK — păstrează compatibilitatea completă cu API-urile Kafka, deci producătorii, consumatorii și job-urile Kafka Connect se mută neschimbate. Kinesis ar cere rescrierea lor pe API-urile AWS.' },
      },
      {
        q: { en: 'How does MSK achieve high availability?', ro: 'Cum obține MSK disponibilitate ridicată?' },
        a: { en: 'Brokers are distributed across up to 3 AZs with partition replication between them; AWS automatically detects and replaces unhealthy brokers.', ro: 'Brokerii sunt distribuiți în până la 3 AZ-uri cu replicarea partițiilor între ei; AWS detectează și înlocuiește automat brokerii nesănătoși.' },
      },
    ],
    mermaidDiagram: {
      code: 'flowchart LR; P1[Producers] --> T{{Kafka topic partitions}}; subgraph MSK cluster multi-AZ; T; end; T --> C1[Consumer apps]; T --> C2[Lambda]; T --> C3[Flink / Glue]',
      caption: { en: 'Producers write to replicated topic partitions; multiple consumer types read the stream independently.', ro: 'Producătorii scriu în partiții de topic replicate; mai multe tipuri de consumatori citesc stream-ul independent.' },
    },
  },
];
