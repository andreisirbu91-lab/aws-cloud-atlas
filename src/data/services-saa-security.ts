import type { Service } from '@/types';

/**
 * SAA-C03-only SECURITY services (level 'saa', exams ['saa']).
 * Added by Claude in the SAA gap-fill batch 1 (2026-08-13).
 * Append new SAA security services here; claimed via AGENTS.md Status Log.
 */
export const saaSecurityServices: Service[] = [
  {
    id: 'sts',
    abbreviation: 'STS',
    fullName: 'AWS Security Token Service',
    category: 'security',
    level: 'saa',
    exams: ['saa'],
    difficulty: 3,
    examFrequency: 'high',
    description: {
      en: 'Issues temporary, limited-privilege credentials so users, applications, and federated identities can assume IAM roles instead of using long-term access keys.',
      ro: 'Emite credențiale temporare, cu privilegii limitate, astfel încât utilizatorii, aplicațiile și identitățile federate să poată asuma roluri IAM în loc să folosească access keys permanente.',
    },
    analogy: {
      en: 'A visitor badge at a company front desk: it grants specific access, shows who you are, and expires automatically at the end of the day — unlike an employee master key that works forever.',
      ro: 'Un ecuson de vizitator la recepția unei companii: îți dă acces specific, arată cine ești și expiră automat la finalul zilei — spre deosebire de o cheie de angajat care merge pentru totdeauna.',
    },
    examTips: [
      {
        key: 'assume-role',
        content: {
          en: 'Trigger phrase: "temporary credentials" or "cross-account access" → an IAM role assumed via STS. Never the answer that shares IAM user access keys.',
          ro: 'Formulare-declanșator: „credențiale temporare" sau „acces cross-account" → un rol IAM asumat via STS. Niciodată răspunsul care partajează access keys de utilizator IAM.',
        },
      },
      {
        key: 'federation',
        content: {
          en: 'Corporate identity provider (SAML 2.0 / AD) → AssumeRoleWithSAML. Mobile/web app users at scale → Cognito (which calls STS for you).',
          ro: 'Identity provider corporate (SAML 2.0 / AD) → AssumeRoleWithSAML. Utilizatori de aplicații mobile/web la scară → Cognito (care apelează STS pentru tine).',
        },
      },
    ],
    pricing: {
      en: 'Free — STS calls cost nothing; you pay only for the resources the temporary credentials access.',
      ro: 'Gratuit — apelurile STS nu costă nimic; plătești doar resursele accesate cu credențialele temporare.',
    },
    connections: ['iam', 'cognito', 'organizations', 'directoryservice'],
    docsUrl: 'https://docs.aws.amazon.com/STS/latest/APIReference/welcome.html',
    visual: { color: 'hsl(0, 72%, 51%)', icon: 'shield' },
    examDomains: ['design-secure'],
    howItWorks: [
      { en: 'A trusted principal (user, app, or federated identity) calls an STS action such as AssumeRole.', ro: 'Un principal de încredere (utilizator, aplicație sau identitate federată) apelează o acțiune STS precum AssumeRole.' },
      { en: 'STS checks the role’s trust policy (WHO may assume it) before issuing anything.', ro: 'STS verifică trust policy-ul rolului (CINE îl poate asuma) înainte să emită ceva.' },
      { en: 'It returns temporary credentials: access key + secret key + session token, valid 15 min – 12 h.', ro: 'Returnează credențiale temporare: access key + secret key + session token, valabile 15 min – 12 h.' },
      { en: 'The caller uses them like normal credentials; they expire automatically — nothing to rotate or revoke.', ro: 'Apelantul le folosește ca pe credențiale normale; expiră automat — nimic de rotit sau revocat.' },
    ],
    keyFacts: [
      { en: 'Temporary credentials = access key + secret + SESSION TOKEN, with automatic expiry.', ro: 'Credențiale temporare = access key + secret + SESSION TOKEN, cu expirare automată.' },
      { en: 'AssumeRole sessions: 1 h by default, configurable 15 min – 12 h per role.', ro: 'Sesiuni AssumeRole: implicit 1 h, configurabil 15 min – 12 h per rol.' },
      { en: 'Cross-account pattern: role in the TARGET account + trust policy naming the source account.', ro: 'Pattern cross-account: rol în contul ȚINTĂ + trust policy care numește contul sursă.' },
      { en: 'Federation flavors: AssumeRoleWithSAML (corporate IdP), AssumeRoleWithWebIdentity / Cognito (app users).', ro: 'Variante de federare: AssumeRoleWithSAML (IdP corporate), AssumeRoleWithWebIdentity / Cognito (utilizatori de aplicații).' },
      { en: 'EC2 instance roles, Lambda execution roles, ECS task roles — all get their credentials from STS under the hood.', ro: 'Rolurile de instanță EC2, rolurile de execuție Lambda, task roles ECS — toate își iau credențialele de la STS în spate.' },
    ],
    whenToUse: [
      { en: 'Cross-account access: an admin/app in account A must manage resources in account B.', ro: 'Acces cross-account: un admin/aplicație din contul A trebuie să gestioneze resurse în contul B.' },
      { en: 'Workloads on EC2/Lambda/ECS need AWS access — attach a role; never bake in access keys.', ro: 'Workload-urile pe EC2/Lambda/ECS au nevoie de acces AWS — atașezi un rol; nu hardcodezi access keys.' },
      { en: 'Corporate users sign in with their existing IdP (SAML/AD) instead of getting IAM users.', ro: 'Utilizatorii corporate se autentifică cu IdP-ul existent (SAML/AD) în loc să primească utilizatori IAM.' },
    ],
    whenNotToUse: [
      { en: 'Millions of mobile/web app end-users → Amazon Cognito (it wraps STS with sign-up/sign-in and identity pools).', ro: 'Milioane de utilizatori finali de aplicații mobile/web → Amazon Cognito (împachetează STS cu sign-up/sign-in și identity pools).' },
      { en: 'Workforce SSO across many AWS accounts → IAM Identity Center, not hand-rolled STS federation.', ro: 'SSO pentru angajați pe multe conturi AWS → IAM Identity Center, nu federare STS făcută manual.' },
    ],
    examTraps: [
      { en: 'Sharing an IAM user’s access keys with another account/team is ALWAYS the wrong answer — the right one is a role assumed via STS.', ro: 'Partajarea access keys ale unui utilizator IAM cu alt cont/echipă e ÎNTOTDEAUNA răspunsul greșit — cel corect e un rol asumat via STS.' },
      { en: 'The trust policy controls WHO can assume the role; the permission policy controls WHAT the role can do. Exams test the difference.', ro: 'Trust policy-ul controlează CINE poate asuma rolul; permission policy-ul controlează CE poate face rolul. Examenul testează diferența.' },
      { en: 'Temporary credentials cannot be individually revoked before expiry — you revoke by attaching a deny-older-sessions policy to the role.', ro: 'Credențialele temporare nu pot fi revocate individual înainte de expirare — revoci atașând rolului o politică de tip deny-older-sessions.' },
      { en: 'Cognito vs STS: if the scenario says "mobile app users sign in with Google/Facebook", the answer is Cognito, even though STS works underneath.', ro: 'Cognito vs STS: dacă scenariul zice „utilizatorii aplicației mobile se autentifică cu Google/Facebook", răspunsul e Cognito, chiar dacă STS lucrează dedesubt.' },
    ],
    keyNumbers: [
      { label: { en: 'Default AssumeRole session duration', ro: 'Durata implicită a sesiunii AssumeRole' }, value: { en: '1 hour', ro: '1 oră' } },
      { label: { en: 'Role session duration range', ro: 'Interval durată sesiune de rol' }, value: { en: '15 min – 12 h', ro: '15 min – 12 h' } },
      { label: { en: 'Cost of STS API calls', ro: 'Costul apelurilor API STS' }, value: { en: '$0 (free)', ro: '$0 (gratuit)' } },
    ],
    retrievalQuestions: [
      {
        q: { en: 'What is the correct pattern for giving account A’s application access to an S3 bucket in account B?', ro: 'Care e pattern-ul corect pentru a da aplicației din contul A acces la un bucket S3 din contul B?' },
        a: { en: 'Create an IAM role in account B with a trust policy allowing account A; the app calls STS AssumeRole and uses the temporary credentials. Never copy access keys across accounts.', ro: 'Creezi un rol IAM în contul B cu un trust policy care permite contul A; aplicația apelează STS AssumeRole și folosește credențialele temporare. Nu copiezi niciodată access keys între conturi.' },
      },
      {
        q: { en: 'What three pieces make up STS temporary credentials, and what makes them "temporary"?', ro: 'Din ce trei elemente sunt formate credențialele temporare STS și ce le face „temporare"?' },
        a: { en: 'Access key ID + secret access key + session token. They expire automatically after the session duration (15 min – 12 h), so there is nothing long-lived to leak or rotate.', ro: 'Access key ID + secret access key + session token. Expiră automat după durata sesiunii (15 min – 12 h), deci nu există nimic permanent de scurs sau rotit.' },
      },
      {
        q: { en: 'Which STS API serves SAML federation, and which service should handle mobile app users instead?', ro: 'Ce API STS servește federarea SAML și ce serviciu ar trebui să gestioneze utilizatorii de aplicații mobile?' },
        a: { en: 'AssumeRoleWithSAML for corporate IdP federation; Amazon Cognito for mobile/web app end-users (it calls STS on your behalf).', ro: 'AssumeRoleWithSAML pentru federare cu IdP corporate; Amazon Cognito pentru utilizatorii finali de aplicații mobile/web (apelează STS în numele tău).' },
      },
    ],
    mermaidDiagram: {
      code: 'sequenceDiagram; participant App as App in Account A; participant STS as AWS STS; participant S3 as S3 in Account B; App->>STS: AssumeRole (role in B); STS-->>App: temp credentials (15min-12h); App->>S3: access with temp credentials',
      caption: { en: 'Cross-account access: assume a role in the target account, receive expiring credentials, use them.', ro: 'Acces cross-account: asumi un rol în contul țintă, primești credențiale care expiră, le folosești.' },
    },
  },
  {
    id: 'cloudhsm',
    abbreviation: 'CloudHSM',
    fullName: 'AWS CloudHSM',
    category: 'security',
    level: 'saa',
    exams: ['saa'],
    difficulty: 3,
    examFrequency: 'medium',
    description: {
      en: 'Dedicated, single-tenant hardware security modules (FIPS 140-2 Level 3) in your VPC, where YOU control the encryption keys entirely — AWS has no access to them.',
      ro: 'Module hardware de securitate dedicate, single-tenant (FIPS 140-2 Level 3) în VPC-ul tău, unde TU controlezi complet cheile de criptare — AWS nu are acces la ele.',
    },
    analogy: {
      en: 'A private safe installed in your own office: the bank (AWS) delivers and maintains the safe, but only you know the combination. KMS, by contrast, is a shared bank vault managed by the bank.',
      ro: 'Un seif privat instalat în biroul tău: banca (AWS) livrează și întreține seiful, dar doar tu știi cifrul. KMS, prin contrast, e un tezaur comun administrat de bancă.',
    },
    examTips: [
      {
        key: 'kms-vs-hsm',
        content: {
          en: 'Trigger phrases: "dedicated hardware", "single-tenant", "FIPS 140-2 Level 3", "full control of keys" → CloudHSM. General AWS-integrated encryption → KMS.',
          ro: 'Formulări-declanșator: „hardware dedicat", „single-tenant", „FIPS 140-2 Level 3", „control total al cheilor" → CloudHSM. Criptare generală integrată AWS → KMS.',
        },
      },
      {
        key: 'custom-key-store',
        content: {
          en: 'Best of both: KMS custom key store backed by CloudHSM — AWS services use KMS APIs while keys live in your dedicated HSMs.',
          ro: 'Ce e mai bun din ambele: KMS custom key store susținut de CloudHSM — serviciile AWS folosesc API-urile KMS, iar cheile stau în HSM-urile tale dedicate.',
        },
      },
    ],
    pricing: {
      en: 'Per HSM-hour, no upfront cost. Significantly more expensive than KMS — only justified by compliance requirements.',
      ro: 'Per HSM-oră, fără cost inițial. Semnificativ mai scump decât KMS — justificat doar de cerințe de conformitate.',
    },
    connections: ['kms', 'vpc', 'rds'],
    docsUrl: 'https://docs.aws.amazon.com/cloudhsm/latest/userguide/introduction.html',
    visual: { color: 'hsl(0, 72%, 51%)', icon: 'lock' },
    examDomains: ['design-secure'],
    howItWorks: [
      { en: 'You create a CloudHSM cluster in your VPC and add HSM instances across multiple AZs for HA.', ro: 'Creezi un cluster CloudHSM în VPC-ul tău și adaugi instanțe HSM în mai multe AZ-uri pentru HA.' },
      { en: 'You initialize the cluster and manage users/keys yourself with standard crypto APIs (PKCS#11, JCE, KSP).', ro: 'Inițializezi clusterul și gestionezi singur utilizatorii/cheile cu API-uri criptografice standard (PKCS#11, JCE, KSP).' },
      { en: 'Applications in the VPC talk to the HSMs directly for encryption, signing, and key storage.', ro: 'Aplicațiile din VPC comunică direct cu HSM-urile pentru criptare, semnare și stocarea cheilor.' },
      { en: 'AWS maintains the hardware but has zero visibility into your keys — losing your credentials means losing the keys.', ro: 'AWS întreține hardware-ul, dar nu are nicio vizibilitate asupra cheilor tale — pierderea credențialelor înseamnă pierderea cheilor.' },
    ],
    keyFacts: [
      { en: 'FIPS 140-2 LEVEL 3 validated, single-tenant hardware — the compliance step above KMS.', ro: 'Validat FIPS 140-2 LEVEL 3, hardware single-tenant — treapta de conformitate peste KMS.' },
      { en: 'You manage everything: users, keys, rotation. AWS cannot see or recover your keys.', ro: 'Tu gestionezi tot: utilizatori, chei, rotație. AWS nu poate vedea sau recupera cheile.' },
      { en: 'Runs inside your VPC; cluster HSMs across AZs for high availability.', ro: 'Rulează în VPC-ul tău; pui HSM-uri din cluster în mai multe AZ-uri pentru disponibilitate.' },
      { en: 'Use cases: KMS custom key store, database TDE (Oracle/SQL Server), SSL/TLS offload, private CA keys.', ro: 'Cazuri de utilizare: KMS custom key store, TDE pentru baze de date (Oracle/SQL Server), offload SSL/TLS, chei de CA privată.' },
      { en: 'Standard interfaces: PKCS#11, Java JCE, Microsoft CNG/KSP — no AWS-proprietary API needed.', ro: 'Interfețe standard: PKCS#11, Java JCE, Microsoft CNG/KSP — fără API proprietar AWS.' },
    ],
    whenToUse: [
      { en: 'Compliance explicitly demands FIPS 140-2 Level 3 or single-tenant/dedicated key hardware.', ro: 'Conformitatea cere explicit FIPS 140-2 Level 3 sau hardware dedicat/single-tenant pentru chei.' },
      { en: 'Contractual/regulatory "AWS must never be able to access our keys" requirements.', ro: 'Cerințe contractuale/de reglementare de tip „AWS nu trebuie să poată accesa cheile noastre".' },
      { en: 'Transparent Data Encryption for Oracle/SQL Server, or SSL offload with keys in hardware.', ro: 'Transparent Data Encryption pentru Oracle/SQL Server, sau offload SSL cu cheile în hardware.' },
    ],
    whenNotToUse: [
      { en: 'Standard encryption of S3/EBS/RDS with AWS-service integration → KMS (cheaper, managed, integrated).', ro: 'Criptare standard S3/EBS/RDS cu integrare în serviciile AWS → KMS (mai ieftin, gestionat, integrat).' },
      { en: 'Storing application secrets (DB passwords, API keys) → Secrets Manager, not an HSM.', ro: 'Stocarea secretelor de aplicație (parole DB, API keys) → Secrets Manager, nu un HSM.' },
    ],
    examTraps: [
      { en: 'KMS vs CloudHSM: KMS = managed, multi-tenant, integrated with ~all AWS services; CloudHSM = dedicated, single-tenant, you manage keys. The scenario’s compliance wording decides.', ro: 'KMS vs CloudHSM: KMS = gestionat, multi-tenant, integrat cu aproape toate serviciile AWS; CloudHSM = dedicat, single-tenant, tu gestionezi cheile. Formularea de conformitate din scenariu decide.' },
      { en: 'CloudHSM does NOT natively integrate with most AWS services — for that, front it with a KMS custom key store.', ro: 'CloudHSM NU se integrează nativ cu majoritatea serviciilor AWS — pentru asta, îl pui în spatele unui KMS custom key store.' },
      { en: 'If you lose the CloudHSM admin credentials, AWS cannot help — the keys are unrecoverable by design.', ro: 'Dacă pierzi credențialele de admin CloudHSM, AWS nu te poate ajuta — cheile sunt nerecuperabile prin design.' },
      { en: 'Cost trap: picking CloudHSM for ordinary encryption needs — KMS is the cost-optimized answer unless Level 3 / dedicated hardware is required.', ro: 'Capcană de cost: alegerea CloudHSM pentru nevoi obișnuite de criptare — KMS e răspunsul optim pe cost dacă nu se cere Level 3 / hardware dedicat.' },
    ],
    keyNumbers: [
      { label: { en: 'FIPS 140-2 validation level', ro: 'Nivel de validare FIPS 140-2' }, value: { en: 'Level 3', ro: 'Level 3' } },
      { label: { en: 'Tenancy', ro: 'Tenancy' }, value: { en: 'single-tenant (dedicated)', ro: 'single-tenant (dedicat)' } },
      { label: { en: 'Min HSMs for production HA', ro: 'Minim HSM-uri pentru HA în producție' }, value: { en: '2 (different AZs)', ro: '2 (AZ-uri diferite)' } },
    ],
    retrievalQuestions: [
      {
        q: { en: 'A regulator requires FIPS 140-2 Level 3 and that the cloud provider cannot access encryption keys. KMS or CloudHSM, and why?', ro: 'Un reglementator cere FIPS 140-2 Level 3 și ca furnizorul de cloud să nu poată accesa cheile. KMS sau CloudHSM, și de ce?' },
        a: { en: 'CloudHSM — dedicated single-tenant hardware validated at Level 3, where only the customer controls the keys. KMS is multi-tenant and AWS-managed.', ro: 'CloudHSM — hardware dedicat single-tenant validat Level 3, unde doar clientul controlează cheile. KMS e multi-tenant și gestionat de AWS.' },
      },
      {
        q: { en: 'How can AWS services like S3 use keys stored in CloudHSM?', ro: 'Cum pot serviciile AWS precum S3 să folosească chei stocate în CloudHSM?' },
        a: { en: 'Through a KMS custom key store backed by the CloudHSM cluster — services keep calling KMS APIs, but the key material lives in your HSMs.', ro: 'Printr-un KMS custom key store susținut de clusterul CloudHSM — serviciile apelează în continuare API-urile KMS, dar materialul cheilor stă în HSM-urile tale.' },
      },
    ],
  },
  {
    id: 'networkfirewall',
    abbreviation: 'Network Firewall',
    fullName: 'AWS Network Firewall',
    category: 'security',
    level: 'saa',
    exams: ['saa'],
    difficulty: 3,
    examFrequency: 'medium',
    description: {
      en: 'A managed, stateful network firewall and intrusion prevention service that inspects and filters traffic at the VPC level — layers 3 to 7, with Suricata-compatible rules.',
      ro: 'Un firewall de rețea gestionat, stateful, cu prevenirea intruziunilor, care inspectează și filtrează traficul la nivel de VPC — layerele 3–7, cu reguli compatibile Suricata.',
    },
    analogy: {
      en: 'A customs checkpoint at the country border: every truck (packet) entering or leaving the whole country (VPC) gets inspected — unlike a doorman (security group) who only guards one building (instance).',
      ro: 'Un punct vamal la granița țării: fiecare camion (pachet) care intră sau iese din toată țara (VPC-ul) e inspectat — spre deosebire de un portar (security group) care păzește o singură clădire (instanță).',
    },
    examTips: [
      {
        key: 'scope',
        content: {
          en: 'Trigger phrase: "inspect/filter ALL traffic entering or leaving a VPC" or "allow outbound only to approved domains" → Network Firewall. Per-instance rules → SG; HTTP app protection → WAF.',
          ro: 'Formulare-declanșator: „inspectează/filtrează TOT traficul care intră sau iese dintr-un VPC" sau „permite outbound doar către domenii aprobate" → Network Firewall. Reguli per instanță → SG; protecție aplicație HTTP → WAF.',
        },
      },
      {
        key: 'layers',
        content: {
          en: 'Know the ladder: SG (instance, stateful) → NACL (subnet, stateless) → Network Firewall (VPC, stateful L3–L7 + IPS) → WAF (HTTP layer 7 on ALB/CloudFront/API GW).',
          ro: 'Știi scara: SG (instanță, stateful) → NACL (subnet, stateless) → Network Firewall (VPC, stateful L3–L7 + IPS) → WAF (HTTP layer 7 pe ALB/CloudFront/API GW).',
        },
      },
    ],
    pricing: {
      en: 'Per firewall-endpoint-hour + per GB processed — similar cost model to NAT Gateway, and similarly exam-relevant.',
      ro: 'Per firewall-endpoint-oră + per GB procesat — model de cost similar cu NAT Gateway și la fel de relevant la examen.',
    },
    connections: ['vpc', 'waf', 'transitgateway', 'guardduty'],
    docsUrl: 'https://docs.aws.amazon.com/network-firewall/latest/developerguide/what-is-aws-network-firewall.html',
    visual: { color: 'hsl(0, 72%, 51%)', icon: 'shield' },
    examDomains: ['design-secure'],
    howItWorks: [
      { en: 'You deploy firewall endpoints into dedicated firewall subnets (one per AZ).', ro: 'Instalezi firewall endpoints în subneturi dedicate de firewall (unul per AZ).' },
      { en: 'Route tables steer traffic (ingress, egress, or inter-VPC via TGW) through those endpoints.', ro: 'Route table-urile direcționează traficul (ingress, egress sau inter-VPC via TGW) prin acele endpoint-uri.' },
      { en: 'Stateful rule groups (Suricata-compatible) inspect flows: allow, drop, or alert — including domain-name filtering.', ro: 'Rule groups stateful (compatibile Suricata) inspectează fluxurile: allow, drop sau alert — inclusiv filtrare pe nume de domeniu.' },
      { en: 'The service scales automatically with traffic; logs go to S3, CloudWatch Logs, or Kinesis Firehose.', ro: 'Serviciul scalează automat cu traficul; logurile merg în S3, CloudWatch Logs sau Kinesis Firehose.' },
    ],
    keyFacts: [
      { en: 'VPC-level protection: stateful inspection, intrusion prevention (IPS), and web/domain filtering in one managed service.', ro: 'Protecție la nivel de VPC: inspecție stateful, prevenirea intruziunilor (IPS) și filtrare web/domenii într-un singur serviciu gestionat.' },
      { en: 'Rules are Suricata-compatible — you can import existing open-source IDS/IPS rule sets.', ro: 'Regulile sunt compatibile Suricata — poți importa seturi de reguli IDS/IPS open-source existente.' },
      { en: 'Deployed as endpoints in dedicated subnets; routing sends traffic through them (no agents on instances).', ro: 'Instalat ca endpoint-uri în subneturi dedicate; rutarea trimite traficul prin ele (fără agenți pe instanțe).' },
      { en: 'Common pattern: central inspection VPC attached to Transit Gateway — all VPC egress passes one firewall.', ro: 'Pattern comun: VPC central de inspecție atașat la Transit Gateway — tot egress-ul VPC-urilor trece printr-un singur firewall.' },
      { en: 'Complements (does not replace) SGs and NACLs — those still apply at instance/subnet level.', ro: 'Completează (nu înlocuiește) SG-urile și NACL-urile — acelea se aplică în continuare la nivel de instanță/subnet.' },
    ],
    whenToUse: [
      { en: 'Egress filtering by domain: instances may reach only *.approved-vendor.com.', ro: 'Filtrare egress pe domenii: instanțele pot accesa doar *.approved-vendor.com.' },
      { en: 'Compliance requires IDS/IPS-style deep packet inspection of VPC traffic.', ro: 'Conformitatea cere inspecție profundă a pachetelor de tip IDS/IPS pentru traficul VPC.' },
      { en: 'Centralized inspection of traffic between many VPCs and on-premises (with Transit Gateway).', ro: 'Inspecție centralizată a traficului dintre multe VPC-uri și on-premises (cu Transit Gateway).' },
    ],
    whenNotToUse: [
      { en: 'Protecting an HTTP app from SQL injection/XSS → AWS WAF (layer 7, attached to ALB/CloudFront/API GW).', ro: 'Protejarea unei aplicații HTTP de SQL injection/XSS → AWS WAF (layer 7, atașat la ALB/CloudFront/API GW).' },
      { en: 'Simple port/IP rules for one instance or subnet → security groups / NACLs (free).', ro: 'Reguli simple de port/IP pentru o instanță sau un subnet → security groups / NACL-uri (gratuite).' },
      { en: 'DDoS protection → Shield / Shield Advanced, not Network Firewall.', ro: 'Protecție DDoS → Shield / Shield Advanced, nu Network Firewall.' },
    ],
    examTraps: [
      { en: 'WAF vs Network Firewall: WAF = HTTP(S) requests to your app (L7); Network Firewall = ALL network traffic of the VPC (L3–L7). "SQL injection" → WAF; "outbound domain allowlist for a VPC" → Network Firewall.', ro: 'WAF vs Network Firewall: WAF = cereri HTTP(S) către aplicație (L7); Network Firewall = TOT traficul de rețea al VPC-ului (L3–L7). „SQL injection" → WAF; „allowlist de domenii outbound pentru un VPC" → Network Firewall.' },
      { en: 'Security groups cannot filter by domain name — if the requirement is FQDN-based egress control, SGs are the trap answer.', ro: 'Security groups nu pot filtra după nume de domeniu — dacă cerința e control egress pe FQDN, SG-urile sunt răspunsul-capcană.' },
      { en: 'GuardDuty DETECTS threats (monitoring); Network Firewall BLOCKS traffic (enforcement). Detection vs prevention wording decides.', ro: 'GuardDuty DETECTEAZĂ amenințări (monitorizare); Network Firewall BLOCHEAZĂ trafic (aplicare). Formularea detecție vs prevenție decide.' },
    ],
    keyNumbers: [
      { label: { en: 'Protection scope', ro: 'Scopul protecției' }, value: { en: 'entire VPC (L3–L7)', ro: 'întregul VPC (L3–L7)' } },
      { label: { en: 'Endpoints for HA', ro: 'Endpoint-uri pentru HA' }, value: { en: 'one per AZ', ro: 'unul per AZ' } },
    ],
    retrievalQuestions: [
      {
        q: { en: 'A company must ensure EC2 instances can only reach an approved list of external domains. Which service, and why not security groups?', ro: 'O companie trebuie să se asigure că instanțele EC2 pot accesa doar o listă aprobată de domenii externe. Ce serviciu, și de ce nu security groups?' },
        a: { en: 'AWS Network Firewall with stateful domain-filtering rules — security groups only filter by IP/port and cannot match domain names.', ro: 'AWS Network Firewall cu reguli stateful de filtrare pe domenii — security groups filtrează doar pe IP/port și nu pot potrivi nume de domenii.' },
      },
      {
        q: { en: 'Where does Network Firewall sit versus WAF in the AWS protection stack?', ro: 'Unde stă Network Firewall față de WAF în stiva de protecție AWS?' },
        a: { en: 'Network Firewall inspects all VPC network traffic (L3–L7, deployed via routed endpoints); WAF inspects only HTTP(S) requests and attaches to ALB, CloudFront, or API Gateway.', ro: 'Network Firewall inspectează tot traficul de rețea al VPC-ului (L3–L7, prin endpoint-uri rutate); WAF inspectează doar cereri HTTP(S) și se atașează la ALB, CloudFront sau API Gateway.' },
      },
    ],
    mermaidDiagram: {
      code: 'flowchart LR; NET((Internet)) --> IGW[Internet Gateway]; IGW --> FW{{Network Firewall endpoint}}; FW -->|inspected| APP[App subnets]; APP -->|egress| FW; FW -->|domain allowlist| IGW',
      caption: { en: 'Route tables force both ingress and egress through the firewall endpoint for inspection.', ro: 'Route table-urile forțează atât ingress-ul cât și egress-ul prin endpoint-ul de firewall pentru inspecție.' },
    },
  },
];
