# AWS Cloud Atlas

> Interactive study platform for the **AWS Certified Cloud Practitioner (CLF-C02)** exam. Built with Next.js 14, TypeScript, Tailwind CSS, and zustand.

![Static Badge](https://img.shields.io/badge/exam-CLF--C02-FF9900?style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-3-38B2AC?style=flat-square&logo=tailwind-css)

## What's inside

- **97 AWS services** organized into 11 categories with explanations, analogies, exam tips, pricing, and links to related services
- **14 core concepts** beyond services — Regions, Availability Zones, Edge Locations, Shared Responsibility Model, Well-Architected Framework, pricing models, support plans, IAM best practices, Cloud Adoption Framework
- **30 real exam-style questions** with explanations and links to relevant services
- **Universal search** (⌘K) across services and concepts
- **Light/dark theme** with smooth transitions
- **Bilingual** (English / Romanian)
- **Progress tracking** — XP, streaks, mastery percentage (zustand persist)

## Local development

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Deploy to AWS Amplify

This project is configured for one-click deployment via [`amplify.yml`](./amplify.yml).

1. Push this repo to GitHub
2. AWS Console → Amplify → **Host web app** → connect GitHub
3. Amplify auto-detects Next.js and deploys

Free tier covers ~1000 build minutes and 15 GB serve per month.

## Project structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # React components (ServiceCard, QuizModal, GlobalSearch, …)
├── data/             # Services, categories, concepts, quiz questions
├── store/            # zustand progress store with localStorage persist
└── types/            # TypeScript types
```

## Sources

- AWS official documentation
- Stephane Maarek — *AWS Certified Cloud Practitioner CLF-C02* course
- [AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/)
- [AWS Shared Responsibility Model](https://aws.amazon.com/compliance/shared-responsibility-model/)

## License

MIT — for personal study use.
