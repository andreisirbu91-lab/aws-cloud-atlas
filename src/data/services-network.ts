import type { Service } from '@/types';

export const networkServices: Service[] = [
  {
    id: 'vpc',
    abbreviation: 'VPC',
    fullName: 'Virtual Private Cloud',
    category: 'network',
    level: 'clf',
    difficulty: 3,
    examFrequency: 'high',
    description: {
      en: 'Logically isolated virtual network in AWS — define IP ranges, subnets, route tables, gateways.',
      ro: 'Rețea virtuală izolată logic în AWS — definești IP-uri, subnets, route tables, gateways.',
    },
    analogy: {
      en: 'Like a private apartment in the AWS building — you control who comes in.',
      ro: 'Ca un apartament privat în blocul AWS — tu controlezi cine intră.',
    },
    examTips: [
      { key: 'subnets', content: { en: 'Subnets: Public (with IGW) or Private (no direct internet).', ro: 'Subnets: Public (cu IGW) sau Private (fără internet direct).' } },
      { key: 'igw', content: { en: 'Internet Gateway (IGW): internet access for public subnets.', ro: 'Internet Gateway (IGW): acces internet pentru subnets publice.' } },
      { key: 'nat', content: { en: 'NAT Gateway: outbound-only internet for private subnets.', ro: 'NAT Gateway: internet outbound-only pentru subnets private.' } },
      { key: 'nacl', content: { en: 'NACL: stateless firewall at subnet level.', ro: 'NACL: firewall stateless la nivel de subnet.' } },
      { key: 'sg', content: { en: 'Security Groups: stateful firewall at instance level.', ro: 'Security Groups: firewall stateful la nivel de instanță.' } },
      { key: 'peering', content: { en: 'VPC Peering: connect 2 VPCs (no transitive routing).', ro: 'VPC Peering: conectezi 2 VPC-uri (fără routing tranzitiv).' } },
      { key: 'transit', content: { en: 'Transit Gateway: hub for many VPCs and on-prem.', ro: 'Transit Gateway: hub pentru multe VPC-uri și on-prem.' } },
      { key: 'flow_logs', content: { en: 'VPC Flow Logs capture network traffic for auditing.', ro: 'VPC Flow Logs captură trafic rețea pentru audit.' } },
    ],
    pricing: { en: 'VPC free; NAT Gateway $0.045/h + $0.045/GB', ro: 'VPC gratuit; NAT Gateway $0.045/h + $0.045/GB' },
    connections: ['ec2', 'rds', 'elb', 'directconnect', 'privatelink'],
    docsUrl: 'https://docs.aws.amazon.com/vpc/',
    visual: { color: 'hsl(190, 90%, 50%)', icon: 'network' },
    howItWorks: [
      { en: 'You define a VPC with a private IP range (CIDR block) inside one Region.', ro: 'Definești un VPC cu un interval de IP-uri private (bloc CIDR) într-o Regiune.' },
      { en: 'You split it into subnets — public (internet-facing) and private (internal).', ro: 'Îl împarți în subnets — publice (spre internet) și private (interne).' },
      { en: 'Route tables + an Internet Gateway control how traffic leaves and enters.', ro: 'Route tables + un Internet Gateway controlează cum intră și iese traficul.' },
      { en: 'NACLs (subnet) and Security Groups (instance) filter traffic at two layers.', ro: 'NACL-urile (subnet) și Security Groups (instanță) filtrează traficul pe două niveluri.' },
    ],
    keyFacts: [
      { en: 'A VPC is REGIONAL; subnets are tied to a single AZ each.', ro: 'Un VPC e REGIONAL; fiecare subnet e legat de un singur AZ.' },
      { en: 'Public subnet = has a route to an Internet Gateway. Private subnet = does not.', ro: 'Subnet public = are rută spre un Internet Gateway. Subnet privat = nu are.' },
      { en: 'NAT Gateway lets private subnets reach the internet OUTBOUND only.', ro: 'NAT Gateway lasă subnet-urile private să ajungă pe internet DOAR outbound.' },
      { en: 'Security Group = stateful (instance level); NACL = stateless (subnet level).', ro: 'Security Group = stateful (nivel instanță); NACL = stateless (nivel subnet).' },
      { en: 'VPC Peering is NOT transitive — A↔B and B↔C does not give A↔C.', ro: 'VPC Peering NU e tranzitiv — A↔B și B↔C nu dau A↔C.' },
    ],
    keyNumbers: [
      { label: { en: 'VPC scope', ro: 'Domeniu VPC' }, value: { en: '1 Region', ro: '1 Regiune' } },
      { label: { en: 'Subnet scope', ro: 'Domeniu subnet' }, value: { en: '1 AZ', ro: '1 AZ' } },
      { label: { en: 'VPC base cost', ro: 'Cost de bază VPC' }, value: { en: 'Free', ro: 'Gratuit' } },
    ],
    whenToUse: [
      { en: 'Isolate your AWS resources in a private, controlled network.', ro: 'Izolezi resursele AWS într-o rețea privată, controlată.' },
      { en: 'Place databases in private subnets and web servers in public subnets.', ro: 'Pui bazele de date în subnets private și serverele web în subnets publice.' },
      { en: 'Connect to on-premises via VPN or Direct Connect for hybrid setups.', ro: 'Te conectezi on-premises prin VPN sau Direct Connect pentru setup-uri hibride.' },
    ],
    whenNotToUse: [
      { en: 'Connecting MANY VPCs + on-prem in a hub → Transit Gateway, not a mesh of peerings.', ro: 'Conectarea MULTOR VPC-uri + on-prem într-un hub → Transit Gateway, nu o plasă de peering-uri.' },
      { en: 'A simple global static site → S3 + CloudFront doesn\'t need you to design a VPC.', ro: 'Un site static global simplu → S3 + CloudFront nu cere să proiectezi un VPC.' },
    ],
    examTraps: [
      { en: 'Security Group = STATEFUL + instance level. NACL = STATELESS + subnet level. Most-tested confusion.', ro: 'Security Group = STATEFUL + nivel instanță. NACL = STATELESS + nivel subnet. Cea mai testată confuzie.' },
      { en: 'NAT Gateway = outbound internet for private subnets. Internet Gateway = the VPC\'s door to the internet.', ro: 'NAT Gateway = internet outbound pentru subnets private. Internet Gateway = ușa VPC-ului spre internet.' },
      { en: 'VPC Peering is NOT transitive — a frequent trick question.', ro: 'VPC Peering NU e tranzitiv — întrebare-capcană frecventă.' },
      { en: 'A VPC spans a Region; a subnet lives in ONE AZ. Don\'t swap the scopes.', ro: 'Un VPC acoperă o Regiune; un subnet stă într-UN AZ. Nu inversa domeniile.' },
    ],
    retrievalQuestions: [
      { q: { en: 'What is the key difference between a Security Group and a NACL?', ro: 'Care e diferența cheie între un Security Group și un NACL?' }, a: { en: 'Security Group is STATEFUL and works at the instance level (allow rules only); NACL is STATELESS and works at the subnet level (allow + deny rules).', ro: 'Security Group e STATEFUL și lucrează la nivel de instanță (doar reguli allow); NACL e STATELESS și lucrează la nivel de subnet (reguli allow + deny).' } },
      { q: { en: 'How do instances in a PRIVATE subnet get outbound internet access?', ro: 'Cum obțin instanțele dintr-un subnet PRIVAT acces outbound la internet?' }, a: { en: 'Through a NAT Gateway (or NAT instance) placed in a public subnet — outbound only, no inbound from the internet.', ro: 'Printr-un NAT Gateway (sau NAT instance) într-un subnet public — doar outbound, fără inbound de pe internet.' } },
      { q: { en: 'Is VPC peering transitive? If A peers with B and B peers with C, can A reach C?', ro: 'E VPC peering tranzitiv? Dacă A face peering cu B și B cu C, ajunge A la C?' }, a: { en: 'No — peering is not transitive. A cannot reach C through B. Use a Transit Gateway for many-to-many connectivity.', ro: 'Nu — peering-ul nu e tranzitiv. A nu ajunge la C prin B. Folosește un Transit Gateway pentru conectivitate many-to-many.' } },
      { q: { en: 'What makes a subnet "public" rather than "private"?', ro: 'Ce face un subnet „public” și nu „privat”?' }, a: { en: 'A route in its route table pointing to an Internet Gateway. Without that route, the subnet is private.', ro: 'O rută în route table-ul lui spre un Internet Gateway. Fără acea rută, subnet-ul e privat.' } },
    ],
    diagram: {
      steps: [
        { en: 'VPC (Region)', ro: 'VPC (Regiune)' },
        { en: 'Public subnet + IGW', ro: 'Subnet public + IGW' },
        { en: 'Private subnet + NAT', ro: 'Subnet privat + NAT' },
        { en: 'SG / NACL filter', ro: 'Filtru SG / NACL' },
      ],
      altText: { en: 'A regional VPC contains public subnets (via Internet Gateway) and private subnets (outbound via NAT), with Security Groups and NACLs filtering traffic.', ro: 'Un VPC regional conține subnets publice (prin Internet Gateway) și private (outbound prin NAT), cu Security Groups și NACL care filtrează traficul.' },
    },
    mermaidDiagram: {
      code: `flowchart LR
  Net([Internet]) --> IGW[Internet Gateway]
  subgraph VPC [VPC - one Region]
    IGW --> Pub[Public subnet: web server]
    Pub --> NAT[NAT Gateway]
    NAT --> Priv[Private subnet: database]
  end`,
      caption: { en: 'Web servers sit in a public subnet reached via the Internet Gateway; the database stays private and reaches out only through NAT.', ro: 'Serverele web stau într-un subnet public accesibil prin Internet Gateway; baza de date rămâne privată și iese doar prin NAT.' },
    },
  },
  {
    id: 'cloudfront',
    abbreviation: 'CloudFront',
    fullName: 'Amazon CloudFront',
    category: 'network',
    level: 'clf',
    difficulty: 2,
    examFrequency: 'high',
    description: {
      en: 'Global content delivery network (CDN) — caches content at 450+ edge locations worldwide.',
      ro: 'CDN global — cache conținut la 450+ locații edge mondial.',
    },
    analogy: {
      en: 'Like a chain of local shops — users get content from the nearest one, fast.',
      ro: 'Ca un lanț de magazine locale — utilizatorii primesc din cel mai aproape, rapid.',
    },
    examTips: [
      { key: 'edges', content: { en: '450+ edge locations (Points of Presence) globally.', ro: '450+ locații edge (PoPs) global.' } },
      { key: 'origins', content: { en: 'Origins: S3, EC2, ELB, any HTTP server.', ro: 'Origins: S3, EC2, ELB, orice server HTTP.' } },
      { key: 'security', content: { en: 'Integrates with WAF, Shield (DDoS), HTTPS forced.', ro: 'Integrare WAF, Shield (DDoS), HTTPS forțat.' } },
      { key: 'oac', content: { en: 'OAC (Origin Access Control): private S3 bucket.', ro: 'OAC (Origin Access Control): bucket S3 privat.' } },
    ],
    pricing: { en: '$0.085/GB (first 10TB) + $0.01/10k requests', ro: '$0.085/GB (primele 10TB) + $0.01/10k cereri' },
    connections: ['s3', 'elb', 'route53', 'waf', 'shield', 'acm'],
    docsUrl: 'https://docs.aws.amazon.com/cloudfront/',
    visual: { color: 'hsl(190, 90%, 50%)', icon: 'network' },
    howItWorks: [
      { en: 'CloudFront caches copies of your content at 450+ edge locations (Points of Presence) worldwide.', ro: 'CloudFront păstrează copii ale conținutului tău în 450+ locații edge (Points of Presence) din toată lumea.' },
      { en: 'A user request is served from the nearest edge location, cutting latency dramatically.', ro: 'O cerere a utilizatorului e servită din cea mai apropiată locație edge, reducând drastic latența.' },
      { en: 'On a cache miss, the edge fetches from the origin (S3, EC2, ALB or any HTTP server) and caches it.', ro: 'La un cache miss, edge-ul aduce conținutul de la origin (S3, EC2, ALB sau orice server HTTP) și îl pune în cache.' },
      { en: 'At the edge it adds security: AWS Shield (DDoS), WAF and forced HTTPS.', ro: 'La edge adaugă securitate: AWS Shield (DDoS), WAF și HTTPS forțat.' },
    ],
    keyFacts: [
      { en: 'CloudFront is a CACHING CDN — it speeds up READ performance globally.', ro: 'CloudFront e un CDN cu CACHE — accelerează performanța de CITIRE la nivel global.' },
      { en: 'Origins can be an S3 bucket, EC2, an ALB, or any custom HTTP server.', ro: 'Origin-urile pot fi un bucket S3, EC2, un ALB sau orice server HTTP custom.' },
      { en: 'It is NOT the same as S3 Cross-Region Replication — CloudFront caches, it does not replicate buckets.', ro: 'NU e același lucru cu S3 Cross-Region Replication — CloudFront face cache, nu replică bucket-uri.' },
      { en: 'Global Accelerator does NOT cache — it optimizes the network path and gives static anycast IPs.', ro: 'Global Accelerator NU face cache — optimizează calea de rețea și oferă IP-uri anycast statice.' },
      { en: 'Integrates with Shield + WAF at the edge for DDoS protection and firewall rules.', ro: 'Se integrează cu Shield + WAF la edge pentru protecție DDoS și reguli de firewall.' },
    ],
    keyNumbers: [
      { label: { en: 'Edge locations', ro: 'Locații edge' }, value: { en: '450+ globally', ro: '450+ global' } },
      { label: { en: 'Service scope', ro: 'Domeniu serviciu' }, value: { en: 'Global', ro: 'Global' } },
      { label: { en: 'Layer', ro: 'Layer' }, value: { en: 'Edge / CDN', ro: 'Edge / CDN' } },
      { label: { en: 'Main benefit', ro: 'Beneficiu principal' }, value: { en: 'Lower latency', ro: 'Latență mai mică' } },
    ],
    whenToUse: [
      { en: 'Serve static and dynamic web content fast to users around the world.', ro: 'Servești conținut web static și dinamic rapid către utilizatori din toată lumea.' },
      { en: 'Distribute a global static website or media from an S3 bucket with low latency.', ro: 'Distribui un site static global sau media dintr-un bucket S3 cu latență mică.' },
      { en: 'Add DDoS protection (Shield) and WAF at the edge in front of your origin.', ro: 'Adaugi protecție DDoS (Shield) și WAF la edge în fața origin-ului.' },
    ],
    whenNotToUse: [
      { en: 'Non-cacheable TCP/UDP traffic that needs static IPs → AWS Global Accelerator, not CloudFront.', ro: 'Trafic TCP/UDP necacheabil care are nevoie de IP-uri statice → AWS Global Accelerator, nu CloudFront.' },
      { en: 'Keeping a full copy of data in another Region for resilience → S3 Cross-Region Replication.', ro: 'Păstrarea unei copii complete a datelor în altă Regiune pentru reziliență → S3 Cross-Region Replication.' },
    ],
    examTraps: [
      { en: 'CloudFront = caching CDN at the edge. Global Accelerator = no caching, network-path optimization + static anycast IPs.', ro: 'CloudFront = CDN cu cache la edge. Global Accelerator = fără cache, optimizare cale de rețea + IP-uri anycast statice.' },
      { en: 'CloudFront caches content; it does NOT replicate S3 buckets — that is Cross-Region Replication.', ro: 'CloudFront face cache; NU replică bucket-uri S3 — aia e Cross-Region Replication.' },
      { en: '"Reduce latency for global users reading content" → CloudFront is the answer.', ro: '„Reduce latența pentru utilizatori globali care citesc conținut” → răspunsul e CloudFront.' },
      { en: 'CloudFront is a GLOBAL service with DDoS protection (Shield + WAF) built in at the edge.', ro: 'CloudFront e un serviciu GLOBAL cu protecție DDoS (Shield + WAF) integrată la edge.' },
    ],
    retrievalQuestions: [
      { q: { en: 'What problem does CloudFront primarily solve?', ro: 'Ce problemă rezolvă CloudFront în principal?' }, a: { en: 'High latency for global users — it caches content at edge locations near users to speed up read performance.', ro: 'Latența mare pentru utilizatori globali — păstrează conținut în cache la locații edge aproape de utilizatori pentru a accelera citirea.' } },
      { q: { en: 'How is CloudFront different from Global Accelerator?', ro: 'Prin ce diferă CloudFront de Global Accelerator?' }, a: { en: 'CloudFront CACHES content at the edge; Global Accelerator does NOT cache — it optimizes the network path and gives static anycast IPs.', ro: 'CloudFront pune conținutul în CACHE la edge; Global Accelerator NU face cache — optimizează calea de rețea și oferă IP-uri anycast statice.' } },
      { q: { en: 'What can act as an origin for CloudFront?', ro: 'Ce poate fi un origin pentru CloudFront?' }, a: { en: 'An S3 bucket, EC2, an ALB, or any custom HTTP server.', ro: 'Un bucket S3, EC2, un ALB sau orice server HTTP custom.' } },
      { q: { en: 'Which security services does CloudFront integrate at the edge?', ro: 'Ce servicii de securitate integrează CloudFront la edge?' }, a: { en: 'AWS Shield (DDoS protection) and WAF (web firewall), plus forced HTTPS.', ro: 'AWS Shield (protecție DDoS) și WAF (firewall web), plus HTTPS forțat.' } },
    ],
    diagram: {
      steps: [
        { en: 'User request', ro: 'Cerere user' },
        { en: 'Nearest edge location', ro: 'Cea mai apropiată locație edge' },
        { en: 'Cache hit? serve / miss? fetch origin', ro: 'Cache hit? servește / miss? aduce de la origin' },
        { en: 'Origin (S3 / EC2 / ALB)', ro: 'Origin (S3 / EC2 / ALB)' },
      ],
      altText: { en: 'A user request hits the nearest CloudFront edge location; on a cache hit it is served instantly, on a miss the edge fetches from the origin (S3, EC2 or ALB) and caches it.', ro: 'O cerere a utilizatorului ajunge la cea mai apropiată locație edge CloudFront; la cache hit e servită instant, la miss edge-ul aduce de la origin (S3, EC2 sau ALB) și o pune în cache.' },
    },
    mermaidDiagram: {
      code: `flowchart LR
  User([User]) --> Edge[Nearest Edge Location]
  Edge -->|cache hit| User
  Edge -->|cache miss| Origin[(Origin: S3 / ALB)]
  Origin --> Edge`,
      caption: { en: 'On a cache hit the edge serves instantly; on a miss it fetches once from the origin, then caches for the next users.', ro: 'La cache hit edge-ul servește instant; la miss aduce o dată de la origin, apoi pune în cache pentru următorii utilizatori.' },
    },
  },
  {
    id: 'route53',
    abbreviation: 'Route 53',
    fullName: 'Amazon Route 53',
    category: 'network',
    level: 'clf',
    difficulty: 2,
    examFrequency: 'high',
    description: {
      en: 'Managed DNS — translates domain names to IPs, with intelligent global routing.',
      ro: 'DNS managed — traduce domenii în IP-uri, cu routing inteligent global.',
    },
    analogy: {
      en: 'Like the internet phone book — turns names into numbers (IPs).',
      ro: 'Ca cartea de telefon a internetului — transformă nume în numere (IP-uri).',
    },
    examTips: [
      { key: 'simple', content: { en: 'Simple routing: one endpoint.', ro: 'Simple: un singur endpoint.' } },
      { key: 'weighted', content: { en: 'Weighted: split traffic by percentage.', ro: 'Weighted: split trafic procentual.' } },
      { key: 'latency', content: { en: 'Latency-based: route to lowest-latency region.', ro: 'Latency-based: route la regiune cu latență minimă.' } },
      { key: 'failover', content: { en: 'Failover: primary + secondary, switch on health check fail.', ro: 'Failover: primar + secundar, switch la fail health check.' } },
      { key: 'geo', content: { en: 'Geolocation: route by user location.', ro: 'Geolocation: route după locația user-ului.' } },
      { key: 'alias', content: { en: 'Alias records: free, for AWS resources.', ro: 'Alias records: gratuite, pentru resurse AWS.' } },
    ],
    pricing: { en: '$0.50/hosted zone/month + $0.40/M queries', ro: '$0.50/hosted zone/lună + $0.40/M interogări' },
    connections: ['cloudfront', 'elb', 's3', 'apigateway'],
    docsUrl: 'https://docs.aws.amazon.com/route53/',
    visual: { color: 'hsl(190, 90%, 50%)', icon: 'network' },
    howItWorks: [
      { en: 'Route 53 is a managed, highly available DNS service that translates domain names into IP addresses.', ro: 'Route 53 e un serviciu DNS managed, foarte disponibil, care traduce nume de domenii în adrese IP.' },
      { en: 'It is also a domain registrar — you can buy and manage domains directly in it.', ro: 'E și un registrar de domenii — poți cumpăra și gestiona domenii direct din el.' },
      { en: 'Routing policies decide which answer to return: Simple, Weighted, Latency, Failover, Geolocation, Geoproximity, Multi-value.', ro: 'Politicile de routing decid ce răspuns returnează: Simple, Weighted, Latency, Failover, Geolocation, Geoproximity, Multi-value.' },
      { en: 'Health checks let it route traffic away from unhealthy endpoints automatically.', ro: 'Health check-urile îi permit să redirecționeze automat traficul de la endpoint-uri nesănătoase.' },
    ],
    keyFacts: [
      { en: 'Route 53 is a GLOBAL service (not regional) and DNS uses port 53 — hence the name.', ro: 'Route 53 e un serviciu GLOBAL (nu regional), iar DNS folosește portul 53 — de aici și numele.' },
      { en: 'It can route to AWS resources (ALB, CloudFront, S3 website) or to external endpoints.', ro: 'Poate direcționa către resurse AWS (ALB, CloudFront, site S3) sau către endpoint-uri externe.' },
      { en: 'Latency-based routing sends users to the lowest-latency Region; Geolocation routes by user location.', ro: 'Latency-based trimite utilizatorii la Regiunea cu cea mai mică latență; Geolocation direcționează după locația utilizatorului.' },
      { en: 'Failover routing = active-passive: switches to a secondary when the primary fails a health check.', ro: 'Failover = activ-pasiv: comută pe un endpoint secundar când cel primar pică un health check.' },
      { en: 'Route 53 offers a 100% availability SLA.', ro: 'Route 53 oferă un SLA de disponibilitate de 100%.' },
    ],
    keyNumbers: [
      { label: { en: 'DNS port', ro: 'Port DNS' }, value: { en: '53', ro: '53' } },
      { label: { en: 'Service scope', ro: 'Domeniu serviciu' }, value: { en: 'Global', ro: 'Global' } },
      { label: { en: 'Availability SLA', ro: 'SLA disponibilitate' }, value: { en: '100%', ro: '100%' } },
      { label: { en: 'Routing policies', ro: 'Politici de routing' }, value: { en: '7 types', ro: '7 tipuri' } },
    ],
    whenToUse: [
      { en: 'Host DNS for your domain and point it at AWS resources like an ALB, CloudFront or an S3 website.', ro: 'Găzduiești DNS pentru domeniul tău și îl îndrepți spre resurse AWS ca un ALB, CloudFront sau un site S3.' },
      { en: 'Send users to the lowest-latency Region (Latency policy) or to a Region by their location (Geolocation).', ro: 'Trimiți utilizatorii la Regiunea cu latența cea mai mică (Latency) sau la o Regiune după locația lor (Geolocation).' },
      { en: 'Build active-passive disaster recovery with Failover routing + health checks.', ro: 'Construiești disaster recovery activ-pasiv cu Failover routing + health check-uri.' },
    ],
    whenNotToUse: [
      { en: 'Caching content close to users to reduce read latency → CloudFront, not DNS routing.', ro: 'Cache de conținut aproape de utilizatori pentru a reduce latența de citire → CloudFront, nu routing DNS.' },
      { en: 'Optimizing the TCP/UDP network path with static IPs → AWS Global Accelerator.', ro: 'Optimizarea căii de rețea TCP/UDP cu IP-uri statice → AWS Global Accelerator.' },
    ],
    examTraps: [
      { en: 'Latency-based = lowest latency. Geolocation = based on WHERE the user is. Do not confuse the two.', ro: 'Latency-based = latența cea mai mică. Geolocation = în funcție de UNDE e utilizatorul. Nu le confunda.' },
      { en: 'Failover routing is for active-passive DR — primary + secondary with health checks.', ro: 'Failover routing e pentru DR activ-pasiv — primar + secundar cu health check-uri.' },
      { en: 'Route 53 is a GLOBAL service; do not call it regional on the exam.', ro: 'Route 53 e un serviciu GLOBAL; nu îl numi regional la examen.' },
      { en: 'The "53" refers to DNS port 53 — Route 53 is DNS + a domain registrar.', ro: '„53” se referă la portul DNS 53 — Route 53 e DNS + registrar de domenii.' },
    ],
    retrievalQuestions: [
      { q: { en: 'What is Route 53 and what does the "53" stand for?', ro: 'Ce e Route 53 și ce înseamnă „53”?' }, a: { en: 'A managed, highly available DNS service (and domain registrar). 53 is the DNS port number.', ro: 'Un serviciu DNS managed, foarte disponibil (și registrar de domenii). 53 e numărul portului DNS.' } },
      { q: { en: 'Difference between Latency-based and Geolocation routing?', ro: 'Diferența dintre routing Latency-based și Geolocation?' }, a: { en: 'Latency-based routes to the Region with the lowest latency; Geolocation routes based on the physical location of the user.', ro: 'Latency-based direcționează la Regiunea cu latența cea mai mică; Geolocation direcționează după locația fizică a utilizatorului.' } },
      { q: { en: 'Which routing policy supports active-passive disaster recovery?', ro: 'Ce politică de routing suportă disaster recovery activ-pasiv?' }, a: { en: 'Failover routing — it sends traffic to a secondary endpoint when the primary fails its health check.', ro: 'Failover routing — trimite traficul către un endpoint secundar când cel primar pică health check-ul.' } },
      { q: { en: 'Is Route 53 a regional or a global service?', ro: 'Route 53 e un serviciu regional sau global?' }, a: { en: 'Global — it is not tied to a single Region.', ro: 'Global — nu e legat de o singură Regiune.' } },
    ],
    diagram: {
      steps: [
        { en: 'User DNS query', ro: 'Interogare DNS user' },
        { en: 'Route 53 (global DNS)', ro: 'Route 53 (DNS global)' },
        { en: 'Routing policy + health check', ro: 'Politică routing + health check' },
        { en: 'Best endpoint (ALB / CloudFront / S3)', ro: 'Cel mai bun endpoint (ALB / CloudFront / S3)' },
      ],
      altText: { en: 'A user DNS query reaches Route 53, which applies a routing policy and health checks to return the best healthy endpoint, such as an ALB, CloudFront distribution or S3 website.', ro: 'O interogare DNS a utilizatorului ajunge la Route 53, care aplică o politică de routing și health check-uri pentru a returna cel mai bun endpoint sănătos, ca un ALB, o distribuție CloudFront sau un site S3.' },
    },
    mermaidDiagram: {
      code: `flowchart LR
  User([User: app.com?]) --> R53{Route 53 - DNS + policy}
  R53 -->|latency / failover / geo| Healthy[Healthy endpoint: ALB]
  R53 -. health check .-> Down[Unhealthy endpoint]`,
      caption: { en: 'Route 53 resolves the name and, using a routing policy + health checks, returns the best healthy endpoint and avoids the down one.', ro: 'Route 53 rezolvă numele și, cu o politică de routing + health check-uri, returnează cel mai bun endpoint sănătos și îl evită pe cel căzut.' },
    },
  },
  {
    id: 'apigateway',
    abbreviation: 'API Gateway',
    fullName: 'Amazon API Gateway',
    category: 'network',
    level: 'clf',
    difficulty: 2,
    examFrequency: 'high',
    description: {
      en: 'Create, publish, and secure REST/HTTP/WebSocket APIs at any scale, serverlessly.',
      ro: 'Creezi, publici și securizezi API-uri REST/HTTP/WebSocket la orice scară, serverless.',
    },
    analogy: {
      en: 'Like a hotel concierge — receives requests and routes them to the right service.',
      ro: 'Ca un concierge la hotel — primește cererile și le direcționează la serviciul potrivit.',
    },
    examTips: [
      { key: 'types', content: { en: 'REST API (full features), HTTP API (cheaper), WebSocket API.', ro: 'REST API (full), HTTP API (mai ieftin), WebSocket API.' } },
      { key: 'integrations', content: { en: 'Native integrations: Lambda, HTTP, AWS services.', ro: 'Integrări native: Lambda, HTTP, servicii AWS.' } },
      { key: 'throttling', content: { en: 'Built-in rate limiting and throttling per API key.', ro: 'Rate limiting și throttling built-in per API key.' } },
      { key: 'auth', content: { en: 'Auth: Cognito, Lambda Authorizer, IAM, API Keys.', ro: 'Auth: Cognito, Lambda Authorizer, IAM, API Keys.' } },
    ],
    pricing: { en: '$3.50/M requests (HTTP API) or $1/M (REST)', ro: '$3.50/M cereri (HTTP API) sau $1/M (REST)' },
    connections: ['lambda', 'cognito', 'iam', 'cloudwatch'],
    docsUrl: 'https://docs.aws.amazon.com/apigateway/',
    visual: { color: 'hsl(190, 90%, 50%)', icon: 'network' },
  },
  {
    id: 'elb',
    abbreviation: 'ELB',
    fullName: 'Elastic Load Balancing',
    category: 'network',
    level: 'clf',
    difficulty: 2,
    examFrequency: 'high',
    description: {
      en: 'Distribute incoming traffic across multiple targets — EC2, containers, IPs, Lambda.',
      ro: 'Distribuie traficul între multe target-uri — EC2, containere, IP-uri, Lambda.',
    },
    analogy: {
      en: 'Like an orchestra conductor — ensures every musician (server) plays its part.',
      ro: 'Ca un dirijor — asigură că fiecare muzician (server) cântă partea lui.',
    },
    examTips: [
      { key: 'alb', content: { en: 'ALB (Application LB): Layer 7, HTTP/HTTPS, path/host routing.', ro: 'ALB: Layer 7, HTTP/HTTPS, routing pe path/host.' } },
      { key: 'nlb', content: { en: 'NLB (Network LB): Layer 4, TCP/UDP, ultra-low latency, static IP.', ro: 'NLB: Layer 4, TCP/UDP, latență ultra-mică, IP static.' } },
      { key: 'gwlb', content: { en: 'Gateway LB: Layer 3, deploy 3rd-party security appliances.', ro: 'Gateway LB: Layer 3, deploy appliance-uri securitate.' } },
      { key: 'clb', content: { en: 'CLB (Classic LB): legacy, avoid for new projects.', ro: 'CLB (Classic LB): legacy, evită în proiecte noi.' } },
      { key: 'target_groups', content: { en: 'Target Groups: EC2, ECS, Lambda, IP addresses.', ro: 'Target Groups: EC2, ECS, Lambda, adrese IP.' } },
    ],
    pricing: { en: 'ALB: $0.0225/h + $0.008/LCU', ro: 'ALB: $0.0225/h + $0.008/LCU' },
    connections: ['ec2', 'ecs', 'autoscaling', 'route53', 'acm', 'waf'],
    docsUrl: 'https://docs.aws.amazon.com/elasticloadbalancing/',
    visual: { color: 'hsl(190, 90%, 50%)', icon: 'network' },
    howItWorks: [
      { en: 'ELB is a managed load balancer that spreads incoming traffic across multiple targets in multiple AZs.', ro: 'ELB e un load balancer managed care distribuie traficul de intrare peste mai multe target-uri din mai multe AZ-uri.' },
      { en: 'Targets can be EC2 instances, containers (ECS), IP addresses or Lambda functions.', ro: 'Target-urile pot fi instanțe EC2, containere (ECS), adrese IP sau funcții Lambda.' },
      { en: 'Health checks ensure traffic is sent only to healthy targets, giving high availability.', ro: 'Health check-urile asigură că traficul merge doar la target-uri sănătoase, oferind disponibilitate ridicată.' },
      { en: 'It works together with Auto Scaling, which adds or removes targets behind the load balancer.', ro: 'Funcționează împreună cu Auto Scaling, care adaugă sau scoate target-uri din spatele load balancer-ului.' },
    ],
    keyFacts: [
      { en: 'ALB (Application LB) = Layer 7, HTTP/HTTPS, routes by path/host — for web apps & microservices.', ro: 'ALB (Application LB) = Layer 7, HTTP/HTTPS, routing pe path/host — pentru aplicații web și microservicii.' },
      { en: 'NLB (Network LB) = Layer 4, TCP/UDP, ultra-high performance (millions of req/sec) and a static IP.', ro: 'NLB (Network LB) = Layer 4, TCP/UDP, performanță ultra-ridicată (milioane req/sec) și IP static.' },
      { en: 'GLB (Gateway LB) = Layer 3, used to deploy virtual appliances like firewalls.', ro: 'GLB (Gateway LB) = Layer 3, folosit pentru a deploya appliance-uri virtuale ca firewall-uri.' },
      { en: 'CLB (Classic LB) is legacy/deprecated — avoid it for new projects.', ro: 'CLB (Classic LB) e legacy/depreciat — evită-l în proiecte noi.' },
      { en: 'ELB routes only to HEALTHY targets and spans multiple AZs for high availability.', ro: 'ELB direcționează doar către target-uri SĂNĂTOASE și acoperă mai multe AZ-uri pentru disponibilitate ridicată.' },
    ],
    keyNumbers: [
      { label: { en: 'ALB layer', ro: 'Layer ALB' }, value: { en: 'Layer 7 (HTTP)', ro: 'Layer 7 (HTTP)' } },
      { label: { en: 'NLB layer', ro: 'Layer NLB' }, value: { en: 'Layer 4 (TCP/UDP)', ro: 'Layer 4 (TCP/UDP)' } },
      { label: { en: 'NLB performance', ro: 'Performanță NLB' }, value: { en: 'Millions req/sec', ro: 'Milioane req/sec' } },
      { label: { en: 'Load balancer types', ro: 'Tipuri load balancer' }, value: { en: 'ALB / NLB / GLB / CLB', ro: 'ALB / NLB / GLB / CLB' } },
    ],
    whenToUse: [
      { en: 'Spread web (HTTP/HTTPS) traffic across servers with path/host routing → ALB.', ro: 'Distribui trafic web (HTTP/HTTPS) între servere cu routing pe path/host → ALB.' },
      { en: 'Handle extreme TCP/UDP performance or need a static IP → NLB.', ro: 'Gestionezi performanță TCP/UDP extremă sau ai nevoie de IP static → NLB.' },
      { en: 'Provide high availability by balancing across multiple AZs together with Auto Scaling.', ro: 'Oferi disponibilitate ridicată balansând între mai multe AZ-uri împreună cu Auto Scaling.' },
    ],
    whenNotToUse: [
      { en: 'Caching content close to global users to cut latency → CloudFront, not a load balancer.', ro: 'Cache de conținut aproape de utilizatori globali pentru a reduce latența → CloudFront, nu un load balancer.' },
      { en: 'Routing users by DNS policy (latency, failover, geolocation) → Route 53.', ro: 'Direcționarea utilizatorilor prin politică DNS (latency, failover, geolocation) → Route 53.' },
    ],
    examTraps: [
      { en: 'ALB = HTTP / Layer 7 (path & host routing). NLB = TCP/UDP / Layer 4 (extreme performance + static IP).', ro: 'ALB = HTTP / Layer 7 (routing pe path și host). NLB = TCP/UDP / Layer 4 (performanță extremă + IP static).' },
      { en: '"Static IP for the load balancer" or "millions of requests/sec" → NLB is the answer.', ro: '„IP static pentru load balancer” sau „milioane de cereri/sec” → răspunsul e NLB.' },
      { en: 'CLB (Classic) is legacy — the exam favours ALB/NLB for new architectures.', ro: 'CLB (Classic) e legacy — examenul preferă ALB/NLB pentru arhitecturi noi.' },
      { en: 'ELB only routes to HEALTHY targets — health checks are core to its high availability.', ro: 'ELB direcționează doar către target-uri SĂNĂTOASE — health check-urile sunt esențiale pentru disponibilitatea lui.' },
    ],
    retrievalQuestions: [
      { q: { en: 'When do you choose an ALB vs an NLB?', ro: 'Când alegi un ALB față de un NLB?' }, a: { en: 'ALB for HTTP/HTTPS Layer 7 with path/host routing (web apps); NLB for TCP/UDP Layer 4, extreme performance and a static IP.', ro: 'ALB pentru HTTP/HTTPS Layer 7 cu routing pe path/host (aplicații web); NLB pentru TCP/UDP Layer 4, performanță extremă și IP static.' } },
      { q: { en: 'How does ELB provide high availability?', ro: 'Cum oferă ELB disponibilitate ridicată?' }, a: { en: 'It balances traffic across targets in multiple AZs and uses health checks to route only to healthy targets.', ro: 'Balansează traficul peste target-uri din mai multe AZ-uri și folosește health check-uri pentru a direcționa doar către target-uri sănătoase.' } },
      { q: { en: 'Which ELB type gives a static IP and millions of requests per second?', ro: 'Ce tip de ELB oferă IP static și milioane de cereri pe secundă?' }, a: { en: 'The Network Load Balancer (NLB), operating at Layer 4 (TCP/UDP).', ro: 'Network Load Balancer (NLB), care lucrează la Layer 4 (TCP/UDP).' } },
      { q: { en: 'Which load balancer type is legacy and should be avoided?', ro: 'Ce tip de load balancer e legacy și ar trebui evitat?' }, a: { en: 'The Classic Load Balancer (CLB) — use ALB or NLB instead.', ro: 'Classic Load Balancer (CLB) — folosește ALB sau NLB în loc.' } },
    ],
    diagram: {
      steps: [
        { en: 'Incoming traffic', ro: 'Trafic de intrare' },
        { en: 'ELB (ALB / NLB)', ro: 'ELB (ALB / NLB)' },
        { en: 'Health check targets', ro: 'Health check target-uri' },
        { en: 'Healthy targets across AZs', ro: 'Target-uri sănătoase în mai multe AZ-uri' },
      ],
      altText: { en: 'Incoming traffic reaches an ELB (ALB for HTTP Layer 7 or NLB for TCP Layer 4), which health-checks targets and distributes requests only to healthy EC2/containers across multiple Availability Zones.', ro: 'Traficul de intrare ajunge la un ELB (ALB pentru HTTP Layer 7 sau NLB pentru TCP Layer 4), care verifică sănătatea target-urilor și distribuie cererile doar către EC2/containere sănătoase din mai multe Availability Zones.' },
    },
    mermaidDiagram: {
      code: `flowchart LR
  Users([Users]) --> ELB{{Load Balancer}}
  ELB --> A[EC2 in AZ-a]
  ELB --> B[EC2 in AZ-b]
  ELB -. fails health check .-> C[EC2 in AZ-c down]`,
      caption: { en: 'The load balancer spreads traffic across healthy instances in multiple AZs and stops sending to any that fail a health check.', ro: 'Load balancer-ul împarte traficul către instanțe sănătoase din mai multe AZ-uri și nu mai trimite către cele care pică health check-ul.' },
    },
  },
  {
    id: 'directconnect',
    abbreviation: 'Direct Connect',
    fullName: 'AWS Direct Connect',
    category: 'network',
    level: 'clf',
    difficulty: 3,
    examFrequency: 'medium',
    description: {
      en: 'Dedicated physical connection from your data center to AWS — bypasses public internet.',
      ro: 'Conexiune fizică dedicată de la data center-ul tău la AWS — ocolește internetul public.',
    },
    analogy: {
      en: 'Like a private highway vs the public road (VPN) — faster and more stable.',
      ro: 'Ca o autostradă privată vs drumul public (VPN) — mai rapidă și stabilă.',
    },
    examTips: [
      { key: 'speeds', content: { en: 'Speeds: 1 Gbps, 10 Gbps, or 100 Gbps physical connection.', ro: 'Viteze: 1 Gbps, 10 Gbps, 100 Gbps conexiune fizică.' } },
      { key: 'lower_latency', content: { en: 'Lower, more predictable latency than VPN.', ro: 'Latență mai mică și predictibilă vs VPN.' } },
      { key: 'setup_time', content: { en: 'Takes weeks/months to provision (vs VPN: instant).', ro: 'Setup săptămâni/luni (vs VPN: instant).' } },
    ],
    pricing: { en: '$0.30/h (1Gbps port) + $0.02/GB transfer', ro: '$0.30/h (port 1Gbps) + $0.02/GB transfer' },
    connections: ['vpc', 'transitgateway'],
    docsUrl: 'https://docs.aws.amazon.com/directconnect/',
    visual: { color: 'hsl(190, 90%, 50%)', icon: 'network' },
  },
  {
    id: 'globalaccelerator',
    abbreviation: 'Global Accel.',
    fullName: 'AWS Global Accelerator',
    category: 'network',
    level: 'clf',
    difficulty: 2,
    examFrequency: 'low',
    description: {
      en: 'Improve global app availability and performance using AWS global network and 2 anycast IPs.',
      ro: 'Îmbunătățește disponibilitatea și performanța globală cu rețeaua AWS și 2 IP-uri anycast.',
    },
    analogy: {
      en: 'Like CloudFront but for non-HTTP apps — speeds up gaming, IoT, voice.',
      ro: 'Ca CloudFront dar pentru aplicații non-HTTP — accelerează gaming, IoT, voice.',
    },
    examTips: [
      { key: 'anycast', content: { en: 'Provides 2 static anycast IPs for global routing.', ro: 'Oferă 2 IP-uri statice anycast pentru routing global.' } },
      { key: 'use_case', content: { en: 'Use for non-HTTP apps; CloudFront for HTTP.', ro: 'Folosește pentru aplicații non-HTTP; CloudFront pentru HTTP.' } },
    ],
    pricing: { en: '$0.025/h fixed + data transfer', ro: '$0.025/h fix + data transfer' },
    connections: ['ec2', 'elb', 'eip'],
    docsUrl: 'https://docs.aws.amazon.com/global-accelerator/',
    visual: { color: 'hsl(190, 90%, 50%)', icon: 'network' },
  },
  {
    id: 'privatelink',
    abbreviation: 'PrivateLink',
    fullName: 'AWS PrivateLink & VPC Endpoints',
    category: 'network',
    level: 'clf',
    difficulty: 3,
    examFrequency: 'high',
    description: {
      en: 'Private connectivity from your VPC to AWS services (or other VPCs’ services) without touching the public internet — via gateway endpoints (S3/DynamoDB, free) or interface endpoints (PrivateLink, most services).',
      ro: 'Conectivitate privată din VPC-ul tău către servicii AWS (sau servicii din alte VPC-uri) fără a atinge internetul public — prin gateway endpoints (S3/DynamoDB, gratuite) sau interface endpoints (PrivateLink, majoritatea serviciilor).',
    },
    analogy: {
      en: 'Private corridors inside a building complex: instead of going out on the street (internet) to reach another department, you use an internal hallway — some hallways are free (gateway), others are premium doors installed in your office (interface ENI).',
      ro: 'Coridoare private într-un complex de clădiri: în loc să ieși pe stradă (internet) ca să ajungi la alt departament, folosești un hol interior — unele holuri sunt gratuite (gateway), altele sunt uși premium instalate chiar în biroul tău (ENI interface).',
    },
    examTips: [
      {
        key: 'gateway-vs-interface',
        content: {
          en: 'Memorize cold: GATEWAY endpoint = only S3 + DynamoDB, FREE, a route-table entry. INTERFACE endpoint = an ENI with a private IP, hourly + per-GB cost, nearly all other services.',
          ro: 'Memorează la rece: GATEWAY endpoint = doar S3 + DynamoDB, GRATUIT, o intrare în route table. INTERFACE endpoint = un ENI cu IP privat, cost orar + per GB, aproape toate celelalte servicii.',
        },
      },
      {
        key: 'expose-service',
        content: {
          en: 'Trigger phrase: "expose OUR service privately to other VPCs/accounts without peering" → PrivateLink endpoint service (your NLB + their interface endpoint).',
          ro: 'Formulare-declanșator: „expune serviciul NOSTRU privat către alte VPC-uri/conturi fără peering" → PrivateLink endpoint service (NLB-ul tău + interface endpoint-ul lor).',
        },
      },
    ],
    pricing: {
      en: 'Gateway endpoints: FREE. Interface endpoints: ~$0.01/h per AZ + per-GB processed — still usually cheaper than NAT Gateway data processing.',
      ro: 'Gateway endpoints: GRATUITE. Interface endpoints: ~$0.01/h per AZ + per GB procesat — de obicei tot mai ieftin decât procesarea de date prin NAT Gateway.',
    },
    connections: ['vpc', 's3', 'dynamodb', 'natgateway', 'elb'],
    docsUrl: 'https://docs.aws.amazon.com/vpc/latest/privatelink/',
    visual: { color: 'hsl(190, 90%, 50%)', icon: 'network' },
    examDomains: ['design-secure', 'design-cost'],
    howItWorks: [
      { en: 'Gateway endpoint: you add it to the VPC and select route tables — traffic to S3/DynamoDB is routed privately inside AWS.', ro: 'Gateway endpoint: îl adaugi în VPC și selectezi route table-urile — traficul către S3/DynamoDB e rutat privat în interiorul AWS.' },
      { en: 'Interface endpoint: AWS places an ENI with a private IP in your subnet; DNS for the service resolves to that private IP.', ro: 'Interface endpoint: AWS pune un ENI cu IP privat în subnetul tău; DNS-ul serviciului se rezolvă la acel IP privat.' },
      { en: 'Endpoint policies restrict WHAT can be accessed through the endpoint (e.g., only specific S3 buckets).', ro: 'Endpoint policies restricționează CE poate fi accesat prin endpoint (ex. doar anumite bucket-uri S3).' },
      { en: 'Endpoint service (PrivateLink): you put your app behind an NLB; consumer VPCs create interface endpoints to it — no peering, no route sharing.', ro: 'Endpoint service (PrivateLink): îți pui aplicația în spatele unui NLB; VPC-urile consumatoare creează interface endpoints către ea — fără peering, fără partajare de rute.' },
    ],
    keyFacts: [
      { en: 'Gateway endpoints exist for exactly TWO services: S3 and DynamoDB — and they are free.', ro: 'Gateway endpoints există pentru exact DOUĂ servicii: S3 și DynamoDB — și sunt gratuite.' },
      { en: 'Interface endpoints (PrivateLink) cover nearly all other AWS services, plus SaaS and your own services.', ro: 'Interface endpoints (PrivateLink) acoperă aproape toate celelalte servicii AWS, plus SaaS și serviciile tale proprii.' },
      { en: 'Traffic never leaves the AWS network — instances need no internet path (no NAT, no IGW) to reach the service.', ro: 'Traficul nu părăsește niciodată rețeaua AWS — instanțele nu au nevoie de drum spre internet (fără NAT, fără IGW) ca să ajungă la serviciu.' },
      { en: 'Interface endpoints are reachable from on-premises over Direct Connect/VPN; gateway endpoints are NOT (VPC-only).', ro: 'Interface endpoints sunt accesibile din on-premises prin Direct Connect/VPN; gateway endpoints NU sunt (doar din VPC).' },
      { en: 'PrivateLink exposes ONE service point-to-point; it is not network-to-network connectivity (that is peering/TGW).', ro: 'PrivateLink expune UN serviciu punct-la-punct; nu e conectivitate rețea-la-rețea (aceea e peering/TGW).' },
    ],
    whenToUse: [
      { en: 'Private subnets need S3/DynamoDB → gateway endpoint (free, kills NAT data-processing costs).', ro: 'Subneturile private au nevoie de S3/DynamoDB → gateway endpoint (gratuit, elimină costurile de procesare NAT).' },
      { en: 'Compliance: "traffic to AWS APIs must not traverse the internet" → interface endpoints for those services.', ro: 'Conformitate: „traficul către API-urile AWS nu trebuie să treacă prin internet" → interface endpoints pentru acele servicii.' },
      { en: 'A SaaS/shared service must be consumed privately by many customer VPCs with overlapping CIDRs → PrivateLink (peering would fail on overlaps).', ro: 'Un serviciu SaaS/partajat trebuie consumat privat de multe VPC-uri client cu CIDR-uri suprapuse → PrivateLink (peering-ul ar eșua la suprapuneri).' },
    ],
    whenNotToUse: [
      { en: 'Full network-to-network connectivity between VPCs → VPC peering (2 VPCs) or Transit Gateway (many).', ro: 'Conectivitate completă rețea-la-rețea între VPC-uri → VPC peering (2 VPC-uri) sau Transit Gateway (multe).' },
      { en: 'General outbound internet access for private instances → NAT Gateway (endpoints only reach specific services).', ro: 'Acces general outbound la internet pentru instanțe private → NAT Gateway (endpoint-urile ajung doar la servicii specifice).' },
    ],
    examTraps: [
      { en: 'Scenario: "private EC2 instances access S3, minimize cost" → GATEWAY endpoint. Answers routing S3 through NAT Gateway are the cost trap.', ro: 'Scenariu: „instanțe EC2 private accesează S3, minimizează costul" → GATEWAY endpoint. Răspunsurile care rutează S3 prin NAT Gateway sunt capcana de cost.' },
      { en: 'On-premises access to S3 privately: gateway endpoints do NOT work from on-prem — the answer is an interface endpoint for S3 (or DX + interface endpoint).', ro: 'Acces on-premises privat la S3: gateway endpoints NU funcționează din on-prem — răspunsul e un interface endpoint pentru S3 (sau DX + interface endpoint).' },
      { en: 'PrivateLink vs peering/TGW: PrivateLink = one service, unidirectional consumption, overlapping CIDRs OK; peering/TGW = whole networks, CIDRs must not overlap.', ro: 'PrivateLink vs peering/TGW: PrivateLink = un serviciu, consum unidirecțional, CIDR-uri suprapuse OK; peering/TGW = rețele întregi, CIDR-urile nu trebuie să se suprapună.' },
      { en: 'The endpoint service side must sit behind a NETWORK Load Balancer (NLB), not an ALB — a favorite detail question.', ro: 'Partea de endpoint service trebuie să stea în spatele unui NETWORK Load Balancer (NLB), nu al unui ALB — un detaliu favorit la examen.' },
    ],
    keyNumbers: [
      { label: { en: 'Services with gateway endpoints', ro: 'Servicii cu gateway endpoints' }, value: { en: '2 (S3, DynamoDB)', ro: '2 (S3, DynamoDB)' } },
      { label: { en: 'Gateway endpoint cost', ro: 'Costul gateway endpoint' }, value: { en: '$0 (free)', ro: '$0 (gratuit)' } },
      { label: { en: 'Load balancer required for endpoint services', ro: 'Load balancer necesar pentru endpoint services' }, value: { en: 'NLB', ro: 'NLB' } },
    ],
    retrievalQuestions: [
      {
        q: { en: 'Gateway vs interface endpoint — name three differences.', ro: 'Gateway vs interface endpoint — numește trei diferențe.' },
        a: { en: 'Gateway: only S3/DynamoDB, free, works via route tables, VPC-only. Interface: almost all services, hourly + per-GB cost, an ENI with private IP, reachable from on-prem via DX/VPN.', ro: 'Gateway: doar S3/DynamoDB, gratuit, funcționează prin route tables, doar din VPC. Interface: aproape toate serviciile, cost orar + per GB, un ENI cu IP privat, accesibil din on-prem via DX/VPN.' },
      },
      {
        q: { en: 'How do you expose an internal API to 50 customer VPCs, some with overlapping CIDRs?', ro: 'Cum expui un API intern către 50 de VPC-uri client, unele cu CIDR-uri suprapuse?' },
        a: { en: 'PrivateLink endpoint service: put the API behind an NLB and let each customer create an interface endpoint. Peering/TGW would fail because of CIDR overlaps and would expose whole networks.', ro: 'PrivateLink endpoint service: pui API-ul în spatele unui NLB și fiecare client creează un interface endpoint. Peering/TGW ar eșua din cauza CIDR-urilor suprapuse și ar expune rețele întregi.' },
      },
    ],
    mermaidDiagram: {
      code: 'flowchart LR; subgraph Consumer VPC; EC2[Private EC2]; GE[Gateway endpoint]; IE[Interface endpoint ENI]; end; EC2 -->|route table| GE; GE --> S3[(S3 / DynamoDB)]; EC2 -->|private IP| IE; IE --> NLB[NLB]; NLB --> SVC[Service in provider VPC]',
      caption: { en: 'Two private paths: gateway endpoint (free, S3/DynamoDB) and interface endpoint via PrivateLink to any service behind an NLB.', ro: 'Două căi private: gateway endpoint (gratuit, S3/DynamoDB) și interface endpoint prin PrivateLink către orice serviciu din spatele unui NLB.' },
    },
  },
];
