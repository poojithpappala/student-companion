
import { AreaChart, Dna, Code, Landmark, PenTool, Mic, HeartPulse, Scale, TrendingUp, FileText, Target, MessageSquare, LucideIcon, Building2 } from 'lucide-react';
import type { ComponentType } from 'react';

type Career = {
  id: string;
  name: string;
  degree: string;
  icon: ComponentType<{ className?: string }>;
};

export const careers: Career[] = [
  { id: 'swe', name: 'Software Engineering', degree: 'B.Sc. Computer Science', icon: Code },
  { id: 'data-science', name: 'Data Science', degree: 'B.Sc. Data Science', icon: AreaChart },
  { id: 'biotech', name: 'Biotechnology', degree: 'B.Tech Biotechnology', icon: Dna },
  { id: 'finance', name: 'Finance', degree: 'B.Com / BBA', icon: Landmark },
  { id: 'design', name: 'UX/UI Design', degree: 'B.Des', icon: PenTool },
  { id: 'marketing', name: 'Digital Marketing', degree: 'BBA Marketing', icon: Mic },
  { id: 'healthcare', name: 'Healthcare Mgmt', degree: 'B.Sc. Nursing', icon: HeartPulse },
  { id: 'law', name: 'Corporate Law', degree: 'LLB', icon: Scale },
];

export const skillsByCareer: Record<string, string[]> = {
  swe: ['Data Structures & Algorithms', 'Version Control (Git)', 'Problem Solving', 'Web Development Basics', 'Object-Oriented Programming'],
  'data-science': ['Statistics & Probability', 'Python/R Programming', 'Data Visualization', 'SQL Databases', 'Machine Learning Concepts'],
  biotech: ['Molecular Biology', 'Lab Techniques', 'Bioinformatics', 'Genetics', 'Organic Chemistry'],
  finance: ['Financial Accounting', 'Economics', 'Microsoft Excel', 'Quantitative Analysis', 'Business Communication'],
  design: ['Design Principles', 'Figma/Sketch', 'User Research', 'Wireframing', 'Visual Communication'],
  marketing: ['SEO/SEM Basics', 'Content Creation', 'Social Media Platforms', 'Data Analysis', 'Communication Skills'],
  healthcare: ['Anatomy & Physiology', 'Patient Care', 'Medical Terminology', 'Pharmacology', 'Ethics in Healthcare'],
  law: ['Legal Research', 'Logical Reasoning', 'Constitutional Law', 'Contract Law', 'Critical Thinking'],
};

export const entranceExams = [
    { name: 'SAT', eligibility: 'High School', deadline: 'Varies', link: '#', area: 'General (US)', grades: ['10th', '11th', '12th'] },
    { name: 'ACT', eligibility: 'High School', deadline: 'Varies', link: '#', area: 'General (US)', grades: ['10th', '11th', '12th'] },
    { name: 'PSAT/NMSQT', eligibility: '10th/11th Grade', deadline: 'October', link: '#', area: 'Pre-SAT (US)', grades: ['10th', '11th'] },
    { name: 'JEE Main', eligibility: '12th Grade (Science)', deadline: 'Jan/Apr', link: '#', area: 'Engineering (India)', grades: ['11th', '12th'] },
    { name: 'NEET', eligibility: '12th Grade (Biology)', deadline: 'May', link: '#', area: 'Medical (India)', grades: ['11th', '12th'] },
    { name: 'CLAT', eligibility: '12th Grade', deadline: 'December', link: '#', area: 'Law (India)', grades: ['11th', '12th'] },
]

// DYNAMIC DATA FOR 'DURING' DASHBOARD
export const defaultProjectIdeas = [
  { title: 'Personal Portfolio Website', tags: ['Web Dev', 'React', 'Beginner'], icon: 'FileText' },
  { title: 'Task Management App', tags: ['Full-stack', 'Node.js', 'Intermediate'], icon: 'Target' },
  { title: 'AI Chatbot for a Niche', tags: ['AI/ML', 'Python', 'Advanced'], icon: 'MessageSquare' },
];

export const projectIdeasByCareer: Record<string, typeof defaultProjectIdeas> = {
  swe: [
    { title: 'Full-stack E-commerce Site', tags: ['Web Dev', 'React', 'Node.js'], icon: 'FileText' },
    { title: 'Real-time Chat Application', tags: ['Web Sockets', 'Express', 'Intermediate'], icon: 'MessageSquare' },
    { title: 'API for a Social Media App', tags: ['Backend', 'REST API', 'Advanced'], icon: 'Target' },
  ],
  'data-science': [
    { title: 'Sentiment Analysis of Twitter Data', tags: ['NLP', 'Python', 'Beginner'], icon: 'FileText' },
    { title: 'Stock Price Prediction Model', tags: ['ML', 'Pandas', 'Intermediate'], icon: 'Target' },
    { title: 'Customer Churn Prediction', tags: ['Classification', 'Scikit-learn', 'Advanced'], icon: 'MessageSquare' },
  ],
};

// DYNAMIC DATA FOR 'AFTER' DASHBOARD
export const defaultGrowthPlans = [
  { title: 'Advanced Cloud Computing', provider: 'Coursera', duration: '3 months', icon: 'TrendingUp' },
  { title: 'AI for Project Managers', provider: 'edX', duration: '6 weeks', icon: 'TrendingUp' },
  { title: 'Cybersecurity Specialization', provider: 'Udacity', duration: '4 months', icon: 'TrendingUp' },
];

export const growthPlansByCareer: Record<string, typeof defaultGrowthPlans> = {
  swe: [
    { title: 'Advanced Kubernetes', provider: 'Linux Foundation', duration: '4 months', icon: 'TrendingUp' },
    { title: 'System Design Interview Prep', provider: 'Educative', duration: '8 weeks', icon: 'TrendingUp' },
    { title: 'WebAssembly Fundamentals', provider: 'Frontend Masters', duration: '6 weeks', icon: 'TrendingUp' },
  ],
  'data-science': [
    { title: 'Deep Learning Specialization', provider: 'Coursera', duration: '4 months', icon: 'TrendingUp' },
    { title: 'Big Data with Spark', provider: 'edX', duration: '10 weeks', icon: 'TrendingUp' },
    { title: 'MLOps Specialization', provider: 'Udacity', duration: '5 months', icon: 'TrendingUp' },
  ],
};
