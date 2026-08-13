import type { Service } from '@/types';

/**
 * SAA-C03-only services (level 'saa', exams ['saa']).
 * Seeded by Claude 2026-08-13 with the 3 biggest gaps found in the SAA scan;
 * append new entries here (do not edit the aggregator in services.ts).
 * ID style follows the existing catalog: lowercase, no hyphens (cf. 'globalaccelerator').
 */
export const saaServices: Service[] = [
  {
    id: 'transitgateway',
    abbreviation: 'TGW',
    fullName: 'AWS Transit Gateway',
    category: 'network',
    level: 'saa',
    exams: ['saa'],
    difficulty: 3,
    examFrequency: 'high',
    description: {
      en: 'A regional network hub that connects thousands of VPCs and on-premises networks through a single gateway, replacing complex meshes of VPC peering connections.',
      ro: 'Un hub regional de rețea care conectează mii de VPC-uri și rețele on-premises printr-un singur gateway, înlocuind mesh-urile complexe de conexiuni VPC peering.',
    },
    analogy: {
      en: 'An airport hub: instead of direct flights between every pair of cities (full-mesh peering), every city connects to the hub and can reach all others through it.',
      ro: 'Un hub de aeroport: în loc de zboruri directe între fiecare pereche de orașe (peering full-mesh), fiecare oraș se conectează la hub și ajunge la toate celelalte prin el.',
    },
    examTips: [
      {
        key: 'hub-spoke',
        content: {
          en: 'Trigger phrase: "connect MANY VPCs (and/or on-prem) with simplified management" → Transit Gateway. 3+ VPCs in a mesh = TGW territory; 2 VPCs = plain VPC peering is cheaper.',
          ro: 'Formulare-declanșator: „conectează MULTE VPC-uri (și/sau on-prem) cu management simplificat" → Transit Gateway. 3+ VPC-uri în mesh = teritoriu TGW; 2 VPC-uri = VPC peering simplu e mai ieftin.',
        },
      },
      {
        key: 'transitive',
        content: {
          en: 'TGW routing IS transitive (hub-and-spoke); VPC peering is NOT. If the scenario needs A→B→C connectivity, peering alone cannot do it.',
          ro: 'Rutarea TGW ESTE tranzitivă (hub-and-spoke); VPC peering NU este. Dacă scenariul cere conectivitate A→B→C, peering-ul singur nu poate.',
        },
      },
    ],
    pricing: {
      en: 'Per attachment-hour + per GB of data processed. VPC peering has no hourly charge — that cost difference is itself exam material.',
      ro: 'Per attachment-oră + per GB de date procesate. VPC peering nu are taxă orară — diferența de cost e ea însăși materie de examen.',
    },
    connections: ['vpc', 'directconnect', 'route53'],
    docsUrl: 'https://docs.aws.amazon.com/vpc/latest/tgw/what-is-transit-gateway.html',
    visual: { color: 'hsl(270, 60%, 55%)', icon: 'network' },
    examDomains: ['design-performant', 'design-cost'],
    howItWorks: [
      { en: 'You create one Transit Gateway per Region and attach VPCs, VPN connections, and Direct Connect gateways to it.', ro: 'Creezi un Transit Gateway per regiune și atașezi la el VPC-uri, conexiuni VPN și gateway-uri Direct Connect.' },
      { en: 'Each attachment propagates routes into the TGW route table (or custom route tables for segmentation).', ro: 'Fiecare attachment propagă rute în route table-ul TGW (sau în route tables custom pentru segmentare).' },
      { en: 'Traffic between any two attachments flows through the hub — transitively, unlike VPC peering.', ro: 'Traficul între oricare două attachment-uri trece prin hub — tranzitiv, spre deosebire de VPC peering.' },
      { en: 'Inter-Region peering connects TGWs in different Regions over the AWS backbone.', ro: 'Peering inter-regiune conectează TGW-uri din regiuni diferite prin backbone-ul AWS.' },
    ],
    keyFacts: [
      { en: 'Regional resource; connect Regions via TGW inter-Region peering.', ro: 'Resursă regională; regiunile se leagă prin TGW inter-Region peering.' },
      { en: 'Transitive routing — the fix for "VPC peering is not transitive".', ro: 'Rutare tranzitivă — rezolvarea pentru „VPC peering nu e tranzitiv".' },
      { en: 'Supports thousands of VPC attachments (default quota 5,000).', ro: 'Suportă mii de attachment-uri VPC (cotă implicită 5.000).' },
      { en: 'Route tables per attachment enable network segmentation (e.g., prod vs dev isolation).', ro: 'Route tables per attachment permit segmentarea rețelei (ex. izolare prod vs dev).' },
      { en: 'Charged per attachment-hour + per GB processed (peering is free per hour).', ro: 'Taxat per attachment-oră + per GB procesat (peering-ul nu are taxă orară).' },
    ],
    whenToUse: [
      { en: 'Connecting 3+ VPCs (a full mesh of N VPCs needs N×(N−1)/2 peerings — TGW needs N attachments).', ro: 'Conectarea a 3+ VPC-uri (un mesh complet de N VPC-uri cere N×(N−1)/2 peering-uri — TGW cere N attachment-uri).' },
      { en: 'Hybrid hub: one VPN/Direct Connect shared by all VPCs instead of per-VPC connections.', ro: 'Hub hibrid: un singur VPN/Direct Connect partajat de toate VPC-urile, în loc de conexiuni per VPC.' },
      { en: 'Centralized egress/inspection architectures (all traffic through one security VPC).', ro: 'Arhitecturi cu egress/inspecție centralizate (tot traficul printr-un VPC de securitate).' },
    ],
    whenNotToUse: [
      { en: 'Only 2 VPCs with simple needs → VPC peering (no hourly cost, no data-processing fee).', ro: 'Doar 2 VPC-uri cu nevoi simple → VPC peering (fără cost orar, fără taxă de procesare).' },
      { en: 'Exposing ONE service privately to other VPCs → AWS PrivateLink, not full network connectivity.', ro: 'Expunerea UNUI singur serviciu privat către alte VPC-uri → AWS PrivateLink, nu conectivitate completă de rețea.' },
    ],
    examTraps: [
      { en: 'Answer says "create VPC peering between all VPCs" for 10+ VPCs → wrong: unmanageable mesh; TGW is the designed answer.', ro: 'Răspunsul zice „creează VPC peering între toate VPC-urile" pentru 10+ VPC-uri → greșit: mesh negestionabil; TGW e răspunsul proiectat.' },
      { en: 'TGW vs PrivateLink confusion: TGW = network-to-network connectivity; PrivateLink = expose one service endpoint privately.', ro: 'Confuzia TGW vs PrivateLink: TGW = conectivitate rețea-la-rețea; PrivateLink = expui un singur serviciu privat.' },
      { en: 'Overlapping CIDRs still break TGW routing — it does not NAT between VPCs.', ro: 'CIDR-urile suprapuse strică rutarea și cu TGW — nu face NAT între VPC-uri.' },
    ],
    keyNumbers: [
      { label: { en: 'VPC attachments per TGW (default quota)', ro: 'Attachment-uri VPC per TGW (cotă implicită)' }, value: { en: '5,000', ro: '5.000' } },
      { label: { en: 'Peerings needed for 10-VPC full mesh vs TGW attachments', ro: 'Peering-uri pentru mesh complet de 10 VPC-uri vs attachment-uri TGW' }, value: { en: '45 vs 10', ro: '45 vs 10' } },
    ],
    retrievalQuestions: [
      {
        q: { en: 'Why can’t VPC peering replace Transit Gateway for 3 VPCs that must all reach each other through one of them?', ro: 'De ce nu poate VPC peering să înlocuiască Transit Gateway pentru 3 VPC-uri care trebuie să comunice toate prin unul dintre ele?' },
        a: { en: 'Peering is not transitive — A↔B and B↔C do not give A↔C. You would need a direct peering for every pair, while TGW routes transitively through the hub.', ro: 'Peering-ul nu e tranzitiv — A↔B și B↔C nu dau A↔C. Ai avea nevoie de peering direct pentru fiecare pereche, pe când TGW rutează tranzitiv prin hub.' },
      },
      {
        q: { en: 'When is plain VPC peering the better answer than TGW?', ro: 'Când e VPC peering simplu răspunsul mai bun decât TGW?' },
        a: { en: 'Two (or very few) VPCs and cost sensitivity: peering has no hourly or per-GB processing charge, TGW has both.', ro: 'Două (sau foarte puține) VPC-uri și sensibilitate la cost: peering-ul nu are taxă orară sau per GB, TGW le are pe ambele.' },
      },
    ],
    mermaidDiagram: {
      code: 'flowchart TB; TGW((Transit Gateway)); A[VPC A] --- TGW; B[VPC B] --- TGW; C[VPC C] --- TGW; DX[Direct Connect / VPN] --- TGW',
      caption: { en: 'Hub-and-spoke: every network attaches once and reaches all others through the TGW.', ro: 'Hub-and-spoke: fiecare rețea se atașează o singură dată și ajunge la toate celelalte prin TGW.' },
    },
  },
  {
    id: 'natgateway',
    abbreviation: 'NAT GW',
    fullName: 'NAT Gateway',
    category: 'network',
    level: 'saa',
    exams: ['saa'],
    difficulty: 2,
    examFrequency: 'high',
    description: {
      en: 'A managed Network Address Translation service that lets instances in private subnets initiate outbound internet connections while blocking inbound connections initiated from the internet.',
      ro: 'Un serviciu gestionat de Network Address Translation care permite instanțelor din subneturi private să inițieze conexiuni outbound către internet, blocând conexiunile inbound inițiate de pe internet.',
    },
    analogy: {
      en: 'A hotel switchboard: guests (private instances) can call out, but nobody outside can call a room directly — and all outgoing calls show the hotel’s number (the Elastic IP).',
      ro: 'Centrala unui hotel: oaspeții (instanțele private) pot suna în exterior, dar nimeni din afară nu poate suna direct în cameră — și toate apelurile ies cu numărul hotelului (Elastic IP-ul).',
    },
    examTips: [
      {
        key: 'placement',
        content: {
          en: 'The NAT gateway lives in a PUBLIC subnet (it needs the internet gateway); private subnets point their 0.0.0.0/0 route at it.',
          ro: 'NAT gateway-ul stă într-un subnet PUBLIC (are nevoie de internet gateway); subneturile private își îndreaptă ruta 0.0.0.0/0 către el.',
        },
      },
      {
        key: 'per-az',
        content: {
          en: 'A NAT gateway is AZ-bound. For HA and to avoid cross-AZ data charges, deploy one per AZ and route each private subnet to the NAT in its own AZ.',
          ro: 'Un NAT gateway e legat de un AZ. Pentru HA și ca să eviți taxele cross-AZ, pune câte unul per AZ și rutează fiecare subnet privat către NAT-ul din propriul AZ.',
        },
      },
    ],
    pricing: {
      en: 'Hourly charge + per-GB data processing. Cost trap: same-Region S3/DynamoDB traffic should bypass it via free gateway VPC endpoints.',
      ro: 'Taxă orară + procesare per GB. Capcană de cost: traficul S3/DynamoDB din aceeași regiune ar trebui să îl ocolească prin gateway VPC endpoints gratuite.',
    },
    connections: ['vpc', 'ec2', 's3'],
    docsUrl: 'https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html',
    visual: { color: 'hsl(270, 60%, 55%)', icon: 'arrow-up-right' },
    examDomains: ['design-secure', 'design-cost'],
    howItWorks: [
      { en: 'Create the NAT gateway in a public subnet and associate an Elastic IP.', ro: 'Creezi NAT gateway-ul într-un subnet public și îi asociezi un Elastic IP.' },
      { en: 'Add a 0.0.0.0/0 route in the private subnets’ route tables pointing to the NAT gateway.', ro: 'Adaugi o rută 0.0.0.0/0 în route table-urile subneturilor private, către NAT gateway.' },
      { en: 'Outbound flows are translated to the NAT’s Elastic IP; return traffic is allowed back in for those flows only.', ro: 'Fluxurile outbound sunt translatate pe Elastic IP-ul NAT-ului; traficul de retur e permis înapoi doar pentru acele fluxuri.' },
      { en: 'Unsolicited inbound connections from the internet are dropped — private instances stay unreachable.', ro: 'Conexiunile inbound nesolicitate de pe internet sunt respinse — instanțele private rămân inaccesibile.' },
    ],
    keyFacts: [
      { en: 'Outbound-only: private instances reach the internet; the internet cannot reach them.', ro: 'Doar outbound: instanțele private ajung la internet; internetul nu ajunge la ele.' },
      { en: 'Managed, scales automatically up to 100 Gbps; no security groups attach to it.', ro: 'Gestionat, scalează automat până la 100 Gbps; nu i se atașează security groups.' },
      { en: 'AZ-bound: one per AZ is the HA pattern.', ro: 'Legat de AZ: unul per AZ e pattern-ul de HA.' },
      { en: 'Replaces self-managed NAT instances (which need their own patching, sizing, and source/dest-check disabled).', ro: 'Înlocuiește instanțele NAT auto-gestionate (care cer patching propriu, dimensionare și source/dest-check dezactivat).' },
      { en: 'IPv6 does not use NAT — use an egress-only internet gateway instead.', ro: 'IPv6 nu folosește NAT — folosește un egress-only internet gateway.' },
    ],
    whenToUse: [
      { en: 'Private-subnet instances need OS updates, external APIs, or package downloads.', ro: 'Instanțele din subneturi private au nevoie de update-uri de OS, API-uri externe sau descărcări de pachete.' },
      { en: 'Any "no inbound from the internet, but outbound required" security requirement.', ro: 'Orice cerință de securitate „fără inbound de pe internet, dar cu outbound necesar".' },
    ],
    whenNotToUse: [
      { en: 'Traffic to S3/DynamoDB in the same Region → gateway VPC endpoint (free, private, no NAT data-processing fee).', ro: 'Trafic către S3/DynamoDB din aceeași regiune → gateway VPC endpoint (gratuit, privat, fără taxa de procesare NAT).' },
      { en: 'Traffic to other AWS services → interface VPC endpoints (PrivateLink) keep it off the internet path entirely.', ro: 'Trafic către alte servicii AWS → interface VPC endpoints (PrivateLink) îl țin complet în afara internetului.' },
      { en: 'IPv6 egress → egress-only internet gateway, not NAT.', ro: 'Egress IPv6 → egress-only internet gateway, nu NAT.' },
    ],
    examTraps: [
      { en: 'Placing the NAT gateway in a PRIVATE subnet — it must sit in a public subnet with a route to the internet gateway.', ro: 'Plasarea NAT gateway-ului într-un subnet PRIVAT — trebuie să stea într-un subnet public cu rută către internet gateway.' },
      { en: 'One NAT gateway for all AZs = single point of failure + cross-AZ data charges; the HA answer is one per AZ.', ro: 'Un singur NAT gateway pentru toate AZ-urile = single point of failure + taxe cross-AZ; răspunsul de HA e unul per AZ.' },
      { en: 'Huge S3 transfer bills through NAT — the exam wants the gateway endpoint answer, not a bigger NAT.', ro: 'Facturi uriașe de transfer S3 prin NAT — examenul vrea răspunsul cu gateway endpoint, nu un NAT mai mare.' },
      { en: 'NAT gateway vs NAT instance: gateway = managed/HA-per-AZ/no SG; instance = cheaper at tiny scale, self-managed, can be a bastion.', ro: 'NAT gateway vs NAT instance: gateway = gestionat/HA per AZ/fără SG; instance = mai ieftin la scară mică, auto-gestionat, poate fi bastion.' },
    ],
    keyNumbers: [
      { label: { en: 'Max bandwidth (scales automatically)', ro: 'Bandă maximă (scalează automat)' }, value: { en: '100 Gbps', ro: '100 Gbps' } },
      { label: { en: 'NAT gateways for HA in 3 AZs', ro: 'NAT gateway-uri pentru HA în 3 AZ-uri' }, value: { en: '3 (one per AZ)', ro: '3 (unul per AZ)' } },
    ],
    retrievalQuestions: [
      {
        q: { en: 'Where must a NAT gateway be placed, and where does its route live?', ro: 'Unde trebuie plasat un NAT gateway și unde stă ruta lui?' },
        a: { en: 'The gateway itself goes in a public subnet (with an Elastic IP); the 0.0.0.0/0 route pointing to it goes in the PRIVATE subnets’ route tables.', ro: 'Gateway-ul stă într-un subnet public (cu Elastic IP); ruta 0.0.0.0/0 către el stă în route table-urile subneturilor PRIVATE.' },
      },
      {
        q: { en: 'How do you eliminate NAT data-processing costs for heavy S3 traffic from private subnets?', ro: 'Cum elimini costurile de procesare NAT pentru trafic S3 intens din subneturi private?' },
        a: { en: 'Create a gateway VPC endpoint for S3 — it is free and routes the traffic privately, bypassing the NAT gateway entirely.', ro: 'Creezi un gateway VPC endpoint pentru S3 — e gratuit și rutează traficul privat, ocolind complet NAT gateway-ul.' },
      },
    ],
    mermaidDiagram: {
      code: 'flowchart LR; subgraph VPC; subgraph Private subnet; EC2[EC2 instances]; end; subgraph Public subnet; NAT[NAT Gateway + EIP]; end; end; EC2 -->|0.0.0.0/0| NAT; NAT --> IGW[Internet Gateway]; IGW --> NET((Internet)); NET -. blocked inbound .-x EC2',
      caption: { en: 'Outbound-only path: private instances exit via NAT + IGW; unsolicited inbound is dropped.', ro: 'Drum doar outbound: instanțele private ies prin NAT + IGW; inbound-ul nesolicitat e respins.' },
    },
  },
  {
    id: 'autoscaling',
    abbreviation: 'ASG',
    fullName: 'Amazon EC2 Auto Scaling',
    category: 'compute',
    level: 'saa',
    exams: ['saa'],
    difficulty: 2,
    examFrequency: 'high',
    description: {
      en: 'Automatically adds or removes EC2 instances in an Auto Scaling group based on demand, replaces unhealthy instances, and balances capacity across Availability Zones.',
      ro: 'Adaugă sau elimină automat instanțe EC2 dintr-un Auto Scaling group în funcție de cerere, înlocuiește instanțele nesănătoase și echilibrează capacitatea între Availability Zone-uri.',
    },
    analogy: {
      en: 'A restaurant manager who calls in extra waiters when the queue grows, sends them home when it is quiet, and replaces anyone who calls in sick — never below the minimum crew.',
      ro: 'Un manager de restaurant care cheamă ospătari în plus când crește coada, îi trimite acasă când e liniște și înlocuiește pe oricine se îmbolnăvește — niciodată sub echipa minimă.',
    },
    examTips: [
      {
        key: 'min-max-desired',
        content: {
          en: 'Know min / max / desired capacity cold. Self-healing at fixed size = min = max = desired (e.g., 1/1/1 keeps exactly one instance alive).',
          ro: 'Știi la rece min / max / desired capacity. Self-healing la dimensiune fixă = min = max = desired (ex. 1/1/1 ține exact o instanță în viață).',
        },
      },
      {
        key: 'policies',
        content: {
          en: 'Scaling policies ranked for the exam: target tracking (keep CPU at 50% — the default answer) > step scaling (thresholds) > scheduled (known traffic times) > predictive (ML forecast).',
          ro: 'Politici de scalare pentru examen: target tracking (ține CPU la 50% — răspunsul implicit) > step scaling (praguri) > scheduled (trafic cunoscut în timp) > predictive (predicție ML).',
        },
      },
    ],
    pricing: {
      en: 'Auto Scaling itself is free — you pay only for the EC2 instances (and CloudWatch alarms) it manages.',
      ro: 'Auto Scaling în sine e gratuit — plătești doar instanțele EC2 (și alarmele CloudWatch) pe care le gestionează.',
    },
    connections: ['ec2', 'elb', 'cloudwatch', 'sqs'],
    docsUrl: 'https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html',
    visual: { color: 'hsl(25, 95%, 55%)', icon: 'trending-up' },
    examDomains: ['design-resilient', 'design-performant', 'design-cost'],
    howItWorks: [
      { en: 'You define a launch template (AMI, instance type, user data) and an Auto Scaling group with min/max/desired capacity across chosen subnets/AZs.', ro: 'Definești un launch template (AMI, tip de instanță, user data) și un Auto Scaling group cu min/max/desired capacity pe subneturile/AZ-urile alese.' },
      { en: 'CloudWatch metrics (CPU, request count, SQS queue depth) feed scaling policies that adjust the desired capacity.', ro: 'Metricile CloudWatch (CPU, număr de cereri, adâncimea cozii SQS) alimentează politici de scalare care ajustează desired capacity.' },
      { en: 'The ASG launches or terminates instances to match desired capacity, spreading them across AZs.', ro: 'ASG-ul pornește sau oprește instanțe ca să atingă desired capacity, distribuindu-le între AZ-uri.' },
      { en: 'Health checks (EC2 or ELB) mark bad instances unhealthy; the ASG terminates and replaces them automatically.', ro: 'Health check-urile (EC2 sau ELB) marchează instanțele defecte ca nesănătoase; ASG-ul le termină și le înlocuiește automat.' },
    ],
    keyFacts: [
      { en: 'Free service — you pay only for the resources it launches.', ro: 'Serviciu gratuit — plătești doar resursele pe care le pornește.' },
      { en: 'min ≤ desired ≤ max; the ASG constantly reconciles reality to desired.', ro: 'min ≤ desired ≤ max; ASG-ul reconciliază permanent realitatea cu desired.' },
      { en: 'Four policy types: target tracking, step, scheduled, predictive.', ro: 'Patru tipuri de politici: target tracking, step, scheduled, predictive.' },
      { en: 'Use ELB health checks so instances failing the app (not just the VM) get replaced.', ro: 'Folosește health check-uri ELB ca instanțele care pică aplicația (nu doar VM-ul) să fie înlocuite.' },
      { en: 'Can mix On-Demand + Spot in one group (mixed instances policy) for cost optimization.', ro: 'Poate combina On-Demand + Spot în același grup (mixed instances policy) pentru optimizarea costurilor.' },
    ],
    whenToUse: [
      { en: 'Variable traffic on EC2 — scale out on demand spikes, scale in to save money at night.', ro: 'Trafic variabil pe EC2 — scale out la vârfuri, scale in ca să economisești noaptea.' },
      { en: 'Self-healing: ASG 1/1/1 keeps a single critical instance always running.', ro: 'Self-healing: ASG 1/1/1 ține o singură instanță critică mereu pornită.' },
      { en: 'Worker fleets scaled on SQS queue depth (decoupled architectures).', ro: 'Flote de workeri scalate după adâncimea cozii SQS (arhitecturi decuplate).' },
    ],
    whenNotToUse: [
      { en: 'Serverless workloads — Lambda and Fargate scale themselves without ASGs.', ro: 'Workload-uri serverless — Lambda și Fargate scalează singure, fără ASG-uri.' },
      { en: 'Stateful single-node apps that cannot tolerate instance replacement without extra design (state must live in EFS/RDS/S3).', ro: 'Aplicații stateful pe un singur nod care nu tolerează înlocuirea instanței fără design suplimentar (starea trebuie să stea în EFS/RDS/S3).' },
    ],
    examTraps: [
      { en: '"Add more instances manually before Black Friday" → scheduled scaling; "unpredictable spikes" → target tracking. Match the policy to the traffic pattern.', ro: '„Adaugă instanțe manual înainte de Black Friday" → scheduled scaling; „vârfuri imprevizibile" → target tracking. Potrivește politica pe tiparul de trafic.' },
      { en: 'ASG scales the number of instances (horizontal); it never resizes an instance (vertical).', ro: 'ASG scalează numărul de instanțe (orizontal); nu redimensionează niciodată o instanță (vertical).' },
      { en: 'With default EC2 health checks, an app crash on a healthy VM is NOT detected — the ELB health check option is the fix.', ro: 'Cu health check-urile EC2 implicite, un crash de aplicație pe un VM sănătos NU e detectat — opțiunea de health check ELB e rezolvarea.' },
      { en: 'AWS Auto Scaling (the umbrella service, also covers DynamoDB/Aurora/ECS) ≠ Amazon EC2 Auto Scaling (ASGs only).', ro: 'AWS Auto Scaling (serviciul-umbrelă, acoperă și DynamoDB/Aurora/ECS) ≠ Amazon EC2 Auto Scaling (doar ASG-uri).' },
    ],
    keyNumbers: [
      { label: { en: 'Self-healing fixed-size config', ro: 'Configurație self-healing la dimensiune fixă' }, value: { en: 'min = max = desired', ro: 'min = max = desired' } },
      { label: { en: 'Default target-tracking cooldown', ro: 'Cooldown implicit la target tracking' }, value: { en: '300 s', ro: '300 s' } },
    ],
    retrievalQuestions: [
      {
        q: { en: 'Which scaling policy keeps average CPU near a set value, and why is it the default exam answer?', ro: 'Ce politică de scalare ține CPU-ul mediu aproape de o valoare setată și de ce e răspunsul implicit la examen?' },
        a: { en: 'Target tracking — you declare the target (e.g., 50% CPU) and it computes scaling automatically, with the least configuration and no thresholds to tune.', ro: 'Target tracking — declari ținta (ex. 50% CPU) și calculează singur scalarea, cu minimum de configurare și fără praguri de reglat.' },
      },
      {
        q: { en: 'How does an ASG give you self-healing for exactly one instance?', ro: 'Cum îți dă un ASG self-healing pentru exact o instanță?' },
        a: { en: 'Set min = max = desired = 1: if the instance fails its health check, the ASG terminates it and launches a replacement automatically.', ro: 'Setezi min = max = desired = 1: dacă instanța pică health check-ul, ASG-ul o termină și pornește automat o înlocuitoare.' },
      },
    ],
    mermaidDiagram: {
      code: 'flowchart LR; CW[CloudWatch metric] --> P[Scaling policy]; P --> ASG{Auto Scaling group}; ASG -->|scale out| L[Launch instance]; ASG -->|scale in| T[Terminate instance]; HC[ELB health check] -->|unhealthy| R[Replace instance]; R --> ASG',
      caption: { en: 'Metrics drive desired capacity; health checks drive replacement — both converge on the ASG.', ro: 'Metricile determină desired capacity; health check-urile determină înlocuirea — ambele converg în ASG.' },
    },
  },
];
