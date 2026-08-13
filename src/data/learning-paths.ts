import type { LearningPath } from '@/types';

/**
 * Curated study paths for the CLF-C02 exam. Each path = ordered sequence
 * of services + concepts + comparisons that build understanding incrementally.
 *
 * Order matters: prerequisites first, then specialized topics.
 */
export const learningPaths: LearningPath[] = [
  // ========================================================================
  // 1. FOUNDATIONS — must-know for every CLF candidate
  // ========================================================================
  {
    id: 'foundations',
    title: { en: 'Foundations', ro: 'Fundamentele' },
    tagline: {
      en: 'The 10 services + 5 concepts every CLF candidate must know cold.',
      ro: 'Cele 10 servicii + 5 concepte pe care orice candidat CLF trebuie să le știe perfect.',
    },
    estimatedMinutes: 60,
    difficulty: 'beginner',
    steps: [
      { kind: 'concept', refId: 'cloud-advantages',
        note: { en: 'Why cloud at all? The 6 advantages AWS pitches.', ro: 'De ce cloud în general? Cele 6 avantaje promovate de AWS.' } },
      { kind: 'concept', refId: 'regions' },
      { kind: 'concept', refId: 'availability-zones',
        note: { en: 'Foundation of multi-AZ HA. Comes up in nearly every exam scenario.', ro: 'Baza HA multi-AZ. Apare în aproape orice scenariu de examen.' } },
      { kind: 'concept', refId: 'shared-responsibility',
        note: { en: 'The single most important security concept. Memorize the line.', ro: 'Cel mai important concept de securitate. Memorează linia.' } },
      { kind: 'concept', refId: 'well-architected' },
      { kind: 'service', refId: 'iam',
        note: { en: 'Free, global. Users vs groups vs roles is a guaranteed exam topic.', ro: 'Gratuit, global. Useri vs grupuri vs roluri = subiect garantat.' } },
      { kind: 'service', refId: 'ec2' },
      { kind: 'service', refId: 's3' },
      { kind: 'service', refId: 'vpc' },
      { kind: 'service', refId: 'lambda',
        note: { en: 'Canonical serverless. Know the 15-min limit and pay-per-ms.', ro: 'Serverless canonic. Limita 15 min și plata pe ms.' } },
      { kind: 'service', refId: 'rds' },
      { kind: 'service', refId: 'cloudwatch' },
      { kind: 'service', refId: 'cloudfront' },
      { kind: 'service', refId: 'elb' },
      { kind: 'service', refId: 'route53' },
    ],
  },

  // ========================================================================
  // 2. STORAGE DEEP DIVE
  // ========================================================================
  {
    id: 'storage-deep-dive',
    title: { en: 'Storage Deep Dive', ro: 'Storage în profunzime' },
    tagline: {
      en: 'Block, file, object, archive, hybrid. When to pick which.',
      ro: 'Block, file, object, arhivă, hibrid. Când folosești fiecare.',
    },
    estimatedMinutes: 45,
    difficulty: 'intermediate',
    prerequisites: ['foundations'],
    steps: [
      { kind: 'service', refId: 's3',
        note: { en: 'Object storage — buckets, classes, lifecycle. Most-tested storage service.', ro: 'Object storage — bucket-uri, clase, lifecycle. Cel mai testat serviciu.' } },
      { kind: 'service', refId: 'ebs',
        note: { en: 'Block — like a hard drive attached to ONE EC2 (Multi-Attach is rare exception).', ro: 'Block — ca un hard disk atașat la O instanță EC2 (Multi-Attach e excepția).' } },
      { kind: 'service', refId: 'efs',
        note: { en: 'NFS — Linux file system shared across many EC2, multi-AZ.', ro: 'NFS — file system Linux shared între multe EC2, multi-AZ.' } },
      { kind: 'comparison', refId: 'storage-ebs-efs-s3',
        note: { en: 'Side-by-side. The classic exam question.', ro: 'Side-by-side. Întrebarea clasică de examen.' } },
      { kind: 'service', refId: 'fsx' },
      { kind: 'service', refId: 'glacier',
        note: { en: 'Archive tiers: Instant / Flexible / Deep Archive. Each has min storage duration.', ro: 'Tier-uri arhivă: Instant / Flexible / Deep Archive. Fiecare are durată minimă.' } },
      { kind: 'service', refId: 'snow',
        note: { en: 'Physical devices for petabyte transfer. Faster than internet for huge data.', ro: 'Dispozitive fizice pentru transfer petabyte. Mai rapid decât internet pentru date uriașe.' } },
      { kind: 'service', refId: 'storagegateway' },
      { kind: 'service', refId: 'awsbackup' },
    ],
  },

  // ========================================================================
  // 3. NETWORKING ESSENTIALS
  // ========================================================================
  {
    id: 'networking-essentials',
    title: { en: 'Networking Essentials', ro: 'Esențialul de Networking' },
    tagline: {
      en: 'VPCs, edge, load balancing — the connective tissue of any AWS architecture.',
      ro: 'VPC-uri, edge, load balancing — țesutul conectiv al oricărei arhitecturi AWS.',
    },
    estimatedMinutes: 50,
    difficulty: 'intermediate',
    prerequisites: ['foundations'],
    steps: [
      { kind: 'service', refId: 'vpc',
        note: { en: 'Subnets, route tables, IGW, NAT, peering. Build mental model first.', ro: 'Subnet-uri, route tables, IGW, NAT, peering. Construiește modelul mental.' } },
      { kind: 'comparison', refId: 'net-sg-vs-nacl',
        note: { en: 'Stateful instance bouncer vs stateless subnet bouncer. Memorize the analogy.', ro: 'Bouncer stateful pentru instanță vs stateless pentru subnet. Memorează analogia.' } },
      { kind: 'service', refId: 'route53',
        note: { en: 'DNS + 7 routing policies + health checks. 100% SLA.', ro: 'DNS + 7 politici de routing + health checks. SLA 100%.' } },
      { kind: 'service', refId: 'elb',
        note: { en: 'ALB (L7), NLB (L4), GWLB (L3). Know which use case picks which.', ro: 'ALB (L7), NLB (L4), GWLB (L3). Știi care use case alege care.' } },
      { kind: 'service', refId: 'cloudfront' },
      { kind: 'service', refId: 'globalaccelerator' },
      { kind: 'comparison', refId: 'edge-cf-vs-ga',
        note: { en: 'CloudFront caches content; Global Accelerator routes traffic. Different jobs.', ro: 'CloudFront face cache la conținut; Global Accelerator rutează trafic. Job-uri diferite.' } },
      { kind: 'service', refId: 'directconnect',
        note: { en: 'Dedicated fiber from on-prem. Slow to provision but predictable latency.', ro: 'Fibră dedicată de la on-prem. Provisionare lentă dar latență predictibilă.' } },
      { kind: 'service', refId: 'privatelink' },
    ],
  },

  // ========================================================================
  // 4. SECURITY & COMPLIANCE
  // ========================================================================
  {
    id: 'security-compliance',
    title: { en: 'Security & Compliance', ro: 'Security & Compliance' },
    tagline: {
      en: '30% of the exam. Identity, encryption, detection, audit — in that order.',
      ro: '30% din examen. Identitate, criptare, detecție, audit — în această ordine.',
    },
    estimatedMinutes: 65,
    difficulty: 'intermediate',
    prerequisites: ['foundations'],
    steps: [
      { kind: 'concept', refId: 'shared-responsibility' },
      { kind: 'concept', refId: 'iam-best-practices' },
      { kind: 'service', refId: 'iam' },
      { kind: 'comparison', refId: 'iam-user-group-role',
        note: { en: 'When to use which identity primitive. Constant exam fodder.', ro: 'Când folosești fiecare primitivă identitate. Apare des în examen.' } },
      { kind: 'service', refId: 'organizations',
        note: { en: 'SCPs = guardrails on max permissions. Free + global.', ro: 'SCP-urile = guardrails pe permisiuni maxime. Gratuit + global.' } },
      { kind: 'service', refId: 'iamic' },
      { kind: 'service', refId: 'cognito',
        note: { en: 'End-user auth (millions). Different from IAM (which is for AWS account access).', ro: 'Auth utilizatori finali (milioane). Diferit de IAM (acces cont AWS).' } },
      { kind: 'service', refId: 'kms' },
      { kind: 'service', refId: 'secretsmanager' },
      { kind: 'service', refId: 'shield',
        note: { en: 'Standard = free L3/4 DDoS. Advanced = $3K/month + 24/7 DRT + WAF.', ro: 'Standard = L3/4 DDoS gratuit. Advanced = $3K/lună + DRT 24/7 + WAF.' } },
      { kind: 'service', refId: 'waf' },
      { kind: 'service', refId: 'guardduty' },
      { kind: 'service', refId: 'macie' },
      { kind: 'service', refId: 'inspector' },
      { kind: 'service', refId: 'cloudtrail' },
      { kind: 'service', refId: 'config' },
      { kind: 'comparison', refId: 'obs-cw-ct-config',
        note: { en: 'CloudWatch (metrics+logs), CloudTrail (API audit), Config (compliance). Memorize the trio.', ro: 'CloudWatch (metrici+logs), CloudTrail (audit API), Config (compliance). Memorează trio-ul.' } },
      { kind: 'concept', refId: 'compliance-programs' },
    ],
  },

  // ========================================================================
  // 5. COST & BILLING
  // ========================================================================
  {
    id: 'cost-billing',
    title: { en: 'Cost & Billing', ro: 'Cost & Facturare' },
    tagline: {
      en: 'Estimate, monitor, optimize. The 4 tools every AWS user should know.',
      ro: 'Estimezi, monitorizezi, optimizezi. Cele 4 tool-uri pe care orice user AWS le știe.',
    },
    estimatedMinutes: 30,
    difficulty: 'beginner',
    exams: ['clf'],
    steps: [
      { kind: 'concept', refId: 'pricing-fundamentals',
        note: { en: 'Pay-as-you-go, reserved discounts, spot, savings plans.', ro: 'Pay-as-you-go, RI, spot, savings plans.' } },
      { kind: 'service', refId: 'calculator',
        note: { en: 'BEFORE deploy: estimate cost.', ro: 'ÎNAINTE deploy: estimezi costul.' } },
      { kind: 'service', refId: 'budgets',
        note: { en: 'DURING usage: alerts when over budget.', ro: 'ÎN TIMPUL utilizării: alerte când depășești bugetul.' } },
      { kind: 'service', refId: 'costexplorer',
        note: { en: 'AFTER usage: visualize, find waste.', ro: 'DUPĂ utilizare: vizualizezi, găsești risipa.' } },
      { kind: 'service', refId: 'trustedadvisor',
        note: { en: 'Cross-cutting: cost + security + performance + fault tolerance + service limits.', ro: 'Transversal: cost + securitate + performanță + fault tolerance + limite servicii.' } },
      { kind: 'service', refId: 'organizations',
        note: { en: 'Consolidated billing — pool volume discounts, share free tier.', ro: 'Consolidated billing — împarți reduceri volum, free tier shared.' } },
      { kind: 'concept', refId: 'support-plans',
        note: { en: 'Basic / Developer / Business / Enterprise — know what each unlocks.', ro: 'Basic / Developer / Business / Enterprise — știi ce deblochează fiecare.' } },
      { kind: 'service', refId: 'supportplans' },
      { kind: 'service', refId: 'marketplace' },
    ],
  },
  // ========================================================================
  // ======================= SAA-C03 LEARNING PATHS =========================
  // All entries below are tagged exams: ['saa'] — shown only on the SAA exam.
  // ========================================================================

  // ------------------------------------------------------------------------
  // SAA 1. Resilient Architectures (Domain 2 — 26%)
  // ------------------------------------------------------------------------
  {
    id: 'saa-resilient-architectures',
    title: { en: 'SAA: Resilient Architectures', ro: 'SAA: Arhitecturi Reziliente' },
    tagline: {
      en: 'HA, scaling, decoupling and the 4 DR strategies — Domain 2 (26% of the exam).',
      ro: 'HA, scaling, decuplare și cele 4 strategii DR — Domeniul 2 (26% din examen).',
    },
    estimatedMinutes: 90,
    difficulty: 'advanced',
    exams: ['saa'],
    prerequisites: ['foundations'],
    steps: [
      { kind: 'service', refId: 'autoscaling',
        note: { en: 'Launch templates, scaling policies (target tracking / step / scheduled / predictive), cooldowns.', ro: 'Launch templates, politici de scaling (target tracking / step / scheduled / predictive), cooldowns.' } },
      { kind: 'service', refId: 'elb',
        note: { en: 'Health checks, sticky sessions, cross-zone balancing, connection draining.', ro: 'Health checks, sticky sessions, cross-zone balancing, connection draining.' } },
      { kind: 'comparison', refId: 'saa-alb-nlb-gwlb',
        note: { en: 'ALB vs NLB vs GWLB — a guaranteed exam decision.', ro: 'ALB vs NLB vs GWLB — decizie garantată la examen.' } },
      { kind: 'service', refId: 'route53',
        note: { en: 'Failover routing + health checks are the DNS half of every DR answer.', ro: 'Failover routing + health checks sunt jumătatea DNS a oricărui răspuns DR.' } },
      { kind: 'service', refId: 'rds',
        note: { en: 'Multi-AZ (HA, sync) vs read replicas (scaling, async). Never confuse them.', ro: 'Multi-AZ (HA, sincron) vs read replicas (scaling, asincron). Nu le confunda.' } },
      { kind: 'service', refId: 'aurora',
        note: { en: 'Global Database: RPO 1s, RTO < 1 min — the active-active building block.', ro: 'Global Database: RPO 1s, RTO < 1 min — piesa pentru activ-activ.' } },
      { kind: 'service', refId: 'rdsproxy',
        note: { en: 'Absorbs Lambda connection storms; reduces failover time by up to 66%.', ro: 'Absoarbe furtunile de conexiuni Lambda; reduce timpul de failover cu până la 66%.' } },
      { kind: 'service', refId: 'sqs',
        note: { en: 'Decoupling = resilience. Visibility timeout + DLQ + idempotency.', ro: 'Decuplarea = reziliență. Visibility timeout + DLQ + idempotență.' } },
      { kind: 'service', refId: 'dynamodb',
        note: { en: 'Global Tables (require Streams) = multi-Region active-active NoSQL.', ro: 'Global Tables (cer Streams) = NoSQL multi-regiune activ-activ.' } },
      { kind: 'comparison', refId: 'saa-dr-strategies',
        note: { en: 'The 4 DR strategies ranked by RTO/RPO/cost. Memorize the order.', ro: 'Cele 4 strategii DR ordonate după RTO/RPO/cost. Memorează ordinea.' } },
      { kind: 'service', refId: 'awsbackup',
        note: { en: 'Centralized backup + Vault Lock (WORM — even root cannot delete).', ro: 'Backup centralizat + Vault Lock (WORM — nici root nu poate șterge).' } },
      { kind: 'service', refId: 'dms',
        note: { en: 'Database migrations with CDC; source DB stays online.', ro: 'Migrări de baze de date cu CDC; sursa rămâne online.' } },
    ],
  },

  // ------------------------------------------------------------------------
  // SAA 2. Networking Deep Dive (Domains 1, 3, 4)
  // ------------------------------------------------------------------------
  {
    id: 'saa-networking-deep-dive',
    title: { en: 'SAA: Networking Deep Dive', ro: 'SAA: Networking în Profunzime' },
    tagline: {
      en: 'Private connectivity, hybrid links and edge — where Domains 1, 3 and 4 overlap.',
      ro: 'Conectivitate privată, legături hibride și edge — unde se suprapun Domeniile 1, 3 și 4.',
    },
    estimatedMinutes: 75,
    difficulty: 'advanced',
    exams: ['saa'],
    prerequisites: ['networking-essentials'],
    steps: [
      { kind: 'service', refId: 'vpc',
        note: { en: 'Subnet/route/CIDR design is assumed knowledge for every SAA scenario.', ro: 'Designul de subnet/route/CIDR e cunoștință presupusă în orice scenariu SAA.' } },
      { kind: 'service', refId: 'natgateway',
        note: { en: 'Per-AZ placement vs shared — a recurring cost-optimization question.', ro: 'Plasare per-AZ vs partajat — întrebare recurentă de optimizare a costurilor.' } },
      { kind: 'service', refId: 'transitgateway',
        note: { en: 'Hub-and-spoke for many VPCs; replaces meshes of peering connections.', ro: 'Hub-and-spoke pentru multe VPC-uri; înlocuiește mesh-urile de peering.' } },
      { kind: 'service', refId: 'privatelink',
        note: { en: 'Expose a service to thousands of consumer VPCs without peering.', ro: 'Expui un serviciu către mii de VPC-uri consumatoare fără peering.' } },
      { kind: 'comparison', refId: 'saa-vpc-endpoints',
        note: { en: 'Gateway (free, S3/DynamoDB) vs Interface (ENI, PrivateLink). Cost trap!', ro: 'Gateway (gratuit, S3/DynamoDB) vs Interface (ENI, PrivateLink). Capcană de cost!' } },
      { kind: 'service', refId: 'directconnect',
        note: { en: 'Dedicated link, weeks to provision; Site-to-Site VPN as its backup.', ro: 'Legătură dedicată, săptămâni de provizionare; Site-to-Site VPN ca backup.' } },
      { kind: 'service', refId: 'globalaccelerator',
        note: { en: '2 static anycast IPs, TCP/UDP — vs CloudFront (caching, HTTP).', ro: '2 IP-uri statice anycast, TCP/UDP — vs CloudFront (caching, HTTP).' } },
      { kind: 'service', refId: 'cloudfront',
        note: { en: 'OAC to lock S3 origins; signed URLs/cookies for private content.', ro: 'OAC pentru a securiza originile S3; signed URLs/cookies pentru conținut privat.' } },
      { kind: 'service', refId: 'networkfirewall',
        note: { en: 'Stateful VPC-level inspection — beyond SG/NACL.', ro: 'Inspecție stateful la nivel de VPC — dincolo de SG/NACL.' } },
      { kind: 'service', refId: 'waf',
        note: { en: 'L7 rules (SQLi, XSS, rate limiting) on ALB / API GW / CloudFront.', ro: 'Reguli L7 (SQLi, XSS, rate limiting) pe ALB / API GW / CloudFront.' } },
    ],
  },

  // ------------------------------------------------------------------------
  // SAA 3. Storage & Data (Domain 3 — storage, ingestion, caching)
  // ------------------------------------------------------------------------
  {
    id: 'saa-storage-data',
    title: { en: 'SAA: Storage & Data', ro: 'SAA: Storage & Date' },
    tagline: {
      en: 'Pick the right storage, move data in, cache it fast — the heart of Domain 3.',
      ro: 'Alegi storage-ul corect, aduci datele, le servești rapid din cache — inima Domeniului 3.',
    },
    estimatedMinutes: 90,
    difficulty: 'advanced',
    exams: ['saa'],
    prerequisites: ['storage-deep-dive'],
    steps: [
      { kind: 'service', refId: 's3',
        note: { en: 'Storage classes + min durations, per-prefix performance, replication.', ro: 'Clase de storage + durate minime, performanță per prefix, replicare.' } },
      { kind: 'service', refId: 'ebs',
        note: { en: 'gp3 vs io2 vs st1/sc1 — match IOPS/throughput caps to the workload.', ro: 'gp3 vs io2 vs st1/sc1 — potrivește limitele IOPS/throughput cu workload-ul.' } },
      { kind: 'service', refId: 'efs',
        note: { en: 'Performance modes (GP vs Max I/O) + throughput modes (Bursting / Provisioned / Elastic).', ro: 'Moduri de performanță (GP vs Max I/O) + moduri de throughput (Bursting / Provisioned / Elastic).' } },
      { kind: 'service', refId: 'fsx',
        note: { en: '4 flavors: Windows (SMB/AD), Lustre (HPC + S3), ONTAP, OpenZFS.', ro: '4 variante: Windows (SMB/AD), Lustre (HPC + S3), ONTAP, OpenZFS.' } },
      { kind: 'comparison', refId: 'storage-ebs-efs-s3',
        note: { en: 'Refresher — block vs file vs object, now with SAA eyes.', ro: 'Recapitulare — block vs file vs object, acum cu ochi de SAA.' } },
      { kind: 'service', refId: 'storagegateway',
        note: { en: 'File vs Volume (cached/stored) vs Tape — the hybrid-storage question.', ro: 'File vs Volume (cached/stored) vs Tape — întrebarea de storage hibrid.' } },
      { kind: 'service', refId: 'datasync',
        note: { en: 'Scheduled online sync (NFS/SMB/HDFS → S3/EFS/FSx), preserves metadata.', ro: 'Sincronizare online programată (NFS/SMB/HDFS → S3/EFS/FSx), păstrează metadatele.' } },
      { kind: 'service', refId: 'transferfamily',
        note: { en: 'Managed SFTP/FTPS/FTP/AS2 in front of S3 or EFS.', ro: 'SFTP/FTPS/FTP/AS2 managed în fața S3 sau EFS.' } },
      { kind: 'service', refId: 'snow',
        note: { en: 'Offline migration: > 1 week over the network → ship a Snowball Edge.', ro: 'Migrare offline: > 1 săptămână pe rețea → trimiți un Snowball Edge.' } },
      { kind: 'service', refId: 'elasticache',
        note: { en: 'Redis vs Memcached feature split + lazy loading vs write-through.', ro: 'Diferențele Redis vs Memcached + lazy loading vs write-through.' } },
      { kind: 'service', refId: 'kinesis',
        note: { en: 'Real-time streams: shards, capacity modes, replay.', ro: 'Stream-uri real-time: shard-uri, moduri de capacitate, replay.' } },
      { kind: 'service', refId: 'firehose',
        note: { en: 'Near-real-time delivery to S3/Redshift/OpenSearch — zero admin, vs Kinesis.', ro: 'Livrare near-real-time către S3/Redshift/OpenSearch — zero administrare, vs Kinesis.' } },
    ],
  },
];

/** Find a learning path by id. */
export function getLearningPathById(id: string): LearningPath | undefined {
  return learningPaths.find((p) => p.id === id);
}
