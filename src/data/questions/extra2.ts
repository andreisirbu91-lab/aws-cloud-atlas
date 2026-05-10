import type { QuizQuestion } from '@/types';

/** Extra question pack #2: 20 more questions for variety. */
export const extraQuestions2: QuizQuestion[] = [
  // CLOUD CONCEPTS (5)
  {
    id: 'x2-cc-1', type: 'multiple_choice', difficulty: 1,
    categories: ['cloud-fundamentals'], examDomain: 'cloud-concepts', source: 'maarek',
    question: { en: 'What is "elasticity" in cloud computing?', ro: 'Ce e "elasticity" în cloud?' },
    options: [
      { en: 'Stretching a budget', ro: 'Întinderea unui buget' },
      { en: 'Auto scaling resources up AND down based on demand', ro: 'Scalare auto resurse în sus ȘI jos după cerere' },
      { en: 'Bendable hardware', ro: 'Hardware îndoibil' },
      { en: 'Long-term contracts', ro: 'Contracte lungi' },
    ],
    correct: 1,
    explanation: {
      en: 'Elasticity = automatic resource adjustment to match demand. AWS Auto Scaling is the prime example. Different from scalability (just capacity to grow).',
      ro: 'Elasticity = ajustare automată a resurselor după cerere. Auto Scaling e exemplul prim. Diferit de scalability (doar capacitate creștere).',
    },
    relatedServices: ['autoscaling'],
  },
  {
    id: 'x2-cc-2', type: 'multiple_choice', difficulty: 1,
    categories: ['global-infrastructure'], examDomain: 'cloud-concepts', source: 'maarek',
    question: { en: 'Each AWS Region has AT MINIMUM how many AZs?', ro: 'Fiecare Regiune AWS are CEL PUȚIN câte AZ?' },
    options: [{ en: '1', ro: '1' }, { en: '2', ro: '2' }, { en: '3 (typically 3-6)', ro: '3 (de obicei 3-6)' }, { en: '10', ro: '10' }],
    correct: 2,
    explanation: {
      en: '3+ AZs per Region. Each AZ = separate buildings, power, networks. Connected by low-latency fiber. Foundation of multi-AZ HA.',
      ro: '3+ AZ per Regiune. Fiecare AZ = clădiri, alimentare, rețele separate. Conectate prin fibră low-latency. Fundamentul HA multi-AZ.',
    },
    relatedServices: [],
  },
  {
    id: 'x2-cc-3', type: 'multiple_choice', difficulty: 2,
    categories: ['cloud-fundamentals'], examDomain: 'cloud-concepts', source: 'maarek',
    question: { en: 'Cloud computing converts which expense type?', ro: 'Cloud-ul convertește ce tip de cheltuială?' },
    options: [
      { en: 'OpEx → CapEx', ro: 'OpEx → CapEx' },
      { en: 'CapEx → OpEx (capital → operational)', ro: 'CapEx → OpEx (capital → operațional)' },
      { en: 'No change', ro: 'Fără schimbare' },
      { en: 'Both eliminated', ro: 'Ambele eliminate' },
    ],
    correct: 1,
    explanation: {
      en: 'CapEx (buy hardware upfront) → OpEx (pay-as-you-go). No upfront cost, predictable bill, faster experimentation.',
      ro: 'CapEx (cumpărare hardware upfront) → OpEx (pay-as-you-go). Fără cost upfront, factură predictibilă, experimentare rapidă.',
    },
    relatedServices: [],
  },
  {
    id: 'x2-cc-4', type: 'multiple_choice', difficulty: 2,
    categories: ['well-architected'], examDomain: 'cloud-concepts', source: 'tutorials-dojo',
    question: { en: 'CloudFormation templates BEST support which Well-Architected pillar?', ro: 'Template-urile CloudFormation susțin CEL MAI BINE care pilon Well-Architected?' },
    options: [
      { en: 'Performance Efficiency', ro: 'Performance Efficiency' },
      { en: 'Operational Excellence (Infrastructure as Code)', ro: 'Operational Excellence (Infrastructure as Code)' },
      { en: 'Sustainability', ro: 'Sustainability' },
      { en: 'Cost Optimization', ro: 'Cost Optimization' },
    ],
    correct: 1,
    explanation: {
      en: 'IaC = core to Operational Excellence. Repeatable, version-controlled, auditable deployments. Reduces manual errors and drift.',
      ro: 'IaC = core pentru Operational Excellence. Deployment-uri repetabile, versionate, auditabile. Reduce erori manuale și drift.',
    },
    relatedServices: ['cloudformation'],
  },
  {
    id: 'x2-cc-5', type: 'multiple_choice', difficulty: 1,
    categories: ['cloud-fundamentals'], examDomain: 'cloud-concepts', source: 'maarek',
    question: { en: 'What is FAULT TOLERANCE (vs HA)?', ro: 'Ce e FAULT TOLERANCE (vs HA)?' },
    options: [
      { en: 'Same as HA', ro: 'La fel ca HA' },
      { en: 'ZERO downtime when components fail (active-active replicas)', ro: 'ZERO downtime când eșuează componente (replici active-active)' },
      { en: 'Fault-free hardware', ro: 'Hardware fără defecte' },
      { en: 'Tolerance for slow response', ro: 'Toleranță la răspuns lent' },
    ],
    correct: 1,
    explanation: {
      en: 'FT > HA. HA may have brief downtime during failover. FT = zero downtime, instant takeover. Costlier, mission-critical.',
      ro: 'FT > HA. HA poate avea downtime scurt la failover. FT = zero downtime, takeover instant. Mai scump, misiune-critică.',
    },
    relatedServices: [],
  },

  // SECURITY (5)
  {
    id: 'x2-sec-1', type: 'multiple_choice', difficulty: 2,
    categories: ['security'], examDomain: 'security', source: 'maarek',
    question: { en: 'BEST way to grant EC2 access to S3?', ro: 'Cea mai BUNĂ cale să dai acces EC2 la S3?' },
    options: [
      { en: 'Embed AWS keys in user data', ro: 'Încorporezi key-uri în user data' },
      { en: 'IAM Role attached to the instance', ro: 'IAM Role atașat instanței' },
      { en: 'Make bucket public', ro: 'Faci bucket-ul public' },
      { en: 'Use root credentials', ro: 'Folosești root' },
    ],
    correct: 1,
    explanation: {
      en: 'IAM Roles for EC2 = best practice. Temp credentials via metadata, auto-rotated. NEVER hardcode keys, NEVER use root.',
      ro: 'IAM Roles pentru EC2 = best practice. Credențiale temp via metadata, rotite auto. NICIODATĂ hardcode keys, NICIODATĂ root.',
    },
    relatedServices: ['iam', 'ec2', 's3'],
  },
  {
    id: 'x2-sec-2', type: 'multiple_choice', difficulty: 2,
    categories: ['security'], examDomain: 'security', source: 'tutorials-dojo',
    question: { en: 'Which AWS service classifies sensitive data (PII, PHI) in S3?', ro: 'Ce serviciu AWS clasifică date sensibile (PII, PHI) în S3?' },
    options: [{ en: 'Amazon Macie', ro: 'Amazon Macie' }, { en: 'AWS Shield', ro: 'AWS Shield' }, { en: 'AWS WAF', ro: 'AWS WAF' }, { en: 'Trusted Advisor', ro: 'Trusted Advisor' }],
    correct: 0,
    explanation: {
      en: 'Macie uses ML to find PII (SSNs, cards, names) in S3 and alert on exposure. Shield = DDoS, WAF = web exploits.',
      ro: 'Macie folosește ML să găsească PII (CNP, card-uri) în S3 și alertează la expunere. Shield = DDoS, WAF = exploit-uri web.',
    },
    relatedServices: ['macie'],
  },
  {
    id: 'x2-sec-3', type: 'multiple_choice', difficulty: 2,
    categories: ['security'], examDomain: 'security', source: 'aws-docs',
    question: { en: 'GuardDuty analyzes which 3 sources for threats?', ro: 'GuardDuty analizează care 3 surse pentru amenințări?' },
    options: [
      { en: 'EC2 logs only', ro: 'Doar log EC2' },
      { en: 'CloudTrail + VPC Flow Logs + DNS query logs', ro: 'CloudTrail + VPC Flow Logs + log-uri DNS' },
      { en: 'S3 access logs only', ro: 'Doar S3 access logs' },
      { en: 'Manual audits', ro: 'Audituri manuale' },
    ],
    correct: 1,
    explanation: {
      en: 'GuardDuty = ML-based threat detection. Continuously analyzes CloudTrail (API calls), VPC Flow Logs (network), DNS logs.',
      ro: 'GuardDuty = detecție amenințări ML. Analizează continuu CloudTrail (API), VPC Flow Logs (rețea), log-uri DNS.',
    },
    relatedServices: ['guardduty'],
  },
  {
    id: 'x2-sec-4', type: 'multiple_choice', difficulty: 1,
    categories: ['security'], examDomain: 'security', source: 'maarek',
    question: { en: 'Where do you find AWS\'s SOC 2 / PCI / ISO certifications?', ro: 'De unde iei certificările SOC 2 / PCI / ISO ale AWS?' },
    options: [
      { en: 'AWS Trusted Advisor', ro: 'AWS Trusted Advisor' },
      { en: 'AWS Artifact', ro: 'AWS Artifact' },
      { en: 'AWS Marketplace', ro: 'AWS Marketplace' },
      { en: 'AWS Cost Explorer', ro: 'AWS Cost Explorer' },
    ],
    correct: 1,
    explanation: {
      en: 'AWS Artifact = self-service portal for compliance reports (SOC, ISO, PCI, HIPAA BAA). Free for AWS customers.',
      ro: 'AWS Artifact = portal self-service pentru rapoarte compliance (SOC, ISO, PCI, HIPAA BAA). Gratuit clienților AWS.',
    },
    relatedServices: ['artifact'],
  },
  {
    id: 'x2-sec-5', type: 'multiple_choice', difficulty: 2,
    categories: ['security'], examDomain: 'security', source: 'aws-docs',
    question: { en: 'Users want to log in with Google accounts. Which AWS service?', ro: 'Userii vor să logheze cu Google. Care serviciu AWS?' },
    options: [
      { en: 'IAM users', ro: 'Useri IAM' },
      { en: 'Cognito User Pools (with social IdP)', ro: 'Cognito User Pools (cu IdP social)' },
      { en: 'AWS Directory Service', ro: 'AWS Directory Service' },
      { en: 'Active Directory only', ro: 'Doar Active Directory' },
    ],
    correct: 1,
    explanation: {
      en: 'Cognito User Pools = managed user directory + social/SAML/OIDC federation. IAM is for AWS account access, not end users.',
      ro: 'Cognito User Pools = directory user managed + federație socială/SAML/OIDC. IAM e pentru cont AWS, nu useri finali.',
    },
    relatedServices: ['cognito'],
  },

  // TECH & SERVICES (7)
  {
    id: 'x2-tech-1', type: 'multiple_choice', difficulty: 2,
    categories: ['storage'], examDomain: 'tech-services', source: 'aws-docs',
    question: { en: 'EBS volumes attach to:', ro: 'Volumele EBS se atașează la:' },
    options: [
      { en: 'Multiple instances always', ro: 'Mai multe instanțe mereu' },
      { en: 'One instance at a time (Multi-Attach for io1/io2 only)', ro: 'O singură instanță (Multi-Attach doar io1/io2)' },
      { en: 'Lambda only', ro: 'Doar Lambda' },
      { en: 'S3 buckets', ro: 'Bucket-uri S3' },
    ],
    correct: 1,
    explanation: {
      en: 'EBS = 1 instance default, same AZ. Multi-Attach (io1/io2) up to 16 instances same AZ. EFS is shared cross-AZ.',
      ro: 'EBS = 1 instanță implicit, aceeași AZ. Multi-Attach (io1/io2) până la 16 instanțe aceeași AZ. EFS e shared cross-AZ.',
    },
    relatedServices: ['ebs'],
  },
  {
    id: 'x2-tech-2', type: 'multiple_choice', difficulty: 2,
    categories: ['database'], examDomain: 'tech-services', source: 'maarek',
    question: { en: 'BEST description of DynamoDB:', ro: 'Cea mai BUNĂ descriere a DynamoDB:' },
    options: [
      { en: 'Relational DB with SQL', ro: 'DB relațional cu SQL' },
      { en: 'Managed NoSQL key-value/document, single-digit-ms latency', ro: 'NoSQL managed key-value/document, latență sub 10ms' },
      { en: 'Data warehouse', ro: 'Data warehouse' },
      { en: 'In-memory cache', ro: 'Cache in-memory' },
    ],
    correct: 1,
    explanation: {
      en: 'DynamoDB = serverless NoSQL, auto-scales, ms reads/writes. Best: serverless apps, gaming, IoT, sessions. Has Streams, Global Tables, DAX.',
      ro: 'DynamoDB = NoSQL serverless, auto-scale, ms citiri/scrieri. Cel mai bun: serverless apps, gaming, IoT, sesiuni. Are Streams, Global Tables, DAX.',
    },
    relatedServices: ['dynamodb'],
  },
  {
    id: 'x2-tech-3', type: 'multiple_choice', difficulty: 2,
    categories: ['database'], examDomain: 'tech-services', source: 'aws-docs',
    question: { en: 'Aurora is compatible with:', ro: 'Aurora e compatibil cu:' },
    options: [
      { en: 'Oracle and SQL Server', ro: 'Oracle și SQL Server' },
      { en: 'MySQL and PostgreSQL', ro: 'MySQL și PostgreSQL' },
      { en: 'MongoDB and Redis', ro: 'MongoDB și Redis' },
      { en: 'Cassandra and DynamoDB', ro: 'Cassandra și DynamoDB' },
    ],
    correct: 1,
    explanation: {
      en: 'Aurora = AWS-built drop-in for MySQL/PostgreSQL. 5x throughput vs MySQL. Auto-scales to 128TB, 6-way replication.',
      ro: 'Aurora = înlocuire drop-in MySQL/PostgreSQL construită de AWS. 5x throughput vs MySQL. Auto-scale la 128TB, replicare 6-way.',
    },
    relatedServices: ['aurora', 'rds'],
  },
  {
    id: 'x2-tech-4', type: 'multiple_choice', difficulty: 2,
    categories: ['network'], examDomain: 'tech-services', source: 'tutorials-dojo',
    question: { en: 'DEDICATED PRIVATE connection from on-prem to AWS, NOT over internet?', ro: 'Conexiune privată DEDICATĂ de la on-prem la AWS, NU peste internet?' },
    options: [
      { en: 'Site-to-Site VPN', ro: 'Site-to-Site VPN' },
      { en: 'AWS Direct Connect', ro: 'AWS Direct Connect' },
      { en: 'NAT Gateway', ro: 'NAT Gateway' },
      { en: 'Internet Gateway', ro: 'Internet Gateway' },
    ],
    correct: 1,
    explanation: {
      en: 'Direct Connect = dedicated fiber from on-prem to AWS (1-100 Gbps). Predictable latency, NOT over internet. Weeks to provision.',
      ro: 'Direct Connect = fibră dedicată de la on-prem la AWS (1-100 Gbps). Latență predictibilă, NU peste internet. Săptămâni să provisionezi.',
    },
    relatedServices: ['directconnect', 'vpc'],
  },
  {
    id: 'x2-tech-5', type: 'multiple_choice', difficulty: 1,
    categories: ['integration'], examDomain: 'tech-services', source: 'maarek',
    question: { en: 'BEST for orchestrating multi-step workflows with state machine logic?', ro: 'CEL MAI BUN pentru orchestrare workflow-uri multi-step cu state machine?' },
    options: [
      { en: 'AWS Step Functions', ro: 'AWS Step Functions' },
      { en: 'Amazon SQS', ro: 'Amazon SQS' },
      { en: 'Amazon SNS', ro: 'Amazon SNS' },
      { en: 'AWS Lambda', ro: 'AWS Lambda' },
    ],
    correct: 0,
    explanation: {
      en: 'Step Functions = JSON state machines for orchestrating Lambdas, ECS, SNS. Visual flow, retry, error-handle. Better than chained Lambdas.',
      ro: 'Step Functions = state machines JSON pentru orchestrare Lambda, ECS, SNS. Flux vizual, retry, error-handle. Mai bun decât Lambda înlănțuite.',
    },
    relatedServices: ['stepfunctions'],
  },
  {
    id: 'x2-tech-6', type: 'multiple_choice', difficulty: 2,
    categories: ['analytics'], examDomain: 'tech-services', source: 'tutorials-dojo',
    question: { en: 'Real-time INGEST of 100K events/sec clickstream?', ro: 'INGEST realtime de 100K evenimente/sec clickstream?' },
    options: [
      { en: 'Amazon S3', ro: 'Amazon S3' },
      { en: 'Amazon Kinesis Data Streams', ro: 'Amazon Kinesis Data Streams' },
      { en: 'Amazon DynamoDB', ro: 'Amazon DynamoDB' },
      { en: 'AWS Lambda', ro: 'AWS Lambda' },
    ],
    correct: 1,
    explanation: {
      en: 'Kinesis Data Streams = real-time MB/s ingestion. Ordered, replayable, multi-consumer. Firehose → S3/Redshift, Analytics → SQL on streams.',
      ro: 'Kinesis Data Streams = ingest realtime MB/s. Ordonat, replayable, multi-consumer. Firehose → S3/Redshift, Analytics → SQL pe stream-uri.',
    },
    relatedServices: ['kinesis'],
  },
  {
    id: 'x2-tech-7', type: 'multiple_choice', difficulty: 2,
    categories: ['ml-ai'], examDomain: 'tech-services', source: 'tutorials-dojo',
    question: { en: 'Extract text and form data from scanned invoices (PDFs)?', ro: 'Extragi text și date formular din facturi scanate (PDF)?' },
    options: [
      { en: 'Amazon Rekognition', ro: 'Amazon Rekognition' },
      { en: 'Amazon Textract', ro: 'Amazon Textract' },
      { en: 'Amazon Comprehend', ro: 'Amazon Comprehend' },
      { en: 'Amazon Polly', ro: 'Amazon Polly' },
    ],
    correct: 1,
    explanation: {
      en: 'Textract = OCR + form/table extraction. Specialized for invoices, receipts, IDs. Returns structured key-value. Rekognition = images.',
      ro: 'Textract = OCR + extracție formulare/tabele. Specializat facturi, bonuri, ID-uri. Key-value structurat. Rekognition = imagini.',
    },
    relatedServices: ['textract'],
  },

  // BILLING & SUPPORT (3)
  {
    id: 'x2-bill-1', type: 'multiple_choice', difficulty: 2,
    categories: ['billing'], examDomain: 'billing-support', source: 'maarek',
    question: { en: 'AWS Organizations enables which 3 PRIMARY benefits?', ro: 'AWS Organizations permite care 3 beneficii principale?' },
    options: [
      { en: 'Consolidated billing + SCPs + centralized accounts', ro: 'Consolidated billing + SCPs + cont-uri centralizate' },
      { en: 'Replacing IAM', ro: 'Înlocuire IAM' },
      { en: 'Free EC2', ro: 'EC2 gratuit' },
      { en: 'Auto Lambdas', ro: 'Auto Lambda' },
    ],
    correct: 0,
    explanation: {
      en: 'Organizations: (1) Consolidated billing — one bill, volume discounts pooled, free tier shared. (2) SCPs — guardrails on max permissions. (3) Centralized account creation/management.',
      ro: 'Organizations: (1) Consolidated billing — o factură, reduceri volum împărțite, free tier shared. (2) SCPs — guardrails pe permisiuni max. (3) Creare/management centralizat conturi.',
    },
    relatedServices: ['organizations'],
  },
  {
    id: 'x2-bill-2', type: 'multiple_choice', difficulty: 2,
    categories: ['billing'], examDomain: 'billing-support', source: 'tutorials-dojo',
    question: { en: 'Which is FREE in EC2 pricing?', ro: 'Ce e GRATUIT în prețul EC2?' },
    options: [
      { en: 'Inbound data FROM internet', ro: 'Trafic inbound DE pe internet' },
      { en: 'Outbound data TO internet', ro: 'Trafic outbound CĂTRE internet' },
      { en: 'EBS storage', ro: 'Storage EBS' },
      { en: 'Compute hours', ro: 'Ore compute' },
    ],
    correct: 0,
    explanation: {
      en: 'Inbound (ingress) FREE. Outbound (egress) paid (~$0.09/GB after 100GB free). Architecture tip: keep traffic intra-AWS, use CloudFront for egress savings.',
      ro: 'Inbound (ingress) GRATUIT. Outbound (egress) plătit (~$0.09/GB după 100GB gratuit). Tip arhitectural: ține trafic intra-AWS, CloudFront pentru economii egress.',
    },
    relatedServices: ['ec2'],
  },
  {
    id: 'x2-bill-3', type: 'multiple_choice', difficulty: 1,
    categories: ['billing'], examDomain: 'billing-support', source: 'maarek',
    question: { en: 'Split AWS bill among 5 internal departments?', ro: 'Împarți factura AWS între 5 departamente interne?' },
    options: [
      { en: 'Cost Allocation Tags + Cost Explorer', ro: 'Cost Allocation Tags + Cost Explorer' },
      { en: 'Multi-AZ', ro: 'Multi-AZ' },
      { en: 'Auto Scaling', ro: 'Auto Scaling' },
      { en: 'Elastic IPs', ro: 'Elastic IPs' },
    ],
    correct: 0,
    explanation: {
      en: 'Tag resources with `Department=Marketing`, activate as Cost Allocation Tag, filter Cost Explorer by tag. Common keys: Department, Project, Environment, Owner.',
      ro: 'Tag-uiești resurse cu `Department=Marketing`, activezi ca Cost Allocation Tag, filtrezi Cost Explorer după tag. Chei comune: Department, Project, Environment, Owner.',
    },
    relatedServices: ['costexplorer'],
  },
];
