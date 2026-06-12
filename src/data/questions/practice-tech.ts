import type { QuizQuestion } from '@/types';

/**
 * Original CLF-C02 practice questions — Domain 3: Cloud Technology and Services (34% of exam).
 * Exam-style questions written from AWS documentation + Stephane Maarek course.
 * Not actual exam questions (the real exam is under NDA). Each explanation says
 * why the correct answer is right and why the distractors are wrong.
 */
export const practiceTechQuestions: QuizQuestion[] = [
  {
    id: 'ptech-1',
    type: 'multiple_choice',
    difficulty: 2,
    categories: ['storage'],
    examDomain: 'tech-services',
    source: 'aws-docs',
    question: {
      en: 'A company runs a Linux application across several EC2 instances in multiple Availability Zones and needs all instances to read and write to the SAME shared file system. Which storage service should they use?',
      ro: 'O companie rulează o aplicație Linux pe mai multe instanțe EC2 în mai multe Availability Zone și are nevoie ca toate instanțele să citească și să scrie în ACELAȘI sistem de fișiere partajat. Ce serviciu de stocare ar trebui folosit?',
    },
    options: [
      { en: 'Amazon EBS', ro: 'Amazon EBS' },
      { en: 'Amazon EFS', ro: 'Amazon EFS' },
      { en: 'Amazon S3', ro: 'Amazon S3' },
      { en: 'Amazon S3 Glacier', ro: 'Amazon S3 Glacier' },
    ],
    correct: 1,
    explanation: {
      en: 'EFS is a managed, multi-AZ file system (NFS) that hundreds of Linux EC2 instances can mount and share at the same time — exactly the shared-access, multi-AZ need here. EBS is block storage attached to ONE instance in ONE AZ, so it cannot be shared across AZs. S3 is object storage accessed via API, not a mountable file system for a typical app. Glacier is cheap archival storage with retrieval delays, not live shared access.',
      ro: 'EFS este un sistem de fișiere managed, multi-AZ (NFS) pe care sute de instanțe EC2 Linux îl pot monta și partaja simultan — exact nevoia de acces partajat, multi-AZ de aici. EBS este stocare block atașată la O SINGURĂ instanță într-un SINGUR AZ, deci nu poate fi partajat între AZ-uri. S3 este object storage accesat prin API, nu un sistem de fișiere montabil pentru o aplicație tipică. Glacier este stocare ieftină de arhivă cu întârzieri la recuperare, nu acces partajat live.',
    },
    relatedServices: ['efs', 'ebs', 's3'],
  },
  {
    id: 'ptech-2',
    type: 'multiple_choice',
    difficulty: 2,
    categories: ['compute'],
    examDomain: 'tech-services',
    source: 'maarek',
    question: {
      en: 'A batch image-processing job is fault-tolerant and can resume if interrupted. The company wants the LOWEST possible compute cost and accepts that instances may be reclaimed by AWS. Which EC2 purchasing option fits best?',
      ro: 'Un job de procesare de imagini în batch este tolerant la erori și poate fi reluat dacă e întrerupt. Compania vrea costul de compute CEL MAI MIC posibil și acceptă ca instanțele să fie recuperate de AWS. Ce opțiune de achiziție EC2 se potrivește cel mai bine?',
    },
    options: [
      { en: 'Reserved Instances', ro: 'Reserved Instances' },
      { en: 'On-Demand Instances', ro: 'Instanțe On-Demand' },
      { en: 'Spot Instances', ro: 'Spot Instances' },
      { en: 'Dedicated Hosts', ro: 'Dedicated Hosts' },
    ],
    correct: 2,
    explanation: {
      en: 'Spot Instances give up to 90% off On-Demand by using spare AWS capacity, but AWS can reclaim them with a 2-minute warning — ideal for fault-tolerant, interruptible work like batch processing. Reserved Instances (up to ~75% off) require a 1- or 3-year commitment and suit steady, always-on workloads, not the cheapest interruptible case. On-Demand has no discount and no commitment. Dedicated Hosts are the most expensive option, used for compliance or bring-your-own-license, not cost savings.',
      ro: 'Spot Instances oferă până la 90% reducere față de On-Demand folosind capacitate AWS liberă, dar AWS le poate recupera cu un avertisment de 2 minute — ideal pentru muncă tolerantă la erori și întreruptibilă, precum procesarea în batch. Reserved Instances (până la ~75% reducere) necesită un angajament de 1 sau 3 ani și se potrivesc workload-urilor constante, mereu pornite, nu cazului întreruptibil cel mai ieftin. On-Demand nu are reducere și nici angajament. Dedicated Hosts sunt opțiunea cea mai scumpă, folosită pentru compliance sau bring-your-own-license, nu pentru economii.',
    },
    relatedServices: ['ec2'],
  },
  {
    id: 'ptech-3',
    type: 'multiple_choice',
    difficulty: 2,
    categories: ['database'],
    examDomain: 'tech-services',
    source: 'aws-docs',
    question: {
      en: 'A company runs Amazon RDS and wants automatic failover to a standby database in another Availability Zone if the primary fails, to maximize availability. Which RDS feature provides this?',
      ro: 'O companie rulează Amazon RDS și vrea failover automat către o bază de date standby din alt Availability Zone dacă primarul cade, pentru a maximiza disponibilitatea. Ce funcție RDS oferă asta?',
    },
    options: [
      { en: 'Read Replicas', ro: 'Read Replicas' },
      { en: 'Multi-AZ deployment', ro: 'Deployment Multi-AZ' },
      { en: 'RDS Storage Auto Scaling', ro: 'RDS Storage Auto Scaling' },
      { en: 'Automated backups', ro: 'Backup-uri automate' },
    ],
    correct: 1,
    explanation: {
      en: 'Multi-AZ keeps a synchronously-replicated standby in a different AZ and fails over automatically when the primary has a problem — this is the high-availability feature. Read Replicas are for SCALING read traffic (asynchronous copies you read from); they are not the automatic-failover HA mechanism. Storage Auto Scaling only grows disk space, not availability. Automated backups protect against data loss but do not provide instant failover. The classic exam trap is Multi-AZ (HA/failover) vs Read Replicas (read scaling).',
      ro: 'Multi-AZ menține un standby replicat sincron într-un alt AZ și face failover automat când primarul are o problemă — aceasta este funcția de înaltă disponibilitate. Read Replicas servesc la SCALAREA traficului de citire (copii asincrone din care citești); nu reprezintă mecanismul de failover automat HA. Storage Auto Scaling doar mărește spațiul pe disc, nu disponibilitatea. Backup-urile automate protejează împotriva pierderii de date dar nu oferă failover instant. Capcana clasică de examen este Multi-AZ (HA/failover) vs Read Replicas (scalare la citire).',
    },
    relatedServices: ['rds'],
  },
  {
    id: 'ptech-4',
    type: 'multiple_choice',
    difficulty: 2,
    categories: ['integration'],
    examDomain: 'tech-services',
    source: 'maarek',
    question: {
      en: 'When a new order is placed, a company needs to PUSH the same notification to multiple subscribers at once — an SQS queue, a Lambda function, and an email — using a one-to-many fan-out pattern. Which service is designed for this?',
      ro: 'Când se plasează o comandă nouă, o companie trebuie să TRIMITĂ (push) aceeași notificare către mai mulți abonați simultan — o coadă SQS, o funcție Lambda și un email — folosind un model fan-out unu-la-mulți. Ce serviciu e proiectat pentru asta?',
    },
    options: [
      { en: 'Amazon SQS', ro: 'Amazon SQS' },
      { en: 'Amazon SNS', ro: 'Amazon SNS' },
      { en: 'Amazon Kinesis Data Streams', ro: 'Amazon Kinesis Data Streams' },
      { en: 'AWS Step Functions', ro: 'AWS Step Functions' },
    ],
    correct: 1,
    explanation: {
      en: 'SNS is a pub/sub service that PUSHES a single published message to many subscribers at once (SQS queues, Lambda, email, HTTP) — the textbook fan-out, one-to-many pattern. SQS is the opposite model: a single queue that consumers PULL/poll from, used to decouple one producer and one consumer group, not to broadcast. Kinesis is for ordered real-time streaming/analytics, not simple notifications. Step Functions orchestrates sequential workflow steps, not message fan-out.',
      ro: 'SNS este un serviciu pub/sub care TRIMITE (push) un singur mesaj publicat către mulți abonați simultan (cozi SQS, Lambda, email, HTTP) — modelul fan-out, unu-la-mulți de manual. SQS este modelul opus: o singură coadă din care consumatorii TRAG (pull/poll), folosită pentru a decupla un producător și un grup de consumatori, nu pentru a difuza. Kinesis este pentru streaming/analiză în timp real ordonat, nu pentru notificări simple. Step Functions orchestrează pași secvențiali de workflow, nu fan-out de mesaje.',
    },
    relatedServices: ['sns', 'sqs'],
  },
  {
    id: 'ptech-5',
    type: 'multiple_choice',
    difficulty: 3,
    categories: ['analytics', 'database'],
    examDomain: 'tech-services',
    source: 'aws-docs',
    question: {
      en: 'A data team has terabytes of logs already stored in Amazon S3 and wants to run occasional ad-hoc SQL queries on them WITHOUT provisioning or managing any servers or clusters, paying only for the data each query scans. Which service fits best?',
      ro: 'O echipă de date are terabytes de log-uri deja stocate în Amazon S3 și vrea să ruleze ocazional interogări SQL ad-hoc pe ele FĂRĂ a provisiona sau gestiona servere ori clustere, plătind doar pentru datele scanate de fiecare interogare. Ce serviciu se potrivește cel mai bine?',
    },
    options: [
      { en: 'Amazon Redshift', ro: 'Amazon Redshift' },
      { en: 'Amazon Athena', ro: 'Amazon Athena' },
      { en: 'Amazon RDS', ro: 'Amazon RDS' },
      { en: 'Amazon EMR', ro: 'Amazon EMR' },
    ],
    correct: 1,
    explanation: {
      en: 'Athena is serverless and queries data directly in S3 using standard SQL, charging per TB scanned — perfect for occasional ad-hoc queries with no infrastructure to run. Redshift is a provisioned data-warehouse (OLAP) cluster you must size and manage, and you typically load data into it first; it suits sustained heavy analytics, not the serverless ad-hoc case. RDS is a relational OLTP database for transactional apps, not querying S3 files. EMR runs Hadoop/Spark clusters on EC2 that you provision and manage. The exam trap here is Athena (serverless query on S3) vs Redshift (managed warehouse).',
      ro: 'Athena este serverless și interoghează datele direct în S3 folosind SQL standard, taxând per TB scanat — perfect pentru interogări ad-hoc ocazionale, fără infrastructură de rulat. Redshift este un cluster de data-warehouse (OLAP) provisionat pe care trebuie să-l dimensionezi și să-l gestionezi, și de obicei încarci datele în el întâi; se potrivește analizelor grele susținute, nu cazului serverless ad-hoc. RDS este o bază de date relațională OLTP pentru aplicații tranzacționale, nu pentru interogarea fișierelor din S3. EMR rulează clustere Hadoop/Spark pe EC2 pe care le provisionezi și gestionezi. Capcana de examen aici este Athena (interogare serverless pe S3) vs Redshift (warehouse managed).',
    },
    relatedServices: ['athena', 's3', 'redshift'],
  },
  {
    id: 'ptech-6',
    type: 'multiple_choice',
    difficulty: 1,
    categories: ['compute'],
    examDomain: 'tech-services',
    source: 'maarek',
    question: {
      en: 'A developer wants to run short event-driven code (each run under a few seconds) in response to file uploads, without provisioning or managing any servers, paying only while the code runs. Which compute service is the best fit?',
      ro: 'Un dezvoltator vrea să ruleze cod scurt orientat pe evenimente (fiecare rulare sub câteva secunde) ca răspuns la upload-uri de fișiere, fără a provisiona sau gestiona servere, plătind doar cât rulează codul. Ce serviciu de compute se potrivește cel mai bine?',
    },
    options: [
      { en: 'AWS Lambda', ro: 'AWS Lambda' },
      { en: 'Amazon EC2', ro: 'Amazon EC2' },
      { en: 'AWS Fargate', ro: 'AWS Fargate' },
      { en: 'AWS Elastic Beanstalk', ro: 'AWS Elastic Beanstalk' },
    ],
    correct: 0,
    explanation: {
      en: 'Lambda runs your function code in response to events with no servers to manage, scales automatically, and bills only for execution time (functions can run up to 15 minutes) — ideal for short, event-driven tasks like reacting to an S3 upload. EC2 is a full virtual machine where YOU manage the OS and pay while it runs idle or not. Fargate runs containers serverlessly but is meant for packaged container workloads, not tiny function snippets. Elastic Beanstalk is a PaaS for deploying full web apps onto EC2/ELB, more than this lightweight need requires.',
      ro: 'Lambda rulează codul funcției tale ca răspuns la evenimente fără servere de gestionat, scalează automat și taxează doar timpul de execuție (funcțiile pot rula până la 15 minute) — ideal pentru sarcini scurte orientate pe evenimente, precum reacția la un upload în S3. EC2 este o mașină virtuală completă unde TU gestionezi sistemul de operare și plătești cât rulează, fie idle, fie nu. Fargate rulează containere serverless, dar e gândit pentru workload-uri în containere, nu pentru fragmente mici de funcții. Elastic Beanstalk este un PaaS pentru a deploya aplicații web complete pe EC2/ELB, mai mult decât cere această nevoie ușoară.',
    },
    relatedServices: ['lambda', 'fargate', 'ec2'],
  },
  {
    id: 'ptech-7',
    type: 'multiple_choice',
    difficulty: 3,
    categories: ['network'],
    examDomain: 'tech-services',
    source: 'aws-docs',
    question: {
      en: 'A security engineer wants to allow inbound HTTPS traffic to a single EC2 instance. With this firewall, when the instance replies, the return traffic is automatically allowed without adding a separate outbound rule. Which VPC feature has this stateful behavior?',
      ro: 'Un inginer de securitate vrea să permită trafic HTTPS de intrare către o singură instanță EC2. Cu acest firewall, când instanța răspunde, traficul de retur este permis automat fără a adăuga o regulă separată de ieșire. Ce funcție VPC are acest comportament stateful?',
    },
    options: [
      { en: 'Network ACL (NACL)', ro: 'Network ACL (NACL)' },
      { en: 'Security Group', ro: 'Security Group' },
      { en: 'Route table', ro: 'Tabel de rutare' },
      { en: 'Internet Gateway', ro: 'Internet Gateway' },
    ],
    correct: 1,
    explanation: {
      en: 'A Security Group is a STATEFUL firewall at the instance (ENI) level: if you allow an inbound request, the response is automatically allowed out — no matching outbound rule needed. A NACL is STATELESS and operates at the subnet level, so you must explicitly allow both the inbound request AND the outbound response; this is the key exam distinction. A route table directs traffic between destinations but does not filter/allow it like a firewall. An Internet Gateway connects a VPC to the internet; it is not a firewall rule set. The trap is Security Group (stateful, instance) vs NACL (stateless, subnet).',
      ro: 'Un Security Group este un firewall STATEFUL la nivel de instanță (ENI): dacă permiți o cerere de intrare, răspunsul este permis automat la ieșire — fără a fi nevoie de o regulă de ieșire corespunzătoare. Un NACL este STATELESS și operează la nivel de subnet, deci trebuie să permiți explicit ATÂT cererea de intrare CÂT și răspunsul de ieșire; aceasta este distincția cheie de examen. Un tabel de rutare direcționează traficul între destinații dar nu îl filtrează/permite precum un firewall. Un Internet Gateway conectează un VPC la internet; nu este un set de reguli de firewall. Capcana este Security Group (stateful, instanță) vs NACL (stateless, subnet).',
    },
    relatedServices: ['vpc', 'ec2'],
  },
  {
    id: 'ptech-8',
    type: 'multiple_choice',
    difficulty: 2,
    categories: ['network'],
    examDomain: 'tech-services',
    source: 'maarek',
    question: {
      en: 'A web application needs a load balancer that can route incoming HTTP/HTTPS requests to different target groups based on the URL path (for example, /api goes to one set of servers and /images to another). Which load balancer should be used?',
      ro: 'O aplicație web are nevoie de un load balancer care poate ruta cererile HTTP/HTTPS de intrare către grupuri de target diferite în funcție de calea URL (de exemplu, /api merge către un set de servere și /images către altul). Ce load balancer ar trebui folosit?',
    },
    options: [
      { en: 'Network Load Balancer (NLB)', ro: 'Network Load Balancer (NLB)' },
      { en: 'Application Load Balancer (ALB)', ro: 'Application Load Balancer (ALB)' },
      { en: 'Gateway Load Balancer (GWLB)', ro: 'Gateway Load Balancer (GWLB)' },
      { en: 'Classic Load Balancer (CLB)', ro: 'Classic Load Balancer (CLB)' },
    ],
    correct: 1,
    explanation: {
      en: 'An Application Load Balancer operates at Layer 7 (HTTP/HTTPS) and can route based on URL path, host header, and other content — exactly what path-based routing like /api vs /images requires. An NLB operates at Layer 4 (TCP/UDP) for ultra-low latency and cannot inspect URL paths. A GWLB is for inserting third-party network security appliances, not HTTP routing. The Classic Load Balancer is the legacy option and lacks modern path-based content routing. The exam trap is ALB (Layer 7 HTTP) vs NLB (Layer 4 TCP).',
      ro: 'Un Application Load Balancer operează la nivelul 7 (HTTP/HTTPS) și poate ruta în funcție de calea URL, host header și alt conținut — exact ce cere rutarea bazată pe cale, precum /api vs /images. Un NLB operează la nivelul 4 (TCP/UDP) pentru latență ultra-mică și nu poate inspecta căile URL. Un GWLB e pentru inserarea de appliance-uri de securitate de rețea terțe, nu pentru rutare HTTP. Classic Load Balancer este opțiunea moștenită și nu are rutare modernă de conținut bazată pe cale. Capcana de examen este ALB (nivelul 7 HTTP) vs NLB (nivelul 4 TCP).',
    },
    relatedServices: ['elb'],
  },
  {
    id: 'ptech-9',
    type: 'multiple_choice',
    difficulty: 1,
    categories: ['storage'],
    examDomain: 'tech-services',
    source: 'aws-docs',
    question: {
      en: 'A company must store years of compliance records that are almost never accessed, where a retrieval time of several hours is acceptable, and wants the LOWEST possible storage cost. Which S3 storage class is the best choice?',
      ro: 'O companie trebuie să stocheze ani de înregistrări de conformitate accesate aproape niciodată, unde un timp de recuperare de câteva ore este acceptabil, și vrea costul de stocare CEL MAI MIC posibil. Ce clasă de stocare S3 este cea mai bună alegere?',
    },
    options: [
      { en: 'S3 Standard', ro: 'S3 Standard' },
      { en: 'S3 Standard-Infrequent Access (Standard-IA)', ro: 'S3 Standard-Infrequent Access (Standard-IA)' },
      { en: 'S3 Glacier Deep Archive', ro: 'S3 Glacier Deep Archive' },
      { en: 'S3 Intelligent-Tiering', ro: 'S3 Intelligent-Tiering' },
    ],
    correct: 2,
    explanation: {
      en: 'S3 Glacier Deep Archive is the cheapest S3 storage class, built for long-term archival of rarely accessed data where retrieval times of hours are acceptable — exactly the compliance-record case. S3 Standard is the most expensive, meant for frequent access. Standard-IA is cheaper than Standard but still priced for occasional millisecond access, not deep archive. Intelligent-Tiering auto-moves objects between tiers when access patterns are unknown, adding monitoring cost; here the pattern is known (almost never accessed), so Deep Archive is cheaper.',
      ro: 'S3 Glacier Deep Archive este cea mai ieftină clasă de stocare S3, construită pentru arhivarea pe termen lung a datelor accesate rar, unde timpii de recuperare de ore sunt acceptabili — exact cazul înregistrărilor de conformitate. S3 Standard este cea mai scumpă, gândită pentru acces frecvent. Standard-IA este mai ieftină decât Standard dar tot tarifată pentru acces ocazional în milisecunde, nu pentru arhivă adâncă. Intelligent-Tiering mută automat obiectele între nivele când tiparele de acces sunt necunoscute, adăugând cost de monitorizare; aici tiparul este cunoscut (accesat aproape niciodată), deci Deep Archive este mai ieftin.',
    },
    relatedServices: ['s3', 'glacier'],
  },
  {
    id: 'ptech-10',
    type: 'multiple_choice',
    difficulty: 3,
    categories: ['database', 'analytics'],
    examDomain: 'tech-services',
    source: 'maarek',
    question: {
      en: 'A business intelligence team needs to run complex analytical queries (aggregations and joins) across petabytes of historical sales data in a columnar data warehouse optimized for OLAP. Which AWS service is purpose-built for this?',
      ro: 'O echipă de business intelligence trebuie să ruleze interogări analitice complexe (agregări și join-uri) pe petabytes de date istorice de vânzări într-un data warehouse columnar optimizat pentru OLAP. Ce serviciu AWS este construit special pentru asta?',
    },
    options: [
      { en: 'Amazon RDS for MySQL', ro: 'Amazon RDS pentru MySQL' },
      { en: 'Amazon DynamoDB', ro: 'Amazon DynamoDB' },
      { en: 'Amazon Redshift', ro: 'Amazon Redshift' },
      { en: 'Amazon ElastiCache', ro: 'Amazon ElastiCache' },
    ],
    correct: 2,
    explanation: {
      en: 'Amazon Redshift is a columnar, massively-parallel data warehouse purpose-built for OLAP — complex analytical queries and aggregations over very large datasets. RDS for MySQL is a row-based relational database optimized for OLTP (many small transactions), not petabyte-scale analytics. DynamoDB is a NoSQL key-value store for fast lookups, not complex joins and aggregations. ElastiCache is an in-memory cache (Redis/Memcached) for speeding up reads, not a warehouse. The exam trap is OLAP/data warehouse (Redshift) vs OLTP/transactional (RDS).',
      ro: 'Amazon Redshift este un data warehouse columnar, masiv-paralel, construit special pentru OLAP — interogări analitice complexe și agregări pe seturi de date foarte mari. RDS pentru MySQL este o bază de date relațională pe rânduri optimizată pentru OLTP (multe tranzacții mici), nu pentru analiză la scară de petabytes. DynamoDB este un magazin NoSQL cheie-valoare pentru căutări rapide, nu pentru join-uri și agregări complexe. ElastiCache este un cache în memorie (Redis/Memcached) pentru accelerarea citirilor, nu un warehouse. Capcana de examen este OLAP/data warehouse (Redshift) vs OLTP/tranzacțional (RDS).',
    },
    relatedServices: ['redshift', 'rds', 'dynamodb'],
  },
];
