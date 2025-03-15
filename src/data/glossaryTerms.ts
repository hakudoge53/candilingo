
import { GlossaryTerm } from '@/types/glossary';

// Sample glossary terms for development/testing purposes
export const sampleGlossaryTerms: Partial<GlossaryTerm>[] = [
  {
    term: "API",
    definition: "Application Programming Interface. A set of rules that allows one software application to interact with another.",
    category: "Technical",
    relatedTerms: ["REST", "Endpoint", "HTTP"]
  },
  {
    term: "REST",
    definition: "Representational State Transfer. An architectural style for designing networked applications.",
    category: "Technical",
    relatedTerms: ["API", "HTTP", "JSON"]
  },
  {
    term: "JSON",
    definition: "JavaScript Object Notation. A lightweight data-interchange format that is easy for humans to read and write.",
    category: "Technical",
    relatedTerms: ["API", "Data Format", "JavaScript"]
  },
  {
    term: "HTML",
    definition: "HyperText Markup Language. The standard markup language for documents designed to be displayed in a web browser.",
    category: "Web Development",
    relatedTerms: ["CSS", "JavaScript", "DOM"]
  },
  {
    term: "CSS",
    definition: "Cascading Style Sheets. A style sheet language used for describing the presentation of a document written in HTML.",
    category: "Web Development",
    relatedTerms: ["HTML", "Web Design", "Responsive Design"]
  },
  {
    term: "JavaScript",
    definition: "A programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.",
    category: "Web Development",
    relatedTerms: ["HTML", "CSS", "Node.js"]
  },
  {
    term: "UI",
    definition: "User Interface. The space where interactions between humans and machines occur.",
    category: "Design",
    relatedTerms: ["UX", "Interface", "Human-Computer Interaction"]
  },
  {
    term: "UX",
    definition: "User Experience. The overall experience of a person using a product such as a website or application.",
    category: "Design",
    relatedTerms: ["UI", "Usability", "User Research"]
  },
  {
    term: "SQL",
    definition: "Structured Query Language. A domain-specific language used in programming for managing data in relational databases.",
    category: "Database",
    relatedTerms: ["Database", "Relational Database", "Query"]
  },
  {
    term: "AWS",
    definition: "Amazon Web Services. A subsidiary of Amazon providing on-demand cloud computing platforms and APIs.",
    category: "Cloud Computing",
    relatedTerms: ["Cloud", "EC2", "S3"]
  },
  {
    term: "Git",
    definition: "A distributed version control system for tracking changes in source code during software development.",
    category: "Development Tools"
  },
  {
    term: "CI/CD",
    definition: "Continuous Integration/Continuous Deployment. A method to frequently deliver apps to customers by introducing automation.",
    category: "Development Workflow",
    relatedTerms: ["DevOps", "Automation", "Testing"]
  },
  {
    term: "Agile",
    definition: "An approach to software development that emphasizes incremental delivery, team collaboration, and continuous planning.",
    category: "Project Management",
    relatedTerms: ["Scrum", "Kanban", "Sprint"]
  },
  {
    term: "Scrum",
    definition: "A framework utilizing an agile mindset for developing, delivering, and sustaining complex products.",
    category: "Project Management",
    relatedTerms: ["Agile", "Sprint", "Product Owner"]
  },
  {
    term: "SEO",
    definition: "Search Engine Optimization. The process of improving the quality and quantity of website traffic to a website from search engines.",
    category: "Marketing",
    relatedTerms: ["Keywords", "Ranking", "Organic Traffic"]
  },
  {
    term: "SaaS",
    definition: "Software as a Service. A software licensing and delivery model in which software is centrally hosted and licensed on a subscription basis.",
    category: "Business Models",
    relatedTerms: ["Cloud Computing", "Subscription", "B2B"]
  }
];

// Export a function to create fully-formed GlossaryTerms with all required fields
export function createFullGlossaryTerm(partial: Partial<GlossaryTerm>, glossaryId: string): GlossaryTerm {
  return {
    id: Math.random().toString(36).substring(2, 11),
    glossary_id: glossaryId,
    term: partial.term || '',
    definition: partial.definition || '',
    category: partial.category,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    relatedTerms: partial.relatedTerms,
    url: partial.url
  };
}
