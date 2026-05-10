import type { Service } from '@/types';
import { databaseServices } from './services-database';
import { networkServices } from './services-network';
import { securityServices } from './services-security';
import { managementServices } from './services-management';
import { integrationServices } from './services-integration';
import { analyticsServices } from './services-analytics';
import { migrationServices, billingServices, enduserServices } from './services-rest';

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
    ],
    pricing: {
      en: 'Free tier: 1M requests/month + 400,000 GB-seconds free.',
      ro: 'Free tier: 1M cereri/lună + 400,000 GB-secunde gratuit.',
    },
    connections: ['s3', 'dynamodb', 'apigateway', 'sqs', 'sns', 'eventbridge', 'cloudwatch', 'iam'],
    docsUrl: 'https://docs.aws.amazon.com/lambda/',
    visual: { color: 'hsl(217, 91%, 60%)', icon: 'zap' },
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
  },
  {
    id: 'lightsail',
    abbreviation: 'Lightsail',
    fullName: 'Amazon Lightsail',
    category: 'compute',
    level: 'clf',
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
      { key: 'bucket_object', content: { en: 'Bucket = container (globally unique name); Object = file (max 5TB).', ro: 'Bucket = container (nume global unic); Object = fișier (max 5TB).' } },
      { key: 'storage_classes', content: { en: 'Classes: Standard, IA, Intelligent-Tiering, Glacier (Instant/Flexible/Deep).', ro: 'Clase: Standard, IA, Intelligent-Tiering, Glacier (Instant/Flexible/Deep).' } },
      { key: 'versioning', content: { en: 'Versioning preserves object versions; enables rollback.', ro: 'Versioning păstrează versiuni; permite rollback.' } },
      { key: 'encryption', content: { en: 'Encryption: SSE-S3, SSE-KMS, SSE-C, client-side (CSE).', ro: 'Criptare: SSE-S3, SSE-KMS, SSE-C, client-side (CSE).' } },
      { key: 'lifecycle', content: { en: 'Lifecycle rules transition objects to cheaper classes automatically.', ro: 'Lifecycle rules mută obiectele în clase ieftine automat.' } },
      { key: 'static_hosting', content: { en: 'Can host static websites (HTML/CSS/JS) directly.', ro: 'Poate găzdui website-uri statice (HTML/CSS/JS) direct.' } },
      { key: 'replication', content: { en: 'CRR (cross-region) and SRR (same-region) replication.', ro: 'Replicare CRR (cross-region) și SRR (same-region).' } },
      { key: 'presigned_urls', content: { en: 'Pre-signed URLs grant temporary access without AWS auth.', ro: 'Pre-signed URLs dau acces temporar fără auth AWS.' } },
    ],
    pricing: { en: '$0.023/GB-month Standard · 5GB free tier', ro: '$0.023/GB-lună Standard · 5GB free tier' },
    connections: ['cloudfront', 'lambda', 'glacier', 'athena', 'kms', 'iam', 'sns', 'sqs'],
    docsUrl: 'https://docs.aws.amazon.com/s3/',
    visual: { color: 'hsl(38, 92%, 50%)', icon: 'database' },
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
      { key: 'types', content: { en: 'Types: gp3 (general SSD), io2 (high IOPS), st1 (HDD throughput), sc1 (cold HDD).', ro: 'Tipuri: gp3 (SSD general), io2 (IOPS înalt), st1 (HDD throughput), sc1 (HDD rece).' } },
      { key: 'snapshots', content: { en: 'Snapshots stored in S3, can copy across regions.', ro: 'Snapshot-uri în S3, copiabile cross-region.' } },
      { key: 'multi_attach', content: { en: 'io1/io2 can multi-attach to multiple EC2 in same AZ.', ro: 'io1/io2 multi-attach la mai multe EC2 în același AZ.' } },
      { key: 'free_tier', content: { en: '30GB free tier (gp2/gp3 or magnetic).', ro: '30GB free tier (gp2/gp3 sau magnetic).' } },
    ],
    pricing: { en: 'gp3: $0.08/GB-month + IOPS/throughput', ro: 'gp3: $0.08/GB-lună + IOPS/throughput' },
    connections: ['ec2', 'kms', 's3'],
    docsUrl: 'https://docs.aws.amazon.com/ebs/',
    visual: { color: 'hsl(38, 92%, 50%)', icon: 'database' },
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
      { key: 'classes', content: { en: 'Storage classes: Standard, Infrequent Access (IA).', ro: 'Clase: Standard, Infrequent Access (IA).' } },
    ],
    pricing: { en: '$0.30/GB-month Standard · $0.025/GB IA', ro: '$0.30/GB-lună Standard · $0.025/GB IA' },
    connections: ['ec2', 'ecs', 'eks', 'kms'],
    docsUrl: 'https://docs.aws.amazon.com/efs/',
    visual: { color: 'hsl(38, 92%, 50%)', icon: 'database' },
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
      { key: 'windows', content: { en: 'FSx for Windows: SMB protocol, AD integration, Windows file shares.', ro: 'FSx for Windows: protocol SMB, integrare AD, share-uri Windows.' } },
      { key: 'lustre', content: { en: 'FSx for Lustre: HPC, ML, video processing — high throughput.', ro: 'FSx for Lustre: HPC, ML, video — throughput înalt.' } },
      { key: 'netapp', content: { en: 'FSx for NetApp ONTAP: SAN/NAS, snapshots, dedup, compression.', ro: 'FSx for NetApp ONTAP: SAN/NAS, snapshot-uri, dedup, compresie.' } },
    ],
    pricing: { en: 'Per GB-month, varies by file system', ro: 'Per GB-lună, variază pe file system' },
    connections: ['ec2', 'directoryservice', 's3'],
    docsUrl: 'https://docs.aws.amazon.com/fsx/',
    visual: { color: 'hsl(38, 92%, 50%)', icon: 'database' },
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
    connections: ['s3', 'glacier', 'kms'],
    docsUrl: 'https://docs.aws.amazon.com/storagegateway/',
    visual: { color: 'hsl(38, 92%, 50%)', icon: 'database' },
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
      { key: 'snowcone', content: { en: 'Snowcone: 8TB, portable, edge computing.', ro: 'Snowcone: 8TB, portabil, edge computing.' } },
      { key: 'snowball', content: { en: 'Snowball Edge: 80TB, runs EC2/Lambda locally.', ro: 'Snowball Edge: 80TB, rulează EC2/Lambda local.' } },
      { key: 'snowmobile', content: { en: 'Snowmobile: 100PB shipping container truck.', ro: 'Snowmobile: container de 100PB pe camion.' } },
      { key: 'use_case', content: { en: 'Use when transfer > 10TB or limited internet bandwidth.', ro: 'Folosește când transfer > 10TB sau internet limitat.' } },
    ],
    pricing: { en: 'Per device + shipping + S3 storage', ro: 'Per device + livrare + storage S3' },
    connections: ['s3', 'ec2', 'lambda'],
    docsUrl: 'https://docs.aws.amazon.com/snowball/',
    visual: { color: 'hsl(38, 92%, 50%)', icon: 'box' },
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
];

export function getServiceById(id: string): Service | undefined {
  return services.find((s) => s.id === id);
}

export function getServicesByCategory(categoryId: string): Service[] {
  return services.filter((s) => s.category === categoryId);
}

export function getServicesByLevel(level: 'clf' | 'saa' | 'sap'): Service[] {
  return services.filter((s) => s.level === level);
}
