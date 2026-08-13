export type LocalizedText = Record<'en' | 'ro', string>;

export interface ArchitectureOption {
  id: string;
  title: LocalizedText;
  summary: LocalizedText;
  strengths: LocalizedText[];
  tradeoffs: LocalizedText[];
  recommended: boolean;
}

export interface ArchitectureScenario {
  id: string;
  title: LocalizedText;
  brief: LocalizedText;
  difficulty: 'associate' | 'professional';
  estimatedMinutes: number;
  requirements: LocalizedText[];
  constraints: LocalizedText[];
  options: ArchitectureOption[];
  decision: LocalizedText;
  diagram: string;
  failureModes: Array<{
    event: LocalizedText;
    response: LocalizedText;
  }>;
  costDrivers: LocalizedText[];
  lab: Array<{
    title: LocalizedText;
    evidence: LocalizedText;
  }>;
  awsReferences: Array<{ label: string; url: string }>;
}

export const architectureScenarios: ArchitectureScenario[] = [
  {
    id: 'resilient-web-tier',
    title: {
      en: 'Design a resilient web tier',
      ro: 'Proiectează un web tier rezilient',
    },
    brief: {
      en: 'A small commerce application must survive the loss of one Availability Zone and scale for unpredictable campaigns.',
      ro: 'O aplicație mică de comerț trebuie să supraviețuiască pierderii unei Availability Zone și să scaleze pentru campanii imprevizibile.',
    },
    difficulty: 'associate',
    estimatedMinutes: 45,
    requirements: [
      {
        en: 'Serve HTTPS traffic without exposing compute instances directly to the internet.',
        ro: 'Servește trafic HTTPS fără a expune direct instanțele de compute la internet.',
      },
      {
        en: 'Continue serving traffic when one instance or one Availability Zone fails.',
        ro: 'Continuă să servească trafic dacă o instanță sau o Availability Zone cade.',
      },
      {
        en: 'Scale horizontally when average CPU stays above 60%.',
        ro: 'Scalează orizontal când media CPU rămâne peste 60%.',
      },
      {
        en: 'Keep application nodes stateless so failed instances can be replaced safely.',
        ro: 'Păstrează nodurile aplicației stateless, ca instanțele defecte să poată fi înlocuite sigur.',
      },
    ],
    constraints: [
      {
        en: 'Use two Availability Zones and avoid a single-instance design.',
        ro: 'Folosește două Availability Zones și evită designul cu o singură instanță.',
      },
      {
        en: 'Optimize for a small baseline load; do not reserve permanent peak capacity.',
        ro: 'Optimizează pentru un trafic de bază mic; nu rezerva permanent capacitatea de vârf.',
      },
    ],
    options: [
      {
        id: 'single-ec2',
        title: { en: 'Single public EC2 instance', ro: 'O singură instanță EC2 publică' },
        summary: {
          en: 'Put the application and its public endpoint on one instance.',
          ro: 'Pune aplicația și endpoint-ul public pe aceeași instanță.',
        },
        strengths: [
          { en: 'Lowest initial complexity and cost.', ro: 'Cea mai mică complexitate și cost inițial.' },
        ],
        tradeoffs: [
          { en: 'One instance and one AZ are single points of failure.', ro: 'Instanța și AZ-ul sunt puncte unice de failure.' },
          { en: 'Scaling and deployments create downtime risk.', ro: 'Scalarea și deploy-urile creează risc de downtime.' },
        ],
        recommended: false,
      },
      {
        id: 'alb-asg',
        title: { en: 'ALB + multi-AZ Auto Scaling group', ro: 'ALB + Auto Scaling group multi-AZ' },
        summary: {
          en: 'Terminate HTTPS at an Application Load Balancer and distribute requests to replaceable private EC2 instances.',
          ro: 'Termină HTTPS la un Application Load Balancer și distribuie cererile către instanțe EC2 private și înlocuibile.',
        },
        strengths: [
          { en: 'Health checks remove unhealthy targets and the ASG replaces them.', ro: 'Health check-urile elimină target-urile unhealthy, iar ASG le înlocuiește.' },
          { en: 'Multi-AZ placement tolerates an AZ failure.', ro: 'Distribuția multi-AZ tolerează pierderea unui AZ.' },
          { en: 'Target tracking follows demand without fixed peak capacity.', ro: 'Target tracking urmărește cererea fără capacitate maximă permanentă.' },
        ],
        tradeoffs: [
          { en: 'ALB has a fixed hourly component and usage charges.', ro: 'ALB are o componentă de cost orar și costuri în funcție de utilizare.' },
          { en: 'State must move out of instance memory and local disks.', ro: 'Starea trebuie mutată din memoria și discurile locale ale instanței.' },
        ],
        recommended: true,
      },
      {
        id: 'nlb-asg',
        title: { en: 'NLB + multi-AZ Auto Scaling group', ro: 'NLB + Auto Scaling group multi-AZ' },
        summary: {
          en: 'Use a Network Load Balancer for layer-4 traffic or static-IP requirements.',
          ro: 'Folosește Network Load Balancer pentru trafic layer 4 sau cerințe de IP static.',
        },
        strengths: [
          { en: 'Very high performance and static IP support.', ro: 'Performanță foarte mare și suport pentru IP-uri statice.' },
        ],
        tradeoffs: [
          { en: 'It does not provide the HTTP routing features useful in this web scenario.', ro: 'Nu oferă funcțiile de rutare HTTP utile în acest scenariu web.' },
          { en: 'Choose it only when layer-4 constraints justify it.', ro: 'Alege-l doar când există cerințe layer 4 care îl justifică.' },
        ],
        recommended: false,
      },
    ],
    decision: {
      en: 'Choose an internet-facing ALB across two public subnets and an Auto Scaling group across two private subnets. Start with desired capacity 2, minimum 2, and a deliberately small lab maximum. Use an IAM role and Systems Manager instead of SSH keys. Keep sessions and durable data outside EC2.',
      ro: 'Alege un ALB internet-facing în două subnet-uri publice și un Auto Scaling group în două subnet-uri private. Pornește cu desired capacity 2, minimum 2 și un maximum intenționat mic pentru lab. Folosește un rol IAM și Systems Manager în loc de chei SSH. Păstrează sesiunile și datele durabile în afara EC2.',
    },
    diagram: `flowchart TB
  U[Users] --> R[Route 53]
  R --> A[Application Load Balancer]
  subgraph V[VPC - two Availability Zones]
    A --> E1[Private EC2 - AZ A]
    A --> E2[Private EC2 - AZ B]
    E1 -. health .-> G[Auto Scaling group]
    E2 -. health .-> G
    G --> C[CloudWatch metrics]
  end`,
    failureModes: [
      {
        event: { en: 'One EC2 process stops responding.', ro: 'Un proces EC2 nu mai răspunde.' },
        response: { en: 'ALB health checks stop routing to it; the ASG replaces the unhealthy instance.', ro: 'Health check-ul ALB oprește rutarea către el; ASG înlocuiește instanța unhealthy.' },
      },
      {
        event: { en: 'One Availability Zone becomes unavailable.', ro: 'O Availability Zone devine indisponibilă.' },
        response: { en: 'The ALB routes to the healthy AZ while the ASG restores desired capacity when placement is available.', ro: 'ALB rutează spre AZ-ul sănătos, iar ASG reface desired capacity când placement-ul devine disponibil.' },
      },
      {
        event: { en: 'A campaign causes a sustained traffic spike.', ro: 'O campanie produce un vârf susținut de trafic.' },
        response: { en: 'Target tracking adds instances; cooldown and warm-up settings prevent oscillation.', ro: 'Target tracking adaugă instanțe; cooldown și warm-up previn oscilația.' },
      },
    ],
    costDrivers: [
      { en: 'EC2 instance-hours and attached EBS volumes.', ro: 'Orele instanțelor EC2 și volumele EBS atașate.' },
      { en: 'ALB hours and Load Balancer Capacity Units.', ro: 'Orele ALB și Load Balancer Capacity Units.' },
      { en: 'NAT Gateway hours/data if private instances download through NAT; prefer VPC endpoints where justified.', ro: 'Orele/datele NAT Gateway dacă instanțele private descarcă prin NAT; preferă VPC endpoints unde sunt justificate.' },
      { en: 'Cross-AZ and internet data transfer.', ro: 'Transferul de date cross-AZ și către internet.' },
    ],
    lab: [
      {
        title: { en: 'Model the network and trust boundaries in IaC.', ro: 'Modelează rețeaua și trust boundaries în IaC.' },
        evidence: { en: 'A reviewed plan plus a diagram showing public ALB and private targets in two AZs.', ro: 'Un plan verificat și o diagramă cu ALB public și target-uri private în două AZ-uri.' },
      },
      {
        title: { en: 'Deploy a launch template, target group, ALB and ASG.', ro: 'Deployează launch template, target group, ALB și ASG.' },
        evidence: { en: 'Two healthy targets in different AZs and no inbound SSH rule.', ro: 'Două target-uri healthy în AZ-uri diferite și nicio regulă inbound SSH.' },
      },
      {
        title: { en: 'Inject an instance failure.', ro: 'Injectează failure-ul unei instanțe.' },
        evidence: { en: 'Request log stays available and the replacement time is recorded.', ro: 'Logul cererilor rămâne disponibil și timpul de înlocuire este înregistrat.' },
      },
      {
        title: { en: 'Generate controlled load, then clean up.', ro: 'Generează trafic controlat, apoi șterge resursele.' },
        evidence: { en: 'Scaling activity, CloudWatch graph, estimated cost and successful IaC destroy.', ro: 'Activitate de scaling, grafic CloudWatch, cost estimat și IaC destroy reușit.' },
      },
    ],
    awsReferences: [
      { label: 'Elastic Load Balancing - How it works', url: 'https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/how-elastic-load-balancing-works.html' },
      { label: 'Auto Scaling target tracking policies', url: 'https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scaling-target-tracking.html' },
      { label: 'AWS Well-Architected Reliability Pillar', url: 'https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html' },
    ],
  },
];
