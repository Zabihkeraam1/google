import type { NavItem, Project, SkillCategory, SocialLink } from '@/types';
import { Linkedin, Github, Twitter, Code2, Database, Server, Cloud, TerminalSquare, GitFork, BrainCircuit, LineChart, Bot, ExternalLink, Workflow, Palette, Sparkles } from 'lucide-react';

export const SITE_NAME = 'Versafolio';
export const SITE_TITLE = `${SITE_NAME} | Full Stack, DevOps & AI Analyst`;
export const SITE_DESCRIPTION = 'Personal portfolio showcasing expertise in Full Stack Development, DevOps, and AI Analytics.';
export const YOUR_NAME = "Your Name"; // Replace with your actual name
export const YOUR_JOB_TITLE = "Full Stack Developer, DevOps Engineer & AI Analyst";

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'LinkedIn', url: 'https://linkedin.com/in/yourprofile', icon: Linkedin },
  { name: 'GitHub', url: 'https://github.com/yourusername', icon: Github },
  { name: 'Twitter', url: 'https://twitter.com/yourusername', icon: Twitter },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Full Stack Development',
    skills: [
      { name: 'JavaScript / TypeScript', icon: Code2, level: 'Advanced' },
      { name: 'React / Next.js', icon: Code2, level: 'Advanced' },
      { name: 'Node.js / Express', icon: Server, level: 'Advanced' },
      { name: 'Python / Django', icon: Code2, level: 'Intermediate' },
      { name: 'SQL / NoSQL Databases', icon: Database, level: 'Proficient' },
      { name: 'REST APIs / GraphQL', icon: GitFork, level: 'Proficient' },
    ],
  },
  {
    title: 'DevOps Engineering',
    skills: [
      { name: 'Docker / Kubernetes', icon: Cloud, level: 'Proficient' },
      { name: 'CI/CD Pipelines (GitHub Actions, Jenkins)', icon: Workflow, level: 'Advanced' },
      { name: 'AWS / GCP / Azure', icon: Cloud, level: 'Intermediate' },
      { name: 'Terraform / Ansible', icon: TerminalSquare, level: 'Intermediate' },
      { name: 'Monitoring & Logging (Prometheus, ELK)', icon: LineChart, level: 'Proficient' },
    ],
  },
  {
    title: 'AI & Data Analytics',
    skills: [
      { name: 'Machine Learning (Scikit-learn, TensorFlow)', icon: BrainCircuit, level: 'Proficient' },
      { name: 'Data Analysis (Pandas, NumPy)', icon: LineChart, level: 'Advanced' },
      { name: 'Data Visualization (Matplotlib, Seaborn, Recharts)', icon: Palette, level: 'Proficient' },
      { name: 'Natural Language Processing (NLP)', icon: Bot, level: 'Intermediate' },
      { name: 'GenAI Prompt Engineering', icon: Sparkles, level: 'Proficient' },
    ],
  },
];

export const PROJECTS_DATA: Project[] = [
  {
    id: '1',
    title: 'AI-Powered E-commerce Platform',
    description: 'A modern e-commerce solution with personalized recommendations and smart search features.',
    longDescription: 'Developed a full-stack e-commerce platform using Next.js, Node.js, and PostgreSQL. Integrated AI models for personalized product recommendations, sentiment analysis of reviews, and a chatbot for customer support. Implemented secure payment gateways and an admin dashboard for inventory management.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'ecommerce platform',
    tags: ['Full Stack', 'AI', 'Next.js', 'Node.js', 'PostgreSQL'],
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    id: '2',
    title: 'Automated CI/CD Pipeline for Microservices',
    description: 'Designed and implemented a robust CI/CD pipeline for a microservices architecture.',
    longDescription: 'Leveraged Kubernetes, Docker, and GitHub Actions to create a fully automated CI/CD pipeline. This system handled automated testing, building, and deployment of multiple microservices, significantly reducing deployment time and improving reliability. Implemented blue/green deployments and canary releases.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'server infrastructure',
    tags: ['DevOps', 'Kubernetes', 'Docker', 'CI/CD'],
    repoUrl: '#',
  },
  {
    id: '3',
    title: 'Customer Churn Prediction Dashboard',
    description: 'An analytics dashboard predicting customer churn using machine learning models.',
    longDescription: 'Built an interactive dashboard using Python (Flask/Django) and React to visualize customer churn predictions. Developed machine learning models using Scikit-learn to identify at-risk customers. The dashboard provided actionable insights for retention strategies, leading to a 15% reduction in churn.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'data dashboard',
    tags: ['AI', 'Data Analytics', 'Python', 'React', 'Machine Learning'],
    liveUrl: '#',
  },
  {
    id: '4',
    title: 'Cloud Cost Optimization Tool',
    description: 'A tool for analyzing and optimizing cloud infrastructure costs on AWS.',
    longDescription: 'Developed a Python-based tool that interfaces with AWS APIs to analyze resource usage and identify cost-saving opportunities. Presented findings in a user-friendly dashboard, helping organizations reduce their cloud spend by up to 20%.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'cloud optimization',
    tags: ['DevOps', 'AI', 'Python', 'AWS'],
  },
];

export const CONTACT_EMAIL = 'your.email@example.com'; // Replace with your email
