import type { ExamDomain, QuizQuestion } from '@/types';

/**
 * SAA-C03 · Domain 2: Design Resilient Architectures (26% of scored content).
 * ID scheme: saa-res-### (3 digits, append-only — continue numbering at the end).
 * Every question MUST set `examDomain` explicitly.
 */
export const saaDesignResilientQuestions: Array<QuizQuestion & { examDomain: ExamDomain }> = [
  {
    id: 'saa-res-001',
    type: 'multiple_choice',
    difficulty: 4,
    categories: ['resilience', 'management'],
    examDomain: 'design-resilient',
    question: {
      en: 'A company needs a disaster recovery strategy for a business-critical application with an RTO of 10 minutes and an RPO of 1 minute, while keeping DR costs well below running a full second production environment. Which strategy should a solutions architect recommend?',
      ro: 'O companie are nevoie de o strategie de disaster recovery pentru o aplicație critică, cu RTO de 10 minute și RPO de 1 minut, menținând costurile DR mult sub rularea unui al doilea mediu de producție complet. Ce strategie ar trebui să recomande un solutions architect?',
    },
    options: [
      { en: 'Warm standby: a scaled-down but fully functional copy in the DR Region with continuous data replication', ro: 'Warm standby: o copie redusă ca scală, dar complet funcțională, în regiunea de DR, cu replicare continuă a datelor' },
      { en: 'Backup and restore: nightly backups copied to the DR Region', ro: 'Backup and restore: backup-uri nocturne copiate în regiunea de DR' },
      { en: 'Multi-site active-active: full production capacity in both Regions', ro: 'Multi-site active-active: capacitate completă de producție în ambele regiuni' },
      { en: 'Pilot light: only data replicated, with core infrastructure stopped and created at disaster time', ro: 'Pilot light: doar datele replicate, cu infrastructura de bază oprită și creată la momentul dezastrului' },
    ],
    correct: 0,
    explanation: {
      en: 'Warm standby keeps a smaller, always-running copy of the whole stack with continuous replication, so failover only needs scaling up — achievable within minutes (RTO 10 min) and near-zero data loss (RPO 1 min). Backup/restore has RTO/RPO of hours; active-active meets the numbers but doubles cost; pilot light typically needs tens of minutes to hours to provision compute before serving traffic.',
      ro: 'Warm standby menține o copie mai mică, mereu pornită, a întregului stack, cu replicare continuă — failover-ul cere doar scalare, realizabil în minute (RTO 10 min) și cu pierdere de date aproape zero (RPO 1 min). Backup/restore are RTO/RPO de ore; active-active atinge cifrele, dar dublează costul; pilot light are nevoie de obicei de zeci de minute–ore pentru a porni compute-ul înainte de a servi trafic.',
    },
    optionExplanations: [
      { en: 'Correct — warm standby is the standard answer for “minutes-level RTO/RPO at less than full production cost”.', ro: 'Corect — warm standby e răspunsul standard pentru „RTO/RPO de ordinul minutelor la cost sub producție completă".' },
      { en: 'Nightly backups mean an RPO of up to 24 hours and an RTO of hours — far outside the requirements.', ro: 'Backup-urile nocturne înseamnă RPO de până la 24 de ore și RTO de ore — mult în afara cerințelor.' },
      { en: 'Active-active meets RTO/RPO but is the MOST expensive strategy — the cost constraint rules it out.', ro: 'Active-active atinge RTO/RPO, dar e cea MAI scumpă strategie — constrângerea de cost o elimină.' },
      { en: 'Pilot light keeps data live but compute off; provisioning and scaling at disaster time usually exceeds a 10-minute RTO.', ro: 'Pilot light ține datele live, dar compute-ul oprit; pornirea și scalarea la momentul dezastrului depășesc de regulă un RTO de 10 minute.' },
    ],
    references: [
      { label: 'Disaster recovery options in the cloud (AWS Well-Architected)', url: 'https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html' },
    ],
    relatedServices: ['awsbackup', 'route53'],
    source: 'exam-guide',
  },
  {
    id: 'saa-res-002',
    type: 'multiple_choice',
    difficulty: 3,
    categories: ['integration', 'resilience'],
    examDomain: 'design-resilient',
    question: {
      en: 'A web application accepts image-processing jobs that spike unpredictably. The processing tier sometimes crashes under load and jobs are lost. How should the architecture be changed so that no job is lost and the tiers scale independently?',
      ro: 'O aplicație web primește job-uri de procesare de imagini cu vârfuri imprevizibile. Nivelul de procesare cade uneori sub sarcină și job-urile se pierd. Cum ar trebui schimbată arhitectura astfel încât niciun job să nu se piardă și nivelurile să scaleze independent?',
    },
    options: [
      { en: 'Put an Amazon SQS queue between the web tier and the processing tier; scale consumers on queue depth', ro: 'Pune o coadă Amazon SQS între nivelul web și cel de procesare; scalează consumatorii după adâncimea cozii' },
      { en: 'Send jobs to an Amazon SNS topic that invokes the processing instances directly', ro: 'Trimite job-urile către un topic Amazon SNS care invocă direct instanțele de procesare' },
      { en: 'Double the size of the processing instances (vertical scaling)', ro: 'Dublează dimensiunea instanțelor de procesare (scalare verticală)' },
      { en: 'Use an Application Load Balancer to spread jobs across the processing instances', ro: 'Folosește un Application Load Balancer pentru a distribui job-urile către instanțele de procesare' },
    ],
    correct: 0,
    explanation: {
      en: 'A queue decouples producers from consumers: bursts are buffered durably in SQS, nothing is lost if the processing tier fails (unacknowledged messages reappear after the visibility timeout), and an Auto Scaling policy on queue depth scales consumers independently. SNS is push-based with no durable buffering for slow consumers; vertical scaling and an ALB keep the tiers tightly coupled — synchronous requests still fail when the tier is down.',
      ro: 'O coadă decuplează producătorii de consumatori: vârfurile sunt stocate durabil în SQS, nimic nu se pierde dacă nivelul de procesare cade (mesajele neconfirmate reapar după visibility timeout), iar o politică de Auto Scaling pe adâncimea cozii scalează consumatorii independent. SNS e push, fără buffering durabil pentru consumatori lenți; scalarea verticală și ALB păstrează cuplarea strânsă — cererile sincrone tot eșuează când nivelul e căzut.',
    },
    optionExplanations: [
      { en: 'Correct — SQS is the canonical decoupling buffer: durable storage of jobs plus scaling on ApproximateNumberOfMessagesVisible.', ro: 'Corect — SQS e buffer-ul canonic de decuplare: stocare durabilă a job-urilor plus scalare pe ApproximateNumberOfMessagesVisible.' },
      { en: 'SNS pushes immediately to subscribers; if the processing tier is down or slow, messages are not buffered for later polling (unless paired with SQS).', ro: 'SNS împinge imediat către abonați; dacă nivelul de procesare e căzut sau lent, mesajele nu sunt stocate pentru polling ulterior (decât combinat cu SQS).' },
      { en: 'Bigger instances raise the ceiling but keep the coupling — a crash still loses in-flight jobs, and spikes can exceed any single size.', ro: 'Instanțe mai mari ridică plafonul, dar păstrează cuplarea — un crash tot pierde job-urile în curs, iar vârfurile pot depăși orice dimensiune.' },
      { en: 'An ALB balances synchronous requests; it does not buffer or persist jobs, so failures during spikes still lose work.', ro: 'ALB balansează cereri sincrone; nu stochează job-uri, deci căderile în timpul vârfurilor tot pierd lucrul.' },
    ],
    references: [
      { label: 'Scaling based on Amazon SQS (EC2 Auto Scaling)', url: 'https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-using-sqs-queue.html' },
    ],
    relatedServices: ['sqs', 'sns', 'ec2'],
    source: 'exam-guide',
  },
  {
    id: 'saa-res-003',
    type: 'multiple_choice',
    difficulty: 3,
    categories: ['database', 'resilience'],
    examDomain: 'design-resilient',
    question: {
      en: 'An Amazon RDS for MySQL database backs a critical application. The company requires the database to fail over automatically, without manual intervention, if the database instance or its Availability Zone fails. What should a solutions architect configure?',
      ro: 'O bază de date Amazon RDS for MySQL susține o aplicație critică. Compania cere ca baza de date să facă failover automat, fără intervenție manuală, dacă instanța sau Availability Zone-ul ei cade. Ce ar trebui să configureze un solutions architect?',
    },
    options: [
      { en: 'Enable Multi-AZ deployment with a synchronous standby replica', ro: 'Activează deployment Multi-AZ cu o replică standby sincronă' },
      { en: 'Create a read replica in another Availability Zone', ro: 'Creează un read replica în alt Availability Zone' },
      { en: 'Take automated snapshots every 5 minutes and restore on failure', ro: 'Fă snapshot-uri automate la fiecare 5 minute și restaurează la eșec' },
      { en: 'Put the database behind an Application Load Balancer with health checks', ro: 'Pune baza de date în spatele unui Application Load Balancer cu health checks' },
    ],
    correct: 0,
    explanation: {
      en: 'RDS Multi-AZ maintains a synchronously replicated standby in another AZ and fails over automatically (typically 1–2 minutes) — the DNS endpoint stays the same. Read replicas use asynchronous replication and require manual promotion, so they are for read scaling, not automatic HA. Snapshots restore slowly with data loss, and ALB cannot front an RDS database.',
      ro: 'RDS Multi-AZ menține un standby replicat sincron în alt AZ și face failover automat (de regulă 1–2 minute) — endpoint-ul DNS rămâne același. Read replica folosește replicare asincronă și cere promovare manuală, deci e pentru scalarea citirilor, nu pentru HA automată. Snapshot-urile se restaurează lent și cu pierdere de date, iar ALB nu poate sta în fața unei baze RDS.',
    },
    optionExplanations: [
      { en: 'Correct — Multi-AZ is exactly “automatic failover with synchronous replication”; this discrimination (Multi-AZ = HA vs read replica = performance) is a classic SAA exam point.', ro: 'Corect — Multi-AZ înseamnă exact „failover automat cu replicare sincronă"; distincția (Multi-AZ = HA vs read replica = performanță) e un punct clasic de examen SAA.' },
      { en: 'Read replicas are asynchronous and must be promoted manually — no automatic failover.', ro: 'Read replica e asincronă și trebuie promovată manual — fără failover automat.' },
      { en: 'Restoring from snapshots takes tens of minutes and loses data since the last snapshot — neither automatic nor fast.', ro: 'Restaurarea din snapshot durează zeci de minute și pierde datele de după ultimul snapshot — nici automată, nici rapidă.' },
      { en: 'ALB balances HTTP/HTTPS traffic to targets like EC2/ECS — it does not manage database failover.', ro: 'ALB balansează trafic HTTP/HTTPS către ținte precum EC2/ECS — nu gestionează failover de baze de date.' },
    ],
    references: [
      { label: 'Amazon RDS Multi-AZ deployments', url: 'https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html' },
    ],
    relatedServices: ['rds'],
    source: 'exam-guide',
  },
  {
    id: 'saa-res-004',
    type: 'multiple_choice',
    difficulty: 4,
    categories: ['network', 'resilience'],
    examDomain: 'design-resilient',
    question: {
      en: 'A company serves its main web application from one AWS Region. If the application becomes unavailable, users must automatically be redirected to a static “service status” page hosted in Amazon S3, without manual DNS changes. How can this be achieved?',
      ro: 'O companie servește aplicația web principală dintr-o singură regiune AWS. Dacă aplicația devine indisponibilă, utilizatorii trebuie redirecționați automat către o pagină statică de „status" găzduită în Amazon S3, fără schimbări manuale de DNS. Cum se poate obține asta?',
    },
    options: [
      { en: 'Route 53 failover routing: primary record with a health check on the application, secondary record pointing to the S3 static website', ro: 'Route 53 failover routing: înregistrare primară cu health check pe aplicație, înregistrare secundară către site-ul static din S3' },
      { en: 'Route 53 weighted routing with 50/50 weights between the application and the S3 page', ro: 'Route 53 weighted routing cu ponderi 50/50 între aplicație și pagina S3' },
      { en: 'An Application Load Balancer with the S3 bucket as a second target group', ro: 'Un Application Load Balancer cu bucket-ul S3 ca al doilea target group' },
      { en: 'Route 53 latency-based routing between the application and the S3 page', ro: 'Route 53 latency-based routing între aplicație și pagina S3' },
    ],
    correct: 0,
    explanation: {
      en: 'Failover routing is Route 53’s active-passive pattern: the health check monitors the primary endpoint, and when it fails, DNS answers switch automatically to the secondary (the S3 static website). Weighted 50/50 would send half of the traffic to the status page even when healthy; an ALB cannot target an S3 bucket; latency routing chooses the fastest endpoint, not a healthy-vs-backup pair.',
      ro: 'Failover routing e pattern-ul activ-pasiv din Route 53: health check-ul monitorizează endpoint-ul primar, iar când acesta pică, răspunsurile DNS comută automat pe secundar (site-ul static S3). Weighted 50/50 ar trimite jumătate din trafic pe pagina de status și când totul e sănătos; ALB nu poate avea un bucket S3 ca țintă; latency routing alege endpoint-ul cel mai rapid, nu o pereche healthy-vs-backup.',
    },
    optionExplanations: [
      { en: 'Correct — failover routing + health checks is the standard low-cost DR front door for an active-passive setup.', ro: 'Corect — failover routing + health checks e soluția standard, ieftină, de „ușă din față" DR pentru activ-pasiv.' },
      { en: 'Weighted routing splits traffic by percentages regardless of health (unless combined with health checks it still serves the backup constantly).', ro: 'Weighted routing împarte traficul procentual indiferent de sănătate — pagina de backup ar primi trafic permanent.' },
      { en: 'ALB target groups contain EC2 instances, IPs, or Lambda functions — not S3 buckets/websites.', ro: 'Target group-urile ALB conțin instanțe EC2, IP-uri sau funcții Lambda — nu bucket-uri/site-uri S3.' },
      { en: 'Latency-based routing optimizes for speed across healthy endpoints; it is not an active-passive failover mechanism.', ro: 'Latency-based routing optimizează viteza între endpoint-uri sănătoase; nu e un mecanism de failover activ-pasiv.' },
    ],
    references: [
      { label: 'Route 53 failover routing', url: 'https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-failover.html' },
      { label: 'Active-passive failover (Route 53)', url: 'https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-types.html' },
    ],
    relatedServices: ['route53', 's3'],
    source: 'exam-guide',
  },
];
