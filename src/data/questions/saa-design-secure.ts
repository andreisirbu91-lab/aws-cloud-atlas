import type { ExamDomain, QuizQuestion } from '@/types';

/**
 * SAA-C03 · Domain 1: Design Secure Architectures (30% of scored content).
 * ID scheme: saa-sec-### (3 digits, append-only — continue numbering at the end).
 * Every question MUST set `examDomain` explicitly (the aggregator's inferDomain
 * fallback is CLF-only and would silently mis-tag untagged SAA questions).
 */
export const saaDesignSecureQuestions: Array<QuizQuestion & { examDomain: ExamDomain }> = [
  {
    id: 'saa-sec-001',
    type: 'multiple_choice',
    difficulty: 3,
    categories: ['security', 'identity'],
    examDomain: 'design-secure',
    question: {
      en: 'A company runs workloads in multiple AWS accounts. The security team, which has IAM users in a central "security" account, must be able to audit resources in the production account without creating new IAM users there. What is the MOST secure way to grant this access?',
      ro: 'O companie rulează workload-uri în mai multe conturi AWS. Echipa de securitate, care are utilizatori IAM într-un cont central de „security", trebuie să poată audita resursele din contul de producție fără a crea utilizatori IAM noi acolo. Care este cea MAI sigură metodă de a acorda acest acces?',
    },
    options: [
      { en: 'Create an IAM role in the production account with an audit policy and allow the security account to assume it via AWS STS', ro: 'Creează un rol IAM în contul de producție cu o politică de audit și permite contului de security să îl asume prin AWS STS' },
      { en: 'Create IAM users with access keys in the production account and share the keys with the security team', ro: 'Creează utilizatori IAM cu access keys în contul de producție și distribuie cheile echipei de securitate' },
      { en: 'Attach the AdministratorAccess policy to the security team’s IAM users in the security account', ro: 'Atașează politica AdministratorAccess utilizatorilor IAM ai echipei de securitate din contul de security' },
      { en: 'Enable cross-account VPC peering between the security and production accounts', ro: 'Activează VPC peering cross-account între contul de security și cel de producție' },
    ],
    correct: 0,
    explanation: {
      en: 'Cross-account access is the textbook use case for IAM roles + AWS STS: the production account defines a role with least-privilege audit permissions and a trust policy naming the security account; auditors call AssumeRole and receive temporary credentials. No long-lived credentials are duplicated across accounts.',
      ro: 'Accesul cross-account este cazul clasic pentru roluri IAM + AWS STS: contul de producție definește un rol cu permisiuni de audit minim-necesare și o trust policy care numește contul de security; auditorii apelează AssumeRole și primesc credențiale temporare. Nu se duplică credențiale permanente între conturi.',
    },
    optionExplanations: [
      { en: 'Correct — a cross-account IAM role with STS temporary credentials follows least privilege and avoids credential sprawl.', ro: 'Corect — un rol IAM cross-account cu credențiale temporare STS respectă least privilege și evită împrăștierea credențialelor.' },
      { en: 'Sharing long-lived access keys is a security anti-pattern: keys can leak, are hard to rotate, and violate least privilege.', ro: 'Distribuirea de access keys permanente e un anti-pattern: cheile pot fi compromise, sunt greu de rotit și încalcă least privilege.' },
      { en: 'AdministratorAccess in the security account grants nothing in the production account — permissions do not cross account boundaries by themselves — and would be over-privileged anyway.', ro: 'AdministratorAccess în contul de security nu dă niciun drept în contul de producție — permisiunile nu traversează singure granițele conturilor — și oricum ar fi over-privileged.' },
      { en: 'VPC peering connects networks, not identities — it does not grant any IAM permissions on resources.', ro: 'VPC peering conectează rețele, nu identități — nu acordă nicio permisiune IAM asupra resurselor.' },
    ],
    references: [
      { label: 'IAM tutorial: Delegate access across AWS accounts using IAM roles', url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/tutorial_cross-account-with-roles.html' },
      { label: 'AWS STS AssumeRole', url: 'https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html' },
    ],
    relatedServices: ['iam'],
    source: 'exam-guide',
  },
  {
    id: 'saa-sec-002',
    type: 'multiple_choice',
    difficulty: 3,
    categories: ['security', 'storage'],
    examDomain: 'design-secure',
    question: {
      en: 'A healthcare company stores documents in Amazon S3. Compliance requires encryption at rest with keys the company controls, an audit trail of every key use, and automatic annual key rotation. Which solution meets these requirements with the LEAST operational overhead?',
      ro: 'O companie de healthcare stochează documente în Amazon S3. Conformitatea cere criptare at rest cu chei controlate de companie, un audit trail al fiecărei utilizări a cheii și rotație automată anuală a cheilor. Care soluție îndeplinește cerințele cu efort operațional MINIM?',
    },
    options: [
      { en: 'Server-side encryption with AWS KMS customer managed keys (SSE-KMS) with automatic rotation enabled', ro: 'Criptare server-side cu chei customer managed din AWS KMS (SSE-KMS), cu rotație automată activată' },
      { en: 'Server-side encryption with Amazon S3 managed keys (SSE-S3)', ro: 'Criptare server-side cu chei gestionate de Amazon S3 (SSE-S3)' },
      { en: 'Client-side encryption with keys stored on-premises', ro: 'Criptare client-side cu chei stocate on-premises' },
      { en: 'Server-side encryption with customer-provided keys (SSE-C)', ro: 'Criptare server-side cu chei furnizate de client (SSE-C)' },
    ],
    correct: 0,
    explanation: {
      en: 'SSE-KMS with a customer managed key is the only option that combines company-controlled key policies, CloudTrail logging of every key use, and built-in automatic rotation — all fully managed. SSE-S3 gives no key control or per-use audit; SSE-C and client-side encryption force you to manage and rotate keys yourself.',
      ro: 'SSE-KMS cu o cheie customer managed e singura opțiune care combină politici de cheie controlate de companie, logare CloudTrail a fiecărei utilizări și rotație automată integrată — totul gestionat de AWS. SSE-S3 nu oferă control asupra cheii și nici audit per utilizare; SSE-C și criptarea client-side te obligă să gestionezi și să rotești cheile singur.',
    },
    optionExplanations: [
      { en: 'Correct — customer managed KMS keys support key policies, CloudTrail auditing of each use, and automatic yearly rotation.', ro: 'Corect — cheile KMS customer managed suportă key policies, audit CloudTrail per utilizare și rotație automată anuală.' },
      { en: 'SSE-S3 encrypts at rest, but AWS fully controls the keys — no key policies, no per-use audit trail for the key, no rotation control.', ro: 'SSE-S3 criptează at rest, dar AWS controlează complet cheile — fără key policies, fără audit per utilizare, fără control asupra rotației.' },
      { en: 'Client-side encryption satisfies control but maximizes operational overhead: you build key storage, auditing, and rotation yourself.', ro: 'Criptarea client-side satisface controlul, dar maximizează efortul operațional: construiești singur stocarea, auditul și rotația cheilor.' },
      { en: 'With SSE-C you must send the key with every request and handle rotation and auditing yourself — high overhead, easy to get wrong.', ro: 'Cu SSE-C trebuie să trimiți cheia la fiecare request și să gestionezi singur rotația și auditul — efort mare, ușor de greșit.' },
    ],
    references: [
      { label: 'Protecting data with server-side encryption (Amazon S3)', url: 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/serv-side-encryption.html' },
      { label: 'Rotating AWS KMS keys', url: 'https://docs.aws.amazon.com/kms/latest/developerguide/rotate-keys.html' },
    ],
    relatedServices: ['s3', 'kms', 'cloudtrail'],
    source: 'exam-guide',
  },
  {
    id: 'saa-sec-003',
    type: 'multiple_choice',
    difficulty: 3,
    categories: ['security', 'network'],
    examDomain: 'design-secure',
    question: {
      en: 'Application servers on Amazon EC2 run in private subnets and must download OS patches from the internet. Security policy forbids any inbound connection initiated from the internet to these servers. What should a solutions architect recommend?',
      ro: 'Serverele de aplicație pe Amazon EC2 rulează în subneturi private și trebuie să descarce patch-uri de OS de pe internet. Politica de securitate interzice orice conexiune inbound inițiată de pe internet către aceste servere. Ce ar trebui să recomande un solutions architect?',
    },
    options: [
      { en: 'Deploy a NAT gateway in a public subnet and route the private subnets’ outbound traffic through it', ro: 'Instalează un NAT gateway într-un subnet public și rutează traficul outbound al subneturilor private prin el' },
      { en: 'Move the instances to a public subnet and attach public IP addresses', ro: 'Mută instanțele într-un subnet public și atașează-le adrese IP publice' },
      { en: 'Attach an internet gateway directly to the private subnets’ route table with a 0.0.0.0/0 route', ro: 'Atașează un internet gateway direct în route table-ul subneturilor private cu o rută 0.0.0.0/0' },
      { en: 'Create a VPC peering connection to a VPC that has internet access', ro: 'Creează o conexiune VPC peering către un VPC care are acces la internet' },
    ],
    correct: 0,
    explanation: {
      en: 'A NAT gateway allows instances in private subnets to initiate outbound connections (e.g., for patches) while blocking all inbound connections initiated from the internet. Routing private subnets straight to an internet gateway, or giving instances public IPs, makes them reachable from the internet; VPC peering is not transitive and does not provide internet egress.',
      ro: 'Un NAT gateway permite instanțelor din subneturi private să inițieze conexiuni outbound (ex. pentru patch-uri), blocând totodată orice conexiune inbound inițiată de pe internet. Rutarea subneturilor private direct către un internet gateway sau IP-urile publice le fac accesibile de pe internet; VPC peering nu e tranzitiv și nu oferă egress către internet.',
    },
    optionExplanations: [
      { en: 'Correct — NAT gateway = outbound-only internet access for private subnets; this is its exact purpose.', ro: 'Corect — NAT gateway = acces la internet doar outbound pentru subneturi private; exact pentru asta există.' },
      { en: 'Public subnet + public IPs exposes the servers to inbound internet traffic — the opposite of the requirement.', ro: 'Subnet public + IP-uri publice expun serverele la trafic inbound de pe internet — opusul cerinței.' },
      { en: 'A 0.0.0.0/0 route to an internet gateway makes the subnet public by definition; with public IPs, inbound becomes possible.', ro: 'O rută 0.0.0.0/0 către internet gateway face subnetul public prin definiție; cu IP-uri publice, traficul inbound devine posibil.' },
      { en: 'VPC peering is not transitive — you cannot reach the internet through a peer VPC’s internet gateway.', ro: 'VPC peering nu e tranzitiv — nu poți ajunge la internet prin internet gateway-ul unui VPC partener.' },
    ],
    references: [
      { label: 'NAT gateways (Amazon VPC)', url: 'https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html' },
    ],
    relatedServices: ['vpc', 'ec2'],
    source: 'exam-guide',
  },
  {
    id: 'saa-sec-004',
    type: 'multiple_choice',
    difficulty: 3,
    categories: ['security', 'network'],
    examDomain: 'design-secure',
    question: {
      en: 'A public web application behind an Application Load Balancer is being attacked with SQL injection and cross-site scripting attempts from changing IP addresses. Which AWS service should be used to block these attacks?',
      ro: 'O aplicație web publică în spatele unui Application Load Balancer este atacată cu încercări de SQL injection și cross-site scripting de la IP-uri care se schimbă. Ce serviciu AWS ar trebui folosit pentru a bloca aceste atacuri?',
    },
    options: [
      { en: 'AWS WAF with managed rules attached to the Application Load Balancer', ro: 'AWS WAF cu reguli gestionate, atașat pe Application Load Balancer' },
      { en: 'AWS Shield Standard', ro: 'AWS Shield Standard' },
      { en: 'Amazon GuardDuty', ro: 'Amazon GuardDuty' },
      { en: 'Network ACL rules that deny the attacking IP addresses', ro: 'Reguli de Network ACL care blochează IP-urile atacatoare' },
    ],
    correct: 0,
    explanation: {
      en: 'AWS WAF inspects HTTP/HTTPS requests at layer 7 and its managed rule groups block common exploits such as SQL injection and XSS, regardless of source IP. Shield protects against DDoS (layers 3/4), GuardDuty only detects threats (it does not block), and NACL IP-blocking fails when attacker IPs keep changing and cannot inspect request content.',
      ro: 'AWS WAF inspectează cererile HTTP/HTTPS la layer 7, iar grupurile de reguli gestionate blochează exploit-uri comune precum SQL injection și XSS, indiferent de IP-ul sursă. Shield protejează împotriva DDoS (layer 3/4), GuardDuty doar detectează amenințări (nu blochează), iar blocarea IP-urilor în NACL eșuează când IP-urile se schimbă și nu poate inspecta conținutul cererii.',
    },
    optionExplanations: [
      { en: 'Correct — WAF is the layer-7 firewall for exactly these attack patterns and integrates natively with ALB.', ro: 'Corect — WAF e firewall-ul de layer 7 pentru exact aceste tipare de atac și se integrează nativ cu ALB.' },
      { en: 'Shield Standard mitigates network/transport-layer DDoS, not application-layer request payloads like SQLi/XSS.', ro: 'Shield Standard atenuează DDoS la nivel de rețea/transport, nu payload-uri aplicative precum SQLi/XSS.' },
      { en: 'GuardDuty is a threat *detection* service — it raises findings but does not filter or block web requests.', ro: 'GuardDuty e un serviciu de *detecție* — generează findings, dar nu filtrează și nu blochează cereri web.' },
      { en: 'NACLs filter by IP/port only; they cannot see request bodies, and per-IP denies are useless against rotating IPs.', ro: 'NACL-urile filtrează doar după IP/port; nu văd corpul cererii, iar blocarea per IP e inutilă contra IP-urilor care se rotesc.' },
    ],
    references: [
      { label: 'AWS WAF — how it works', url: 'https://docs.aws.amazon.com/waf/latest/developerguide/how-aws-waf-works.html' },
    ],
    relatedServices: ['waf', 'shield', 'guardduty', 'elb'],
    source: 'exam-guide',
  },
];
