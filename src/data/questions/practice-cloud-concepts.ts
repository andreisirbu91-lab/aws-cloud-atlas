import type { QuizQuestion } from '@/types';

/**
 * Original CLF-C02 practice questions — Domain 1: Cloud Concepts (24% of exam).
 * Exam-style questions written from AWS documentation + Stephane Maarek course.
 * Not actual exam questions (the real exam is under NDA). Each explanation says
 * why the correct answer is right and why the distractors are wrong.
 */
export const practiceCloudConceptsQuestions: QuizQuestion[] = [
  {
    id: 'pcc-1',
    type: 'multiple_choice',
    difficulty: 1,
    categories: ['cloud-fundamentals'],
    examDomain: 'cloud-concepts',
    source: 'maarek',
    question: {
      en: 'A company shuts down its data center and moves to AWS, paying only for the compute hours it actually uses each month. Which benefit of cloud computing does this BEST illustrate?',
      ro: 'O companie își închide centrul de date și migrează pe AWS, plătind doar pentru orele de compute folosite efectiv în fiecare lună. Ce beneficiu al cloud-ului ilustrează asta cel mai bine?',
    },
    options: [
      { en: 'Benefit from massive economies of scale', ro: 'Beneficiezi de economii de scară masive' },
      { en: 'Trade capital expense (CapEx) for variable expense (OpEx)', ro: 'Schimbi cheltuiala de capital (CapEx) cu cheltuiala variabilă (OpEx)' },
      { en: 'Go global in minutes', ro: 'Globalizare în minute' },
      { en: 'Stop guessing capacity', ro: 'Nu mai ghicești capacitatea' },
    ],
    correct: 1,
    explanation: {
      en: 'Paying per hour used instead of buying servers up front is the classic "trade CapEx for OpEx" benefit — a variable bill that tracks usage. A (economies of scale) is about AWS\'s lower prices from aggregate buying power, not the pay-per-use model itself. C (go global) is about deploying to Regions worldwide. D (stop guessing capacity) is about Auto Scaling matching demand, not about how you are billed.',
      ro: 'Plata pe oră în loc de cumpărarea serverelor în avans e clasicul beneficiu „schimbi CapEx cu OpEx" — o factură variabilă care urmărește consumul. A (economii de scară) se referă la prețurile mai mici ale AWS din puterea de cumpărare agregată, nu la modelul pay-per-use. C (globalizare) e despre deployment în Regiuni din toată lumea. D (nu mai ghicești capacitatea) e despre Auto Scaling care urmează cererea, nu despre cum ești facturat.',
    },
    relatedServices: ['ec2'],
  },
  {
    id: 'pcc-2',
    type: 'multiple_choice',
    difficulty: 1,
    categories: ['cloud-fundamentals'],
    examDomain: 'cloud-concepts',
    source: 'aws-docs',
    question: {
      en: 'A retailer runs its core ERP system on servers in its own building but uses AWS for its public website and seasonal burst capacity. Which deployment model is this?',
      ro: 'Un retailer își rulează sistemul ERP de bază pe servere în propria clădire, dar folosește AWS pentru site-ul public și capacitatea de vârf sezonieră. Ce model de deployment este acesta?',
    },
    options: [
      { en: 'Cloud (all-in)', ro: 'Cloud (complet în cloud)' },
      { en: 'On-premises (private)', ro: 'On-premises (privat)' },
      { en: 'Hybrid', ro: 'Hibrid' },
      { en: 'Edge', ro: 'Edge' },
    ],
    correct: 2,
    explanation: {
      en: 'Mixing on-premises infrastructure (the ERP servers) with public cloud (the AWS website + burst capacity) is the definition of a hybrid deployment, often connected via Direct Connect or VPN. A (Cloud / all-in) would mean everything runs on AWS with nothing on-premises. B (on-premises) would mean everything stays in the building — but the website is on AWS. D (Edge) is not a deployment model; edge locations are part of AWS global infrastructure.',
      ro: 'Combinarea infrastructurii on-premises (serverele ERP) cu cloud-ul public (site-ul AWS + capacitatea de vârf) este chiar definiția deployment-ului hibrid, conectat de obicei prin Direct Connect sau VPN. A (Cloud / complet) ar însemna că totul rulează pe AWS, fără nimic on-premises. B (on-premises) ar însemna că totul rămâne în clădire — dar site-ul e pe AWS. D (Edge) nu e un model de deployment; edge locations fac parte din infrastructura globală AWS.',
    },
    relatedServices: ['directconnect', 'outposts'],
    relatedConcepts: ['cloud-types'],
  },
  {
    id: 'pcc-3',
    type: 'multiple_choice',
    difficulty: 2,
    categories: ['cloud-fundamentals'],
    examDomain: 'cloud-concepts',
    source: 'maarek',
    question: {
      en: 'A team wants to deploy applications without managing operating systems, patching, or capacity planning, but still wants to write and control their own code. Which cloud service model fits BEST?',
      ro: 'O echipă vrea să deployeze aplicații fără să gestioneze sisteme de operare, patching sau planificarea capacității, dar vrea totuși să scrie și să controleze propriul cod. Care model de serviciu cloud se potrivește cel mai bine?',
    },
    options: [
      { en: 'Infrastructure as a Service (IaaS)', ro: 'Infrastructure as a Service (IaaS)' },
      { en: 'Platform as a Service (PaaS)', ro: 'Platform as a Service (PaaS)' },
      { en: 'Software as a Service (SaaS)', ro: 'Software as a Service (SaaS)' },
      { en: 'On-premises', ro: 'On-premises' },
    ],
    correct: 1,
    explanation: {
      en: 'PaaS (e.g., AWS Elastic Beanstalk) lets you deploy your own code while AWS manages the OS, patching, and scaling — exactly the described split. A (IaaS, e.g., EC2) would still leave the team responsible for the OS and patching. C (SaaS, e.g., Amazon WorkMail) delivers finished software, so the team would not be writing their own code. D (on-premises) means the team manages everything, the opposite of what they want.',
      ro: 'PaaS (ex: AWS Elastic Beanstalk) îți permite să deployezi propriul cod în timp ce AWS gestionează OS-ul, patching-ul și scalarea — exact împărțirea descrisă. A (IaaS, ex: EC2) ar lăsa echipa responsabilă de OS și patching. C (SaaS, ex: Amazon WorkMail) livrează software gata făcut, deci echipa nu și-ar mai scrie propriul cod. D (on-premises) înseamnă că echipa gestionează totul, opusul a ceea ce vor.',
    },
    relatedServices: ['beanstalk', 'ec2'],
  },
  {
    id: 'pcc-4',
    type: 'multiple_choice',
    difficulty: 2,
    categories: ['cloud-fundamentals'],
    examDomain: 'cloud-concepts',
    source: 'aws-docs',
    question: {
      en: 'An engineer says: "Our system can automatically add servers during a traffic spike and remove them afterward, so we only pay for what demand requires." Which property is being described?',
      ro: 'Un inginer spune: „Sistemul nostru poate adăuga automat servere în timpul unui vârf de trafic și le poate elimina după aceea, așa că plătim doar cât cere cererea." Ce proprietate este descrisă?',
    },
    options: [
      { en: 'High availability', ro: 'Disponibilitate înaltă (high availability)' },
      { en: 'Elasticity', ro: 'Elasticitate' },
      { en: 'Durability', ro: 'Durabilitate' },
      { en: 'Fault tolerance', ro: 'Toleranță la defecte' },
    ],
    correct: 1,
    explanation: {
      en: 'Adding AND removing capacity automatically to match real-time demand is elasticity. Note the difference from scalability, which is only the ability to grow capacity. A (high availability) means staying up despite failures (e.g., Multi-AZ), not scaling with demand. C (durability) is about not losing data (e.g., S3\'s 11 nines). D (fault tolerance) means continuing to operate when a component fails — related to availability, not to cost-following scaling.',
      ro: 'Adăugarea ȘI eliminarea automată a capacității după cererea în timp real este elasticitate. Atenție la diferența față de scalabilitate, care e doar capacitatea de a crește. A (high availability) înseamnă a rămâne funcțional în ciuda defectelor (ex: Multi-AZ), nu scalare după cerere. C (durabilitate) e despre a nu pierde date (ex: cele 11 nouă ale S3). D (toleranță la defecte) înseamnă continuarea operării când un component cade — legată de disponibilitate, nu de scalarea care urmează costul.',
    },
    relatedServices: ['ec2', 'lambda'],
  },
  {
    id: 'pcc-5',
    type: 'multiple_choice',
    difficulty: 3,
    categories: ['well-architected'],
    examDomain: 'cloud-concepts',
    source: 'aws-docs',
    question: {
      en: 'A company introduces Reserved Instances, rightsizes oversized EC2 instances, and deletes unattached EBS volumes to reduce its monthly bill while meeting performance needs. Which Well-Architected Framework pillar do these actions PRIMARILY support?',
      ro: 'O companie introduce Reserved Instances, redimensionează instanțe EC2 supradimensionate și șterge volume EBS neatașate pentru a reduce factura lunară, păstrând în același timp performanța necesară. Ce pilon Well-Architected sprijină în PRINCIPAL aceste acțiuni?',
    },
    options: [
      { en: 'Reliability', ro: 'Reliability' },
      { en: 'Performance Efficiency', ro: 'Performance Efficiency' },
      { en: 'Cost Optimization', ro: 'Cost Optimization' },
      { en: 'Operational Excellence', ro: 'Operational Excellence' },
    ],
    correct: 2,
    explanation: {
      en: 'Buying Reserved Instances, rightsizing, and removing unused resources are textbook Cost Optimization practices — spending only on what delivers value. A (Reliability) is about recovering from failures and meeting availability targets. B (Performance Efficiency) is about using the right resource types to meet performance as demand changes; rightsizing touches it, but the stated goal here is reducing the bill. D (Operational Excellence) is about running and improving operations (e.g., IaC, monitoring), not cost.',
      ro: 'Cumpărarea de Reserved Instances, redimensionarea și eliminarea resurselor nefolosite sunt practici de manual pentru Cost Optimization — cheltuiești doar pe ce aduce valoare. A (Reliability) e despre recuperarea din defecte și atingerea țintelor de disponibilitate. B (Performance Efficiency) e despre folosirea tipurilor potrivite de resurse pentru a menține performanța când se schimbă cererea; redimensionarea o atinge, dar scopul declarat aici e reducerea facturii. D (Operational Excellence) e despre rularea și îmbunătățirea operațiunilor (ex: IaC, monitorizare), nu despre cost.',
    },
    relatedServices: ['ec2', 'ebs'],
    relatedConcepts: ['well-architected'],
  },
  {
    id: 'pcc-6',
    type: 'multiple_choice',
    difficulty: 2,
    categories: ['global-infrastructure'],
    examDomain: 'cloud-concepts',
    source: 'aws-docs',
    question: {
      en: 'A bank in Germany must keep all customer data within the country to satisfy local regulations and wants the lowest latency for its German users. What should it consider FIRST when choosing where to deploy?',
      ro: 'O bancă din Germania trebuie să păstreze toate datele clienților în țară pentru a respecta reglementările locale și vrea cea mai mică latență pentru utilizatorii germani. Ce ar trebui să ia în considerare PRIMA dată când alege unde să deployeze?',
    },
    options: [
      { en: 'The number of Edge Locations near its office', ro: 'Numărul de Edge Locations din apropierea biroului' },
      { en: 'Choosing an AWS Region that meets compliance (data residency) and is geographically close', ro: 'Alegerea unei Regiuni AWS care respectă conformitatea (rezidența datelor) și e apropiată geografic' },
      { en: 'Selecting a single Availability Zone to save money', ro: 'Selectarea unui singur Availability Zone pentru a economisi bani' },
      { en: 'Using as many Regions as possible at once', ro: 'Folosirea cât mai multor Regiuni simultan' },
    ],
    correct: 1,
    explanation: {
      en: 'When choosing a Region you weigh compliance/data residency, latency (proximity to users), price, and service availability. Here data must stay in Germany (compliance) and latency matters, so picking a compliant, nearby Region (e.g., Frankfurt) addresses both. A (Edge Locations) are for caching content via CloudFront, not for where primary data legally resides. C (a single AZ) hurts availability and does not address residency. D (many Regions) would spread data across countries, violating the data-residency requirement.',
      ro: 'Când alegi o Regiune cântărești conformitatea/rezidența datelor, latența (apropierea de utilizatori), prețul și disponibilitatea serviciilor. Aici datele trebuie să rămână în Germania (conformitate) și contează latența, deci alegerea unei Regiuni conforme și apropiate (ex: Frankfurt) rezolvă ambele. A (Edge Locations) sunt pentru cache de conținut via CloudFront, nu pentru unde rezidă legal datele primare. C (un singur AZ) scade disponibilitatea și nu rezolvă rezidența. D (multe Regiuni) ar răspândi datele în mai multe țări, încălcând cerința de rezidență a datelor.',
    },
    relatedServices: ['cloudfront'],
    relatedConcepts: ['regions', 'availability-zones', 'edge-locations'],
  },
  {
    id: 'pcc-7',
    type: 'multiple_choice',
    difficulty: 3,
    categories: ['caf'],
    examDomain: 'cloud-concepts',
    source: 'maarek',
    question: {
      en: 'During cloud adoption planning, a company needs to define cloud security roles, set up identity and access controls, and establish governance for protecting workloads. Which AWS Cloud Adoption Framework (CAF) perspective owns this work?',
      ro: 'În timpul planificării adopției cloud, o companie trebuie să definească rolurile de securitate cloud, să configureze controale de identitate și acces și să stabilească guvernanța pentru protejarea workload-urilor. Ce perspectivă din AWS Cloud Adoption Framework (CAF) deține această muncă?',
    },
    options: [
      { en: 'Business perspective', ro: 'Perspectiva Business' },
      { en: 'People perspective', ro: 'Perspectiva People' },
      { en: 'Security perspective', ro: 'Perspectiva Security' },
      { en: 'Platform perspective', ro: 'Perspectiva Platform' },
    ],
    correct: 2,
    explanation: {
      en: 'The Security perspective of the CAF covers identity and access management, threat detection, data protection, and security governance — exactly these tasks. A (Business) aligns cloud investment with business outcomes and ROI. B (People) covers culture, training, and organizational change. D (Platform) builds the cloud environment and provisions infrastructure/services, but the access controls and security governance described belong to the Security perspective. (CAF has 6 perspectives: Business, People, Governance, Platform, Security, Operations.)',
      ro: 'Perspectiva Security din CAF acoperă managementul identității și accesului, detectarea amenințărilor, protecția datelor și guvernanța securității — exact aceste sarcini. A (Business) aliniază investiția în cloud cu rezultatele de business și ROI. B (People) acoperă cultura, training-ul și schimbarea organizațională. D (Platform) construiește mediul cloud și provizionează infrastructura/serviciile, dar controalele de acces și guvernanța securității descrise aparțin perspectivei Security. (CAF are 6 perspective: Business, People, Governance, Platform, Security, Operations.)',
    },
    relatedServices: ['iam'],
    relatedConcepts: ['caf'],
  },
];
