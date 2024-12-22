import { ResumeData } from "@/types";


export const sarachanData: ResumeData = {
  personalInfo: {
    name: "Sarah Chen",
    email: "sarah.chen@gmail.com",
    phone: "+1 (415) 555-0123",
    linkedinURL: "https://linkedin.com/in/sarahchen",
    githubURL: "https://github.com/sarahchen-dev",
  },
  education: [
    {
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science",
      startDate: "2016-08-15",
      endDate: "2020-05-20",
      fieldOfStudy: "Computer Science and Digital Media",
    },
  ],
  workExperience: [
    {
      company: "Stripe",
      jobTitle: "Senior Frontend Engineer",
      startDate: "2022-03-01",
      endDate: "Present",
      description:
        "Lead engineer for merchant dashboard redesign. Architected and implemented new React component library using TypeScript and Tailwind CSS. Reduced bundle size by 40% through code splitting and lazy loading. Mentored junior developers and established frontend best practices.",
    },
    {
      company: "Airbnb",
      jobTitle: "Frontend Engineer",
      startDate: "2020-06-15",
      endDate: "2022-02-28",
      description:
        "Developed responsive booking flow components using React and Redux. Implemented A/B testing framework for UI experiments. Improved page load times by 60% through performance optimizations. Collaborated with design team on accessibility improvements.",
    },
    {
      company: "Dropbox",
      jobTitle: "Frontend Engineer Intern",
      startDate: "2019-05-15",
      endDate: "2019-08-30",
      description:
        "Developed file preview features using React. Implemented responsive design patterns. Collaborated with UX team on user research and prototyping.",
    },
  ],
  projects: [
    {
      name: "OpenSource Component Library",
      date: "2023-01-15",
      description:
        "Created and maintained a React component library with 50+ components. Implemented comprehensive testing suite with Jest and React Testing Library. Published to npm with 10k+ weekly downloads.",
    },
  ],
  skills:
    "React, TypeScript, JavaScript, Next.js, GraphQL, Redux, Tailwind CSS, Jest, React Testing Library, Webpack, Node.js, CI/CD, Git, AWS",
  customSections: {},
};

export const michaelData: ResumeData = {
  personalInfo: {
    name: "Michael Rodriguez",
    email: "m.rodriguez@protonmail.com",
    phone: "+1 (628) 555-0456",
    linkedinURL: "https://linkedin.com/in/mrodriguez-devops",
    githubURL: "https://github.com/mrodriguez-ops",
  },
  education: [
    {
      institution: "Georgia Institute of Technology",
      degree: "Master of Science",
      startDate: "2018-08-20",
      endDate: "2020-05-15",
      fieldOfStudy: "Computer Science - Systems and Architecture",
    },
    {
      institution: "University of Texas at Austin",
      degree: "Bachelor of Science",
      startDate: "2014-08-25",
      endDate: "2018-05-10",
      fieldOfStudy: "Computer Engineering",
    },
    {
      institution: "Austin Community College",
      degree: "Associate of Science",
      startDate: "2012-08-20",
      endDate: "2014-05-15",
      fieldOfStudy: "Computer Science",
    },
  ],
  workExperience: [
    {
      company: "Netflix",
      jobTitle: "Senior DevOps Engineer",
      startDate: "2021-04-01",
      endDate: "Present",
      description:
        "Lead infrastructure automation initiatives using Terraform and Kubernetes. Designed and implemented multi-region disaster recovery system. Reduced deployment time by 75% through CI/CD pipeline optimization. Managed migration of legacy systems to microservices architecture.",
    },
    {
      company: "Databricks",
      jobTitle: "DevOps Engineer",
      startDate: "2020-06-01",
      endDate: "2021-03-30",
      description:
        "Maintained and scaled Kubernetes clusters across AWS and Azure. Implemented automated security scanning and compliance checks. Developed custom monitoring solutions using Prometheus and Grafana. Reduced infrastructure costs by 35% through optimization.",
    },
  ],
  projects: [
    {
      name: "Infrastructure as Code Framework",
      date: "2023-03-01",
      description:
        "Developed open-source IaC framework for multi-cloud deployments. Supports AWS, GCP, and Azure with unified syntax. Implemented automated testing and validation pipeline.",
    },
    {
      name: "Kubernetes Operator for Database Management",
      date: "2022-08-15",
      description:
        "Created custom Kubernetes operator for automated database scaling and failover. Supports PostgreSQL and MySQL clusters. Implemented automated backup and recovery systems.",
    },
    {
      name: "Cloud Cost Optimization Tool",
      date: "2022-01-10",
      description:
        "Built tool to analyze and optimize cloud resource usage across multiple providers. Implemented ML-based prediction for resource scaling. Saved $200k+ annually in cloud costs for multiple clients.",
    },
    {
      name: "GitOps Workflow Engine",
      date: "2021-11-20",
      description:
        "Developed automated GitOps workflow system for Kubernetes deployments. Integrated with major CI/CD platforms. Released as open-source with 1000+ GitHub stars.",
    },
  ],
  skills:
    "Kubernetes, Docker, Terraform, AWS, GCP, Azure, CI/CD (Jenkins, GitLab), Python, Go, Prometheus, Grafana, ELK Stack, Ansible, Shell Scripting, Security & Compliance, Site Reliability Engineering",
  customSections: {},
};

