export const profile = {
  name: 'Tyler Gall',
  role: 'Software Development Engineer',
  summary:
    'I build scalable cloud infrastructure at AWS. I currently focus on capacity systems and tooling for GameLift Streams.',
  location: 'Seattle, WA',
  focus: 'Cloud Infrastructure',
  languages: 'Java, TypeScript, Python, C++',
  education: 'B.S. Mathematics + Computer Science, UIUC',
  email: 'tmgall@outlook.com',
  github: 'https://github.com/tmgall',
  linkedin: 'https://www.linkedin.com/in/tyler-gall/',
}

export const aboutParagraphs = [
  "I'm a software engineer at AWS focused on capacity planning, scalable cloud infrastructure, and operational tooling.",
  'I design systems that give engineering leadership real-time visibility into thousands of GPU instances and help teams ship faster with confidence.',
  'I studied Mathematics and Computer Science at the University of Illinois, where I researched competitive random walks on n-dimensional tori.',
]

export const experienceItems = [
  {
    date: '2025 - Present',
    role: 'Software Development Engineer II',
    company: 'AWS - GameLift Streams, Core Team',
    description:
      'Designing capacity visibility and management systems tracking thousands of concurrent GPU instances. Building automated pipelines for business metrics, on-demand pool monitoring, and region expansion automation.',
    tags: ['Java', 'TypeScript', 'CloudWatch', 'EC2', 'CDK'],
  },
  {
    date: '2023 - 2025',
    role: 'Software Development Engineer I',
    company: 'AWS - GameLift Streams',
    description:
      'Owned Service Quotas onboarding for GA launch and designed a global quota utilization metrics system with DynamoDB Global Tables managing 10,000+ records.',
    tags: ['Java', 'DynamoDB', 'CloudFormation', 'Lambda', 'Step Functions'],
  },
  {
    date: '2021 and 2022',
    role: 'Software Development Engineer Intern',
    company: 'AWS - DevOps Guru and CodeGuru Profiler',
    description:
      'Engineered a notification service for DevOps Guru using CloudFormation and Lambda and improved CodeGuru Profiler infrastructure performance.',
    tags: ['Python', 'CloudFormation', 'Lambda', 'S3'],
  },
  {
    date: '2019 - 2022',
    role: 'B.S. Mathematics + Computer Science',
    company: 'University of Illinois, Urbana-Champaign',
    description:
      'GPA 4.0/4.0, Bronze Tablet Recipient, and undergraduate research on competitive random walks on n-dimensional tori using C++, CUDA, and Python simulations.',
    tags: ['C++', 'CUDA', 'Python', 'Probability Theory'],
  },
]

export const projectItems = [
  {
    name: 'Random Walk Simulation Reseach and Toolkit Creation',
    description:
      'UIUC research project on how different walker strategies claim area over time on 2D and 3D tori.',
    context:
      'I studied head-to-head competition, collaboration, and distorted-torus settings to see which policies maximize first-claim coverage.',
    methods: [
      'Built simulation tooling for discrete 2D/3D tori and tracked covered-area process S(t).',
      'Ran Monte Carlo experiments comparing RW, GB, GU, and directional policies.',
      'Tested both competition and collaboration, including vertex-deleted torus distortions.',
    ],
    outcomes: [
      '2D: GB showed the strongest head-to-head coverage against RW/GU/Viki baselines.',
      '3D: GU outperformed RW and GB in head-to-head coverage.',
      'Collaboration results supported the conjecture that coordinated agents can match or exceed solo expected coverage.',
    ],
    stack: ['C++', 'Python', 'Monte Carlo Simulation', 'Random Walks on Graphs', 'Probability Theory'],
    liveUrl: null,
    sourceUrl: 'https://github.com/tmgall/RandomWalkSimulation',
    paperUrl: 'https://github.com/tmgall/CompetitionOnTorus/blob/main/FinalPoster.pdf',
    paperLabel: 'Research PDF',
    showDemo: true,
  },
  {
    name: 'Lexicon — Daily Etymology Word Game',
    description:
      'A daily word game where players deduce words from clues describing their literal etymological meanings — "far vision" → television, for example.',
    context:
      'Each puzzle presents the root-level meaning of a word. Players guess the modern English word it describes, with progressive hints that reveal etymological roots and definitions if needed. Puzzles cycle weekly by difficulty and a full archive lets you replay any past puzzle.',
    methods: [
      'Built a hint system with three progressive levels: etymological roots, modern definition, and full answer reveal.',
      'Implemented near-miss detection using Levenshtein distance, so close guesses get encouraging feedback rather than a flat reject.',
      'Designed a streak and statistics system persisted in IndexedDB — no backend required.',
      'Built an archive calendar so players can replay any past puzzle, not just the daily one.',
    ],
    outcomes: [
      'Launched November 2025 and actively maintained with 175+ commits.',
      'Fully client-side with no backend — all game state lives in the browser via IndexedDB.',
      'Difficulty cycles weekly (easy → medium → hard) to keep the daily cadence varied.',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'React Router', 'IndexedDB', 'Vercel'],
    liveUrl: 'https://lexicongame.net',
    sourceUrl: 'https://github.com/tmgall/EtymologyGame',
    paperUrl: null,
    paperLabel: null,
    showDemo: false,
  },
]
