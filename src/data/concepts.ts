import type { Concept } from '@/types';

/**
 * AWS Cloud Practitioner (CLF-C02) core concepts beyond individual services.
 * Source: AWS official docs + Stephane Maarek CLF-C02 PDF + AWS exam guide.
 */

const globalInfrastructure: Concept[] = [
  {
    id: 'regions',
    title: { en: 'AWS Regions', ro: 'Regiuni AWS' },
    tagline: {
      en: 'Geographic clusters of data centers — independent and isolated.',
      ro: 'Clustere geografice de data centers — independente și izolate.',
    },
    topic: 'global-infrastructure',
    aliases: ['region', 'regions', 'aws region', 'eu-west-1', 'us-east-1', 'data centers'],
    sections: [
      {
        heading: { en: 'What is a Region?', ro: 'Ce este o Regiune?' },
        body: {
          en: 'A Region is a separate geographic area in the world (e.g., us-east-1 in N. Virginia, eu-west-1 in Ireland). Each Region contains multiple, isolated, physically separate Availability Zones (AZs). As of 2024 there are 33 Regions and 105 Availability Zones globally.',
          ro: 'O Regiune este o zonă geografică separată în lume (ex: us-east-1 în Virginia, eu-west-1 în Irlanda). Fiecare Regiune conține mai multe AZ-uri (Availability Zones) izolate fizic. La 2024 sunt 33 de Regiuni și 105 AZ-uri global.',
        },
      },
      {
        heading: { en: 'How to choose a Region', ro: 'Cum alegi o Regiune' },
        body: {
          en: '- Compliance: data sovereignty laws (e.g., GDPR requires EU regions)\n- Latency: closer to users = faster\n- Available services: not every service is in every Region\n- Pricing: prices vary per Region (us-east-1 is usually cheapest)',
          ro: '- Compliance: legi de suveranitate date (GDPR cere regiuni EU)\n- Latență: mai aproape de utilizatori = mai rapid\n- Servicii disponibile: nu fiecare serviciu există în fiecare Regiune\n- Preț: variază pe Regiune (us-east-1 e de obicei cel mai ieftin)',
        },
      },
      {
        heading: { en: 'Region scope of services', ro: 'Scope-ul regional al serviciilor' },
        body: {
          en: '- Region-scoped: most services (EC2, RDS, S3 buckets, Lambda)\n- Global: IAM, Route 53, CloudFront, WAF, Organizations\n- AZ-scoped: EBS volumes, EC2 instances live in a specific AZ',
          ro: '- Regional: majoritatea (EC2, RDS, S3 buckets, Lambda)\n- Global: IAM, Route 53, CloudFront, WAF, Organizations\n- Per-AZ: volumele EBS, instanțele EC2 sunt într-un AZ specific',
        },
      },
    ],
    keyFacts: [
      { en: '33 Regions worldwide (2024).', ro: '33 de Regiuni global (2024).' },
      { en: 'Each Region is fully isolated from the others (no automatic data replication).', ro: 'Fiecare Regiune e complet izolată (fără replicare automată).' },
      { en: 'Region code format: 2-letter geo + direction + number (e.g., eu-central-1).', ro: 'Format cod regiune: 2 litere geo + direcție + număr (ex: eu-central-1).' },
      { en: 'Always check service availability before choosing a Region.', ro: 'Verifică mereu disponibilitatea serviciilor înainte să alegi.' },
    ],
    relatedConcepts: ['availability-zones', 'edge-locations', 'local-zones'],
    relatedServices: ['ec2', 's3', 'route53'],
    docsUrl: 'https://aws.amazon.com/about-aws/global-infrastructure/regions_az/',
    examFrequency: 'high',
  },
  {
    id: 'availability-zones',
    title: { en: 'Availability Zones (AZ)', ro: 'Availability Zones (AZ)' },
    tagline: {
      en: 'Isolated data centers within a Region — for high availability.',
      ro: 'Data centers izolate în interiorul unei Regiuni — pentru HA.',
    },
    topic: 'global-infrastructure',
    aliases: ['az', 'azs', 'availability zone', 'data center', 'multi-az', 'multi az'],
    sections: [
      {
        heading: { en: 'What is an AZ?', ro: 'Ce este un AZ?' },
        body: {
          en: 'An Availability Zone is one or more discrete data centers within a Region, each with redundant power, networking, and connectivity. AZs in a Region are physically separated by meaningful distance (km apart) but interconnected with low-latency, high-throughput, redundant private fiber.',
          ro: 'Un Availability Zone reprezintă unul sau mai multe data centers discrete dintr-o Regiune, fiecare cu alimentare, rețea și conectivitate redundante. AZ-urile din aceeași Regiune sunt separate fizic la distanță semnificativă (km), dar conectate cu fibră privată redundantă, de mare debit, latență mică.',
        },
      },
      {
        heading: { en: 'Why multiple AZs?', ro: 'De ce mai multe AZ-uri?' },
        body: {
          en: '- Fault isolation: if one AZ goes down (fire, flood, power outage), others keep running\n- High Availability (HA) architectures need at least 2 AZs\n- Multi-AZ RDS, EC2 Auto Scaling, ELB target groups all use AZs',
          ro: '- Izolare pe defecte: dacă un AZ cade (incendiu, inundație, oprire curent), restul merg\n- Arhitecturi High Availability (HA) au nevoie de minim 2 AZ-uri\n- Multi-AZ RDS, EC2 Auto Scaling, target groups ELB folosesc AZ-uri',
        },
      },
      {
        heading: { en: 'Numbers to remember', ro: 'Numere de reținut' },
        body: {
          en: '- Each Region has 3+ AZs (most have 3, some up to 6)\n- 105 total AZs globally (2024)\n- AZ code: Region + letter (e.g., eu-west-1a, eu-west-1b, eu-west-1c)\n- Each AZ contains 1+ physical data centers',
          ro: '- Fiecare Regiune are 3+ AZ-uri (majoritatea 3, unele până la 6)\n- 105 AZ-uri total global (2024)\n- Cod AZ: Regiune + literă (eu-west-1a, eu-west-1b, eu-west-1c)\n- Fiecare AZ conține 1+ data centers fizice',
        },
      },
      {
        heading: { en: 'AZ vs Region in practice', ro: 'AZ vs Regiune în practică' },
        body: {
          en: 'Multi-AZ = inside ONE Region, redundancy across data centers (synchronous, low latency). Multi-Region = redundancy across geographic regions (asynchronous, used for disaster recovery and global apps).',
          ro: 'Multi-AZ = în AceeAȘI Regiune, redundanță între data centers (sincron, latență mică). Multi-Region = redundanță între regiuni geografice (asincron, pentru disaster recovery și aplicații globale).',
        },
      },
    ],
    keyFacts: [
      { en: 'Each Region has at least 3 Availability Zones.', ro: 'Fiecare Regiune are minim 3 AZ-uri.' },
      { en: '105 AZs globally as of 2024.', ro: '105 AZ-uri global la 2024.' },
      { en: 'AZs are physically separate but connected with low-latency fiber.', ro: 'AZ-urile sunt fizic separate dar conectate prin fibră cu latență mică.' },
      { en: 'For HA you need to deploy across at least 2 AZs.', ro: 'Pentru HA trebuie să faci deploy peste minim 2 AZ-uri.' },
      { en: 'EC2 instances and EBS volumes live in ONE specific AZ.', ro: 'Instanțele EC2 și volumele EBS sunt într-un AZ specific.' },
      { en: 'EFS works across AZs; EBS does not.', ro: 'EFS funcționează cross-AZ; EBS nu.' },
    ],
    relatedConcepts: ['regions', 'edge-locations'],
    relatedServices: ['ec2', 'ebs', 'rds', 'elb', 'efs'],
    docsUrl: 'https://aws.amazon.com/about-aws/global-infrastructure/regions_az/',
    examFrequency: 'high',
  },
  {
    id: 'edge-locations',
    title: { en: 'Edge Locations', ro: 'Edge Locations' },
    tagline: {
      en: 'Hundreds of points of presence (PoPs) used by CloudFront and Route 53.',
      ro: 'Sute de puncte de prezență (PoPs) folosite de CloudFront și Route 53.',
    },
    topic: 'global-infrastructure',
    aliases: ['edge', 'pop', 'point of presence', 'cdn'],
    sections: [
      {
        heading: { en: 'What are Edge Locations?', ro: 'Ce sunt Edge Locations?' },
        body: {
          en: 'Edge Locations are smaller AWS facilities deployed in metropolitan areas worldwide that cache content closer to users. They are NOT full Regions or AZs — they only host a subset of services (mainly CloudFront, Route 53, AWS Shield, AWS WAF, Lambda@Edge).',
          ro: 'Edge Locations sunt facilități AWS mai mici, deployate în zone metropolitane global, care cache conținut mai aproape de utilizatori. NU sunt Regiuni sau AZ-uri — găzduiesc doar un subset de servicii (mai ales CloudFront, Route 53, Shield, WAF, Lambda@Edge).',
        },
      },
      {
        heading: { en: 'Numbers', ro: 'Numere' },
        body: {
          en: '- 450+ Edge Locations across 90+ cities in 40+ countries\n- 13+ Regional Edge Caches (intermediate cache between Edges and origins)',
          ro: '- 450+ Edge Locations în 90+ orașe din 40+ țări\n- 13+ Regional Edge Caches (cache intermediar între Edges și originile)',
        },
      },
    ],
    keyFacts: [
      { en: '450+ Edge Locations globally.', ro: '450+ Edge Locations global.' },
      { en: 'Used primarily by CloudFront (CDN) to cache content closer to users.', ro: 'Folosite în principal de CloudFront (CDN) pentru cache aproape de utilizatori.' },
      { en: 'Edge Locations are NOT full data centers; they cache only.', ro: 'Edge Locations NU sunt data centers complete; doar fac cache.' },
    ],
    relatedConcepts: ['regions', 'availability-zones'],
    relatedServices: ['cloudfront', 'route53', 'shield', 'waf'],
    docsUrl: 'https://aws.amazon.com/about-aws/global-infrastructure/',
    examFrequency: 'high',
  },
  {
    id: 'local-zones',
    title: { en: 'Local Zones, Wavelength & Outposts', ro: 'Local Zones, Wavelength & Outposts' },
    tagline: {
      en: 'Bring AWS closer to users — on-premises, 5G networks, or specific cities.',
      ro: 'Aduci AWS aproape de utilizatori — on-premises, rețele 5G sau orașe specifice.',
    },
    topic: 'global-infrastructure',
    aliases: ['local zone', 'wavelength', 'outpost', '5g', 'on-premises'],
    sections: [
      {
        heading: { en: 'AWS Local Zones', ro: 'AWS Local Zones' },
        body: {
          en: 'Mini-Regions deployed in major metropolitan areas (e.g., Los Angeles, Las Vegas, Houston) for ultra-low latency to end users. Useful for media/entertainment, gaming, real-time apps. Connected to a parent Region.',
          ro: 'Mini-Regiuni deployate în zone metropolitane mari (Los Angeles, Las Vegas, Houston) pentru latență ultra-mică la utilizatori. Utile pentru media, gaming, aplicații real-time. Conectate la o Regiune părinte.',
        },
      },
      {
        heading: { en: 'AWS Wavelength', ro: 'AWS Wavelength' },
        body: {
          en: 'AWS infrastructure embedded in 5G telecom networks (Verizon, KDDI, Vodafone). Provides single-digit millisecond latency for mobile apps — gaming, AR/VR, ML inference at the edge.',
          ro: 'Infrastructură AWS în rețele 5G ale operatorilor (Verizon, KDDI, Vodafone). Latență sub 10ms pentru aplicații mobile — gaming, AR/VR, ML inference la edge.',
        },
      },
      {
        heading: { en: 'AWS Outposts', ro: 'AWS Outposts' },
        body: {
          en: 'Physical racks of AWS hardware delivered to YOUR data center. You run AWS services on-premises with the same APIs and tools. Use cases: low-latency local processing, data residency, or hybrid migration in progress.',
          ro: 'Rack-uri fizice AWS livrate în data center-ul TĂU. Rulezi servicii AWS on-premises cu aceleași API-uri. Cazuri: procesare locală cu latență mică, data residency, migrare hibridă.',
        },
      },
    ],
    keyFacts: [
      { en: 'Local Zones: AWS closer to specific metropolitan areas.', ro: 'Local Zones: AWS aproape de zone metropolitane specifice.' },
      { en: 'Wavelength: AWS embedded in 5G carrier networks.', ro: 'Wavelength: AWS integrat în rețele 5G.' },
      { en: 'Outposts: AWS hardware racks running ON YOUR site.', ro: 'Outposts: rack-uri AWS rulând LA TINE pe site.' },
    ],
    relatedConcepts: ['regions', 'availability-zones'],
    relatedServices: ['outposts', 'ec2'],
    docsUrl: 'https://aws.amazon.com/about-aws/global-infrastructure/localzones/',
    examFrequency: 'medium',
  },
];