export const priayData: ResumeData = {
  personalInfo: {
    name: "Priya Patel",
    email: "priya.patel@gmail.com",
    phone: "+1 (650) 555-0789",
    linkedinURL: "https://linkedin.com/in/priyapatel-ml",
    githubURL: "https://github.com/priya-ml",
  },
  education: [
    {
      institution: "Stanford University",
      degree: "Ph.D.",
      startDate: "2017-09-01",
      endDate: "2021-06-15",
      fieldOfStudy: "Computer Science - Machine Learning",
    },
    {
      institution: "Indian Institute of Technology, Bombay",
      degree: "Bachelor of Technology",
      startDate: "2013-07-15",
      endDate: "2017-05-01",
      fieldOfStudy: "Computer Science and Engineering",
    },
  ],
  workExperience: [
    {
      company: "OpenAI",
      jobTitle: "Senior Machine Learning Engineer",
      startDate: "2022-01-15",
      endDate: "Present",
      description:
        "Leading development of large language models and fine-tuning pipelines. Implemented efficient training techniques reducing computational costs by 40%. Developed novel approaches for model evaluation and bias detection. Collaborated with research team on model architecture improvements.",
    },
  ],
  projects: [
    {
      name: "Efficient Transformer Architecture",
      date: "2023-06-01",
      description:
        "Developed novel transformer architecture reducing inference time by 30% while maintaining accuracy. Published research paper at NeurIPS 2023. Open-sourced implementation with comprehensive documentation.",
    },
    {
      name: "Medical Image Analysis System",
      date: "2022-09-15",
      description:
        "Built end-to-end system for medical image analysis using PyTorch. Implemented attention mechanisms for improved feature extraction. Achieved state-of-the-art results on public healthcare datasets.",
    },
    {
      name: "ML Model Serving Framework",
      date: "2022-03-10",
      description:
        "Created distributed framework for serving large ML models in production. Implemented dynamic batching and model quantization. Reduced inference latency by 45% while maintaining throughput.",
    },
    {
      name: "Reinforcement Learning for Robotics",
      date: "2021-08-20",
      description:
        "Developed RL algorithms for robotic manipulation tasks. Implemented sim-to-real transfer techniques. Published at ICRA 2022.",
    },
    {
      name: "Multimodal Learning Pipeline",
      date: "2021-02-15",
      description:
        "Built pipeline for training models on text, image, and audio data. Implemented novel fusion architecture. Achieved SOTA results on multimodal benchmarks.",
    },
  ],
  skills:
    "Python, PyTorch, TensorFlow, JAX, Machine Learning, Deep Learning, Natural Language Processing, Computer Vision, Distributed Systems, CUDA, C++, SQL, AWS, Docker, MLOps, Scientific Writing",
  customSections: {},
};

export const ResumeExamples = [
  {
    label: "Sarah Chen",
    data: sarachanData,
  },
  {
    label: "Michael Rodriguez",
    data: michaelData,
  },
  {
    label: "Priya Patel",
    data: priayData,
  },
];