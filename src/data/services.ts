import type { Service } from '@/types';
import { databaseServices } from './services-database';
import { networkServices } from './services-network';
import { securityServices } from './services-security';
import { managementServices } from './services-management';
import { integrationServices } from './services-integration';
import { analyticsServices } from './services-analytics';
import { migrationServices, billingServices, enduserServices } from './services-rest';
import { saaServices } from './services-saa';
import { saaSecurityServices } from './services-saa-security';
import { saaDatabaseServices } from './services-saa-database';
import { saaAnalyticsServices } from './services-saa-analytics';

/**
 * AWS Certified Cloud Practitioner (CLF-C02) services.
 * Source: AWS official docs + Stephane Maarek's CLF-C02 course PDF + aws-map.html.
 * All content verified against AWS documentation.
 */

// ============================================================
// COMPUTE (11 services)
// ============================================================

const computeServices: Service[] = [
  {
    id: 'ec2',
    abbreviation: 'EC2',
    fullName: 'Elastic Compute Cloud',
    category: 'compute',
    level: 'clf',
    difficulty: 2,
    examFrequency: 'high',
    description: {
      en: 'Virtual servers in the cloud — choose CPU, RAM, OS, and run any application.',
      ro: 'Servere virtuale în cloud — alegi CPU, RAM, OS și rulezi orice aplicație.',
    },
    analogy: {
      en: 'Like renting a custom-built PC by the hour. Stop paying when you turn it off.',
      ro: 'Ca închiriatul unui PC custom pe oră. Te oprești din plată când îl închizi.',
    },
    examTips: [
      { key: 'on_demand', content: { en: 'On-Demand: pay per second, no commitment, highest cost.', ro: 'On-Demand: plătești pe secundă, fără angajament, cel mai scump.' } },
      { key: 'reserved', content: { en: 'Reserved Instances: up to 72% off for 1-3 year commitment.', ro: 'Reserved: până la 72% reducere pentru 1-3 ani angajament.' } },
      { key: 'spot', content: { en: 'Spot Instances: up to 90% off, can be terminated with 2-min notice.', ro: 'Spot: până la 90% reducere, pot fi oprite cu preaviz 2 min.' } },
      { key: 'dedicated', content: { en: 'Dedicated Hosts: physical server for compliance, BYOL licenses.', ro: 'Dedicated Hosts: server fizic pentru compliance, licențe BYOL.' } },
      { key: 'savings_plans', content: { en: 'Savings Plans: 1 or 3 year commitment, more flexible than RI.', ro: 'Savings Plans: 1 sau 3 ani, mai flexibil decât Reserved Instances.' } },
      { key: 'security_groups', content: { en: 'Security Groups = stateful firewall at the instance level.', ro: 'Security Groups = firewall stateful la nivel de instanță.' } },
      { key: 'user_data', content: { en: 'User Data = bootstrap script run once at first launch.', ro: 'User Data = script bootstrap rulat la prima pornire.' } },
      { key: 'ami', content: { en: 'AMI = template (OS + software) used to launch instances.', ro: 'AMI = template (OS + software) folosit la lansare instanțe.' } },
    ],
    pricing: {
      en: 'Per-second billing · 4 pricing models · t2.micro free tier (750h/month)',
      ro: 'Facturare pe secundă · 4 modele preț · t2.micro free tier (750h/lună)',
    },
    connections: ['ebs', 'elb', 'vpc', 'cloudwatch', 'iam', 'ami', 'autoscaling'],
    docsUrl: 'https://docs.aws.amazon.com/ec2/',
    visual: { color: 'hsl(217, 91%, 60%)', icon: 'server' },
    howItWorks: [
      { en: 'Pick an AMI (the OS + software template) and an instance type (the CPU/RAM size).', ro: 'Alegi un AMI (template OS + software) și un instance type (mărimea CPU/RAM).' },
      { en: 'Choose a pricing model, a VPC subnet, and attach a Security Group (the firewall).', ro: 'Alegi modelul de preț, un subnet în VPC și atașezi un Security Group (firewall-ul).' },
      { en: 'Optionally add a User Data script that bootstraps the instance on first boot.', ro: 'Opțional adaugi un script User Data care configurează instanța la prima pornire.' },
      { en: 'Launch — the instance boots in one specific AZ; you pay only while it runs.', ro: 'Lansezi — instanța pornește într-un AZ specific; plătești doar cât rulează.' },
    ],
    keyFacts: [
      { en: 'IaaS: you control the OS, patching, and installed software.', ro: 'IaaS: tu controlezi OS-ul, patch-urile și software-ul instalat.' },
      { en: 'An instance lives in ONE Availability Zone (not spread across AZs).', ro: 'O instanță trăiește într-UN singur AZ (nu se întinde pe mai multe).' },
      { en: '5 instance families: General Purpose, Compute, Memory, Storage, Accelerated.', ro: '5 familii: General Purpose, Compute, Memory, Storage, Accelerated.' },
      { en: 'Security Group = stateful (return traffic auto-allowed); only ALLOW rules.', ro: 'Security Group = stateful (traficul de retur e auto-permis); doar reguli ALLOW.' },
      { en: 'You can stop, hibernate, reboot, or terminate an instance.', ro: 'Poți să oprești, hibernezi, repornești sau termini o instanță.' },
    ],
    keyNumbers: [
      { label: { en: 'On-Demand min billing', ro: 'Facturare minimă On-Demand' }, value: { en: '60 seconds', ro: '60 secunde' } },
      { label: { en: 'Reserved Instance discount', ro: 'Reducere Reserved' }, value: { en: 'up to 75%', ro: 'până la 75%' } },
      { label: { en: 'Spot discount', ro: 'Reducere Spot' }, value: { en: 'up to 90%', ro: 'până la 90%' } },
      { label: { en: 'Spot termination notice', ro: 'Preaviz oprire Spot' }, value: { en: '2 minutes', ro: '2 minute' } },
      { label: { en: 'RI / Savings Plan term', ro: 'Termen RI / Savings Plan' }, value: { en: '1 or 3 years', ro: '1 sau 3 ani' } },
    ],
    whenToUse: [
      { en: 'You need full control over the OS (custom software, specific kernel, licenses).', ro: 'Ai nevoie de control total pe OS (software custom, kernel specific, licențe).' },
      { en: 'Long-running, steady workloads (web/app servers, databases on EC2).', ro: 'Workload-uri constante, de durată (servere web/app, baze de date pe EC2).' },
      { en: 'Predictable usage → commit with Reserved Instances or Savings Plans to save.', ro: 'Utilizare predictibilă → te angajezi cu Reserved sau Savings Plans ca să economisești.' },
    ],
    whenNotToUse: [
      { en: 'Short, event-driven code with no server to manage → use Lambda instead.', ro: 'Cod scurt, declanșat de evenimente, fără server de gestionat → folosește Lambda.' },
      { en: 'You just want to run containers without managing servers → ECS Fargate.', ro: 'Vrei doar să rulezi containere fără să gestionezi servere → ECS Fargate.' },
      { en: 'Fault-tolerant batch jobs that can be interrupted → use Spot Instances.', ro: 'Job-uri batch tolerante la întreruperi → folosește Spot Instances.' },
    ],
    examTraps: [
      { en: 'Security Groups are STATEFUL and have only ALLOW rules; NACLs are stateless with ALLOW+DENY.', ro: 'Security Groups sunt STATEFUL și au doar reguli ALLOW; NACL-urile sunt stateless cu ALLOW+DENY.' },
      { en: '"Up to 90% off" = Spot. "Up to 75% off + commitment" = Reserved. Don\'t swap them.', ro: '„Până la 90%” = Spot. „Până la 75% + angajament” = Reserved. Nu le confunda.' },
      { en: 'Savings Plans = commit to $/hour of compute (flexible across instance family); RI = commit to a specific instance.', ro: 'Savings Plans = te angajezi la $/oră de compute (flexibil pe familii); RI = te angajezi la o instanță anume.' },
      { en: 'EC2 instance store is EPHEMERAL — data is lost on stop/terminate. EBS persists.', ro: 'EC2 instance store e EFEMER — datele se pierd la stop/terminate. EBS persistă.' },
    ],
    retrievalQuestions: [
      { q: { en: 'Which EC2 pricing model gives up to 90% off but can be terminated with 2 minutes notice?', ro: 'Ce model de preț EC2 dă până la 90% reducere dar poate fi oprit cu preaviz de 2 minute?' }, a: { en: 'Spot Instances — they use spare AWS capacity, ideal for fault-tolerant, interruptible workloads.', ro: 'Spot Instances — folosesc capacitatea liberă AWS, ideale pentru workload-uri tolerante la întreruperi.' } },
      { q: { en: 'Are Security Groups stateful or stateless, and do they support DENY rules?', ro: 'Security Groups sunt stateful sau stateless, și suportă reguli DENY?' }, a: { en: 'Stateful (return traffic is automatically allowed) and they support ONLY allow rules — no explicit deny.', ro: 'Stateful (traficul de retur e auto-permis) și suportă DOAR reguli allow — fără deny explicit.' } },
      { q: { en: 'What is a User Data script and when does it run?', ro: 'Ce este un script User Data și când rulează?' }, a: { en: 'A bootstrap script that runs once, at the instance\'s first launch, to install/configure software automatically.', ro: 'Un script bootstrap care rulează o singură dată, la prima pornire a instanței, pentru a instala/configura software automat.' } },
      { q: { en: 'What is the difference between Savings Plans and Reserved Instances?', ro: 'Care e diferența între Savings Plans și Reserved Instances?' }, a: { en: 'Savings Plans commit to a $/hour amount of compute (flexible across families/regions); RIs commit to a specific instance type. Both need a 1- or 3-year term.', ro: 'Savings Plans se angajează la o sumă $/oră de compute (flexibil pe familii/regiuni); RI se angajează la un tip de instanță anume. Ambele cer 1 sau 3 ani.' } },
    ],
    diagram: {
      steps: [
        { en: 'AMI (template)', ro: 'AMI (template)' },
        { en: 'EC2 instance', ro: 'Instanță EC2' },
        { en: 'EBS volume', ro: 'Volum EBS' },
        { en: 'Security Group', ro: 'Security Group' },
      ],
      altText: { en: 'An AMI launches an EC2 instance, which attaches an EBS volume and is protected by a Security Group.', ro: 'Un AMI lansează o instanță EC2, care atașează un volum EBS și e protejată de un Security Group.' },
    },
    mermaidDiagram: {
      code: `flowchart LR
  AMI[AMI template] --> EC2(EC2 instance)
  EC2 --- EBS[(EBS volume)]
  User([User]) -->|HTTPS| SG{{Security Group}}
  SG --> EC2`,
      caption: { en: 'An AMI launches the instance; user traffic passes the Security Group; an EBS volume stores its data.', ro: 'Un AMI lansează instanța; traficul trece de Security Group; un volum EBS îi stochează datele.' },
    },
  },
  {
    id: 'lambda',
    abbreviation: 'Lambda',
    fullName: 'AWS Lambda',
    category: 'compute',
    level: 'clf',
    difficulty: 2,
    examFrequency: 'high',
    description: {
      en: 'Serverless functions — run code in response to events without managing servers.',
      ro: 'Funcții serverless — rulezi cod ca răspuns la evenimente, fără servere de gestionat.',
    },
    analogy: {
      en: 'Like a contractor you call only when needed — no salary when idle.',
      ro: 'Ca un freelancer chemat doar când ai nevoie — niciun salariu când e liber.',
    },
    examTips: [
      { key: 'timeout', content: { en: 'Maximum execution time: 15 minutes per invocation.', ro: 'Timp maxim execuție: 15 minute per invocare.' } },
      { key: 'memory', content: { en: 'Memory: 128 MB to 10 GB; CPU scales with memory.', ro: 'Memorie: 128 MB până la 10 GB; CPU scalează cu memoria.' } },
      { key: 'triggers', content: { en: 'Triggers: S3, SQS, API Gateway, EventBridge, DynamoDB Streams.', ro: 'Triggere: S3, SQS, API Gateway, EventBridge, DynamoDB Streams.' } },
      { key: 'pricing', content: { en: 'Billed per request + duration × memory (free tier: 1M req/month).', ro: 'Facturat per request + durată × memorie (free tier: 1M req/lună).' } },
      { key: 'languages', content: { en: 'Supports Node.js, Python, Java, .NET, Ruby, Go, custom runtimes.', ro: 'Suportă Node.js, Python, Java, .NET, Ruby, Go, runtime custom.' } },
      { key: 'cold_start', content: { en: 'Cold start latency mitigated with Provisioned Concurrency.', ro: 'Latența cold start redusă cu Provisioned Concurrency.' } },
      { key: 'limits', content: { en: 'Limits: /tmp 512 MB–10 GB, env vars 4 KB, deploy 50 MB zipped / 250 MB unzipped.', ro: 'Limite: /tmp 512 MB–10 GB, env vars 4 KB, deploy 50 MB arhivat / 250 MB dezarhivat.' } },
      { key: 'concurrency', content: { en: 'Default 1,000 concurrent executions per region (soft limit); over it = throttling.', ro: 'Implicit 1.000 de execuții concurente per regiune (limită soft); peste = throttling.' } },
      { key: 'vpc', content: { en: 'To reach private resources (RDS, ElastiCache) Lambda must be deployed IN your VPC (creates an ENI).', ro: 'Ca să atingă resurse private (RDS, ElastiCache), Lambda trebuie pusă ÎN VPC-ul tău (creează un ENI).' } },
    ],
    pricing: {
      en: 'Free tier: 1M requests/month + 400,000 GB-seconds free.',
      ro: 'Free tier: 1M cereri/lună + 400,000 GB-secunde gratuit.',
    },
    connections: ['s3', 'dynamodb', 'apigateway', 'sqs', 'sns', 'eventbridge', 'cloudwatch', 'iam'],
    docsUrl: 'https://docs.aws.amazon.com/lambda/',
    visual: { color: 'hsl(217, 91%, 60%)', icon: 'zap' },
    examDomains: ['design-performant', 'design-cost'],
    howItWorks: [
      { en: 'You upload your code as a function (no server to provision).', ro: 'Încarci codul ca o funcție (niciun server de provizionat).' },
      { en: 'An event source (S3 upload, API call, schedule, queue) triggers the function.', ro: 'O sursă de eveniment (upload S3, apel API, schedule, coadă) declanșează funcția.' },
      { en: 'AWS runs the code, scales automatically to the number of events, then stops.', ro: 'AWS rulează codul, scalează automat la numărul de evenimente, apoi se oprește.' },
      { en: 'You pay only for the requests and the compute time actually used.', ro: 'Plătești doar cererile și timpul de compute folosit efectiv.' },
    ],
    keyFacts: [
      { en: 'Serverless: no servers to manage, automatic scaling, pay-per-use — scales to zero when idle.', ro: 'Serverless: niciun server de gestionat, scalare automată, plătești la utilizare — scalează la zero când e inactivă.' },
      { en: 'Cold start = first-call latency; Provisioned Concurrency pre-initializes instances so it never happens; SnapStart (Java/Python/.NET) restores from a snapshot at no extra cost.', ro: 'Cold start = latența la prima apelare; Provisioned Concurrency pre-inițializează instanțe ca să nu apară; SnapStart (Java/Python/.NET) restaurează dintr-un snapshot fără cost extra.' },
      { en: 'Reserved concurrency = a per-function limit; invocations over the limit get throttled.', ro: 'Reserved concurrency = o limită per funcție; invocările peste limită sunt throttled.' },
      { en: 'By default Lambda runs OUTSIDE your VPC — for RDS/ElastiCache/internal ELB it must be configured in your VPC (subnets + SG, creates an ENI).', ro: 'Implicit Lambda rulează ÎN AFARA VPC-ului tău — pentru RDS/ElastiCache/ELB intern trebuie configurată în VPC (subneturi + SG, creează un ENI).' },
      { en: 'Increasing memory (128 MB–10 GB) also increases CPU and network proportionally — the standard fix for a slow, compute-bound function.', ro: 'Creșterea memoriei (128 MB–10 GB) crește proporțional și CPU-ul și rețeaua — fix-ul standard pentru o funcție lentă, limitată de compute.' },
    ],
    keyNumbers: [
      { label: { en: 'Max execution time', ro: 'Timp maxim de execuție' }, value: { en: '15 minutes', ro: '15 minute' } },
      { label: { en: 'Memory range', ro: 'Interval memorie' }, value: { en: '128 MB – 10 GB', ro: '128 MB – 10 GB' } },
      { label: { en: 'Free tier requests', ro: 'Cereri free tier' }, value: { en: '1M / month', ro: '1M / lună' } },
      { label: { en: 'Free tier compute', ro: 'Compute free tier' }, value: { en: '400,000 GB-s', ro: '400.000 GB-s' } },
      { label: { en: 'Default concurrency limit', ro: 'Limită concurență implicită' }, value: { en: '1,000 / region (can be raised)', ro: '1.000 / regiune (poate fi crescută)' } },
      { label: { en: 'Ephemeral storage (/tmp)', ro: 'Stocare efemeră (/tmp)' }, value: { en: '512 MB – 10 GB', ro: '512 MB – 10 GB' } },
      { label: { en: 'Deployment package', ro: 'Pachet de deploy' }, value: { en: '50 MB zipped / 250 MB unzipped', ro: '50 MB arhivat / 250 MB dezarhivat' } },
      { label: { en: 'Environment variables', ro: 'Variabile de mediu' }, value: { en: '4 KB total', ro: '4 KB total' } },
    ],
    whenToUse: [
      { en: 'Short, event-driven tasks: process an S3 upload, respond to an API call, run on a schedule.', ro: 'Sarcini scurte declanșate de evenimente: procesezi un upload S3, răspunzi la un API, rulezi pe schedule.' },
      { en: 'Spiky or unpredictable traffic where you don\'t want to pay for idle servers.', ro: 'Trafic în salturi sau impredictibil unde nu vrei să plătești servere inactive.' },
      { en: 'Glue between services (e.g. S3 → Lambda → DynamoDB).', ro: 'Liant între servicii (ex: S3 → Lambda → DynamoDB).' },
    ],
    whenNotToUse: [
      { en: 'Jobs longer than 15 minutes → use EC2, ECS/Fargate, or AWS Batch.', ro: 'Job-uri mai lungi de 15 minute → folosește EC2, ECS/Fargate sau AWS Batch.' },
      { en: 'You need full OS control or a specific kernel → use EC2.', ro: 'Ai nevoie de control total pe OS sau un kernel specific → folosește EC2.' },
      { en: 'Constant, heavy 24/7 compute → a reserved EC2 instance is often cheaper.', ro: 'Compute greu, constant 24/7 → o instanță EC2 reservată e adesea mai ieftină.' },
    ],
    examTraps: [
      { en: 'Lambda = serverless / FaaS. If a question says "no servers to manage" + "event-driven", it\'s Lambda.', ro: 'Lambda = serverless / FaaS. Dacă întrebarea zice „fără servere de gestionat” + „event-driven”, e Lambda.' },
      { en: 'Hard 15-minute limit — a "long-running" or "batch" job is the trap answer for Lambda.', ro: 'Limită strictă de 15 minute — un job „de durată” sau „batch” e răspunsul-capcană pentru Lambda.' },
      { en: 'Lambda is for code; Fargate is for containers. Both are serverless compute.', ro: 'Lambda e pentru cod; Fargate e pentru containere. Ambele sunt compute serverless.' },
      { en: 'Throttling behavior differs by invocation type: SYNCHRONOUS → the caller gets a 429 ThrottleError; ASYNCHRONOUS → Lambda retries with backoff for up to 6 hours, then sends the event to a DLQ.', ro: 'Comportamentul la throttling diferă după tipul invocării: SINCRON → apelantul primește 429 ThrottleError; ASINCRON → Lambda reîncearcă cu backoff până la 6 ore, apoi trimite evenimentul într-un DLQ.' },
      { en: '"Lambda cannot connect to RDS/ElastiCache" → it is not in the VPC. Configure VPC + subnets + security group; for many connections add RDS Proxy (which is VPC-only).', ro: '„Lambda nu se poate conecta la RDS/ElastiCache” → nu e în VPC. Configurezi VPC + subneturi + security group; pentru multe conexiuni adaugi RDS Proxy (care e doar în VPC).' },
      { en: 'Reserved concurrency LIMITS a function (and protects the rest of the pool); Provisioned Concurrency PRE-WARMS instances to kill cold starts. They answer different questions.', ro: 'Reserved concurrency LIMITEAZĂ o funcție (și protejează restul pool-ului); Provisioned Concurrency PRE-ÎNCĂLZEȘTE instanțe ca să elimine cold starts. Răspund la întrebări diferite.' },
      { en: 'Edge compute: CloudFront Functions = JS-only, sub-ms, viewer request/response only; Lambda@Edge = Node/Python, can access origin request/response, body, and make network calls.', ro: 'Edge compute: CloudFront Functions = doar JS, sub-ms, doar viewer request/response; Lambda@Edge = Node/Python, are acces la origin request/response, body și poate face apeluri de rețea.' },
    ],
    retrievalQuestions: [
      { q: { en: 'What is the maximum execution time of a single Lambda invocation?', ro: 'Care e timpul maxim de execuție al unei invocări Lambda?' }, a: { en: '15 minutes. For longer work use EC2, Fargate, or AWS Batch.', ro: '15 minute. Pentru ceva mai lung folosești EC2, Fargate sau AWS Batch.' } },
      { q: { en: 'In the AWS shared model, why is Lambda called "serverless"?', ro: 'În modelul AWS, de ce e Lambda numit „serverless”?' }, a: { en: 'AWS manages all the servers, scaling, and patching; you only provide code. It can scale to zero and you pay per request + duration.', ro: 'AWS gestionează toate serverele, scalarea și patch-urile; tu dai doar codul. Scalează la zero și plătești per cerere + durată.' } },
      { q: { en: 'Name three common Lambda event triggers.', ro: 'Numește trei triggere comune pentru Lambda.' }, a: { en: 'Any of: S3 events, API Gateway, EventBridge (schedule), SQS, DynamoDB Streams, SNS.', ro: 'Oricare din: evenimente S3, API Gateway, EventBridge (schedule), SQS, DynamoDB Streams, SNS.' } },
      { q: { en: 'What happens when a synchronous vs an asynchronous invocation hits the concurrency limit?', ro: 'Ce se întâmplă când o invocare sincronă vs asincronă lovește limita de concurență?' }, a: { en: 'Synchronous: the caller receives a 429 ThrottleError. Asynchronous: Lambda retries with exponential backoff for up to 6 hours, then the event goes to a dead-letter queue.', ro: 'Sincron: apelantul primește 429 ThrottleError. Asincron: Lambda reîncearcă cu backoff exponențial până la 6 ore, apoi evenimentul ajunge într-un dead-letter queue.' } },
      { q: { en: 'Reserved vs Provisioned Concurrency — what does each solve?', ro: 'Reserved vs Provisioned Concurrency — ce rezolvă fiecare?' }, a: { en: 'Reserved caps a function\'s concurrency (isolation/protection). Provisioned pre-initializes instances so cold starts never happen (low, consistent latency).', ro: 'Reserved plafonează concurența unei funcții (izolare/protecție). Provisioned pre-inițializează instanțe ca cold start-ul să nu apară (latență mică, constantă).' } },
      { q: { en: 'A Lambda must read from a private RDS database. What is required?', ro: 'O Lambda trebuie să citească dintr-un RDS privat. Ce e necesar?' }, a: { en: 'Deploy the function in the VPC (VPC ID, subnets, security group — it gets an ENI); ideally connect through RDS Proxy to pool connections.', ro: 'Pui funcția în VPC (VPC ID, subneturi, security group — primește un ENI); ideal te conectezi prin RDS Proxy pentru pooling de conexiuni.' } },
      { q: { en: 'What are Lambda\'s deployment size and environment variable limits?', ro: 'Care sunt limitele Lambda pentru deploy și variabile de mediu?' }, a: { en: '50 MB zipped / 250 MB unzipped for the package, 4 KB for environment variables, /tmp from 512 MB up to 10 GB.', ro: '50 MB arhivat / 250 MB dezarhivat pentru pachet, 4 KB pentru variabilele de mediu, /tmp de la 512 MB până la 10 GB.' } },
    ],
    diagram: {
      steps: [
        { en: 'Event (S3 / API)', ro: 'Eveniment (S3 / API)' },
        { en: 'Lambda function', ro: 'Funcție Lambda' },
        { en: 'Output (DynamoDB)', ro: 'Rezultat (DynamoDB)' },
      ],
      altText: { en: 'An event triggers a Lambda function, which processes it and writes the result to another service.', ro: 'Un eveniment declanșează o funcție Lambda, care îl procesează și scrie rezultatul în alt serviciu.' },
    },
    mermaidDiagram: {
      code: `flowchart LR
  S3[S3 upload] --> L
  API[API Gateway] --> L
  Cron[EventBridge schedule] --> L
  L(Lambda function) --> DB[(DynamoDB)]`,
      caption: { en: 'Many event sources trigger the same function; it runs only when called and writes its result downstream.', ro: 'Mai multe surse de evenimente declanșează aceeași funcție; rulează doar când e chemată și scrie rezultatul mai departe.' },
    },
  },
  {
    id: 'ecs',
    abbreviation: 'ECS',
    fullName: 'Elastic Container Service',
    category: 'compute',
    level: 'clf',
    difficulty: 2,
    examFrequency: 'medium',
    description: {
      en: 'AWS-native Docker container orchestration. Define tasks, AWS schedules them.',
      ro: 'Orchestrare containere Docker nativ AWS. Definești task-uri, AWS le scalează.',
    },
    analogy: {
      en: 'Like a manager who hires temp workers (containers) and replaces them when they fail.',
      ro: 'Ca un manager care angajează muncitori temporari (containere) și-i înlocuiește când cad.',
    },
    examTips: [
      { key: 'task_def', content: { en: 'Task Definition: blueprint (which container, CPU/memory, IAM role).', ro: 'Task Definition: blueprint (ce container, CPU/memorie, rol IAM).' } },
      { key: 'launch_types', content: { en: 'Launch types: EC2 (you manage VMs) or Fargate (serverless).', ro: 'Launch types: EC2 (gestionezi VMs) sau Fargate (serverless).' } },
      { key: 'service', content: { en: 'Service: keeps N running tasks, integrates with ALB.', ro: 'Service: menține N task-uri active, integrare ALB.' } },
      { key: 'pricing', content: { en: 'ECS itself is free — pay for underlying EC2/Fargate.', ro: 'ECS în sine e gratuit — plătești EC2/Fargate de dedesubt.' } },
    ],
    pricing: { en: 'Free (pay for underlying compute)', ro: 'Gratuit (plătești compute-ul subiacent)' },
    connections: ['ecr', 'fargate', 'elb', 'cloudwatch', 'iam', 'vpc'],
    docsUrl: 'https://docs.aws.amazon.com/ecs/',
    visual: { color: 'hsl(217, 91%, 60%)', icon: 'box' },
    howItWorks: [
      { en: 'You package your app as a Docker image and push it to a registry (e.g. ECR).', ro: 'Îți împachetezi aplicația ca imagine Docker și o trimiți într-un registru (ex. ECR).' },
      { en: 'You write a Task Definition: which image to run, how much CPU/memory, and the IAM role.', ro: 'Scrii un Task Definition: ce imagine rulezi, cât CPU/memorie și ce rol IAM.' },
      { en: 'You pick a launch type — EC2 (you manage the instances) or Fargate (serverless).', ro: 'Alegi un launch type — EC2 (gestionezi instanțele) sau Fargate (serverless).' },
      { en: 'ECS schedules and runs the tasks, restarts failed ones, and integrates with an ALB.', ro: 'ECS planifică și rulează task-urile, le repornește pe cele căzute și se integrează cu un ALB.' },
    ],
    keyFacts: [
      { en: 'ECS = AWS-native Docker container orchestration (not Kubernetes — that is EKS).', ro: 'ECS = orchestrare containere Docker nativ AWS (nu Kubernetes — acela e EKS).' },
      { en: 'Two launch types: EC2 (you provision/manage the VMs) and Fargate (serverless).', ro: 'Două launch types: EC2 (tu provizionezi/gestionezi VM-urile) și Fargate (serverless).' },
      { en: 'A Task Definition is the blueprint: image, CPU/memory, ports, and IAM role.', ro: 'Un Task Definition e blueprint-ul: imagine, CPU/memorie, porturi și rol IAM.' },
      { en: 'ECS itself is free — you pay only for the underlying EC2 or Fargate compute.', ro: 'ECS în sine e gratuit — plătești doar compute-ul EC2 sau Fargate de dedesubt.' },
      { en: 'A Service keeps N tasks running and connects them to an Application Load Balancer.', ro: 'Un Service menține N task-uri active și le conectează la un Application Load Balancer.' },
    ],
    keyNumbers: [
      { label: { en: 'Cost of ECS control plane', ro: 'Costul control plane-ului ECS' }, value: { en: '$0 (free)', ro: '$0 (gratuit)' } },
      { label: { en: 'Launch types', ro: 'Launch types' }, value: { en: '2 (EC2, Fargate)', ro: '2 (EC2, Fargate)' } },
      { label: { en: 'Container engine', ro: 'Motor containere' }, value: { en: 'Docker', ro: 'Docker' } },
    ],
    whenToUse: [
      { en: 'You want to run Docker containers on AWS with a simple, AWS-native orchestrator.', ro: 'Vrei să rulezi containere Docker pe AWS cu un orchestrator simplu, nativ AWS.' },
      { en: 'You want a choice between managing the servers (EC2) or going serverless (Fargate).', ro: 'Vrei să alegi între a gestiona serverele (EC2) sau a merge serverless (Fargate).' },
      { en: 'You need auto-restart of failed tasks and load balancing without building it yourself.', ro: 'Ai nevoie de repornire automată a task-urilor căzute și load balancing fără să-l construiești tu.' },
    ],
    whenNotToUse: [
      { en: 'You need the open-source Kubernetes standard or multi-cloud portability → use EKS.', ro: 'Ai nevoie de standardul open-source Kubernetes sau portabilitate multi-cloud → folosește EKS.' },
      { en: 'Short, event-driven code with no container → use Lambda (functions, not containers).', ro: 'Cod scurt, declanșat de evenimente, fără container → folosește Lambda (funcții, nu containere).' },
      { en: 'You want to upload code and let AWS pick the platform for you → use Elastic Beanstalk.', ro: 'Vrei să uploadezi cod și AWS să aleagă platforma pentru tine → folosește Elastic Beanstalk.' },
    ],
    examTraps: [
      { en: 'ECS = containers; Lambda = short functions; EC2 = full VMs you manage. Match the keyword.', ro: 'ECS = containere; Lambda = funcții scurte; EC2 = VM-uri complete pe care le gestionezi. Potrivește cuvântul-cheie.' },
      { en: 'Under ECS, Fargate launch type = serverless (no VMs); EC2 launch type = you manage the instances.', ro: 'În ECS, Fargate launch type = serverless (fără VM-uri); EC2 launch type = tu gestionezi instanțele.' },
      { en: 'ECS is the AWS-native orchestrator; EKS is the managed Kubernetes one. Don\'t swap them.', ro: 'ECS e orchestratorul nativ AWS; EKS e cel cu Kubernetes gestionat. Nu le confunda.' },
      { en: 'The ECS control plane is free — the cost is the EC2 or Fargate compute underneath.', ro: 'Control plane-ul ECS e gratuit — costul e compute-ul EC2 sau Fargate de dedesubt.' },
    ],
    retrievalQuestions: [
      { q: { en: 'What are the two launch types for ECS and how do they differ?', ro: 'Care sunt cele două launch types pentru ECS și prin ce diferă?' }, a: { en: 'EC2 launch type (you provision and manage the EC2 instances) and Fargate launch type (serverless — AWS runs the containers, no servers to manage).', ro: 'EC2 launch type (tu provizionezi și gestionezi instanțele EC2) și Fargate launch type (serverless — AWS rulează containerele, fără servere de gestionat).' } },
      { q: { en: 'What does a Task Definition contain?', ro: 'Ce conține un Task Definition?' }, a: { en: 'The blueprint for a task: which container image to run, CPU/memory, ports, and the IAM role.', ro: 'Blueprint-ul unui task: ce imagine de container rulezi, CPU/memorie, porturi și rolul IAM.' } },
      { q: { en: 'How much does ECS itself cost?', ro: 'Cât costă ECS în sine?' }, a: { en: 'ECS is free — you pay only for the underlying EC2 or Fargate compute it runs your containers on.', ro: 'ECS e gratuit — plătești doar compute-ul EC2 sau Fargate de dedesubt pe care îți rulează containerele.' } },
      { q: { en: 'When would you choose EKS over ECS?', ro: 'Când ai alege EKS în loc de ECS?' }, a: { en: 'When you need the open-source Kubernetes standard or multi-cloud portability; ECS is the simpler AWS-native option.', ro: 'Când ai nevoie de standardul open-source Kubernetes sau portabilitate multi-cloud; ECS e opțiunea mai simplă, nativă AWS.' } },
    ],
    diagram: {
      steps: [
        { en: 'Docker image (ECR)', ro: 'Imagine Docker (ECR)' },
        { en: 'Task Definition', ro: 'Task Definition' },
        { en: 'EC2 or Fargate', ro: 'EC2 sau Fargate' },
        { en: 'ALB → users', ro: 'ALB → utilizatori' },
      ],
      altText: { en: 'A Docker image and a Task Definition are run by ECS on EC2 or Fargate, fronted by an ALB serving users.', ro: 'O imagine Docker și un Task Definition sunt rulate de ECS pe EC2 sau Fargate, în spatele unui ALB care servește utilizatorii.' },
    },
  },
  {
    id: 'eks',
    abbreviation: 'EKS',
    fullName: 'Elastic Kubernetes Service',
    category: 'compute',
    level: 'clf',
    difficulty: 3,
    examFrequency: 'low',
    description: {
      en: 'Managed Kubernetes for running containerized apps using the open-source standard.',
      ro: 'Kubernetes gestionat pentru aplicații containerizate folosind standardul open-source.',
    },
    analogy: {
      en: 'Like ECS but using Kubernetes — same idea, multi-cloud portable.',
      ro: 'Ca ECS dar cu Kubernetes — aceeași idee, portabil multi-cloud.',
    },
    examTips: [
      { key: 'managed_cp', content: { en: 'AWS manages the Kubernetes control plane.', ro: 'AWS gestionează control plane-ul Kubernetes.' } },
      { key: 'use_when', content: { en: 'Use when team has Kubernetes expertise or needs multi-cloud.', ro: 'Folosește când ai expertiză Kubernetes sau vrei multi-cloud.' } },
      { key: 'nodes', content: { en: 'Worker nodes: EC2 or Fargate (serverless).', ro: 'Worker nodes: EC2 sau Fargate (serverless).' } },
    ],
    pricing: { en: '$0.10/hour per cluster + worker node costs', ro: '$0.10/oră per cluster + costuri worker nodes' },
    connections: ['ecr', 'fargate', 'cloudwatch', 'iam', 'vpc'],
    docsUrl: 'https://docs.aws.amazon.com/eks/',
    visual: { color: 'hsl(217, 91%, 60%)', icon: 'box' },
  },
  {
    id: 'fargate',
    abbreviation: 'Fargate',
    fullName: 'AWS Fargate',
    category: 'compute',
    level: 'clf',
    difficulty: 2,
    examFrequency: 'medium',
    description: {
      en: 'Serverless compute for containers — run ECS or EKS without managing nodes.',
      ro: 'Compute serverless pentru containere — rulezi ECS sau EKS fără să gestionezi noduri.',
    },
    analogy: {
      en: 'Like Lambda but for containers — no servers to patch, scale automatically.',
      ro: 'Ca Lambda dar pentru containere — fără servere de patch-uit, scalare automată.',
    },
    examTips: [
      { key: 'no_servers', content: { en: 'No EC2 instances to manage — fully serverless.', ro: 'Niciun EC2 de gestionat — complet serverless.' } },
      { key: 'pricing', content: { en: 'Pay for vCPU + GB-memory per second.', ro: 'Plătești vCPU + GB-memorie per secundă.' } },
      { key: 'use_with', content: { en: 'Used with ECS or EKS as launch type.', ro: 'Folosit cu ECS sau EKS ca launch type.' } },
    ],
    pricing: { en: '$0.04048/vCPU-hour + $0.004445/GB-hour', ro: '$0.04048/vCPU-oră + $0.004445/GB-oră' },
    connections: ['ecs', 'eks', 'ecr', 'iam'],
    docsUrl: 'https://docs.aws.amazon.com/fargate/',
    visual: { color: 'hsl(217, 91%, 60%)', icon: 'box' },
    howItWorks: [
      { en: 'You use Fargate as a launch type for ECS (or EKS) instead of managing EC2 instances.', ro: 'Folosești Fargate ca launch type pentru ECS (sau EKS) în loc să gestionezi instanțe EC2.' },
      { en: 'You only specify the CPU and memory your container needs — no servers to provision.', ro: 'Specifici doar CPU-ul și memoria de care are nevoie containerul — fără servere de provizionat.' },
      { en: 'AWS finds capacity, runs the container, patches the host, and scales it for you.', ro: 'AWS găsește capacitate, rulează containerul, face patch host-ului și îl scalează pentru tine.' },
      { en: 'You pay per second for the vCPU and memory used by the running task.', ro: 'Plătești pe secundă pentru vCPU-ul și memoria folosite de task-ul care rulează.' },
    ],
    keyFacts: [
      { en: 'Fargate = serverless compute engine for CONTAINERS (no EC2 servers to manage).', ro: 'Fargate = motor de compute serverless pentru CONTAINERE (fără servere EC2 de gestionat).' },
      { en: 'It is a launch type for ECS and EKS — not a standalone orchestrator.', ro: 'E un launch type pentru ECS și EKS — nu un orchestrator de sine stătător.' },
      { en: 'You choose CPU/memory; AWS handles provisioning, patching, and scaling the host.', ro: 'Tu alegi CPU/memoria; AWS se ocupă de provizionare, patch-uri și scalarea host-ului.' },
      { en: 'Billing is per vCPU and per GB of memory used by the task, per second.', ro: 'Facturarea e per vCPU și per GB de memorie folosite de task, pe secundă.' },
      { en: 'Fargate runs containers; Lambda runs short event-driven functions — different things.', ro: 'Fargate rulează containere; Lambda rulează funcții scurte declanșate de evenimente — lucruri diferite.' },
    ],
    keyNumbers: [
      { label: { en: 'Servers you manage', ro: 'Servere pe care le gestionezi' }, value: { en: '0 (serverless)', ro: '0 (serverless)' } },
      { label: { en: 'Billing granularity', ro: 'Granularitate facturare' }, value: { en: 'per second', ro: 'pe secundă' } },
      { label: { en: 'Billed on', ro: 'Se facturează pe' }, value: { en: 'vCPU + memory', ro: 'vCPU + memorie' } },
    ],
    whenToUse: [
      { en: 'You want to run containers but do NOT want to provision or patch any EC2 servers.', ro: 'Vrei să rulezi containere dar NU vrei să provizionezi sau să faci patch la servere EC2.' },
      { en: 'Variable or spiky workloads where paying only for what runs is ideal.', ro: 'Workload-uri variabile sau cu vârfuri, unde e ideal să plătești doar cât rulează.' },
      { en: 'Small teams that want containers without managing cluster capacity.', ro: 'Echipe mici care vor containere fără să gestioneze capacitatea clusterului.' },
    ],
    whenNotToUse: [
      { en: 'You need full control of the host OS or special hardware → use the EC2 launch type.', ro: 'Ai nevoie de control total al OS-ului gazdă sau hardware special → folosește launch type-ul EC2.' },
      { en: 'Your workload is short event-driven code, not a container → use Lambda.', ro: 'Workload-ul tău e cod scurt declanșat de evenimente, nu un container → folosește Lambda.' },
      { en: 'Steady 24/7 high usage where reserved EC2 instances are cheaper per hour.', ro: 'Utilizare mare constantă 24/7 unde instanțele EC2 reserved sunt mai ieftine pe oră.' },
    ],
    examTraps: [
      { en: 'Fargate = serverless CONTAINERS; Lambda = serverless FUNCTIONS (short code). Match the keyword.', ro: 'Fargate = CONTAINERE serverless; Lambda = FUNCȚII serverless (cod scurt). Potrivește cuvântul-cheie.' },
      { en: '"No servers to manage" for containers = Fargate; "you manage the instances" = EC2 launch type.', ro: '„Fără servere de gestionat” pentru containere = Fargate; „tu gestionezi instanțele” = EC2 launch type.' },
      { en: 'Fargate is a launch type for ECS/EKS, not a separate orchestrator on its own.', ro: 'Fargate e un launch type pentru ECS/EKS, nu un orchestrator separat de sine stătător.' },
      { en: 'You pay for vCPU + memory used — not for idle EC2 instances sitting around.', ro: 'Plătești pentru vCPU + memoria folosite — nu pentru instanțe EC2 idle care stau degeaba.' },
    ],
    retrievalQuestions: [
      { q: { en: 'What is AWS Fargate in one sentence?', ro: 'Ce este AWS Fargate într-o propoziție?' }, a: { en: 'A serverless compute engine that runs ECS/EKS containers without you provisioning or managing any EC2 servers.', ro: 'Un motor de compute serverless care rulează containere ECS/EKS fără ca tu să provizionezi sau să gestionezi servere EC2.' } },
      { q: { en: 'Fargate vs Lambda — what is the key difference?', ro: 'Fargate vs Lambda — care e diferența cheie?' }, a: { en: 'Fargate runs containers; Lambda runs short, event-driven functions (your code). Both are serverless but for different unit types.', ro: 'Fargate rulează containere; Lambda rulează funcții scurte declanșate de evenimente (codul tău). Ambele sunt serverless dar pentru unități diferite.' } },
      { q: { en: 'How are you billed with Fargate?', ro: 'Cum ești facturat cu Fargate?' }, a: { en: 'Per second for the vCPU and memory used by the running task — no charge for idle servers.', ro: 'Pe secundă pentru vCPU-ul și memoria folosite de task-ul care rulează — fără cost pentru servere idle.' } },
      { q: { en: 'When would you pick the EC2 launch type over Fargate?', ro: 'Când ai alege launch type-ul EC2 în loc de Fargate?' }, a: { en: 'When you need full control of the host OS, special hardware, or steady usage where reserved EC2 is cheaper.', ro: 'Când ai nevoie de control total al OS-ului gazdă, hardware special, sau utilizare constantă unde EC2 reserved e mai ieftin.' } },
    ],
    diagram: {
      steps: [
        { en: 'Container + CPU/memory', ro: 'Container + CPU/memorie' },
        { en: 'Fargate (serverless)', ro: 'Fargate (serverless)' },
        { en: 'AWS runs it', ro: 'AWS îl rulează' },
        { en: 'Pay per second', ro: 'Plătești pe secundă' },
      ],
      altText: { en: 'You give Fargate a container and its CPU/memory; Fargate runs it serverlessly and you pay per second — no EC2 to manage.', ro: 'Îi dai lui Fargate un container și CPU/memoria lui; Fargate îl rulează serverless și plătești pe secundă — fără EC2 de gestionat.' },
    },
  },
  {
    id: 'beanstalk',
    abbreviation: 'Beanstalk',
    fullName: 'AWS Elastic Beanstalk',
    category: 'compute',
    level: 'clf',
    difficulty: 1,
    examFrequency: 'medium',
    description: {
      en: 'Platform-as-a-Service — upload code and AWS handles the infrastructure (EC2, ELB, ASG, RDS).',
      ro: 'Platform-as-a-Service — uploadezi cod și AWS gestionează infrastructura (EC2, ELB, ASG, RDS).',
    },
    analogy: {
      en: 'Like Heroku on AWS — you focus on code, infrastructure is automatic.',
      ro: 'Ca Heroku pe AWS — te concentrezi pe cod, infrastructura e automată.',
    },
    examTips: [
      { key: 'paas', content: { en: 'PaaS — service is free, you pay for resources used.', ro: 'PaaS — serviciul e gratuit, plătești resursele folosite.' } },
      { key: 'languages', content: { en: 'Supports Node.js, Python, Java, .NET, PHP, Ruby, Go, Docker.', ro: 'Suportă Node.js, Python, Java, .NET, PHP, Ruby, Go, Docker.' } },
      { key: 'tiers', content: { en: 'Web Tier (web apps) and Worker Tier (background jobs via SQS).', ro: 'Web Tier (web apps) și Worker Tier (job-uri background via SQS).' } },
      { key: 'control', content: { en: 'You retain full control over underlying resources.', ro: 'Păstrezi control complet asupra resurselor subiacente.' } },
    ],
    pricing: { en: 'Free (pay for EC2, ELB, RDS used)', ro: 'Gratuit (plătești EC2, ELB, RDS folosite)' },
    connections: ['ec2', 'elb', 'rds', 'autoscaling', 's3'],
    docsUrl: 'https://docs.aws.amazon.com/elasticbeanstalk/',
    visual: { color: 'hsl(217, 91%, 60%)', icon: 'rocket' },
    howItWorks: [
      { en: 'You pick a supported platform (Java, .NET, Node.js, Python, Ruby, PHP, Go, Docker).', ro: 'Alegi o platformă suportată (Java, .NET, Node.js, Python, Ruby, PHP, Go, Docker).' },
      { en: 'You just upload your application code — no infrastructure config required.', ro: 'Doar uploadezi codul aplicației — fără configurare de infrastructură.' },
      { en: 'Beanstalk auto-provisions EC2, Auto Scaling, a load balancer (ELB), and health monitoring.', ro: 'Beanstalk provizionează automat EC2, Auto Scaling, un load balancer (ELB) și monitorizare de sănătate.' },
      { en: 'It deploys and runs your app; you can still tweak the underlying resources if needed.', ro: 'Îți deployează și rulează aplicația; poți totuși ajusta resursele subiacente dacă e nevoie.' },
    ],
    keyFacts: [
      { en: 'Beanstalk = PaaS: the easiest way to deploy a web app without managing infrastructure.', ro: 'Beanstalk = PaaS: cel mai simplu mod de a deploya o aplicație web fără să gestionezi infrastructura.' },
      { en: 'You focus on code; AWS handles capacity, load balancing, scaling, and health.', ro: 'Te concentrezi pe cod; AWS se ocupă de capacitate, load balancing, scalare și sănătate.' },
      { en: 'Supports many languages/platforms plus Docker.', ro: 'Suportă multe limbaje/platforme plus Docker.' },
      { en: 'Beanstalk itself is free — you pay only for the resources it creates (EC2, ELB, etc.).', ro: 'Beanstalk în sine e gratuit — plătești doar resursele pe care le creează (EC2, ELB, etc.).' },
      { en: 'You keep full control of the underlying AWS resources it provisions.', ro: 'Păstrezi control complet asupra resurselor AWS subiacente pe care le provizionează.' },
    ],
    keyNumbers: [
      { label: { en: 'Cost of the Beanstalk service', ro: 'Costul serviciului Beanstalk' }, value: { en: '$0 (free)', ro: '$0 (gratuit)' } },
      { label: { en: 'Infra you configure manually', ro: 'Infra pe care o configurezi manual' }, value: { en: 'none', ro: 'niciuna' } },
      { label: { en: 'Service model', ro: 'Model de serviciu' }, value: { en: 'PaaS', ro: 'PaaS' } },
    ],
    whenToUse: [
      { en: 'You want the fastest way to deploy a web app and just focus on your code.', ro: 'Vrei cea mai rapidă cale de a deploya o aplicație web și să te concentrezi doar pe cod.' },
      { en: 'Your app uses a standard supported platform (Node.js, Python, Java, Docker, etc.).', ro: 'Aplicația ta folosește o platformă standard suportată (Node.js, Python, Java, Docker, etc.).' },
      { en: 'You want auto scaling and load balancing without configuring each resource by hand.', ro: 'Vrei auto scaling și load balancing fără să configurezi manual fiecare resursă.' },
    ],
    whenNotToUse: [
      { en: 'You need to declare every resource precisely as code → use CloudFormation (IaC).', ro: 'Ai nevoie să declari fiecare resursă exact ca și cod → folosește CloudFormation (IaC).' },
      { en: 'You only need raw VMs with full manual control → use EC2 directly.', ro: 'Ai nevoie doar de VM-uri brute cu control manual complet → folosește EC2 direct.' },
      { en: 'You want to run containers with an orchestrator → use ECS/Fargate.', ro: 'Vrei să rulezi containere cu un orchestrator → folosește ECS/Fargate.' },
    ],
    examTraps: [
      { en: 'Beanstalk = "just upload code", platform handles infra (PaaS). CloudFormation = you declare every resource (IaC).', ro: 'Beanstalk = „doar uploadezi cod”, platforma gestionează infra (PaaS). CloudFormation = tu declari fiecare resursă (IaC).' },
      { en: 'Beanstalk is a managed orchestration LAYER over EC2/ELB/ASG — it is not raw EC2.', ro: 'Beanstalk e un STRAT de orchestrare gestionat peste EC2/ELB/ASG — nu e EC2 brut.' },
      { en: 'The Beanstalk service is free; the cost is the EC2/ELB/RDS resources it provisions.', ro: 'Serviciul Beanstalk e gratuit; costul sunt resursele EC2/ELB/RDS pe care le provizionează.' },
      { en: '"Developer focuses only on code, no infra to manage" = Beanstalk on the exam.', ro: '„Dezvoltatorul se concentrează doar pe cod, fără infra de gestionat” = Beanstalk la examen.' },
    ],
    retrievalQuestions: [
      { q: { en: 'What is Elastic Beanstalk and what problem does it solve?', ro: 'Ce este Elastic Beanstalk și ce problemă rezolvă?' }, a: { en: 'A PaaS where you upload code and AWS automatically provisions and manages the infrastructure (EC2, scaling, load balancing, health), so you focus only on code.', ro: 'Un PaaS unde uploadezi cod și AWS provizionează și gestionează automat infrastructura (EC2, scalare, load balancing, sănătate), ca tu să te concentrezi doar pe cod.' } },
      { q: { en: 'Beanstalk vs CloudFormation — what is the difference?', ro: 'Beanstalk vs CloudFormation — care e diferența?' }, a: { en: 'Beanstalk is PaaS (just upload code, platform manages infra); CloudFormation is IaC where you declare every resource yourself.', ro: 'Beanstalk e PaaS (doar uploadezi cod, platforma gestionează infra); CloudFormation e IaC unde declari tu fiecare resursă.' } },
      { q: { en: 'How much does Beanstalk cost?', ro: 'Cât costă Beanstalk?' }, a: { en: 'The service itself is free — you pay only for the underlying resources it creates (EC2, ELB, RDS, etc.).', ro: 'Serviciul în sine e gratuit — plătești doar resursele subiacente pe care le creează (EC2, ELB, RDS, etc.).' } },
      { q: { en: 'Do you lose control of the AWS resources when using Beanstalk?', ro: 'Pierzi controlul resurselor AWS când folosești Beanstalk?' }, a: { en: 'No — you keep full control of the underlying resources; you just don\'t have to configure them manually.', ro: 'Nu — păstrezi control complet asupra resurselor subiacente; doar că nu trebuie să le configurezi manual.' } },
    ],
    diagram: {
      steps: [
        { en: 'Upload your code', ro: 'Uploadezi codul' },
        { en: 'Beanstalk (PaaS)', ro: 'Beanstalk (PaaS)' },
        { en: 'Auto: EC2 + ELB + ASG', ro: 'Auto: EC2 + ELB + ASG' },
        { en: 'App is live', ro: 'Aplicația e live' },
      ],
      altText: { en: 'You upload code to Beanstalk, which automatically provisions EC2, a load balancer, and Auto Scaling, and your app goes live.', ro: 'Uploadezi cod în Beanstalk, care provizionează automat EC2, un load balancer și Auto Scaling, iar aplicația ta devine live.' },
    },
  },
  {
    id: 'lightsail',
    abbreviation: 'Lightsail',
    fullName: 'Amazon Lightsail',
    category: 'compute',
    level: 'clf',
    exams: ['clf'], // out of scope / not in SAA-C03 appendix
    difficulty: 1,
    examFrequency: 'low',
    description: {
      en: 'Simplified VPS with predictable monthly pricing — great for small projects.',
      ro: 'VPS simplificat cu prețuri lunare predictibile — pentru proiecte mici.',
    },
    analogy: {
      en: 'Like DigitalOcean or Linode — easier and cheaper than EC2 for small sites.',
      ro: 'Ca DigitalOcean sau Linode — mai simplu și mai ieftin ca EC2 pentru site-uri mici.',
    },
    examTips: [
      { key: 'simple', content: { en: 'For developers who want simple AWS without learning EC2/VPC.', ro: 'Pentru dezvoltatori care vor AWS simplu, fără să învețe EC2/VPC.' } },
      { key: 'fixed_price', content: { en: 'Fixed monthly pricing ($3.50–$160/month) including bandwidth.', ro: 'Preț fix lunar ($3.50–$160/lună) incluzând bandwidth.' } },
      { key: 'use_cases', content: { en: 'WordPress, dev/test environments, simple web apps.', ro: 'WordPress, medii dev/test, aplicații web simple.' } },
    ],
    pricing: { en: '$3.50–$160/month, all-inclusive', ro: '$3.50–$160/lună, totul inclus' },
    connections: ['s3', 'route53'],
    docsUrl: 'https://docs.aws.amazon.com/lightsail/',
    visual: { color: 'hsl(217, 91%, 60%)', icon: 'box' },
  },
  {
    id: 'batch',
    abbreviation: 'Batch',
    fullName: 'AWS Batch',
    category: 'compute',
    level: 'clf',
    difficulty: 2,
    examFrequency: 'low',
    description: {
      en: 'Run batch computing workloads at any scale — auto-provisions compute resources.',
      ro: 'Rulezi sarcini batch la orice scară — provisionare automată resurse compute.',
    },
    analogy: {
      en: 'Like a smart job queue that spawns workers (EC2/Fargate) only when needed.',
      ro: 'Ca o coadă smart care creează workeri (EC2/Fargate) doar când e nevoie.',
    },
    examTips: [
      { key: 'unlimited', content: { en: 'No time limit on jobs (vs Lambda 15 min limit).', ro: 'Fără limită de timp pe job-uri (vs Lambda 15 min).' } },
      { key: 'docker', content: { en: 'Jobs run as Docker images on EC2 or Fargate.', ro: 'Job-urile rulează ca imagini Docker pe EC2 sau Fargate.' } },
      { key: 'use_case', content: { en: 'Use for ETL, scientific computing, image/video processing.', ro: 'Folosește pentru ETL, calcul științific, procesare imagini/video.' } },
    ],
    pricing: { en: 'Free (pay for EC2/Fargate used)', ro: 'Gratuit (plătești EC2/Fargate folosite)' },
    connections: ['ec2', 'fargate', 'ecr', 'cloudwatch', 's3'],
    docsUrl: 'https://docs.aws.amazon.com/batch/',
    visual: { color: 'hsl(217, 91%, 60%)', icon: 'box' },
  },
  {
    id: 'apprunner',
    abbreviation: 'App Runner',
    fullName: 'AWS App Runner',
    category: 'compute',
    level: 'clf',
    difficulty: 1,
    examFrequency: 'low',
    description: {
      en: 'Fully managed service to deploy web apps and APIs from container or source code.',
      ro: 'Serviciu fully-managed pentru deploy de web apps și API-uri din container sau source code.',
    },
    analogy: {
      en: 'Like Vercel or Netlify on AWS — push code, get a URL, automatic scaling.',
      ro: 'Ca Vercel sau Netlify pe AWS — pui codul, primești URL, scalare automată.',
    },
    examTips: [
      { key: 'simple', content: { en: 'No infrastructure config — connect Git or ECR and deploy.', ro: 'Fără config infrastructură — conectezi Git sau ECR și deploy.' } },
      { key: 'auto_scale', content: { en: 'Automatic load balancing, scaling, certificates.', ro: 'Load balancing automat, scalare, certificate.' } },
    ],
    pricing: { en: 'Pay for vCPU + memory used by container', ro: 'Plătești vCPU + memorie folosite de container' },
    connections: ['ecr', 'iam', 'cloudwatch'],
    docsUrl: 'https://docs.aws.amazon.com/apprunner/',
    visual: { color: 'hsl(217, 91%, 60%)', icon: 'rocket' },
  },
  {
    id: 'ecr',
    abbreviation: 'ECR',
    fullName: 'Elastic Container Registry',
    category: 'compute',
    level: 'clf',
    difficulty: 1,
    examFrequency: 'low',
    description: {
      en: 'Fully managed Docker container registry — store, manage, and deploy container images.',
      ro: 'Registry Docker managed — stochezi, gestionezi și deploy imagini container.',
    },
    analogy: {
      en: 'Like Docker Hub but private and integrated with AWS IAM.',
      ro: 'Ca Docker Hub dar privat și integrat cu AWS IAM.',
    },
    examTips: [
      { key: 'private', content: { en: 'Stores private and public Docker images.', ro: 'Stochează imagini Docker private și publice.' } },
      { key: 'scanning', content: { en: 'Built-in vulnerability scanning of images.', ro: 'Scanare vulnerabilități built-in pentru imagini.' } },
    ],
    pricing: { en: '$0.10/GB-month stored', ro: '$0.10/GB-lună stocat' },
    connections: ['ecs', 'eks', 'fargate', 'apprunner', 'iam'],
    docsUrl: 'https://docs.aws.amazon.com/ecr/',
    visual: { color: 'hsl(217, 91%, 60%)', icon: 'box' },
  },
  {
    id: 'outposts',
    abbreviation: 'Outposts',
    fullName: 'AWS Outposts',
    category: 'compute',
    level: 'clf',
    difficulty: 3,
    examFrequency: 'low',
    description: {
      en: 'AWS hardware racks installed in your own data center — hybrid cloud, low-latency.',
      ro: 'Rack-uri hardware AWS instalate în data center-ul tău — cloud hibrid, latență mică.',
    },
    analogy: {
      en: 'AWS in a box — physically delivered to your office for compliance/latency reasons.',
      ro: 'AWS într-o cutie — livrat fizic la birou pentru compliance/latență.',
    },
    examTips: [
      { key: 'hybrid', content: { en: 'Run AWS services on-premises with same APIs and tools.', ro: 'Rulezi servicii AWS on-premises cu aceleași API-uri și tool-uri.' } },
      { key: 'use_case', content: { en: 'Use for low latency, data residency, local data processing.', ro: 'Folosește pentru latență mică, data residency, procesare locală.' } },
    ],
    pricing: { en: '3-year commitment, hardware + service fee', ro: 'Angajament 3 ani, hardware + taxă serviciu' },
    connections: ['ec2', 'ebs', 's3', 'rds', 'vpc'],
    docsUrl: 'https://docs.aws.amazon.com/outposts/',
    visual: { color: 'hsl(217, 91%, 60%)', icon: 'box' },
  },
];

