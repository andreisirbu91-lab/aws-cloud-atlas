# AWS Cloud Atlas — roadmap comun spre Cloud Solutions Architect

> Document comun pentru Andy, Codex și Claude. Ultima actualizare Codex: 2026-08-13.

## Surse de studiu și reguli de utilizare

Sursă personală disponibilă local: `AWS Certified Solutions Architect Slides v48.pdf` de Stéphane Maarek (876 pagini, generat la 2026-06-14). Materialul acoperă programa SAA de la IAM și EC2 până la VPC, disaster recovery, migrations și arhitecturi complete.

**Limită importantă:** PDF-ul declară explicit că este protejat prin copyright, destinat uzului personal și nu trebuie distribuit. Îl folosim pentru a identifica lacune, a ordona studiul și a formula cu cuvintele noastre exerciții originale. Nu copiem slide-uri, diagrame, întrebări sau pasaje în repo/aplicația publică. Fiecare informație publicată se verifică în documentația oficială AWS, care devine sursa citată în aplicație. PDF-ul rămâne în afara repo-ului.

Ierarhia recomandată a surselor:

1. AWS SAA-C03 Exam Guide - domenii și obiective oficiale;
2. documentația AWS, Well-Architected Framework și whitepapers AWS - adevăr tehnic și citare publică;
3. slide-urile Maarek - explicații personale, ordine de studiu și identificarea subiectelor dificile;
4. întrebări și scenarii proprii - create de la zero, apoi validate față de sursele AWS.

## Cum colaborăm fără conflicte

- Oricine începe un task își trece numele în coloana `Owner` înainte să modifice codul.
- Statusuri permise: `TODO`, `IN PROGRESS`, `BLOCKED`, `DONE`.
- Nu rescriem observațiile celuilalt; adăugăm concluzii sau marcăm explicit dezacordurile și trade-off-urile.
- Un task este `DONE` doar după ce comenzile din `Definition of Done` trec și există dovadă în repo (cod, test, diagramă, ADR sau captură de cost).
- Fișierele la care se lucrează se notează în `Fișiere`, pentru a evita editarea simultană.

## Baseline verificat

| Verificare | Rezultat | Observație |
|---|---|---|
| `npm run build` | PASS | Next.js generează exportul static în `dist/`; bundle inițial pentru `/` este aproximativ 320 kB. |
| Teste automate | LIPSĂ | Nu există fișiere sau scripturi de test în proiect. |
| Infrastructure as Code | LIPSĂ | Nu există Terraform, CDK sau CloudFormation. |
| CI/CD versionat | PARȚIAL | Există doar `amplify.yml`; nu există quality/security gates. |
| `npm audit --omit=dev --audit-level=high` | FAIL | 6 vulnerabilități: 3 moderate, 2 high, 1 critical. Trebuie reverificate după upgrade, nu rezolvate orbește cu `--force`. |
| Secrete în sursele inspectate | NU AU FOST GĂSITE | `.env*` și `*.pem` sunt ignorate; trebuie adăugat secret scanning în CI. |
| Persistența progresului | LOCAL ONLY | Zustand/localStorage: fără autentificare, backup, sincronizare sau analytics multi-device. |

## P0 — repară fundația înainte de extindere

| ID | Task | De ce contează pentru un architect | Owner | Status | Fișiere | Definition of Done |
|---|---|---|---|---|---|---|
| P0-1 | Aliniază Amplify cu exportul static | `next.config.js` scrie în `dist`, dar `amplify.yml` publică `.next`; artifact contract trebuie să fie unic și verificabil. | — | TODO | `next.config.js`, `amplify.yml` | Deploy de preview reușit; ruta `/`, assets și refresh pe rută funcționează; alegerea este explicată într-un ADR scurt. |
| P0-2 | Upgrade controlat al dependențelor vulnerabile | Next.js, Mermaid/DOMPurify, nanoid și PostCSS au advisories. Chiar dacă aplicația este statică, supply-chain risk-ul rămâne. | — | TODO | `package.json`, `package-lock.json` | `npm audit` fără high/critical, build + teste trec, Mermaid este verificat manual; fără `npm audit fix --force` neanalizat. |
| P0-3 | Adaugă quality gates | Un architect trebuie să poată demonstra că schimbările sunt reproductibile și sigure. | — | TODO | `package.json`, `.github/workflows/ci.yml` | CI rulează install reproducibil, lint, type-check, unit tests, build, audit și secret scan; branch protection documentat. |
| P0-4 | Introdu teste de bază | Logica de streak, XP, migrare Zustand, selecție quiz și conținut referențial poate regresa silențios. | — | TODO | `src/**/*.test.ts(x)`, config test | Teste unitare pentru store și quiz; smoke/E2E pentru încărcare, căutare și finalizare quiz; prag inițial realist de coverage. |

## P1 — transformă aplicația într-un proiect de portofoliu SAA

