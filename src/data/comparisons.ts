import type { Comparison } from '@/types';

/**
 * High-value side-by-side service comparisons for the CLF-C02 exam.
 * The 8 tables below cover the most-tested "which service to choose" patterns.
 *
 * Each table = features × services. Cell hints color the cell:
 *   - 'pass'     : green (this service does it well / yes)
 *   - 'partial'  : amber (does it but with caveats)
 *   - 'fail'     : red (does not / no)
 *   - 'na'       : gray (not applicable)
 *   - 'neutral'  : default (factual value, no judgment)
 */
export const comparisons: Comparison[] = [
  // ========================================================================
  // 1. STORAGE: EBS vs EFS vs S3
  // ========================================================================
  {
    id: 'storage-ebs-efs-s3',
    title: { en: 'EBS vs EFS vs S3', ro: 'EBS vs EFS vs S3' },
    tagline: {
      en: 'Block storage on a single instance · NFS shared file system · Object storage in buckets',
      ro: 'Block storage pe o instanță · NFS partajat · Object storage în bucket-uri',
    },
    serviceIds: ['ebs', 'efs', 's3'],
    examFrequency: 'high',
    rows: [
      {
        feature: { en: 'Storage type', ro: 'Tip storage' },
        cells: {
          ebs: { value: { en: 'Block (raw disk)', ro: 'Block (disc brut)' } },
          efs: { value: { en: 'File system (NFS)', ro: 'File system (NFS)' } },
          s3: { value: { en: 'Object (HTTP API)', ro: 'Object (HTTP API)' } },
        },
      },
      {
        feature: { en: 'Mounted to multiple instances?', ro: 'Atașat la mai multe instanțe?' },
        cells: {
          ebs: { value: { en: 'No (1 instance, same AZ)*', ro: 'Nu (1 instanță, același AZ)*' }, hint: 'fail' },
          efs: { value: { en: 'Yes — many across AZs', ro: 'Da — multe peste AZ-uri' }, hint: 'pass' },
          s3: { value: { en: 'Accessed via API, not mounted', ro: 'Accesat prin API, nu montat' }, hint: 'partial' },
        },
      },
      {
        feature: { en: 'Scope', ro: 'Scope' },
        cells: {
          ebs: { value: { en: 'Single AZ', ro: 'Un singur AZ' }, hint: 'partial' },
          efs: { value: { en: 'Regional (multi-AZ)', ro: 'Regional (multi-AZ)' }, hint: 'pass' },
          s3: { value: { en: 'Regional, replicates 11 nines durability', ro: 'Regional, durabilitate 11 noua' }, hint: 'pass' },
        },
      },
      {
        feature: { en: 'Max object/file size', ro: 'Mărime max obiect/fișier' },
        cells: {
          ebs: { value: { en: '64 TiB volume size', ro: 'Volum 64 TiB' } },
          efs: { value: { en: '47.9 TiB per file', ro: '47.9 TiB per fișier' } },
          s3: { value: { en: '5 TB per object', ro: '5 TB per obiect' } },
        },
      },
      {
        feature: { en: 'Use case', ro: 'Use case' },
        cells: {
          ebs: { value: { en: 'OS root volume, DB storage', ro: 'Volum root OS, storage DB' } },
          efs: { value: { en: 'Shared home dirs, content management', ro: 'Home dirs shared, CMS' } },
          s3: { value: { en: 'Backups, media, static sites, data lake', ro: 'Backup-uri, media, site-uri statice, data lake' } },
        },
      },
      {
        feature: { en: 'Pricing model', ro: 'Model preț' },
        cells: {
          ebs: { value: { en: '~$0.10/GB-month (gp3)', ro: '~$0.10/GB-lună (gp3)' } },
          efs: { value: { en: '~$0.30/GB-month (Standard)', ro: '~$0.30/GB-lună (Standard)' } },
          s3: { value: { en: '~$0.023/GB-month (Standard)', ro: '~$0.023/GB-lună (Standard)' }, hint: 'pass' },
        },
      },
    ],
    rulesOfThumb: [
      {
        en: '**Mental shortcut:** EBS = your laptop SSD · EFS = a shared Dropbox folder for your team · S3 = the warehouse with everything cataloged.',
        ro: '**Memo:** EBS = SSD-ul laptopului tău · EFS = un folder Dropbox partajat al echipei · S3 = depozitul cu tot inventariat.',
      },
      {
        en: '*EBS Multi-Attach is possible for io1/io2 volumes within ONE AZ — but most exam questions treat EBS as single-instance.',
        ro: '*EBS Multi-Attach există pentru io1/io2 într-un AZ — dar examenul tratează EBS ca single-instanță.',
      },
    ],
  },

  // ========================================================================
  // 2. DATABASES: RDS vs Aurora vs DynamoDB vs Redshift
  // ========================================================================
  {
    id: 'db-rds-aurora-dynamo-redshift',
    title: { en: 'RDS vs Aurora vs DynamoDB vs Redshift', ro: 'RDS vs Aurora vs DynamoDB vs Redshift' },
    tagline: {
      en: 'Relational managed · AWS-built relational · Serverless NoSQL · Data warehouse',
      ro: 'Relațional managed · Relațional AWS · NoSQL serverless · Data warehouse',
    },
    serviceIds: ['rds', 'aurora', 'dynamodb', 'redshift'],
    examFrequency: 'high',
    rows: [
      {
        feature: { en: 'Data model', ro: 'Model date' },
        cells: {
          rds: { value: { en: 'Relational (SQL)', ro: 'Relațional (SQL)' } },
          aurora: { value: { en: 'Relational (MySQL/Postgres)', ro: 'Relațional (MySQL/Postgres)' } },
          dynamodb: { value: { en: 'Key-value & document (NoSQL)', ro: 'Key-value & document (NoSQL)' } },
          redshift: { value: { en: 'Columnar OLAP (SQL)', ro: 'Columnar OLAP (SQL)' } },
        },
      },
      {
        feature: { en: 'Best for', ro: 'Cel mai bun pentru' },
        cells: {
          rds: { value: { en: 'Transactional apps (CRUD)', ro: 'Aplicații tranzacționale (CRUD)' } },
          aurora: { value: { en: 'Cloud-native CRUD, 5x faster MySQL', ro: 'CRUD cloud-native, 5x MySQL' }, hint: 'pass' },
          dynamodb: { value: { en: 'High-traffic, gaming, IoT', ro: 'Trafic mare, gaming, IoT' }, hint: 'pass' },
          redshift: { value: { en: 'BI, analytics on PB-scale', ro: 'BI, analitică la scară PB' }, hint: 'pass' },
        },
      },
      {
        feature: { en: 'Latency', ro: 'Latență' },
        cells: {
          rds: { value: { en: 'ms', ro: 'ms' } },
          aurora: { value: { en: 'ms (faster than RDS)', ro: 'ms (mai rapid ca RDS)' } },
          dynamodb: { value: { en: 'Single-digit ms (consistent)', ro: 'Sub 10ms (consistent)' }, hint: 'pass' },
          redshift: { value: { en: 'seconds (analytics)', ro: 'secunde (analitic)' } },
        },
      },
      {
        feature: { en: 'Scale', ro: 'Scalare' },
        cells: {
          rds: { value: { en: 'Vertical (instance size); read replicas', ro: 'Vertical (mărime); read replicas' } },
          aurora: { value: { en: '15 read replicas, auto-storage 128 TB', ro: '15 read replicas, storage auto 128 TB' }, hint: 'pass' },
          dynamodb: { value: { en: 'Serverless, virtually unlimited', ro: 'Serverless, practic nelimitat' }, hint: 'pass' },
          redshift: { value: { en: 'Up to 16 PB (cluster)', ro: 'Până la 16 PB (cluster)' } },
        },
      },
      {
        feature: { en: 'High availability', ro: 'High availability' },
        cells: {
          rds: { value: { en: 'Multi-AZ standby', ro: 'Multi-AZ standby' } },
          aurora: { value: { en: '6 copies across 3 AZs (built-in)', ro: '6 copii peste 3 AZ-uri (built-in)' }, hint: 'pass' },
          dynamodb: { value: { en: 'Multi-AZ by default', ro: 'Multi-AZ by default' }, hint: 'pass' },
          redshift: { value: { en: 'Single-AZ; backups + RA3 multi-AZ', ro: 'Single-AZ; backup-uri + RA3 multi-AZ' }, hint: 'partial' },
        },
      },
      {
        feature: { en: 'Pricing model', ro: 'Preț' },
        cells: {
          rds: { value: { en: 'Hourly per instance + storage', ro: 'Orar per instanță + storage' } },
          aurora: { value: { en: 'Hourly per ACU (serverless v2 option)', ro: 'Orar per ACU (serverless v2)' } },
          dynamodb: { value: { en: 'Per request (on-demand) or RCU/WCU', ro: 'Per cerere (on-demand) sau RCU/WCU' } },
          redshift: { value: { en: 'Per node-hour or serverless RPUs', ro: 'Per node-oră sau RPU serverless' } },
        },
      },
    ],
    rulesOfThumb: [
      {
        en: '**Decision tree:** Need joins/transactions? RDS or Aurora. Massive scale + simple keys? DynamoDB. "Show me last quarter\'s sales"? Redshift.',
        ro: '**Decizie rapidă:** Joins/tranzacții? RDS/Aurora. Scală mare + chei simple? DynamoDB. "Vânzările trimestrului trecut"? Redshift.',
      },
    ],
  },

  // ========================================================================
  // 3. COMPUTE: EC2 vs Lambda vs Fargate vs Beanstalk
  // ========================================================================
  {
    id: 'compute-ec2-lambda-fargate-beanstalk',
    title: { en: 'EC2 vs Lambda vs Fargate vs Beanstalk', ro: 'EC2 vs Lambda vs Fargate vs Beanstalk' },
    tagline: {
      en: 'Full VM · Serverless functions · Serverless containers · Managed PaaS',
      ro: 'VM completă · Funcții serverless · Containere serverless · PaaS managed',
    },
    serviceIds: ['ec2', 'lambda', 'fargate', 'beanstalk'],
    examFrequency: 'high',
    rows: [
      {
        feature: { en: 'You manage', ro: 'Tu gestionezi' },
        cells: {
          ec2: { value: { en: 'OS, runtime, app, scaling', ro: 'OS, runtime, app, scalare' }, hint: 'fail' },
          lambda: { value: { en: 'Just the code', ro: 'Doar codul' }, hint: 'pass' },
          fargate: { value: { en: 'Container image + task def', ro: 'Imagine container + task def' }, hint: 'pass' },
          beanstalk: { value: { en: 'Just the code (zip/jar/docker)', ro: 'Doar codul (zip/jar/docker)' }, hint: 'pass' },
        },
      },
      {
        feature: { en: 'Max execution time', ro: 'Timp max execuție' },
        cells: {
          ec2: { value: { en: 'Forever (until terminated)', ro: 'Pentru totdeauna' } },
          lambda: { value: { en: '15 minutes per invocation', ro: '15 min per invocare' }, hint: 'partial' },
          fargate: { value: { en: 'Forever', ro: 'Pentru totdeauna' } },
          beanstalk: { value: { en: 'Forever', ro: 'Pentru totdeauna' } },
        },
      },
      {
        feature: { en: 'Cold start?', ro: 'Cold start?' },
        cells: {
          ec2: { value: { en: 'No (always running)', ro: 'Nu (mereu pornită)' }, hint: 'pass' },
          lambda: { value: { en: 'Yes (~100ms-1s, can use Provisioned Concurrency)', ro: 'Da (~100ms-1s, există Provisioned Concurrency)' }, hint: 'partial' },
          fargate: { value: { en: 'Yes (slower than Lambda)', ro: 'Da (mai lent ca Lambda)' }, hint: 'partial' },
          beanstalk: { value: { en: 'Depends on backend (EC2/Docker)', ro: 'Depinde de backend (EC2/Docker)' } },
        },
      },
      {
        feature: { en: 'Pricing', ro: 'Preț' },
        cells: {
          ec2: { value: { en: 'Per second/hour, even if idle', ro: 'Pe secundă/oră, chiar idle' } },
          lambda: { value: { en: 'Per ms of execution + invocations', ro: 'Per ms execuție + invocări' }, hint: 'pass' },
          fargate: { value: { en: 'Per second of vCPU + GB allocated', ro: 'Per secundă vCPU + GB alocat' } },
          beanstalk: { value: { en: 'Free service; pay underlying resources', ro: 'Gratuit; plătești resursele subiacente' } },
        },
      },
      {
        feature: { en: 'Best for', ro: 'Cel mai bun pentru' },
        cells: {
          ec2: { value: { en: 'Long-running, stateful, custom OS', ro: 'Long-running, stateful, OS custom' } },
          lambda: { value: { en: 'Event-driven, short tasks, APIs', ro: 'Event-driven, task-uri scurte, API-uri' } },
          fargate: { value: { en: 'Containerized apps without Kubernetes overhead', ro: 'Aplicații containerizate fără overhead K8s' } },
          beanstalk: { value: { en: 'Devs who want easy deployment', ro: 'Devs care vor deploy ușor' } },
        },
      },
    ],
    rulesOfThumb: [
      {
        en: '**Climbing the abstraction ladder:** EC2 (you cook) → Beanstalk (catered kitchen) → Fargate (food truck) → Lambda (vending machine).',
        ro: '**Scara abstractizării:** EC2 (gătești tu) → Beanstalk (catering) → Fargate (food truck) → Lambda (vending machine).',
      },
    ],
  },

  // ========================================================================
  // 4. NETWORKING: Security Group vs NACL
  // ========================================================================
  {
    id: 'net-sg-vs-nacl',
    title: { en: 'Security Group vs Network ACL', ro: 'Security Group vs Network ACL' },
    tagline: {
      en: 'Stateful instance bouncer · Stateless subnet bouncer',
      ro: 'Bouncer stateful pentru instanță · Bouncer stateless pentru subnet',
    },
    serviceIds: ['sg-vs-nacl-sg', 'sg-vs-nacl-nacl'],
    columnLabels: {
      'sg-vs-nacl-sg': { en: 'Security Group', ro: 'Security Group' },
      'sg-vs-nacl-nacl': { en: 'Network ACL (NACL)', ro: 'Network ACL (NACL)' },
    },
    examFrequency: 'high',
    rows: [
      {
        feature: { en: 'Operates at', ro: 'Operează la' },
        cells: {
          'sg-vs-nacl-sg': { value: { en: 'Instance / ENI level', ro: 'Nivel instanță / ENI' } },
          'sg-vs-nacl-nacl': { value: { en: 'Subnet level', ro: 'Nivel subnet' } },
        },
      },
      {
        feature: { en: 'Stateful?', ro: 'Stateful?' },
        cells: {
          'sg-vs-nacl-sg': { value: { en: 'Yes (return traffic auto-allowed)', ro: 'Da (traficul retur permis automat)' }, hint: 'pass' },
          'sg-vs-nacl-nacl': { value: { en: 'No (must allow outbound separately)', ro: 'Nu (trebuie permis outbound separat)' }, hint: 'fail' },
        },
      },
      {
        feature: { en: 'Rules', ro: 'Reguli' },
        cells: {
          'sg-vs-nacl-sg': { value: { en: 'ALLOW only (implicit deny)', ro: 'Doar ALLOW (deny implicit)' } },
          'sg-vs-nacl-nacl': { value: { en: 'ALLOW and DENY', ro: 'ALLOW și DENY' } },
        },
      },
      {
        feature: { en: 'Rule evaluation', ro: 'Evaluare reguli' },
        cells: {
          'sg-vs-nacl-sg': { value: { en: 'All rules evaluated', ro: 'Toate regulile evaluate' } },
          'sg-vs-nacl-nacl': { value: { en: 'In rule-number order; first match wins', ro: 'În ordinea numărului; primul match câștigă' } },
        },
      },
      {
        feature: { en: 'Use case', ro: 'Use case' },
        cells: {
          'sg-vs-nacl-sg': { value: { en: 'Default firewall for instances/services', ro: 'Firewall default pentru instanțe/servicii' } },
          'sg-vs-nacl-nacl': { value: { en: 'Block specific IPs / extra subnet defense', ro: 'Blochezi IP-uri specifice / apărare subnet' } },
        },
      },
    ],
    rulesOfThumb: [
      {
        en: '**Mental model:** Security Group = bouncer at the **front door** of each room (knows who you are). NACL = bouncer at the **building entrance** (only checks ID, not your past).',
        ro: '**Model mental:** Security Group = bouncer la **ușa fiecărei camere** (te cunoaște). NACL = bouncer la **intrarea clădirii** (verifică doar buletinul, nu istoria).',
      },
      {
        en: '**Defense in depth:** Use BOTH. Default SG with explicit allows + NACLs to block known bad IPs.',
        ro: '**Apărare în adâncime:** Folosește AMÂNDOI. SG cu allow explicit + NACL care blochează IP-uri rele.',
      },
    ],
  },

  // ========================================================================
  // 5. IAM: User vs Group vs Role
  // ========================================================================
  {
    id: 'iam-user-group-role',
    title: { en: 'IAM User vs Group vs Role', ro: 'IAM User vs Group vs Role' },
    tagline: {
      en: 'Long-term identity · Permission bundle · Temporary credentials for AWS services',
      ro: 'Identitate pe termen lung · Pachet de permisiuni · Credențiale temporare pentru servicii AWS',
    },
    serviceIds: ['iam-user', 'iam-group', 'iam-role'],
    columnLabels: {
      'iam-user': { en: 'IAM User', ro: 'IAM User' },
      'iam-group': { en: 'IAM Group', ro: 'IAM Group' },
      'iam-role': { en: 'IAM Role', ro: 'IAM Role' },
    },
    examFrequency: 'high',
    rows: [
      {
        feature: { en: 'Has credentials?', ro: 'Are credențiale?' },
        cells: {
          'iam-user': { value: { en: 'Yes (password + access keys)', ro: 'Da (parolă + access keys)' } },
          'iam-group': { value: { en: 'No (just attaches policies)', ro: 'Nu (doar atașează politici)' }, hint: 'na' },
          'iam-role': { value: { en: 'Temporary (via STS)', ro: 'Temporare (via STS)' }, hint: 'pass' },
        },
      },
      {
        feature: { en: 'Used by', ro: 'Folosit de' },
        cells: {
          'iam-user': { value: { en: 'A real human or app with long-term creds', ro: 'Un om real sau app cu cred. pe termen lung' } },
          'iam-group': { value: { en: 'A collection of users (e.g., "Developers")', ro: 'O colecție de useri (ex: "Developers")' } },
          'iam-role': { value: { en: 'AWS services (EC2, Lambda) or federated users', ro: 'Servicii AWS (EC2, Lambda) sau federated users' } },
        },
      },
      {
        feature: { en: 'Best practice for an EC2 accessing S3?', ro: 'Best practice pentru EC2 care accesează S3?' },
        cells: {
          'iam-user': { value: { en: 'Bad (creds on disk, leak risk)', ro: 'Greșit (cred. pe disc, risc leak)' }, hint: 'fail' },
          'iam-group': { value: { en: 'N/A — groups do not authenticate', ro: 'N/A — grupurile nu se autentifică' }, hint: 'na' },
          'iam-role': { value: { en: 'YES — auto-rotating temporary creds', ro: 'DA — credențiale temporare rotative' }, hint: 'pass' },
        },
      },
      {
        feature: { en: 'Can be assumed?', ro: 'Poate fi asumat?' },
        cells: {
          'iam-user': { value: { en: 'No', ro: 'Nu' }, hint: 'fail' },
          'iam-group': { value: { en: 'No', ro: 'Nu' }, hint: 'fail' },
          'iam-role': { value: { en: 'Yes (via sts:AssumeRole)', ro: 'Da (via sts:AssumeRole)' }, hint: 'pass' },
        },
      },
      {
        feature: { en: 'Cost', ro: 'Cost' },
        cells: {
          'iam-user': { value: { en: 'Free', ro: 'Gratuit' }, hint: 'pass' },
          'iam-group': { value: { en: 'Free', ro: 'Gratuit' }, hint: 'pass' },
          'iam-role': { value: { en: 'Free', ro: 'Gratuit' }, hint: 'pass' },
        },
      },
    ],
    rulesOfThumb: [
      {
        en: '**Mental model:** User = your driver\'s license · Group = "Drivers Club" with a list of perks · Role = a temporary visitor pass at a building.',
        ro: '**Model mental:** User = permisul tău de conducere · Group = "Clubul Șoferilor" cu beneficii · Role = ecuson temporar la o clădire.',
      },
      {
        en: '**Rule:** Never give an application IAM User credentials. Always use a Role.',
        ro: '**Regulă:** Nu da niciodată credențiale IAM User unei aplicații. Mereu folosește Role.',
      },
    ],
  },

  // ========================================================================
  // 6. EDGE/CDN: CloudFront vs Global Accelerator
  // ========================================================================
  {
    id: 'edge-cf-vs-ga',
    title: { en: 'CloudFront vs Global Accelerator', ro: 'CloudFront vs Global Accelerator' },
    tagline: {
      en: 'CDN that caches content · Network accelerator with static IPs',
      ro: 'CDN care cache conținut · Accelerator de rețea cu IP-uri statice',
    },
    serviceIds: ['cf-ga-cf', 'cf-ga-ga'],
    columnLabels: {
      'cf-ga-cf': { en: 'CloudFront', ro: 'CloudFront' },
      'cf-ga-ga': { en: 'Global Accelerator', ro: 'Global Accelerator' },
    },
    examFrequency: 'medium',
    rows: [
      {
        feature: { en: 'Primary purpose', ro: 'Scop principal' },
        cells: {
          'cf-ga-cf': { value: { en: 'Cache static + dynamic content at edge', ro: 'Cache conținut static + dinamic la edge' } },
          'cf-ga-ga': { value: { en: 'Route TCP/UDP traffic over AWS backbone', ro: 'Rutează trafic TCP/UDP prin backbone AWS' } },
        },
      },
      {
        feature: { en: 'Caches content?', ro: 'Cachează conținut?' },
        cells: {
          'cf-ga-cf': { value: { en: 'Yes (HTTP/HTTPS)', ro: 'Da (HTTP/HTTPS)' }, hint: 'pass' },
          'cf-ga-ga': { value: { en: 'No (just routing)', ro: 'Nu (doar routing)' }, hint: 'fail' },
        },
      },
      {
        feature: { en: 'Static IP addresses?', ro: 'IP-uri statice?' },
        cells: {
          'cf-ga-cf': { value: { en: 'No (DNS-based)', ro: 'Nu (bazat pe DNS)' }, hint: 'fail' },
          'cf-ga-ga': { value: { en: 'Yes (2 anycast IPs, allow firewall pinning)', ro: 'Da (2 IP-uri anycast, pin firewall)' }, hint: 'pass' },
        },
      },
      {
        feature: { en: 'Best for', ro: 'Cel mai bun pentru' },
        cells: {
          'cf-ga-cf': { value: { en: 'Websites, video streaming, static assets', ro: 'Site-uri, streaming video, assets statice' } },
          'cf-ga-ga': { value: { en: 'Gaming, IoT, VoIP, non-HTTP TCP/UDP', ro: 'Gaming, IoT, VoIP, TCP/UDP non-HTTP' } },
        },
      },
    ],
    rulesOfThumb: [
      {
        en: '**Memory hook:** CloudFront = brings the **content** closer (cache). Global Accelerator = brings **you** closer (faster path).',
        ro: '**Memo:** CloudFront = aduce **conținutul** mai aproape (cache). Global Accelerator = te aduce **pe tine** mai aproape (cale mai rapidă).',
      },
    ],
  },

  // ========================================================================
  // 7. MESSAGING: SQS vs SNS vs EventBridge vs Kinesis
  // ========================================================================
  {
    id: 'msg-sqs-sns-eb-kinesis',
    title: { en: 'SQS vs SNS vs EventBridge vs Kinesis', ro: 'SQS vs SNS vs EventBridge vs Kinesis' },
    tagline: {
      en: 'Queue · Pub/sub · Event router · Real-time streaming',
      ro: 'Coadă · Pub/sub · Router de evenimente · Streaming real-time',
    },
    serviceIds: ['sqs', 'sns', 'eventbridge', 'kinesis'],
    examFrequency: 'high',
    rows: [
      {
        feature: { en: 'Pattern', ro: 'Pattern' },
        cells: {
          sqs: { value: { en: 'Point-to-point queue', ro: 'Coadă point-to-point' } },
          sns: { value: { en: 'Publish-subscribe (1 topic → many subs)', ro: 'Publish-subscribe (1 topic → mulți)' } },
          eventbridge: { value: { en: 'Event bus with routing rules', ro: 'Event bus cu reguli routing' } },
          kinesis: { value: { en: 'Ordered stream of records', ro: 'Stream ordonat de înregistrări' } },
        },
      },
      {
        feature: { en: 'Consumers per message', ro: 'Consumeri per mesaj' },
        cells: {
          sqs: { value: { en: '1 (each msg consumed once)', ro: '1 (fiecare mesaj consumat o dată)' } },
          sns: { value: { en: 'Many (fan-out)', ro: 'Mulți (fan-out)' } },
          eventbridge: { value: { en: 'Many (rule-based)', ro: 'Mulți (bazat pe reguli)' } },
          kinesis: { value: { en: 'Many (replay capable)', ro: 'Mulți (replay capabil)' } },
        },
      },
      {
        feature: { en: 'Retention', ro: 'Retenție' },
        cells: {
          sqs: { value: { en: '4 days default, max 14 days', ro: '4 zile default, max 14 zile' } },
          sns: { value: { en: 'No (immediate delivery)', ro: 'Nu (livrare imediată)' } },
          eventbridge: { value: { en: 'No (immediate); archive separately', ro: 'Nu (imediat); archive separat' } },
          kinesis: { value: { en: '7-365 days (replay)', ro: '7-365 zile (replay)' }, hint: 'pass' },
        },
      },
      {
        feature: { en: 'Ordering', ro: 'Ordonare' },
        cells: {
          sqs: { value: { en: 'FIFO queue available', ro: 'Coadă FIFO disponibilă' } },
          sns: { value: { en: 'FIFO topic available', ro: 'Topic FIFO disponibil' } },
          eventbridge: { value: { en: 'No strict ordering', ro: 'Fără ordonare strictă' } },
          kinesis: { value: { en: 'Per-shard ordering', ro: 'Ordonare per-shard' }, hint: 'pass' },
        },
      },
      {
        feature: { en: 'Best for', ro: 'Cel mai bun pentru' },
        cells: {
          sqs: { value: { en: 'Decoupling work between services', ro: 'Decuplare muncă între servicii' } },
          sns: { value: { en: 'Notifications (email/SMS) + fan-out', ro: 'Notificări (email/SMS) + fan-out' } },
          eventbridge: { value: { en: 'Cross-service event routing, SaaS events', ro: 'Routing evenimente cross-service, evenimente SaaS' } },
          kinesis: { value: { en: 'Real-time analytics, click streams', ro: 'Analitică real-time, click streams' } },
        },
      },
    ],
    rulesOfThumb: [
      {
        en: '**Decision tree:** "I have one to-do list" → SQS · "I want to broadcast news" → SNS · "Different teams care about different events" → EventBridge · "I need to replay last week\'s data" → Kinesis.',
        ro: '**Decizie:** "Am o listă de făcut" → SQS · "Vreau să anunț tuturor" → SNS · "Echipe diferite vor evenimente diferite" → EventBridge · "Replay date săptămâna trecută" → Kinesis.',
      },
    ],
  },

  // ========================================================================
  // 8. OBSERVABILITY: CloudWatch vs CloudTrail vs Config
  // ========================================================================
  {
    id: 'obs-cw-ct-config',
    title: { en: 'CloudWatch vs CloudTrail vs Config', ro: 'CloudWatch vs CloudTrail vs Config' },
    tagline: {
      en: 'Performance metrics & logs · Who-did-what API audit · Resource state compliance',
      ro: 'Metrici & loguri · Audit cine-ce API · Compliance stare resurse',
    },
    serviceIds: ['cloudwatch', 'cloudtrail', 'config'],
    examFrequency: 'high',
    rows: [
      {
        feature: { en: 'Captures', ro: 'Capturează' },
        cells: {
          cloudwatch: { value: { en: 'Metrics, logs, custom dashboards', ro: 'Metrici, loguri, dashboard-uri' } },
          cloudtrail: { value: { en: 'Every API call (who/what/when)', ro: 'Fiecare apel API (cine/ce/când)' } },
          config: { value: { en: 'Resource state changes over time', ro: 'Schimbări de stare resurse în timp' } },
        },
      },
      {
        feature: { en: 'Question it answers', ro: 'Întrebarea la care răspunde' },
        cells: {
          cloudwatch: { value: { en: '"Is my app healthy NOW?"', ro: '"E aplicația mea sănătoasă ACUM?"' } },
          cloudtrail: { value: { en: '"Who deleted that bucket?"', ro: '"Cine a șters bucket-ul ăla?"' } },
          config: { value: { en: '"Is my infra still compliant?"', ro: '"E infra mea conformă?"' } },
        },
      },
      {
        feature: { en: 'Alarms / triggers', ro: 'Alarme / triggere' },
        cells: {
          cloudwatch: { value: { en: 'Yes (CloudWatch Alarms → SNS)', ro: 'Da (CloudWatch Alarms → SNS)' }, hint: 'pass' },
          cloudtrail: { value: { en: 'Via CloudWatch Events / EventBridge', ro: 'Via CloudWatch Events / EventBridge' }, hint: 'partial' },
          config: { value: { en: 'Config Rules trigger remediation', ro: 'Config Rules trigger remediere' }, hint: 'pass' },
        },
      },
      {
        feature: { en: 'Used for compliance audits?', ro: 'Folosit pentru audit compliance?' },
        cells: {
          cloudwatch: { value: { en: 'Less common', ro: 'Mai puțin' }, hint: 'partial' },
          cloudtrail: { value: { en: 'YES — primary audit log', ro: 'DA — log primar de audit' }, hint: 'pass' },
          config: { value: { en: 'YES — for resource state compliance', ro: 'DA — pentru compliance stare' }, hint: 'pass' },
        },
      },
      {
        feature: { en: 'Pricing', ro: 'Preț' },
        cells: {
          cloudwatch: { value: { en: 'Per metric, log GB ingested', ro: 'Per metrică, GB log ingerat' } },
          cloudtrail: { value: { en: 'First trail FREE for management events', ro: 'Primul trail GRATUIT pentru management events' }, hint: 'pass' },
          config: { value: { en: 'Per item recorded + per evaluation', ro: 'Per item înregistrat + per evaluare' } },
        },
      },
    ],
    rulesOfThumb: [
      {
        en: '**Three witnesses to a crime scene:** CloudWatch saw the **vital signs** (CPU, memory). CloudTrail recorded **who fired the gun** (the API call). Config has **photos of the room before/after** (resource state).',
        ro: '**3 martori la o crimă:** CloudWatch a văzut **semnele vitale** (CPU, RAM). CloudTrail a înregistrat **cine a tras** (apelul API). Config are **poze înainte/după** (starea resurselor).',
      },
    ],
  },
  // ========================================================================
  // ======================= SAA-C03 COMPARISONS ============================
  // All entries below are tagged exams: ['saa'] — shown only on the SAA exam.
  // ========================================================================

  // ------------------------------------------------------------------------
  // SAA 1. ALB vs NLB vs GWLB (Domain 3 performance + Domain 4 cost)
  // ------------------------------------------------------------------------
  {
    id: 'saa-alb-nlb-gwlb',
    title: { en: 'ALB vs NLB vs GWLB', ro: 'ALB vs NLB vs GWLB' },
    tagline: {
      en: 'Layer 7 smart routing · Layer 4 extreme performance · Layer 3 security-appliance fleet',
      ro: 'Routing inteligent Layer 7 · Performanță extremă Layer 4 · Flotă de appliance-uri Layer 3',
    },
    serviceIds: ['alb', 'nlb', 'gwlb'],
    columnLabels: {
      alb: { en: 'ALB', ro: 'ALB' },
      nlb: { en: 'NLB', ro: 'NLB' },
      gwlb: { en: 'GWLB', ro: 'GWLB' },
    },
    examFrequency: 'high',
    exams: ['saa'],
    rows: [
      {
        feature: { en: 'OSI layer / protocols', ro: 'Nivel OSI / protocoale' },
        cells: {
          alb: { value: { en: 'Layer 7 — HTTP, HTTPS, WebSocket, gRPC', ro: 'Layer 7 — HTTP, HTTPS, WebSocket, gRPC' } },
          nlb: { value: { en: 'Layer 4 — TCP, UDP, TLS', ro: 'Layer 4 — TCP, UDP, TLS' } },
          gwlb: { value: { en: 'Layer 3 — IP packets (GENEVE, port 6081)', ro: 'Layer 3 — pachete IP (GENEVE, port 6081)' } },
        },
      },
      {
        feature: { en: 'Smart routing', ro: 'Routing inteligent' },
        cells: {
          alb: { value: { en: 'Path, host, header, query-string → target groups', ro: 'Path, host, header, query-string → target groups' }, hint: 'pass' },
          nlb: { value: { en: 'None — forwards by listener port', ro: 'Nu — trimite după portul listener-ului' }, hint: 'fail' },
          gwlb: { value: { en: 'None — transparent pass-through to appliances', ro: 'Nu — pass-through transparent către appliance-uri' }, hint: 'na' },
        },
      },
      {
        feature: { en: 'Performance', ro: 'Performanță' },
        cells: {
          alb: { value: { en: 'Good (adds a few ms of latency)', ro: 'Bună (adaugă câteva ms de latență)' } },
          nlb: { value: { en: 'Millions of req/s, ultra-low latency', ro: 'Milioane de req/s, latență ultra-mică' }, hint: 'pass' },
          gwlb: { value: { en: 'Depends on the appliance fleet behind it', ro: 'Depinde de flota de appliance-uri din spate' } },
        },
      },
      {
        feature: { en: 'Static IP', ro: 'IP static' },
        cells: {
          alb: { value: { en: 'No — fixed DNS name only', ro: 'Nu — doar nume DNS fix' }, hint: 'fail' },
          nlb: { value: { en: 'One static IP per AZ + Elastic IP support', ro: 'Un IP static per AZ + suport Elastic IP' }, hint: 'pass' },
          gwlb: { value: { en: 'N/A — reached via route-table entry', ro: 'N/A — accesat printr-o intrare în route table' }, hint: 'na' },
        },
      },
      {
        feature: { en: 'Targets', ro: 'Target-uri' },
        cells: {
          alb: { value: { en: 'EC2, ECS tasks, Lambda, private IPs', ro: 'EC2, task-uri ECS, Lambda, IP-uri private' } },
          nlb: { value: { en: 'EC2, private IPs, ALB', ro: 'EC2, IP-uri private, ALB' } },
          gwlb: { value: { en: 'Security appliances (EC2, private IPs)', ro: 'Appliance-uri de securitate (EC2, IP-uri private)' } },
        },
      },
      {
        feature: { en: 'Client IP seen by backend', ro: 'IP-ul clientului văzut de backend' },
        cells: {
          alb: { value: { en: 'Via X-Forwarded-For header', ro: 'Prin header-ul X-Forwarded-For' }, hint: 'partial' },
          nlb: { value: { en: 'Preserved natively', ro: 'Păstrat nativ' }, hint: 'pass' },
          gwlb: { value: { en: 'Unchanged — traffic inspected inline', ro: 'Neschimbat — traficul e inspectat inline' }, hint: 'pass' },
        },
      },
      {
        feature: { en: 'Cross-zone load balancing', ro: 'Cross-zone load balancing' },
        cells: {
          alb: { value: { en: 'ON by default, inter-AZ traffic free', ro: 'Activ implicit, trafic inter-AZ gratuit' }, hint: 'pass' },
          nlb: { value: { en: 'OFF by default, inter-AZ traffic billed', ro: 'Oprit implicit, trafic inter-AZ plătit' }, hint: 'partial' },
          gwlb: { value: { en: 'OFF by default, inter-AZ traffic billed', ro: 'Oprit implicit, trafic inter-AZ plătit' }, hint: 'partial' },
        },
      },
      {
        feature: { en: 'Typical exam scenario', ro: 'Scenariu tipic de examen' },
        cells: {
          alb: { value: { en: 'Microservices, containers, HTTP routing rules', ro: 'Microservicii, containere, reguli de routing HTTP' } },
          nlb: { value: { en: 'Whitelisted fixed IPs, extreme perf, UDP/gaming', ro: 'IP-uri fixe pe whitelist, performanță extremă, UDP/gaming' } },
          gwlb: { value: { en: '3rd-party firewall / IDS / IPS fleet', ro: 'Flotă de firewall / IDS / IPS third-party' } },
        },
      },
    ],
    rulesOfThumb: [
      {
        en: '**Decision rule:** HTTP + smart routing = **ALB** · static IP / millions of req/s / UDP = **NLB** · third-party security appliances / GENEVE 6081 = **GWLB**.',
        ro: '**Regulă de decizie:** HTTP + routing inteligent = **ALB** · IP static / milioane req/s / UDP = **NLB** · appliance-uri de securitate third-party / GENEVE 6081 = **GWLB**.',
      },
      {
        en: 'Need BOTH a static IP AND Layer-7 routing? Put an **NLB in front of an ALB** — an ALB is a valid NLB target.',
        ro: 'Ai nevoie ȘI de IP static ȘI de routing Layer 7? Pune un **NLB în fața unui ALB** — ALB e un target valid pentru NLB.',
      },
      {
        en: 'The word **GENEVE** (port 6081) in a question = GWLB, always.',
        ro: 'Cuvântul **GENEVE** (port 6081) într-o întrebare = GWLB, întotdeauna.',
      },
    ],
  },

  // ------------------------------------------------------------------------
  // SAA 2. Disaster Recovery strategies (Domain 2 — resilient, 26%)
  // ------------------------------------------------------------------------
  {
    id: 'saa-dr-strategies',
    title: { en: 'DR: Backup & Restore vs Pilot Light vs Warm Standby vs Multi-Site', ro: 'DR: Backup & Restore vs Pilot Light vs Warm Standby vs Multi-Site' },
    tagline: {
      en: 'The 4 disaster-recovery strategies, ordered by RTO/RPO and cost.',
      ro: 'Cele 4 strategii de disaster recovery, ordonate după RTO/RPO și cost.',
    },
    serviceIds: ['backuprestore', 'pilotlight', 'warmstandby', 'multisite'],
    columnLabels: {
      backuprestore: { en: 'Backup & Restore', ro: 'Backup & Restore' },
      pilotlight: { en: 'Pilot Light', ro: 'Pilot Light' },
      warmstandby: { en: 'Warm Standby', ro: 'Warm Standby' },
      multisite: { en: 'Multi-Site Active-Active', ro: 'Multi-Site Activ-Activ' },
    },
    examFrequency: 'high',
    exams: ['saa'],
    rows: [
      {
        feature: { en: 'RPO (data loss)', ro: 'RPO (pierdere de date)' },
        cells: {
          backuprestore: { value: { en: 'Hours — back to the last backup', ro: 'Ore — până la ultimul backup' }, hint: 'fail' },
          pilotlight: { value: { en: 'Minutes — data replicated continuously', ro: 'Minute — datele se replică continuu' }, hint: 'partial' },
          warmstandby: { value: { en: 'Seconds–minutes', ro: 'Secunde–minute' }, hint: 'pass' },
          multisite: { value: { en: 'Near zero', ro: 'Aproape zero' }, hint: 'pass' },
        },
      },
      {
        feature: { en: 'RTO (downtime)', ro: 'RTO (downtime)' },
        cells: {
          backuprestore: { value: { en: 'Hours — restore + provision everything', ro: 'Ore — restore + provizionezi totul' }, hint: 'fail' },
          pilotlight: { value: { en: 'Tens of minutes — start & scale servers', ro: 'Zeci de minute — pornești și scalezi serverele' }, hint: 'partial' },
          warmstandby: { value: { en: 'Minutes — scale up a running stack', ro: 'Minute — scalezi un stack deja pornit' }, hint: 'pass' },
          multisite: { value: { en: 'Near zero — traffic shifts instantly', ro: 'Aproape zero — traficul comută instant' }, hint: 'pass' },
        },
      },
      {
        feature: { en: 'What runs in the DR Region', ro: 'Ce rulează în regiunea de DR' },
        cells: {
          backuprestore: { value: { en: 'Nothing — only backups are stored', ro: 'Nimic — doar backup-urile sunt stocate' } },
          pilotlight: { value: { en: 'Core only: data layer replicated, app servers OFF', ro: 'Doar nucleul: stratul de date replicat, serverele de aplicație OPRITE' } },
          warmstandby: { value: { en: 'Full stack ON at minimum size', ro: 'Tot stack-ul PORNIT la dimensiune minimă' } },
          multisite: { value: { en: 'Full production scale, actively serving traffic', ro: 'Scară de producție completă, servește trafic activ' } },
        },
      },
      {
        feature: { en: 'Cost', ro: 'Cost' },
        cells: {
          backuprestore: { value: { en: '$ (cheapest)', ro: '$ (cel mai ieftin)' }, hint: 'pass' },
          pilotlight: { value: { en: '$$', ro: '$$' }, hint: 'partial' },
          warmstandby: { value: { en: '$$$', ro: '$$$' }, hint: 'partial' },
          multisite: { value: { en: '$$$$ (most expensive)', ro: '$$$$ (cel mai scump)' }, hint: 'fail' },
        },
      },
      {
        feature: { en: 'Failover actions', ro: 'Acțiuni la failover' },
        cells: {
          backuprestore: { value: { en: 'Restore backups, recreate infra (CloudFormation)', ro: 'Restore din backup, recreezi infrastructura (CloudFormation)' } },
          pilotlight: { value: { en: 'Start app servers, scale out, point DNS', ro: 'Pornești serverele de aplicație, scalezi, comuți DNS-ul' } },
          warmstandby: { value: { en: 'Scale ASG to production size, point DNS', ro: 'Scalezi ASG la dimensiune de producție, comuți DNS-ul' } },
          multisite: { value: { en: 'None — Route 53 already routes to both sites', ro: 'Nimic — Route 53 rutează deja către ambele site-uri' } },
        },
      },
      {
        feature: { en: 'Typical AWS services', ro: 'Servicii AWS tipice' },
        cells: {
          backuprestore: { value: { en: 'AWS Backup, EBS/RDS snapshots, S3 CRR, Glacier', ro: 'AWS Backup, snapshot-uri EBS/RDS, S3 CRR, Glacier' } },
          pilotlight: { value: { en: 'RDS cross-Region replica, AMIs, Route 53', ro: 'Replică RDS cross-Region, AMI-uri, Route 53' } },
          warmstandby: { value: { en: 'ASG at min capacity, ELB, RDS standby, Route 53', ro: 'ASG la capacitate minimă, ELB, RDS standby, Route 53' } },
          multisite: { value: { en: 'Aurora Global DB, DynamoDB Global Tables, Route 53', ro: 'Aurora Global DB, DynamoDB Global Tables, Route 53' } },
        },
      },
    ],
    rulesOfThumb: [
      {
        en: '**Order by RTO (slow→fast) = order by cost (cheap→expensive):** Backup & Restore → Pilot Light → Warm Standby → Multi-Site active-active.',
        ro: '**Ordinea după RTO (lent→rapid) = ordinea după cost (ieftin→scump):** Backup & Restore → Pilot Light → Warm Standby → Multi-Site activ-activ.',
      },
      {
        en: 'Pilot Light vs Warm Standby — the exam separates them by ONE question: are the app servers RUNNING? Pilot Light = data replicated, servers OFF. Warm Standby = everything ON but small.',
        ro: 'Pilot Light vs Warm Standby — examenul le separă printr-O întrebare: rulează serverele de aplicație? Pilot Light = date replicate, servere OPRITE. Warm Standby = totul PORNIT dar mic.',
      },
      {
        en: 'AWS Elastic Disaster Recovery (DRS) = continuous block-level replication of physical/virtual servers into AWS, failover in minutes — the managed way to implement Pilot Light for on-prem servers.',
        ro: 'AWS Elastic Disaster Recovery (DRS) = replicare continuă la nivel de bloc a serverelor fizice/virtuale în AWS, failover în minute — varianta managed de Pilot Light pentru servere on-prem.',
      },
    ],
  },

  // ------------------------------------------------------------------------
  // SAA 3. Gateway endpoint vs Interface endpoint (Domain 1 secure + Domain 4 cost)
  // ------------------------------------------------------------------------
  {
    id: 'saa-vpc-endpoints',
    title: { en: 'Gateway Endpoint vs Interface Endpoint', ro: 'Gateway Endpoint vs Interface Endpoint' },
    tagline: {
      en: 'Two ways to reach AWS services privately from a VPC — one free, one flexible.',
      ro: 'Două moduri de a accesa serviciile AWS privat din VPC — unul gratuit, unul flexibil.',
    },
    serviceIds: ['gatewayendpoint', 'interfaceendpoint'],
    columnLabels: {
      gatewayendpoint: { en: 'Gateway Endpoint', ro: 'Gateway Endpoint' },
      interfaceendpoint: { en: 'Interface Endpoint (PrivateLink)', ro: 'Interface Endpoint (PrivateLink)' },
    },
    examFrequency: 'high',
    exams: ['saa'],
    rows: [
      {
        feature: { en: 'Supported services', ro: 'Servicii suportate' },
        cells: {
          gatewayendpoint: { value: { en: 'S3 and DynamoDB ONLY', ro: 'DOAR S3 și DynamoDB' }, hint: 'partial' },
          interfaceendpoint: { value: { en: 'Most AWS services (incl. S3), partner services', ro: 'Majoritatea serviciilor AWS (incl. S3), servicii partenere' }, hint: 'pass' },
        },
      },
      {
        feature: { en: 'How it works', ro: 'Cum funcționează' },
        cells: {
          gatewayendpoint: { value: { en: 'Route-table entry (prefix list) — no ENI', ro: 'Intrare în route table (prefix list) — fără ENI' } },
          interfaceendpoint: { value: { en: 'ENI with a private IP inside your subnet', ro: 'ENI cu IP privat în subnetul tău' } },
        },
      },
      {
        feature: { en: 'Cost', ro: 'Cost' },
        cells: {
          gatewayendpoint: { value: { en: 'FREE', ro: 'GRATUIT' }, hint: 'pass' },
          interfaceendpoint: { value: { en: '~$0.01/hour per AZ + per-GB processed', ro: '~$0.01/oră per AZ + per GB procesat' }, hint: 'partial' },
        },
      },
      {
        feature: { en: 'Access from on-premises (VPN/DX)', ro: 'Acces de pe on-premises (VPN/DX)' },
        cells: {
          gatewayendpoint: { value: { en: 'No', ro: 'Nu' }, hint: 'fail' },
          interfaceendpoint: { value: { en: 'Yes', ro: 'Da' }, hint: 'pass' },
        },
      },
      {
        feature: { en: 'Access from peered VPC / other Region', ro: 'Acces din VPC peered / altă regiune' },
        cells: {
          gatewayendpoint: { value: { en: 'No — only from its own VPC', ro: 'Nu — doar din propriul VPC' }, hint: 'fail' },
          interfaceendpoint: { value: { en: 'Yes', ro: 'Da' }, hint: 'pass' },
        },
      },
      {
        feature: { en: 'Security controls', ro: 'Controale de securitate' },
        cells: {
          gatewayendpoint: { value: { en: 'Endpoint policy', ro: 'Endpoint policy' } },
          interfaceendpoint: { value: { en: 'Endpoint policy + security groups on the ENI', ro: 'Endpoint policy + security groups pe ENI' } },
        },
      },
      {
        feature: { en: 'DNS', ro: 'DNS' },
        cells: {
          gatewayendpoint: { value: { en: 'None — works at the routing level', ro: 'Nu are — funcționează la nivel de routing' }, hint: 'na' },
          interfaceendpoint: { value: { en: 'Private DNS names for the service', ro: 'Nume DNS private pentru serviciu' }, hint: 'pass' },
        },
      },
    ],
    rulesOfThumb: [
      {
        en: '**Default exam answer for S3 / DynamoDB from inside the VPC = Gateway endpoint — it is FREE.** Pick an Interface endpoint for S3 only when access comes from on-premises, a peered VPC, or another Region.',
        ro: '**Răspunsul implicit de examen pentru S3 / DynamoDB din interiorul VPC-ului = Gateway endpoint — e GRATUIT.** Alege Interface endpoint pentru S3 doar când accesul vine de pe on-premises, dintr-un VPC peered sau din altă regiune.',
      },
      {
        en: 'Interface endpoint = PrivateLink = an ENI in your subnet. Gateway endpoint = a route-table target, not a network card.',
        ro: 'Interface endpoint = PrivateLink = un ENI în subnetul tău. Gateway endpoint = un target în route table, nu o placă de rețea.',
      },
    ],
  },
];

export function getComparisonById(id: string): Comparison | undefined {
  return comparisons.find((c) => c.id === id);
}