const sharedResponsibility: Concept[] = [
  {
    id: 'shared-responsibility',
    title: { en: 'Shared Responsibility Model', ro: 'Modelul Responsabilității Partajate' },
    tagline: {
      en: 'AWS secures the cloud; you secure what you put IN the cloud.',
      ro: 'AWS securizează cloud-ul; tu securizezi ce pui ÎN cloud.',
    },
    topic: 'shared-responsibility',
    aliases: ['shared responsibility', 'security', 'who is responsible', 'compliance'],
    sections: [
      {
        heading: { en: 'AWS responsibility — Security OF the cloud', ro: 'Responsabilitatea AWS — Securitatea CLOUD-ului' },
        body: {
          en: '- Physical hardware, data centers, regions, AZs, edge locations\n- Network infrastructure (cabling, switches, firewalls)\n- Hypervisor that runs your virtual machines\n- Managed service software (RDS database engine, S3 storage subsystem)\n- Patching of underlying infrastructure',
          ro: '- Hardware fizic, data centers, regiuni, AZ-uri, edge locations\n- Infrastructura de rețea (cabluri, switch-uri, firewall-uri)\n- Hipervizorul care rulează VM-urile tale\n- Software-ul serviciilor managed (motorul DB RDS, subsystem-ul S3)\n- Patching infrastructură subiacentă',
        },
      },
      {
        heading: { en: 'Your responsibility — Security IN the cloud', ro: 'Responsabilitatea ta — Securitatea ÎN cloud' },
        body: {
          en: '- Customer data (encryption, classification)\n- IAM users, groups, roles, policies\n- OS patching for EC2 (NOT for managed services)\n- Application code, network/firewall config (Security Groups, NACLs)\n- Client-side encryption keys\n- Updating server-side encryption settings',
          ro: '- Date utilizator (criptare, clasificare)\n- Useri, grupuri, roluri, politici IAM\n- Patching OS pentru EC2 (NU pentru servicii managed)\n- Cod aplicație, config rețea/firewall (Security Groups, NACLs)\n- Chei de criptare client-side\n- Setări criptare server-side',
        },
      },
      {
        heading: { en: 'How it shifts by service', ro: 'Cum se schimbă pe servicii' },
        body: {
          en: '- IaaS (EC2): YOU patch OS, install software, manage firewall. AWS only handles hardware.\n- PaaS (RDS, ECS): AWS patches OS and DB engine. YOU manage data and access.\n- SaaS (S3, DynamoDB): AWS handles almost everything. YOU only manage data and access policies.',
          ro: '- IaaS (EC2): TU faci patch la OS, instalezi software, firewall. AWS doar hardware.\n- PaaS (RDS, ECS): AWS patches OS și motor DB. TU date și acces.\n- SaaS (S3, DynamoDB): AWS face aproape tot. TU doar date și politici acces.',
        },
      },
    ],
    keyFacts: [
      { en: 'AWS = Security OF the cloud.', ro: 'AWS = Securitatea CLOUD-ului.' },
      { en: 'Customer = Security IN the cloud.', ro: 'Customer = Securitatea ÎN cloud.' },
      { en: 'Patching: AWS for managed services, customer for EC2 OS.', ro: 'Patching: AWS pentru servicii managed, clientul pentru OS-ul EC2.' },
      { en: 'IAM is ALWAYS your responsibility.', ro: 'IAM este MEREU responsabilitatea ta.' },
      { en: 'Encryption keys: KMS keys can be managed by AWS or by you (CMK).', ro: 'Chei de criptare: KMS poate fi managed de AWS sau de tine (CMK).' },
    ],
    relatedConcepts: ['well-architected', 'iam-best-practices'],
    relatedServices: ['iam', 'kms', 'cloudtrail'],
    docsUrl: 'https://aws.amazon.com/compliance/shared-responsibility-model/',
    examFrequency: 'high',
  },
];

