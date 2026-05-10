import type { QuizQuestion, ExamDomain } from '@/types';
import { cloudConceptsQuestions } from './questions/cloud-concepts';
import { securityQuestions } from './questions/security';
import { techServicesQuestions } from './questions/tech-services';
import { billingSupportQuestions } from './questions/billing-support';
import { extraQuestions } from './questions/extra';
import { extraQuestions2 } from './questions/extra2';
import { extraQuestions3 } from './questions/extra3';

/**
 * AWS Certified Cloud Practitioner (CLF-C02) practice questions.
 * Curated from Stephane Maarek's CLF-C02 course (primary) + official AWS exam guide
 * + Tutorials Dojo + AWS Skill Builder cross-reference.
 *
 * Each question is tagged with `examDomain` for the 4 official CLF-C02 domains:
 *   - cloud-concepts (24%)
 *   - security (30%)
 *   - tech-services (34%)
 *   - billing-support (12%)
 */

/** Legacy (v0.2) bank — domain tags inferred at runtime in `quizQuestions`. */
const legacyQuestions: QuizQuestion[] = [
  // ========================================================================
  // GLOBAL INFRASTRUCTURE
  // ========================================================================
  {
    id: 'q-az-1',
    type: 'multiple_choice',
    difficulty: 1,
    categories: ['global-infrastructure'],
    question: {
      en: 'What is an AWS Availability Zone?',
      ro: 'Ce este un AWS Availability Zone?',
    },
    options: [
      { en: 'A geographic area like us-east-1', ro: 'O zonă geografică precum us-east-1' },
      { en: 'One or more discrete data centers within a Region, with redundant power and networking', ro: 'Unul sau mai multe data centers discrete într-o Regiune, cu alimentare și rețea redundante' },
      { en: 'A Content Delivery Network endpoint', ro: 'Un endpoint Content Delivery Network' },
      { en: 'A type of EC2 instance', ro: 'Un tip de instanță EC2' },
    ],
    correct: 1,
    explanation: {
      en: 'An AZ is one or more discrete data centers within a Region. They are physically separated but connected by low-latency, high-throughput private fiber. Use multiple AZs for High Availability.',
      ro: 'Un AZ este unul sau mai multe data centers discrete într-o Regiune. Sunt separate fizic dar conectate prin fibră privată cu latență mică. Folosești mai multe AZ-uri pentru HA.',
    },
    relatedServices: [],
  },
  {
    id: 'q-region-1',
    type: 'multiple_choice',
    difficulty: 1,
    categories: ['global-infrastructure'],
    question: {
      en: 'How many Availability Zones does each AWS Region have at minimum?',
      ro: 'Câte AZ-uri are minim fiecare Regiune AWS?',
    },
    options: [
      { en: '1', ro: '1' },
      { en: '2', ro: '2' },
      { en: '3', ro: '3' },
      { en: '5', ro: '5' },
    ],
    correct: 2,
    explanation: {
      en: 'Each AWS Region has at least 3 Availability Zones. Most have 3, some have up to 6. This enables fault-tolerant architectures.',
      ro: 'Fiecare Regiune AWS are minim 3 AZ-uri. Majoritatea au 3, unele până la 6. Permite arhitecturi tolerante la defecte.',
    },
    relatedServices: [],
  },
  {
    id: 'q-edge-1',
    type: 'multiple_choice',
    difficulty: 2,
    categories: ['global-infrastructure'],
    question: {
      en: 'A company wants to reduce latency for users worldwide accessing static website content. Which AWS infrastructure component is MOST appropriate?',
      ro: 'O companie vrea să reducă latența pentru utilizatorii globali care accesează conținut static. Care componentă AWS e MAI potrivită?',
    },
    options: [
      { en: 'Multi-AZ deployment in one Region', ro: 'Deployment Multi-AZ într-o Regiune' },
      { en: 'AWS Edge Locations via CloudFront', ro: 'Edge Locations AWS via CloudFront' },
      { en: 'Multiple EC2 instances in a single AZ', ro: 'Mai multe instanțe EC2 într-un singur AZ' },
      { en: 'AWS Outposts', ro: 'AWS Outposts' },
    ],
    correct: 1,
    explanation: {
      en: 'CloudFront uses 450+ Edge Locations to cache content close to users, reducing latency globally. Edge Locations are NOT full Regions — they only host specific services like CloudFront, Route 53, Shield, WAF.',
      ro: 'CloudFront folosește 450+ Edge Locations pentru cache aproape de utilizatori, reducând latența global. Edge Locations NU sunt Regiuni complete — găzduiesc doar CloudFront, Route 53, Shield, WAF.',
    },
    relatedServices: ['cloudfront', 'route53'],
  },

  // ========================================================================
  // SHARED RESPONSIBILITY
  // ========================================================================
  {
    id: 'q-shared-1',
    type: 'multiple_choice',
    difficulty: 2,
    categories: ['shared-responsibility'],
    question: {
      en: 'Under the AWS Shared Responsibility Model, who is responsible for patching the operating system on an EC2 instance?',
      ro: 'În Modelul Responsabilității Partajate, cine e responsabil de patching-ul OS-ului pe o instanță EC2?',
    },
    options: [
      { en: 'AWS, always', ro: 'AWS, mereu' },
      { en: 'The customer', ro: 'Clientul' },
      { en: 'Both AWS and customer equally', ro: 'AWS și clientul în egală măsură' },
      { en: 'Neither — the OS does not need patching', ro: 'Niciunul — OS-ul nu necesită patching' },
    ],
    correct: 1,
    explanation: {
      en: 'For EC2 (IaaS), the customer is responsible for the guest OS, including patches, updates, and security configuration. AWS only manages the underlying hardware and hypervisor. For managed services like RDS, AWS handles OS patching.',
      ro: 'Pentru EC2 (IaaS), clientul răspunde de guest OS, inclusiv patches, update-uri, config securitate. AWS gestionează doar hardware-ul și hipervizorul. Pentru servicii managed ca RDS, AWS face patching la OS.',
    },
    relatedServices: ['ec2'],
  },
  {
    id: 'q-shared-2',
    type: 'multiple_choice',
    difficulty: 2,
    categories: ['shared-responsibility'],
    question: {
      en: 'Which of the following is ALWAYS the customer responsibility regardless of the AWS service used?',
      ro: 'Care este MEREU responsabilitatea clientului, indiferent de serviciul AWS folosit?',
    },
    options: [
      { en: 'Physical security of data centers', ro: 'Securitatea fizică a data centers' },
      { en: 'IAM users, roles, and access policies', ro: 'IAM users, roles și politici de acces' },
      { en: 'Hypervisor patching', ro: 'Patching hipervizor' },
      { en: 'Network cabling between Regions', ro: 'Cabluri de rețea între Regiuni' },
    ],
    correct: 1,
    explanation: {
      en: 'IAM (Identity and Access Management) is ALWAYS the customer\'s responsibility. AWS manages the IAM service infrastructure, but configuring users, groups, roles, and policies is up to you.',
      ro: 'IAM este MEREU responsabilitatea clientului. AWS gestionează infrastructura IAM, dar configurarea userilor, grupurilor, rolurilor și politicilor e treaba ta.',
    },
    relatedServices: ['iam'],
  },

  // ========================================================================
  // EC2 / COMPUTE
  // ========================================================================
  {
    id: 'q-ec2-1',
    type: 'multiple_choice',
    difficulty: 2,
    categories: ['compute'],
    question: {
      en: 'A company runs a workload that can tolerate interruption and wants the lowest possible cost. Which EC2 pricing model should they use?',
      ro: 'O companie rulează un workload care tolerează întreruperi și vrea costul cel mai mic. Ce model de preț EC2?',
    },
    options: [
      { en: 'On-Demand Instances', ro: 'On-Demand Instances' },
      { en: 'Reserved Instances (3-year)', ro: 'Reserved Instances (3 ani)' },
      { en: 'Spot Instances', ro: 'Spot Instances' },
      { en: 'Dedicated Hosts', ro: 'Dedicated Hosts' },
    ],
    correct: 2,
    explanation: {
      en: 'Spot Instances offer up to 90% discount but can be terminated by AWS with a 2-minute notice when capacity is needed. Perfect for fault-tolerant, batch, or stateless workloads. Reserved Instances give max 72% off; On-Demand has no discount.',
      ro: 'Spot Instances oferă până la 90% reducere dar pot fi oprite de AWS cu preaviz 2 min. Ideal pentru workloads tolerante la defecte, batch sau stateless. Reserved Instances dau maxim 72%; On-Demand nu are reducere.',
    },
    relatedServices: ['ec2'],
  },
  {
    id: 'q-lambda-1',
    type: 'multiple_choice',
    difficulty: 2,
    categories: ['compute'],
    question: {
      en: 'What is the maximum execution time for a single AWS Lambda invocation?',
      ro: 'Care este timpul maxim de execuție al unei invocări AWS Lambda?',
    },
    options: [
      { en: '5 minutes', ro: '5 minute' },
      { en: '15 minutes', ro: '15 minute' },
      { en: '1 hour', ro: '1 oră' },
      { en: 'No limit', ro: 'Fără limită' },
    ],
    correct: 1,
    explanation: {
      en: 'Lambda functions can run for up to 15 minutes per invocation. For longer-running compute, use AWS Batch, ECS, or EC2.',
      ro: 'Funcțiile Lambda pot rula până la 15 minute per invocare. Pentru execuții mai lungi, folosește AWS Batch, ECS sau EC2.',
    },
    relatedServices: ['lambda', 'batch', 'ecs'],
  },
  {
    id: 'q-beanstalk-1',
    type: 'multiple_choice',
    difficulty: 2,
    categories: ['compute'],
    question: {
      en: 'A developer wants to upload application code and have AWS automatically provision EC2, ELB, Auto Scaling, and RDS without managing the infrastructure. Which service?',
      ro: 'Un dezvoltator vrea să uploadeze cod și AWS să provisioneze automat EC2, ELB, Auto Scaling și RDS fără să gestioneze infrastructura. Ce serviciu?',
    },
    options: [
      { en: 'Amazon EC2', ro: 'Amazon EC2' },
      { en: 'AWS Elastic Beanstalk', ro: 'AWS Elastic Beanstalk' },
      { en: 'AWS CloudFormation', ro: 'AWS CloudFormation' },
      { en: 'AWS Lambda', ro: 'AWS Lambda' },
    ],
    correct: 1,
    explanation: {
      en: 'Elastic Beanstalk is a Platform-as-a-Service (PaaS) — you upload code, AWS handles provisioning of EC2, ELB, ASG, RDS. The service itself is FREE; you only pay for resources used. CloudFormation is IaC but you write the templates yourself.',
      ro: 'Elastic Beanstalk e PaaS — uploadezi cod, AWS gestionează EC2, ELB, ASG, RDS. Serviciul e GRATUIT; plătești doar resursele. CloudFormation e IaC dar scrii template-urile.',
    },
    relatedServices: ['beanstalk', 'cloudformation'],
  },

  // ========================================================================
  // STORAGE
  // ========================================================================
  {
    id: 'q-s3-1',
    type: 'multiple_choice',
    difficulty: 1,
    categories: ['storage'],
    question: {
      en: 'What is the maximum size of a single object in Amazon S3?',
      ro: 'Care este dimensiunea maximă a unui obiect S3?',
    },
    options: [
      { en: '5 MB', ro: '5 MB' },
      { en: '5 GB', ro: '5 GB' },
      { en: '5 TB', ro: '5 TB' },
      { en: 'Unlimited', ro: 'Nelimitată' },
    ],
    correct: 2,
    explanation: {
      en: 'A single S3 object can be up to 5 TB. Note: a single PUT operation has a max of 5 GB; for larger objects you must use multipart upload.',
      ro: 'Un obiect S3 poate avea până la 5 TB. Notă: un singur PUT poate fi de maxim 5 GB; pentru obiecte mai mari folosește multipart upload.',
    },
    relatedServices: ['s3'],
  },
  {
    id: 'q-s3-2',
    type: 'multiple_choice',
    difficulty: 2,
    categories: ['storage'],
    question: {
      en: 'A company needs the cheapest S3 storage class for archives accessed once a year, with retrieval acceptable in 12 hours. Which class?',
      ro: 'O companie are nevoie de cea mai ieftină clasă S3 pentru arhive accesate o dată pe an, recuperare acceptabilă în 12 ore. Ce clasă?',
    },
    options: [
      { en: 'S3 Standard', ro: 'S3 Standard' },
      { en: 'S3 Standard-Infrequent Access', ro: 'S3 Standard-Infrequent Access' },
      { en: 'S3 Glacier Flexible Retrieval', ro: 'S3 Glacier Flexible Retrieval' },
      { en: 'S3 Glacier Deep Archive', ro: 'S3 Glacier Deep Archive' },
    ],
    correct: 3,
    explanation: {
      en: 'Glacier Deep Archive is the cheapest storage class ($0.00099/GB-month), with retrieval times of 12-48 hours. Use it for long-term archives accessed rarely. Glacier Flexible Retrieval is 1-12h. Glacier Instant Retrieval is ms but more expensive.',
      ro: 'Glacier Deep Archive e cea mai ieftină ($0.00099/GB-lună), cu recuperare 12-48h. Pentru arhive accesate rar. Glacier Flexible: 1-12h. Glacier Instant: ms dar mai scump.',
    },
    relatedServices: ['s3', 'glacier'],
  },
  {
    id: 'q-ebs-efs',
    type: 'multiple_choice',
    difficulty: 2,
    categories: ['storage'],
    question: {
      en: 'Multiple EC2 instances in different Availability Zones need to share a Linux file system simultaneously. Which storage service?',
      ro: 'Mai multe instanțe EC2 din AZ-uri diferite trebuie să partajeze un file system Linux simultan. Ce serviciu?',
    },
    options: [
      { en: 'Amazon EBS', ro: 'Amazon EBS' },
      { en: 'Amazon EFS', ro: 'Amazon EFS' },
      { en: 'Amazon S3', ro: 'Amazon S3' },
      { en: 'Instance Store', ro: 'Instance Store' },
    ],
    correct: 1,
    explanation: {
      en: 'EFS (Elastic File System) is a managed NFS file system that can be mounted by multiple EC2 instances across multiple AZs simultaneously. EBS is single-AZ and (mostly) single-instance. S3 is object storage, not a file system.',
      ro: 'EFS (Elastic File System) e un NFS managed care poate fi montat de mai multe EC2 din mai multe AZ-uri simultan. EBS e single-AZ și (în general) single-instanță. S3 e obiect storage, nu file system.',
    },
    relatedServices: ['efs', 'ebs', 's3'],
  },

  // ========================================================================
  // DATABASES
  // ========================================================================
  {
    id: 'q-dynamo-1',
    type: 'multiple_choice',
    difficulty: 2,
    categories: ['database'],
    question: {
      en: 'Which AWS service provides a fully-managed NoSQL database with single-digit millisecond latency?',
      ro: 'Care serviciu AWS oferă o bază NoSQL fully-managed cu latență sub 10 milisecunde?',
    },
    options: [
      { en: 'Amazon RDS', ro: 'Amazon RDS' },
      { en: 'Amazon Aurora', ro: 'Amazon Aurora' },
      { en: 'Amazon DynamoDB', ro: 'Amazon DynamoDB' },
      { en: 'Amazon Redshift', ro: 'Amazon Redshift' },
    ],
    correct: 2,
    explanation: {
      en: 'DynamoDB is a fully-managed serverless NoSQL key-value and document database with consistent single-digit ms latency. RDS/Aurora are relational. Redshift is a data warehouse for analytics.',
      ro: 'DynamoDB e NoSQL serverless managed cu latență consistentă sub 10ms. RDS/Aurora sunt relaționale. Redshift e data warehouse pentru analitică.',
    },
    relatedServices: ['dynamodb', 'rds', 'aurora', 'redshift'],
  },
  {
    id: 'q-rds-multi-az',
    type: 'multiple_choice',
    difficulty: 2,
    categories: ['database'],
    question: {
      en: 'What does enabling Multi-AZ on an Amazon RDS instance provide?',
      ro: 'Ce oferă activarea Multi-AZ pe o instanță Amazon RDS?',
    },
    options: [
      { en: 'Read scaling by adding read replicas', ro: 'Scalare citiri adăugând read replicas' },
      { en: 'Synchronous standby replica in another AZ for automatic failover', ro: 'Replică standby sincronă în alt AZ pentru failover automat' },
      { en: 'Cross-region disaster recovery', ro: 'Disaster recovery cross-region' },
      { en: 'Backup to S3 Glacier', ro: 'Backup în S3 Glacier' },
    ],
    correct: 1,
    explanation: {
      en: 'Multi-AZ creates a synchronous standby replica in a different AZ. If the primary fails, RDS automatically fails over (typically <60s). This provides High Availability, NOT read scaling — for reads use Read Replicas.',
      ro: 'Multi-AZ creează o replică standby sincronă în alt AZ. La defect, RDS face failover automat (<60s). Oferă HA, NU scalare citiri — pentru citiri folosește Read Replicas.',
    },
    relatedServices: ['rds'],
  },

  // ========================================================================
  // NETWORK
  // ========================================================================
  {
    id: 'q-vpc-1',
    type: 'multiple_choice',
    difficulty: 2,
    categories: ['network'],
    question: {
      en: 'What is the difference between a Security Group and a Network ACL (NACL)?',
      ro: 'Care e diferența dintre un Security Group și un Network ACL (NACL)?',
    },
    options: [
      { en: 'Security Groups are stateless; NACLs are stateful', ro: 'Security Groups sunt stateless; NACL-urile sunt stateful' },
      { en: 'Security Groups operate at the instance level (stateful); NACLs at the subnet level (stateless)', ro: 'Security Groups la nivel instanță (stateful); NACL-uri la nivel subnet (stateless)' },
      { en: 'NACLs are global; Security Groups are regional', ro: 'NACL-urile sunt globale; Security Groups regionale' },
      { en: 'They are identical', ro: 'Sunt identice' },
    ],
    correct: 1,
    explanation: {
      en: 'Security Groups are STATEFUL firewalls at the instance level (return traffic auto-allowed). NACLs are STATELESS firewalls at the subnet level (must explicitly allow inbound AND outbound). Security Groups can only ALLOW; NACLs can ALLOW or DENY.',
      ro: 'Security Groups sunt firewall-uri STATEFUL la nivel de instanță (traficul de retur permis automat). NACL-urile sunt STATELESS la nivel de subnet (trebuie să permiți explicit inbound ȘI outbound). Security Groups doar ALLOW; NACL-urile ALLOW sau DENY.',
    },
    relatedServices: ['vpc'],
  },
  {
    id: 'q-route53-1',
    type: 'multiple_choice',
    difficulty: 2,
    categories: ['network'],
    question: {
      en: 'A company wants to direct traffic to the AWS Region with the lowest latency for each user. Which Route 53 routing policy?',
      ro: 'O companie vrea să direcționeze traficul la Regiunea AWS cu latența cea mai mică pentru fiecare user. Ce politică de routing Route 53?',
    },
    options: [
      { en: 'Simple', ro: 'Simple' },
      { en: 'Weighted', ro: 'Weighted' },
      { en: 'Latency-based', ro: 'Latency-based' },
      { en: 'Geolocation', ro: 'Geolocation' },
    ],
    correct: 2,
    explanation: {
      en: 'Latency-based routing sends users to the AWS Region with the lowest measured latency. Geolocation routes by the user\'s country (not necessarily lowest latency). Weighted splits by percentage. Simple gives one endpoint.',
      ro: 'Latency-based trimite userii la Regiunea cu latența măsurată cea mai mică. Geolocation rutează după țara userului (nu neapărat latență minimă). Weighted face split procentual. Simple un endpoint.',
    },
    relatedServices: ['route53'],
  },

  // ========================================================================
  // SECURITY / IAM
  // ========================================================================
  {
    id: 'q-iam-root',
    type: 'multiple_choice',
    difficulty: 1,
    categories: ['security'],
    question: {
      en: 'Which is a recommended best practice for the AWS root account?',
      ro: 'Care e best practice pentru contul root AWS?',
    },
    options: [
      { en: 'Use it for daily administration tasks', ro: 'Îl folosești pentru administrare zilnică' },
      { en: 'Disable MFA to make access easier', ro: 'Dezactivezi MFA ca să accesezi ușor' },
      { en: 'Enable MFA and use only for specific tasks like account/billing changes', ro: 'Activezi MFA și îl folosești doar pentru schimbări cont/facturare' },
      { en: 'Share the credentials with the entire team', ro: 'Împarți credențialele cu toată echipa' },
    ],
    correct: 2,
    explanation: {
      en: 'The root account should have MFA enabled and be used only for specific tasks (initial setup, billing, account closure). For daily work, create IAM users/roles with least-privilege permissions.',
      ro: 'Contul root trebuie să aibă MFA activat și să fie folosit doar pentru sarcini specifice (setup inițial, facturare, închidere cont). Pentru muncă zilnică, creezi useri/roluri IAM cu privilegii minime.',
    },
    relatedServices: ['iam'],
  },
  {
    id: 'q-iam-role-ec2',
    type: 'multiple_choice',
    difficulty: 2,
    categories: ['security'],
    question: {
      en: 'An EC2 instance needs to access an S3 bucket. What is the BEST way to grant permissions?',
      ro: 'O instanță EC2 trebuie să acceseze un bucket S3. Care e cel MAI bun mod de a da permisiuni?',
    },
    options: [
      { en: 'Hardcode access keys in the application', ro: 'Hardcodezi access keys în aplicație' },
      { en: 'Store access keys in EC2 user data', ro: 'Stochezi access keys în EC2 user data' },
      { en: 'Attach an IAM Role to the EC2 instance', ro: 'Atașezi un IAM Role la instanța EC2' },
      { en: 'Make the S3 bucket public', ro: 'Faci bucket-ul S3 public' },
    ],
    correct: 2,
    explanation: {
      en: 'Always use IAM Roles for AWS services (EC2, Lambda, ECS). The role provides temporary credentials that auto-rotate. NEVER hardcode access keys — they can be leaked in code, logs, or images.',
      ro: 'Folosește mereu IAM Roles pentru servicii AWS (EC2, Lambda, ECS). Rolul oferă credențiale temporare care se rotesc automat. NICIODATĂ hardcode access keys — pot fi leak-uite în cod, log-uri, imagini.',
    },
    relatedServices: ['iam', 'ec2', 's3'],
  },
  {
    id: 'q-kms-1',
    type: 'multiple_choice',
    difficulty: 2,
    categories: ['security'],
    question: {
      en: 'Which AWS service centrally manages encryption keys for services like S3, EBS, and RDS?',
      ro: 'Care serviciu AWS gestionează centralizat cheile de criptare pentru S3, EBS, RDS?',
    },
    options: [
      { en: 'AWS Secrets Manager', ro: 'AWS Secrets Manager' },
      { en: 'AWS KMS', ro: 'AWS KMS' },
      { en: 'AWS Certificate Manager', ro: 'AWS Certificate Manager' },
      { en: 'AWS WAF', ro: 'AWS WAF' },
    ],
    correct: 1,
    explanation: {
      en: 'AWS KMS (Key Management Service) centrally manages encryption keys (CMKs). Used by S3, EBS, RDS, Secrets Manager. Every key usage is logged in CloudTrail. Secrets Manager stores secrets like passwords, not encryption keys themselves.',
      ro: 'AWS KMS (Key Management Service) gestionează centralizat cheile (CMKs). Folosit de S3, EBS, RDS, Secrets Manager. Fiecare utilizare e log-ată în CloudTrail. Secrets Manager stochează secrete (parole), nu cheile.',
    },
    relatedServices: ['kms', 's3', 'ebs', 'rds'],
  },
  {
    id: 'q-shield-1',
    type: 'multiple_choice',
    difficulty: 2,
    categories: ['security'],
    question: {
      en: 'Which AWS service automatically protects ALL AWS resources from common DDoS attacks at no extra cost?',
      ro: 'Care serviciu AWS protejează automat TOATE resursele AWS de atacuri DDoS comune fără cost suplimentar?',
    },
    options: [
      { en: 'AWS WAF', ro: 'AWS WAF' },
      { en: 'AWS Shield Standard', ro: 'AWS Shield Standard' },
      { en: 'AWS Shield Advanced', ro: 'AWS Shield Advanced' },
      { en: 'Amazon GuardDuty', ro: 'Amazon GuardDuty' },
    ],
    correct: 1,
    explanation: {
      en: 'Shield Standard is FREE and automatic for all AWS customers — protects against common Layer 3/4 DDoS attacks. Shield Advanced costs $3,000/month and adds Layer 7 protection, 24/7 DDoS Response Team, cost protection. WAF protects against application-layer attacks (SQLi, XSS).',
      ro: 'Shield Standard e GRATUIT și automat pentru toți clienții AWS — protejează la atacuri DDoS comune Layer 3/4. Shield Advanced costă $3,000/lună și adaugă protecție Layer 7, DDoS Response Team 24/7, cost protection. WAF protejează la atacuri de aplicație (SQLi, XSS).',
    },
    relatedServices: ['shield', 'waf', 'guardduty'],
  },

  // ========================================================================
  // PRICING & SUPPORT
  // ========================================================================
  {
    id: 'q-pricing-1',
    type: 'multiple_choice',
    difficulty: 1,
    categories: ['billing', 'pricing'],
    question: {
      en: 'Which of the following is FREE in AWS (i.e., no charge for the service itself)?',
      ro: 'Care din următoarele sunt GRATUITE în AWS (fără cost pentru serviciu)?',
    },
    options: [
      { en: 'Amazon EC2', ro: 'Amazon EC2' },
      { en: 'AWS IAM', ro: 'AWS IAM' },
      { en: 'Amazon RDS', ro: 'Amazon RDS' },
      { en: 'Amazon Redshift', ro: 'Amazon Redshift' },
    ],
    correct: 1,
    explanation: {
      en: 'IAM is completely free. Other free services: VPC, CloudFormation, Auto Scaling, Elastic Beanstalk (you pay only for resources used). EC2, RDS, Redshift all have hourly costs.',
      ro: 'IAM e complet gratuit. Alte servicii gratuite: VPC, CloudFormation, Auto Scaling, Elastic Beanstalk (plătești doar resursele). EC2, RDS, Redshift au costuri orare.',
    },
    relatedServices: ['iam', 'vpc', 'cloudformation'],
  },
  {
    id: 'q-pricing-2',
    type: 'multiple_choice',
    difficulty: 2,
    categories: ['billing', 'pricing'],
    question: {
      en: 'Which AWS pricing principle reflects "the more you use, the less you pay per unit"?',
      ro: 'Care principiu de preț AWS reflectă "cu cât folosești mai mult, plătești mai puțin per unitate"?',
    },
    options: [
      { en: 'Pay-as-you-go', ro: 'Pay-as-you-go' },
      { en: 'Pay less when you reserve', ro: 'Plătești mai puțin rezervând' },
      { en: 'Pay less per unit when you use more (volume tiered)', ro: 'Plătești mai puțin per unitate când folosești mai mult (volum tiered)' },
      { en: 'Free tier', ro: 'Free tier' },
    ],
    correct: 2,
    explanation: {
      en: 'AWS uses tiered pricing for many services (S3, data transfer): the more you use, the cheaper the per-unit price. Pay-as-you-go is the basic principle (no commitment). Reserved is the discount-by-commitment one.',
      ro: 'AWS folosește tiered pricing pentru multe servicii (S3, transfer date): cu cât folosești mai mult, costul per unitate scade. Pay-as-you-go e principiul de bază (fără angajament). Reserved e reducere prin angajament.',
    },
    relatedServices: ['s3'],
  },
  {
    id: 'q-budgets-explorer',
    type: 'multiple_choice',
    difficulty: 2,
    categories: ['billing', 'management'],
    question: {
      en: 'A finance team wants to receive an email alert when monthly AWS spending exceeds $10,000. Which service?',
      ro: 'O echipă de finanțe vrea să primească alertă email când cheltuiala lunară AWS depășește $10,000. Ce serviciu?',
    },
    options: [
      { en: 'AWS Cost Explorer', ro: 'AWS Cost Explorer' },
      { en: 'AWS Budgets', ro: 'AWS Budgets' },
      { en: 'AWS Pricing Calculator', ro: 'AWS Pricing Calculator' },
      { en: 'AWS Trusted Advisor', ro: 'AWS Trusted Advisor' },
    ],
    correct: 1,
    explanation: {
      en: 'AWS Budgets sends proactive alerts (email/SNS) when costs exceed thresholds. Cost Explorer is for visualizing past costs. Pricing Calculator is for estimating future costs. Trusted Advisor gives optimization suggestions.',
      ro: 'AWS Budgets trimite alerte proactive (email/SNS) când costurile depășesc praguri. Cost Explorer vizualizează costuri istorice. Pricing Calculator estimează costuri viitoare. Trusted Advisor dă sugestii de optimizare.',
    },
    relatedServices: ['budgets', 'costexplorer', 'calculator'],
  },
  {
    id: 'q-support-1',
    type: 'multiple_choice',
    difficulty: 2,
    categories: ['support'],
    question: {
      en: 'Which AWS Support plan is the LOWEST tier that includes a dedicated Technical Account Manager (TAM)?',
      ro: 'Care e cel mai mic plan AWS Support care include un Technical Account Manager (TAM) dedicat?',
    },
    options: [
      { en: 'Developer', ro: 'Developer' },
      { en: 'Business', ro: 'Business' },
      { en: 'Enterprise On-Ramp', ro: 'Enterprise On-Ramp' },
      { en: 'Enterprise', ro: 'Enterprise' },
    ],
    correct: 3,
    explanation: {
      en: 'Only the Enterprise plan ($15,000/month) includes a dedicated TAM. Enterprise On-Ramp ($5,500/month) provides access to a POOL of TAMs, not a dedicated one. Business and below have no TAM.',
      ro: 'Doar planul Enterprise ($15,000/lună) include TAM dedicat. Enterprise On-Ramp ($5,500/lună) oferă acces la un POOL de TAM-uri, nu unul dedicat. Business și mai jos nu au TAM.',
    },
    relatedServices: ['supportplans'],
  },
  {
    id: 'q-trustedadvisor-1',
    type: 'multiple_choice',
    difficulty: 1,
    categories: ['management', 'support'],
    question: {
      en: 'Which service provides automated recommendations across cost, performance, security, fault tolerance, and service limits?',
      ro: 'Care serviciu oferă recomandări automate pentru cost, performanță, securitate, fault tolerance și service limits?',
    },
    options: [
      { en: 'AWS Trusted Advisor', ro: 'AWS Trusted Advisor' },
      { en: 'AWS Config', ro: 'AWS Config' },
      { en: 'AWS CloudTrail', ro: 'AWS CloudTrail' },
      { en: 'Amazon Inspector', ro: 'Amazon Inspector' },
    ],
    correct: 0,
    explanation: {
      en: 'Trusted Advisor is the automated AWS advisor with 5 pillars: Cost, Performance, Security, Fault Tolerance, Service Limits. Basic/Developer plans get 7 security checks; Business+ gets full checks.',
      ro: 'Trusted Advisor e consilierul automat AWS cu 5 piloni: Cost, Performance, Security, Fault Tolerance, Service Limits. Basic/Developer primesc 7 checks securitate; Business+ primește toate.',
    },
    relatedServices: ['trustedadvisor'],
  },

  // ========================================================================
  // MANAGEMENT & MONITORING
  // ========================================================================
  {
    id: 'q-cloudtrail-watch',
    type: 'multiple_choice',
    difficulty: 2,
    categories: ['management'],
    question: {
      en: 'Which service records WHO made API calls in your AWS account, providing an audit log of activity?',
      ro: 'Care serviciu înregistrează CINE a făcut apeluri API în contul AWS, oferind audit log?',
    },
    options: [
      { en: 'Amazon CloudWatch', ro: 'Amazon CloudWatch' },
      { en: 'AWS CloudTrail', ro: 'AWS CloudTrail' },
      { en: 'AWS Config', ro: 'AWS Config' },
      { en: 'Amazon GuardDuty', ro: 'Amazon GuardDuty' },
    ],
    correct: 1,
    explanation: {
      en: 'CloudTrail logs every API call in your account (who, what, when, from where). CloudWatch is for metrics and logs from applications. Config tracks resource state changes (not API calls). GuardDuty does threat detection using CloudTrail/VPC logs.',
      ro: 'CloudTrail loghează fiecare apel API (cine, ce, când, de unde). CloudWatch e pentru metrici și log-uri aplicații. Config urmărește schimbări de stare resurse (nu apeluri API). GuardDuty face detecție amenințări folosind CloudTrail/VPC logs.',
    },
    relatedServices: ['cloudtrail', 'cloudwatch', 'config'],
  },
  {
    id: 'q-cloudformation-1',
    type: 'multiple_choice',
    difficulty: 2,
    categories: ['management'],
    question: {
      en: 'Which AWS service provides Infrastructure as Code (IaC) using YAML/JSON templates?',
      ro: 'Care serviciu AWS oferă Infrastructure as Code (IaC) cu template-uri YAML/JSON?',
    },
    options: [
      { en: 'AWS Systems Manager', ro: 'AWS Systems Manager' },
      { en: 'AWS CloudFormation', ro: 'AWS CloudFormation' },
      { en: 'AWS OpsWorks', ro: 'AWS OpsWorks' },
      { en: 'AWS Service Catalog', ro: 'AWS Service Catalog' },
    ],
    correct: 1,
    explanation: {
      en: 'CloudFormation lets you declare AWS resources in YAML/JSON templates and AWS provisions them atomically (with auto-rollback on failure). It IS the IaC service. Systems Manager is for fleet management. OpsWorks uses Chef/Puppet.',
      ro: 'CloudFormation îți permite să declari resurse AWS în template-uri YAML/JSON și AWS le provisiona atomic (cu rollback automat la eșec). E SERVICIUL IaC. Systems Manager e pentru fleet management. OpsWorks folosește Chef/Puppet.',
    },
    relatedServices: ['cloudformation', 'systemsmanager'],
  },

  // ========================================================================
  // INTEGRATION
  // ========================================================================
  {
    id: 'q-sqs-sns',
    type: 'multiple_choice',
    difficulty: 2,
    categories: ['integration'],
    question: {
      en: 'A producer needs to send the SAME message to multiple subscribers (Lambda, email, SQS queue) at once. Which service?',
      ro: 'Un producător trebuie să trimită ACELAȘI mesaj la mai mulți subscribers (Lambda, email, coadă SQS) deodată. Ce serviciu?',
    },
    options: [
      { en: 'Amazon SQS', ro: 'Amazon SQS' },
      { en: 'Amazon SNS', ro: 'Amazon SNS' },
      { en: 'Amazon Kinesis', ro: 'Amazon Kinesis' },
      { en: 'AWS Step Functions', ro: 'AWS Step Functions' },
    ],
    correct: 1,
    explanation: {
      en: 'SNS is pub/sub: one Topic delivers to many Subscribers (Lambda, email, SMS, SQS, HTTP). SQS is point-to-point queuing (one message, one consumer). The "fan-out" pattern uses SNS → multiple SQS queues.',
      ro: 'SNS e pub/sub: un Topic livrează la mulți Subscribers (Lambda, email, SMS, SQS, HTTP). SQS e queue point-to-point (un mesaj, un consumer). Pattern-ul "fan-out" folosește SNS → mai multe SQS.',
    },
    relatedServices: ['sns', 'sqs'],
  },

  // ========================================================================
  // WELL-ARCHITECTED
  // ========================================================================
  {
    id: 'q-wa-pillars',
    type: 'multiple_choice',
    difficulty: 1,
    categories: ['well-architected'],
    question: {
      en: 'How many pillars does the AWS Well-Architected Framework have?',
      ro: 'Câți piloni are AWS Well-Architected Framework?',
    },
    options: [
      { en: '4', ro: '4' },
      { en: '5', ro: '5' },
      { en: '6', ro: '6' },
      { en: '7', ro: '7' },
    ],
    correct: 2,
    explanation: {
      en: 'Six pillars: Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, and Sustainability (added in late 2021).',
      ro: 'Șase piloni: Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization și Sustainability (adăugat în 2021).',
    },
    relatedServices: [],
  },
  {
    id: 'q-wa-reliability',
    type: 'multiple_choice',
    difficulty: 2,
    categories: ['well-architected'],
    question: {
      en: 'Deploying an application across multiple Availability Zones with Auto Scaling primarily addresses which Well-Architected pillar?',
      ro: 'Deploy-ul unei aplicații peste mai multe AZ-uri cu Auto Scaling adresează în principal care pilon Well-Architected?',
    },
    options: [
      { en: 'Cost Optimization', ro: 'Cost Optimization' },
      { en: 'Operational Excellence', ro: 'Operational Excellence' },
      { en: 'Reliability', ro: 'Reliability' },
      { en: 'Sustainability', ro: 'Sustainability' },
    ],
    correct: 2,
    explanation: {
      en: 'Multi-AZ + Auto Scaling = Reliability pillar (recover from failure, automatically scale to meet demand). It also touches Performance Efficiency, but the primary goal is fault tolerance / availability.',
      ro: 'Multi-AZ + Auto Scaling = pilonul Reliability (recovery la defect, scalare automată la cerere). Atinge și Performance Efficiency, dar scopul principal e fault tolerance / availability.',
    },
    relatedServices: ['ec2', 'elb'],
  },

  // ========================================================================
  // CLOUD FUNDAMENTALS
  // ========================================================================
  {
    id: 'q-cloud-capex',
    type: 'multiple_choice',
    difficulty: 1,
    categories: ['cloud-fundamentals'],
    question: {
      en: 'Moving to AWS allows organizations to "trade CAPEX for OPEX". What does this mean?',
      ro: 'Mutarea la AWS permite organizațiilor să "schimbe CAPEX cu OPEX". Ce înseamnă asta?',
    },
    options: [
      { en: 'Replace upfront capital expenses with variable operational expenses', ro: 'Înlocuiești cheltuielile capitale upfront cu operaționale variabile' },
      { en: 'Pay more upfront for cheaper monthly bills', ro: 'Plătești mai mult upfront pentru facturi lunare mai mici' },
      { en: 'Eliminate all costs', ro: 'Elimini toate costurile' },
      { en: 'Move all servers on-premises', ro: 'Muți toate serverele on-premises' },
    ],
    correct: 0,
    explanation: {
      en: 'CAPEX (Capital Expenditure) = large upfront investments in hardware. OPEX (Operational Expenditure) = pay-as-you-go cloud costs. Trading CAPEX for OPEX means no big purchases — you pay only for what you use.',
      ro: 'CAPEX (Capital Expenditure) = investiții upfront mari în hardware. OPEX (Operational Expenditure) = costuri pay-as-you-go cloud. Schimbarea CAPEX→OPEX înseamnă fără achiziții mari — plătești doar ce folosești.',
    },
    relatedServices: [],
  },
];

