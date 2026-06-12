import type { QuizQuestion } from '@/types';

/**
 * Original CLF-C02 practice questions — Domain 4: Billing, Pricing and Support (12% of exam).
 * Exam-style questions written from AWS documentation + Stephane Maarek course.
 * Not actual exam questions (the real exam is under NDA). Each explanation says
 * why the correct answer is right and why the distractors are wrong.
 */
export const practiceBillingQuestions: QuizQuestion[] = [
  {
    id: 'pbill-1',
    type: 'multiple_choice',
    difficulty: 1,
    categories: ['billing'],
    examDomain: 'billing-support',
    source: 'aws-docs',
    question: {
      en: 'A startup wants to be ALERTED automatically when its monthly AWS spend is forecast to exceed $1,000, before the money is actually spent. Which service should they use?',
      ro: 'Un startup vrea să fie ALERTAT automat când cheltuiala lunară AWS e prognozată să depășească $1.000, înainte ca banii să fie efectiv cheltuiți. Ce serviciu ar trebui să folosească?',
    },
    options: [
      { en: 'AWS Cost Explorer', ro: 'AWS Cost Explorer' },
      { en: 'AWS Budgets', ro: 'AWS Budgets' },
      { en: 'AWS Pricing Calculator', ro: 'AWS Pricing Calculator' },
      { en: 'AWS Cost and Usage Report (CUR)', ro: 'AWS Cost and Usage Report (CUR)' },
    ],
    correct: 1,
    explanation: {
      en: '**AWS Budgets** is correct: it lets you set a custom cost/usage limit and sends a proactive alert when you exceed it OR are forecast to exceed it — exactly the "warn me before it happens" use case. **Cost Explorer** only visualizes and forecasts past/current spend (you look at the data, it does not alert you). **Pricing Calculator** estimates cost BEFORE you build anything, so it cannot watch live spend. **CUR** is the most detailed billing data export for deep analysis, but it is a report, not an alerting tool.',
      ro: '**AWS Budgets** e corect: îți permite să setezi o limită custom de cost/usage și trimite o alertă proactivă când o depășești SAU când ești prognozat să o depășești — exact cazul "avertizează-mă înainte să se întâmple". **Cost Explorer** doar vizualizează și prognozează cheltuiala trecută/curentă (te uiți la date, nu te alertează). **Pricing Calculator** estimează costul ÎNAINTE să construiești ceva, deci nu poate urmări cheltuiala live. **CUR** e cel mai detaliat export de date de facturare pentru analiză, dar e un raport, nu un instrument de alertare.',
    },
    relatedServices: ['budgets', 'costexplorer', 'calculator'],
    relatedConcepts: ['pricing-fundamentals'],
  },
  {
    id: 'pbill-2',
    type: 'multiple_choice',
    difficulty: 2,
    categories: ['support'],
    examDomain: 'billing-support',
    source: 'aws-docs',
    question: {
      en: 'A cloud team wants free automated recommendations across cost optimization, performance, security, fault tolerance, and service limits. Which AWS tool provides checks across exactly these 5 categories?',
      ro: 'O echipă cloud vrea recomandări automate gratuite pe cost optimization, performanță, securitate, fault tolerance și service limits. Ce tool AWS oferă checks pe exact aceste 5 categorii?',
    },
    options: [
      { en: 'AWS Trusted Advisor', ro: 'AWS Trusted Advisor' },
      { en: 'AWS Cost Explorer', ro: 'AWS Cost Explorer' },
      { en: 'AWS Health Dashboard', ro: 'AWS Health Dashboard' },
      { en: 'AWS Config', ro: 'AWS Config' },
    ],
    correct: 0,
    explanation: {
      en: '**AWS Trusted Advisor** is correct: it inspects your account and gives recommendations across its 5 categories — Cost Optimization, Performance, Security, Fault Tolerance, and Service Limits (full checks require a Business or Enterprise support plan; Basic gets only a core subset). **Cost Explorer** only analyzes spend, not security or fault tolerance. **AWS Health Dashboard** reports the health/status of AWS services and events affecting you, not best-practice checks. **AWS Config** records and evaluates resource configuration compliance, but it is not the 5-category advisor described here.',
      ro: '**AWS Trusted Advisor** e corect: îți inspectează contul și oferă recomandări pe cele 5 categorii ale sale — Cost Optimization, Performance, Security, Fault Tolerance și Service Limits (checks-urile complete necesită un plan de support Business sau Enterprise; Basic primește doar un subset de bază). **Cost Explorer** analizează doar cheltuiala, nu securitatea sau fault tolerance. **AWS Health Dashboard** raportează starea/statusul serviciilor AWS și evenimentele care te afectează, nu checks de bune practici. **AWS Config** înregistrează și evaluează conformitatea configurației resurselor, dar nu e advisorul pe 5 categorii descris aici.',
    },
    relatedServices: ['trustedadvisor'],
  },
  {
    id: 'pbill-3',
    type: 'multiple_choice',
    difficulty: 3,
    categories: ['support'],
    examDomain: 'billing-support',
    source: 'maarek',
    question: {
      en: 'A large enterprise running business-critical workloads needs a designated Technical Account Manager (TAM), access to AWS Concierge, and the fastest response time (under 15 minutes) for business-critical system-down cases. Which AWS Support plan is required?',
      ro: 'O companie mare cu workload-uri business-critical are nevoie de un Technical Account Manager (TAM) desemnat, acces la AWS Concierge și cel mai rapid timp de răspuns (sub 15 minute) pentru cazuri business-critical system-down. Ce plan de AWS Support e necesar?',
    },
    options: [
      { en: 'Developer', ro: 'Developer' },
      { en: 'Business', ro: 'Business' },
      { en: 'Enterprise', ro: 'Enterprise' },
      { en: 'Basic', ro: 'Basic' },
    ],
    correct: 2,
    explanation: {
      en: '**Enterprise** is correct: it is the only plan that includes a designated Technical Account Manager (TAM), the Concierge support team, and a < 15-minute response time for business-critical cases. **Business** gives 24/7 phone/chat/email access to a Cloud Support Engineer, full Trusted Advisor, and < 1-hour response for production-down — but no TAM and no 15-minute SLA. **Developer** only offers business-hours email guidance and no 24/7 access. **Basic** is free and provides documentation, forums, and core Trusted Advisor checks, with no technical case support at all.',
      ro: '**Enterprise** e corect: e singurul plan care include un Technical Account Manager (TAM) desemnat, echipa de suport Concierge și un timp de răspuns < 15 minute pentru cazurile business-critical. **Business** oferă acces 24/7 prin telefon/chat/email la un Cloud Support Engineer, Trusted Advisor complet și răspuns < 1 oră pentru production-down — dar fără TAM și fără SLA de 15 minute. **Developer** oferă doar îndrumare pe email în timpul orelor de program și fără acces 24/7. **Basic** e gratuit și oferă documentație, forumuri și checks de bază din Trusted Advisor, fără niciun suport tehnic pe cazuri.',
    },
    relatedServices: ['supportplans'],
    relatedConcepts: ['support-plans'],
  },
  {
    id: 'pbill-4',
    type: 'multiple_choice',
    difficulty: 2,
    categories: ['billing', 'pricing'],
    examDomain: 'billing-support',
    source: 'aws-docs',
    question: {
      en: 'A company runs dozens of AWS accounts under AWS Organizations. What is a key billing benefit of using consolidated billing?',
      ro: 'O companie rulează zeci de conturi AWS sub AWS Organizations. Care e un beneficiu cheie de facturare al folosirii consolidated billing?',
    },
    options: [
      { en: 'Each member account automatically gets free Enterprise Support', ro: 'Fiecare cont membru primește automat Enterprise Support gratuit' },
      { en: 'One bill for all accounts, with volume discounts and Reserved Instance / Savings Plan benefits shared across the aggregated usage', ro: 'O singură factură pentru toate conturile, cu volume discounts și beneficii Reserved Instance / Savings Plan partajate pe usage-ul agregat' },
      { en: 'Data transfer out of AWS becomes completely free', ro: 'Transferul de date OUT din AWS devine complet gratuit' },
      { en: 'AWS Budgets alerts are disabled to simplify billing', ro: 'Alertele AWS Budgets sunt dezactivate pentru a simplifica facturarea' },
    ],
    correct: 1,
    explanation: {
      en: 'Consolidated billing through **AWS Organizations** produces one bill across many accounts, and because usage is aggregated, you reach volume-pricing tiers faster and can share Reserved Instance / Savings Plan discounts across accounts — option 2 is correct. Free Enterprise Support is wrong: support plans are paid and chosen per the payer account, never granted automatically. "Data transfer out becomes free" is wrong: outbound data transfer is a core cost driver and is still charged. "Budgets alerts are disabled" is wrong: Budgets keeps working and is in fact more useful across a consolidated organization.',
      ro: 'Consolidated billing prin **AWS Organizations** produce o singură factură pe mai multe conturi, iar pentru că usage-ul e agregat, atingi mai repede pragurile de volume pricing și poți partaja reducerile Reserved Instance / Savings Plan între conturi — opțiunea 2 e corectă. Enterprise Support gratuit e greșit: planurile de support sunt plătite și alese la nivelul contului payer, niciodată acordate automat. "Transferul OUT devine gratuit" e greșit: transferul de date outbound e un cost driver principal și se taxează în continuare. "Alertele Budgets sunt dezactivate" e greșit: Budgets funcționează în continuare și e chiar mai util într-o organizație consolidată.',
    },
    relatedServices: ['organizations', 'budgets'],
    relatedConcepts: ['pricing-fundamentals'],
  },
];
