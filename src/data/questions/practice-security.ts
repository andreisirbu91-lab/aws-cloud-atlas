import type { QuizQuestion } from '@/types';

/**
 * Original CLF-C02 practice questions — Domain 2: Security and Compliance (30% of exam).
 * Exam-style questions written from AWS documentation + Stephane Maarek course.
 * Not actual exam questions (the real exam is under NDA). Each explanation says
 * why the correct answer is right and why the distractors are wrong.
 */
export const practiceSecurityQuestions: QuizQuestion[] = [
  {
    id: 'psec-1',
    type: 'multiple_choice',
    difficulty: 1,
    categories: ['shared-responsibility'],
    examDomain: 'security',
    source: 'maarek',
    question: {
      en: 'A company runs an application on Amazon EC2. Under the Shared Responsibility Model, who is responsible for applying operating system security patches to those instances?',
      ro: 'O companie rulează o aplicație pe Amazon EC2. În Modelul Responsabilității Partajate, cine e responsabil de aplicarea patch-urilor de securitate ale sistemului de operare pe acele instanțe?',
    },
    options: [
      { en: 'AWS, as part of managing the underlying hardware', ro: 'AWS, ca parte din gestionarea hardware-ului de bază' },
      { en: 'The customer, because they control the guest OS on EC2', ro: 'Clientul, pentru că el controlează OS-ul guest pe EC2' },
      { en: 'AWS Support, on a best-effort basis', ro: 'AWS Support, pe baza de best-effort' },
      { en: 'The hypervisor automatically patches the guest OS', ro: 'Hipervizorul aplică automat patch-uri pe OS-ul guest' },
    ],
    correct: 1,
    explanation: {
      en: 'For EC2 (an IaaS / unmanaged compute service) the customer manages "security IN the cloud", which includes patching the guest OS, configuring security groups, and managing data and IAM. AWS handles "security OF the cloud" — physical hosts, the hypervisor, and the data center. AWS does not patch your guest OS, AWS Support does not do it for you, and the hypervisor isolates VMs but never touches your guest OS.',
      ro: 'Pentru EC2 (serviciu de calcul IaaS / nemanagementat) clientul gestionează "securitatea ÎN cloud", ceea ce include patch-uri pe OS-ul guest, configurarea security groups, datele și IAM. AWS gestionează "securitatea CLOUD-ului" — host-urile fizice, hipervizorul și data center-ul. AWS nu aplică patch-uri pe OS-ul tău guest, AWS Support nu o face în locul tău, iar hipervizorul izolează VM-urile dar nu atinge niciodată OS-ul guest.',
    },
    relatedServices: ['ec2'],
  },
  {
    id: 'psec-2',
    type: 'multiple_choice',
    difficulty: 2,
    categories: ['identity'],
    examDomain: 'security',
    source: 'maarek',
    question: {
      en: 'A startup is launching a mobile app and needs to handle sign-up, sign-in, and identity for millions of end-user customers. Which AWS service is designed for this?',
      ro: 'Un startup lansează o aplicație mobilă și are nevoie să gestioneze înregistrarea, autentificarea și identitatea pentru milioane de clienți end-user. Care serviciu AWS e proiectat pentru asta?',
    },
    options: [
      { en: 'AWS IAM (create one IAM user per customer)', ro: 'AWS IAM (creezi câte un IAM user per client)' },
      { en: 'Amazon Cognito', ro: 'Amazon Cognito' },
      { en: 'AWS IAM Identity Center', ro: 'AWS IAM Identity Center' },
      { en: 'AWS Directory Service', ro: 'AWS Directory Service' },
    ],
    correct: 1,
    explanation: {
      en: 'Cognito provides user pools for application end users (your customers) to sign up and sign in, scaling to millions. IAM is for your team and AWS resources, not app customers — creating an IAM user per customer is an anti-pattern and hits account limits. IAM Identity Center manages workforce SSO across AWS accounts. Directory Service runs managed Microsoft Active Directory for corporate users, not public app sign-up.',
      ro: 'Cognito oferă user pools pentru utilizatorii end-user ai aplicației (clienții tăi) să se înregistreze și autentifice, scalând la milioane. IAM e pentru echipa ta și resursele AWS, nu pentru clienții aplicației — un IAM user per client e anti-pattern și lovește limitele contului. IAM Identity Center gestionează SSO pentru forța de muncă peste conturi AWS. Directory Service rulează Microsoft Active Directory managementat pentru utilizatori corporativi, nu înregistrare publică.',
    },
    relatedServices: ['cognito', 'iam'],
  },
  {
    id: 'psec-3',
    type: 'multiple_choice',
    difficulty: 3,
    categories: ['identity'],
    examDomain: 'security',
    source: 'aws-docs',
    question: {
      en: 'An IAM user is in a group whose policy ALLOWS Amazon S3 access. A second policy attached directly to the same user explicitly DENIES S3 access. What is the effective result when the user tries to access S3?',
      ro: 'Un IAM user e într-un grup a cărui politică PERMITE accesul la Amazon S3. O a doua politică atașată direct aceluiași user DENEAGĂ explicit accesul la S3. Care e rezultatul efectiv când userul încearcă să acceseze S3?',
    },
    options: [
      { en: 'Access is allowed, because an explicit Allow always wins', ro: 'Accesul e permis, pentru că un Allow explicit câștigă mereu' },
      { en: 'Access is denied, because an explicit Deny always overrides any Allow', ro: 'Accesul e refuzat, pentru că un Deny explicit suprascrie mereu orice Allow' },
      { en: 'Access depends on which policy was created most recently', ro: 'Accesul depinde de care politică a fost creată cel mai recent' },
      { en: 'Access is allowed only if the user also has MFA enabled', ro: 'Accesul e permis doar dacă userul are și MFA activat' },
    ],
    correct: 1,
    explanation: {
      en: 'In IAM policy evaluation, an explicit Deny always overrides any Allow. Permissions are the union of all attached policies, but a single explicit Deny anywhere blocks the action — so the user is denied. The Allow does not win, policy creation time is irrelevant to evaluation, and MFA conditions only matter if a policy specifically requires them.',
      ro: 'În evaluarea politicilor IAM, un Deny explicit suprascrie mereu orice Allow. Permisiunile sunt reuniunea tuturor politicilor atașate, dar un singur Deny explicit oriunde blochează acțiunea — deci userul e refuzat. Allow-ul nu câștigă, momentul creării politicii e irelevant pentru evaluare, iar condițiile MFA contează doar dacă o politică le cere explicit.',
    },
    relatedServices: ['iam', 's3'],
  },
  {
    id: 'psec-4',
    type: 'multiple_choice',
    difficulty: 1,
    categories: ['identity'],
    examDomain: 'security',
    source: 'aws-docs',
    question: {
      en: 'Which of the following is an AWS-recommended best practice for the root user of an account?',
      ro: 'Care din următoarele e un best practice recomandat de AWS pentru utilizatorul root al unui cont?',
    },
    options: [
      { en: 'Use the root user for all daily administrative work', ro: 'Folosești root pentru toată munca administrativă zilnică' },
      { en: 'Enable MFA on the root user and create a separate IAM admin user for daily tasks', ro: 'Activezi MFA pe root și creezi un IAM admin separat pentru sarcinile zilnice' },
      { en: 'Share the root password with the whole admin team for redundancy', ro: 'Distribui parola root întregii echipe admin pentru redundanță' },
      { en: 'Create access keys for the root user and store them in the app', ro: 'Creezi access keys pentru root și le stochezi în aplicație' },
    ],
    correct: 1,
    explanation: {
      en: 'AWS recommends enabling MFA on the root user, locking it away, and doing daily work through a dedicated IAM admin user with least privilege. Using root daily, sharing its password, or creating root access keys all dramatically increase blast radius if those credentials leak — root can never be restricted by IAM policies or SCPs.',
      ro: 'AWS recomandă activarea MFA pe root, securizarea lui și efectuarea muncii zilnice printr-un IAM admin dedicat cu least privilege. Folosirea root zilnic, distribuirea parolei sau crearea de access keys root cresc dramatic raza de impact dacă acele credențiale ajung compromise — root nu poate fi niciodată restricționat de politici IAM sau SCP.',
    },
    relatedServices: ['iam'],
  },
  {
    id: 'psec-5',
    type: 'multiple_choice',
    difficulty: 2,
    categories: ['threat-detection'],
    examDomain: 'security',
    source: 'maarek',
    question: {
      en: 'A security team wants to continuously scan their EC2 instances and container images in Amazon ECR for known software vulnerabilities (CVEs). Which service should they use?',
      ro: 'O echipă de securitate vrea să scaneze continuu instanțele EC2 și imaginile de container din Amazon ECR pentru vulnerabilități software cunoscute (CVE). Care serviciu ar trebui să folosească?',
    },
    options: [
      { en: 'Amazon GuardDuty', ro: 'Amazon GuardDuty' },
      { en: 'Amazon Inspector', ro: 'Amazon Inspector' },
      { en: 'Amazon Macie', ro: 'Amazon Macie' },
      { en: 'AWS Shield', ro: 'AWS Shield' },
    ],
    correct: 1,
    explanation: {
      en: 'Inspector performs automated vulnerability assessments, scanning EC2 instances and ECR container images against a CVE database. GuardDuty detects threats from log activity (CloudTrail, VPC Flow Logs, DNS) but does not scan for CVEs. Macie discovers sensitive data (PII) in S3. Shield protects against DDoS — none of these scan software for vulnerabilities.',
      ro: 'Inspector face evaluări automate de vulnerabilități, scanând instanțele EC2 și imaginile ECR contra unei baze de date CVE. GuardDuty detectează amenințări din activitatea de log-uri (CloudTrail, VPC Flow Logs, DNS) dar nu scanează pentru CVE. Macie descoperă date sensibile (PII) în S3. Shield protejează la DDoS — niciunul nu scanează software pentru vulnerabilități.',
    },
    relatedServices: ['inspector', 'ec2', 'ecr'],
  },
  {
    id: 'psec-6',
    type: 'multiple_choice',
    difficulty: 2,
    categories: ['encryption'],
    examDomain: 'security',
    source: 'aws-docs',
    question: {
      en: 'A team needs to centrally create, manage, and control the cryptographic keys used to encrypt data at rest in Amazon S3, Amazon EBS, and Amazon RDS. Which service is purpose-built for this?',
      ro: 'O echipă trebuie să creeze, gestioneze și controleze centralizat cheile criptografice folosite pentru a cripta datele at rest în Amazon S3, Amazon EBS și Amazon RDS. Care serviciu e construit special pentru asta?',
    },
    options: [
      { en: 'AWS Secrets Manager', ro: 'AWS Secrets Manager' },
      { en: 'AWS Key Management Service (KMS)', ro: 'AWS Key Management Service (KMS)' },
      { en: 'AWS Systems Manager Parameter Store', ro: 'AWS Systems Manager Parameter Store' },
      { en: 'Amazon Cognito', ro: 'Amazon Cognito' },
    ],
    correct: 1,
    explanation: {
      en: 'KMS manages encryption keys and integrates with S3 (SSE-KMS), EBS, RDS, and more to enable encryption at rest. Secrets Manager and Parameter Store store secrets such as passwords and API keys — values, not the cryptographic keys themselves (they actually use KMS under the hood to encrypt those secrets). Cognito handles end-user identity, not encryption keys.',
      ro: 'KMS gestionează cheile de criptare și se integrează cu S3 (SSE-KMS), EBS, RDS și altele pentru a permite criptarea at rest. Secrets Manager și Parameter Store stochează secrete precum parole și API keys — valori, nu cheile criptografice în sine (de fapt folosesc KMS în spate pentru a cripta acele secrete). Cognito gestionează identitatea end-userilor, nu cheile de criptare.',
    },
    relatedServices: ['kms', 's3', 'ebs', 'rds'],
  },
  {
    id: 'psec-7',
    type: 'multiple_choice',
    difficulty: 2,
    categories: ['network'],
    examDomain: 'security',
    source: 'maarek',
    question: {
      en: 'An online store is being hit by a large-scale, volumetric DDoS attack at the network and transport layers (Layers 3 and 4). Which AWS service is specifically designed to protect against this?',
      ro: 'Un magazin online e lovit de un atac DDoS volumetric de mare amploare la nivelurile rețea și transport (Layer 3 și 4). Care serviciu AWS e proiectat specific să protejeze contra acestui lucru?',
    },
    options: [
      { en: 'AWS WAF', ro: 'AWS WAF' },
      { en: 'AWS Shield', ro: 'AWS Shield' },
      { en: 'Amazon GuardDuty', ro: 'Amazon GuardDuty' },
      { en: 'AWS Config', ro: 'AWS Config' },
    ],
    correct: 1,
    explanation: {
      en: 'Shield is AWS’s DDoS protection service: Shield Standard (free, automatic) defends Layer 3/4 volumetric attacks, and Shield Advanced adds Layer 7 protection plus a response team. WAF is a Layer 7 web application firewall that filters requests by rules (SQL injection, XSS) — it does not stop volumetric network-layer floods. GuardDuty detects threats and Config tracks configuration changes; neither mitigates DDoS.',
      ro: 'Shield e serviciul de protecție DDoS al AWS: Shield Standard (gratuit, automat) apără la atacuri volumetrice Layer 3/4, iar Shield Advanced adaugă protecție Layer 7 plus o echipă de răspuns. WAF e un firewall de aplicații web la Layer 7 care filtrează cererile după reguli (SQL injection, XSS) — nu oprește inundațiile volumetrice la nivel de rețea. GuardDuty detectează amenințări iar Config urmărește schimbări de configurare; niciunul nu mitighează DDoS.',
    },
    relatedServices: ['shield', 'waf'],
  },
  {
    id: 'psec-8',
    type: 'multiple_choice',
    difficulty: 2,
    categories: ['compliance'],
    examDomain: 'security',
    source: 'aws-docs',
    question: {
      en: 'An auditor asks your company for AWS’s SOC 2 and ISO 27001 compliance reports. Where can you download these on demand?',
      ro: 'Un auditor cere companiei tale rapoartele de compliance SOC 2 și ISO 27001 ale AWS. De unde le poți descărca on-demand?',
    },
    options: [
      { en: 'AWS Trusted Advisor', ro: 'AWS Trusted Advisor' },
      { en: 'AWS Artifact', ro: 'AWS Artifact' },
      { en: 'AWS CloudTrail', ro: 'AWS CloudTrail' },
      { en: 'AWS Security Hub', ro: 'AWS Security Hub' },
    ],
    correct: 1,
    explanation: {
      en: 'AWS Artifact is the self-service portal for on-demand access to AWS compliance reports and certifications (SOC, ISO, PCI DSS, and more). Trusted Advisor gives best-practice checks across cost, security, and performance. CloudTrail logs API activity for auditing your own account. Security Hub aggregates security findings — none of these provide AWS’s third-party compliance reports.',
      ro: 'AWS Artifact e portalul self-service pentru acces on-demand la rapoartele și certificările de compliance ale AWS (SOC, ISO, PCI DSS și altele). Trusted Advisor oferă verificări de best practice pe cost, securitate și performanță. CloudTrail loghează activitatea API pentru auditul propriului cont. Security Hub agregă findings de securitate — niciunul nu furnizează rapoartele de compliance terțe ale AWS.',
    },
    relatedServices: ['artifact'],
  },
  {
    id: 'psec-9',
    type: 'multiple_choice',
    difficulty: 3,
    categories: ['identity', 'shared-responsibility'],
    examDomain: 'security',
    source: 'maarek',
    question: {
      en: 'A company uses AWS Organizations with several member accounts. Management wants a guardrail that prevents any member account from using AWS services in unapproved Regions, even if an account’s own IAM admin tries to allow it. What should they use?',
      ro: 'O companie folosește AWS Organizations cu mai multe conturi membre. Managementul vrea un guardrail care împiedică orice cont membru să folosească servicii AWS în Regiuni neaprobate, chiar dacă propriul IAM admin al contului încearcă să permită asta. Ce ar trebui să folosească?',
    },
    options: [
      { en: 'An IAM policy attached to each user in every account', ro: 'O politică IAM atașată fiecărui user din fiecare cont' },
      { en: 'A Service Control Policy (SCP) applied through AWS Organizations', ro: 'O Service Control Policy (SCP) aplicată prin AWS Organizations' },
      { en: 'A security group rule on every VPC', ro: 'O regulă de security group pe fiecare VPC' },
      { en: 'Enabling MFA on every IAM user', ro: 'Activarea MFA pe fiecare IAM user' },
    ],
    correct: 1,
    explanation: {
      en: 'SCPs in AWS Organizations set the maximum permissions (a guardrail) for member accounts — even a full IAM administrator in a member account cannot exceed what the SCP allows, so they are ideal for enforcing Region restrictions org-wide. IAM policies live inside a single account and can be changed by that account’s admin, so they are not a reliable cross-account guardrail. Security groups are virtual firewalls for network traffic, not Region or service controls. MFA strengthens sign-in but does nothing to restrict which Regions can be used.',
      ro: 'SCP-urile din AWS Organizations setează permisiunile maxime (un guardrail) pentru conturile membre — chiar și un administrator IAM complet dintr-un cont membru nu poate depăși ce permite SCP-ul, deci sunt ideale pentru impunerea restricțiilor de Regiune la nivel de organizație. Politicile IAM există în interiorul unui singur cont și pot fi schimbate de adminul acelui cont, deci nu sunt un guardrail cross-account fiabil. Security groups sunt firewall-uri virtuale pentru traficul de rețea, nu controale de Regiune sau serviciu. MFA întărește autentificarea dar nu restricționează ce Regiuni pot fi folosite.',
    },
    relatedServices: ['organizations', 'iam'],
  },
];
