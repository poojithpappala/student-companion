
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

export const salaryByCareer: Record<string, { name: string, salary: number }[]> = {
  swe: [
    { name: 'Entry', salary: 95000 },
    { name: 'Mid', salary: 140000 },
    { name: 'Senior', salary: 210000 },
  ],
  'data-science': [
    { name: 'Entry', salary: 100000 },
    { name: 'Mid', salary: 155000 },
    { name: 'Senior', salary: 220000 },
  ],
  biotech: [
    { name: 'Entry', salary: 70000 },
    { name: 'Mid', salary: 110000 },
    { name: 'Senior', salary: 160000 },
  ],
  finance: [
    { name: 'Entry', salary: 80000 },
    { name: 'Mid', salary: 130000 },
    { name: 'Senior', salary: 190000 },
  ],
  design: [
    { name: 'Entry', salary: 75000 },
    { name: 'Mid', salary: 115000 },
    { name: 'Senior', salary: 170000 },
  ],
  marketing: [
    { name: 'Entry', salary: 65000 },
    { name: 'Mid', salary: 95000 },
    { name: 'Senior', salary: 140000 },
  ],
  healthcare: [
    { name: 'Entry', salary: 75000 },
    { name: 'Mid', salary: 98000 },
    { name: 'Senior', salary: 130000 },
  ],
  law: [
    { name: 'Entry', salary: 120000 },
    { name: 'Mid', salary: 180000 },
    { name: 'Senior', salary: 250000 },
  ],
};

export const growthByCareer: Record<string, { year: string, growth: number }[]> = {
  swe: [
    { year: '2025', growth: 22 },
    { year: '2026', growth: 25 },
    { year: '2027', growth: 28 },
    { year: '2028', growth: 30 },
  ],
  'data-science': [
    { year: '2025', growth: 30 },
    { year: '2026', growth: 32 },
    { year: '2027', growth: 35 },
    { year: '2028', growth: 36 },
  ],
  biotech: [
    { year: '2025', growth: 10 },
    { year: '2026', growth: 12 },
    { year: '2027', growth: 14 },
    { year: '2028', growth: 15 },
  ],
  finance: [
    { year: '2025', growth: 8 },
    { year: '2026', growth: 9 },
    { year: '2027', growth: 10 },
    { year: '2028', growth: 11 },
  ],
  design: [
    { year: '2025', growth: 15 },
    { year: '2026', growth: 16 },
    { year: '2027', growth: 18 },
    { year: '2028', growth: 20 },
  ],
  marketing: [
    { year: '2025', growth: 12 },
    { year: '2026', growth: 14 },
    { year: '2027', growth: 15 },
    { year: '2028', growth: 16 },
  ],
  healthcare: [
    { year: '2025', growth: 9 },
    { year: '2026', growth: 10 },
    { year: '2027', growth: 11 },
    { year: '2028', growth: 12 },
  ],
  law: [
    { year: '2025', growth: 5 },
    { year: '2026', growth: 6 },
    { year: '2027', growth: 7 },
    { year: '2028', growth: 8 },
  ],
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
