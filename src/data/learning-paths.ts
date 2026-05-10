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
];

/** Find a learning path by id. */
export function getLearningPathById(id: string): LearningPath | undefined {
  return learningPaths.find((p) => p.id === id);
}