| ID | Task | Decizie recomandată și alternative | Owner | Status | Livrabil |
|---|---|---|---|---|---|
| P1-1 | Infrastructure as Code pentru hosting | Recomand Terraform dacă obiectivul include competențe multi-cloud/DevOps; AWS CDK este alternativa mai naturală pentru TypeScript. Nu păstra click-ops drept sursă de adevăr. | — | TODO | Module pentru S3 privat + CloudFront OAC + ACM + Route 53, state remote, `dev`/`prod`, README cu plan/apply/destroy. |
| P1-2 | Well-Architected Review | Evaluează explicit cele 6 pillars, nu doar enumerarea serviciilor AWS. | — | TODO | `docs/well-architected-review.md` cu riscuri, severitate, mitigări și dovezi. |
| P1-3 | ADR-uri pentru deciziile majore | Arată de ce ai ales o soluție și ce ai sacrificat: skill esențial la interviuri și design reviews. | — | TODO | ADR: Amplify vs S3/CloudFront; Terraform vs CDK; local-only vs serverless backend; RTO/RPO și multi-region. |
| P1-4 | Observabilitate și SLO | Pentru site static: availability, latency, errors și deploy health; evită o platformă grea fără nevoie. | — | TODO | CloudWatch Synthetics/alarms/dashboard, metrici CloudFront, SLO și runbook de incident. |
| P1-5 | FinOps | Orice arhitectură trebuie să aibă cost model și guardrails. | — | TODO | Estimări pentru trafic mic/mediu/mare, AWS Budget + alertă, tagging policy și comparație Amplify vs CloudFront. |
| P1-6 | Threat model | Definește assets, trust boundaries și abuzuri înainte de a adăuga backend/auth. | — | TODO | Diagramă de flux, STRIDE compact, CSP/security headers, dependency/secret scanning și plan de remediere. |

## P2 — capstone: progres sincronizat, proiectat profesionist

Construiește backend-ul doar după P0/P1, ca să demonstrezi design, nu acumulare de servicii.

Arhitectură recomandată: CloudFront → static frontend; Cognito pentru autentificare; API Gateway + Lambda pentru API; DynamoDB pentru progres; EventBridge pentru evenimente; SQS + DLQ pentru procesare asincronă; CloudWatch/X-Ray pentru observabilitate. Folosește KMS și Secrets Manager numai unde există efectiv chei/secrete de protejat.

Alternative și motivare:

- Amplify Gen 2 accelerează implementarea, dar ascunde o parte din deciziile IaC; bun pentru produs, mai slab ca exercițiu de arhitectură dacă nu documentezi resursele rezultate.
- AppSync este potrivit pentru sincronizare/GraphQL și update-uri realtime; API Gateway REST este mai simplu de explicat și operat pentru acest domeniu.
- Aurora Serverless nu este justificată pentru progres key-value la început; DynamoDB oferă model și scalare mai simple. Adaugă un access-pattern document înainte de tabel.
- Multi-region activ-activ ar fi over-engineering acum. Definește întâi RTO/RPO, apoi implementează backup/restore și abia ulterior un game day regional.

Definition of Done pentru capstone:

- diagramă C4/context + container și flux de date;
- IaC pentru `dev` și `prod`, fără secrete în repo;
- IAM least privilege verificat și autentificare testată;
- idempotency, retries, timeouts și DLQ testate;
- backup/restore demonstrat, cu RTO/RPO măsurat;
- load test și raport latency/error rate;
- dashboard, alarme și runbook;
- cost estimat și cost real după un test controlat;
- pipeline cu preview, approval pentru prod și rollback documentat.

## P3 — produsul educațional trebuie să treacă de la CLF la SAA

1. Adaugă scenarii de arhitectură, nu întrebări de definiție: cerințe funcționale, NFR-uri, constrângeri și alegerea justificată.
2. Organizează conținutul după cele patru domenii SAA-C03 și urmărește scorul pe domeniu.
3. Adaugă „design labs” cu diagrame incomplete: networking multi-AZ, decoupling, caching, DR și migration.
4. Pentru fiecare scenariu cere trade-off-uri pe securitate, reliability, performance, cost și operational excellence.
5. Introdu exerciții hands-on cu cleanup obligatoriu și buget maxim, ca învățarea să nu producă resurse uitate și costuri accidentale.
6. Adaugă challenge-uri de troubleshooting bazate pe simptome și telemetrie, nu pe recunoașterea numelui serviciului.

### Matrice de migrare bazată pe programa din slide-uri

| Val | Arii din material | Ce construim original în Cloud Atlas | Dovadă practică |
|---|---|---|---|
| 1 - Compute & resilience | EC2 basics/associate/storage, HA și scalability, classic architectures | scenarii ALB/NLB, ASG, placement, EBS/EFS, stateless design și failure modes | aplicație multi-AZ cu load test și alarmă |
| 2 - Data & routing | RDS, Aurora, ElastiCache, Route 53, S3 advanced/security | comparații Multi-AZ vs read replica, caching, DNS policies, lifecycle/replication și consistency | ADR pentru data store + test de failover |
| 3 - Edge & integration | CloudFront, Global Accelerator, storage extras, messaging | decizii CDN/acceleration, SQS/SNS/EventBridge/Kinesis, ordering și idempotency | event pipeline cu DLQ și replay |
| 4 - Modern applications | containers, serverless, serverless architectures, databases | ECS/EKS/Lambda trade-offs, API design, DynamoDB access patterns și quotas | progress API implementat prin IaC |
| 5 - Operations & security | monitoring/audit/performance, advanced identity, security/encryption | metrics/logs/traces, IAM evaluation, federation, KMS/envelope encryption și incident response | threat model, dashboard și game day |
| 6 - Networking & continuity | VPC, DR, migrations, more architectures | subnet design, routing, endpoints, hybrid connectivity, 7 Rs, RTO/RPO și DR patterns | VPC lab + restore măsurat |

