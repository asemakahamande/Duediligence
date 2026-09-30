import { 
  Code, 
  Binary, 
  BarChart3, 
  BrainCircuit, 
  ShieldCheck, 
  TrendingUp, 
  CloudRain, 
  Layers, 
  Cpu, 
  Sparkles,
  Server
} from 'lucide-react';

export const coursesData = [
  {
    id: 'software-engineering',
    title: 'Software Engineering',
    tagline: 'Build Scalable, Production-Ready Web & Cloud Applications',
    icon: Code,
    color: 'from-blue-600 to-indigo-600',
    duration: '16 Weeks',
    level: 'Beginner to Advanced',
    mode: 'Virtual Live & Hands-On Labs',
    price: '₦250,000 ($499)',
    modernNeed: 'Every modern enterprise is a software company. From banking to healthcare, robust software systems form the backbone of modern global commerce. Mastering full-stack software engineering unlocks high-paying global remote roles and empowers you to turn ideas into scalable digital products.',
    careerRoles: ['Full Stack Engineer', 'Frontend Developer', 'Backend API Specialist', 'Software Consultant'],
    tools: ['JavaScript (ES6+)', 'TypeScript', 'React.js', 'Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Git & GitHub', 'REST APIs', 'Docker Basics'],
    curriculum: [
      {
        module: 'Module 1',
        title: 'Modern Web Foundations & Core Programming',
        description: 'Deep dive into semantic HTML5, modern CSS3 (Flexbox/Grid/Tailwind), and advanced JavaScript (ES6+, asynchronous programming, closures, DOM manipulation).'
      },
      {
        module: 'Module 2',
        title: 'Frontend Architecture with React & TypeScript',
        description: 'Component lifecycles, custom hooks, state management (Redux Toolkit / Zustand), responsive UI design, performance optimization, and TypeScript integration.'
      },
      {
        module: 'Module 3',
        title: 'Server-Side Engineering & RESTful APIs',
        description: 'Node.js runtime, Express framework, authentication & authorization (JWT/OAuth), middleware patterns, API design principles, and error handling.'
      },
      {
        module: 'Module 4',
        title: 'Database Architecture & Data Modeling',
        description: 'Relational data modeling with PostgreSQL and SQL queries, NoSQL schema design with MongoDB, Prisma ORM, and database indexing.'
      },
      {
        module: 'Module 5',
        title: 'Testing, System Design & Cloud Deployment',
        description: 'Unit & integration testing (Jest/Vitest), CI/CD pipelines, containerization with Docker, and deploying production apps to Vercel/AWS.'
      },
      {
        module: 'Capstone Project',
        title: 'Enterprise Full-Stack SaaS Application',
        description: 'Architect, build, test, and deploy a multi-tenant web application featuring authentication, real-time data, payment processing, and cloud database storage.'
      }
    ]
  },
  {
    id: 'data-science',
    title: 'Data Science',
    tagline: 'Transform Complex Data into Predictive Intelligence & Actionable Insights',
    icon: Binary,
    color: 'from-cyan-600 to-blue-600',
    duration: '14 Weeks',
    level: 'Beginner to Intermediate',
    mode: 'Virtual Live & Guided Labs',
    price: '₦220,000 ($449)',
    modernNeed: 'Organizations generate massive volumes of data daily. Data scientists are the problem solvers who decode patterns, train predictive models, and guide executive strategic decisions, sitting at the coveted intersection of mathematics, coding, and business leadership.',
    careerRoles: ['Data Scientist', 'Machine Learning Analyst', 'Quantitative Researcher', 'Predictive Modeler'],
    tools: ['Python', 'Pandas', 'NumPy', 'Scikit-Learn', 'Statsmodels', 'Jupyter', 'SQL', 'Seaborn', 'Matplotlib', 'Streamlit'],
    curriculum: [
      {
        module: 'Module 1',
        title: 'Python for Data Science & Applied Statistics',
        description: 'Python environment setup, data structures, descriptive & inferential statistics, probability distributions, hypothesis testing, and exploratory computing.'
      },
      {
        module: 'Module 2',
        title: 'Data Wrangling, Cleaning & Feature Engineering',
        description: 'Mastering Pandas and NumPy for complex data transformations, handling missing data, outlier detection, encoding categorical variables, and feature scaling.'
      },
      {
        module: 'Module 3',
        title: 'Supervised & Unsupervised Machine Learning',
        description: 'Linear & Logistic Regression, Decision Trees, Random Forests, Gradient Boosting (XGBoost/LightGBM), K-Means Clustering, and PCA dimensionality reduction.'
      },
      {
        module: 'Module 4',
        title: 'Model Evaluation, Validation & Optimization',
        description: 'Cross-validation strategies, precision/recall trade-offs, ROC-AUC curves, hyperparameter tuning with GridSearchCV, and avoiding data leakage.'
      },
      {
        module: 'Module 5',
        title: 'Applied Time Series & NLP Foundations',
        description: 'Time series decomposition and ARIMA/Prophet forecasting, text preprocessing, TF-IDF vectorization, and sentiment analysis.'
      },
      {
        module: 'Capstone Project',
        title: 'End-to-End Predictive Machine Learning System',
        description: 'Develop and deploy a complete predictive machine learning web application using Streamlit that ingests live data and returns real-time predictions.'
      }
    ]
  },
  {
    id: 'data-analysis',
    title: 'Data Analysis',
    tagline: 'Unlock Business Growth with Powerful Visual Dashboards & SQL Analytics',
    icon: BarChart3,
    color: 'from-emerald-600 to-teal-600',
    duration: '12 Weeks',
    level: 'All Levels (No Coding Required)',
    mode: 'Virtual Live & Case Studies',
    price: '₦150,000 ($299)',
    modernNeed: 'In the modern generation, gut instinct is replaced by data-driven intelligence. Companies urgently need analysts who can clean messy business records, uncover revenue leaks, and build real-time executive dashboards that steer company growth.',
    careerRoles: ['Business Data Analyst', 'BI Developer', 'Operations Analyst', 'Reporting Specialist'],
    tools: ['Microsoft Excel (Advanced)', 'SQL Server / PostgreSQL', 'Power BI (DAX & Power Query)', 'Tableau', 'Python for Analysis', 'Google Data Studio'],
    curriculum: [
      {
        module: 'Module 1',
        title: 'Advanced Excel for Business Intelligence',
        description: 'Advanced lookup formulas (XLOOKUP, INDEX/MATCH), Pivot Tables, dynamic arrays, Power Query data cleaning, financial modeling, and scenario analysis.'
      },
      {
        module: 'Module 2',
        title: 'Relational Databases & SQL for Analytics',
        description: 'Writing complex SQL queries, multi-table JOINs, subqueries, Common Table Expressions (CTEs), window functions, aggregate metrics, and data extraction.'
      },
      {
        module: 'Module 3',
        title: 'Power BI: Data Modeling, DAX & Dashboards',
        description: 'Star schema design, Power Query M-code, creating custom DAX measures & calculated columns, interactive drill-through visual dashboards, and automated report publishing.'
      },
      {
        module: 'Module 4',
        title: 'Tableau & Visual Data Storytelling',
        description: 'Visual analytics best practices, parameters, calculated fields, dashboard design for C-suite stakeholders, and compelling presentation techniques.'
      },
      {
        module: 'Module 5',
        title: 'Automated Analytics & Python Fundamentals',
        description: 'Automating repetitive data tasks and generating statistical reports using Python Pandas and Matplotlib.'
      },
      {
        module: 'Capstone Project',
        title: 'Comprehensive Corporate Performance Dashboard',
        description: 'Build a production-grade multi-page Power BI & SQL dashboard tracking revenue, customer retention, and operational KPIs for an enterprise.'
      }
    ]
  },
  {
    id: 'artificial-intelligence',
    title: 'Artificial Intelligence',
    tagline: 'Build Intelligent Systems, Neural Networks & Generative AI Solutions',
    icon: BrainCircuit,
    color: 'from-purple-600 to-blue-600',
    duration: '14 Weeks',
    level: 'Intermediate',
    mode: 'Virtual Live & AI Lab Projects',
    price: '₦220,000 ($449)',
    modernNeed: 'AI is fundamentally reshaping every industry on the planet. From automated reasoning and computer vision to Generative AI and intelligent autonomous agents, skilled AI engineers are at the forefront of the largest technological leap in human history.',
    careerRoles: ['AI Engineer', 'Deep Learning Specialist', 'Prompt & LLM Engineer', 'AI Solutions Architect'],
    tools: ['Python', 'PyTorch', 'TensorFlow', 'Hugging Face', 'LangChain', 'OpenAI API', 'Vector Databases (Chroma/Pinecone)', 'OpenCV', 'FastAPI'],
    curriculum: [
      {
        module: 'Module 1',
        title: 'Deep Learning Foundations & Neural Networks',
        description: 'Perceptrons, backpropagation, gradient descent, loss functions, activation functions, and building deep neural networks from scratch using PyTorch.'
      },
      {
        module: 'Module 2',
        title: 'Computer Vision & Convolutional Neural Networks (CNNs)',
        description: 'Image processing with OpenCV, convolutional layers, transfer learning with ResNet/EfficientNet, object detection (YOLO), and image segmentation.'
      },
      {
        module: 'Module 3',
        title: 'Natural Language Processing & Transformer Architecture',
        description: 'Embeddings, attention mechanisms, Transformer models (BERT, GPT), fine-tuning pretrained models from Hugging Face for classification and text generation.'
      },
      {
        module: 'Module 4',
        title: 'Generative AI, LLMs & Retrieval-Augmented Generation (RAG)',
        description: 'Prompt engineering patterns, LangChain orchestration, vector databases for semantic search, and building custom RAG architectures over proprietary documents.'
      },
      {
        module: 'Module 5',
        title: 'AI Deployment, API Packaging & Ethics',
        description: 'Serving models with FastAPI, containerizing with Docker, handling AI safety, latency optimization, and quantization.'
      },
      {
        module: 'Capstone Project',
        title: 'Enterprise AI Assistant with Custom Knowledge & Vision',
        description: 'Architect and deploy an interactive multimodal AI application integrating live vision processing, vector RAG retrieval, and real-time streaming LLM responses.'
      }
    ]
  },
  {
    id: 'cyber-security',
    title: 'Cyber Security',
    tagline: 'Defend Critical Digital Infrastructure, Networks & Data from Modern Threats',
    icon: ShieldCheck,
    color: 'from-red-600 to-rose-600',
    duration: '12 Weeks',
    level: 'Beginner to Advanced',
    mode: 'Virtual Live & Virtual Range Labs',
    price: '₦200,000 ($399)',
    modernNeed: 'As organizations digitize their entire operations, cyberattacks, ransomware, and data breaches have surged exponentially. Cybersecurity specialists are crucial guardians who protect systems, safeguard user privacy, and ensure business continuity against sophisticated cyber threats.',
    careerRoles: ['Cyber Security Analyst', 'SOC Analyst', 'Penetration Tester', 'Information Security Officer'],
    tools: ['Linux / Bash', 'Wireshark', 'Nmap', 'Burp Suite', 'Metasploit', 'Splunk (SIEM)', 'Snort / Suricata', 'OWASP ZAP', 'Hydra'],
    curriculum: [
      {
        module: 'Module 1',
        title: 'Networking Fundamentals & Linux Security',
        description: 'OSI & TCP/IP models, network protocols (DNS, DHCP, TLS, SSH), packet analysis with Wireshark, Linux permissions, bash scripting, and system hardening.'
      },
      {
        module: 'Module 2',
        title: 'Threat Intelligence & Vulnerability Assessment',
        description: 'Reconnaissance techniques with Nmap, scanning tools, threat modeling, vulnerability scanning, CVE databases, and risk scoring frameworks (CVSS).'
      },
      {
        module: 'Module 3',
        title: 'Web Application Security & OWASP Top 10',
        description: 'Hands-on exploitation and defense of SQL Injection, Cross-Site Scripting (XSS), CSRF, Authentication Bypass, and Broken Access Control using Burp Suite.'
      },
      {
        module: 'Module 4',
        title: 'Security Operations (SOC) & SIEM Monitoring',
        description: 'Log analysis, setting up SIEM with Splunk, intrusion detection with Snort, identifying malicious traffic patterns, and incident response playbooks.'
      },
      {
        module: 'Module 5',
        title: 'Cryptography, Cloud Security & Compliance',
        description: 'Symmetric/asymmetric encryption, hashing, PKI infrastructure, securing cloud workloads (AWS/Azure security groups), and compliance standards (NIST, ISO 27001).'
      },
      {
        module: 'Capstone Project',
        title: 'Full Threat Assessment & Penetration Test Report',
        description: 'Execute a comprehensive ethical vulnerability scan and penetration test against a simulated corporate environment, followed by a professional remediation report.'
      }
    ]
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    tagline: 'Master Data-Driven Growth, Paid Performance Ads, SEO & Brand Conversion',
    icon: TrendingUp,
    color: 'from-amber-600 to-orange-600',
    duration: '10 Weeks',
    level: 'Beginner to Intermediate',
    mode: 'Virtual Live & Real Campaigns',
    price: '₦120,000 ($249)',
    modernNeed: 'Traditional billboards and print ads are obsolete. Businesses thrive or fail based on their ability to acquire customers online. Digital marketing specialists drive customer acquisition, brand loyalty, and revenue growth across search engines, social media, and automated email funnels.',
    careerRoles: ['Growth Marketing Manager', 'Performance Ads Specialist', 'SEO Strategist', 'Content & Brand Lead'],
    tools: ['Google Analytics 4 (GA4)', 'Google Tag Manager', 'Meta Ads Manager', 'Google Ads', 'SEMrush / Ahrefs', 'Mailchimp / Klaviyo', 'Canva Pro', 'WordPress SEO (Yoast)'],
    curriculum: [
      {
        module: 'Module 1',
        title: 'Growth Strategy & Audience Persona Mapping',
        description: 'Customer journey mapping, high-converting value propositions, competitive research, conversion rate optimization (CRO), and growth funnel architecture.'
      },
      {
        module: 'Module 2',
        title: 'Search Engine Optimization (SEO) & Content Strategy',
        description: 'Keyword research with SEMrush, on-page SEO, technical site audits, backlink strategy, local SEO, and creating search-optimized blog and video content.'
      },
      {
        module: 'Module 3',
        title: 'Paid Performance Advertising (Meta & Google Ads)',
        description: 'Setting up Meta Pixel & Conversions API, crafting high-converting ad copy and creatives, Google Search & Display Ads, bidding strategies, and ROAS optimization.'
      },
      {
        module: 'Module 4',
        title: 'Email Marketing Automation & Retargeting',
        description: 'Building segmented subscriber lists, lead magnets, automated nurture sequences, abandoned cart recovery, dynamic retargeting, and deliverability.'
      },
      {
        module: 'Module 5',
        title: 'Data Analytics & Attribution with GA4',
        description: 'Event tracking with Google Tag Manager, GA4 custom exploration reports, multi-channel attribution modeling, and calculating Customer Acquisition Cost (CAC) & LTV.'
      },
      {
        module: 'Capstone Project',
        title: 'Live 360° Multi-Channel Growth Campaign',
        description: 'Design, launch, and optimize a full digital acquisition campaign with SEO assets, ad campaigns, email funnels, and real-time GA4 analytics reporting.'
      }
    ]
  },
  {
    id: 'cloud-computing',
    title: 'Cloud Computing',
    tagline: 'Architect High-Availability Infrastructure, DevOps Pipelines & Cloud Systems',
    icon: CloudRain,
    color: 'from-sky-600 to-indigo-600',
    duration: '12 Weeks',
    level: 'Beginner to Advanced',
    mode: 'Virtual Live & Hands-On Cloud Labs',
    price: '₦200,000 ($399)',
    modernNeed: 'Modern software is born and hosted in the cloud. Cloud computing and DevOps professionals architect the reliable, scalable, and secure servers, databases, and microservices that power millions of global users with zero downtime.',
    careerRoles: ['Cloud Solutions Architect', 'DevOps Engineer', 'Site Reliability Engineer (SRE)', 'Cloud Infrastructure Admin'],
    tools: ['Amazon Web Services (AWS)', 'Microsoft Azure', 'Docker', 'Kubernetes (K8s)', 'Terraform (IaC)', 'Linux Server Administration', 'GitHub Actions CI/CD', 'Prometheus & Grafana'],
    curriculum: [
      {
        module: 'Module 1',
        title: 'Cloud Fundamentals & AWS/Azure Architecture',
        description: 'Cloud service models (IaaS, PaaS, SaaS), IAM access management, compute instances (EC2/Virtual Machines), VPC networking, subnets, and routing.'
      },
      {
        module: 'Module 2',
        title: 'Storage, Databases & High-Availability Systems',
        description: 'Object storage (S3/Blob), relational and managed databases (RDS, DynamoDB), Elastic Load Balancing (ELB), and Auto Scaling groups.'
      },
      {
        module: 'Module 3',
        title: 'Containerization with Docker & Microservices',
        description: 'Writing Dockerfiles, multi-stage builds, container networking, managing container images, and running microservice clusters with Docker Compose.'
      },
      {
        module: 'Module 4',
        title: 'Kubernetes Orchestration & Infrastructure as Code (IaC)',
        description: 'Deployments, Services, Ingress controllers, Helm charts, writing automated declarative infrastructure templates using Terraform.'
      },
      {
        module: 'Module 5',
        title: 'CI/CD Automation, DevSecOps & Cloud Monitoring',
        description: 'Building automated GitHub Actions pipelines, automated security linting, centralized logging, and cluster monitoring using Prometheus & Grafana.'
      },
      {
        module: 'Capstone Project',
        title: 'Automated Multi-Tier Cloud Deployment with Kubernetes',
        description: 'Provision cloud infrastructure using Terraform, package a microservice application into Docker containers, and deploy to Kubernetes with automated CI/CD.'
      }
    ]
  }
];
