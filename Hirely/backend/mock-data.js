// Mock Data - Replace with database later
import { v4 as uuidv4 } from 'uuid';

// In-memory storage for MVP (reset on server restart)
let users = [
  {
    id: 'user-1',
    email: 'ahmed@example.com',
    password: 'password123', // Mock - never do this in production
    name: 'Ahmed Hassan',
    role: 'student',
    profile: {
      education: 'Cairo University - Computer Science',
      skills: ['JavaScript', 'React', 'Node.js'],
      projects: [
        { title: 'E-commerce Platform', description: 'Built with React and Firebase' }
      ],
      cvFilename: 'ahmed-cv.pdf',
      location: 'Cairo'
    }
  },
  {
    id: 'user-2',
    email: 'fatima@example.com',
    password: 'password123',
    name: 'Fatima Mohamed',
    role: 'student',
    profile: {
      education: 'AUC - Business Administration',
      skills: ['Marketing', 'Data Analysis', 'Excel'],
      projects: [
        { title: 'Market Research Tool', description: 'Analyzed market trends for startups' }
      ],
      cvFilename: 'fatima-cv.pdf',
      location: 'New Cairo'
    }
  },
  {
    id: 'user-3',
    email: 'startup@example.com',
    password: 'password123',
    name: 'TechStartup Inc',
    role: 'employer',
    profile: {
      companyName: 'TechStartup Inc',
      description: 'Innovative tech startup based in Cairo',
      location: 'Cairo'
    }
  }
];

let jobs = [
  {
    id: 'job-1',
    employerId: 'user-3',
    title: 'Junior Frontend Developer',
    type: 'internship',
    field: 'Technology',
    location: 'Cairo',
    description: 'Build responsive web interfaces using React and modern JavaScript.',
    requirements: ['React', 'JavaScript', 'CSS'],
    salary: '2000-3000 EGP',
    createdAt: new Date('2024-04-01')
  },
  {
    id: 'job-2',
    employerId: 'user-3',
    title: 'Content Marketing Intern',
    type: 'internship',
    field: 'Marketing',
    location: 'New Cairo',
    description: 'Create engaging content for our digital platforms.',
    requirements: ['Content Writing', 'SEO', 'Social Media'],
    salary: '1500-2000 EGP',
    createdAt: new Date('2024-04-02')
  },
  {
    id: 'job-3',
    employerId: 'user-3',
    title: 'Data Analytics Intern',
    type: 'entry-level',
    field: 'Technology',
    location: 'Cairo',
    description: 'Analyze business data and create dashboards.',
    requirements: ['Excel', 'SQL', 'Data Visualization'],
    salary: '2500-3500 EGP',
    createdAt: new Date('2024-04-03')
  },
  {
    id: 'job-4',
    employerId: 'user-3',
    title: 'Business Development Intern',
    type: 'internship',
    field: 'Business',
    location: 'Giza',
    description: 'Support business growth initiatives and partner outreach.',
    requirements: ['Communication', 'Sales', 'CRM'],
    salary: '1800-2500 EGP',
    createdAt: new Date('2024-04-04')
  },
  {
    id: 'job-5',
    employerId: 'user-3',
    title: 'UI/UX Design Intern',
    type: 'internship',
    field: 'Design',
    location: 'Cairo',
    description: 'Design user interfaces and improve user experiences.',
    requirements: ['Figma', 'UI Design', 'Prototyping'],
    salary: '2000-2800 EGP',
    createdAt: new Date('2024-04-05')
  },
  {
    id: 'job-6',
    employerId: 'user-3',
    title: 'Backend Developer',
    type: 'entry-level',
    field: 'Technology',
    location: 'Cairo',
    description: 'Develop APIs and server-side applications.',
    requirements: ['Node.js', 'Express', 'MongoDB'],
    salary: '3000-4000 EGP',
    createdAt: new Date('2024-04-06')
  }
];

// Shared skills list
const sharedSkills = [
  'JavaScript',
  'React',
  'Node.js',
  'Python',
  'Data Analysis',
  'Excel',
  'SQL',
  'UI Design',
  'Marketing',
  'Communication',
  'Project Management',
  'Content Writing',
  'SEO',
  'Express.js',
  'MongoDB',
  'HTML/CSS',
  'Git',
  'REST APIs',
  'Figma',
  'Adobe XD'
];

export { users, jobs, sharedSkills };
