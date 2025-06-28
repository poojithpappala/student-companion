import { AreaChart, Dna, Code, Landmark, PenTool, Mic, HeartPulse, Scale } from 'lucide-react';

export const careers = [
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
    { name: 'SAT', eligibility: 'High School', deadline: 'Varies', link: '#', area: 'General (US)' },
    { name: 'ACT', eligibility: 'High School', deadline: 'Varies', link: '#', area: 'General (US)' },
    { name: 'JEE Main', eligibility: '12th Grade (Science)', deadline: 'Jan/Apr', link: '#', area: 'Engineering (India)' },
    { name: 'NEET', eligibility: '12th Grade (Biology)', deadline: 'May', link: '#', area: 'Medical (India)' },
    { name: 'CLAT', eligibility: '12th Grade', deadline: 'Dec', link: '#', area: 'Law (India)' },
]
