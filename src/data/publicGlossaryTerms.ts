
import { GlossaryTerm } from '@/types/glossary';

export const publicGlossaryTerms: GlossaryTerm[] = [
  {
    id: '1',
    glossary_id: 'public-tech',
    term: 'API',
    definition: 'Application Programming Interface - A set of rules that allow programs to talk to each other.',
    category: 'Software Development',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    relatedTerms: ['REST', 'JSON', 'GraphQL']
  },
  {
    id: '2',
    glossary_id: 'public-tech',
    term: 'REST',
    definition: 'Representational State Transfer - A software architectural style that defines a set of constraints for creating web services.',
    category: 'Software Development',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    relatedTerms: ['API', 'HTTP', 'JSON']
  },
  {
    id: '3',
    glossary_id: 'public-tech',
    term: 'JSON',
    definition: 'JavaScript Object Notation - A lightweight data interchange format that is easy for humans to read and write and easy for machines to parse and generate.',
    category: 'Data Formats',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    relatedTerms: ['API', 'REST', 'XML']
  },
  {
    id: '4',
    glossary_id: 'public-tech',
    term: 'UI',
    definition: 'User Interface - The space where interactions between humans and machines occur.',
    category: 'UX/UI Design',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    relatedTerms: ['UX', 'Frontend', 'Design']
  },
  {
    id: '5',
    glossary_id: 'public-tech',
    term: 'UX',
    definition: 'User Experience - The overall experience of a person using a product such as a website or application, especially in terms of how easy or pleasing it is to use.',
    category: 'UX/UI Design',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    relatedTerms: ['UI', 'Design Thinking', 'Usability']
  },
  {
    id: '6',
    glossary_id: 'public-tech',
    term: 'SQL',
    definition: 'Structured Query Language - A domain-specific language used for managing data in relational database management systems.',
    category: 'Databases',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    relatedTerms: ['Database', 'RDBMS', 'Query']
  },
  {
    id: '7',
    glossary_id: 'public-tech',
    term: 'NoSQL',
    definition: 'Not Only SQL - A database design approach that provides a mechanism for storage and retrieval of data that is modeled in means other than the tabular relations used in relational databases.',
    category: 'Databases',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    relatedTerms: ['MongoDB', 'Document Database', 'Key-Value Store']
  },
  {
    id: '8',
    glossary_id: 'public-tech',
    term: 'Git',
    definition: 'A distributed version control system for tracking changes in source code during software development.',
    category: 'Development Tools',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    relatedTerms: ['GitHub', 'Version Control', 'Repository']
  },
  {
    id: '9',
    glossary_id: 'public-tech',
    term: 'Docker',
    definition: 'A platform for developing, shipping, and running applications in containers.',
    category: 'DevOps',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    relatedTerms: ['Container', 'Kubernetes', 'Microservices']
  },
  {
    id: '10',
    glossary_id: 'public-tech',
    term: 'CI/CD',
    definition: 'Continuous Integration and Continuous Deployment - A software development practice where code changes are automatically built, tested, and prepared for deployment.',
    category: 'DevOps',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    relatedTerms: ['Automation', 'Pipeline', 'Testing']
  },
  {
    id: '11',
    glossary_id: 'public-ai',
    term: 'Machine Learning',
    definition: 'A subset of artificial intelligence that provides systems the ability to automatically learn and improve from experience without being explicitly programmed.',
    category: 'Artificial Intelligence',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    relatedTerms: ['AI', 'Neural Network', 'Deep Learning']
  },
  {
    id: '12',
    glossary_id: 'public-ai',
    term: 'Neural Network',
    definition: 'A computational model inspired by the human brain, consisting of layers of interconnected nodes or "neurons" that process data and learn patterns.',
    category: 'Artificial Intelligence',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    relatedTerms: ['Deep Learning', 'Machine Learning', 'AI']
  }
];

export const publicGlossaries = [
  {
    id: 'public-tech',
    name: 'Technical Dictionary',
    description: 'Common technical terms for software development and technology',
    is_public: true
  },
  {
    id: 'public-ai',
    name: 'AI Glossary',
    description: 'Artificial intelligence and machine learning terminology',
    is_public: true
  }
];