/**
 * Heuristic to map legacy questions (no `examDomain` field) to a domain
 * based on their existing `categories` tags. Keeps backwards-compat without
 * editing the 30 v0.2 questions.
 */
function inferDomain(q: QuizQuestion): ExamDomain {
  if (q.examDomain) return q.examDomain;
  const cats = q.categories;
  if (cats.some((c) => ['security', 'compliance'].includes(c))) return 'security';
  if (cats.some((c) => ['billing', 'pricing', 'support'].includes(c))) return 'billing-support';
  if (cats.some((c) => ['cloud-fundamentals', 'well-architected', 'caf', 'global-infrastructure'].includes(c)))
    return 'cloud-concepts';
  return 'tech-services';
}

/**
 * The full quiz bank: 30 legacy + ~67 domain-tagged questions = ~97 total.
 * Every question gets a guaranteed `examDomain` (inferred for legacy ones).
 */
export const quizQuestions: QuizQuestion[] = [
  ...legacyQuestions,
  ...cloudConceptsQuestions,
  ...securityQuestions,
  ...techServicesQuestions,
  ...billingSupportQuestions,
  ...extraQuestions,
  ...extraQuestions2,
  ...extraQuestions3,
].map((q) => ({ ...q, examDomain: inferDomain(q) }));

