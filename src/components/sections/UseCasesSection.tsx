
import { TabsContent, TabsList, TabsTrigger, Tabs } from "@/components/ui/tabs";
import TermBadge from "@/components/TermBadge";
import { BookOpenText, Users } from "lucide-react";

const UseCasesSection = () => {
  return (
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Perfect for Recruitment Professionals
          </h2>
          <p className="text-lg text-gray-600">
            TechLex EU is designed to meet the specific needs of recruitment agencies.
          </p>
        </div>
        
        <Tabs defaultValue="cv-screening" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-gray-100">
              <TabsTrigger value="cv-screening" className="text-sm px-4 py-2">CV Screening</TabsTrigger>
              <TabsTrigger value="interviews" className="text-sm px-4 py-2">Interviews</TabsTrigger>
              <TabsTrigger value="onboarding" className="text-sm px-4 py-2">Onboarding</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="cv-screening" className="animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="lg:order-1 order-2">
                <h3 className="text-2xl font-semibold mb-4">Efficient CV Screening</h3>
                <p className="text-gray-600 mb-4">
                  Quickly understand technical qualifications without specialized knowledge. TechLex EU helps you:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-techlex-blue mt-0.5 flex-shrink-0" />
                    <span className="ml-2">Identify key technical skills and experience</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-techlex-blue mt-0.5 flex-shrink-0" />
                    <span className="ml-2">Understand technical acronyms and specialized terminology</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-techlex-blue mt-0.5 flex-shrink-0" />
                    <span className="ml-2">Compare candidates' qualifications accurately</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-techlex-blue mt-0.5 flex-shrink-0" />
                    <span className="ml-2">Save time on manual research of technical terms</span>
                  </li>
                </ul>
              </div>
              <div className="lg:order-2 order-1 flex justify-center">
                <div className="relative w-full max-w-md hero-glass rounded-xl overflow-hidden shadow-lg">
                  <div className="p-6">
                    <div className="mb-4 flex items-center">
                      <FileIcon className="w-5 h-5 text-techlex-blue mr-2" />
                      <h4 className="font-medium">Resume_JaneDoe_Frontend.pdf</h4>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      Experienced in <TermBadge definition="A JavaScript library for building user interfaces">React</TermBadge> and <TermBadge definition="A JavaScript framework for building web applications">Angular</TermBadge>, with knowledge of <TermBadge definition="Cascading Style Sheets - Used for styling web pages">CSS</TermBadge> preprocessors like <TermBadge definition="A CSS preprocessor that adds features like variables and mixins">SASS</TermBadge>. Implemented <TermBadge definition="Progressive Web Apps - Web apps that can function like native apps">PWAs</TermBadge> and worked with <TermBadge definition="Application Programming Interface - Allows different software to communicate">APIs</TermBadge>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="interviews" className="animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Confident Technical Interviews</h3>
                <p className="text-gray-600 mb-4">
                  Conduct more effective technical interviews, even without specialized knowledge:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-techlex-blue mt-0.5 flex-shrink-0" />
                    <span className="ml-2">Prepare intelligent questions based on candidate's technical background</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-techlex-blue mt-0.5 flex-shrink-0" />
                    <span className="ml-2">Understand candidate responses during technical discussions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-techlex-blue mt-0.5 flex-shrink-0" />
                    <span className="ml-2">Assess technical competencies more accurately</span>
                  </li>
                </ul>
              </div>
              <div className="flex justify-center">
                <div className="relative w-full max-w-md hero-glass rounded-xl overflow-hidden shadow-lg">
                  <div className="p-6">
                    <div className="mb-4 flex items-center">
                      <Users className="w-5 h-5 text-techlex-blue mr-2" />
                      <h4 className="font-medium">Interview Notes</h4>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      Candidate discussed experience with <TermBadge definition="A serverless computing service that runs code in response to events">AWS Lambda</TermBadge> and <TermBadge definition="A managed database service provided by Amazon Web Services">DynamoDB</TermBadge>. They explained their approach to <TermBadge definition="Integration and deployment of software through automation">CI/CD</TermBadge> using <TermBadge definition="A tool that helps develop, ship, and run applications in containers">Docker</TermBadge> and <TermBadge definition="A platform for building, deploying, running, and managing containerized applications">Kubernetes</TermBadge>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="onboarding" className="animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="lg:order-1 order-2">
                <h3 className="text-2xl font-semibold mb-4">Streamlined Team Onboarding</h3>
                <p className="text-gray-600 mb-4">
                  Help new recruiters get up to speed quickly with technology sectors:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-techlex-blue mt-0.5 flex-shrink-0" />
                    <span className="ml-2">Create custom glossaries specific to your recruitment focus</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-techlex-blue mt-0.5 flex-shrink-0" />
                    <span className="ml-2">Build a knowledge base of industry-specific terminology</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-techlex-blue mt-0.5 flex-shrink-0" />
                    <span className="ml-2">Reduce training time for new technical recruiters</span>
                  </li>
                </ul>
              </div>
              <div className="lg:order-2 order-1 flex justify-center">
                <div className="relative w-full max-w-md hero-glass rounded-xl overflow-hidden shadow-lg">
                  <div className="p-6">
                    <div className="mb-4 flex items-center">
                      <BookOpenText className="w-5 h-5 text-techlex-blue mr-2" />
                      <h4 className="font-medium">Company Wiki</h4>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      Our tech recruitment glossary includes terms like <TermBadge definition="A programming language used for creating dynamic web pages">JavaScript</TermBadge>, <TermBadge definition="Object-Oriented Programming - A programming paradigm based on objects">OOP</TermBadge>, <TermBadge definition="DevOps - Practices that combine software development and IT operations">DevOps</TermBadge>, and <TermBadge definition="A set of principles and processes for delivering software">Agile</TermBadge>, with custom definitions specific to our clients' needs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

// Helper components for the UseCasesSection
const CheckCircleIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
};

const FileIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
};

export default UseCasesSection;
