import type { QuizQuestion } from '@/types';

/**
 * Official AWS Certified Cloud Practitioner sample exam questions.
 *
 * Source: AWS's own published "AWS Certified Cloud Practitioner Sample Questions"
 * PDF (the publicly-available official sample set). Question wording and the
 * `explanation` rationales are taken from AWS's official answer key; Romanian
 * translations added. These are AWS-published practice questions — NOT actual
 * exam questions (the real exam is under NDA). Every covered service is still
 * tested on the current CLF-C02 exam.
 *
 * The Romanian explanation also notes why the distractors are wrong, so the
 * quiz teaches on both correct and incorrect answers.
 */
export const officialQuestions: QuizQuestion[] = [
  {
    id: 'aws-official-1',
    type: 'multiple_choice',
    difficulty: 1,
    categories: ['cloud-fundamentals'],
    examDomain: 'cloud-concepts',
    source: 'aws-skill-builder',
    question: {
      en: 'Why is AWS more economical than traditional data centers for applications with varying compute workloads?',
      ro: 'De ce este AWS mai economic decât data centers tradiționale pentru aplicații cu workload-uri de compute variabile?',
    },
    options: [
      { en: 'Amazon EC2 costs are billed on a monthly basis.', ro: 'Costurile Amazon EC2 sunt facturate lunar.' },
      { en: 'Users retain full administrative access to their Amazon EC2 instances.', ro: 'Utilizatorii păstrează acces administrativ complet la instanțele lor EC2.' },
      { en: 'Amazon EC2 instances can be launched on demand when needed.', ro: 'Instanțele Amazon EC2 pot fi lansate la cerere când e nevoie.' },
      { en: 'Users can permanently run enough instances to handle peak workloads.', ro: 'Utilizatorii pot rula permanent destule instanțe pentru vârfurile de workload.' },
    ],
    correct: 2,
    explanation: {
      en: 'Official AWS answer: launching instances on demand lets you launch and terminate in response to a varying workload — more economical than buying enough on-prem servers for the peak. Monthly billing (A) is wrong (EC2 bills per second/hour); admin access (B) is unrelated to cost; permanently running for peak (D) is exactly the wasteful approach the cloud avoids.',
      ro: 'Răspuns oficial AWS: lansarea la cerere îți permite să pornești și să oprești în funcție de workload — mai economic decât să cumperi destule servere on-prem pentru vârf. Facturarea lunară (A) e greșită (EC2 facturează pe secundă/oră); accesul admin (B) n-are legătură cu costul; rularea permanentă pentru vârf (D) e exact risipa pe care cloud-ul o evită.',
    },
    optionExplanations: [
      { en: 'Incorrect — EC2 is billed per second/hour, not on a monthly basis.', ro: 'Greșit — EC2 e facturat pe secundă/oră, nu lunar.' },
      { en: 'Incorrect — administrative access to instances is unrelated to cost.', ro: 'Greșit — accesul administrativ la instanțe n-are legătură cu costul.' },
      { en: 'Correct — launching on demand lets you match a varying workload economically instead of over-provisioning.', ro: 'Corect — lansarea la cerere îți permite să te potrivești economic cu un workload variabil, fără supra-provizionare.' },
      { en: 'Incorrect — permanently running enough instances for peak is exactly the wasteful approach the cloud avoids.', ro: 'Greșit — rularea permanentă a destulor instanțe pentru vârf e exact risipa pe care cloud-ul o evită.' },
    ],
    references: [
      { label: 'What is cloud computing?', url: 'https://aws.amazon.com/what-is-cloud-computing/' },
      { label: 'Amazon EC2 – Pricing', url: 'https://aws.amazon.com/ec2/pricing/' },
    ],
    relatedServices: ['ec2'],
  },
  {
    id: 'aws-official-2',
    type: 'multiple_choice',
    difficulty: 1,
    categories: ['migration'],
    examDomain: 'tech-services',
    source: 'aws-skill-builder',
    question: {
      en: 'Which AWS service would simplify the migration of a database to AWS?',
      ro: 'Care serviciu AWS ar simplifica migrarea unei baze de date în AWS?',
    },
    options: [
      { en: 'AWS Storage Gateway', ro: 'AWS Storage Gateway' },
      { en: 'AWS Database Migration Service (AWS DMS)', ro: 'AWS Database Migration Service (AWS DMS)' },
      { en: 'Amazon EC2', ro: 'Amazon EC2' },
      { en: 'Amazon AppStream 2.0', ro: 'Amazon AppStream 2.0' },
    ],
    correct: 1,
    explanation: {
      en: 'Official AWS answer: AWS DMS migrates databases quickly and securely; the source DB stays operational during migration, minimizing downtime. Storage Gateway (A) is hybrid file/volume storage, EC2 (C) is compute, AppStream (D) streams desktop apps — none migrate databases.',
      ro: 'Răspuns oficial AWS: AWS DMS migrează bazele de date rapid și sigur; baza sursă rămâne operațională în timpul migrării, minimizând downtime-ul. Storage Gateway (A) e stocare hibridă, EC2 (C) e compute, AppStream (D) face streaming de aplicații desktop — niciunul nu migrează baze de date.',
    },
    optionExplanations: [
      { en: 'Incorrect — Storage Gateway provides hybrid file/volume storage, not database migration.', ro: 'Greșit — Storage Gateway oferă stocare hibridă de fișiere/volume, nu migrare de baze de date.' },
      { en: 'Correct — AWS DMS migrates databases quickly and securely while the source stays operational, minimizing downtime.', ro: 'Corect — AWS DMS migrează bazele de date rapid și sigur, sursa rămânând operațională, minimizând downtime-ul.' },
      { en: 'Incorrect — Amazon EC2 is compute capacity, not a database migration service.', ro: 'Greșit — Amazon EC2 e capacitate de compute, nu un serviciu de migrare a bazelor de date.' },
      { en: 'Incorrect — AppStream 2.0 streams desktop applications, it does not migrate databases.', ro: 'Greșit — AppStream 2.0 face streaming de aplicații desktop, nu migrează baze de date.' },
    ],
    references: [
      { label: 'AWS DMS – Overview', url: 'https://aws.amazon.com/dms/' },
      { label: 'AWS DMS – What is AWS DMS?', url: 'https://docs.aws.amazon.com/dms/latest/userguide/Welcome.html' },
    ],
    relatedServices: ['dms'],
  },
  {
    id: 'aws-official-3',
    type: 'multiple_choice',
    difficulty: 1,
    categories: ['cloud-fundamentals'],
    examDomain: 'tech-services',
    source: 'aws-skill-builder',
    question: {
      en: 'Which AWS offering enables users to find, buy, and immediately start using software solutions in their AWS environment?',
      ro: 'Care ofertă AWS le permite utilizatorilor să găsească, cumpere și folosească imediat soluții software în mediul lor AWS?',
    },
    options: [
      { en: 'AWS Config', ro: 'AWS Config' },
      { en: 'AWS OpsWorks', ro: 'AWS OpsWorks' },
      { en: 'AWS SDK', ro: 'AWS SDK' },
      { en: 'AWS Marketplace', ro: 'AWS Marketplace' },
    ],
    correct: 3,
    explanation: {
      en: 'Official AWS answer: AWS Marketplace is a digital catalog with thousands of software listings from independent vendors that makes it easy to find, test, buy, and deploy software on AWS. Config (A) tracks resource configuration/compliance, OpsWorks (B) is managed Chef/Puppet, the SDK (C) is for programmatic API access.',
      ro: 'Răspuns oficial AWS: AWS Marketplace e un catalog digital cu mii de soluții software de la vendori independenți, ușor de găsit, testat, cumpărat și deployat pe AWS. Config (A) urmărește configurația/compliance-ul resurselor, OpsWorks (B) e Chef/Puppet managed, SDK-ul (C) e pentru acces programatic la API.',
    },
    optionExplanations: [
      { en: 'Incorrect — AWS Config tracks resource configuration and compliance, not software purchasing.', ro: 'Greșit — AWS Config urmărește configurația și compliance-ul resurselor, nu cumpărarea de software.' },
      { en: 'Incorrect — AWS OpsWorks is managed Chef/Puppet configuration management, not a software catalog.', ro: 'Greșit — AWS OpsWorks e configuration management Chef/Puppet managed, nu un catalog de software.' },
      { en: 'Incorrect — the AWS SDK is for programmatic API access, not buying software.', ro: 'Greșit — AWS SDK e pentru acces programatic la API, nu pentru cumpărarea de software.' },
      { en: 'Correct — AWS Marketplace is a digital catalog to find, test, buy, and deploy software on AWS.', ro: 'Corect — AWS Marketplace e un catalog digital pentru a găsi, testa, cumpăra și deploya software pe AWS.' },
    ],
    references: [
      { label: 'AWS Marketplace', url: 'https://aws.amazon.com/marketplace/' },
    ],
    relatedServices: [],
  },
  {
    id: 'aws-official-4',
    type: 'multiple_choice',
    difficulty: 1,
    categories: ['networking'],
    examDomain: 'tech-services',
    source: 'aws-skill-builder',
    question: {
      en: 'Which AWS service lets you provision a logically isolated section of the AWS Cloud where you can launch resources in a virtual network you define?',
      ro: 'Care serviciu AWS îți permite să provizionezi o secțiune izolată logic din cloud-ul AWS unde lansezi resurse într-o rețea virtuală pe care o definești?',
    },
    options: [
      { en: 'Amazon CloudFront', ro: 'Amazon CloudFront' },
      { en: 'Amazon Route 53', ro: 'Amazon Route 53' },
      { en: 'AWS Direct Connect', ro: 'AWS Direct Connect' },
      { en: 'Amazon Virtual Private Cloud (Amazon VPC)', ro: 'Amazon Virtual Private Cloud (Amazon VPC)' },
    ],
    correct: 3,
    explanation: {
      en: 'Official AWS answer: Amazon VPC lets users provision a logically isolated section of the AWS Cloud where they can launch resources in a virtual network they define. CloudFront (A) is a CDN, Route 53 (B) is DNS, Direct Connect (C) is a dedicated on-prem-to-AWS network link — none of them are the isolated virtual network itself.',
      ro: 'Răspuns oficial AWS: Amazon VPC îți permite să provizionezi o secțiune izolată logic din cloud-ul AWS unde lansezi resurse într-o rețea virtuală definită de tine. CloudFront (A) e CDN, Route 53 (B) e DNS, Direct Connect (C) e o legătură de rețea dedicată on-prem-AWS — niciunul nu e rețeaua virtuală izolată propriu-zisă.',
    },
    optionExplanations: [
      { en: 'Incorrect — Amazon CloudFront is a content delivery network (CDN), not an isolated virtual network.', ro: 'Greșit — Amazon CloudFront e o rețea de livrare de conținut (CDN), nu o rețea virtuală izolată.' },
      { en: 'Incorrect — Amazon Route 53 is a DNS service, not a virtual network you provision.', ro: 'Greșit — Amazon Route 53 e un serviciu DNS, nu o rețea virtuală pe care o provizionezi.' },
      { en: 'Incorrect — AWS Direct Connect is a dedicated on-prem-to-AWS network link, not the isolated network itself.', ro: 'Greșit — AWS Direct Connect e o legătură de rețea dedicată on-prem-AWS, nu rețeaua izolată propriu-zisă.' },
      { en: 'Correct — Amazon VPC provisions a logically isolated section of the AWS Cloud with a virtual network you define.', ro: 'Corect — Amazon VPC provizionează o secțiune izolată logic din cloud-ul AWS cu o rețea virtuală definită de tine.' },
    ],
    references: [
      { label: 'What is Amazon VPC?', url: 'https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html' },
    ],
    relatedServices: ['vpc'],
  },
  {
    id: 'aws-official-5',
    type: 'multiple_choice',
    difficulty: 2,
    categories: ['shared-responsibility'],
    examDomain: 'security',
    source: 'aws-skill-builder',
    question: {
      en: 'Under the AWS shared responsibility model, which of the following is a responsibility of AWS?',
      ro: 'În modelul de responsabilitate partajată AWS, care din următoarele e responsabilitatea AWS?',
    },
    options: [
      { en: 'Configuring security groups', ro: 'Configurarea security groups' },
      { en: 'Maintaining physical hardware', ro: 'Întreținerea hardware-ului fizic' },
      { en: 'Securing application access and data', ro: 'Securizarea accesului la aplicație și a datelor' },
      { en: 'Managing IAM users and permissions', ro: 'Gestionarea userilor și permisiunilor IAM' },
    ],
    correct: 1,
    explanation: {
      en: 'Official AWS answer: maintaining physical hardware is an AWS responsibility (security OF the cloud). The other three — security groups (A), application/data security (C), and IAM (D) — are the customer\'s responsibility (security IN the cloud). Rule of thumb: AWS handles the physical and the hypervisor; you handle your data, identities, and configuration.',
      ro: 'Răspuns oficial AWS: întreținerea hardware-ului fizic e responsabilitatea AWS (securitatea A cloud-ului). Celelalte trei — security groups (A), securitatea aplicației/datelor (C) și IAM (D) — sunt responsabilitatea clientului (securitatea ÎN cloud). Regulă: AWS se ocupă de fizic și hypervisor; tu de datele, identitățile și configurația ta.',
    },
    optionExplanations: [
      { en: 'Incorrect — configuring security groups is a customer responsibility (security IN the cloud).', ro: 'Greșit — configurarea security groups e responsabilitatea clientului (securitatea ÎN cloud).' },
      { en: 'Correct — maintaining physical hardware is AWS\'s responsibility (security OF the cloud).', ro: 'Corect — întreținerea hardware-ului fizic e responsabilitatea AWS (securitatea A cloud-ului).' },
      { en: 'Incorrect — securing application access and data is a customer responsibility (security IN the cloud).', ro: 'Greșit — securizarea accesului la aplicație și a datelor e responsabilitatea clientului (securitatea ÎN cloud).' },
      { en: 'Incorrect — managing IAM users and permissions is a customer responsibility (security IN the cloud).', ro: 'Greșit — gestionarea userilor și permisiunilor IAM e responsabilitatea clientului (securitatea ÎN cloud).' },
    ],
    references: [
      { label: 'Shared Responsibility Model', url: 'https://aws.amazon.com/compliance/shared-responsibility-model/' },
    ],
    relatedServices: ['iam'],
  },
  {
    id: 'aws-official-6',
    type: 'multiple_choice',
    difficulty: 1,
    categories: ['global-infrastructure'],
    examDomain: 'tech-services',
    source: 'aws-skill-builder',
    question: {
      en: 'Which component of the AWS global infrastructure does Amazon CloudFront use to ensure low-latency delivery?',
      ro: 'Care componentă a infrastructurii globale AWS folosește Amazon CloudFront pentru livrare cu latență mică?',
    },
    options: [
      { en: 'AWS Regions', ro: 'Regiuni AWS' },
      { en: 'Edge locations', ro: 'Edge locations' },
      { en: 'Availability Zones', ro: 'Availability Zones' },
      { en: 'Virtual Private Clouds', ro: 'Virtual Private Clouds' },
    ],
    correct: 1,
    explanation: {
      en: 'Official AWS answer: to deliver content with lower latency, CloudFront uses a global network of points of presence — edge locations and regional edge caches — worldwide. Regions (A) and AZs (C) host your main resources but are fewer and farther from users; a VPC (D) is your private network, not a delivery layer.',
      ro: 'Răspuns oficial AWS: pentru livrare cu latență mai mică, CloudFront folosește o rețea globală de puncte de prezență — edge locations și regional edge caches — în toată lumea. Regiunile (A) și AZ-urile (C) găzduiesc resursele principale dar sunt mai puține și mai departe de utilizatori; un VPC (D) e rețeaua ta privată, nu un strat de livrare.',
    },
    optionExplanations: [
      { en: 'Incorrect — Regions host your main resources but are fewer and farther from users, not the low-latency delivery layer.', ro: 'Greșit — Regiunile găzduiesc resursele principale dar sunt mai puține și mai departe de utilizatori, nu stratul de livrare cu latență mică.' },
      { en: 'Correct — CloudFront uses edge locations (and regional edge caches) worldwide to deliver content with lower latency.', ro: 'Corect — CloudFront folosește edge locations (și regional edge caches) în toată lumea pentru livrare cu latență mai mică.' },
      { en: 'Incorrect — Availability Zones host main resources but are fewer and farther from users than edge locations.', ro: 'Greșit — Availability Zones găzduiesc resursele principale dar sunt mai puține și mai departe de utilizatori decât edge locations.' },
      { en: 'Incorrect — a Virtual Private Cloud is your private network, not a content delivery layer.', ro: 'Greșit — un Virtual Private Cloud e rețeaua ta privată, nu un strat de livrare de conținut.' },
    ],
    references: [
      { label: 'Amazon CloudFront – Introduction', url: 'https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html' },
      { label: 'AWS Global Infrastructure', url: 'https://aws.amazon.com/about-aws/global-infrastructure/' },
    ],
    relatedServices: ['cloudfront'],
  },
  {
    id: 'aws-official-7',
    type: 'multiple_choice',
    difficulty: 1,
    categories: ['identity'],
    examDomain: 'security',
    source: 'aws-skill-builder',
    question: {
      en: 'How would a system administrator add an additional layer of login security to a user\'s AWS Management Console?',
      ro: 'Cum ar adăuga un administrator un strat suplimentar de securitate la login-ul în AWS Management Console al unui utilizator?',
    },
    options: [
      { en: 'Use Amazon Cloud Directory', ro: 'Folosește Amazon Cloud Directory' },
      { en: 'Audit AWS IAM roles', ro: 'Auditează rolurile AWS IAM' },
      { en: 'Enable multi-factor authentication (MFA)', ro: 'Activează multi-factor authentication (MFA)' },
      { en: 'Enable AWS CloudTrail', ro: 'Activează AWS CloudTrail' },
    ],
    correct: 2,
    explanation: {
      en: 'Official AWS answer: MFA adds an extra layer on top of username/password — at sign-in the user provides their password (what they know) plus a code from an MFA device (what they have). Cloud Directory (A) is a directory store, auditing roles (B) reviews existing access, CloudTrail (D) logs API activity — none add a login factor.',
      ro: 'Răspuns oficial AWS: MFA adaugă un strat peste user/parolă — la login utilizatorul dă parola (ce știe) plus un cod de la un dispozitiv MFA (ce are). Cloud Directory (A) e un director, auditul rolurilor (B) revizuiește accesul existent, CloudTrail (D) loghează activitatea API — niciunul nu adaugă un factor de login.',
    },
    optionExplanations: [
      { en: 'Incorrect — Amazon Cloud Directory is a directory store, it does not add a login factor.', ro: 'Greșit — Amazon Cloud Directory e un director, nu adaugă un factor de login.' },
      { en: 'Incorrect — auditing IAM roles reviews existing access, it does not add a login layer.', ro: 'Greșit — auditul rolurilor IAM revizuiește accesul existent, nu adaugă un strat la login.' },
      { en: 'Correct — MFA adds an extra layer on top of username/password by requiring a code from an MFA device.', ro: 'Corect — MFA adaugă un strat peste user/parolă, cerând un cod de la un dispozitiv MFA.' },
      { en: 'Incorrect — CloudTrail logs API activity, it does not add a login factor.', ro: 'Greșit — CloudTrail loghează activitatea API, nu adaugă un factor de login.' },
    ],
    references: [
      { label: 'IAM – Using MFA in AWS', url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa.html' },
    ],
    relatedServices: ['iam'],
  },
  {
    id: 'aws-official-8',
    type: 'multiple_choice',
    difficulty: 2,
    categories: ['monitoring'],
    examDomain: 'tech-services',
    source: 'aws-skill-builder',
    question: {
      en: 'Which service can identify the user that made the API call when an Amazon EC2 instance is terminated?',
      ro: 'Care serviciu poate identifica utilizatorul care a făcut apelul API când o instanță Amazon EC2 e terminată?',
    },
    options: [
      { en: 'AWS Trusted Advisor', ro: 'AWS Trusted Advisor' },
      { en: 'AWS CloudTrail', ro: 'AWS CloudTrail' },
      { en: 'AWS X-Ray', ro: 'AWS X-Ray' },
      { en: 'AWS Identity and Access Management (IAM)', ro: 'AWS Identity and Access Management (IAM)' },
    ],
    correct: 1,
    explanation: {
      en: 'Official AWS answer: CloudTrail records actions taken by a user, role, or service as events — including console, CLI, SDK, and API actions — so you can see who terminated the instance. Trusted Advisor (A) gives best-practice checks, X-Ray (C) traces application requests, IAM (D) grants access but does not log who used it.',
      ro: 'Răspuns oficial AWS: CloudTrail înregistrează acțiunile făcute de un user, rol sau serviciu ca evenimente — inclusiv console, CLI, SDK și API — deci vezi cine a terminat instanța. Trusted Advisor (A) dă verificări de bune practici, X-Ray (C) urmărește cererile aplicației, IAM (D) acordă acces dar nu loghează cine l-a folosit.',
    },
    optionExplanations: [
      { en: 'Incorrect — Trusted Advisor gives best-practice checks, it does not record who made an API call.', ro: 'Greșit — Trusted Advisor dă verificări de bune practici, nu înregistrează cine a făcut un apel API.' },
      { en: 'Correct — CloudTrail records actions by a user, role, or service as events, so you can see who terminated the instance.', ro: 'Corect — CloudTrail înregistrează acțiunile unui user, rol sau serviciu ca evenimente, deci vezi cine a terminat instanța.' },
      { en: 'Incorrect — AWS X-Ray traces application requests, it does not identify the API caller.', ro: 'Greșit — AWS X-Ray urmărește cererile aplicației, nu identifică cine a făcut apelul API.' },
      { en: 'Incorrect — IAM grants access but does not log who used it.', ro: 'Greșit — IAM acordă acces dar nu loghează cine l-a folosit.' },
    ],
    references: [
      { label: 'AWS CloudTrail – User Guide', url: 'https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html' },
    ],
    relatedServices: ['cloudtrail'],
  },
  {
    id: 'aws-official-9',
    type: 'multiple_choice',
    difficulty: 2,
    categories: ['monitoring'],
    examDomain: 'tech-services',
    source: 'aws-skill-builder',
    question: {
      en: 'Which service would be used to send alerts based on Amazon CloudWatch alarms?',
      ro: 'Care serviciu ar fi folosit pentru a trimite alerte pe baza alarmelor Amazon CloudWatch?',
    },
    options: [
      { en: 'Amazon Simple Notification Service (Amazon SNS)', ro: 'Amazon Simple Notification Service (Amazon SNS)' },
      { en: 'AWS CloudTrail', ro: 'AWS CloudTrail' },
      { en: 'AWS Trusted Advisor', ro: 'AWS Trusted Advisor' },
      { en: 'Amazon Route 53', ro: 'Amazon Route 53' },
    ],
    correct: 0,
    explanation: {
      en: 'Official AWS answer: Amazon SNS integrates with CloudWatch so an alarm can publish to an SNS topic, which then notifies subscribers (email, SMS, etc.). CloudTrail (B) audits API calls, Trusted Advisor (C) checks best practices, Route 53 (D) is DNS — none of them deliver the alarm notification.',
      ro: 'Răspuns oficial AWS: Amazon SNS se integrează cu CloudWatch, deci o alarmă poate publica într-un topic SNS, care apoi notifică subscriberii (email, SMS etc.). CloudTrail (B) auditează apelurile API, Trusted Advisor (C) verifică bunele practici, Route 53 (D) e DNS — niciunul nu livrează notificarea alarmei.',
    },
    optionExplanations: [
      { en: 'Correct — a CloudWatch alarm publishes to an SNS topic, which notifies subscribers via email, SMS, etc.', ro: 'Corect — o alarmă CloudWatch publică într-un topic SNS, care notifică subscriberii prin email, SMS etc.' },
      { en: 'Incorrect — CloudTrail audits API calls, it does not deliver alarm notifications.', ro: 'Greșit — CloudTrail auditează apelurile API, nu livrează notificările alarmelor.' },
      { en: 'Incorrect — Trusted Advisor checks best practices, it does not send alerts.', ro: 'Greșit — Trusted Advisor verifică bunele practici, nu trimite alerte.' },
      { en: 'Incorrect — Amazon Route 53 is DNS, it does not deliver alarm notifications.', ro: 'Greșit — Amazon Route 53 e DNS, nu livrează notificările alarmelor.' },
    ],
    references: [
      { label: 'Amazon SNS', url: 'https://aws.amazon.com/sns/' },
      { label: 'CloudWatch alarms and notifications', url: 'https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html' },
    ],
    relatedServices: ['sns', 'cloudwatch'],
  },
  {
    id: 'aws-official-10',
    type: 'multiple_choice',
    difficulty: 2,
    categories: ['compliance'],
    examDomain: 'billing-support',
    source: 'aws-skill-builder',
    question: {
      en: 'Where can a user find information about prohibited actions on the AWS infrastructure?',
      ro: 'Unde poate găsi un utilizator informații despre acțiunile interzise pe infrastructura AWS?',
    },
    options: [
      { en: 'AWS Trusted Advisor', ro: 'AWS Trusted Advisor' },
      { en: 'AWS Identity and Access Management (IAM)', ro: 'AWS Identity and Access Management (IAM)' },
      { en: 'AWS Billing Console', ro: 'AWS Billing Console' },
      { en: 'AWS Acceptable Use Policy', ro: 'AWS Acceptable Use Policy' },
    ],
    correct: 3,
    explanation: {
      en: 'Official AWS answer: the AWS Acceptable Use Policy describes prohibited uses of the AWS services and website. Trusted Advisor (A) gives optimization checks, IAM (B) controls access, the Billing Console (C) shows costs — none of them state what is prohibited.',
      ro: 'Răspuns oficial AWS: AWS Acceptable Use Policy descrie utilizările interzise ale serviciilor și site-ului AWS. Trusted Advisor (A) dă verificări de optimizare, IAM (B) controlează accesul, Billing Console (C) arată costurile — niciunul nu spune ce e interzis.',
    },
    optionExplanations: [
      { en: 'Incorrect — Trusted Advisor gives optimization checks, it does not list prohibited actions.', ro: 'Greșit — Trusted Advisor dă verificări de optimizare, nu listează acțiunile interzise.' },
      { en: 'Incorrect — IAM controls access, it does not describe what is prohibited on AWS.', ro: 'Greșit — IAM controlează accesul, nu descrie ce e interzis pe AWS.' },
      { en: 'Incorrect — the Billing Console shows costs, it does not state prohibited actions.', ro: 'Greșit — Billing Console arată costurile, nu spune ce acțiuni sunt interzise.' },
      { en: 'Correct — the AWS Acceptable Use Policy describes prohibited uses of AWS services and website.', ro: 'Corect — AWS Acceptable Use Policy descrie utilizările interzise ale serviciilor și site-ului AWS.' },
    ],
    references: [
      { label: 'AWS Acceptable Use Policy', url: 'https://aws.amazon.com/aup/' },
    ],
    relatedServices: [],
  },
];
