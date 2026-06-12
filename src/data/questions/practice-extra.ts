import type { QuizQuestion } from '@/types';

/**
 * Original CLF-C02 practice questions in full per-option (Udemy-style) format.
 * Each option carries its own correct/incorrect rationale plus AWS reference links.
 * Exam-style questions from AWS docs + Stephane Maarek; not actual exam questions (NDA).
 */
export const practiceExtraQuestions: QuizQuestion[] = [
  // ───────────────────────────── Cloud Concepts (5) ─────────────────────────────
  {
    id: 'pex-cc-1',
    type: 'multiple_choice',
    difficulty: 2,
    categories: ['well-architected'],
    examDomain: 'cloud-concepts',
    source: 'aws-docs',
    question: {
      en: 'A team wants to design their workload so it can run efficiently with the LOWEST environmental impact, including choosing efficient instance types and Regions powered by renewable energy. Which AWS Well-Architected Framework pillar directly addresses this goal?',
      ro: 'O echipă vrea să își proiecteze workload-ul astfel încât să ruleze eficient cu cel mai mic impact asupra mediului, inclusiv alegerea unor tipuri de instanțe eficiente și a unor Regiuni alimentate cu energie regenerabilă. Care pilon al AWS Well-Architected Framework abordează direct acest obiectiv?',
    },
    options: [
      { en: 'Cost Optimization', ro: 'Cost Optimization' },
      { en: 'Sustainability', ro: 'Sustainability' },
      { en: 'Performance Efficiency', ro: 'Performance Efficiency' },
      { en: 'Operational Excellence', ro: 'Operational Excellence' },
    ],
    correct: 1,
    explanation: {
      en: 'The Sustainability pillar focuses on minimizing the environmental impact of running cloud workloads — energy consumption, efficient resource use, and selecting greener Regions. Cost Optimization is about reducing spend, Performance Efficiency is about using resources effectively to meet demand, and Operational Excellence is about running and monitoring systems to deliver business value. Only Sustainability targets environmental footprint as its explicit goal.',
      ro: 'Pilonul Sustainability se concentrează pe minimizarea impactului asupra mediului al rulării workload-urilor cloud — consumul de energie, utilizarea eficientă a resurselor și alegerea unor Regiuni mai „verzi”. Cost Optimization vizează reducerea cheltuielilor, Performance Efficiency vizează folosirea eficientă a resurselor pentru a satisface cererea, iar Operational Excellence vizează rularea și monitorizarea sistemelor pentru a livra valoare de business. Doar Sustainability are amprenta de mediu drept obiectiv explicit.',
    },
    optionExplanations: [
      { en: 'Incorrect — Cost Optimization is about avoiding unnecessary spend, not about reducing environmental impact.', ro: 'Greșit — Cost Optimization vizează evitarea cheltuielilor inutile, nu reducerea impactului asupra mediului.' },
      { en: 'Correct — The Sustainability pillar explicitly targets minimizing the environmental impact of running cloud workloads.', ro: 'Corect — Pilonul Sustainability vizează explicit minimizarea impactului asupra mediului al rulării workload-urilor cloud.' },
      { en: 'Incorrect — Performance Efficiency is about using compute resources effectively to meet demand, not environmental footprint.', ro: 'Greșit — Performance Efficiency vizează folosirea eficientă a resurselor de compute pentru a satisface cererea, nu amprenta de mediu.' },
      { en: 'Incorrect — Operational Excellence is about running, monitoring, and improving systems to deliver business value, not environmental goals.', ro: 'Greșit — Operational Excellence vizează rularea, monitorizarea și îmbunătățirea sistemelor pentru a livra valoare de business, nu obiective de mediu.' },
    ],
    references: [
      { label: 'AWS Well-Architected Framework — Pillars', url: 'https://docs.aws.amazon.com/wellarchitected/latest/framework/the-pillars-of-the-framework.html' },
      { label: 'Sustainability Pillar', url: 'https://docs.aws.amazon.com/wellarchitected/latest/sustainability-pillar/sustainability-pillar.html' },
    ],
    relatedServices: [],
  },
  {
    id: 'pex-cc-2',
    type: 'multiple_choice',
    difficulty: 2,
    categories: ['cloud-fundamentals'],
    examDomain: 'cloud-concepts',
    source: 'maarek',
    question: {
      en: 'An online store sees traffic spike 10x during a flash sale and drop back afterward. They want their infrastructure to automatically add capacity during the spike and remove it when traffic falls, so they pay only for what they need. Which cloud benefit BEST describes this capability?',
      ro: 'Un magazin online vede traficul crescând de 10x în timpul unei reduceri-fulger și scăzând înapoi după aceea. Vor ca infrastructura lor să adauge automat capacitate în timpul vârfului și să o elimine când traficul scade, astfel încât să plătească doar pentru ce au nevoie. Ce beneficiu cloud descrie cel mai bine această capacitate?',
    },
    options: [
      { en: 'Elasticity', ro: 'Elasticitate' },
      { en: 'High availability', ro: 'Înaltă disponibilitate' },
      { en: 'Fault tolerance', ro: 'Toleranță la erori' },
      { en: 'Economies of scale', ro: 'Economii de scară' },
    ],
    correct: 0,
    explanation: {
      en: 'Elasticity is the ability to automatically scale resources OUT when demand rises and IN when it falls, so you match capacity to load and pay only for what you use — exactly the flash-sale pattern. High availability means staying operational despite component issues, fault tolerance means continuing without interruption when a component fails, and economies of scale refers to lower per-unit prices from AWS aggregating massive demand. None of those three describe automatic scale-in/scale-out with demand.',
      ro: 'Elasticitatea este capacitatea de a scala automat resursele în SUS când cererea crește și în JOS când scade, astfel încât potrivești capacitatea cu sarcina și plătești doar pentru ce folosești — exact tiparul reducerii-fulger. Înalta disponibilitate înseamnă să rămâi operațional în ciuda problemelor la componente, toleranța la erori înseamnă să continui fără întrerupere când o componentă cade, iar economiile de scară se referă la prețuri mai mici per unitate datorită agregării cererii masive de către AWS. Niciuna dintre acestea trei nu descrie scalarea automată în funcție de cerere.',
    },
    optionExplanations: [
      { en: 'Correct — Elasticity automatically scales resources out and in to match demand, so you pay only for what you use.', ro: 'Corect — Elasticitatea scalează automat resursele în sus și în jos pentru a se potrivi cererii, deci plătești doar pentru ce folosești.' },
      { en: 'Incorrect — High availability means staying operational despite component issues, not automatic capacity scaling.', ro: 'Greșit — Înalta disponibilitate înseamnă a rămâne operațional în ciuda problemelor la componente, nu scalarea automată a capacității.' },
      { en: 'Incorrect — Fault tolerance means continuing without interruption when a component fails, not matching capacity to demand.', ro: 'Greșit — Toleranța la erori înseamnă a continua fără întrerupere când o componentă cade, nu potrivirea capacității cu cererea.' },
      { en: 'Incorrect — Economies of scale refers to lower per-unit prices from aggregated demand, not automatic scaling.', ro: 'Greșit — Economiile de scară se referă la prețuri mai mici per unitate din cererea agregată, nu la scalarea automată.' },
    ],
    references: [
      { label: 'Six Advantages of Cloud Computing', url: 'https://docs.aws.amazon.com/whitepapers/latest/aws-overview/six-advantages-of-cloud-computing.html' },
    ],
    relatedServices: [],
  },
  {
    id: 'pex-cc-3',
    type: 'multiple_choice',
    difficulty: 3,
    categories: ['cloud-fundamentals'],
    examDomain: 'cloud-concepts',
    source: 'maarek',
    question: {
      en: 'An architect explains that a payment system must keep operating with NO interruption and NO loss of capacity even if an entire component fails — failures must be completely invisible to users. Which characteristic is being described?',
      ro: 'Un arhitect explică faptul că un sistem de plăți trebuie să continue să funcționeze FĂRĂ întrerupere și FĂRĂ pierdere de capacitate chiar dacă o componentă întreagă cade — defecțiunile trebuie să fie complet invizibile pentru utilizatori. Ce caracteristică este descrisă?',
    },
    options: [
      { en: 'High availability', ro: 'Înaltă disponibilitate' },
      { en: 'Fault tolerance', ro: 'Toleranță la erori' },
      { en: 'Scalability', ro: 'Scalabilitate' },
      { en: 'Agility', ro: 'Agilitate' },
    ],
    correct: 1,
    explanation: {
      en: 'Fault tolerance means the system keeps running with NO interruption and no loss of capacity when a component fails — the failure is invisible to users, which is the strictest guarantee described here. High availability minimizes downtime and recovers quickly but may allow a brief interruption, so it is weaker than fault tolerance. Scalability is about handling more load, and agility is about how quickly you can build and experiment — neither describes surviving failures invisibly.',
      ro: 'Toleranța la erori înseamnă că sistemul continuă să ruleze FĂRĂ întrerupere și fără pierdere de capacitate când o componentă cade — defecțiunea este invizibilă pentru utilizatori, ceea ce este garanția cea mai strictă descrisă aici. Înalta disponibilitate minimizează timpul de nefuncționare și se recuperează rapid, dar poate permite o scurtă întrerupere, deci este mai slabă decât toleranța la erori. Scalabilitatea ține de gestionarea unei sarcini mai mari, iar agilitatea ține de cât de repede poți construi și experimenta — niciuna nu descrie supraviețuirea invizibilă la defecțiuni.',
    },
    optionExplanations: [
      { en: 'Incorrect — High availability minimizes downtime and recovers quickly, but may permit a brief interruption, so it is weaker than fault tolerance.', ro: 'Greșit — Înalta disponibilitate minimizează nefuncționarea și se recuperează rapid, dar poate permite o scurtă întrerupere, deci este mai slabă decât toleranța la erori.' },
      { en: 'Correct — Fault tolerance keeps the system running with no interruption and no capacity loss when a component fails, invisibly to users.', ro: 'Corect — Toleranța la erori menține sistemul funcțional fără întrerupere și fără pierdere de capacitate când o componentă cade, invizibil pentru utilizatori.' },
      { en: 'Incorrect — Scalability is about handling more load, not about surviving a component failure invisibly.', ro: 'Greșit — Scalabilitatea ține de gestionarea unei sarcini mai mari, nu de a supraviețui invizibil unei defecțiuni de componentă.' },
      { en: 'Incorrect — Agility is about how fast you can build and experiment, not about uninterrupted operation during failures.', ro: 'Greșit — Agilitatea ține de cât de repede poți construi și experimenta, nu de funcționarea neîntreruptă în timpul defecțiunilor.' },
    ],
    references: [
      { label: 'AWS Well-Architected — Reliability Pillar', url: 'https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html' },
    ],
    relatedServices: [],
  },
  {
    id: 'pex-cc-4',
    type: 'multiple_choice',
    difficulty: 2,
    categories: ['global-infrastructure'],
    examDomain: 'cloud-concepts',
    source: 'aws-docs',
    question: {
      en: 'A European company processing personal data must store and process all customer data within the European Union to satisfy data-residency regulations. Which factor should MOST influence their choice of AWS Region?',
      ro: 'O companie europeană care procesează date personale trebuie să stocheze și să proceseze toate datele clienților în interiorul Uniunii Europene pentru a respecta reglementările de rezidență a datelor. Ce factor ar trebui să le influențeze CEL MAI MULT alegerea Regiunii AWS?',
    },
    options: [
      { en: 'The number of Availability Zones in the Region', ro: 'Numărul de Availability Zone din Regiune' },
      { en: 'Compliance and data-residency (data governance) requirements', ro: 'Cerințele de conformitate și rezidență a datelor (data governance)' },
      { en: 'The color scheme of the AWS Management Console', ro: 'Schema de culori a AWS Management Console' },
      { en: 'The number of edge locations worldwide', ro: 'Numărul de edge location-uri din întreaga lume' },
    ],
    correct: 1,
    explanation: {
      en: 'When laws require data to stay within a geographic boundary like the EU, compliance and data-residency requirements are the decisive Region-selection factor — you must pick a Region inside the required jurisdiction. The number of AZs, edge locations, latency, and price are valid Region considerations in general, but they cannot override a legal data-residency mandate. The console color scheme is irrelevant to Region selection.',
      ro: 'Când legile cer ca datele să rămână într-o limită geografică precum UE, cerințele de conformitate și rezidență a datelor sunt factorul decisiv de alegere a Regiunii — trebuie să alegi o Regiune din interiorul jurisdicției cerute. Numărul de AZ-uri, edge location-urile, latența și prețul sunt considerații valide la alegerea Regiunii în general, dar nu pot anula un mandat legal de rezidență a datelor. Schema de culori a consolei este irelevantă pentru alegerea Regiunii.',
    },
    optionExplanations: [
      { en: 'Incorrect — The number of AZs matters for availability design, but it does not satisfy a legal requirement to keep data within the EU.', ro: 'Greșit — Numărul de AZ-uri contează pentru designul de disponibilitate, dar nu satisface o cerință legală de a păstra datele în UE.' },
      { en: 'Correct — Compliance and data-residency requirements decide the Region when laws mandate that data stay within a geographic boundary.', ro: 'Corect — Cerințele de conformitate și rezidență a datelor decid Regiunea atunci când legile impun ca datele să rămână într-o limită geografică.' },
      { en: 'Incorrect — The console color scheme has nothing to do with where data is legally stored.', ro: 'Greșit — Schema de culori a consolei nu are nicio legătură cu locul în care datele sunt stocate legal.' },
      { en: 'Incorrect — Edge locations relate to content delivery, not to satisfying EU data-residency law.', ro: 'Greșit — Edge location-urile țin de livrarea de conținut, nu de respectarea legii de rezidență a datelor din UE.' },
    ],
    references: [
      { label: 'Global Infrastructure — Regions and AZs', url: 'https://docs.aws.amazon.com/whitepapers/latest/aws-overview/global-infrastructure.html' },
      { label: 'AWS Compliance', url: 'https://aws.amazon.com/compliance/' },
    ],
    relatedServices: [],
  },
  {
    id: 'pex-cc-5',
    type: 'multiple_choice',
    difficulty: 3,
    categories: ['cloud-fundamentals'],
    examDomain: 'cloud-concepts',
    source: 'aws-docs',
    question: {
      en: 'An enterprise is planning a large cloud migration and wants a structured guide that organizes the people, governance, and technical perspectives needed to transform their organization for the cloud. Which AWS framework is designed for this?',
      ro: 'O întreprindere planifică o migrare mare în cloud și vrea un ghid structurat care organizează perspectivele de oameni, guvernanță și tehnice necesare pentru a-și transforma organizația pentru cloud. Ce framework AWS este conceput pentru asta?',
    },
    options: [
      { en: 'AWS Well-Architected Framework', ro: 'AWS Well-Architected Framework' },
      { en: 'AWS Cloud Adoption Framework (CAF)', ro: 'AWS Cloud Adoption Framework (CAF)' },
      { en: 'AWS Shared Responsibility Model', ro: 'AWS Shared Responsibility Model' },
      { en: 'AWS Service Catalog', ro: 'AWS Service Catalog' },
    ],
    correct: 1,
    explanation: {
      en: 'The AWS Cloud Adoption Framework (CAF) organizes guidance into perspectives (Business, People, Governance, Platform, Security, Operations) to help an organization plan and execute a cloud transformation — the people-and-governance migration guide described. The Well-Architected Framework reviews the design quality of a specific workload, not org-wide adoption. The Shared Responsibility Model defines who secures what, and Service Catalog is a tool for distributing approved IT products, not a transformation framework.',
      ro: 'AWS Cloud Adoption Framework (CAF) organizează îndrumarea în perspective (Business, People, Governance, Platform, Security, Operations) pentru a ajuta o organizație să planifice și să execute o transformare în cloud — ghidul de migrare pe oameni-și-guvernanță descris. Well-Architected Framework evaluează calitatea designului unui workload specific, nu adoptarea la nivel de organizație. Shared Responsibility Model definește cine securizează ce, iar Service Catalog este un instrument pentru distribuirea produselor IT aprobate, nu un framework de transformare.',
    },
    optionExplanations: [
      { en: 'Incorrect — The Well-Architected Framework reviews the design quality of a specific workload, not an org-wide cloud transformation.', ro: 'Greșit — Well-Architected Framework evaluează calitatea designului unui workload specific, nu o transformare cloud la nivel de organizație.' },
      { en: 'Correct — The Cloud Adoption Framework (CAF) organizes business, people, governance, and technical perspectives to guide a cloud transformation.', ro: 'Corect — Cloud Adoption Framework (CAF) organizează perspectivele de business, oameni, guvernanță și tehnice pentru a ghida o transformare în cloud.' },
      { en: 'Incorrect — The Shared Responsibility Model defines who secures what; it is not a migration/transformation framework.', ro: 'Greșit — Shared Responsibility Model definește cine securizează ce; nu este un framework de migrare/transformare.' },
      { en: 'Incorrect — Service Catalog distributes approved IT products to users; it is a tool, not an adoption framework.', ro: 'Greșit — Service Catalog distribuie produse IT aprobate către utilizatori; este un instrument, nu un framework de adoptare.' },
    ],
    references: [
      { label: 'AWS Cloud Adoption Framework', url: 'https://aws.amazon.com/cloud-adoption-framework/' },
    ],
    relatedServices: ['servicecatalog'],
  },

  // ───────────────────────────── Security (6) ─────────────────────────────
  {
    id: 'pex-sec-1',
    type: 'multiple_choice',
    difficulty: 2,
    categories: ['identity'],
    examDomain: 'security',
    source: 'aws-docs',
    question: {
      en: 'An application running on an EC2 instance needs to read objects from an S3 bucket. What is the AWS-recommended way to grant this access WITHOUT storing long-term credentials on the instance?',
      ro: 'O aplicație care rulează pe o instanță EC2 trebuie să citească obiecte dintr-un bucket S3. Care este metoda recomandată de AWS pentru a acorda acest acces FĂRĂ a stoca credențiale pe termen lung pe instanță?',
    },
    options: [
      { en: 'Hardcode an IAM user’s access key and secret key in the application config', ro: 'Hardcodează cheia de acces și cheia secretă ale unui utilizator IAM în configul aplicației' },
      { en: 'Attach an IAM role to the EC2 instance', ro: 'Atașează un rol IAM la instanța EC2' },
      { en: 'Store the root account credentials in an environment variable', ro: 'Stochează credențialele contului root într-o variabilă de mediu' },
      { en: 'Make the S3 bucket public so no credentials are needed', ro: 'Fă bucket-ul S3 public ca să nu fie nevoie de credențiale' },
    ],
    correct: 1,
    explanation: {
      en: 'Attaching an IAM role to the EC2 instance lets the application obtain temporary, automatically-rotated credentials — no long-term keys are stored on the instance, which is the AWS best practice. Hardcoding access keys is exactly what roles are meant to avoid, storing root credentials anywhere is a severe security risk, and making the bucket public exposes data to the entire internet instead of granting scoped access. Roles deliver least-privilege access with no embedded secrets.',
      ro: 'Atașarea unui rol IAM la instanța EC2 permite aplicației să obțină credențiale temporare, rotite automat — nu se stochează chei pe termen lung pe instanță, ceea ce este best practice-ul AWS. Hardcodarea cheilor de acces este exact ce încearcă rolurile să evite, stocarea credențialelor root oriunde este un risc grav de securitate, iar a face bucket-ul public expune datele întregului internet în loc să acorde acces limitat. Rolurile oferă acces cu privilegii minime fără secrete încorporate.',
    },
    optionExplanations: [
      { en: 'Incorrect — Hardcoding access keys is the insecure anti-pattern that IAM roles are designed to eliminate.', ro: 'Greșit — Hardcodarea cheilor de acces este anti-tiparul nesigur pe care rolurile IAM sunt concepute să îl elimine.' },
      { en: 'Correct — An IAM role gives the instance temporary, auto-rotated credentials with no long-term keys stored on it.', ro: 'Corect — Un rol IAM oferă instanței credențiale temporare, rotite automat, fără chei pe termen lung stocate pe ea.' },
      { en: 'Incorrect — Root credentials should never be embedded anywhere; this is a severe security risk.', ro: 'Greșit — Credențialele root nu ar trebui încorporate niciodată nicăieri; acesta este un risc grav de securitate.' },
      { en: 'Incorrect — Making the bucket public exposes data to everyone on the internet instead of granting scoped access.', ro: 'Greșit — A face bucket-ul public expune datele tuturor de pe internet în loc să acorde un acces limitat.' },
    ],
    references: [
      { label: 'IAM Roles for Amazon EC2', url: 'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html' },
    ],
    relatedServices: ['iam', 'ec2', 's3'],
  },
  {
    id: 'pex-sec-2',
    type: 'multiple_choice',
    difficulty: 2,
    categories: ['security'],
    examDomain: 'security',
    source: 'aws-docs',
    question: {
      en: 'A web application is being targeted by SQL injection and cross-site scripting attempts at the HTTP request (application) layer. Which AWS service lets the team write rules to filter and block these malicious requests?',
      ro: 'O aplicație web este țintită de tentative de SQL injection și cross-site scripting la nivelul cererii HTTP (nivelul aplicație). Ce serviciu AWS permite echipei să scrie reguli pentru a filtra și bloca aceste cereri malițioase?',
    },
    options: [
      { en: 'AWS Shield Standard', ro: 'AWS Shield Standard' },
      { en: 'AWS WAF', ro: 'AWS WAF' },
      { en: 'Amazon GuardDuty', ro: 'Amazon GuardDuty' },
      { en: 'AWS KMS', ro: 'AWS KMS' },
    ],
    correct: 1,
    explanation: {
      en: 'AWS WAF (Web Application Firewall) operates at layer 7 and lets you define rules to inspect and block HTTP/HTTPS requests, including common exploits like SQL injection and cross-site scripting. Shield Standard protects against network/transport-layer (L3/L4) DDoS, not application-layer request filtering. GuardDuty is a threat-detection service that analyzes logs but does not block requests inline, and KMS manages encryption keys — neither filters web requests. WAF is the right layer-7 tool here.',
      ro: 'AWS WAF (Web Application Firewall) operează la nivelul 7 și permite definirea de reguli pentru a inspecta și bloca cererile HTTP/HTTPS, inclusiv exploit-uri comune precum SQL injection și cross-site scripting. Shield Standard protejează împotriva atacurilor DDoS de nivel rețea/transport (L3/L4), nu filtrare de cereri la nivel aplicație. GuardDuty este un serviciu de detectare a amenințărilor care analizează loguri dar nu blochează cererile în linie, iar KMS gestionează chei de criptare — niciunul nu filtrează cereri web. WAF este instrumentul potrivit de nivel 7 aici.',
    },
    optionExplanations: [
      { en: 'Incorrect — Shield Standard defends against network/transport-layer DDoS, not application-layer SQL injection or XSS.', ro: 'Greșit — Shield Standard apără împotriva DDoS de nivel rețea/transport, nu împotriva SQL injection sau XSS de la nivel aplicație.' },
      { en: 'Correct — AWS WAF works at layer 7 and lets you write rules to filter and block malicious HTTP requests like SQL injection and XSS.', ro: 'Corect — AWS WAF lucrează la nivelul 7 și permite scrierea de reguli pentru a filtra și bloca cereri HTTP malițioase precum SQL injection și XSS.' },
      { en: 'Incorrect — GuardDuty detects threats by analyzing logs but does not inline-block web requests.', ro: 'Greșit — GuardDuty detectează amenințări analizând loguri dar nu blochează cererile web în linie.' },
      { en: 'Incorrect — KMS manages encryption keys; it has nothing to do with filtering web requests.', ro: 'Greșit — KMS gestionează chei de criptare; nu are nimic de-a face cu filtrarea cererilor web.' },
    ],
    references: [
      { label: 'AWS WAF', url: 'https://docs.aws.amazon.com/waf/latest/developerguide/what-is-aws-waf.html' },
    ],
    relatedServices: ['waf', 'shield'],
  },
  {
    id: 'pex-sec-3',
    type: 'multiple_choice',
    difficulty: 1,
    categories: ['compliance'],
    examDomain: 'security',
    source: 'aws-docs',
    question: {
      en: 'An auditor asks a company to provide AWS’s SOC 2 and ISO 27001 compliance reports to verify the security of the underlying cloud infrastructure. From which AWS service can the company download these on-demand compliance documents?',
      ro: 'Un auditor cere unei companii să furnizeze rapoartele de conformitate SOC 2 și ISO 27001 ale AWS pentru a verifica securitatea infrastructurii cloud subiacente. Din ce serviciu AWS poate compania descărca aceste documente de conformitate la cerere?',
    },
    options: [
      { en: 'AWS Trusted Advisor', ro: 'AWS Trusted Advisor' },
      { en: 'AWS Artifact', ro: 'AWS Artifact' },
      { en: 'AWS Config', ro: 'AWS Config' },
      { en: 'AWS Security Hub', ro: 'AWS Security Hub' },
    ],
    correct: 1,
    explanation: {
      en: 'AWS Artifact is the self-service portal for downloading AWS’s compliance reports and agreements, such as SOC 2 and ISO 27001 — exactly what an auditor requests. Trusted Advisor gives best-practice checks on your own account, Config records and evaluates your resource configurations, and Security Hub aggregates security findings — none of them provide AWS’s audit reports. Artifact is the single source for these documents.',
      ro: 'AWS Artifact este portalul self-service pentru descărcarea rapoartelor de conformitate și a acordurilor AWS, precum SOC 2 și ISO 27001 — exact ce cere un auditor. Trusted Advisor oferă verificări de best practice pe propriul cont, Config înregistrează și evaluează configurațiile resurselor tale, iar Security Hub agregă constatări de securitate — niciunul nu furnizează rapoartele de audit ale AWS. Artifact este sursa unică pentru aceste documente.',
    },
    optionExplanations: [
      { en: 'Incorrect — Trusted Advisor checks your account against best practices; it does not provide AWS compliance reports.', ro: 'Greșit — Trusted Advisor verifică contul tău față de best practices; nu furnizează rapoartele de conformitate ale AWS.' },
      { en: 'Correct — AWS Artifact is the portal to download AWS compliance reports and agreements like SOC 2 and ISO 27001.', ro: 'Corect — AWS Artifact este portalul pentru descărcarea rapoartelor și acordurilor de conformitate AWS precum SOC 2 și ISO 27001.' },
      { en: 'Incorrect — AWS Config records and evaluates your resource configurations; it does not host AWS audit reports.', ro: 'Greșit — AWS Config înregistrează și evaluează configurațiile resurselor tale; nu găzduiește rapoartele de audit ale AWS.' },
      { en: 'Incorrect — Security Hub aggregates security findings across accounts; it is not where AWS compliance documents live.', ro: 'Greșit — Security Hub agregă constatări de securitate între conturi; nu este locul unde se află documentele de conformitate AWS.' },
    ],
    references: [
      { label: 'AWS Artifact', url: 'https://docs.aws.amazon.com/artifact/latest/ug/what-is-aws-artifact.html' },
    ],
    relatedServices: ['securityhub', 'config', 'trustedadvisor'],
  },
  {
    id: 'pex-sec-4',
    type: 'multiple_choice',
    difficulty: 3,
    categories: ['identity'],
    examDomain: 'security',
    source: 'maarek',
    question: {
      en: 'A company using AWS Organizations wants to set a GUARDRAIL that prevents ANY account in a specific organizational unit (OU) from using Regions outside of Europe, even if an account’s own administrator grants those permissions. Which feature enforces this organization-wide boundary?',
      ro: 'O companie care folosește AWS Organizations vrea să seteze un GUARDRAIL care împiedică ORICE cont dintr-o unitate organizațională (OU) specifică să folosească Regiuni din afara Europei, chiar dacă administratorul propriu al unui cont acordă acele permisiuni. Ce funcție impune această limită la nivelul întregii organizații?',
    },
    options: [
      { en: 'IAM user policies', ro: 'Politici de utilizator IAM' },
      { en: 'Service Control Policies (SCPs)', ro: 'Service Control Policies (SCP)' },
      { en: 'Security groups', ro: 'Security groups' },
      { en: 'IAM permission boundaries on a single user', ro: 'Permission boundaries IAM pe un singur utilizator' },
    ],
    correct: 1,
    explanation: {
      en: 'Service Control Policies (SCPs) in AWS Organizations set the maximum available permissions for accounts in an OU — they act as guardrails that even an account’s own administrator cannot exceed, so they can block non-European Regions org-wide. IAM user policies and single-user permission boundaries apply only within one account and can be changed by that account’s admin. Security groups are virtual firewalls for instance traffic, not organization-level permission guardrails. SCPs are the only org-wide boundary here.',
      ro: 'Service Control Policies (SCP) din AWS Organizations stabilesc permisiunile maxime disponibile pentru conturile dintr-un OU — acționează ca guardrail-uri pe care nici măcar administratorul propriu al unui cont nu le poate depăși, deci pot bloca Regiunile non-europene la nivelul întregii organizații. Politicile de utilizator IAM și permission boundaries pe un singur utilizator se aplică doar în interiorul unui cont și pot fi schimbate de adminul acelui cont. Security groups sunt firewall-uri virtuale pentru traficul instanțelor, nu guardrail-uri de permisiuni la nivel de organizație. SCP-urile sunt singura limită la nivel de organizație aici.',
    },
    optionExplanations: [
      { en: 'Incorrect — IAM user policies apply within a single account and can be changed by that account’s admin, so they are not an org-wide guardrail.', ro: 'Greșit — Politicile de utilizator IAM se aplică într-un singur cont și pot fi schimbate de adminul acelui cont, deci nu sunt un guardrail la nivel de organizație.' },
      { en: 'Correct — SCPs set the maximum permissions for accounts in an OU, a guardrail that an account admin cannot exceed.', ro: 'Corect — SCP-urile stabilesc permisiunile maxime pentru conturile dintr-un OU, un guardrail pe care un admin de cont nu îl poate depăși.' },
      { en: 'Incorrect — Security groups are virtual firewalls for instance traffic, not permission guardrails across accounts.', ro: 'Greșit — Security groups sunt firewall-uri virtuale pentru traficul instanțelor, nu guardrail-uri de permisiuni între conturi.' },
      { en: 'Incorrect — A permission boundary on one user limits only that user in one account, not an entire OU.', ro: 'Greșit — Un permission boundary pe un utilizator limitează doar acel utilizator într-un cont, nu un OU întreg.' },
    ],
    references: [
      { label: 'Service Control Policies (SCPs)', url: 'https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html' },
    ],
    relatedServices: ['organizations', 'iam'],
  },
  {
    id: 'pex-sec-5',
    type: 'multiple_choice',
    difficulty: 2,
    categories: ['security'],
    examDomain: 'security',
    source: 'aws-docs',
    question: {
      en: 'A security team wants to ENCRYPT data at rest in Amazon S3 and centrally create, manage, and automatically rotate the encryption keys used. Which AWS service provides this managed key capability?',
      ro: 'O echipă de securitate vrea să CRIPTEZE datele în repaus în Amazon S3 și să creeze, gestioneze și roteze automat, în mod centralizat, cheile de criptare folosite. Ce serviciu AWS oferă această capabilitate de gestionare a cheilor?',
    },
    options: [
      { en: 'AWS Certificate Manager (ACM)', ro: 'AWS Certificate Manager (ACM)' },
      { en: 'AWS Key Management Service (KMS)', ro: 'AWS Key Management Service (KMS)' },
      { en: 'AWS Secrets Manager', ro: 'AWS Secrets Manager' },
      { en: 'AWS IAM', ro: 'AWS IAM' },
    ],
    correct: 1,
    explanation: {
      en: 'AWS KMS lets you create and centrally manage encryption keys and supports automatic annual rotation, and it integrates with S3 to encrypt data at rest. ACM provisions and manages TLS/SSL certificates for encryption in transit, not data-at-rest keys. Secrets Manager stores and rotates credentials like database passwords, not the encryption keys behind S3 SSE. IAM controls who can do what but does not itself manage cryptographic keys. KMS is the key-management service.',
      ro: 'AWS KMS îți permite să creezi și să gestionezi centralizat chei de criptare și suportă rotație anuală automată, iar se integrează cu S3 pentru a cripta datele în repaus. ACM furnizează și gestionează certificate TLS/SSL pentru criptarea în tranzit, nu chei pentru date în repaus. Secrets Manager stochează și rotește credențiale precum parole de bază de date, nu cheile de criptare din spatele S3 SSE. IAM controlează cine ce poate face, dar nu gestionează el însuși chei criptografice. KMS este serviciul de gestionare a cheilor.',
    },
    optionExplanations: [
      { en: 'Incorrect — ACM provisions TLS/SSL certificates for encryption in transit, not keys for data at rest.', ro: 'Greșit — ACM furnizează certificate TLS/SSL pentru criptarea în tranzit, nu chei pentru date în repaus.' },
      { en: 'Correct — AWS KMS centrally creates, manages, and auto-rotates the encryption keys used to encrypt S3 data at rest.', ro: 'Corect — AWS KMS creează, gestionează și rotește automat, centralizat, cheile de criptare folosite pentru a cripta datele S3 în repaus.' },
      { en: 'Incorrect — Secrets Manager stores and rotates secrets like passwords, not the encryption keys behind S3 server-side encryption.', ro: 'Greșit — Secrets Manager stochează și rotește secrete precum parole, nu cheile de criptare din spatele criptării server-side a S3.' },
      { en: 'Incorrect — IAM controls permissions; it does not create or manage cryptographic keys.', ro: 'Greșit — IAM controlează permisiunile; nu creează și nu gestionează chei criptografice.' },
    ],
    references: [
      { label: 'AWS Key Management Service', url: 'https://docs.aws.amazon.com/kms/latest/developerguide/overview.html' },
      { label: 'Rotating AWS KMS keys', url: 'https://docs.aws.amazon.com/kms/latest/developerguide/rotate-keys.html' },
    ],
    relatedServices: ['kms', 'acm', 'secretsmanager'],
  },
  {
    id: 'pex-sec-6',
    type: 'multiple_choice',
    difficulty: 1,
    categories: ['security'],
    examDomain: 'security',
    source: 'aws-docs',
    question: {
      en: 'According to AWS security best practices, which action should be taken on the AWS account ROOT user to protect it after initial setup?',
      ro: 'Conform celor mai bune practici de securitate AWS, ce acțiune ar trebui luată asupra utilizatorului ROOT al contului AWS pentru a-l proteja după configurarea inițială?',
    },
    options: [
      { en: 'Share the root credentials with the whole team for convenience', ro: 'Partajează credențialele root cu toată echipa pentru comoditate' },
      { en: 'Use the root user for all daily administrative tasks', ro: 'Folosește utilizatorul root pentru toate sarcinile administrative zilnice' },
      { en: 'Enable MFA on the root user and use it only for the few tasks that require it', ro: 'Activează MFA pe utilizatorul root și folosește-l doar pentru puținele sarcini care îl cer' },
      { en: 'Delete the root user entirely', ro: 'Șterge complet utilizatorul root' },
    ],
    correct: 2,
    explanation: {
      en: 'Best practice is to enable MFA on the root user, lock it away, and use it only for the few tasks that truly require root — day-to-day work should use IAM users/roles with least privilege. Sharing root credentials or using root for daily tasks dramatically increases risk because root has unrestricted access. The root user cannot be deleted; it is intrinsic to the account. Protecting root with MFA and minimizing its use is the correct guidance.',
      ro: 'Best practice-ul este să activezi MFA pe utilizatorul root, să îl „blochezi” și să îl folosești doar pentru puținele sarcini care necesită cu adevărat root — munca de zi cu zi ar trebui să folosească utilizatori/roluri IAM cu privilegii minime. Partajarea credențialelor root sau folosirea root pentru sarcini zilnice crește dramatic riscul, deoarece root are acces nerestricționat. Utilizatorul root nu poate fi șters; este intrinsec contului. Protejarea root cu MFA și minimizarea utilizării sale este îndrumarea corectă.',
    },
    optionExplanations: [
      { en: 'Incorrect — Sharing root credentials gives many people unrestricted access and is a serious security risk.', ro: 'Greșit — Partajarea credențialelor root oferă multor persoane acces nerestricționat și este un risc serios de securitate.' },
      { en: 'Incorrect — Using root for daily tasks is discouraged; everyday work should use least-privilege IAM identities.', ro: 'Greșit — Folosirea root pentru sarcini zilnice este descurajată; munca de zi cu zi ar trebui să folosească identități IAM cu privilegii minime.' },
      { en: 'Correct — Enable MFA on root and reserve it for the few tasks that require it, using IAM identities otherwise.', ro: 'Corect — Activează MFA pe root și rezervă-l pentru puținele sarcini care îl cer, folosind altfel identități IAM.' },
      { en: 'Incorrect — The root user is intrinsic to the account and cannot be deleted.', ro: 'Greșit — Utilizatorul root este intrinsec contului și nu poate fi șters.' },
    ],
    references: [
      { label: 'Root user best practices', url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/root-user-best-practices.html' },
    ],
    relatedServices: ['iam'],
  },

  // ───────────────────────────── Tech & Services (7) ─────────────────────────────
  {
    id: 'pex-tech-1',
    type: 'multiple_choice',
    difficulty: 2,
    categories: ['compute'],
    examDomain: 'tech-services',
    source: 'aws-docs',
    question: {
      en: 'A web application’s traffic rises during the day and falls overnight. The company wants EC2 capacity to automatically increase (scale out) when CPU usage is high and decrease (scale in) when it drops, to match demand and control cost. Which service provides this?',
      ro: 'Traficul unei aplicații web crește în timpul zilei și scade noaptea. Compania vrea ca capacitatea EC2 să crească automat (scale out) când utilizarea CPU este mare și să scadă (scale in) când coboară, pentru a se potrivi cererii și a controla costul. Ce serviciu oferă asta?',
    },
    options: [
      { en: 'AWS CloudFormation', ro: 'AWS CloudFormation' },
      { en: 'EC2 Auto Scaling', ro: 'EC2 Auto Scaling' },
      { en: 'Elastic Load Balancing (ELB)', ro: 'Elastic Load Balancing (ELB)' },
      { en: 'AWS Elastic Beanstalk', ro: 'AWS Elastic Beanstalk' },
    ],
    correct: 1,
    explanation: {
      en: 'EC2 Auto Scaling automatically adds instances (scale out) when metrics like CPU rise and removes them (scale in) when they fall, matching capacity to demand and avoiding paying for idle servers. CloudFormation provisions infrastructure from templates but does not react to live demand. ELB distributes incoming traffic across instances but does not change how many instances exist. Elastic Beanstalk deploys and manages apps and can use Auto Scaling under the hood, but the feature that performs the scaling itself is EC2 Auto Scaling.',
      ro: 'EC2 Auto Scaling adaugă automat instanțe (scale out) când metrici precum CPU cresc și le elimină (scale in) când scad, potrivind capacitatea cu cererea și evitând plata pentru servere inactive. CloudFormation furnizează infrastructură din template-uri dar nu reacționează la cererea live. ELB distribuie traficul de intrare între instanțe dar nu schimbă câte instanțe există. Elastic Beanstalk deployează și gestionează aplicații și poate folosi Auto Scaling în spate, dar funcția care efectuează scalarea propriu-zisă este EC2 Auto Scaling.',
    },
    optionExplanations: [
      { en: 'Incorrect — CloudFormation provisions infrastructure from templates; it does not react to live demand to add or remove instances.', ro: 'Greșit — CloudFormation furnizează infrastructură din template-uri; nu reacționează la cererea live pentru a adăuga sau elimina instanțe.' },
      { en: 'Correct — EC2 Auto Scaling adds instances when demand rises and removes them when it falls, matching capacity to demand.', ro: 'Corect — EC2 Auto Scaling adaugă instanțe când cererea crește și le elimină când scade, potrivind capacitatea cu cererea.' },
      { en: 'Incorrect — ELB distributes incoming traffic across instances but does not change the number of instances.', ro: 'Greșit — ELB distribuie traficul de intrare între instanțe dar nu schimbă numărul de instanțe.' },
      { en: 'Incorrect — Beanstalk deploys/manages apps and can use Auto Scaling internally, but it is not itself the scaling mechanism.', ro: 'Greșit — Beanstalk deployează/gestionează aplicații și poate folosi Auto Scaling intern, dar nu este el însuși mecanismul de scalare.' },
    ],
    references: [
      { label: 'What is Amazon EC2 Auto Scaling?', url: 'https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html' },
    ],
    relatedServices: ['ec2', 'elb', 'beanstalk'],
  },
  {
    id: 'pex-tech-2',
    type: 'multiple_choice',
    difficulty: 2,
    categories: ['compute'],
    examDomain: 'tech-services',
    source: 'maarek',
    question: {
      en: 'A developer just wants to upload their application code and have AWS automatically handle capacity provisioning, load balancing, scaling, and health monitoring — without managing the underlying infrastructure themselves. Which service best fits this Platform-as-a-Service need?',
      ro: 'Un dezvoltator vrea doar să își încarce codul aplicației și ca AWS să gestioneze automat provizionarea capacității, load balancing-ul, scalarea și monitorizarea stării — fără să administreze el însuși infrastructura subiacentă. Ce serviciu se potrivește cel mai bine acestei nevoi de Platform-as-a-Service?',
    },
    options: [
      { en: 'Amazon EC2', ro: 'Amazon EC2' },
      { en: 'AWS Elastic Beanstalk', ro: 'AWS Elastic Beanstalk' },
      { en: 'AWS CloudFormation', ro: 'AWS CloudFormation' },
      { en: 'Amazon ECS on EC2', ro: 'Amazon ECS pe EC2' },
    ],
    correct: 1,
    explanation: {
      en: 'Elastic Beanstalk is AWS’s PaaS: you upload code and it automatically provisions capacity, configures load balancing and auto scaling, and monitors health — while you still keep full control of the resources. Plain EC2 requires you to manage the servers, OS, and scaling yourself. CloudFormation is an infrastructure-as-code provisioning tool, not a deploy-my-code platform. ECS on EC2 runs containers but still requires you to manage the EC2 cluster. Beanstalk best matches the upload-and-go requirement.',
      ro: 'Elastic Beanstalk este PaaS-ul AWS: încarci codul și el provizionează automat capacitatea, configurează load balancing-ul și auto scaling-ul și monitorizează starea — în timp ce tu păstrezi totuși controlul deplin asupra resurselor. EC2 simplu îți cere să gestionezi singur serverele, sistemul de operare și scalarea. CloudFormation este un instrument de provizionare infrastructure-as-code, nu o platformă de tip „deployează-mi codul”. ECS pe EC2 rulează containere dar îți cere totuși să gestionezi clusterul EC2. Beanstalk se potrivește cel mai bine cerinței de „încarcă și pornește”.',
    },
    optionExplanations: [
      { en: 'Incorrect — Plain EC2 requires you to manage the servers, OS, scaling, and load balancing yourself, which is not PaaS.', ro: 'Greșit — EC2 simplu îți cere să gestionezi singur serverele, sistemul de operare, scalarea și load balancing-ul, ceea ce nu este PaaS.' },
      { en: 'Correct — Elastic Beanstalk is PaaS: upload your code and AWS handles provisioning, load balancing, scaling, and health monitoring.', ro: 'Corect — Elastic Beanstalk este PaaS: încarci codul și AWS gestionează provizionarea, load balancing-ul, scalarea și monitorizarea stării.' },
      { en: 'Incorrect — CloudFormation is infrastructure-as-code provisioning, not a platform for simply deploying application code.', ro: 'Greșit — CloudFormation este provizionare infrastructure-as-code, nu o platformă pentru deployarea simplă a codului aplicației.' },
      { en: 'Incorrect — ECS on EC2 runs containers but still requires you to manage the underlying EC2 cluster.', ro: 'Greșit — ECS pe EC2 rulează containere dar îți cere totuși să gestionezi clusterul EC2 subiacent.' },
    ],
    references: [
      { label: 'What is AWS Elastic Beanstalk?', url: 'https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/Welcome.html' },
    ],
    relatedServices: ['beanstalk', 'ec2', 'cloudformation', 'ecs'],
  },
  {
    id: 'pex-tech-3',
    type: 'multiple_choice',
    difficulty: 3,
    categories: ['database'],
    examDomain: 'tech-services',
    source: 'maarek',
    question: {
      en: 'A read-heavy application repeatedly runs the same expensive database queries, putting load on the database. The team wants to add an in-memory caching layer to serve frequent reads with microsecond latency and offload the database. Which AWS service should they use?',
      ro: 'O aplicație cu multe citiri rulează în mod repetat aceleași interogări costisitoare de bază de date, punând presiune pe baza de date. Echipa vrea să adauge un strat de cache în memorie pentru a servi citirile frecvente cu latență de microsecunde și a degreva baza de date. Ce serviciu AWS ar trebui să folosească?',
    },
    options: [
      { en: 'Amazon RDS Read Replica', ro: 'Read Replica Amazon RDS' },
      { en: 'Amazon ElastiCache', ro: 'Amazon ElastiCache' },
      { en: 'Amazon Redshift', ro: 'Amazon Redshift' },
      { en: 'Amazon S3', ro: 'Amazon S3' },
    ],
    correct: 1,
    explanation: {
      en: 'Amazon ElastiCache provides a managed in-memory cache (Redis or Memcached) that stores frequent query results in RAM, serving repeated reads with sub-millisecond/microsecond latency and offloading the database. An RDS Read Replica scales reads but still queries disk-backed databases, not an in-memory cache. Redshift is a data-warehouse for analytics, not a low-latency cache. S3 is object storage, not a query cache. ElastiCache is the in-memory caching service.',
      ro: 'Amazon ElastiCache oferă un cache managed în memorie (Redis sau Memcached) care stochează rezultatele interogărilor frecvente în RAM, servind citirile repetate cu latență sub-milisecundă/microsecunde și degrevând baza de date. Un Read Replica RDS scalează citirile dar tot interoghează baze de date pe disc, nu un cache în memorie. Redshift este un data warehouse pentru analiză, nu un cache cu latență mică. S3 este object storage, nu un cache de interogări. ElastiCache este serviciul de caching în memorie.',
    },
    optionExplanations: [
      { en: 'Incorrect — A Read Replica scales read traffic but still queries a disk-backed database, not an in-memory cache.', ro: 'Greșit — Un Read Replica scalează traficul de citire dar tot interoghează o bază de date pe disc, nu un cache în memorie.' },
      { en: 'Correct — ElastiCache is a managed in-memory cache that serves frequent reads with microsecond latency and offloads the database.', ro: 'Corect — ElastiCache este un cache managed în memorie care servește citirile frecvente cu latență de microsecunde și degrevează baza de date.' },
      { en: 'Incorrect — Redshift is a data warehouse for analytics queries, not a low-latency in-memory cache.', ro: 'Greșit — Redshift este un data warehouse pentru interogări analitice, nu un cache în memorie cu latență mică.' },
      { en: 'Incorrect — S3 is object storage accessed via API; it is not a database query cache.', ro: 'Greșit — S3 este object storage accesat prin API; nu este un cache de interogări de bază de date.' },
    ],
    references: [
      { label: 'What is Amazon ElastiCache?', url: 'https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/WhatIs.html' },
    ],
    relatedServices: ['elasticache', 'rds', 'redshift'],
  },
  {
    id: 'pex-tech-4',
    type: 'multiple_choice',
    difficulty: 3,
    categories: ['networking'],
    examDomain: 'tech-services',
    source: 'aws-docs',
    question: {
      en: 'A bank needs a DEDICATED, private network connection from its on-premises data center to AWS that does NOT traverse the public internet, to get consistent low latency and high bandwidth for large data transfers. Which service provides this?',
      ro: 'O bancă are nevoie de o conexiune de rețea privată DEDICATĂ din centrul său de date on-premises către AWS care să NU treacă prin internetul public, pentru a obține latență mică constantă și lățime de bandă mare pentru transferuri mari de date. Ce serviciu oferă asta?',
    },
    options: [
      { en: 'AWS Site-to-Site VPN', ro: 'AWS Site-to-Site VPN' },
      { en: 'AWS Direct Connect', ro: 'AWS Direct Connect' },
      { en: 'Amazon CloudFront', ro: 'Amazon CloudFront' },
      { en: 'AWS Global Accelerator', ro: 'AWS Global Accelerator' },
    ],
    correct: 1,
    explanation: {
      en: 'AWS Direct Connect establishes a dedicated, private physical link between on-premises and AWS that bypasses the public internet, giving consistent low latency and high, stable bandwidth — ideal for large, ongoing transfers. A Site-to-Site VPN is encrypted but runs OVER the public internet, so it cannot guarantee the same consistency. CloudFront is a CDN for caching content at edge locations, and Global Accelerator routes user traffic over the AWS backbone — neither is a private on-prem-to-AWS link. Direct Connect is the dedicated private connection.',
      ro: 'AWS Direct Connect stabilește o legătură fizică privată dedicată între on-premises și AWS care ocolește internetul public, oferind latență mică constantă și lățime de bandă mare și stabilă — ideal pentru transferuri mari, continue. Un Site-to-Site VPN este criptat dar rulează PESTE internetul public, deci nu poate garanta aceeași consistență. CloudFront este un CDN pentru caching de conținut la edge location-uri, iar Global Accelerator rutează traficul utilizatorilor peste backbone-ul AWS — niciunul nu este o legătură privată de la on-prem la AWS. Direct Connect este conexiunea privată dedicată.',
    },
    optionExplanations: [
      { en: 'Incorrect — A Site-to-Site VPN is encrypted but runs over the public internet, so it cannot guarantee consistent latency and bandwidth.', ro: 'Greșit — Un Site-to-Site VPN este criptat dar rulează peste internetul public, deci nu poate garanta latență și lățime de bandă constante.' },
      { en: 'Correct — Direct Connect is a dedicated private physical link that bypasses the public internet for consistent low latency and high bandwidth.', ro: 'Corect — Direct Connect este o legătură fizică privată dedicată care ocolește internetul public pentru latență mică constantă și lățime de bandă mare.' },
      { en: 'Incorrect — CloudFront is a content delivery network that caches content at edge locations, not a private on-prem link.', ro: 'Greșit — CloudFront este o rețea de livrare de conținut care face caching la edge location-uri, nu o legătură privată on-prem.' },
      { en: 'Incorrect — Global Accelerator routes user traffic over the AWS backbone; it is not a dedicated on-prem-to-AWS connection.', ro: 'Greșit — Global Accelerator rutează traficul utilizatorilor peste backbone-ul AWS; nu este o conexiune dedicată de la on-prem la AWS.' },
    ],
    references: [
      { label: 'What is AWS Direct Connect?', url: 'https://docs.aws.amazon.com/directconnect/latest/UserGuide/Welcome.html' },
    ],
    relatedServices: ['directconnect', 'cloudfront', 'globalaccelerator'],
  },
  {
    id: 'pex-tech-5',
    type: 'multiple_choice',
    difficulty: 2,
    categories: ['management'],
    examDomain: 'tech-services',
    source: 'aws-docs',
    question: {
      en: 'A compliance officer needs an audit log of WHO made which AWS API calls (for example, who deleted a security group and when) across the account. Which service records this account activity?',
      ro: 'Un ofițer de conformitate are nevoie de un jurnal de audit cu CINE a făcut ce apeluri API AWS (de exemplu, cine a șters un security group și când) în întregul cont. Ce serviciu înregistrează această activitate a contului?',
    },
    options: [
      { en: 'Amazon CloudWatch', ro: 'Amazon CloudWatch' },
      { en: 'AWS CloudTrail', ro: 'AWS CloudTrail' },
      { en: 'AWS Config', ro: 'AWS Config' },
      { en: 'AWS Trusted Advisor', ro: 'AWS Trusted Advisor' },
    ],
    correct: 1,
    explanation: {
      en: 'AWS CloudTrail records API activity — who made each call, from where, and when — providing the audit trail of account actions like deleting a security group. CloudWatch collects metrics, logs, and alarms about performance, not an identity-stamped API audit log. AWS Config tracks resource configuration state and compliance over time, answering "what does this resource look like" rather than "who called the API". Trusted Advisor gives best-practice recommendations. For an API audit trail, CloudTrail is the answer.',
      ro: 'AWS CloudTrail înregistrează activitatea API — cine a făcut fiecare apel, de unde și când — oferind pista de audit a acțiunilor din cont, precum ștergerea unui security group. CloudWatch colectează metrici, loguri și alarme despre performanță, nu un jurnal de audit API cu identitate. AWS Config urmărește starea configurației resurselor și conformitatea în timp, răspunzând la „cum arată această resursă” mai degrabă decât „cine a apelat API-ul”. Trusted Advisor oferă recomandări de best practice. Pentru o pistă de audit API, CloudTrail este răspunsul.',
    },
    optionExplanations: [
      { en: 'Incorrect — CloudWatch collects metrics, logs, and alarms about performance, not an identity-stamped API audit log.', ro: 'Greșit — CloudWatch colectează metrici, loguri și alarme despre performanță, nu un jurnal de audit API cu identitate.' },
      { en: 'Correct — CloudTrail records who made which API calls and when, providing the account-activity audit trail.', ro: 'Corect — CloudTrail înregistrează cine a făcut ce apeluri API și când, oferind pista de audit a activității contului.' },
      { en: 'Incorrect — AWS Config tracks resource configuration and compliance state, not who invoked an API call.', ro: 'Greșit — AWS Config urmărește configurația resurselor și starea de conformitate, nu cine a invocat un apel API.' },
      { en: 'Incorrect — Trusted Advisor gives best-practice recommendations; it does not log API activity.', ro: 'Greșit — Trusted Advisor oferă recomandări de best practice; nu înregistrează activitatea API.' },
    ],
    references: [
      { label: 'What is AWS CloudTrail?', url: 'https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html' },
    ],
    relatedServices: ['cloudtrail', 'cloudwatch', 'config'],
  },
  {
    id: 'pex-tech-6',
    type: 'multiple_choice',
    difficulty: 2,
    categories: ['storage'],
    examDomain: 'tech-services',
    source: 'maarek',
    question: {
      en: 'A company has 80 TB of data in an on-premises data center that they need to move to Amazon S3, but their internet upload would take many weeks. They want a secure, offline, physical device to ship the data to AWS. Which service is designed for this bulk offline transfer?',
      ro: 'O companie are 80 TB de date într-un centru de date on-premises pe care trebuie să le mute în Amazon S3, dar încărcarea prin internet ar dura multe săptămâni. Vor un dispozitiv fizic securizat, offline, pentru a expedia datele la AWS. Ce serviciu este conceput pentru acest transfer offline în masă?',
    },
    options: [
      { en: 'AWS Snowball', ro: 'AWS Snowball' },
      { en: 'Amazon S3 Transfer Acceleration', ro: 'Amazon S3 Transfer Acceleration' },
      { en: 'AWS Direct Connect', ro: 'AWS Direct Connect' },
      { en: 'AWS Storage Gateway', ro: 'AWS Storage Gateway' },
    ],
    correct: 0,
    explanation: {
      en: 'AWS Snowball is a rugged, physical appliance you load with data on-premises and ship to AWS, ideal for moving terabytes-to-petabytes offline when network transfer would be too slow. S3 Transfer Acceleration speeds internet uploads but still depends on your bandwidth, so it would not beat the multi-week problem. Direct Connect is a dedicated network link, not an offline shipping device. Storage Gateway provides ongoing hybrid storage access, not a one-time bulk physical migration. Snowball is the offline bulk-transfer service.',
      ro: 'AWS Snowball este un dispozitiv fizic robust pe care îl încarci cu date on-premises și îl expediezi la AWS, ideal pentru a muta terabytes-până-la-petabytes offline când transferul prin rețea ar fi prea lent. S3 Transfer Acceleration accelerează încărcările prin internet dar tot depinde de lățimea ta de bandă, deci nu ar rezolva problema de multe săptămâni. Direct Connect este o legătură de rețea dedicată, nu un dispozitiv de expediere offline. Storage Gateway oferă acces hibrid continuu la stocare, nu o migrare fizică în masă o singură dată. Snowball este serviciul de transfer offline în masă.',
    },
    optionExplanations: [
      { en: 'Correct — AWS Snowball is a physical appliance you load on-premises and ship to AWS for bulk offline data transfer.', ro: 'Corect — AWS Snowball este un dispozitiv fizic pe care îl încarci on-premises și îl expediezi la AWS pentru transfer offline în masă.' },
      { en: 'Incorrect — S3 Transfer Acceleration speeds internet uploads but still depends on your bandwidth, so it would still be slow here.', ro: 'Greșit — S3 Transfer Acceleration accelerează încărcările prin internet dar tot depinde de lățimea ta de bandă, deci ar fi tot lent aici.' },
      { en: 'Incorrect — Direct Connect is a dedicated network link, not an offline physical shipping device for a one-time bulk move.', ro: 'Greșit — Direct Connect este o legătură de rețea dedicată, nu un dispozitiv fizic offline de expediere pentru o mutare în masă o singură dată.' },
      { en: 'Incorrect — Storage Gateway provides ongoing hybrid storage access, not a one-time bulk physical migration.', ro: 'Greșit — Storage Gateway oferă acces hibrid continuu la stocare, nu o migrare fizică în masă o singură dată.' },
    ],
    references: [
      { label: 'AWS Snowball', url: 'https://docs.aws.amazon.com/snowball/latest/developer-guide/whatissnowball.html' },
    ],
    relatedServices: ['snow', 's3', 'storagegateway', 'directconnect'],
  },
  {
    id: 'pex-tech-7',
    type: 'multiple_choice',
    difficulty: 1,
    categories: ['storage'],
    examDomain: 'tech-services',
    source: 'aws-docs',
    question: {
      en: 'A team stores objects in Amazon S3 but has unpredictable, changing access patterns and does not want to manually move data between storage tiers to save cost. Which S3 storage class automatically moves objects between access tiers based on usage?',
      ro: 'O echipă stochează obiecte în Amazon S3 dar are tipare de acces imprevizibile, în schimbare, și nu vrea să mute manual datele între tieruri de stocare pentru a economisi cost. Ce clasă de stocare S3 mută automat obiectele între tieruri de acces în funcție de utilizare?',
    },
    options: [
      { en: 'S3 Standard', ro: 'S3 Standard' },
      { en: 'S3 Intelligent-Tiering', ro: 'S3 Intelligent-Tiering' },
      { en: 'S3 Glacier Deep Archive', ro: 'S3 Glacier Deep Archive' },
      { en: 'S3 One Zone-Infrequent Access', ro: 'S3 One Zone-Infrequent Access' },
    ],
    correct: 1,
    explanation: {
      en: 'S3 Intelligent-Tiering automatically moves objects between frequent- and infrequent-access tiers based on how they are used, optimizing cost with no manual effort and no retrieval fees for the moves — perfect for unpredictable access patterns. S3 Standard is a single tier with no automatic movement. Glacier Deep Archive is the lowest-cost archival class with long retrieval times, meant for rarely-accessed data, not changing patterns. One Zone-IA is cheaper but stores in a single AZ and still requires you to choose it deliberately. Intelligent-Tiering is the automatic option.',
      ro: 'S3 Intelligent-Tiering mută automat obiectele între tierurile de acces frecvent și infrecvent în funcție de cum sunt folosite, optimizând costul fără efort manual și fără taxe de recuperare pentru mutări — perfect pentru tipare de acces imprevizibile. S3 Standard este un singur tier fără mutare automată. Glacier Deep Archive este clasa de arhivă cu cel mai mic cost și timpi lungi de recuperare, destinată datelor accesate rar, nu tiparelor în schimbare. One Zone-IA este mai ieftin dar stochează într-un singur AZ și tot trebuie să îl alegi deliberat. Intelligent-Tiering este opțiunea automată.',
    },
    optionExplanations: [
      { en: 'Incorrect — S3 Standard is a single tier and does not automatically move objects between access tiers.', ro: 'Greșit — S3 Standard este un singur tier și nu mută automat obiectele între tieruri de acces.' },
      { en: 'Correct — S3 Intelligent-Tiering automatically moves objects between access tiers based on usage to optimize cost.', ro: 'Corect — S3 Intelligent-Tiering mută automat obiectele între tieruri de acces în funcție de utilizare pentru a optimiza costul.' },
      { en: 'Incorrect — Glacier Deep Archive is a low-cost archival class with long retrieval times for rarely-accessed data, not automatic tiering.', ro: 'Greșit — Glacier Deep Archive este o clasă de arhivă cu cost mic și timpi lungi de recuperare pentru date accesate rar, nu tiering automat.' },
      { en: 'Incorrect — One Zone-IA is a cheaper single-AZ class you choose deliberately; it does not auto-move objects between tiers.', ro: 'Greșit — One Zone-IA este o clasă mai ieftină într-un singur AZ pe care o alegi deliberat; nu mută automat obiectele între tieruri.' },
    ],
    references: [
      { label: 'Amazon S3 storage classes', url: 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html' },
    ],
    relatedServices: ['s3', 'glacier'],
  },

  // ───────────────────────────── Billing & Support (2) ─────────────────────────────
  {
    id: 'pex-bill-1',
    type: 'multiple_choice',
    difficulty: 1,
    categories: ['billing'],
    examDomain: 'billing-support',
    source: 'aws-docs',
    question: {
      en: 'Before deploying a new architecture, a finance team wants to ESTIMATE the monthly AWS cost based on the specific services and configurations they plan to use. Which AWS tool is designed to create this upfront cost estimate?',
      ro: 'Înainte de a deploya o arhitectură nouă, o echipă de finanțe vrea să ESTIMEZE costul lunar AWS pe baza serviciilor și configurațiilor specifice pe care plănuiesc să le folosească. Ce instrument AWS este conceput pentru a crea această estimare de cost în avans?',
    },
    options: [
      { en: 'AWS Cost Explorer', ro: 'AWS Cost Explorer' },
      { en: 'AWS Pricing Calculator', ro: 'AWS Pricing Calculator' },
      { en: 'AWS Budgets', ro: 'AWS Budgets' },
      { en: 'AWS Cost and Usage Report (CUR)', ro: 'AWS Cost and Usage Report (CUR)' },
    ],
    correct: 1,
    explanation: {
      en: 'The AWS Pricing Calculator lets you model a planned architecture and estimate its cost BEFORE you build anything, by selecting services and configurations. Cost Explorer visualizes and analyzes your PAST and current actual spend, not a pre-build estimate. AWS Budgets alerts you when actual or forecasted spend crosses a threshold. The Cost and Usage Report is the most granular record of incurred charges. Only the Pricing Calculator is meant for upfront estimation.',
      ro: 'AWS Pricing Calculator îți permite să modelezi o arhitectură planificată și să îi estimezi costul ÎNAINTE de a construi ceva, selectând servicii și configurații. Cost Explorer vizualizează și analizează cheltuiala ta efectivă TRECUTĂ și curentă, nu o estimare de dinainte de construire. AWS Budgets te alertează când cheltuiala efectivă sau prognozată depășește un prag. Cost and Usage Report este înregistrarea cea mai granulară a costurilor deja înregistrate. Doar Pricing Calculator este destinat estimării în avans.',
    },
    optionExplanations: [
      { en: 'Incorrect — Cost Explorer visualizes your past and current actual spend, not a pre-deployment estimate.', ro: 'Greșit — Cost Explorer vizualizează cheltuiala ta efectivă trecută și curentă, nu o estimare de dinainte de deployment.' },
      { en: 'Correct — The AWS Pricing Calculator estimates the cost of a planned architecture before you build it.', ro: 'Corect — AWS Pricing Calculator estimează costul unei arhitecturi planificate înainte de a o construi.' },
      { en: 'Incorrect — AWS Budgets alerts on actual or forecasted spend thresholds; it does not produce a pre-build estimate.', ro: 'Greșit — AWS Budgets alertează la praguri de cheltuială efectivă sau prognozată; nu produce o estimare de dinainte de construire.' },
      { en: 'Incorrect — The Cost and Usage Report is the most granular record of charges already incurred, not a forward estimate.', ro: 'Greșit — Cost and Usage Report este înregistrarea cea mai granulară a costurilor deja înregistrate, nu o estimare în avans.' },
    ],
    references: [
      { label: 'AWS Pricing Calculator', url: 'https://docs.aws.amazon.com/pricing-calculator/latest/userguide/what-is-pricing-calculator.html' },
    ],
    relatedServices: ['calculator', 'costexplorer', 'budgets'],
  },
  {
    id: 'pex-bill-2',
    type: 'multiple_choice',
    difficulty: 2,
    categories: ['billing'],
    examDomain: 'billing-support',
    source: 'aws-docs',
    question: {
      en: 'A company reviewing its AWS bill notices a significant charge for data transfer. In the standard AWS pricing model, which type of data transfer is the one that typically incurs the most cost?',
      ro: 'O companie care își revizuiește factura AWS observă o taxă semnificativă pentru transferul de date. În modelul standard de prețuri AWS, ce tip de transfer de date este cel care în mod tipic generează cel mai mult cost?',
    },
    options: [
      { en: 'Data transfer INTO AWS from the internet (inbound)', ro: 'Transferul de date ÎN AWS dinspre internet (inbound)' },
      { en: 'Data transfer OUT of AWS to the internet (outbound)', ro: 'Transferul de date ÎN AFARA AWS către internet (outbound)' },
      { en: 'Data transfer between two services in the same Availability Zone', ro: 'Transferul de date între două servicii din același Availability Zone' },
      { en: 'Data stored at rest in Amazon S3', ro: 'Datele stocate în repaus în Amazon S3' },
    ],
    correct: 1,
    explanation: {
      en: 'In AWS pricing, data transfer OUT to the internet (outbound/egress) is the key cost driver and is billed per GB beyond the free allowance, while inbound transfer INTO AWS is generally free. Same-AZ traffic between services is typically free, and data at rest is a storage charge, not a transfer charge. Remembering "IN is usually free, OUT costs money" is a common exam point, so outbound transfer is the correct answer.',
      ro: 'În prețurile AWS, transferul de date ÎN AFARA, către internet (outbound/egress) este principalul factor de cost și se facturează per GB peste alocarea gratuită, în timp ce transferul inbound ÎN AWS este în general gratuit. Traficul în același AZ între servicii este de obicei gratuit, iar datele în repaus reprezintă o taxă de stocare, nu o taxă de transfer. Reținerea „IN este de obicei gratuit, OUT costă bani” este un punct comun de examen, deci transferul outbound este răspunsul corect.',
    },
    optionExplanations: [
      { en: 'Incorrect — Inbound data transfer INTO AWS from the internet is generally free, so it is not the main cost.', ro: 'Greșit — Transferul inbound de date ÎN AWS dinspre internet este în general gratuit, deci nu este costul principal.' },
      { en: 'Correct — Data transfer OUT to the internet (egress) is the key cost driver, billed per GB beyond the free allowance.', ro: 'Corect — Transferul de date ÎN AFARA, către internet (egress) este principalul factor de cost, facturat per GB peste alocarea gratuită.' },
      { en: 'Incorrect — Traffic between services in the same Availability Zone is typically free, not a major cost.', ro: 'Greșit — Traficul între servicii din același Availability Zone este de obicei gratuit, nu un cost major.' },
      { en: 'Incorrect — Data at rest in S3 is a storage charge, not a data-transfer charge.', ro: 'Greșit — Datele în repaus în S3 reprezintă o taxă de stocare, nu o taxă de transfer de date.' },
    ],
    references: [
      { label: 'Amazon S3 pricing — Data transfer', url: 'https://aws.amazon.com/s3/pricing/' },
    ],
    relatedServices: ['s3'],
  },
];