const wellArchitected: Concept[] = [
  {
    id: 'well-architected',
    title: { en: 'Well-Architected Framework (6 Pillars)', ro: 'Well-Architected Framework (6 piloni)' },
    tagline: {
      en: 'AWS best-practice framework for building secure, reliable, efficient systems.',
      ro: 'Framework de best-practices AWS pentru sisteme sigure, reliable, eficiente.',
    },
    topic: 'well-architected',
    aliases: ['well architected', 'pillars', 'best practices', 'framework'],
    sections: [
      {
        heading: { en: 'The 6 Pillars', ro: 'Cei 6 piloni' },
        body: {
          en: '1. Operational Excellence — run/monitor systems, continually improve processes\n2. Security — protect data, systems, identities (encryption, IAM, audit)\n3. Reliability — recover from failure, dynamically scale, automate recovery\n4. Performance Efficiency — use compute resources optimally as demand changes\n5. Cost Optimization — avoid unnecessary cost; right-sizing, RIs, Spot\n6. Sustainability — reduce environmental impact (added in 2021)',
          ro: '1. Operational Excellence — rulezi/monitorizezi sisteme, îmbunătățești procese\n2. Security — protejezi date, sisteme, identități (criptare, IAM, audit)\n3. Reliability — recovery din defect, scalare dinamică, recuperare automată\n4. Performance Efficiency — folosești resurse optim când cererea se schimbă\n5. Cost Optimization — eviți costuri inutile; right-sizing, RI, Spot\n6. Sustainability — reducerea impactului ecologic (adăugat în 2021)',
        },
      },
      {
        heading: { en: 'Well-Architected Tool', ro: 'Well-Architected Tool' },
        body: {
          en: 'Free tool in the AWS Console that lets you review your workload against the 6 pillars by answering questions. It produces a list of high/medium/low risk issues with documented best-practice remediations.',
          ro: 'Tool gratuit în consola AWS care îți permite să verifici workload-ul după cei 6 piloni răspunzând la întrebări. Produce o listă de probleme high/medium/low cu remedieri documentate.',
        },
      },
    ],
    keyFacts: [
      { en: '6 pillars: Operational Excellence, Security, Reliability, Performance, Cost, Sustainability.', ro: '6 piloni: Operational Excellence, Security, Reliability, Performance, Cost, Sustainability.' },
      { en: 'Sustainability was added as the 6th pillar in late 2021.', ro: 'Sustainability a fost adăugat al 6-lea pilon în 2021.' },
      { en: 'Well-Architected Tool is free.', ro: 'Well-Architected Tool e gratuit.' },
    ],
    relatedConcepts: ['shared-responsibility', 'cloud-advantages'],
    docsUrl: 'https://aws.amazon.com/architecture/well-architected/',
    examFrequency: 'high',
  },
  {
    id: 'design-principles',
    title: { en: 'Cloud Design Principles', ro: 'Principii de Design Cloud' },
    tagline: {
      en: 'Stop treating servers as pets — make them cattle.',
      ro: 'Nu mai trata serverele ca pe animale de companie — fă-le turmă.',
    },
    topic: 'well-architected',
    aliases: ['design principles', 'cloud principles', 'pets cattle', 'immutable'],
    sections: [
      {
        heading: { en: 'Key principles', ro: 'Principii cheie' },
        body: {
          en: '- Stop guessing capacity (auto-scale instead)\n- Test at production scale (cloud lets you spin up huge envs)\n- Automate everything (Infrastructure-as-Code with CloudFormation)\n- Use evolutionary architectures (refactor easily)\n- Drive architecture using data (CloudWatch metrics)\n- Practice game days (test failure scenarios in production)',
          ro: '- Nu mai ghici capacitatea (folosește auto-scale)\n- Testează la scară producție (cloud îți permite environments uriașe)\n- Automatizezi tot (Infrastructure-as-Code cu CloudFormation)\n- Folosește arhitecturi evolutive (refactor ușor)\n- Bazează arhitectura pe date (metrici CloudWatch)\n- Game days (testezi scenarii de defect în producție)',
        },
      },
    ],
    keyFacts: [
      { en: 'Auto-scaling replaces capacity guessing.', ro: 'Auto-scaling înlocuiește ghicirea capacității.' },
      { en: 'IaC (CloudFormation) enables repeatable infrastructure.', ro: 'IaC (CloudFormation) permite infrastructură repetabilă.' },
    ],
    relatedConcepts: ['well-architected', 'cloud-advantages'],
    examFrequency: 'medium',
  },
];

