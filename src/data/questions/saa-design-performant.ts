import type { ExamDomain, QuizQuestion } from '@/types';

/**
 * SAA-C03 · Domain 3: Design High-Performing Architectures (24% of scored content).
 * ID scheme: saa-perf-### (3 digits, append-only — continue numbering at the end).
 * Every question MUST set `examDomain` explicitly.
 */
export const saaDesignPerformantQuestions: Array<QuizQuestion & { examDomain: ExamDomain }> = [
  {
    id: 'saa-perf-001',
    type: 'multiple_choice',
    difficulty: 3,
    categories: ['storage'],
    examDomain: 'design-performant',
    question: {
      en: 'A content-management application runs on multiple Amazon EC2 Linux instances across two Availability Zones. All instances need simultaneous read/write access to the same shared file system with POSIX semantics, and storage must grow automatically. Which storage service fits?',
      ro: 'O aplicație de content management rulează pe mai multe instanțe EC2 Linux în două Availability Zone-uri. Toate instanțele au nevoie de acces simultan read/write la același sistem de fișiere partajat cu semantică POSIX, iar stocarea trebuie să crească automat. Ce serviciu de stocare se potrivește?',
    },
    options: [
      { en: 'Amazon EFS mounted on all instances', ro: 'Amazon EFS montat pe toate instanțele' },
      { en: 'A single Amazon EBS volume attached to all instances', ro: 'Un singur volum Amazon EBS atașat la toate instanțele' },
      { en: 'Amazon S3 accessed through the AWS SDK', ro: 'Amazon S3 accesat prin AWS SDK' },
      { en: 'Instance store volumes replicated between instances', ro: 'Volume instance store replicate între instanțe' },
    ],
    correct: 0,
    explanation: {
      en: 'EFS is the managed NFS file system built for exactly this: concurrent access from many instances across AZs, POSIX semantics, and automatic elastic growth. EBS is block storage attached within one AZ (Multi-Attach is same-AZ and requires a cluster-aware file system); S3 is object storage without POSIX file semantics; instance store is ephemeral and local to one host.',
      ro: 'EFS e sistemul de fișiere NFS gestionat construit exact pentru asta: acces concurent de pe mai multe instanțe din AZ-uri diferite, semantică POSIX și creștere elastică automată. EBS e stocare block atașată într-un singur AZ (Multi-Attach e doar în același AZ și cere un file system cluster-aware); S3 e stocare de obiecte fără semantică POSIX; instance store e efemer și local unui singur host.',
    },
    optionExplanations: [
      { en: 'Correct — shared POSIX file system + multi-AZ + elastic growth = the EFS signature use case.', ro: 'Corect — file system partajat POSIX + multi-AZ + creștere elastică = cazul-semnătură pentru EFS.' },
      { en: 'An EBS volume lives in one AZ and normally attaches to one instance; it cannot be shared across AZs.', ro: 'Un volum EBS trăiește într-un singur AZ și se atașează normal la o singură instanță; nu poate fi partajat între AZ-uri.' },
      { en: 'S3 is object storage — no file locking, directories-as-API, or POSIX operations that a CMS file tier expects.', ro: 'S3 e stocare de obiecte — fără file locking sau operații POSIX pe care le așteaptă un tier de fișiere CMS.' },
      { en: 'Instance store is ephemeral (lost on stop/termination) and local — unusable as durable shared storage.', ro: 'Instance store e efemer (se pierde la stop/terminate) și local — inutilizabil ca stocare partajată durabilă.' },
    ],
    references: [
      { label: 'When to use Amazon EFS', url: 'https://docs.aws.amazon.com/efs/latest/ug/whereuse.html' },
    ],
    relatedServices: ['efs', 'ebs', 's3'],
    source: 'exam-guide',
  },
  {
    id: 'saa-perf-002',
    type: 'multiple_choice',
    difficulty: 4,
    categories: ['database'],
    examDomain: 'design-performant',
    question: {
      en: 'A gaming application uses Amazon DynamoDB and is read-heavy: the same player-profile items are read millions of times per day. The team needs microsecond read latency WITHOUT rewriting the application’s DynamoDB calls. What should a solutions architect recommend?',
      ro: 'O aplicație de gaming folosește Amazon DynamoDB și e read-heavy: aceleași iteme de profil de jucător sunt citite de milioane de ori pe zi. Echipa are nevoie de latență de citire de microsecunde, FĂRĂ a rescrie apelurile DynamoDB din aplicație. Ce ar trebui să recomande un solutions architect?',
    },
    options: [
      { en: 'Add DynamoDB Accelerator (DAX) in front of the table', ro: 'Adaugă DynamoDB Accelerator (DAX) în fața tabelei' },
      { en: 'Add an Amazon ElastiCache for Redis cluster and implement cache-aside logic', ro: 'Adaugă un cluster Amazon ElastiCache for Redis și implementează logică cache-aside' },
      { en: 'Increase the table’s provisioned read capacity units (RCUs)', ro: 'Mărește read capacity units (RCU) provizionate pe tabelă' },
      { en: 'Create a DynamoDB global table in a second Region', ro: 'Creează un DynamoDB global table într-o a doua regiune' },
    ],
    correct: 0,
    explanation: {
      en: 'DAX is a DynamoDB-API-compatible, write-through cache: you point the existing DynamoDB client at the DAX endpoint and cached reads drop from single-digit milliseconds to microseconds — no application logic changes. ElastiCache achieves similar latency but requires writing cache-aside code; more RCUs raise throughput, not latency; global tables address multi-Region access, not per-read latency in one Region.',
      ro: 'DAX e un cache write-through compatibil cu API-ul DynamoDB: îndrepți clientul DynamoDB existent către endpoint-ul DAX, iar citirile din cache scad de la milisecunde la microsecunde — fără schimbări în logica aplicației. ElastiCache atinge latențe similare, dar cere cod cache-aside; mai multe RCU cresc throughput-ul, nu scad latența; global tables rezolvă accesul multi-regiune, nu latența per citire într-o regiune.',
    },
    optionExplanations: [
      { en: 'Correct — “microseconds + DynamoDB + no code changes” is the DAX signature phrase on the exam.', ro: 'Corect — „microsecunde + DynamoDB + fără schimbări de cod" e formularea-semnătură pentru DAX la examen.' },
      { en: 'ElastiCache works, but it is NOT API-compatible with DynamoDB — the app must implement caching logic, violating the no-rewrite constraint.', ro: 'ElastiCache funcționează, dar NU e compatibil cu API-ul DynamoDB — aplicația ar trebui să implementeze logica de cache, încălcând constrângerea „fără rescriere".' },
      { en: 'Extra RCUs prevent throttling on hot reads but keep latency at single-digit milliseconds — an order of magnitude off.', ro: 'RCU în plus previn throttling-ul pe citiri intense, dar latența rămâne de ordinul milisecundelor — cu un ordin de mărime peste cerință.' },
      { en: 'Global tables replicate data across Regions for locality/DR; reads in the existing Region are not faster.', ro: 'Global tables replică datele între regiuni pentru localitate/DR; citirile din regiunea existentă nu devin mai rapide.' },
    ],
    references: [
      { label: 'DynamoDB Accelerator (DAX)', url: 'https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.html' },
    ],
    relatedServices: ['dynamodb', 'elasticache'],
    source: 'exam-guide',
  },
  {
    id: 'saa-perf-003',
    type: 'multiple_choice',
    difficulty: 4,
    categories: ['network'],
    examDomain: 'design-performant',
    question: {
      en: 'A multiplayer game uses a custom UDP protocol. Players worldwide complain about lag and about reconfiguring when IPs change. The company wants global static entry points and routing over the AWS backbone to the nearest healthy endpoint. Which service should be used?',
      ro: 'Un joc multiplayer folosește un protocol UDP custom. Jucătorii din toată lumea se plâng de lag și de reconfigurare când se schimbă IP-urile. Compania vrea puncte de intrare globale cu IP-uri statice și rutare prin backbone-ul AWS către cel mai apropiat endpoint sănătos. Ce serviciu ar trebui folosit?',
    },
    options: [
      { en: 'AWS Global Accelerator', ro: 'AWS Global Accelerator' },
      { en: 'Amazon CloudFront', ro: 'Amazon CloudFront' },
      { en: 'Route 53 latency-based routing', ro: 'Route 53 latency-based routing' },
      { en: 'An Application Load Balancer in each Region', ro: 'Câte un Application Load Balancer în fiecare regiune' },
    ],
    correct: 0,
    explanation: {
      en: 'Global Accelerator provides two static anycast IPs and routes TCP/UDP traffic onto the AWS global network at the nearest edge, with automatic health-based failover between Regional endpoints — exactly the “custom UDP + static IP + global performance” trio. CloudFront accelerates HTTP/HTTPS content (not arbitrary UDP); latency-based DNS gives no static IPs and suffers DNS caching delays; per-Region ALBs are HTTP-only (layer 7) and don’t handle UDP.',
      ro: 'Global Accelerator oferă două IP-uri statice anycast și duce traficul TCP/UDP pe rețeaua globală AWS de la cel mai apropiat edge, cu failover automat pe baza health check-urilor între endpoint-uri regionale — exact tripleta „UDP custom + IP static + performanță globală". CloudFront accelerează conținut HTTP/HTTPS (nu UDP arbitrar); DNS-ul latency-based nu oferă IP-uri statice și suferă de caching DNS; ALB-urile per regiune sunt doar HTTP (layer 7) și nu duc UDP.',
    },
    optionExplanations: [
      { en: 'Correct — non-HTTP protocols + static anycast IPs + AWS backbone = Global Accelerator, the standard CloudFront-vs-GA discrimination.', ro: 'Corect — protocoale non-HTTP + IP-uri statice anycast + backbone AWS = Global Accelerator, discriminarea standard CloudFront-vs-GA.' },
      { en: 'CloudFront is a CDN for HTTP/HTTPS; it cannot proxy a custom UDP game protocol.', ro: 'CloudFront e un CDN pentru HTTP/HTTPS; nu poate proxy-a un protocol UDP custom de joc.' },
      { en: 'Latency-based routing helps pick a Region but provides no static IPs, no backbone transport, and reacts slowly due to DNS TTLs.', ro: 'Latency-based routing ajută la alegerea regiunii, dar nu oferă IP-uri statice, nici transport pe backbone, și reacționează lent din cauza TTL-urilor DNS.' },
      { en: 'ALB is layer 7 (HTTP/HTTPS/gRPC) — UDP would need an NLB, and even then there is no global static entry point.', ro: 'ALB e layer 7 (HTTP/HTTPS/gRPC) — pentru UDP ar trebui NLB, și nici atunci nu ai punct de intrare global static.' },
    ],
    references: [
      { label: 'What is AWS Global Accelerator?', url: 'https://docs.aws.amazon.com/global-accelerator/latest/dg/what-is-global-accelerator.html' },
    ],
    relatedServices: ['globalaccelerator', 'cloudfront', 'elb'],
    source: 'exam-guide',
  },
  {
    id: 'saa-perf-004',
    type: 'multiple_choice',
    difficulty: 4,
    categories: ['analytics', 'integration'],
    examDomain: 'design-performant',
    question: {
      en: 'IoT sensors produce thousands of events per second. The data must be processed in real time by TWO independent applications simultaneously, and the company wants to be able to replay the last 24 hours of data. Which ingestion service should be used?',
      ro: 'Senzori IoT produc mii de evenimente pe secundă. Datele trebuie procesate în timp real de DOUĂ aplicații independente simultan, iar compania vrea să poată re-procesa (replay) ultimele 24 de ore de date. Ce serviciu de ingestie ar trebui folosit?',
    },
    options: [
      { en: 'Amazon Kinesis Data Streams', ro: 'Amazon Kinesis Data Streams' },
      { en: 'Amazon SQS standard queue', ro: 'O coadă standard Amazon SQS' },
      { en: 'Amazon Data Firehose delivering to Amazon S3', ro: 'Amazon Data Firehose cu livrare în Amazon S3' },
      { en: 'Amazon EventBridge rules targeting both applications', ro: 'Reguli Amazon EventBridge cu ambele aplicații ca ținte' },
    ],
    correct: 0,
    explanation: {
      en: 'Kinesis Data Streams retains records (24 hours by default, extensible to 365 days) and lets multiple consumers read the SAME stream independently, each with its own position — enabling both fan-out processing and replay. In SQS a message consumed by one reader is hidden/deleted for others and cannot be replayed; Firehose is delivery-to-destination (near-real-time, no consumer-managed replay); EventBridge routes discrete events but has no retention/replay-by-position semantics for streaming analytics.',
      ro: 'Kinesis Data Streams reține înregistrările (24 de ore implicit, extensibil la 365 de zile) și permite mai multor consumatori să citească ACELAȘI stream independent, fiecare cu poziția lui — permițând și fan-out, și replay. În SQS un mesaj consumat de un cititor devine invizibil/șters pentru ceilalți și nu poate fi re-citit; Firehose e livrare-către-destinație (near-real-time, fără replay gestionat de consumator); EventBridge rutează evenimente discrete, fără semantică de retenție/replay pe poziție pentru streaming.',
    },
    optionExplanations: [
      { en: 'Correct — multiple independent real-time consumers + replay window = Kinesis Data Streams, its defining combination.', ro: 'Corect — mai mulți consumatori independenți în timp real + fereastră de replay = Kinesis Data Streams, combinația lui definitorie.' },
      { en: 'SQS is one-consumer-per-message queuing: no fan-out to two independent readers of the same data, and no replay after deletion.', ro: 'SQS e queuing cu un consumator per mesaj: fără fan-out către doi cititori independenți ai acelorași date și fără replay după ștergere.' },
      { en: 'Firehose buffers and delivers into S3/Redshift/etc. — consumers read the destination later; it is not built for two real-time stream consumers with replay.', ro: 'Firehose stochează și livrează în S3/Redshift/etc. — consumatorii citesc destinația ulterior; nu e făcut pentru doi consumatori de stream în timp real cu replay.' },
      { en: 'EventBridge is an event bus for routing/filtering discrete events; throughput and replay semantics do not fit high-volume stream analytics.', ro: 'EventBridge e un event bus pentru rutarea/filtrarea evenimentelor discrete; throughput-ul și semantica de replay nu se potrivesc analizei de stream-uri de volum mare.' },
    ],
    references: [
      { label: 'Amazon Kinesis Data Streams — key concepts', url: 'https://docs.aws.amazon.com/streams/latest/dev/key-concepts.html' },
    ],
    relatedServices: ['kinesis', 'sqs', 'eventbridge'],
    source: 'exam-guide',
  },
];
