import type { ExamDomain, QuizQuestion } from '@/types';

/**
 * SAA-C03 · Domain 4: Design Cost-Optimized Architectures (20% of scored content).
 * ID scheme: saa-cost-### (3 digits, append-only — continue numbering at the end).
 * Every question MUST set `examDomain` explicitly.
 */
export const saaDesignCostQuestions: Array<QuizQuestion & { examDomain: ExamDomain }> = [
  {
    id: 'saa-cost-001',
    type: 'multiple_choice',
    difficulty: 3,
    categories: ['storage', 'billing'],
    examDomain: 'design-cost',
    question: {
      en: 'A company stores millions of objects in Amazon S3. Access patterns are unpredictable — some objects are read daily, others untouched for months, and this changes over time. Which storage class minimizes cost WITHOUT impacting retrieval performance or requiring lifecycle analysis?',
      ro: 'O companie stochează milioane de obiecte în Amazon S3. Tiparele de acces sunt imprevizibile — unele obiecte sunt citite zilnic, altele neatinse luni întregi, iar asta se schimbă în timp. Ce storage class minimizează costul FĂRĂ a afecta performanța la citire și fără analiză manuală a ciclului de viață?',
    },
    options: [
      { en: 'S3 Intelligent-Tiering', ro: 'S3 Intelligent-Tiering' },
      { en: 'S3 Standard-IA with a lifecycle rule after 30 days', ro: 'S3 Standard-IA cu o regulă de lifecycle după 30 de zile' },
      { en: 'S3 Glacier Flexible Retrieval for all objects', ro: 'S3 Glacier Flexible Retrieval pentru toate obiectele' },
      { en: 'S3 One Zone-IA for all objects', ro: 'S3 One Zone-IA pentru toate obiectele' },
    ],
    correct: 0,
    explanation: {
      en: '“Unknown or changing access patterns” is the trigger phrase for S3 Intelligent-Tiering: it monitors access and moves each object automatically between tiers with no retrieval fees and millisecond access. Standard-IA charges per-GB retrieval and penalizes objects that turn hot again; Glacier introduces minutes-to-hours retrieval; One Zone-IA lowers durability scope (single AZ) and still has retrieval fees.',
      ro: '„Tipare de acces necunoscute sau schimbătoare" e formularea-declanșator pentru S3 Intelligent-Tiering: monitorizează accesul și mută automat fiecare obiect între tier-e, fără taxe de retrieval și cu acces în milisecunde. Standard-IA taxează retrieval per GB și penalizează obiectele care redevin „hot"; Glacier introduce recuperare de minute–ore; One Zone-IA reduce reziliența (un singur AZ) și tot are taxe de retrieval.',
    },
    optionExplanations: [
      { en: 'Correct — automatic tiering, no retrieval fees, milliseconds access: built exactly for unpredictable patterns.', ro: 'Corect — tiering automat, fără taxe de retrieval, acces în milisecunde: construit exact pentru tipare imprevizibile.' },
      { en: 'A blind 30-day rule mismatches objects that stay hot (retrieval fees on every read) — lifecycle rules suit PREDICTABLE patterns.', ro: 'O regulă oarbă de 30 de zile nu se potrivește obiectelor care rămân „hot" (taxe de retrieval la fiecare citire) — lifecycle e pentru tipare PREVIZIBILE.' },
      { en: 'Glacier retrieval takes minutes to hours — unacceptable for objects that are read daily.', ro: 'Recuperarea din Glacier durează minute–ore — inacceptabil pentru obiecte citite zilnic.' },
      { en: 'One Zone-IA stores data in a single AZ (lower resilience) and charges retrieval — wrong trade-off for mixed access.', ro: 'One Zone-IA stochează datele într-un singur AZ (reziliență mai mică) și taxează retrieval — compromis greșit pentru acces mixt.' },
    ],
    references: [
      { label: 'S3 Intelligent-Tiering storage class', url: 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/intelligent-tiering.html' },
    ],
    relatedServices: ['s3'],
    source: 'exam-guide',
  },
  {
    id: 'saa-cost-002',
    type: 'multiple_choice',
    difficulty: 3,
    categories: ['compute', 'billing'],
    examDomain: 'design-cost',
    question: {
      en: 'A research team runs nightly batch jobs on Amazon EC2. Jobs are fault-tolerant, can be checkpointed and resumed, and have flexible completion times. Which purchasing option minimizes compute cost?',
      ro: 'O echipă de research rulează job-uri batch nocturne pe Amazon EC2. Job-urile sunt tolerante la erori, pot fi checkpoint-ate și reluate, iar timpul de finalizare e flexibil. Ce opțiune de achiziție minimizează costul de compute?',
    },
    options: [
      { en: 'Spot Instances', ro: 'Instanțe Spot' },
      { en: 'On-Demand Instances', ro: 'Instanțe On-Demand' },
      { en: 'Standard Reserved Instances (3-year, all upfront)', ro: 'Reserved Instances Standard (3 ani, plată integrală în avans)' },
      { en: 'Dedicated Hosts', ro: 'Dedicated Hosts' },
    ],
    correct: 0,
    explanation: {
      en: 'Fault-tolerant + interruptible + flexible timing are the three Spot keywords: Spot offers up to ~90% discount versus On-Demand, with the trade-off that AWS can reclaim capacity with a 2-minute warning — which checkpointed batch jobs absorb easily. On-Demand pays full price; RIs commit to steady-state usage (wasteful for a few hours per night); Dedicated Hosts are the most expensive option, meant for licensing/compliance.',
      ro: 'Tolerant la erori + întreruptibil + timp flexibil sunt cele trei cuvinte-cheie pentru Spot: reducere de până la ~90% față de On-Demand, cu compromisul că AWS poate recupera capacitatea cu avertisment de 2 minute — ceea ce job-urile batch cu checkpoint absorb ușor. On-Demand plătește preț întreg; RI-urile se justifică la utilizare constantă (risipă pentru câteva ore pe noapte); Dedicated Hosts e cea mai scumpă opțiune, pentru licențiere/conformitate.',
    },
    optionExplanations: [
      { en: 'Correct — the scenario explicitly signals interruption tolerance, which is the only real Spot requirement.', ro: 'Corect — scenariul semnalează explicit toleranța la întrerupere, singura cerință reală pentru Spot.' },
      { en: 'On-Demand is for unpredictable, non-interruptible workloads — it leaves the ~90% Spot discount on the table here.', ro: 'On-Demand e pentru workload-uri imprevizibile, ne-întreruptibile — aici ar lăsa neatinsă reducerea de ~90% a Spot-ului.' },
      { en: 'RIs pay for 24/7 commitment; a nightly few-hour batch would waste most of the reserved hours.', ro: 'RI-urile plătesc angajament 24/7; un batch nocturn de câteva ore ar irosi majoritatea orelor rezervate.' },
      { en: 'Dedicated Hosts address BYOL licensing and host-level compliance, at premium cost — irrelevant to this scenario.', ro: 'Dedicated Hosts rezolvă licențiere BYOL și conformitate la nivel de host, la cost premium — irelevant aici.' },
    ],
    references: [
      { label: 'Amazon EC2 Spot Instances', url: 'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-spot-instances.html' },
    ],
    relatedServices: ['ec2', 'batch'],
    source: 'exam-guide',
  },
  {
    id: 'saa-cost-003',
    type: 'multiple_choice',
    difficulty: 4,
    categories: ['network', 'billing'],
    examDomain: 'design-cost',
    question: {
      en: 'EC2 instances in private subnets transfer hundreds of terabytes per month to Amazon S3 in the same Region through a NAT gateway. The data-processing charges on the NAT gateway have become the dominant network cost. How can these charges be eliminated?',
      ro: 'Instanțe EC2 din subneturi private transferă sute de terabytes pe lună către Amazon S3 din aceeași regiune printr-un NAT gateway. Taxele de procesare a datelor pe NAT gateway au devenit costul de rețea dominant. Cum pot fi eliminate aceste taxe?',
    },
    options: [
      { en: 'Create a gateway VPC endpoint for S3 and route S3 traffic through it', ro: 'Creează un gateway VPC endpoint pentru S3 și rutează traficul S3 prin el' },
      { en: 'Deploy one NAT gateway per Availability Zone', ro: 'Instalează câte un NAT gateway per Availability Zone' },
      { en: 'Replace the NAT gateway with a NAT instance on a large EC2 instance', ro: 'Înlocuiește NAT gateway-ul cu o instanță NAT pe un EC2 mare' },
      { en: 'Enable S3 Transfer Acceleration on the bucket', ro: 'Activează S3 Transfer Acceleration pe bucket' },
    ],
    correct: 0,
    explanation: {
      en: 'Gateway VPC endpoints for S3 (and DynamoDB) route traffic privately over the AWS network with NO hourly or data-processing charges — moving the S3 traffic off the NAT gateway eliminates that cost entirely and improves security (no internet path). Per-AZ NAT gateways cut cross-AZ charges but keep per-GB processing; a NAT instance trades managed reliability for EC2 costs and still processes every byte; Transfer Acceleration ADDS cost and targets long-distance uploads.',
      ro: 'Gateway VPC endpoints pentru S3 (și DynamoDB) rutează traficul privat prin rețeaua AWS, FĂRĂ taxe orare sau de procesare a datelor — mutarea traficului S3 de pe NAT gateway elimină complet acel cost și îmbunătățește securitatea (fără drum prin internet). NAT per AZ reduce taxele cross-AZ, dar păstrează procesarea per GB; o instanță NAT schimbă fiabilitatea gestionată pe costuri EC2 și tot procesează fiecare byte; Transfer Acceleration ADAUGĂ cost și țintește upload-uri la distanță mare.',
    },
    optionExplanations: [
      { en: 'Correct — gateway endpoints for S3/DynamoDB are free and keep same-Region S3 traffic entirely off the NAT path. A top-3 SAA cost trap.', ro: 'Corect — gateway endpoints pentru S3/DynamoDB sunt gratuite și scot complet traficul S3 din aceeași regiune de pe ruta NAT. Una din primele 3 capcane de cost la SAA.' },
      { en: 'Per-AZ NAT gateways optimize availability and cross-AZ charges, but every S3 gigabyte still pays NAT data processing.', ro: 'NAT per AZ optimizează disponibilitatea și taxele cross-AZ, dar fiecare gigabyte spre S3 tot plătește procesarea NAT.' },
      { en: 'A NAT instance shifts cost to EC2 (instance + bandwidth) and adds management/HA burden — not an elimination of the charge.', ro: 'O instanță NAT mută costul pe EC2 (instanță + bandă) și adaugă întreținere/HA manual — nu elimină taxa.' },
      { en: 'Transfer Acceleration speeds up long-distance transfers via edge locations and costs EXTRA per GB — the opposite of the goal.', ro: 'Transfer Acceleration accelerează transferurile la distanță mare prin edge locations și costă EXTRA per GB — opusul obiectivului.' },
    ],
    references: [
      { label: 'Gateway endpoints for Amazon S3', url: 'https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-s3.html' },
    ],
    relatedServices: ['vpc', 's3', 'privatelink'],
    source: 'exam-guide',
  },
  {
    id: 'saa-cost-004',
    type: 'multiple_choice',
    difficulty: 4,
    categories: ['database', 'billing'],
    examDomain: 'design-cost',
    question: {
      en: 'A development team uses a MySQL-compatible database that is queried heavily for a few unpredictable hours a day and sits idle the rest of the time. The company pays for a fixed-size RDS instance 24/7 and wants to pay only for actual usage while keeping MySQL compatibility. What should a solutions architect recommend?',
      ro: 'O echipă de development folosește o bază de date compatibilă MySQL, interogată intens câteva ore imprevizibile pe zi și inactivă în rest. Compania plătește o instanță RDS de dimensiune fixă 24/7 și vrea să plătească doar pentru utilizarea reală, păstrând compatibilitatea MySQL. Ce ar trebui să recomande un solutions architect?',
    },
    options: [
      { en: 'Migrate to Amazon Aurora Serverless v2 (MySQL-compatible)', ro: 'Migrează la Amazon Aurora Serverless v2 (compatibil MySQL)' },
      { en: 'Purchase a Reserved Instance for the current RDS size', ro: 'Cumpără un Reserved Instance pentru dimensiunea actuală de RDS' },
      { en: 'Migrate to Amazon DynamoDB with on-demand capacity', ro: 'Migrează la Amazon DynamoDB cu capacitate on-demand' },
      { en: 'Migrate to Amazon Redshift Serverless', ro: 'Migrează la Amazon Redshift Serverless' },
    ],
    correct: 0,
    explanation: {
      en: 'Aurora Serverless v2 scales capacity (ACUs) up and down automatically with demand and bills per second of capacity used, while staying wire-compatible with MySQL — ideal for intermittent, unpredictable workloads. An RI would lock in 24/7 payment for an idle database; DynamoDB is NoSQL, breaking MySQL compatibility; Redshift is a data warehouse for analytics, not an OLTP MySQL replacement.',
      ro: 'Aurora Serverless v2 scalează capacitatea (ACU-uri) automat în sus și în jos după cerere și facturează pe secundă de capacitate folosită, rămânând compatibil la nivel de protocol cu MySQL — ideal pentru workload-uri intermitente, imprevizibile. Un RI ar bloca plata 24/7 pentru o bază inactivă; DynamoDB e NoSQL, pierzând compatibilitatea MySQL; Redshift e data warehouse pentru analytics, nu un înlocuitor OLTP de MySQL.',
    },
    optionExplanations: [
      { en: 'Correct — “intermittent/unpredictable + relational + pay-per-use” maps to Aurora Serverless on the exam.', ro: 'Corect — „intermitent/imprevizibil + relațional + plată la utilizare" se mapează pe Aurora Serverless la examen.' },
      { en: 'An RI REDUCES the 24/7 price but still pays around the clock — it optimizes steady usage, not idle time.', ro: 'Un RI REDUCE prețul 24/7, dar tot plătește non-stop — optimizează utilizarea constantă, nu timpul inactiv.' },
      { en: 'DynamoDB on-demand fits the payment model but abandons SQL/MySQL compatibility — a rewrite, not a migration.', ro: 'DynamoDB on-demand se potrivește la modelul de plată, dar abandonează compatibilitatea SQL/MySQL — o rescriere, nu o migrare.' },
      { en: 'Redshift Serverless is for OLAP analytics on large datasets, not transactional MySQL workloads.', ro: 'Redshift Serverless e pentru analytics OLAP pe seturi mari de date, nu pentru workload-uri tranzacționale MySQL.' },
    ],
    references: [
      { label: 'Amazon Aurora Serverless v2', url: 'https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.html' },
    ],
    relatedServices: ['aurora', 'rds', 'dynamodb'],
    source: 'exam-guide',
  },
];