Pentru fiecare arie, unitatea de conținut SAA trebuie să conțină: cerințe, constrângeri, diagramă originală, două opțiuni plauzibile, decizie, trade-off-uri pe Well-Architected pillars, failure mode, cost driver și linkuri AWS. Asta dezvoltă gândirea de architect; simpla adăugare a încă unei fișe de serviciu dezvoltă în principal memorarea.

### Control de proveniență pentru conținut

- Extinde `ContentSource` cu o separare între `studyInput` și `publicReference`; Maarek poate fi doar study input, nu referința publică unică.
- Pentru fiecare număr, limită sau comportament AWS, păstrează URL-ul oficial și data ultimei verificări deoarece serviciile se schimbă.
- Adaugă un validator care respinge întrebările fără explicație proprie și fără cel puțin o referință AWS pentru conținutul SAA.
- Rulează o verificare manuală de similitudine înainte de publicare; scopul este învățarea și sinteza, nu reproducerea cursului.

## Backlog de laboratoare — în ordinea valorii de învățare

| Lab | Competențe demonstrate | Dovadă |
|---|---|---|
| Static site production-grade | DNS, TLS, CDN, OAC, caching, WAF, IaC | diagramă, ADR, pipeline, headers și cost |
| Serverless progress API | auth, API, Lambda, DynamoDB access patterns | contract OpenAPI, IAM, teste și dashboard |
| Event-driven quiz analytics | events, SQS/DLQ, idempotency, replay | failure injection + runbook |
| Multi-account landing zone minimal | Organizations, SCP, Identity Center, logging | diagramă și politici; folosește sandbox accounts, nu root credentials |
| Backup/DR game day | RTO/RPO, restore, failure modes | raport cu timpi măsurați și lecții învățate |

## Riscuri tehnice observate

- **Deploy posibil incorect:** `amplify.yml` și `next.config.js` nu sunt aliniate asupra directorului de artifacts.
- **Supply chain nesigur:** auditul curent are high/critical. Remedierea trebuie testată deoarece unele upgrade-uri sunt breaking.
- **Fără teste:** build-ul verifică TypeScript/lint, dar nu validează comportamentul store-ului sau corectitudinea datasetului.
- **Date locale fragile:** progresul poate fi pierdut la ștergerea storage-ului și nu se sincronizează. Nu este o vulnerabilitate în sine, dar trebuie comunicat utilizatorului înainte de a promite cont/profil.
- **HTML injectat pentru Mermaid:** implementarea folosește `securityLevel: 'strict'` și surse statice, ceea ce reduce riscul. Dacă diagramele devin user-generated, `dangerouslySetInnerHTML` nu mai este acceptabil fără sanitizare și testare dedicate.
- **Bundle inițial mare pentru o aplicație educațională statică:** aproximativ 320 kB pe ruta principală; măsoară Lighthouse/Web Vitals înainte de optimizări premature.

## Următorul sprint recomandat (7–10 zile)

| Ordine | Task | Estimare | Owner | Status |
|---|---|---:|---|---|
| 1 | P0-1 — repară și demonstrează deploy contract | 0.5 zi | — | TODO |
| 2 | P0-2 — dependency upgrade controlat | 1 zi | — | TODO |
| 3 | P0-3 + P0-4 — CI și teste pentru logica critică | 2 zile | — | TODO |
| 4 | ADR hosting + primul modul IaC | 2 zile | — | TODO |
| 5 | Well-Architected review + diagramă | 1 zi | — | TODO |
| 6 | Observabilitate, budget și runbook | 1–2 zile | — | TODO |

## Jurnal comun

- **2026-08-13 — Codex:** audit inițial; build PASS; identificate mismatch-ul artifacts, lipsa testelor/IaC și vulnerabilitățile de dependențe; creat roadmap-ul comun.
- **2026-08-13 — Codex:** inspectat PDF-ul personal Maarek v48 (876 pagini); adăugate politica de copyright/proveniență și matricea de migrare tematică CLF→SAA.
- **2026-08-13 — Codex (IMPLEMENTED, integration check blocked):** primul scenariu original Compute & resilience implementat în UI; fișiere asumate: `src/data/architecture-scenarios.ts`, `src/components/ArchitectureScenariosSection.tsx`, integrarea minimă din `src/app/page.tsx`. Webpack compile trece; type-check-ul global este momentan blocat de extinderea concurentă `ExamDomain` din `src/types/index.ts`, neacoperită încă în `QuizLauncher.tsx`.
- **Claude:** adaugă aici concluziile și task-urile asumate.