/**
 * Official CLF-C02 domain weights (percentages of the 65-question exam).
 * Used to build a properly-weighted Practice Exam.
 */
export const DOMAIN_WEIGHTS: Record<ExamDomain, number> = {
  'cloud-concepts': 0.24,
  security: 0.30,
  'tech-services': 0.34,
  'billing-support': 0.12,
};

export function getQuestionsByCategory(categoryIds: string[]): QuizQuestion[] {
  return quizQuestions.filter((q) => q.categories.some((c) => categoryIds.includes(c)));
}

export function getQuestionsByDomain(domain: ExamDomain): QuizQuestion[] {
  return quizQuestions.filter((q) => q.examDomain === domain);
}

export function getRandomQuestions(count: number): QuizQuestion[] {
  const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Build a domain-weighted random sample (e.g., for the 65-question Practice Exam).
 * Picks ceil(weight * total) per domain, shuffles the union, trims to `total`.
 */
export function buildWeightedExam(total = 65): QuizQuestion[] {
  const out: QuizQuestion[] = [];
  (Object.keys(DOMAIN_WEIGHTS) as ExamDomain[]).forEach((d) => {
    const target = Math.ceil(DOMAIN_WEIGHTS[d] * total);
    const pool = getQuestionsByDomain(d);
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    out.push(...shuffled.slice(0, Math.min(target, shuffled.length)));
  });
  // Final shuffle so domains don't appear in clusters
  return out.sort(() => Math.random() - 0.5).slice(0, total);
}

/**
 * Quiz scope determines which question pool to draw from.
 *   - 'all'        : entire bank
 *   - ExamDomain   : just one of the 4 official domains
 *   - 'category:X' : just questions tagged with category X (e.g., 'storage')
 *   - 'bookmarks'  : only questions in the user-supplied id list (passed via `idFilter`)
 *   - 'mistakes'   : only questions whose IDs are passed via `idFilter`
 */
export type QuizScope =
  | 'all'
  | ExamDomain
  | `category:${string}`
  | 'bookmarks'
  | 'mistakes';

/**
 * Smart sampler: prefers questions NOT in the user's recently-seen ring buffer
 * so consecutive sessions feel fresh. Falls back to seen questions if the
 * fresh pool is too small.
 */
export function buildQuiz(
  count: number,
  scope: QuizScope = 'all',
  recentlySeen: string[] = [],
  /** Required when scope is 'bookmarks' or 'mistakes': list of qualifying question IDs. */
  idFilter?: string[],
): QuizQuestion[] {
  // 1. filter by scope
  let pool: QuizQuestion[];
  if (scope === 'all') {
    pool = quizQuestions;
  } else if (scope === 'bookmarks' || scope === 'mistakes') {
    const allowed = new Set(idFilter ?? []);
    pool = quizQuestions.filter((q) => allowed.has(q.id));
  } else if (scope.startsWith('category:')) {
    const cat = scope.slice('category:'.length);
    pool = quizQuestions.filter((q) => q.categories.includes(cat));
  } else {
    pool = getQuestionsByDomain(scope as ExamDomain);
  }

  if (pool.length === 0) return [];

  // 2. Split into "fresh" (not recently seen) and "stale" (seen)
  const seenSet = new Set(recentlySeen);
  const fresh = pool.filter((q) => !seenSet.has(q.id));
  const stale = pool.filter((q) => seenSet.has(q.id));

  // 3. Shuffle each, then concat (fresh first) and take `count`
  const shuf = (arr: QuizQuestion[]) => [...arr].sort(() => Math.random() - 0.5);
  const ordered = [...shuf(fresh), ...shuf(stale)];
  return ordered.slice(0, Math.min(count, ordered.length));
}

/**
 * For the home Daily Challenge: deterministic-ish random based on date,
 * so all visits today see the same 5 questions. Different each day.
 */
export function getDailyChallengeQuestions(date: string, count = 5): QuizQuestion[] {
  // Cheap hash of the date string → seed
  let seed = 0;
  for (let i = 0; i < date.length; i++) seed = (seed * 31 + date.charCodeAt(i)) >>> 0;
  // Mulberry32 PRNG seeded with the date
  const rand = () => {
    seed = (seed + 0x6d2b79f5) >>> 0;
    let t = seed;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const pool = [...quizQuestions];
  // Fisher-Yates with seeded rand
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
}
