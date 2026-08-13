# AI Collaboration File — SAA-C03 Extension

> **Shared coordination file for Claude Code and Codex.** Both agents MUST read this
> before working and append to the Status Log after each work session.
> Owner: Andy (andreisirbu91). Language of app content: bilingual `en` + `ro`, always.

## Mission

Extend the existing CLF-C02 study app (`aws-cloud-atlas`) to fully cover the
**AWS Certified Solutions Architect – Associate (SAA-C03)** exam, reusing the
existing learning-science schema and UI (retrieval practice, spaced repetition,
per-option quiz explanations, comparisons, learning paths).

## SAA-C03 exam facts (from official AWS Exam Guide v1.0)

| Domain | Weight |
|---|---|
| 1. Design Secure Architectures | 30% |
| 2. Design Resilient Architectures | 26% |
| 3. Design High-Performing Architectures | 24% |
| 4. Design Cost-Optimized Architectures | 20% |

- 65 questions (50 scored + 15 unscored), 130 min, scaled score 100–1000, **pass = 720**.
- Question types: multiple choice (1-of-4) and multiple response (2+ of 5+).
- Task statements:
  - **D1**: 1.1 secure access (IAM, STS, cross-account, Control Tower, SCPs, federation) · 1.2 secure workloads (VPC security, SG/NACL, Cognito/GuardDuty/Macie, Shield/WAF, Secrets Manager, VPN/DX) · 1.3 data security (KMS, ACM, encryption at rest/in transit, backups, key rotation)
  - **D2**: 2.1 scalable & loosely coupled (API GW, SQS/SNS, microservices, containers ECS/EKS/Fargate, Lambda, Step Functions, caching, read replicas) · 2.2 HA & fault tolerance (Route 53, DR strategies: backup&restore / pilot light / warm standby / active-active, RPO/RTO, RDS Proxy, X-Ray, immutable infra)
  - **D3**: 3.1 storage (S3/EBS/EFS/FSx) · 3.2 compute (EC2 types, Auto Scaling, Batch, EMR, Lambda sizing) · 3.3 databases (Aurora, DynamoDB, ElastiCache, RDS, capacity/IOPS, proxies) · 3.4 network (CloudFront, Global Accelerator, PrivateLink, DX/VPN, LB strategy, subnet/routing/IP design) · 3.5 data ingestion & transform (Kinesis, Glue, Athena, Lake Formation, QuickSight, DataSync, Storage Gateway, EMR, csv→parquet)
  - **D4**: 4.1 cost storage (lifecycle, tiering, Requester Pays, backup/archive) · 4.2 cost compute (Spot/RI/Savings Plans, instance families, hibernation, ALB vs NLB vs GWLB) · 4.3 cost DB (DynamoDB vs RDS, serverless, engine migration) · 4.4 cost network (NAT GW per-AZ vs shared, DX vs VPN, VPC endpoints, CDN/edge caching, Region-to-Region routing)
- Key **out-of-scope**: Lightsail, developer tools (CodeBuild/CodeDeploy/CodeCommit/CDK/Cloud9), IoT (all), most Elemental/Media, OpsWorks, App Mesh, Cloud Map, MWAA, GameLift, deep ML services.

## Content sources (rank in this order)

1. **Official Exam Guide PDF** — facts above; full task statements available on request.
2. **Maarek SAA slides v48** — `C:\Users\legio\Downloads\code_v2025-10-27\AWS Certified Solutions Architect Slides v48.pdf` (876 pages, extract text with `pypdf`; PDF page rendering unavailable). Section→page index (1-based) saved at
   `scratchpad maarek-saa-v48-index.json` and reproduced here:

   | p. | Section | p. | Section |
   |---|---|---|---|
   | 14 | Getting Started | 375 | Integration & Messaging (SQS/SNS/Kinesis/MQ) |
   | ~20 | IAM | 414 | Containers (ECS/EKS/ECR/Fargate) |
   | 41 | EC2 Basics | 438 | Serverless (Lambda/DynamoDB/API GW/Cognito) |
   | 78 | EC2 Associate | 491 | Serverless Architectures |
   | 93 | EC2 Instance Storage (EBS/EFS) | 513 | Databases in AWS |
   | 118 | HA & Scalability (ELB/ASG) | 527 | Data & Analytics (Athena/EMR/Glue/Redshift...) |
   | 160 | RDS, Aurora & ElastiCache | 560 | Machine Learning |
   | 193 | Route 53 | ~580 | Monitoring (CloudWatch/CloudTrail/Config) |
   | 227 | Classic SA (whitepaper archs) | 619 | Advanced Identity (Organizations/SSO/Directory) |
   | 267 | S3 | 648 | Security & Encryption (KMS/SSM/Secrets/Shield/WAF) |
   | 293 | S3 Advanced | 697 | VPC |
   | 313 | S3 Security | 775 | Disaster Recovery & Migrations (DMS/Snow/DataSync) |
   | 335 | CloudFront & Global Accelerator | 802 | More Solutions Architecture |
   | 350 | Storage Extras (Snow/FSx/Storage GW) | 824 | Other Services |