const cloudFundamentals: Concept[] = [
  {
    id: 'cloud-advantages',
    title: { en: '6 Advantages of Cloud Computing', ro: '6 Avantaje Cloud Computing' },
    tagline: {
      en: 'Why companies move from on-premises to AWS — the canonical six.',
      ro: 'De ce companii migrează de la on-premises la AWS — cele șase canonice.',
    },
    topic: 'cloud-fundamentals',
    aliases: ['advantages', 'benefits', 'why cloud', 'capex opex', '6 advantages'],
    sections: [
      {
        heading: { en: 'The six advantages', ro: 'Cele șase avantaje' },
        body: {
          en: '1. Trade CAPEX for OPEX (variable expenses, no big upfront)\n2. Massive economies of scale (AWS pays less, you pay less)\n3. Stop guessing capacity (scale up/down on demand)\n4. Increase speed and agility (resources in minutes, not weeks)\n5. Stop spending money running data centers (focus on your customers)\n6. Go global in minutes (deploy to multiple Regions easily)',
          ro: '1. CAPEX → OPEX (cheltuieli variabile, fără investiție mare upfront)\n2. Economii de scară masive (AWS plătește mai puțin, tu la fel)\n3. Nu mai ghici capacitatea (scalezi pe cerere)\n4. Viteză și agilitate (resurse în minute, nu săptămâni)\n5. Nu mai cheltui bani pe data centers (focus pe clienți)\n6. Globalizare în minute (deploy în multe Regiuni ușor)',
        },
      },
    ],
    keyFacts: [
      { en: 'CAPEX = Capital Expenditure (upfront), OPEX = Operational (pay-as-you-go).', ro: 'CAPEX = investiție inițială, OPEX = pay-as-you-go.' },
      { en: 'Cloud removes data center management overhead.', ro: 'Cloud elimină overhead-ul managementului data center-ului.' },
    ],
    docsUrl: 'https://aws.amazon.com/what-is-cloud-computing/',
    examFrequency: 'high',
  },
  {
    id: 'cloud-types',
    title: { en: 'Types of Cloud Deployment', ro: 'Tipuri de Deployment Cloud' },
    tagline: {
      en: 'Public vs Private vs Hybrid — when to use which.',
      ro: 'Public vs Privat vs Hibrid — când folosești fiecare.',
    },
    topic: 'cloud-fundamentals',
    aliases: ['public cloud', 'private cloud', 'hybrid cloud', 'multi cloud'],
    sections: [
      {
        heading: { en: 'The three deployment models', ro: 'Cele trei modele de deployment' },
        body: {
          en: '- Public Cloud: shared infrastructure (AWS, Azure, GCP) — pay only for use\n- Private Cloud: dedicated infrastructure for one organization (on-premises or hosted)\n- Hybrid Cloud: combination — some workloads on AWS, some on-premises (use AWS Outposts, Direct Connect, Storage Gateway)',
          ro: '- Public Cloud: infrastructură partajată (AWS, Azure, GCP) — plătești cât folosești\n- Private Cloud: infrastructură dedicată unei organizații (on-prem sau hosted)\n- Hybrid Cloud: combinație — workloads pe AWS, altele on-premises (folosește Outposts, Direct Connect, Storage Gateway)',
        },
      },
      {
        heading: { en: 'Service models (IaaS / PaaS / SaaS)', ro: 'Modele de serviciu (IaaS / PaaS / SaaS)' },
        body: {
          en: '- IaaS (Infrastructure-as-a-Service): EC2, EBS — you manage OS+\n- PaaS (Platform-as-a-Service): Beanstalk, RDS — you manage code+data\n- SaaS (Software-as-a-Service): WorkMail, Connect — you only use it',
          ro: '- IaaS: EC2, EBS — gestionezi de la OS în sus\n- PaaS: Beanstalk, RDS — gestionezi cod și date\n- SaaS: WorkMail, Connect — doar îl folosești',
        },
      },
    ],
    keyFacts: [
      { en: 'Hybrid = mix on-prem + cloud (AWS Outposts is a hybrid tool).', ro: 'Hybrid = mix on-prem + cloud (Outposts e tool hibrid).' },
      { en: 'IaaS gives most control; SaaS gives least.', ro: 'IaaS dă cel mai mult control; SaaS cel mai puțin.' },
    ],
    relatedConcepts: ['cloud-advantages', 'shared-responsibility'],
    examFrequency: 'medium',
  },
];

