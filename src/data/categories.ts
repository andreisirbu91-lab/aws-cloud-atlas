import type { Category } from '@/types';

export const categories: Category[] = [
  {
    id: 'compute',
    label: { en: 'Compute', ro: 'Calcul' },
    description: {
      en: 'Run applications in the cloud: VMs, containers, and serverless functions.',
      ro: 'Rulezi aplicații în cloud: VM-uri, containere și funcții serverless.',
    },
    color: 'hsl(217, 91%, 60%)',
    services: [
      'ec2', 'lambda', 'ecs', 'eks', 'fargate', 'beanstalk', 'lightsail',
      'batch', 'apprunner', 'ecr', 'outposts',
    ],
  },
  {
    id: 'storage',
    label: { en: 'Storage', ro: 'Stocare' },
    description: {
      en: 'Store files, backups, and objects at global scale.',
      ro: 'Stochezi fișiere, backup-uri și obiecte la scară globală.',
    },
    color: 'hsl(38, 92%, 50%)',
    services: ['s3', 'ebs', 'efs', 'fsx', 'glacier', 'storagegateway', 'snow', 'awsbackup'],
  },
  {
    id: 'database',
    label: { en: 'Database', ro: 'Baze de Date' },
    description: {
      en: 'Managed databases: relational, NoSQL, and in-memory.',
      ro: 'Baze de date gestionate: relaționale, NoSQL și în memorie.',
    },
    color: 'hsl(280, 75%, 60%)',
    services: ['rds', 'aurora', 'dynamodb', 'elasticache', 'redshift', 'documentdb', 'neptune'],
  },
  {
    id: 'network',
    label: { en: 'Network & CDN', ro: 'Rețea & CDN' },
    description: {
      en: 'Virtual networks, content delivery, and load balancing.',
      ro: 'Rețele virtuale, livrare de conținut și load balancing.',
    },
    color: 'hsl(190, 90%, 50%)',
    services: [
      'vpc', 'cloudfront', 'route53', 'apigateway', 'elb', 'directconnect',
      'globalaccelerator', 'privatelink',
    ],
  },
  {
    id: 'security',
    label: { en: 'Security & Identity', ro: 'Securitate & Identitate' },
    description: {
      en: 'Identities, permissions, encryption, and threat detection.',
      ro: 'Identități, permisiuni, criptare și detecție amenințări.',
    },
    color: 'hsl(0, 72%, 51%)',
    services: [
      'iam', 'cognito', 'kms', 'waf', 'shield', 'guardduty', 'inspector',
      'secretsmanager', 'macie', 'securityhub', 'detective', 'acm',
      'directoryservice', 'iamic',
    ],
  },
  {
    id: 'management',
    label: { en: 'Management & Governance', ro: 'Management & Guvernanță' },
    description: {
      en: 'Monitor, audit, deploy, and govern AWS resources.',
      ro: 'Monitorizare, audit, deployment și guvernanță AWS.',
    },
    color: 'hsl(160, 70%, 45%)',
    services: [
      'cloudwatch', 'cloudtrail', 'config', 'trustedadvisor', 'systemsmanager',
      'organizations', 'cloudformation', 'controltower', 'servicecatalog', 'xray',
      'healthdashboard',
    ],
  },
  {
    id: 'integration',
    label: { en: 'Integration', ro: 'Integrare' },
    description: {
      en: 'Decouple services with messaging, events, and orchestration.',
      ro: 'Decuplezi servicii cu mesagerie, evenimente și orchestrare.',
    },
    color: 'hsl(260, 80%, 60%)',
    services: ['sns', 'sqs', 'eventbridge', 'stepfunctions', 'appsync', 'mq', 'ses'],
  },
  {
    id: 'analytics',
    label: { en: 'Analytics & AI', ro: 'Analitică & AI' },
    description: {
      en: 'Process data at scale and add AI/ML capabilities.',
      ro: 'Procesezi date la scară și adaugi capabilități AI/ML.',
    },
    color: 'hsl(170, 80%, 45%)',
    services: [
      'athena', 'quicksight', 'kinesis', 'glue', 'emr', 'sagemaker', 'rekognition',
      'comprehend', 'lex', 'polly', 'translate', 'transcribe', 'textract',
      'kendra', 'bedrock', 'personalize',
    ],
  },
  {
    id: 'migration',
    label: { en: 'Migration', ro: 'Migrare' },
    description: {
      en: 'Move data and apps from on-premises to AWS.',
      ro: 'Muți date și aplicații de pe on-premises pe AWS.',
    },
    color: 'hsl(25, 90%, 55%)',
    services: ['dms', 'datasync', 'migrationhub', 'transferfamily', 'applicationmigrationservice'],
  },
  {
    id: 'billing',
    label: { en: 'Billing & Support', ro: 'Facturare & Suport' },
    description: {
      en: 'Track costs, set budgets, and pick the right support plan.',
      ro: 'Urmărești costurile, setezi bugete și alegi planul de suport potrivit.',
    },
    color: 'hsl(142, 71%, 45%)',
    services: ['costexplorer', 'budgets', 'calculator', 'supportplans', 'marketplace'],
  },
  {
    id: 'enduser',
    label: { en: 'End User & IoT', ro: 'End User & IoT' },
    description: {
      en: 'Desktop streaming, app streaming, and IoT devices.',
      ro: 'Streaming desktop, aplicații și dispozitive IoT.',
    },
    color: 'hsl(310, 75%, 55%)',
    services: ['workspaces', 'appstream', 'amplify', 'iotcore', 'connect'],
  },
];

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}