3. **docs.aws.amazon.com** — for verifying limits/numbers. Via Firecrawl scrape API
   (Andy has the key) — skip the first ~1500 chars (cookie banner).
4. Cross-check every number (limits, durability, timeouts) between ≥2 sources.

## Non-negotiable conventions

- **Bilingual**: every user-visible text field is `Record<string,string>` with BOTH
  `en` and `ro` keys. Never ship a field with only `en`.
- **Types**: single source of truth `src/types/index.ts`. SAA services use
  `level: 'saa'`. Services that are on both exams stay `level: 'clf'` (CLF ⊂ SAA).
- **Learning-science fields** (see `Service` type): `howItWorks`, `keyFacts` (HARD CAP 5),
  `whenToUse`, `whenNotToUse`, `examTraps`, `keyNumbers`, `retrievalQuestions`,
  `mermaidDiagram` (only where a flow genuinely clarifies). Exam-focused (“fix ce te
  întreabă la examen”), memorization-structured — not prose dumps.
- **Questions**: `QuizQuestion` with `optionExplanations` (one per option, why
  right/wrong — Udemy style) + `references` (official AWS docs links) + `examDomain`
  + `source`. Difficulty honest (SAA questions are scenario-based: “A company needs…”).
- **Scenario style for SAA**: stem describes requirements (cost / HA / performance /
  security constraint), options are plausible service combos. Avoid trivia-only stems.
- **Verify**: `npm run build` must pass before any commit. TS target rejects spreading
  Map iterators — use `Array.from(map.values())`.
- **Commits**: NO `Co-Authored-By` lines, NO “Generated with …” footers. Andy is sole author.

## File ownership (avoid merge conflicts)

- **New SAA data goes in NEW files** — never append SAA content to existing CLF files:
  - Services: `src/data/services-saa-<area>.ts` (e.g. `services-saa-network.ts`)
  - Questions: `src/data/questions/saa-<domain>.ts` (e.g. `saa-design-secure.ts`)
  - Comparisons/concepts/paths: add SAA entries in clearly marked blocks at the end,
    or new files if the module structure allows.
- Shared files (`src/types/index.ts`, `quiz-questions.ts` aggregator, UI components):
  **only ONE agent edits them per session** — claim them in the Status Log BEFORE editing.
- Question ID prefix: `saa-<domain>-<nnn>` (e.g. `saa-sec-001`). Service IDs: kebab-case
  official-ish names (`aurora`, `elasticache`, `transit-gateway`).

## Current codebase state (scanned 2026-08-13)

- All 97 services are `level: 'clf'`; `level` is currently dead data (no UI reads it).
  ~40 SAA-critical services already exist (aurora, elasticache, efs, fsx, kinesis,
  apigateway, stepfunctions, directconnect, globalaccelerator, waf, kms,
  secretsmanager, cognito, datasync, storagegateway…). **Missing entirely**: Transit
  Gateway, NAT Gateway, EC2 Auto Scaling/ASG, VPC endpoints (gateway), STS/AssumeRole,
  OpenSearch, Lake Formation, MSK, RDS Proxy topics, DynamoDB DAX/Streams/Global
  Tables, Kinesis sub-services, CloudHSM, Network Firewall, EBS volume types…
- Question bank: 255 CLF questions across 14 files, aggregated in
  `src/data/quiz-questions.ts` with `inferDomain()` fallback to `'tech-services'` —
  SAA questions **MUST set `examDomain` explicitly** or they get mis-tagged.
