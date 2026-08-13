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
  {
    id: 'firehose',
    abbreviation: 'Firehose',
    fullName: 'Amazon Data Firehose',
    category: 'analytics',
    level: 'saa',
    exams: ['saa'],
    difficulty: 2,
    examFrequency: 'high',
    description: {
      en: 'A fully managed, serverless delivery service that loads streaming data into S3, Redshift, OpenSearch, or third-party tools in NEAR real-time — no consumer code, no capacity to manage.',
      ro: 'Un serviciu de livrare complet gestionat, serverless, care încarcă date de streaming în S3, Redshift, OpenSearch sau unelte third-party în timp APROAPE real — fără cod de consumator, fără capacitate de gestionat.',
    },
    analogy: {
      en: 'A conveyor belt that collects packages into a bin and empties the bin into the warehouse every minute (or when full) — you never carry packages by hand, but nothing arrives instantly either.',
      ro: 'O bandă rulantă care adună coletele într-un coș și golește coșul în depozit la fiecare minut (sau când e plin) — nu cari niciodată colete cu mâna, dar nici nu ajunge nimic instantaneu.',
    },
    examTips: [
      {
        key: 'near-real-time',
        content: {
          en: 'Trigger phrase: "load streaming data INTO S3/Redshift/OpenSearch/Splunk with LEAST operational overhead" → Firehose. It buffers by size or time, so it is NEAR real-time, not real-time.',
          ro: 'Formulare-declanșator: „încarcă date de streaming ÎN S3/Redshift/OpenSearch/Splunk cu efort operațional MINIM" → Firehose. Face buffering după mărime sau timp, deci e timp APROAPE real, nu real-time.',
        },
      },
      {
        key: 'vs-streams',
        content: {
          en: 'Kinesis Data Streams = real-time, custom consumers, replay, storage up to 365 days. Firehose = delivery only: no storage, no replay, fully managed. The exam tests this contrast constantly.',
          ro: 'Kinesis Data Streams = real-time, consumatori proprii, replay, stocare până la 365 de zile. Firehose = doar livrare: fără stocare, fără replay, complet gestionat. Examenul testează contrastul ăsta constant.',
        },
      },
      {
        key: 'transform',
        content: {
          en: 'It can transform records in flight with a Lambda function (e.g. CSV → JSON) and convert formats to Parquet/ORC — the standard "convert before landing in S3" answer.',
          ro: 'Poate transforma înregistrări din zbor cu o funcție Lambda (ex. CSV → JSON) și converti formate în Parquet/ORC — răspunsul standard pentru „convertește înainte să aterizeze în S3".',
        },
      },
    ],
    pricing: {
      en: 'Pay only for the volume of data ingested (per GB). No shards, no capacity planning.',
      ro: 'Plătești doar volumul de date ingerat (per GB). Fără shards, fără planificare de capacitate.',
    },
    connections: ['kinesis', 's3', 'redshift', 'opensearch', 'lambda', 'cloudwatch'],
    docsUrl: 'https://docs.aws.amazon.com/firehose/latest/dev/what-is-this-service.html',
    visual: { color: 'hsl(170, 80%, 45%)', icon: 'activity' },
    examDomains: ['design-performant', 'design-cost'],
    howItWorks: [
      { en: 'Producers (apps, Kinesis Data Streams, CloudWatch Logs, IoT, SNS) send records to a Firehose delivery stream.', ro: 'Producătorii (aplicații, Kinesis Data Streams, CloudWatch Logs, IoT, SNS) trimit înregistrări către un delivery stream Firehose.' },
      { en: 'Firehose buffers the data by size or by time interval, whichever fills first.', ro: 'Firehose face buffering la date după mărime sau după interval de timp, care se umple primul.' },
      { en: 'Optionally, a Lambda function transforms each batch (e.g. CSV → JSON) and Firehose can convert to Parquet/ORC and compress (gzip/snappy).', ro: 'Opțional, o funcție Lambda transformă fiecare lot (ex. CSV → JSON), iar Firehose poate converti în Parquet/ORC și comprima (gzip/snappy).' },
      { en: 'The batch is written to the destination: S3, Redshift (via S3 COPY), OpenSearch, an HTTP endpoint, or partners (Splunk, Datadog…); failed data can go to a backup S3 bucket.', ro: 'Lotul e scris la destinație: S3, Redshift (prin S3 COPY), OpenSearch, un endpoint HTTP sau parteneri (Splunk, Datadog…); datele eșuate pot merge într-un bucket S3 de backup.' },
    ],
    keyFacts: [
      { en: 'Fully managed and serverless — auto-scales, you write zero consumer code.', ro: 'Complet gestionat și serverless — scalează automat, nu scrii deloc cod de consumator.' },
      { en: 'NEAR real-time: delivery is driven by buffer size or buffer time.', ro: 'Timp APROAPE real: livrarea e dictată de mărimea buffer-ului sau de timpul de buffering.' },
      { en: 'Destinations: S3, Redshift, OpenSearch, custom HTTP, 3rd party (Splunk, Datadog, MongoDB, New Relic…).', ro: 'Destinații: S3, Redshift, OpenSearch, HTTP custom, third-party (Splunk, Datadog, MongoDB, New Relic…).' },
      { en: 'NO data storage and NO replay — if you need retention/replay, put Kinesis Data Streams in front.', ro: 'FĂRĂ stocare de date și FĂRĂ replay — dacă ai nevoie de retenție/replay, pui Kinesis Data Streams în față.' },
      { en: 'In-flight transformation via Lambda; format conversion to Parquet/ORC; compression with gzip/snappy.', ro: 'Transformare din zbor prin Lambda; conversie de format în Parquet/ORC; compresie cu gzip/snappy.' },
    ],
    whenToUse: [
      { en: 'Streaming logs/clickstream/IoT data must land in S3 or Redshift with minimal ops.', ro: 'Log-uri/clickstream/date IoT din streaming trebuie să aterizeze în S3 sau Redshift cu operațiuni minime.' },
      { en: 'You need CSV converted to Parquet/ORC before hitting the data lake (cheaper Athena scans).', ro: 'Ai nevoie de CSV convertit în Parquet/ORC înainte să ajungă în data lake (scanări Athena mai ieftine).' },
      { en: 'Feeding OpenSearch or Splunk with near-real-time log analytics data.', ro: 'Alimentezi OpenSearch sau Splunk cu date de analiză de log-uri în timp aproape real.' },
    ],
    whenNotToUse: [
      { en: 'True real-time processing (sub-second) with custom consumer logic → Kinesis Data Streams.', ro: 'Procesare cu adevărat real-time (sub o secundă) cu logică proprie de consumator → Kinesis Data Streams.' },
      { en: 'Multiple independent consumers that each read the full stream, or replay of old data → Kinesis Data Streams.', ro: 'Mai mulți consumatori independenți care citesc fiecare tot stream-ul, sau replay de date vechi → Kinesis Data Streams.' },
      { en: 'Simple app-to-app decoupling of individual messages → SQS, not a streaming pipeline.', ro: 'Decuplare simplă aplicație-la-aplicație a mesajelor individuale → SQS, nu un pipeline de streaming.' },
    ],
    examTraps: [
      { en: 'Firehose is NEAR real-time (buffered), Kinesis Data Streams is REAL-time. "Real-time dashboard within milliseconds" → Streams; "deliver to S3 every minute" → Firehose.', ro: 'Firehose e timp APROAPE real (cu buffer), Kinesis Data Streams e REAL-time. „Dashboard real-time în milisecunde" → Streams; „livrează în S3 la fiecare minut" → Firehose.' },
      { en: 'Firehose does not store data and cannot replay it. Replay/reprocessing requirements eliminate Firehose alone.', ro: 'Firehose nu stochează date și nu poate face replay. Cerințele de replay/reprocesare elimină Firehose singur.' },
      { en: 'It was renamed: "Kinesis Data Firehose" → "Amazon Data Firehose". Old and new names both appear in questions.', ro: 'A fost redenumit: „Kinesis Data Firehose" → „Amazon Data Firehose". Ambele nume apar în întrebări.' },
      { en: 'Managed Service for Apache Flink reads from Kinesis Data Streams and MSK — NOT from Firehose.', ro: 'Managed Service for Apache Flink citește din Kinesis Data Streams și MSK — NU din Firehose.' },
    ],
    keyNumbers: [
      { label: { en: 'Latency model', ro: 'Model de latență' }, value: { en: 'near real-time (buffer by size/time)', ro: 'timp aproape real (buffer după mărime/timp)' } },
      { label: { en: 'Data retention / replay', ro: 'Retenție date / replay' }, value: { en: 'none — delivery only', ro: 'zero — doar livrare' } },
      { label: { en: 'Max record size', ro: 'Mărime maximă înregistrare' }, value: { en: '1 MB', ro: '1 MB' } },
    ],
    retrievalQuestions: [
      {
        q: { en: 'A company wants clickstream data delivered to S3 as Parquet with the least management. Which service and why?', ro: 'O companie vrea date de clickstream livrate în S3 ca Parquet cu management minim. Ce serviciu și de ce?' },
        a: { en: 'Amazon Data Firehose — serverless delivery to S3 with built-in format conversion to Parquet and optional Lambda transformation; no consumers to run.', ro: 'Amazon Data Firehose — livrare serverless în S3 cu conversie de format în Parquet inclusă și transformare opțională cu Lambda; fără consumatori de rulat.' },
      },
      {
        q: { en: 'Name three differences between Kinesis Data Streams and Amazon Data Firehose.', ro: 'Numește trei diferențe între Kinesis Data Streams și Amazon Data Firehose.' },
        a: { en: 'Streams: real-time, stores data up to 365 days, supports replay, you write consumers. Firehose: near real-time, no storage, no replay, fully managed delivery to destinations.', ro: 'Streams: real-time, stochează date până la 365 de zile, suportă replay, scrii tu consumatorii. Firehose: timp aproape real, fără stocare, fără replay, livrare complet gestionată către destinații.' },
      },
    ],
    mermaidDiagram: {
      code: 'flowchart LR; P[Producers / Kinesis Streams / CloudWatch Logs] --> F{{Data Firehose}}; F -. optional transform .-> L[Lambda]; L -.-> F; F -->|batched writes| S3[(S3)]; F --> RS[(Redshift)]; F --> OS[(OpenSearch)]; F --> TP[Splunk / Datadog / HTTP]',
      caption: { en: 'Firehose buffers records, optionally transforms them via Lambda, and batch-loads them into analytics destinations.', ro: 'Firehose pune înregistrările în buffer, opțional le transformă prin Lambda și le încarcă în loturi către destinațiile de analitică.' },
    },
  },
  {
    id: 'lakeformation',
    abbreviation: 'Lake Formation',
    fullName: 'AWS Lake Formation',
    category: 'analytics',
    level: 'saa',
    exams: ['saa'],
    difficulty: 2,
    examFrequency: 'medium',
    description: {
      en: 'A managed service that builds a secure S3 data lake in days — it ingests, cleans, catalogs, and de-duplicates data, then enforces ROW- and COLUMN-level access control in one central place.',
      ro: 'Un serviciu gestionat care construiește un data lake securizat pe S3 în câteva zile — ingerează, curăță, cataloghează și de-duplichează datele, apoi impune control de acces la nivel de RÂND și COLOANĂ dintr-un singur loc central.',
    },
    analogy: {
      en: 'A head librarian for a giant archive: gathers documents from every department, organizes and indexes them, and decides per reader which shelves, which books, and even which paragraphs they may see.',
      ro: 'Un bibliotecar-șef pentru o arhivă uriașă: adună documente din fiecare departament, le organizează și le indexează, și decide per cititor ce rafturi, ce cărți și chiar ce paragrafe are voie să vadă.',
    },
    examTips: [
      {
        key: 'fine-grained',
        content: {
          en: 'Trigger phrase: "centrally manage FINE-GRAINED (row/column-level) permissions on a data lake used by Athena, Redshift Spectrum, EMR, QuickSight" → Lake Formation. IAM alone cannot do column-level.',
          ro: 'Formulare-declanșator: „gestionează centralizat permisiuni FINE (nivel de rând/coloană) pe un data lake folosit de Athena, Redshift Spectrum, EMR, QuickSight" → Lake Formation. IAM singur nu poate face nivel de coloană.',
        },
      },
      {
        key: 'built-on-glue',
        content: {
          en: 'It is built ON TOP of AWS Glue (crawlers, Data Catalog, ETL). Lake Formation adds the security/permissions layer and blueprints for ingestion.',
          ro: 'E construit PESTE AWS Glue (crawlers, Data Catalog, ETL). Lake Formation adaugă stratul de securitate/permisiuni și blueprints pentru ingestie.',
        },
      },
    ],
    pricing: {
      en: 'No extra charge for Lake Formation itself — you pay for the underlying services it drives (Glue, S3, Athena…).',
      ro: 'Fără cost suplimentar pentru Lake Formation în sine — plătești serviciile de dedesubt pe care le orchestrează (Glue, S3, Athena…).',
    },
    connections: ['s3', 'glue', 'athena', 'redshift', 'emr', 'quicksight', 'iam'],
    docsUrl: 'https://docs.aws.amazon.com/lake-formation/latest/dg/what-is-lake-formation.html',
    visual: { color: 'hsl(170, 80%, 45%)', icon: 'database' },
    examDomains: ['design-secure', 'design-performant'],
    howItWorks: [
      { en: 'You point Lake Formation at your sources (S3, RDS, on-premises SQL/NoSQL) using out-of-the-box blueprints.', ro: 'Îndrepți Lake Formation către sursele tale (S3, RDS, baze SQL/NoSQL on-premises) folosind blueprints gata făcute.' },
      { en: 'It crawls, cleans, transforms, and de-duplicates the data (ML Transforms), landing everything in an S3-based data lake.', ro: 'Face crawling, curăță, transformă și de-duplichează datele (ML Transforms), depunând totul într-un data lake bazat pe S3.' },
      { en: 'The Glue Data Catalog records schemas and metadata; you define permissions once, down to rows and columns.', ro: 'Glue Data Catalog înregistrează schemele și metadatele; definești permisiunile o singură dată, până la nivel de rânduri și coloane.' },
      { en: 'Analytics tools (Athena, Redshift Spectrum, EMR, QuickSight) query the lake and Lake Formation enforces those permissions centrally.', ro: 'Uneltele de analitică (Athena, Redshift Spectrum, EMR, QuickSight) interoghează lake-ul, iar Lake Formation impune permisiunile centralizat.' },
    ],
    keyFacts: [
      { en: 'Sets up a data lake ON S3 in days instead of months — ingestion, cleansing, cataloging automated.', ro: 'Construiește un data lake PE S3 în zile în loc de luni — ingestie, curățare, catalogare automatizate.' },
      { en: 'Central, fine-grained access control: row-level and column-level security in one place.', ro: 'Control de acces central și fin: securitate la nivel de rând și de coloană într-un singur loc.' },
      { en: 'Built on AWS Glue — crawlers, Data Catalog, and ETL jobs underneath.', ro: 'Construit pe AWS Glue — crawlers, Data Catalog și job-uri ETL dedesubt.' },
      { en: 'Source blueprints for S3, RDS, and relational/NoSQL databases; combines structured + unstructured data.', ro: 'Blueprints de sursă pentru S3, RDS și baze relaționale/NoSQL; combină date structurate + nestructurate.' },
      { en: 'ML Transforms de-duplicate and match records automatically.', ro: 'ML Transforms de-duplichează și potrivesc înregistrările automat.' },
    ],
    whenToUse: [
      { en: 'Many teams query the same S3 data lake with different tools and you need ONE place to manage who sees what.', ro: 'Multe echipe interoghează același data lake S3 cu unelte diferite și ai nevoie de UN singur loc pentru a gestiona cine ce vede.' },
      { en: 'Compliance demands column-level security (hide PII columns) or row-level filtering per department.', ro: 'Conformitatea cere securitate la nivel de coloană (ascunzi coloanele PII) sau filtrare la nivel de rând per departament.' },
      { en: 'You are assembling a data lake from scattered sources and want the plumbing automated.', ro: 'Aduni un data lake din surse împrăștiate și vrei ca instalația să fie automatizată.' },
    ],
    whenNotToUse: [
      { en: 'You just need ETL jobs or a metadata catalog without central permissions → plain AWS Glue.', ro: 'Ai nevoie doar de job-uri ETL sau de un catalog de metadate, fără permisiuni centrale → AWS Glue simplu.' },
      { en: 'A single team querying S3 ad-hoc → Athena + IAM policies may be enough.', ro: 'O singură echipă care interoghează S3 ad-hoc → Athena + politici IAM pot fi de ajuns.' },
      { en: 'A petabyte-scale SQL data WAREHOUSE (not a lake) → Redshift.', ro: 'Un data WAREHOUSE SQL la scară de petabytes (nu un lake) → Redshift.' },
    ],
    examTraps: [
      { en: 'Row/column-level security across Athena, Redshift Spectrum, and EMR = Lake Formation. IAM and bucket policies stop at object level.', ro: 'Securitate la nivel de rând/coloană peste Athena, Redshift Spectrum și EMR = Lake Formation. IAM și politicile de bucket se opresc la nivel de obiect.' },
      { en: 'Lake Formation does not replace Glue — it is built on it. "Catalog + ETL" = Glue; "catalog + ETL + centralized fine-grained security" = Lake Formation.', ro: 'Lake Formation nu înlocuiește Glue — e construit pe el. „Catalog + ETL" = Glue; „catalog + ETL + securitate fină centralizată" = Lake Formation.' },
      { en: 'The data lake itself lives in S3 — Lake Formation is the management/security layer, not a storage service.', ro: 'Data lake-ul propriu-zis trăiește în S3 — Lake Formation e stratul de management/securitate, nu un serviciu de stocare.' },
    ],
    keyNumbers: [
      { label: { en: 'Access control granularity', ro: 'Granularitate control acces' }, value: { en: 'row + column level', ro: 'nivel de rând + coloană' } },
      { label: { en: 'Underlying storage', ro: 'Stocarea de dedesubt' }, value: { en: 'Amazon S3', ro: 'Amazon S3' } },
      { label: { en: 'Built on', ro: 'Construit pe' }, value: { en: 'AWS Glue', ro: 'AWS Glue' } },
    ],
    retrievalQuestions: [
      {
        q: { en: 'Analysts using Athena and QuickSight must not see the salary column. What is the cleanest solution?', ro: 'Analiștii care folosesc Athena și QuickSight nu trebuie să vadă coloana de salarii. Care e cea mai curată soluție?' },
        a: { en: 'Manage the data lake permissions with Lake Formation and grant column-level access that excludes the salary column — enforced across all integrated query tools.', ro: 'Gestionezi permisiunile data lake-ului cu Lake Formation și acorzi acces la nivel de coloană care exclude coloana de salarii — impus în toate uneltele de interogare integrate.' },
      },
      {
        q: { en: 'What is the relationship between Lake Formation and Glue?', ro: 'Care e relația dintre Lake Formation și Glue?' },
        a: { en: 'Lake Formation is built on top of Glue: Glue provides crawlers, the Data Catalog, and ETL; Lake Formation adds ingestion blueprints and centralized fine-grained access control.', ro: 'Lake Formation e construit peste Glue: Glue oferă crawlers, Data Catalog și ETL; Lake Formation adaugă blueprints de ingestie și control de acces fin centralizat.' },
      },
    ],
    mermaidDiagram: {
      code: 'flowchart LR; SRC[S3 / RDS / on-prem DBs] -->|blueprints ingest| LF{{Lake Formation}}; LF -->|clean + catalog + dedup| DL[(Data lake on S3)]; LF -. row/column permissions .-> Q[Athena / Redshift Spectrum / EMR / QuickSight]; Q --> DL',
      caption: { en: 'Sources are ingested into an S3 data lake; Lake Formation catalogs the data and enforces fine-grained permissions for every query engine.', ro: 'Sursele sunt ingerate într-un data lake pe S3; Lake Formation cataloghează datele și impune permisiuni fine pentru fiecare motor de interogare.' },
    },
  },
  {
    id: 'managedflink',
    abbreviation: 'Managed Flink',
    fullName: 'Amazon Managed Service for Apache Flink',
    category: 'analytics',
    level: 'saa',
    exams: ['saa'],
    difficulty: 3,
    examFrequency: 'medium',
    description: {
      en: 'A managed cluster for running Apache Flink applications that transform and analyze streaming data in REAL time — the "SQL/Java on a live stream" option (formerly Kinesis Data Analytics).',
      ro: 'Un cluster gestionat pentru rularea aplicațiilor Apache Flink care transformă și analizează date de streaming în timp REAL — opțiunea „SQL/Java pe un stream live" (fost Kinesis Data Analytics).',
    },
    analogy: {
      en: 'A quality inspector standing ON the conveyor belt, computing statistics and flagging anomalies as items pass — instead of inspecting boxes after they reach the warehouse.',
      ro: 'Un inspector de calitate care stă PE banda rulantă, calculează statistici și marchează anomalii pe măsură ce trec produsele — în loc să inspecteze cutiile după ce ajung în depozit.',
    },
    examTips: [
      {
        key: 'real-time-analytics',
        content: {
          en: 'Trigger phrase: "real-time analytics on streaming data" / "sliding time windows over a stream" → Managed Service for Apache Flink, reading from Kinesis Data Streams or MSK.',
          ro: 'Formulare-declanșator: „analitică real-time pe date de streaming" / „ferestre de timp glisante peste un stream" → Managed Service for Apache Flink, citind din Kinesis Data Streams sau MSK.',
        },
      },
      {
        key: 'not-firehose',
        content: {
          en: 'Flink CANNOT read from Amazon Data Firehose. Sources = Kinesis Data Streams or MSK/Kafka. This exact fact is an exam favorite.',
          ro: 'Flink NU poate citi din Amazon Data Firehose. Surse = Kinesis Data Streams sau MSK/Kafka. Exact faptul ăsta e un favorit al examenului.',
        },
      },
    ],
    pricing: {
      en: 'Per KPU-hour (Kinesis Processing Unit = 1 vCPU + 4 GB) — pay for the compute the Flink app consumes, scaling is automatic.',
      ro: 'Per KPU-oră (Kinesis Processing Unit = 1 vCPU + 4 GB) — plătești compute-ul consumat de aplicația Flink, scalarea e automată.',
    },
    connections: ['kinesis', 'msk', 'firehose', 's3', 'lambda'],
    docsUrl: 'https://docs.aws.amazon.com/managed-flink/latest/java/what-is.html',
    visual: { color: 'hsl(170, 80%, 45%)', icon: 'activity' },
    examDomains: ['design-performant'],
    howItWorks: [
      { en: 'You write a Flink application (Java, Scala, or SQL) that describes transformations over a data stream.', ro: 'Scrii o aplicație Flink (Java, Scala sau SQL) care descrie transformări peste un stream de date.' },
      { en: 'The service runs it on a managed, auto-scaling cluster with parallel computation — no servers to operate.', ro: 'Serviciul o rulează pe un cluster gestionat, cu auto-scaling și calcul paralel — fără servere de operat.' },
      { en: 'The app consumes from Kinesis Data Streams or MSK, computes windows/aggregations/joins in real time.', ro: 'Aplicația consumă din Kinesis Data Streams sau MSK, calculează ferestre/agregări/join-uri în timp real.' },
      { en: 'Checkpoints and snapshots back up application state automatically for fault tolerance.', ro: 'Checkpoint-urile și snapshot-urile salvează automat starea aplicației pentru toleranță la erori.' },
    ],
    keyFacts: [
      { en: 'Runs real Apache Flink apps (Java/Scala/SQL) on a managed, auto-scaling cluster.', ro: 'Rulează aplicații Apache Flink reale (Java/Scala/SQL) pe un cluster gestionat cu auto-scaling.' },
      { en: 'Reads from Kinesis Data Streams and MSK — NOT from Amazon Data Firehose.', ro: 'Citește din Kinesis Data Streams și MSK — NU din Amazon Data Firehose.' },
      { en: 'Real-time (millisecond) stream processing: windows, aggregations, anomaly detection.', ro: 'Procesare de stream în timp real (milisecunde): ferestre, agregări, detecție de anomalii.' },
      { en: 'State is protected with automatic checkpoints and snapshots.', ro: 'Starea e protejată cu checkpoint-uri și snapshot-uri automate.' },
      { en: 'Formerly "Kinesis Data Analytics for Apache Flink" — old name still appears in questions.', ro: 'Fost „Kinesis Data Analytics for Apache Flink" — numele vechi încă apare în întrebări.' },
    ],
    whenToUse: [
      { en: 'Real-time metrics/leaderboards/anomaly detection computed over sliding windows of a stream.', ro: 'Metrici/clasamente/detecție de anomalii în timp real calculate pe ferestre glisante ale unui stream.' },
      { en: 'ETL on streaming data where the logic is too rich for a Lambda (joins, stateful windows).', ro: 'ETL pe date de streaming unde logica e prea bogată pentru un Lambda (join-uri, ferestre cu stare).' },
    ],
    whenNotToUse: [
      { en: 'You only need to LAND the stream in S3/Redshift/OpenSearch → Firehose (simpler, cheaper).', ro: 'Trebuie doar să DEPUI stream-ul în S3/Redshift/OpenSearch → Firehose (mai simplu, mai ieftin).' },
      { en: 'Simple per-record processing → a Lambda consumer on the stream is lighter.', ro: 'Procesare simplă per înregistrare → un consumator Lambda pe stream e mai lejer.' },
      { en: 'Batch analytics on data already at rest in S3 → Athena/EMR, not stream processing.', ro: 'Analitică batch pe date deja stocate în S3 → Athena/EMR, nu procesare de stream.' },
    ],
    examTraps: [
      { en: 'Firehose is NOT a valid source for Managed Flink — only Kinesis Data Streams and MSK are.', ro: 'Firehose NU e o sursă validă pentru Managed Flink — doar Kinesis Data Streams și MSK sunt.' },
      { en: '"Analyze the stream in real time with SQL" → Managed Flink; "deliver the stream to S3" → Firehose. Analysis vs delivery.', ro: '„Analizează stream-ul în timp real cu SQL" → Managed Flink; „livrează stream-ul în S3" → Firehose. Analiză vs livrare.' },
    ],
    keyNumbers: [
      { label: { en: 'Valid sources', ro: 'Surse valide' }, value: { en: 'Kinesis Data Streams, MSK', ro: 'Kinesis Data Streams, MSK' } },
      { label: { en: 'Latency model', ro: 'Model de latență' }, value: { en: 'real-time', ro: 'timp real' } },
    ],
    retrievalQuestions: [
      {
        q: { en: 'You must compute 1-minute sliding-window aggregations over a Kinesis stream in real time. Which service?', ro: 'Trebuie să calculezi agregări pe ferestre glisante de 1 minut peste un stream Kinesis, în timp real. Ce serviciu?' },
        a: { en: 'Amazon Managed Service for Apache Flink — it runs stateful window computations on live streams from Kinesis Data Streams or MSK.', ro: 'Amazon Managed Service for Apache Flink — rulează calcule cu ferestre și stare pe stream-uri live din Kinesis Data Streams sau MSK.' },
      },
      {
        q: { en: 'Which streaming source does Managed Flink NOT support?', ro: 'Ce sursă de streaming NU e suportată de Managed Flink?' },
        a: { en: 'Amazon Data Firehose — Flink reads only from Kinesis Data Streams and MSK/Kafka.', ro: 'Amazon Data Firehose — Flink citește doar din Kinesis Data Streams și MSK/Kafka.' },
      },
    ],
    mermaidDiagram: {
      code: 'flowchart LR; KDS[Kinesis Data Streams] --> FL{{Managed Flink app}}; MSK[Amazon MSK] --> FL; FL -->|windows, aggregations| OUT[S3 / Firehose / streams / dashboards]; FL -. checkpoints .-> CP[(App state snapshots)]',
      caption: { en: 'Flink consumes live streams from Kinesis or MSK, computes stateful analytics, and emits results downstream — Firehose is only valid as an OUTPUT.', ro: 'Flink consumă stream-uri live din Kinesis sau MSK, calculează analitică cu stare și emite rezultate în aval — Firehose e valid doar ca IEȘIRE.' },
    },
  },
];