const pricing: Concept[] = [
  {
    id: 'pricing-fundamentals',
    title: { en: 'AWS Pricing Fundamentals', ro: 'Fundamentele Prețurilor AWS' },
    tagline: {
      en: 'Pay as you go, pay less when you reserve, pay even less for volume.',
      ro: 'Plătești cât folosești, mai puțin când rezervi, și mai puțin la volum.',
    },
    topic: 'pricing',
    aliases: ['pricing', 'cost', 'billing', 'free tier', 'pay as you go'],
    sections: [
      {
        heading: { en: '3 core pricing principles', ro: '3 principii de bază' },
        body: {
          en: '1. Pay-as-you-go: pay only for what you use, no long-term commitment\n2. Pay less by reserving: discounts of 30-72% for 1-3 year commitments (RIs, Savings Plans)\n3. Pay less per unit by using more: tiered pricing (S3 cheaper for 50TB+ than 5TB)',
          ro: '1. Pay-as-you-go: plătești doar ce folosești, fără angajament\n2. Plătești mai puțin rezervând: discount 30-72% la 1-3 ani angajament (RIs, Savings Plans)\n3. Mai puțin pe unitate când folosești mult: tiered pricing (S3 mai ieftin la 50TB+ vs 5TB)',
        },
      },
      {
        heading: { en: 'Free Tier', ro: 'Free Tier' },
        body: {
          en: '- Always Free: e.g., DynamoDB 25GB, Lambda 1M req/month, CloudWatch 10 metrics\n- 12-month Free: e.g., EC2 t2.micro 750h/month, S3 5GB, RDS db.t2.micro 750h\n- Trials: short-term free trials for some services',
          ro: '- Always Free: ex DynamoDB 25GB, Lambda 1M req/lună, CloudWatch 10 metrici\n- 12-luni Free: ex EC2 t2.micro 750h/lună, S3 5GB, RDS db.t2.micro 750h\n- Trials: probe gratuite pe termen scurt pentru anumite servicii',
        },
      },
      {
        heading: { en: 'Things that are FREE in AWS', ro: 'Ce este GRATUIT în AWS' },
        body: {
          en: '- IAM, VPC, Auto Scaling, CloudFormation, Elastic Beanstalk\n- Inbound data transfer to AWS (from internet) is free\n- Data transfer between services in same Region is mostly free or cheap\n- Outbound data transfer is what costs money',
          ro: '- IAM, VPC, Auto Scaling, CloudFormation, Elastic Beanstalk\n- Trafic INBOUND la AWS (de pe internet) e gratuit\n- Trafic între servicii în aceeași Regiune mostly gratuit sau ieftin\n- Trafic OUTBOUND costă',
        },
      },
    ],
    keyFacts: [
      { en: 'Pay-as-you-go = no upfront, no commitment.', ro: 'Pay-as-you-go = fără investiție inițială, fără angajament.' },
      { en: 'Reserved Instances and Savings Plans give 30-72% discount.', ro: 'Reserved Instances și Savings Plans dau 30-72% reducere.' },
      { en: 'Spot Instances give up to 90% discount but can be terminated with 2-min notice.', ro: 'Spot Instances dau până la 90% reducere dar pot fi oprite cu 2-min preaviz.' },
      { en: 'Inbound data transfer is FREE; outbound is paid.', ro: 'Traficul inbound e GRATUIT; outbound se plătește.' },
      { en: 'IAM, VPC, CloudFormation, Auto Scaling are free.', ro: 'IAM, VPC, CloudFormation, Auto Scaling sunt gratuite.' },
    ],
    relatedConcepts: ['support-plans'],
    relatedServices: ['costexplorer', 'budgets', 'calculator'],
    docsUrl: 'https://aws.amazon.com/pricing/',
    examFrequency: 'high',
  },
  {
    id: 'support-plans',
    title: { en: 'AWS Support Plans (4 tiers)', ro: 'Planuri de Suport AWS (4 nivele)' },
    tagline: {
      en: 'From free docs to dedicated 24/7 Technical Account Manager.',
      ro: 'De la docs gratuite la Technical Account Manager dedicat 24/7.',
    },
    topic: 'support',
    aliases: ['support', 'support plans', 'tam', 'enterprise support', 'business support'],
    sections: [
      {
        heading: { en: 'The 5 plans', ro: 'Cele 5 planuri' },
        body: {
          en: '- Basic: FREE — docs, whitepapers, forums, Personal Health Dashboard, 7 Trusted Advisor checks\n- Developer: $29/month — email support, business-hours, 12-24h response\n- Business: $100/month — 24/7 phone/chat, 1h response for prod issues, full Trusted Advisor\n- Enterprise On-Ramp: $5,500/month — pool of TAMs, 30min response for business-critical\n- Enterprise: $15,000/month — DEDICATED TAM, 15min response, Concierge for billing',
          ro: '- Basic: GRATUIT — docs, whitepapers, forumuri, Personal Health Dashboard, 7 Trusted Advisor checks\n- Developer: $29/lună — suport email, business-hours, 12-24h răspuns\n- Business: $100/lună — 24/7 telefon/chat, 1h răspuns la probleme prod, Trusted Advisor complet\n- Enterprise On-Ramp: $5,500/lună — pool de TAM, 30min răspuns la business-critical\n- Enterprise: $15,000/lună — TAM DEDICAT, 15min răspuns, Concierge pentru facturare',
        },
      },
      {
        heading: { en: 'Who is a TAM?', ro: 'Ce este un TAM?' },
        body: {
          en: 'Technical Account Manager — your personal AWS architect who knows your environment. Available only on Enterprise On-Ramp (shared) and Enterprise (dedicated). They proactively review architecture, optimize costs, and help with major events.',
          ro: 'Technical Account Manager — arhitectul tău personal AWS care îți cunoaște mediul. Disponibil doar la Enterprise On-Ramp (shared) și Enterprise (dedicat). Reviziuesc proactiv arhitectura, optimizează costuri, ajută la evenimente majore.',
        },
      },
    ],
    keyFacts: [
      { en: 'Basic and Developer: NO 24/7 support.', ro: 'Basic și Developer: FĂRĂ suport 24/7.' },
      { en: 'Business: 24/7 phone, 1h response time for production down.', ro: 'Business: 24/7 telefon, 1h răspuns la prod down.' },
      { en: 'Enterprise: dedicated TAM + 15min response.', ro: 'Enterprise: TAM dedicat + 15min răspuns.' },
      { en: 'TAMs are only on Enterprise plans.', ro: 'TAM-urile sunt doar pe planurile Enterprise.' },
      { en: 'Concierge (billing assistance) is Enterprise-only.', ro: 'Concierge (asistență facturare) e doar Enterprise.' },
    ],
    relatedConcepts: ['pricing-fundamentals'],
    relatedServices: ['supportplans', 'trustedadvisor'],
    docsUrl: 'https://aws.amazon.com/premiumsupport/plans/',
    examFrequency: 'high',
  },
];