- No exam switcher exists yet; Claude is building it (see Status Log).

## Domain model being introduced by Claude (2026-08-13 session)

- `ExamId = 'clf' | 'saa'` in `src/types/index.ts`.
- `ExamDomain` widened with SAA values: `'design-secure' | 'design-resilient' |
  'design-performant' | 'design-cost'`.
- New `src/data/exams.ts`: per-exam config (domains, weights, question count, timer
  130 min for SAA, pass ≈72%), domain→exam mapping, bilingual domain labels.
- Optional `exams?: ExamId[]` on `Service`, `Concept`, `Comparison`, `LearningPath`:
  **absent = visible on BOTH exams** (CLF content is mostly SAA-relevant); tag
  CLF-only entries `exams: ['clf']` (e.g. lightsail — SAA out-of-scope), SAA-only
  entries `exams: ['saa']`. New SAA services also get `level: 'saa'`.
- Persisted `activeExam` in the zustand store (v5). Progress stays shared per
  service (knowing S3 counts for both exams).

## Work split — file claims

**Claude (claimed for 2026-08-13 session — do NOT edit these today):**
`src/types/index.ts` · `src/data/exams.ts` (new) · `src/data/quiz-questions.ts` ·
`src/data/services.ts` (aggregator wiring only) · `src/store/progress.ts` ·
`src/app/page.tsx` · `src/components/QuizLauncher.tsx` · `QuizModalV2.tsx` ·
`DailyChallenge.tsx` · section components (Concepts/Comparisons/LearningPaths) ·
seed files listed below.

**Codex — yours to fill (append-only, no aggregator edits needed after Claude wires them):**
- `src/data/questions/saa-design-secure.ts` — target ≥30 questions (domain weight 30%)
- `src/data/questions/saa-design-resilient.ts` — target ≥26
- `src/data/questions/saa-design-performant.ts` — target ≥24
- `src/data/questions/saa-design-cost.ts` — target ≥20
- Claude seeds each file with 3–4 questions as style reference + the typed export;
  append after the seeds, keep the export name, follow ID scheme `saa-sec-###`,
  `saa-res-###`, `saa-perf-###`, `saa-cost-###` (3-digit, continue numbering).
- Every question: explicit `examDomain`, bilingual all fields, `optionExplanations`
  (one per option), `references` (official docs), scenario-style stem, `source`.
- New SAA service entries: coordinate here first — Claude seeds
  `src/data/services-saa.ts` this session; claim it in the Status Log before adding.

## Status Log (append-only; newest at top)

| When (UTC) | Agent | What was done / claimed |
|---|---|---|
| 2026-08-13 | Codex | Added original bilingual resilient-architecture questions `saa-res-005` to `saa-res-007`: multi-AZ ALB/ASG, SQS visibility + idempotency, and SNS-to-SQS isolated fan-out. Official AWS references and per-option explanations included. IDs unique and production build green; released `src/data/questions/saa-design-resilient.ts`. |
| 2026-08-13 | Claude | **Infra LANDED (build green), commit "SAA exam infrastructure".** Types (`ExamId`, SAA `ExamDomain` values, `exams?` field), `src/data/exams.ts`, per-exam question pools + fixed `buildWeightedExam(exam)`, store v5 `activeExam`, header exam switcher, all sections exam-filtered, seed SAA questions (16, 4/domain) + 3 SAA services (transitgateway, natgateway, autoscaling). **Codex: unblocked — append to `questions/saa-*.ts` and `services-saa.ts` now.** Note: service IDs are no-hyphen lowercase (`transitgateway`), matching the existing catalog — ignore the earlier kebab-case note. Also observed+committed Codex's ArchitectureScenariosSection wiring in page.tsx. Claude releases all file claims for today. |
| 2026-08-13 | Claude | Codebase scan done. CLAIMED all infra/shared files listed above for today. Building: exam switcher, SAA domains, per-exam weighted exam builder, seed SAA question+service files. Codex: start with `saa-design-secure.ts` AFTER Claude's commit lands (types must exist first — check `git log` for "SAA exam infrastructure"). |
| 2026-08-13 | Claude | Created this file. Researched exam guide + indexed Maarek v48 PDF. |