// ============================================================
// STORAGE (8 services)
// ============================================================

const storageServices: Service[] = [
  {
    id: 's3',
    abbreviation: 'S3',
    fullName: 'Simple Storage Service',
    category: 'storage',
    level: 'clf',
    difficulty: 2,
    examFrequency: 'high',
    description: {
      en: 'Object storage with 99.999999999% (11 nines) durability — for files, backups, media, data lakes.',
      ro: 'Stocare obiecte cu durabilitate 99.999999999% (11 nines) — fișiere, backup, media, data lakes.',
    },
    analogy: {
      en: 'Like Google Drive for applications — infinite scalable storage with zero ops.',
      ro: 'Ca Google Drive pentru aplicații — stocare infinit scalabilă cu zero ops.',
    },
    examTips: [
      { key: 'bucket_object', content: { en: 'Bucket = container (globally unique name); Object = file (max 50TB since Dec 2025).', ro: 'Bucket = container (nume global unic); Object = fișier (max 50TB din dec 2025).' } },
      { key: 'storage_classes', content: { en: 'Classes: Standard, IA, One Zone-IA, Intelligent-Tiering, Glacier (Instant/Flexible/Deep), Express One Zone.', ro: 'Clase: Standard, IA, One Zone-IA, Intelligent-Tiering, Glacier (Instant/Flexible/Deep), Express One Zone.' } },
      { key: 'versioning', content: { en: 'Versioning preserves object versions; enables rollback and protects against deletes.', ro: 'Versioning păstrează versiuni; permite rollback și protejează la ștergeri.' } },
      { key: 'encryption', content: { en: 'Encryption: SSE-S3, SSE-KMS, SSE-C, client-side (CSE).', ro: 'Criptare: SSE-S3, SSE-KMS, SSE-C, client-side (CSE).' } },
      { key: 'lifecycle', content: { en: 'Lifecycle rules transition objects to cheaper classes and expire old versions/incomplete multipart uploads.', ro: 'Lifecycle rules mută obiectele în clase ieftine și expiră versiuni vechi/upload-uri multipart incomplete.' } },
      { key: 'static_hosting', content: { en: 'Can host static websites (HTML/CSS/JS) directly.', ro: 'Poate găzdui website-uri statice (HTML/CSS/JS) direct.' } },
      { key: 'replication', content: { en: 'CRR (cross-region) and SRR (same-region) replication — BOTH require versioning enabled; only new objects replicate (S3 Batch Replication for existing).', ro: 'Replicare CRR (cross-region) și SRR (same-region) — AMBELE cer versioning activat; doar obiectele noi se replică (S3 Batch Replication pentru cele existente).' } },
      { key: 'presigned_urls', content: { en: 'Pre-signed URLs grant temporary access without AWS auth.', ro: 'Pre-signed URLs dau acces temporar fără auth AWS.' } },
      { key: 'intelligent_tiering', content: { en: 'Intelligent-Tiering: auto-moves objects between tiers by usage, NO retrieval fees, small monitoring fee — the answer for UNKNOWN access patterns.', ro: 'Intelligent-Tiering: mută automat obiectele între tiers după utilizare, FĂRĂ taxe de retrieval, taxă mică de monitorizare — răspunsul pentru tipare de acces NECUNOSCUTE.' } },
      { key: 'performance', content: { en: 'Baseline: 3,500 PUT / 5,500 GET per second PER PREFIX — spread reads across prefixes to scale; multipart upload for >100MB (mandatory >5GB); Transfer Acceleration uses edge locations for long-distance uploads.', ro: 'Baseline: 3.500 PUT / 5.500 GET pe secundă PER PREFIX — împarți citirile pe prefixe ca să scalezi; multipart upload pentru >100MB (obligatoriu >5GB); Transfer Acceleration folosește edge locations pentru upload la distanță mare.' } },
      { key: 'requester_pays', content: { en: 'Requester Pays: the DOWNLOADER pays transfer costs (must be authenticated) — for sharing large datasets.', ro: 'Requester Pays: cel care DESCARCĂ plătește transferul (trebuie autentificat) — pentru partajarea seturilor mari de date.' } },
      { key: 'event_notifications', content: { en: 'S3 Events → SQS/SNS/Lambda; via EventBridge for advanced filtering and 18+ destinations.', ro: 'S3 Events → SQS/SNS/Lambda; prin EventBridge pentru filtrare avansată și 18+ destinații.' } },
    ],
    pricing: { en: '$0.023/GB-month Standard · 5GB free tier', ro: '$0.023/GB-lună Standard · 5GB free tier' },
    connections: ['cloudfront', 'lambda', 'glacier', 'athena', 'kms', 'iam', 'sns', 'sqs'],
    docsUrl: 'https://docs.aws.amazon.com/s3/',
    visual: { color: 'hsl(38, 92%, 50%)', icon: 'database' },
    examDomains: ['design-cost', 'design-performant'],
    howItWorks: [
      { en: 'You create a bucket — a container with a globally unique name in a chosen Region.', ro: 'Creezi un bucket — un container cu nume global unic, într-o Regiune aleasă.' },
      { en: 'You upload objects (files) into the bucket; each gets a key (its path/name).', ro: 'Încarci obiecte (fișiere) în bucket; fiecare primește o cheie (calea/numele).' },
      { en: 'You pick a storage class per object based on how often you access it.', ro: 'Alegi o clasă de stocare per obiect, după cât de des îl accesezi.' },
      { en: 'Lifecycle rules can auto-move old objects to cheaper classes or delete them.', ro: 'Regulile lifecycle pot muta automat obiectele vechi în clase ieftine sau le pot șterge.' },
    ],
    keyFacts: [
      { en: 'Object storage (not block, not file) — flat structure of buckets + objects.', ro: 'Stocare de obiecte (nu block, nu file) — structură plată de buckets + obiecte.' },
      { en: 'Bucket names are GLOBALLY unique; data is stored in a specific Region.', ro: 'Numele de bucket sunt GLOBAL unice; datele stau într-o Regiune specifică.' },
      { en: 'Designed for 11 nines (99.999999999%) of durability across multiple AZs.', ro: 'Proiectat pentru 11 nines (99,999999999%) durabilitate, pe mai multe AZ-uri.' },
      { en: 'Buckets are PRIVATE by default; you grant access explicitly.', ro: 'Bucket-urile sunt PRIVATE implicit; acorzi acces explicit.' },
      { en: 'Versioning + replication (CRR/SRR) protect and copy your data.', ro: 'Versioning + replicare (CRR/SRR) protejează și copiază datele.' },
    ],
    keyNumbers: [
      { label: { en: 'Max object size', ro: 'Mărime maximă obiect' }, value: { en: '50 TB (was 5 TB until Dec 2025)', ro: '50 TB (a fost 5 TB până în dec 2025)' } },
      { label: { en: 'Single PUT upload limit', ro: 'Limită upload printr-un PUT' }, value: { en: '5 GB (multipart above)', ro: '5 GB (multipart peste)' } },
      { label: { en: 'Durability (all classes)', ro: 'Durabilitate (toate clasele)' }, value: { en: '11 nines', ro: '11 nines' } },
      { label: { en: 'Requests/sec per prefix', ro: 'Cereri/sec per prefix' }, value: { en: '3,500 PUT · 5,500 GET', ro: '3.500 PUT · 5.500 GET' } },
      { label: { en: 'Min storage duration: IA / Glacier IR+FR / Deep Archive', ro: 'Durată minimă stocare: IA / Glacier IR+FR / Deep Archive' }, value: { en: '30 / 90 / 180 days', ro: '30 / 90 / 180 de zile' } },
      { label: { en: 'Glacier Flexible retrieval tiers', ro: 'Tiers de recuperare Glacier Flexible' }, value: { en: 'Expedited 1–5 min · Standard 3–5 h · Bulk 5–12 h', ro: 'Expedited 1–5 min · Standard 3–5 h · Bulk 5–12 h' } },
    ],
    whenToUse: [
      { en: 'Backups, media files, logs, static website assets, data lakes.', ro: 'Backup-uri, fișiere media, log-uri, asset-uri de site static, data lakes.' },
      { en: 'Storage that any service or user can reach over the internet/HTTPS.', ro: 'Stocare la care orice serviciu sau utilizator ajunge prin internet/HTTPS.' },
      { en: 'Archiving cold data cheaply with Glacier storage classes.', ro: 'Arhivarea ieftină a datelor reci cu clasele Glacier.' },
    ],
    whenNotToUse: [
      { en: 'A disk for an EC2 operating system or database → use EBS (block storage).', ro: 'Un disc pentru OS-ul EC2 sau o bază de date → folosește EBS (block storage).' },
      { en: 'A shared file system many EC2 instances mount at once → use EFS.', ro: 'Un sistem de fișiere partajat montat de mai multe EC2 deodată → folosește EFS.' },
      { en: 'Low-latency, high-IOPS transactional writes → not object storage.', ro: 'Scrieri tranzacționale cu latență mică și IOPS mari → nu e pentru object storage.' },
    ],
    examTraps: [
      { en: 'S3 = object, EBS = block (one EC2/one AZ), EFS = file (shared, multi-AZ). Know which is which.', ro: 'S3 = obiect, EBS = block (un EC2/un AZ), EFS = file (partajat, multi-AZ). Știi care e care.' },
      { en: 'Bucket names are GLOBALLY unique, but the data itself is regional — a common trap.', ro: 'Numele de bucket sunt GLOBAL unice, dar datele sunt regionale — capcană frecventă.' },
      { en: 'S3 buckets are PRIVATE by default; public access requires explicit, deliberate config.', ro: 'Bucket-urile S3 sunt PRIVATE implicit; accesul public cere configurare explicită, deliberată.' },
      { en: 'Glacier is a storage CLASS of S3, not a separate service in the exam\'s eyes.', ro: 'Glacier e o CLASĂ de stocare a S3, nu un serviciu separat în ochii examenului.' },
      { en: 'Durability is 11 nines for ALL classes — what differs is AVAILABILITY (Standard 99.99%, IA 99.9%, One Zone-IA 99.5%).', ro: 'Durabilitatea e 11 nines pentru TOATE clasele — ce diferă e DISPONIBILITATEA (Standard 99,99%, IA 99,9%, One Zone-IA 99,5%).' },
      { en: 'One Zone-IA stores data in a SINGLE AZ — data is lost if that AZ is destroyed. Only for recreatable/secondary copies.', ro: 'One Zone-IA ține datele într-un SINGUR AZ — datele se pierd dacă AZ-ul e distrus. Doar pentru copii recreabile/secundare.' },
      { en: 'Replication (CRR/SRR) requires versioning ON in BOTH buckets, is one-hop only (no chaining), and does not replicate existing objects by default.', ro: 'Replicarea (CRR/SRR) cere versioning PORNIT în AMBELE buckets, e doar un singur hop (fără înlănțuire) și nu replică obiectele existente implicit.' },
      { en: '"Access pattern unknown/changing" → Intelligent-Tiering. "Rarely accessed but instant when needed" → Standard-IA or Glacier Instant Retrieval.', ro: '„Tipar de acces necunoscut/schimbător" → Intelligent-Tiering. „Accesat rar dar instant la nevoie" → Standard-IA sau Glacier Instant Retrieval.' },
    ],
    retrievalQuestions: [
      { q: { en: 'What is the maximum size of a single S3 object?', ro: 'Care e mărimea maximă a unui singur obiect S3?' }, a: { en: '50 TB since Dec 2025 (older materials say 5 TB). A single PUT upload is still limited to 5 GB; larger objects use multipart upload.', ro: '50 TB din decembrie 2025 (materialele mai vechi zic 5 TB). Un upload printr-un singur PUT e tot limitat la 5 GB; obiectele mai mari folosesc multipart upload.' } },
      { q: { en: 'Are new S3 buckets public or private by default?', ro: 'Bucket-urile S3 noi sunt publice sau private implicit?' }, a: { en: 'Private. You must explicitly grant public access — which is why misconfigured public buckets are a classic security incident.', ro: 'Private. Trebuie să acorzi explicit acces public — de aceea bucket-urile publice greșit configurate sunt un incident clasic de securitate.' } },
      { q: { en: 'Which durability is S3 designed for, and how is it achieved?', ro: 'Pentru ce durabilitate e proiectat S3 și cum o atinge?' }, a: { en: '11 nines (99.999999999%), by automatically storing copies across multiple Availability Zones.', ro: '11 nines (99,999999999%), stocând automat copii pe mai multe Availability Zones.' } },
      { q: { en: 'You need to store cold backups for years at the lowest cost. Which S3 option?', ro: 'Vrei să stochezi backup-uri reci ani de zile la cel mai mic cost. Ce opțiune S3?' }, a: { en: 'A Glacier storage class (e.g. Glacier Deep Archive), applied via a lifecycle rule.', ro: 'O clasă de stocare Glacier (ex: Glacier Deep Archive), aplicată printr-o regulă lifecycle.' } },
      { q: { en: 'An app reads one S3 prefix at 20,000 GET/s and gets throttled. What is the fix?', ro: 'O aplicație citește un singur prefix S3 cu 20.000 GET/s și e limitată. Care e rezolvarea?' }, a: { en: 'Spread the objects across multiple prefixes — each prefix supports 5,500 GET/s, and there is no limit on the number of prefixes (4 prefixes ≈ 22,000 GET/s).', ro: 'Împarți obiectele pe mai multe prefixe — fiecare prefix suportă 5.500 GET/s și nu există limită la numărul de prefixe (4 prefixe ≈ 22.000 GET/s).' } },
      { q: { en: 'Deleted objects must be recoverable instantly for 30 days, then within 48 hours for a year. Design it.', ro: 'Obiectele șterse trebuie să fie recuperabile instant 30 de zile, apoi în 48 de ore timp de un an. Cum proiectezi?' }, a: { en: 'Enable versioning (deletes become delete markers), then lifecycle-transition noncurrent versions to Standard-IA after 30 days and to Glacier Deep Archive afterwards (Bulk retrieval = 48h).', ro: 'Activezi versioning (ștergerile devin delete markers), apoi muți prin lifecycle versiunile noncurente în Standard-IA după 30 de zile și în Glacier Deep Archive apoi (recuperare Bulk = 48h).' } },
      { q: { en: 'Uploads from Australia to a bucket in us-east-1 are slow. Which feature speeds them up?', ro: 'Upload-urile din Australia către un bucket din us-east-1 sunt lente. Ce funcționalitate le accelerează?' }, a: { en: 'S3 Transfer Acceleration — the file goes to a nearby edge location, then rides the fast private AWS network to the target region; compatible with multipart upload.', ro: 'S3 Transfer Acceleration — fișierul merge la un edge location apropiat, apoi circulă pe rețeaua privată rapidă AWS către regiunea țintă; compatibil cu multipart upload.' } },
    ],
    diagram: {
      steps: [
        { en: 'Bucket (Region)', ro: 'Bucket (Regiune)' },
        { en: 'Object + key', ro: 'Obiect + cheie' },
        { en: 'Storage class', ro: 'Clasă de stocare' },
        { en: 'Lifecycle → Glacier', ro: 'Lifecycle → Glacier' },
      ],
      altText: { en: 'Objects live in a regional bucket under a storage class; lifecycle rules transition them to Glacier over time.', ro: 'Obiectele stau într-un bucket regional sub o clasă de stocare; regulile lifecycle le mută în Glacier în timp.' },
    },
    mermaidDiagram: {
      code: `flowchart LR
  Up([Upload object]) --> B[S3 Standard]
  B -->|30 days, lifecycle| IA[S3 Standard-IA]
  IA -->|90 days, lifecycle| G[(Glacier Deep Archive)]`,
      caption: { en: 'A lifecycle rule automatically moves objects to cheaper classes as they age — from Standard to IA to Glacier.', ro: 'O regulă lifecycle mută automat obiectele în clase mai ieftine pe măsură ce îmbătrânesc — din Standard în IA în Glacier.' },
    },
  },
  {
    id: 'ebs',
    abbreviation: 'EBS',
    fullName: 'Elastic Block Store',
    category: 'storage',
    level: 'clf',
    difficulty: 2,
    examFrequency: 'high',
    description: {
      en: 'Persistent block-level storage volumes attached to EC2 instances.',
      ro: 'Volume de stocare block-level persistente atașate la instanțe EC2.',
    },
    analogy: {
      en: 'Like a physical SSD/HDD plugged into your computer — survives reboots.',
      ro: 'Ca un SSD/HDD fizic conectat la calculator — supraviețuiește reboot-urilor.',
    },
    examTips: [
      { key: 'one_az', content: { en: 'Volume tied to one AZ — same AZ as EC2 instance.', ro: 'Volumul e legat de un AZ — același cu instanța EC2.' } },
      { key: 'types', content: { en: 'Types: gp2/gp3 (general SSD), io1/io2 Block Express (provisioned IOPS SSD), st1 (HDD throughput), sc1 (cold HDD).', ro: 'Tipuri: gp2/gp3 (SSD general), io1/io2 Block Express (SSD cu IOPS provizionat), st1 (HDD throughput), sc1 (HDD rece).' } },
      { key: 'gp3_vs_gp2', content: { en: 'gp3: baseline 3,000 IOPS / 125 MiB/s, scale IOPS (to 16,000) and throughput (to 1,000 MiB/s) INDEPENDENTLY of size. gp2: IOPS linked to size (3 IOPS/GiB, max 16,000).', ro: 'gp3: baseline 3.000 IOPS / 125 MiB/s, crești IOPS (până la 16.000) și throughput (până la 1.000 MiB/s) INDEPENDENT de mărime. gp2: IOPS legat de mărime (3 IOPS/GiB, max 16.000).' } },
      { key: 'io_family', content: { en: 'Need >16,000 IOPS or sub-ms latency (critical databases) → io1 (max 64,000 on Nitro) / io2 Block Express (max 256,000, up to 64 TiB).', ro: 'Ai nevoie de >16.000 IOPS sau latență sub-ms (baze de date critice) → io1 (max 64.000 pe Nitro) / io2 Block Express (max 256.000, până la 64 TiB).' } },
      { key: 'hdd', content: { en: 'st1 (big data/logs: 500 MiB/s, 500 IOPS) and sc1 (coldest, cheapest: 250 MiB/s, 250 IOPS) — HDDs can NEVER be boot volumes.', ro: 'st1 (big data/log-uri: 500 MiB/s, 500 IOPS) și sc1 (cel mai rece, cel mai ieftin: 250 MiB/s, 250 IOPS) — HDD-urile NU pot fi NICIODATĂ volume de boot.' } },
      { key: 'snapshots', content: { en: 'Snapshots stored in S3, copy across AZ/region; Snapshot Archive = 75% cheaper (24-72h restore); Recycle Bin protects against accidental deletion; Fast Snapshot Restore removes first-use latency ($$$).', ro: 'Snapshot-uri în S3, copiabile cross-AZ/region; Snapshot Archive = 75% mai ieftin (restaurare 24-72h); Recycle Bin protejează de ștergeri accidentale; Fast Snapshot Restore elimină latența primei utilizări ($$$).' } },
      { key: 'multi_attach', content: { en: 'io1/io2 Multi-Attach: up to 16 EC2 instances in the SAME AZ, needs a cluster-aware file system (not ext4/XFS).', ro: 'Multi-Attach io1/io2: până la 16 instanțe EC2 în ACELAȘI AZ, cere un file system cluster-aware (nu ext4/XFS).' } },
      { key: 'encryption', content: { en: 'Encrypted volume = data at rest + in transit + snapshots + restored volumes all encrypted (KMS AES-256). To encrypt an unencrypted volume: snapshot → copy with encryption → new volume.', ro: 'Volum criptat = date at rest + în tranzit + snapshot-uri + volume restaurate, toate criptate (KMS AES-256). Ca să criptezi un volum necriptat: snapshot → copie cu criptare → volum nou.' } },
      { key: 'free_tier', content: { en: '30GB free tier (gp2/gp3 or magnetic).', ro: '30GB free tier (gp2/gp3 sau magnetic).' } },
    ],
    pricing: { en: 'gp3: $0.08/GB-month + IOPS/throughput', ro: 'gp3: $0.08/GB-lună + IOPS/throughput' },
    connections: ['ec2', 'kms', 's3'],
    docsUrl: 'https://docs.aws.amazon.com/ebs/',
    visual: { color: 'hsl(38, 92%, 50%)', icon: 'database' },
    examDomains: ['design-performant', 'design-cost'],
    howItWorks: [
      { en: 'You create an EBS volume in a specific Availability Zone and pick a type (gp3, io2, st1, sc1).', ro: 'Creezi un volum EBS într-un Availability Zone specific și alegi un tip (gp3, io2, st1, sc1).' },
      { en: 'You attach it over the network to ONE EC2 instance in that same AZ — it appears as a disk.', ro: 'Îl atașezi prin rețea la O SINGURĂ instanță EC2 din același AZ — apare ca un disc.' },
      { en: 'The OS formats it and reads/writes blocks; the volume persists even if the instance stops.', ro: 'OS-ul îl formatează și citește/scrie blocuri; volumul persistă chiar dacă instanța se oprește.' },
      { en: 'To back up or move it, take a snapshot (stored in S3) and restore it in another AZ or region.', ro: 'Ca să-l salvezi sau muți, faci un snapshot (stocat în S3) și îl restaurezi în alt AZ sau regiune.' },
    ],
    keyFacts: [
      { en: 'Block storage = a virtual hard disk attached to ONE EC2 instance at a time.', ro: 'Block storage = un hard disk virtual atașat la O SINGURĂ instanță EC2 odată.' },
      { en: 'Locked to ONE Availability Zone — to move it, snapshot to S3 then restore in another AZ.', ro: 'Blocat într-UN singur Availability Zone — ca să-l muți, faci snapshot în S3 apoi restaurezi în alt AZ.' },
      { en: 'Persists independently of the EC2 lifecycle (survives termination if "delete on termination" is off).', ro: 'Persistă independent de ciclul de viață al EC2 (supraviețuiește terminării dacă „delete on termination” e oprit).' },
      { en: 'Snapshots are incremental backups stored in S3 and can be copied across regions.', ro: 'Snapshot-urile sunt backup-uri incrementale stocate în S3 și se pot copia cross-region.' },
      { en: 'Volume types: gp2/gp3 (general SSD), io1/io2 (high-IOPS SSD), st1 (throughput HDD), sc1 (cold HDD).', ro: 'Tipuri de volume: gp2/gp3 (SSD general), io1/io2 (SSD IOPS înalt), st1 (HDD throughput), sc1 (HDD rece).' },
    ],
    keyNumbers: [
      { label: { en: 'Instances attached at once', ro: 'Instanțe atașate simultan' }, value: { en: '1 (16 with io1/io2 Multi-Attach, same AZ)', ro: '1 (16 cu Multi-Attach io1/io2, același AZ)' } },
      { label: { en: 'Availability Zones spanned', ro: 'Availability Zones acoperite' }, value: { en: '1 (single AZ)', ro: '1 (un singur AZ)' } },
      { label: { en: 'gp3 baseline → max', ro: 'gp3 baseline → max' }, value: { en: '3,000 → 16,000 IOPS · 125 → 1,000 MiB/s', ro: '3.000 → 16.000 IOPS · 125 → 1.000 MiB/s' } },
      { label: { en: 'io2 Block Express max', ro: 'Maxim io2 Block Express' }, value: { en: '256,000 IOPS · 64 TiB', ro: '256.000 IOPS · 64 TiB' } },
      { label: { en: 'st1 / sc1 max throughput', ro: 'Throughput maxim st1 / sc1' }, value: { en: '500 / 250 MiB/s (no boot)', ro: '500 / 250 MiB/s (fără boot)' } },
      { label: { en: 'Snapshot Archive', ro: 'Snapshot Archive' }, value: { en: '75% cheaper, 24–72h restore', ro: '75% mai ieftin, restaurare 24–72h' } },
    ],
    whenToUse: [
      { en: 'You need a persistent disk for a single EC2 instance (OS boot volume, database files).', ro: 'Ai nevoie de un disc persistent pentru o singură instanță EC2 (volum boot OS, fișiere de bază de date).' },
      { en: 'Low-latency, high-IOPS block storage for transactional databases → use io2.', ro: 'Block storage cu latență mică și IOPS înalt pentru baze de date tranzacționale → folosește io2.' },
      { en: 'You want backups that survive instance termination → take EBS snapshots to S3.', ro: 'Vrei backup-uri care supraviețuiesc terminării instanței → faci snapshot-uri EBS în S3.' },
    ],
    whenNotToUse: [
      { en: 'Many EC2 instances must share the same files at once → use EFS (shared file storage).', ro: 'Mai multe instanțe EC2 trebuie să partajeze aceleași fișiere simultan → folosește EFS (file storage partajat).' },
      { en: 'You store objects/files accessed over HTTP (images, backups, static sites) → use S3 (object storage).', ro: 'Stochezi obiecte/fișiere accesate prin HTTP (imagini, backup-uri, site-uri statice) → folosește S3 (object storage).' },
      { en: 'You need access from multiple AZs at once — EBS is single-AZ → use EFS instead.', ro: 'Ai nevoie de acces din mai multe AZ-uri simultan — EBS e single-AZ → folosește EFS.' },
    ],
    examTraps: [
      { en: 'The big one: S3 = object storage, EBS = block storage (one instance, one AZ), EFS = file storage (shared, multi-AZ).', ro: 'Cea mare: S3 = object storage, EBS = block storage (o instanță, un AZ), EFS = file storage (partajat, multi-AZ).' },
      { en: 'EBS is single-AZ. To use a volume in another AZ you must snapshot it to S3 and restore there.', ro: 'EBS e single-AZ. Ca să folosești un volum în alt AZ, trebuie să-l faci snapshot în S3 și să-l restaurezi acolo.' },
      { en: 'Boot volumes: ONLY gp2/gp3 and io1/io2 — never st1/sc1 (HDD). A question offering st1 as a root volume is a trap.', ro: 'Volume de boot: DOAR gp2/gp3 și io1/io2 — niciodată st1/sc1 (HDD). O întrebare care oferă st1 ca volum root e o capcană.' },
      { en: 'gp2 IOPS scale WITH size; gp3 and io1/io2 scale IOPS INDEPENDENTLY of size. ">16,000 IOPS needed" rules out gp3 → io family.', ro: 'IOPS-ul gp2 crește ODATĂ cu mărimea; gp3 și io1/io2 cresc IOPS INDEPENDENT de mărime. „>16.000 IOPS necesari" elimină gp3 → familia io.' },
      { en: 'Very high IOPS + data CAN be lost on stop → EC2 Instance Store (ephemeral, physical disk), not EBS.', ro: 'IOPS foarte mari + datele POT fi pierdute la stop → EC2 Instance Store (efemer, disc fizic), nu EBS.' },
      { en: 'You cannot encrypt a volume in place — snapshot it, copy the snapshot WITH encryption, create a new volume.', ro: 'Nu poți cripta un volum pe loc — faci snapshot, copiezi snapshot-ul CU criptare, creezi un volum nou.' },
    ],
    retrievalQuestions: [
      { q: { en: 'How many EC2 instances can a standard EBS volume be attached to, and across how many AZs?', ro: 'La câte instanțe EC2 se poate atașa un volum EBS standard, și pe câte AZ-uri?' }, a: { en: 'One instance at a time, within a single Availability Zone. (Exception: io1/io2 Multi-Attach — up to 16 instances, same AZ, cluster-aware FS.)', ro: 'O singură instanță odată, într-un singur Availability Zone. (Excepție: Multi-Attach io1/io2 — până la 16 instanțe, același AZ, FS cluster-aware.)' } },
      { q: { en: 'How do you move an EBS volume to a different Availability Zone?', ro: 'Cum muți un volum EBS în alt Availability Zone?' }, a: { en: 'Take a snapshot (stored in S3), then restore it as a new volume in the target AZ.', ro: 'Faci un snapshot (stocat în S3), apoi îl restaurezi ca volum nou în AZ-ul țintă.' } },
      { q: { en: 'Object, block, or file storage — which one is EBS?', ro: 'Object, block sau file storage — care este EBS?' }, a: { en: 'Block storage — a virtual disk for one instance. (S3 = object, EFS = file.)', ro: 'Block storage — un disc virtual pentru o instanță. (S3 = object, EFS = file.)' } },
      { q: { en: 'A database needs 100,000 sustained IOPS with sub-millisecond latency. Which volume type?', ro: 'O bază de date are nevoie de 100.000 IOPS susținuți cu latență sub-milisecundă. Ce tip de volum?' }, a: { en: 'io2 Block Express — up to 256,000 IOPS and 64 TiB with sub-ms latency; gp3 caps at 16,000 IOPS and io1 at 64,000.', ro: 'io2 Block Express — până la 256.000 IOPS și 64 TiB cu latență sub-ms; gp3 se oprește la 16.000 IOPS, iar io1 la 64.000.' } },
      { q: { en: 'Cheapest EBS option for a log-processing workload that streams large sequential reads?', ro: 'Cea mai ieftină opțiune EBS pentru procesare de log-uri cu citiri secvențiale mari?' }, a: { en: 'st1 (Throughput Optimized HDD) — up to 500 MiB/s for sequential big-data workloads; sc1 if it is infrequently accessed and cost matters most.', ro: 'st1 (Throughput Optimized HDD) — până la 500 MiB/s pentru workload-uri big-data secvențiale; sc1 dacă e accesat rar și costul contează cel mai mult.' } },
    ],
    diagram: {
      steps: [
        { en: 'EC2 instance (1 AZ)', ro: 'Instanță EC2 (1 AZ)' },
        { en: 'EBS volume attached', ro: 'Volum EBS atașat' },
        { en: 'Snapshot to S3', ro: 'Snapshot în S3' },
        { en: 'Restore in another AZ', ro: 'Restaurare în alt AZ' },
      ],
      altText: { en: 'An EBS volume attaches to one EC2 instance in a single AZ; a snapshot to S3 lets you restore it in another AZ.', ro: 'Un volum EBS se atașează la o instanță EC2 într-un singur AZ; un snapshot în S3 îți permite restaurarea în alt AZ.' },
    },
  },
  {
    id: 'efs',
    abbreviation: 'EFS',
    fullName: 'Elastic File System',
    category: 'storage',
    level: 'clf',
    difficulty: 2,
    examFrequency: 'medium',
    description: {
      en: 'Managed NFS file system — multiple EC2 instances can access shared files simultaneously.',
      ro: 'Sistem fișiere NFS managed — mai multe instanțe EC2 accesează fișiere partajate simultan.',
    },
    analogy: {
      en: 'Like a shared network drive (NAS) — all servers see the same files.',
      ro: 'Ca un drive de rețea partajat (NAS) — toate serverele văd aceleași fișiere.',
    },
    examTips: [
      { key: 'multi_az', content: { en: 'Multi-AZ, multi-instance access (vs EBS single-AZ).', ro: 'Acces multi-AZ, multi-instanță (vs EBS single-AZ).' } },
      { key: 'linux_only', content: { en: 'Linux only (NFS protocol, POSIX file system).', ro: 'Doar Linux (protocol NFS, file system POSIX).' } },
      { key: 'auto_scale', content: { en: 'Auto-scales storage; pay only for what you use.', ro: 'Storage auto-scalat; plătești doar ce folosești.' } },
      { key: 'classes', content: { en: 'Storage classes: Standard, Infrequent Access (IA), Archive; One Zone variants for dev.', ro: 'Clase: Standard, Infrequent Access (IA), Archive; variante One Zone pentru dev.' } },
      { key: 'performance_modes', content: { en: 'Performance mode (SET AT CREATION): General Purpose (default, low latency) vs Max I/O (higher latency, massively parallel — big data/media).', ro: 'Mod de performanță (SETAT LA CREARE): General Purpose (implicit, latență mică) vs Max I/O (latență mai mare, masiv paralel — big data/media).' } },
      { key: 'throughput_modes', content: { en: 'Throughput mode: Bursting (scales with size) · Provisioned (fixed, decoupled from size) · Elastic (auto up/down — unpredictable workloads).', ro: 'Mod de throughput: Bursting (crește cu mărimea) · Provisioned (fix, decuplat de mărime) · Elastic (auto sus/jos — workload-uri imprevizibile).' } },
    ],
    pricing: { en: '$0.30/GB-month Standard · $0.025/GB IA', ro: '$0.30/GB-lună Standard · $0.025/GB IA' },
    connections: ['ec2', 'ecs', 'eks', 'kms'],
    docsUrl: 'https://docs.aws.amazon.com/efs/',
    visual: { color: 'hsl(38, 92%, 50%)', icon: 'database' },
    examDomains: ['design-performant', 'design-cost'],
    howItWorks: [
      { en: 'You create an EFS file system — a managed NFS share — with no capacity to provision up front.', ro: 'Creezi un file system EFS — un share NFS managed — fără să provizionezi capacitate dinainte.' },
      { en: 'It places mount targets in multiple Availability Zones, so the data is highly available.', ro: 'Plasează mount targets în mai multe Availability Zones, deci datele sunt înalt disponibile.' },
      { en: 'Many Linux EC2 instances (across AZs) mount it over NFS and read/write the SAME files at once.', ro: 'Mai multe instanțe EC2 Linux (din AZ-uri diferite) îl montează prin NFS și citesc/scriu ACELEAȘI fișiere simultan.' },
      { en: 'It scales storage automatically as files grow; a lifecycle policy moves cold files to EFS-IA.', ro: 'Scalează storage-ul automat pe măsură ce fișierele cresc; o politică de lifecycle mută fișierele reci în EFS-IA.' },
    ],
    keyFacts: [
      { en: 'File storage = a managed NFS share many EC2 instances can mount at the SAME TIME.', ro: 'File storage = un share NFS managed pe care multe instanțe EC2 îl pot monta SIMULTAN.' },
      { en: 'Works across MULTIPLE Availability Zones — highly available (unlike single-AZ EBS).', ro: 'Funcționează în MAI MULTE Availability Zones — înalt disponibil (spre deosebire de EBS single-AZ).' },
      { en: 'Linux only (POSIX file system, NFSv4 protocol) — not for Windows workloads.', ro: 'Doar Linux (file system POSIX, protocol NFSv4) — nu pentru workload-uri Windows.' },
      { en: 'Pay per use and scales automatically (elastic) — no capacity provisioning needed.', ro: 'Plătești per utilizare și scalează automat (elastic) — nu trebuie să provizionezi capacitate.' },
      { en: 'EFS-IA (Infrequent Access) is up to 92% cheaper; lifecycle policy moves cold files automatically.', ro: 'EFS-IA (Infrequent Access) e cu până la 92% mai ieftin; politica de lifecycle mută fișierele reci automat.' },
    ],
    keyNumbers: [
      { label: { en: 'Instances mounting at once', ro: 'Instanțe care montează simultan' }, value: { en: 'Many (thousands)', ro: 'Multe (mii)' } },
      { label: { en: 'Availability Zones spanned', ro: 'Availability Zones acoperite' }, value: { en: 'Multiple', ro: 'Multiple' } },
      { label: { en: 'EFS-IA cost saving', ro: 'Economie EFS-IA' }, value: { en: 'up to 92%', ro: 'până la 92%' } },
      { label: { en: 'OS supported', ro: 'OS suportat' }, value: { en: 'Linux only', ro: 'Doar Linux' } },
      { label: { en: 'Protocol', ro: 'Protocol' }, value: { en: 'NFSv4.1', ro: 'NFSv4.1' } },
      { label: { en: 'Elastic throughput max', ro: 'Throughput maxim Elastic' }, value: { en: '3 GiB/s read · 1 GiB/s write', ro: '3 GiB/s citire · 1 GiB/s scriere' } },
      { label: { en: 'One Zone cost saving', ro: 'Economie One Zone' }, value: { en: 'over 90% vs Standard', ro: 'peste 90% vs Standard' } },
    ],
    whenToUse: [
      { en: 'Many Linux EC2 instances must share the same files concurrently (web content, shared config).', ro: 'Mai multe instanțe EC2 Linux trebuie să partajeze aceleași fișiere simultan (conținut web, config partajat).' },
      { en: 'You need a file system available across multiple AZs for high availability.', ro: 'Ai nevoie de un file system disponibil în mai multe AZ-uri pentru disponibilitate înaltă.' },
      { en: 'Storage that grows and shrinks automatically without managing capacity.', ro: 'Storage care crește și scade automat fără să gestionezi capacitatea.' },
    ],
    whenNotToUse: [
      { en: 'Only one instance needs the disk, or you want lower cost per GB → use EBS (single instance, cheaper).', ro: 'Doar o instanță are nevoie de disc, sau vrei cost mai mic per GB → folosește EBS (o instanță, mai ieftin).' },
      { en: 'Your workload runs on Windows → EFS is Linux-only; use FSx (e.g. FSx for Windows File Server).', ro: 'Workload-ul rulează pe Windows → EFS e doar Linux; folosește FSx (ex. FSx for Windows File Server).' },
      { en: 'You store objects/files accessed over HTTP (backups, static assets) → use S3 (object storage).', ro: 'Stochezi obiecte/fișiere accesate prin HTTP (backup-uri, asset-uri statice) → folosește S3 (object storage).' },
    ],
    examTraps: [
      { en: 'The big one: S3 = object storage, EBS = block storage (one instance, one AZ), EFS = file storage (shared, multi-AZ, many instances).', ro: 'Cea mare: S3 = object storage, EBS = block storage (o instanță, un AZ), EFS = file storage (partajat, multi-AZ, multe instanțe).' },
      { en: '"Shared by many EC2 across AZs" = EFS. "One instance, one AZ" = EBS. Don\'t swap them.', ro: '„Partajat de multe EC2 între AZ-uri” = EFS. „O instanță, un AZ” = EBS. Nu le confunda.' },
      { en: 'EFS is Linux-only. If the question says Windows file shares, the answer is FSx, not EFS.', ro: 'EFS e doar Linux. Dacă întrebarea zice file shares Windows, răspunsul e FSx, nu EFS.' },
      { en: 'EFS costs more per GB than EBS/S3, but that is the price for shared, concurrent, multi-AZ access.', ro: 'EFS costă mai mult per GB decât EBS/S3, dar ăsta e prețul pentru acces partajat, concurent, multi-AZ.' },
      { en: 'Performance mode is chosen AT CREATION and cannot be changed later. Max I/O = more throughput/parallelism but HIGHER latency — wrong answer for latency-sensitive web apps.', ro: 'Modul de performanță se alege LA CREARE și nu se mai poate schimba. Max I/O = mai mult throughput/paralelism dar latență MAI MARE — răspuns greșit pentru aplicații web sensibile la latență.' },
      { en: '"Unpredictable / spiky workload" in an EFS question = Elastic throughput. "Throughput independent of stored size" = Provisioned. Bursting ties throughput to size (1 TB ≈ 50 MiB/s + bursts).', ro: '„Workload imprevizibil / cu vârfuri” într-o întrebare EFS = Elastic throughput. „Throughput independent de mărimea stocată” = Provisioned. Bursting leagă throughput-ul de mărime (1 TB ≈ 50 MiB/s + burst-uri).' },
      { en: 'EFS One Zone = single AZ (over 90% cheaper) — fine for dev/backup, WRONG for production HA scenarios.', ro: 'EFS One Zone = un singur AZ (peste 90% mai ieftin) — ok pentru dev/backup, GREȘIT pentru scenarii de producție cu HA.' },
    ],
    retrievalQuestions: [
      { q: { en: 'Can multiple EC2 instances across different AZs access the same EFS file system at once?', ro: 'Pot mai multe instanțe EC2 din AZ-uri diferite să acceseze același file system EFS simultan?' }, a: { en: 'Yes — EFS is a shared, multi-AZ file system mountable by many instances concurrently.', ro: 'Da — EFS e un file system partajat, multi-AZ, montabil de multe instanțe simultan.' } },
      { q: { en: 'Which operating systems can use EFS?', ro: 'Ce sisteme de operare pot folosi EFS?' }, a: { en: 'Linux only (NFS/POSIX). For Windows file shares, use FSx for Windows File Server.', ro: 'Doar Linux (NFS/POSIX). Pentru file shares Windows, folosește FSx for Windows File Server.' } },
      { q: { en: 'What does EFS-IA do and how much can it save?', ro: 'Ce face EFS-IA și cât poate economisi?' }, a: { en: 'Infrequent Access storage class for rarely-used files — up to 92% cheaper; a lifecycle policy moves files there automatically.', ro: 'Clasa Infrequent Access pentru fișiere rar folosite — cu până la 92% mai ieftin; o politică de lifecycle mută fișierele acolo automat.' } },
      { q: { en: 'When must you choose the EFS performance mode, and what are the two options?', ro: 'Când trebuie ales modul de performanță EFS și care sunt cele două opțiuni?' }, a: { en: 'At file-system creation (it cannot be changed later): General Purpose (default, low latency) or Max I/O (highly parallel big-data workloads, at the cost of higher latency).', ro: 'La crearea file system-ului (nu se mai poate schimba): General Purpose (implicit, latență mică) sau Max I/O (workload-uri big-data masiv paralele, cu prețul unei latențe mai mari).' } },
      { q: { en: 'Which EFS throughput mode fits an unpredictable, spiky workload?', ro: 'Ce mod de throughput EFS se potrivește unui workload imprevizibil, cu vârfuri?' }, a: { en: 'Elastic — it scales throughput up and down automatically (up to 3 GiB/s reads, 1 GiB/s writes). Bursting ties throughput to stored size; Provisioned fixes it regardless of size.', ro: 'Elastic — scalează throughput-ul automat sus și jos (până la 3 GiB/s citiri, 1 GiB/s scrieri). Bursting îl leagă de mărimea stocată; Provisioned îl fixează indiferent de mărime.' } },
    ],
    diagram: {
      steps: [
        { en: 'EFS file system', ro: 'File system EFS' },
        { en: 'Mount targets (multi-AZ)', ro: 'Mount targets (multi-AZ)' },
        { en: 'Many EC2 mount via NFS', ro: 'Multe EC2 montează prin NFS' },
        { en: 'Lifecycle → EFS-IA', ro: 'Lifecycle → EFS-IA' },
      ],
      altText: { en: 'One EFS file system exposes mount targets in several AZs; many Linux EC2 instances mount it over NFS, and a lifecycle policy moves cold files to EFS-IA.', ro: 'Un singur file system EFS expune mount targets în mai multe AZ-uri; multe instanțe EC2 Linux îl montează prin NFS, iar o politică de lifecycle mută fișierele reci în EFS-IA.' },
    },
    mermaidDiagram: {
      code: `flowchart LR
  EC2a[EC2 in AZ-a] --> EFS
  EC2b[EC2 in AZ-b] --> EFS
  EC2c[EC2 in AZ-c] --> EFS
  EFS[(EFS file system - shared, multi-AZ)]`,
      caption: { en: 'Unlike EBS, one EFS file system is mounted at the same time by many EC2 instances across multiple AZs.', ro: 'Spre deosebire de EBS, un singur file system EFS e montat simultan de multe instanțe EC2 din mai multe AZ-uri.' },
    },
  },
  {
    id: 'fsx',
    abbreviation: 'FSx',
    fullName: 'Amazon FSx',
    category: 'storage',
    level: 'clf',
    difficulty: 2,
    examFrequency: 'medium',
    description: {
      en: 'Managed third-party file systems — Windows File Server, Lustre, NetApp ONTAP, OpenZFS.',
      ro: 'File systems third-party managed — Windows File Server, Lustre, NetApp ONTAP, OpenZFS.',
    },
    analogy: {
      en: 'Like EFS but with non-AWS file systems (Windows shares, HPC, etc.).',
      ro: 'Ca EFS dar cu file systems non-AWS (Windows shares, HPC, etc.).',
    },
    examTips: [
      { key: 'windows', content: { en: 'FSx for Windows: SMB protocol + NTFS, Active Directory integration, DFS Namespaces, Multi-AZ option, daily backup to S3 — the answer for Windows file shares.', ro: 'FSx for Windows: protocol SMB + NTFS, integrare Active Directory, DFS Namespaces, opțiune Multi-AZ, backup zilnic în S3 — răspunsul pentru share-uri Windows.' } },
      { key: 'lustre', content: { en: 'FSx for Lustre: HPC, ML, video processing — 100s GB/s, millions of IOPS, sub-ms latency; reads/writes S3 natively as a file system.', ro: 'FSx for Lustre: HPC, ML, procesare video — sute de GB/s, milioane de IOPS, latență sub-ms; citește/scrie S3 nativ ca un file system.' } },
      { key: 'lustre_deployment', content: { en: 'Lustre deployment: SCRATCH (temporary, no replication, 6x burst, cheap) vs PERSISTENT (replicated in-AZ, long-term/sensitive data).', ro: 'Deployment Lustre: SCRATCH (temporar, fără replicare, burst 6x, ieftin) vs PERSISTENT (replicat în AZ, date pe termen lung/sensibile).' } },
      { key: 'netapp', content: { en: 'FSx for NetApp ONTAP: NFS + SMB + iSCSI (widest compatibility), storage auto-shrinks/grows, snapshots, dedup, instant point-in-time cloning — for migrating on-prem NAS/ONTAP.', ro: 'FSx for NetApp ONTAP: NFS + SMB + iSCSI (compatibilitatea cea mai largă), storage-ul crește/scade automat, snapshot-uri, dedup, clonare instant point-in-time — pentru migrarea NAS/ONTAP on-prem.' } },
      { key: 'openzfs', content: { en: 'FSx for OpenZFS: NFS only (v3–v4.2), up to 1,000,000 IOPS <0.5ms, snapshots + instant cloning — for migrating ZFS workloads.', ro: 'FSx for OpenZFS: doar NFS (v3–v4.2), până la 1.000.000 IOPS <0,5ms, snapshot-uri + clonare instant — pentru migrarea workload-urilor ZFS.' } },
    ],
    pricing: { en: 'Per GB-month, varies by file system', ro: 'Per GB-lună, variază pe file system' },
    connections: ['ec2', 'directoryservice', 's3', 'datasync'],
    docsUrl: 'https://docs.aws.amazon.com/fsx/',
    visual: { color: 'hsl(38, 92%, 50%)', icon: 'database' },
    examDomains: ['design-performant', 'design-cost'],
    howItWorks: [
      { en: 'You pick the file system flavor that matches the workload: Windows (SMB), Lustre (HPC), NetApp ONTAP (multi-protocol NAS), OpenZFS (ZFS/NFS).', ro: 'Alegi varianta de file system potrivită workload-ului: Windows (SMB), Lustre (HPC), NetApp ONTAP (NAS multi-protocol), OpenZFS (ZFS/NFS).' },
      { en: 'AWS provisions and manages the file servers; you mount the share from EC2 or from on-premises (VPN/Direct Connect).', ro: 'AWS provizionează și gestionează serverele de fișiere; montezi share-ul din EC2 sau din on-premises (VPN/Direct Connect).' },
      { en: 'For Lustre, an S3 bucket can be linked as a data repository — the cluster lazy-loads from S3 and writes results back.', ro: 'Pentru Lustre, un bucket S3 poate fi legat ca data repository — clusterul încarcă leneș din S3 și scrie rezultatele înapoi.' },
      { en: 'You choose SSD (latency-sensitive) or HDD (throughput/broad workloads) storage, and Single-AZ or Multi-AZ (Windows/ONTAP) deployment.', ro: 'Alegi stocare SSD (sensibil la latență) sau HDD (throughput/workload-uri generale) și deployment Single-AZ sau Multi-AZ (Windows/ONTAP).' },
    ],
    keyFacts: [
      { en: 'Four flavors: Windows File Server (SMB/AD), Lustre (HPC), NetApp ONTAP (NFS+SMB+iSCSI), OpenZFS (NFS).', ro: 'Patru variante: Windows File Server (SMB/AD), Lustre (HPC), NetApp ONTAP (NFS+SMB+iSCSI), OpenZFS (NFS).' },
      { en: 'FSx for Windows = THE managed Windows share: SMB, NTFS, Active Directory, ACLs, user quotas, Multi-AZ.', ro: 'FSx for Windows = share-ul Windows gestionat: SMB, NTFS, Active Directory, ACL-uri, cote de utilizator, Multi-AZ.' },
      { en: 'FSx for Lustre = parallel FS for HPC/ML with seamless S3 integration (read S3 as files, write back).', ro: 'FSx for Lustre = FS paralel pentru HPC/ML cu integrare S3 nativă (citești S3 ca fișiere, scrii înapoi).' },
      { en: 'Lustre scratch = temp, unreplicated, 6× burst; persistent = replicated within one AZ.', ro: 'Lustre scratch = temporar, nereplicat, burst 6×; persistent = replicat într-un singur AZ.' },
      { en: 'ONTAP/OpenZFS support instant point-in-time cloning — great for spinning up test copies.', ro: 'ONTAP/OpenZFS suportă clonare instant point-in-time — excelent pentru copii de test rapide.' },
    ],
    keyNumbers: [
      { label: { en: 'FSx for Windows scale', ro: 'Scară FSx for Windows' }, value: { en: '10s of GB/s · millions IOPS · 100s PB', ro: 'zeci de GB/s · milioane IOPS · sute de PB' } },
      { label: { en: 'FSx for Lustre scale', ro: 'Scară FSx for Lustre' }, value: { en: '100s of GB/s · sub-ms latency', ro: 'sute de GB/s · latență sub-ms' } },
      { label: { en: 'Lustre scratch burst', ro: 'Burst Lustre scratch' }, value: { en: '6× (200 MBps per TiB)', ro: '6× (200 MBps per TiB)' } },
      { label: { en: 'OpenZFS max IOPS', ro: 'IOPS maxim OpenZFS' }, value: { en: '1,000,000 (<0.5 ms)', ro: '1.000.000 (<0,5 ms)' } },
    ],
    whenToUse: [
      { en: 'Windows apps need SMB shares with Active Directory → FSx for Windows.', ro: 'Aplicații Windows au nevoie de share-uri SMB cu Active Directory → FSx for Windows.' },
      { en: 'HPC, ML training, financial modeling, video rendering on data in S3 → FSx for Lustre.', ro: 'HPC, antrenare ML, modelare financiară, randare video pe date din S3 → FSx for Lustre.' },
      { en: 'Migrating an on-prem NetApp/ZFS NAS with snapshots and clones → FSx for ONTAP / OpenZFS.', ro: 'Migrezi un NAS NetApp/ZFS on-prem cu snapshot-uri și clone → FSx for ONTAP / OpenZFS.' },
    ],
    whenNotToUse: [
      { en: 'Simple shared POSIX file system for Linux EC2 → EFS (serverless, elastic, no flavor management).', ro: 'File system POSIX partajat simplu pentru EC2 Linux → EFS (serverless, elastic, fără variante de gestionat).' },
      { en: 'Object storage accessed over HTTP APIs → S3.', ro: 'Stocare de obiecte accesată prin API-uri HTTP → S3.' },
      { en: 'A boot/database disk for one instance → EBS.', ro: 'Un disc de boot/bază de date pentru o instanță → EBS.' },
    ],
    examTraps: [
      { en: '"Windows file share / SMB / Active Directory" → FSx for Windows, NEVER EFS (EFS is Linux/NFS-only).', ro: '„File share Windows / SMB / Active Directory" → FSx for Windows, NICIODATĂ EFS (EFS e doar Linux/NFS).' },
      { en: '"HPC / machine learning / process S3 data as files at high throughput" → FSx for Lustre.', ro: '„HPC / machine learning / procesează date S3 ca fișiere la throughput mare" → FSx for Lustre.' },
      { en: 'Lustre SCRATCH loses data if a file server fails — short-term cost-optimized processing only; pick PERSISTENT for anything that must survive.', ro: 'Lustre SCRATCH pierde datele dacă un file server pică — doar procesare pe termen scurt optimizată la cost; alege PERSISTENT pentru orice trebuie să supraviețuiască.' },
      { en: 'Need NFS AND SMB AND iSCSI from one file system → only FSx for NetApp ONTAP does all three.', ro: 'Ai nevoie de NFS ȘI SMB ȘI iSCSI dintr-un singur file system → doar FSx for NetApp ONTAP le face pe toate trei.' },
    ],
    retrievalQuestions: [
      { q: { en: 'Which FSx flavor fits: (a) Windows shares with AD, (b) ML training reading S3, (c) migrating an on-prem NetApp NAS?', ro: 'Ce variantă FSx se potrivește: (a) share-uri Windows cu AD, (b) antrenare ML citind din S3, (c) migrarea unui NAS NetApp on-prem?' }, a: { en: '(a) FSx for Windows File Server, (b) FSx for Lustre, (c) FSx for NetApp ONTAP.', ro: '(a) FSx for Windows File Server, (b) FSx for Lustre, (c) FSx for NetApp ONTAP.' } },
      { q: { en: 'Scratch vs persistent Lustre — when is each appropriate?', ro: 'Lustre scratch vs persistent — când e potrivit fiecare?' }, a: { en: 'Scratch: temporary data, cost-optimized short-term processing, no replication, 6× burst. Persistent: long-term or sensitive data, replicated within the AZ, failed files replaced in minutes.', ro: 'Scratch: date temporare, procesare scurtă optimizată la cost, fără replicare, burst 6×. Persistent: date pe termen lung sau sensibile, replicate în AZ, fișierele eșuate se înlocuiesc în minute.' } },
      { q: { en: 'Can on-premises servers use FSx?', ro: 'Pot serverele on-premises să folosească FSx?' }, a: { en: 'Yes — FSx for Windows and Lustre (and ONTAP/OpenZFS) can be accessed from on-premises over VPN or Direct Connect.', ro: 'Da — FSx for Windows și Lustre (și ONTAP/OpenZFS) pot fi accesate din on-premises prin VPN sau Direct Connect.' } },
    ],
    mermaidDiagram: {
      code: 'flowchart TD; FSX{FSx - which workload?} -->|SMB + Active Directory| W[FSx for Windows]; FSX -->|HPC / ML + S3 data| L[FSx for Lustre]; FSX -->|NFS+SMB+iSCSI, NetApp migration| O[FSx for NetApp ONTAP]; FSX -->|ZFS / NFS migration| Z[FSx for OpenZFS]; L <-->|lazy load / write back| S3[(S3 bucket)]',
      caption: { en: 'Choose the FSx flavor by protocol and workload; Lustre uniquely treats an S3 bucket as its data repository.', ro: 'Alegi varianta FSx după protocol și workload; Lustre, unic, tratează un bucket S3 ca depozitul lui de date.' },
    },
  },
  {
    id: 'glacier',
    abbreviation: 'Glacier',
    fullName: 'Amazon S3 Glacier',
    category: 'storage',
    level: 'clf',
    difficulty: 2,
    examFrequency: 'high',
    description: {
      en: 'Ultra-low-cost archival storage for data accessed rarely — long-term retention.',
      ro: 'Stocare arhivă ultra-ieftină pentru date accesate rar — retenție pe termen lung.',
    },
    analogy: {
      en: 'Like a cold storage warehouse — cheap to store, slow to retrieve.',
      ro: 'Ca un depozit la rece — ieftin de stocat, lent la recuperare.',
    },
    examTips: [
      { key: 'instant', content: { en: 'Glacier Instant Retrieval: ms retrieval, $0.004/GB-month.', ro: 'Glacier Instant Retrieval: recuperare în ms, $0.004/GB-lună.' } },
      { key: 'flexible', content: { en: 'Glacier Flexible Retrieval: 1-12h retrieval, $0.0036/GB-month.', ro: 'Glacier Flexible Retrieval: 1-12h, $0.0036/GB-lună.' } },
      { key: 'deep', content: { en: 'Glacier Deep Archive: 12-48h retrieval, $0.00099/GB-month (cheapest).', ro: 'Glacier Deep Archive: 12-48h, $0.00099/GB-lună (cel mai ieftin).' } },
      { key: 'vault_lock', content: { en: 'Vault Lock: WORM (write-once-read-many) for compliance.', ro: 'Vault Lock: WORM (scrii o dată, citești de multe ori) pentru compliance.' } },
    ],
    pricing: { en: '$0.00099–$0.004/GB-month + retrieval fees', ro: '$0.00099–$0.004/GB-lună + taxe recuperare' },
    connections: ['s3', 'kms'],
    docsUrl: 'https://docs.aws.amazon.com/amazonglacier/',
    visual: { color: 'hsl(38, 92%, 50%)', icon: 'archive' },
    howItWorks: [
      { en: 'Glacier is a set of low-cost ARCHIVE storage classes of S3 for cold data.', ro: 'Glacier e un set de clase de stocare ARHIVĂ low-cost ale S3 pentru date reci.' },
      { en: 'You move rarely-accessed objects to Glacier (often via an S3 Lifecycle rule).', ro: 'Muți obiecte accesate rar în Glacier (deseori printr-o regulă S3 Lifecycle).' },
      { en: 'You trade cost for speed: cheaper classes take longer to retrieve the data.', ro: 'Faci troc cost contra viteză: clasele mai ieftine durează mai mult la recuperare.' },
      { en: 'When needed, you restore the object; retrieval time depends on the tier you chose.', ro: 'Când ai nevoie, restaurezi obiectul; timpul de recuperare depinde de tier-ul ales.' },
    ],
    keyFacts: [
      { en: 'Glacier = cheap long-term ARCHIVAL storage; it is a STORAGE CLASS of S3, not a separate service.', ro: 'Glacier = stocare ARHIVĂ ieftină pe termen lung; e o CLASĂ DE STOCARE a S3, nu un serviciu separat.' },
      { en: 'Instant Retrieval: millisecond access for archives you occasionally need fast.', ro: 'Instant Retrieval: acces în milisecunde pentru arhive de care ai uneori nevoie rapid.' },
      { en: 'Flexible Retrieval: minutes to hours to get data back, cheaper than Instant.', ro: 'Flexible Retrieval: minute până la ore ca să recuperezi datele, mai ieftin ca Instant.' },
      { en: 'Deep Archive: the cheapest class, ~12 hour retrieval, for data kept for years.', ro: 'Deep Archive: cea mai ieftină clasă, recuperare ~12 ore, pentru date păstrate ani.' },
      { en: 'Much cheaper per GB than S3 Standard — but not for frequently accessed data.', ro: 'Mult mai ieftin per GB decât S3 Standard — dar nu pentru date accesate frecvent.' },
    ],
    keyNumbers: [
      { label: { en: 'Instant Retrieval access time', ro: 'Timp acces Instant Retrieval' }, value: { en: 'milliseconds', ro: 'milisecunde' } },
      { label: { en: 'Flexible Retrieval access time', ro: 'Timp acces Flexible Retrieval' }, value: { en: 'minutes to hours', ro: 'minute până la ore' } },
      { label: { en: 'Deep Archive retrieval time', ro: 'Timp recuperare Deep Archive' }, value: { en: '~12 hours', ro: '~12 ore' } },
      { label: { en: 'Cheapest archive class', ro: 'Cea mai ieftină clasă arhivă' }, value: { en: 'Deep Archive', ro: 'Deep Archive' } },
    ],
    whenToUse: [
      { en: 'Long-term backups, compliance archives, or cold data you rarely (or never) read.', ro: 'Backup-uri pe termen lung, arhive de compliance sau date reci pe care le citești rar (sau niciodată).' },
      { en: 'You want the lowest possible storage cost and can tolerate slow retrieval.', ro: 'Vrei cel mai mic cost de stocare posibil și poți tolera recuperarea lentă.' },
      { en: 'Data kept for years that almost never needs fast access → Deep Archive.', ro: 'Date păstrate ani care aproape niciodată nu au nevoie de acces rapid → Deep Archive.' },
    ],
    whenNotToUse: [
      { en: 'Frequently accessed or latency-sensitive data → use S3 Standard.', ro: 'Date accesate frecvent sau sensibile la latență → folosește S3 Standard.' },
      { en: 'Data with unknown/changing access patterns → use S3 Intelligent-Tiering.', ro: 'Date cu tipare de acces necunoscute/schimbătoare → folosește S3 Intelligent-Tiering.' },
      { en: 'You need a POSIX file system for servers → use EFS, not Glacier.', ro: 'Ai nevoie de un sistem de fișiere POSIX pentru servere → folosește EFS, nu Glacier.' },
    ],
    examTraps: [
      { en: 'Glacier is a STORAGE CLASS of S3 — not a separate, standalone service.', ro: 'Glacier e o CLASĂ DE STOCARE a S3 — nu un serviciu separat de sine stătător.' },
      { en: 'Deep Archive = cheapest + slowest (~12h). Instant Retrieval = ms but more expensive than the others.', ro: 'Deep Archive = cel mai ieftin + cel mai lent (~12h). Instant Retrieval = ms dar mai scump decât celelalte.' },
      { en: 'Glacier is for ARCHIVAL/cold data; for frequently accessed data use S3 Standard.', ro: 'Glacier e pentru date ARHIVĂ/reci; pentru date accesate frecvent folosește S3 Standard.' },
      { en: 'Cheaper retrieval tier = longer retrieval time. Read the latency requirement in the question.', ro: 'Tier de recuperare mai ieftin = timp de recuperare mai lung. Citește cerința de latență din întrebare.' },
    ],
    retrievalQuestions: [
      { q: { en: 'Is Glacier a separate service or part of S3?', ro: 'Glacier e un serviciu separat sau parte din S3?' }, a: { en: 'It is a set of low-cost archive STORAGE CLASSES of S3 — not a standalone service.', ro: 'E un set de CLASE DE STOCARE arhivă low-cost ale S3 — nu un serviciu de sine stătător.' } },
      { q: { en: 'Which Glacier tier is the cheapest and slowest?', ro: 'Care tier Glacier e cel mai ieftin și cel mai lent?' }, a: { en: 'Glacier Deep Archive — lowest cost per GB with ~12 hour retrieval, for data kept for years.', ro: 'Glacier Deep Archive — cel mai mic cost per GB cu recuperare ~12 ore, pentru date păstrate ani.' } },
      { q: { en: 'You need archived data back in milliseconds occasionally — which class?', ro: 'Ai nevoie ocazional de date arhivate înapoi în milisecunde — care clasă?' }, a: { en: 'Glacier Instant Retrieval — millisecond access for rarely-accessed archives.', ro: 'Glacier Instant Retrieval — acces în milisecunde pentru arhive accesate rar.' } },
      { q: { en: 'Should you store frequently accessed data in Glacier?', ro: 'Ar trebui să stochezi date accesate frecvent în Glacier?' }, a: { en: 'No — Glacier is for cold/archival data; for frequent access use S3 Standard.', ro: 'Nu — Glacier e pentru date reci/arhivă; pentru acces frecvent folosește S3 Standard.' } },
    ],
    diagram: {
      steps: [
        { en: 'Cold / archival data', ro: 'Date reci / arhivă' },
        { en: 'Move to Glacier class', ro: 'Muți în clasa Glacier' },
        { en: 'Pick retrieval tier', ro: 'Alegi tier de recuperare' },
        { en: 'Restore when needed', ro: 'Restaurezi când ai nevoie' },
      ],
      altText: { en: 'Cold data is moved into a Glacier storage class of S3; you pick a retrieval tier trading cost for speed and restore it when needed.', ro: 'Datele reci sunt mutate într-o clasă de stocare Glacier a S3; alegi un tier de recuperare care face troc cost contra viteză și le restaurezi când ai nevoie.' },
    },
  },
  {
    id: 'storagegateway',
    abbreviation: 'Storage GW',
    fullName: 'AWS Storage Gateway',
    category: 'storage',
    level: 'clf',
    difficulty: 2,
    examFrequency: 'medium',
    description: {
      en: 'Hybrid storage bridge — extend on-premises storage to AWS S3/Glacier.',
      ro: 'Bridge storage hibrid — extinzi stocarea on-premises la AWS S3/Glacier.',
    },
    analogy: {
      en: 'Like a translator between your on-prem servers and AWS cloud storage.',
      ro: 'Ca un traducător între serverele on-prem și storage-ul AWS.',
    },
    examTips: [
      { key: 'file', content: { en: 'File Gateway: NFS/SMB → S3 (cached locally).', ro: 'File Gateway: NFS/SMB → S3 (cache local).' } },
      { key: 'volume', content: { en: 'Volume Gateway: iSCSI → S3 with snapshots.', ro: 'Volume Gateway: iSCSI → S3 cu snapshots.' } },
      { key: 'tape', content: { en: 'Tape Gateway: virtual tape library → S3 Glacier.', ro: 'Tape Gateway: tape library virtuală → S3 Glacier.' } },
    ],
    pricing: { en: 'Per gateway-hour + S3/Glacier storage', ro: 'Per gateway-oră + storage S3/Glacier' },
    connections: ['s3', 'glacier', 'kms', 'ebs', 'awsbackup'],
    docsUrl: 'https://docs.aws.amazon.com/storagegateway/',
    visual: { color: 'hsl(38, 92%, 50%)', icon: 'database' },
    examDomains: ['design-resilient', 'design-performant'],
    howItWorks: [
      { en: 'You deploy the gateway on-premises as a VM (VMware/Hyper-V/KVM) or a hardware appliance.', ro: 'Instalezi gateway-ul on-premises ca VM (VMware/Hyper-V/KVM) sau ca appliance hardware.' },
      { en: 'Local apps talk to it over standard protocols: NFS/SMB (File), iSCSI (Volume), iSCSI VTL (Tape).', ro: 'Aplicațiile locale vorbesc cu el prin protocoale standard: NFS/SMB (File), iSCSI (Volume), iSCSI VTL (Tape).' },
      { en: 'The gateway stores everything in AWS (S3, EBS snapshots, Glacier) over HTTPS, encrypted in transit.', ro: 'Gateway-ul stochează totul în AWS (S3, snapshot-uri EBS, Glacier) prin HTTPS, criptat în tranzit.' },
      { en: 'A local cache keeps the most recently used data on-premises for low-latency access.', ro: 'Un cache local păstrează datele folosite recent on-premises, pentru acces cu latență mică.' },
    ],
    keyFacts: [
      { en: 'THE hybrid-storage answer: bridges on-premises apps to AWS storage without changing protocols.', ro: 'Răspunsul standard pentru storage hibrid: leagă aplicațiile on-premises de storage-ul AWS fără a schimba protocoalele.' },
      { en: 'S3 File Gateway — S3 buckets exposed over NFS/SMB; recently used data cached locally; SMB integrates with Active Directory.', ro: 'S3 File Gateway — bucket-uri S3 expuse prin NFS/SMB; datele recente sunt în cache local; SMB se integrează cu Active Directory.' },
      { en: 'Volume Gateway — iSCSI block volumes backed by S3, protected with EBS snapshots. Cached mode = recent data local; Stored mode = FULL dataset local, async backup to AWS.', ro: 'Volume Gateway — volume block iSCSI stocate în S3, protejate cu snapshot-uri EBS. Cached = datele recente local; Stored = TOT datasetul local, backup asincron în AWS.' },
      { en: 'Tape Gateway — Virtual Tape Library (VTL): existing backup software writes "tapes" to S3, archived to Glacier.', ro: 'Tape Gateway — Virtual Tape Library (VTL): software-ul de backup existent scrie „benzi” în S3, arhivate în Glacier.' },
      { en: 'Runs on-premises as a VM or hardware appliance; data is encrypted in transit to AWS.', ro: 'Rulează on-premises ca VM sau appliance hardware; datele sunt criptate în tranzit către AWS.' },
    ],
    keyNumbers: [
      { label: { en: 'Gateway types', ro: 'Tipuri de gateway' }, value: { en: '3 — File, Volume, Tape', ro: '3 — File, Volume, Tape' } },
      { label: { en: 'Protocols', ro: 'Protocoale' }, value: { en: 'NFS/SMB · iSCSI · iSCSI VTL', ro: 'NFS/SMB · iSCSI · iSCSI VTL' } },
      { label: { en: 'Volume Gateway modes', ro: 'Moduri Volume Gateway' }, value: { en: 'Cached vs Stored', ro: 'Cached vs Stored' } },
    ],
    whenToUse: [
      { en: 'On-premises apps need low-latency access to data that lives in S3 (File Gateway cache).', ro: 'Aplicațiile on-premises au nevoie de acces cu latență mică la date care stau în S3 (cache-ul File Gateway).' },
      { en: 'Replace physical tape backup infrastructure while keeping the existing backup software (Tape Gateway).', ro: 'Înlocuiești infrastructura de benzi fizice păstrând software-ul de backup existent (Tape Gateway).' },
      { en: 'Back up on-premises iSCSI volumes to AWS as EBS snapshots for DR (Volume Gateway).', ro: 'Faci backup volumelor iSCSI on-premises în AWS ca snapshot-uri EBS pentru DR (Volume Gateway).' },
      { en: 'Gradual cloud migration where on-prem and AWS must share the same data for a while.', ro: 'Migrare graduală în cloud, unde on-prem și AWS trebuie să partajeze aceleași date o vreme.' },
    ],
    whenNotToUse: [
      { en: 'One-time bulk migration of a large dataset → DataSync (online) or Snowball Edge (offline).', ro: 'Migrare unică a unui dataset mare → DataSync (online) sau Snowball Edge (offline).' },
      { en: 'The workload runs fully in AWS → use native S3/EBS/EFS/FSx directly.', ro: 'Workload-ul rulează complet în AWS → folosește direct S3/EBS/EFS/FSx nativ.' },
      { en: 'Partners upload files over SFTP/FTPS → AWS Transfer Family, not Storage Gateway.', ro: 'Partenerii încarcă fișiere prin SFTP/FTPS → AWS Transfer Family, nu Storage Gateway.' },
    ],
    examTraps: [
      { en: 'Volume Gateway CACHED vs STORED: Cached = primary data in S3, recent data local (save local space). Stored = ENTIRE dataset local, async backups to S3 (lowest latency for everything). The exam loves this split.', ro: 'Volume Gateway CACHED vs STORED: Cached = datele primare în S3, cele recente local (economisești spațiu local). Stored = TOT datasetul local, backup asincron în S3 (latență minimă pentru tot). Examenul adoră diferența asta.' },
      { en: 'File Gateway writes to S3 Standard / IA / One Zone-IA / Intelligent-Tiering — NOT directly to Glacier. Transition to Glacier via an S3 lifecycle policy.', ro: 'File Gateway scrie în S3 Standard / IA / One Zone-IA / Intelligent-Tiering — NU direct în Glacier. Tranziția spre Glacier se face printr-o politică de lifecycle S3.' },
      { en: '"Keep using existing tape-based backup processes/software" = Tape Gateway (VTL). Do not answer AWS Backup for that phrase.', ro: '„Păstrează procesele/software-ul existent de backup pe bandă” = Tape Gateway (VTL). Nu răspunde AWS Backup la formularea asta.' },
      { en: '"Low-latency ON-PREMISES access to S3 data" = S3 File Gateway. "Sync data TO AWS on a schedule" = DataSync. Different questions, different answers.', ro: '„Acces cu latență mică ON-PREMISES la date din S3” = S3 File Gateway. „Sincronizează date SPRE AWS programat” = DataSync. Întrebări diferite, răspunsuri diferite.' },
    ],
    retrievalQuestions: [
      { q: { en: 'What are the three types of Storage Gateway and their protocols?', ro: 'Care sunt cele trei tipuri de Storage Gateway și protocoalele lor?' }, a: { en: 'S3 File Gateway (NFS/SMB → S3), Volume Gateway (iSCSI block volumes → S3 + EBS snapshots), Tape Gateway (iSCSI VTL → S3/Glacier).', ro: 'S3 File Gateway (NFS/SMB → S3), Volume Gateway (volume block iSCSI → S3 + snapshot-uri EBS), Tape Gateway (iSCSI VTL → S3/Glacier).' } },
      { q: { en: 'Volume Gateway: what is the difference between Cached and Stored volumes?', ro: 'Volume Gateway: care e diferența dintre volume Cached și Stored?' }, a: { en: 'Cached: primary data lives in S3, only recently used data is kept locally. Stored: the entire dataset stays on-premises with scheduled async backups to S3 as EBS snapshots.', ro: 'Cached: datele primare stau în S3, doar cele recente rămân local. Stored: tot datasetul rămâne on-premises, cu backup asincron programat în S3 ca snapshot-uri EBS.' } },
      { q: { en: 'How does data written through a File Gateway end up in Glacier?', ro: 'Cum ajung în Glacier datele scrise printr-un File Gateway?' }, a: { en: 'It cannot write to Glacier directly — it lands in S3 (Standard/IA/One Zone-IA/Intelligent-Tiering) and an S3 lifecycle policy transitions it to Glacier.', ro: 'Nu poate scrie direct în Glacier — datele ajung în S3 (Standard/IA/One Zone-IA/Intelligent-Tiering), iar o politică de lifecycle S3 le mută în Glacier.' } },
    ],
    diagram: {
      steps: [
        { en: 'On-prem app (NFS/SMB/iSCSI)', ro: 'Aplicație on-prem (NFS/SMB/iSCSI)' },
        { en: 'Storage Gateway VM + local cache', ro: 'VM Storage Gateway + cache local' },
        { en: 'HTTPS to AWS', ro: 'HTTPS către AWS' },
        { en: 'S3 / EBS snapshots / Glacier', ro: 'S3 / snapshot-uri EBS / Glacier' },
      ],
      altText: { en: 'On-premises applications talk to a local Storage Gateway VM over standard protocols; the gateway caches hot data locally and stores everything in AWS over HTTPS.', ro: 'Aplicațiile on-premises vorbesc cu un VM Storage Gateway local prin protocoale standard; gateway-ul ține datele calde în cache local și stochează totul în AWS prin HTTPS.' },
    },
  },
  {
    id: 'snow',
    abbreviation: 'Snow Family',
    fullName: 'AWS Snow Family',
    category: 'storage',
    level: 'clf',
    difficulty: 2,
    examFrequency: 'medium',
    description: {
      en: 'Physical devices for transferring large data sets to/from AWS via shipping.',
      ro: 'Dispozitive fizice pentru transfer seturi mari de date la/de la AWS prin poștă.',
    },
    analogy: {
      en: 'Like FedEx-ing a giant USB drive — faster than internet for terabytes.',
      ro: 'Ca trimiterea unui USB uriaș prin curier — mai rapid decât internet pentru terabytes.',
    },
    examTips: [
      { key: 'storage_optimized', content: { en: 'Snowball Edge Storage Optimized: 210 TB — bulk data migration.', ro: 'Snowball Edge Storage Optimized: 210 TB — migrare de date în masă.' } },
      { key: 'compute_optimized', content: { en: 'Snowball Edge Compute Optimized: 104 vCPU / 416 GB RAM — edge computing (EC2/Lambda on the device).', ro: 'Snowball Edge Compute Optimized: 104 vCPU / 416 GB RAM — edge computing (EC2/Lambda pe dispozitiv).' } },
      { key: 'rule', content: { en: 'Rule: if the network transfer would take MORE THAN A WEEK, ship a Snowball.', ro: 'Regulă: dacă transferul pe rețea ar dura PESTE O SĂPTĂMÂNĂ, trimite un Snowball.' } },
      { key: 'discontinued', content: { en: 'Snowcone (8 TB) and Snowmobile (100 PB truck) were DISCONTINUED in 2024 — current answers use Snowball Edge.', ro: 'Snowcone (8 TB) și Snowmobile (camionul de 100 PB) au fost RETRASE în 2024 — răspunsurile actuale folosesc Snowball Edge.' } },
    ],
    pricing: { en: 'Per device + shipping + S3 storage', ro: 'Per device + livrare + storage S3' },
    connections: ['s3', 'ec2', 'lambda'],
    docsUrl: 'https://docs.aws.amazon.com/snowball/',
    visual: { color: 'hsl(38, 92%, 50%)', icon: 'box' },
    examDomains: ['design-performant', 'design-cost'],
    howItWorks: [
      { en: 'You order a Snowball Edge device from the AWS console; AWS ships it to your site.', ro: 'Comanzi un dispozitiv Snowball Edge din consola AWS; AWS îl livrează la tine.' },
      { en: 'You copy data onto it locally (it is a rugged, encrypted appliance) — no internet bandwidth used.', ro: 'Copiezi datele pe el local (e un appliance robust, criptat) — nu consumi bandă de internet.' },
      { en: 'You ship it back; AWS imports the data into an S3 bucket. End-to-end takes about a week.', ro: 'Îl trimiți înapoi; AWS importă datele într-un bucket S3. Cap-coadă durează cam o săptămână.' },
      { en: 'Compute Optimized devices can also RUN EC2 instances and Lambda functions at the edge (ships, mines, trucks) before the data ever reaches AWS.', ro: 'Dispozitivele Compute Optimized pot și RULA instanțe EC2 și funcții Lambda la edge (nave, mine, camioane) înainte ca datele să ajungă în AWS.' },
    ],
    keyFacts: [
      { en: 'Offline data migration: petabyte-scale transfer by physically shipping encrypted devices.', ro: 'Migrare de date offline: transfer la scară de petabytes prin livrarea fizică a unor dispozitive criptate.' },
      { en: 'Storage Optimized = 210 TB per device. Compute Optimized = 104 vCPU / 416 GB RAM for edge computing.', ro: 'Storage Optimized = 210 TB per dispozitiv. Compute Optimized = 104 vCPU / 416 GB RAM pentru edge computing.' },
      { en: 'Data always lands in S3 first — Snowball CANNOT import directly into Glacier (use an S3 lifecycle policy).', ro: 'Datele ajung mereu întâi în S3 — Snowball NU poate importa direct în Glacier (folosește o politică de lifecycle S3).' },
      { en: 'Edge computing: run EC2/Lambda on the device where there is little or no connectivity.', ro: 'Edge computing: rulezi EC2/Lambda pe dispozitiv acolo unde conectivitatea e slabă sau lipsește.' },
      { en: 'Snowcone and Snowmobile are discontinued (2024) — Snowball Edge is the family now.', ro: 'Snowcone și Snowmobile sunt retrase (2024) — familia înseamnă acum Snowball Edge.' },
    ],
    keyNumbers: [
      { label: { en: 'Storage Optimized capacity', ro: 'Capacitate Storage Optimized' }, value: { en: '210 TB', ro: '210 TB' } },
      { label: { en: 'Compute Optimized specs', ro: 'Specificații Compute Optimized' }, value: { en: '104 vCPU · 416 GB RAM · 28 TB SSD', ro: '104 vCPU · 416 GB RAM · 28 TB SSD' } },
      { label: { en: 'End-to-end transfer time', ro: 'Timp de transfer cap-coadă' }, value: { en: '~1 week', ro: '~1 săptămână' } },
      { label: { en: '100 TB over 1 Gbps line', ro: '100 TB pe o linie de 1 Gbps' }, value: { en: '~12 days (network) vs ~1 week (Snowball)', ro: '~12 zile (rețea) vs ~1 săptămână (Snowball)' } },
    ],
    whenToUse: [
      { en: 'Migrating tens of TB or more over a slow/expensive/unstable connection.', ro: 'Migrezi zeci de TB sau mai mult pe o conexiune lentă/scumpă/instabilă.' },
      { en: 'The network transfer would take more than about a week.', ro: 'Transferul pe rețea ar dura mai mult de aproximativ o săptămână.' },
      { en: 'Edge locations with no reliable connectivity that must process data locally (Compute Optimized).', ro: 'Locații edge fără conectivitate fiabilă, care trebuie să proceseze date local (Compute Optimized).' },
    ],
    whenNotToUse: [
      { en: 'Ongoing/recurring sync to AWS → DataSync over the network (or VPN/Direct Connect).', ro: 'Sincronizare continuă/recurentă spre AWS → DataSync prin rețea (sau VPN/Direct Connect).' },
      { en: 'The dataset is small enough to upload in days → direct upload / DataSync is simpler and faster.', ro: 'Datasetul e suficient de mic să-l urci în câteva zile → upload direct / DataSync e mai simplu și mai rapid.' },
      { en: 'On-prem apps need CONTINUOUS access to cloud data → Storage Gateway (hybrid), not a one-shot device.', ro: 'Aplicațiile on-prem au nevoie de acces CONTINUU la datele din cloud → Storage Gateway (hibrid), nu un dispozitiv one-shot.' },
    ],
    examTraps: [
      { en: 'Snowball cannot import directly into Glacier — data lands in S3, then an S3 lifecycle policy archives it. Classic trick question.', ro: 'Snowball nu poate importa direct în Glacier — datele ajung în S3, apoi o politică de lifecycle S3 le arhivează. Întrebare-capcană clasică.' },
      { en: 'The ">1 week over the network" threshold is the trigger phrase for Snowball in cost/performance scenarios.', ro: 'Pragul „>1 săptămână pe rețea” e formularea-declanșator pentru Snowball în scenarii de cost/performanță.' },
      { en: 'Older study material still lists Snowcone (8 TB) and Snowmobile (100 PB): both discontinued in 2024. If they appear as options, the intended answer today is Snowball Edge.', ro: 'Materialele vechi încă listează Snowcone (8 TB) și Snowmobile (100 PB): ambele retrase în 2024. Dacă apar ca opțiuni, răspunsul corect azi e Snowball Edge.' },
      { en: 'One-time bulk move = Snowball. Scheduled ongoing sync = DataSync. Hybrid continuous access = Storage Gateway.', ro: 'Mutare unică în masă = Snowball. Sincronizare programată continuă = DataSync. Acces hibrid continuu = Storage Gateway.' },
    ],
    retrievalQuestions: [
      { q: { en: 'When does Snowball beat a network transfer?', ro: 'Când e Snowball mai bun decât transferul pe rețea?' }, a: { en: 'When the online transfer would take more than about a week (e.g. 100 TB at 1 Gbps ≈ 12 days) — Snowball is ~1 week end-to-end regardless of size.', ro: 'Când transferul online ar dura peste o săptămână (ex. 100 TB la 1 Gbps ≈ 12 zile) — Snowball durează ~1 săptămână cap-coadă indiferent de mărime.' } },
      { q: { en: 'Can Snowball import data directly into Glacier?', ro: 'Poate Snowball să importe date direct în Glacier?' }, a: { en: 'No — data must land in S3 first; an S3 lifecycle policy then transitions it to Glacier.', ro: 'Nu — datele ajung întâi în S3; apoi o politică de lifecycle S3 le mută în Glacier.' } },
      { q: { en: 'Which Snowball Edge variant do you pick for edge computing, and what can it run?', ro: 'Ce variantă de Snowball Edge alegi pentru edge computing și ce poate rula?' }, a: { en: 'Compute Optimized (104 vCPU, 416 GB RAM) — it runs EC2 instances and Lambda functions locally, e.g. preprocessing or ML at remote sites.', ro: 'Compute Optimized (104 vCPU, 416 GB RAM) — rulează local instanțe EC2 și funcții Lambda, ex. preprocesare sau ML în locații izolate.' } },
    ],
  },
  {
    id: 'awsbackup',
    abbreviation: 'Backup',
    fullName: 'AWS Backup',
    category: 'storage',
    level: 'clf',
    difficulty: 1,
    examFrequency: 'medium',
    description: {
      en: 'Centralized backup service across AWS services (EC2, EBS, RDS, DynamoDB, EFS, FSx).',
      ro: 'Serviciu centralizat de backup pentru servicii AWS (EC2, EBS, RDS, DynamoDB, EFS, FSx).',
    },
    analogy: {
      en: 'Like Time Machine for your AWS account — automatic, scheduled, central.',
      ro: 'Ca Time Machine pentru contul AWS — automat, programat, central.',
    },
    examTips: [
      { key: 'no_scripts', content: { en: 'No need for custom backup scripts — built-in for many services.', ro: 'Fără script-uri custom — built-in pentru multe servicii.' } },
      { key: 'cross_region', content: { en: 'Supports cross-region and cross-account backups.', ro: 'Suportă backup cross-region și cross-account.' } },
      { key: 'compliance', content: { en: 'PITR (Point-in-Time Recovery), Vault Lock for compliance.', ro: 'PITR (Point-in-Time Recovery), Vault Lock pentru compliance.' } },
    ],
    pricing: { en: 'Per GB-month backed up + restore costs', ro: 'Per GB-lună backup + costuri restore' },
    connections: ['ec2', 'ebs', 'rds', 'dynamodb', 'efs', 'fsx', 's3'],
    docsUrl: 'https://docs.aws.amazon.com/aws-backup/',
    visual: { color: 'hsl(38, 92%, 50%)', icon: 'archive' },
  },
];

// All services aggregated (87 services covering CLF-C02)
export const services: Service[] = [
  ...computeServices,
  ...storageServices,
  ...databaseServices,
  ...networkServices,
  ...securityServices,
  ...managementServices,
  ...integrationServices,
  ...analyticsServices,
  ...migrationServices,
  ...billingServices,
  ...enduserServices,
  ...saaServices,
  ...saaSecurityServices,
  ...saaDatabaseServices,
  ...saaAnalyticsServices,
];

/** Services visible on the given exam (no `exams` field = visible on both). */
export function getServicesForExam(exam: 'clf' | 'saa'): Service[] {
  return services.filter((s) => !s.exams || s.exams.includes(exam));
}

export function getServiceById(id: string): Service | undefined {
  return services.find((s) => s.id === id);
}

export function getServicesByCategory(categoryId: string): Service[] {
  return services.filter((s) => s.category === categoryId);
}

export function getServicesByLevel(level: 'clf' | 'saa' | 'sap'): Service[] {
  return services.filter((s) => s.level === level);
}