const compliance: Concept[] = [
  {
    id: 'compliance-programs',
    title: { en: 'AWS Compliance & Security Programs', ro: 'Programe Compliance & Securitate AWS' },
    tagline: {
      en: 'AWS holds dozens of certifications — find them in AWS Artifact.',
      ro: 'AWS deține zeci de certificări — le găsești în AWS Artifact.',
    },
    topic: 'compliance',
    aliases: ['compliance', 'gdpr', 'hipaa', 'pci', 'soc', 'iso', 'artifact'],
    sections: [
      {
        heading: { en: 'Common certifications', ro: 'Certificări comune' },
        body: {
          en: '- SOC 1, 2, 3 (auditing standards)\n- ISO 27001, 27017, 27018 (information security)\n- PCI DSS Level 1 (payment cards)\n- HIPAA (US healthcare)\n- GDPR (EU privacy)\n- FedRAMP (US federal government)\n- DoD SRG, FIPS 140-2',
          ro: '- SOC 1, 2, 3 (audit)\n- ISO 27001, 27017, 27018 (securitate informatică)\n- PCI DSS Level 1 (carduri plată)\n- HIPAA (sănătate SUA)\n- GDPR (privacy UE)\n- FedRAMP (guvern federal SUA)\n- DoD SRG, FIPS 140-2',
        },
      },
      {
        heading: { en: 'AWS Artifact', ro: 'AWS Artifact' },
        body: {
          en: 'Self-service portal in the AWS Console where you download AWS compliance reports (SOC, PCI, ISO certificates) — used to give to your auditors. FREE service.',
          ro: 'Portal self-service în consola AWS de unde descarci rapoarte de compliance AWS (certificate SOC, PCI, ISO) — pe care le dai auditorilor. Serviciu GRATUIT.',
        },
      },
    ],
    keyFacts: [
      { en: 'AWS Artifact is the place to download compliance reports.', ro: 'AWS Artifact e locul de unde descarci rapoarte compliance.' },
      { en: 'AWS holds over 90 certifications worldwide.', ro: 'AWS deține peste 90 de certificări global.' },
      { en: 'Compliance is shared: AWS certifies infrastructure; YOU must use it correctly.', ro: 'Compliance e partajat: AWS certifică infrastructura; TU trebuie să o folosești corect.' },
    ],
    relatedConcepts: ['shared-responsibility'],
    relatedServices: ['kms', 'cloudtrail', 'config'],
    docsUrl: 'https://aws.amazon.com/compliance/programs/',
    examFrequency: 'medium',
  },
  {
    id: 'iam-best-practices',
    title: { en: 'IAM Best Practices', ro: 'Best Practices IAM' },
    tagline: {
      en: 'The right way to manage AWS identities — from day one.',
      ro: 'Modul corect de a gestiona identitățile AWS — din ziua 1.',
    },
    topic: 'compliance',
    aliases: ['iam best practices', 'security best practices', 'mfa', 'least privilege', 'root'],
    sections: [
      {
        heading: { en: 'Top 10 IAM rules', ro: 'Top 10 reguli IAM' },
        body: {
          en: '1. NEVER use the root account for daily work — use it only for billing/account setup\n2. Enable MFA on root and all privileged users\n3. Use IAM Users + Groups (not policies attached directly to users)\n4. Apply least privilege — grant only what is needed\n5. Use IAM Roles for EC2, Lambda, and cross-account access (NEVER hardcode keys)\n6. Rotate access keys regularly (or use temporary credentials via STS)\n7. Use strong password policies\n8. Use IAM Access Analyzer to find risky resources\n9. Audit access with CloudTrail\n10. Use IAM Identity Center (SSO) for human users; IAM users for apps',
          ro: '1. NU folosi root pentru muncă zilnică — doar facturare/setup\n2. Activează MFA pe root și toți userii privilegiați\n3. Folosește IAM Users + Groups (nu politici direct pe useri)\n4. Least privilege — dă doar ce e necesar\n5. Folosește IAM Roles pentru EC2, Lambda, cross-account (NICIODATĂ chei hardcoded)\n6. Rotește access keys regulat (sau folosește credențiale temporare via STS)\n7. Politici parole puternice\n8. Folosește IAM Access Analyzer pentru a găsi resurse riscante\n9. Audit cu CloudTrail\n10. Folosește IAM Identity Center (SSO) pentru utilizatori umani; IAM users pentru aplicații',
        },
      },
    ],
    keyFacts: [
      { en: 'Root: enable MFA, use only for setup/billing.', ro: 'Root: activează MFA, folosește doar pentru setup/facturare.' },
      { en: 'IAM is GLOBAL (not regional).', ro: 'IAM e GLOBAL (nu regional).' },
      { en: 'IAM is FREE.', ro: 'IAM e GRATUIT.' },
      { en: 'Use IAM Roles for AWS services — never hardcode access keys.', ro: 'Folosește IAM Roles pentru servicii AWS — niciodată chei hardcoded.' },
    ],
    relatedConcepts: ['shared-responsibility'],
    relatedServices: ['iam', 'cognito', 'iamic', 'cloudtrail'],
    docsUrl: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html',
    examFrequency: 'high',
  },
];

