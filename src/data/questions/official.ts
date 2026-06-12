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
    relatedServices: [],
  },
];