const caf: Concept[] = [
  {
    id: 'caf',
    title: { en: 'Cloud Adoption Framework (CAF)', ro: 'Cloud Adoption Framework (CAF)' },
    tagline: {
      en: 'AWS roadmap for organizations migrating to the cloud — 6 perspectives.',
      ro: 'Roadmap AWS pentru organizații în migrare la cloud — 6 perspective.',
    },
    topic: 'caf',
    aliases: ['caf', 'cloud adoption', 'migration framework', '6 perspectives'],
    sections: [
      {
        heading: { en: 'The 6 perspectives', ro: 'Cele 6 perspective' },
        body: {
          en: 'Business capabilities (focus: business outcomes):\n1. Business — value & ROI\n2. People — culture & training\n3. Governance — risk & compliance\n\nTechnical capabilities (focus: technology):\n4. Platform — infrastructure & apps\n5. Security — confidentiality & integrity\n6. Operations — manageability & operations',
          ro: 'Capabilități business (focus: rezultate business):\n1. Business — valoare & ROI\n2. People — cultură & training\n3. Governance — risc & compliance\n\nCapabilități tehnice (focus: tehnologie):\n4. Platform — infrastructură & aplicații\n5. Security — confidențialitate & integritate\n6. Operations — manageability & operații',
        },
      },
      {
        heading: { en: 'The 7 Rs of migration', ro: 'Cele 7 R-uri ale migrării' },
        body: {
          en: '- Rehost (lift-and-shift): move as-is to EC2 (use Application Migration Service)\n- Replatform (lift-tinker-shift): minor cloud optimizations\n- Repurchase: buy a SaaS replacement\n- Refactor / Re-architect: rewrite cloud-native\n- Retire: shut down\n- Retain: keep on-premises (for now)\n- Relocate: VMware Cloud on AWS',
          ro: '- Rehost (lift-and-shift): mut as-is pe EC2 (Application Migration Service)\n- Replatform (lift-tinker-shift): optimizări cloud minore\n- Repurchase: cumpăr înlocuitor SaaS\n- Refactor / Re-architect: rescris cloud-native\n- Retire: închid\n- Retain: păstrez on-premises (deocamdată)\n- Relocate: VMware Cloud on AWS',
        },
      },
    ],
    keyFacts: [
      { en: 'CAF has 6 perspectives split into business and technical.', ro: 'CAF are 6 perspective: business + tehnice.' },
      { en: '7 Rs of migration are commonly tested.', ro: '7 R-uri de migrare sunt frecvent testate.' },
      { en: 'Rehost = lift-and-shift = the fastest migration path.', ro: 'Rehost = lift-and-shift = cea mai rapidă migrare.' },
    ],
    relatedConcepts: ['cloud-advantages'],
    relatedServices: ['migrationhub', 'dms', 'applicationmigrationservice'],
    docsUrl: 'https://aws.amazon.com/professional-services/CAF/',
    examFrequency: 'medium',
  },
];

export const concepts: Concept[] = [
  ...globalInfrastructure,
  ...sharedResponsibility,
  ...wellArchitected,
  ...cloudFundamentals,
  ...pricing,
  ...compliance,
  ...caf,
];

export function getConceptById(id: string): Concept | undefined {
  return concepts.find((c) => c.id === id);
}

export const TOPIC_LABELS: Record<Concept['topic'], { en: string; ro: string }> = {
  'global-infrastructure': { en: 'Global Infrastructure', ro: 'Infrastructură Globală' },
  'shared-responsibility': { en: 'Shared Responsibility', ro: 'Responsabilitate Partajată' },
  'well-architected': { en: 'Well-Architected', ro: 'Well-Architected' },
  'cloud-fundamentals': { en: 'Cloud Fundamentals', ro: 'Fundamentele Cloud' },
  pricing: { en: 'Pricing', ro: 'Prețuri' },
  support: { en: 'Support', ro: 'Suport' },
  compliance: { en: 'Compliance & Security', ro: 'Compliance & Securitate' },
  caf: { en: 'Cloud Adoption Framework', ro: 'Cloud Adoption Framework' },
};
