
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from 'sonner';

// Import custom components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TermBadge from "@/components/TermBadge";
import FeatureCard from "@/components/FeatureCard";
import HeroImageSection from "@/components/HeroImageSection";
import PricingCard from "@/components/PricingCard";
import TestimonialCard from "@/components/TestimonialCard";

// Import icons
import {
  BookOpenText,
  BrainCircuit,
  Code,
  Database,
  FileText,
  HelpCircle,
  Languages,
  Search,
  Settings,
  UploadCloud,
  Users,
  Zap,
  BookOpen,
  GraduationCap,
  MessageCircleQuestion,
} from "lucide-react";

const Index = () => {
  const [email, setEmail] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleEarlyAccessRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    
    toast.success('Thank you for your interest! We\'ll be in touch soon.');
    setEmail('');
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="lg:pr-10 animate-fade-in">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-techlex-blue bg-opacity-10 text-techlex-blue rounded-full text-sm font-medium">
                  Early Access
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                  Browser Extension
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Decode Technical Jargon with <span className="text-techlex-blue">TechLex EU</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                Instantly understand tech and business terminology in CVs, PDFs, and web content. Perfect for recruitment agencies to streamline candidate evaluation.
              </p>
              <form onSubmit={handleEarlyAccessRequest} className="flex flex-col sm:flex-row gap-3 mb-6">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-primary"
                />
                <Button type="submit" className="btn-primary whitespace-nowrap">
                  Request Early Access
                </Button>
              </form>
            </div>
            
            <div className="lg:pl-10 animate-fade-in-slow">
              <HeroImageSection />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Simplify Technical Recruitment
            </h2>
            <p className="text-lg text-gray-600">
              TechLex EU empowers recruitment professionals to understand and evaluate technical candidates with confidence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <FeatureCard
              title="Instant Term Recognition"
              description="Automatically identifies and explains technical terms in CVs, cover letters, and online job applications."
              icon={<Search className="w-6 h-6" />}
              className="animate-fade-in"
            />
            <FeatureCard
              title="Custom Glossaries"
              description="Create industry or company-specific term repositories to onboard new team members and standardize knowledge."
              icon={<BookOpenText className="w-6 h-6" />}
              className="animate-fade-in-slow"
            />
            <FeatureCard
              title="PDF & Document Support"
              description="Works seamlessly with uploaded PDFs, online documents, and web content for complete coverage."
              icon={<FileText className="w-6 h-6" />}
              className="animate-fade-in-slower"
            />
            <FeatureCard
              title="AI-Powered Explanations"
              description="Advanced AI provides accurate, contextual explanations of complex technical concepts."
              icon={<BrainCircuit className="w-6 h-6" />}
              className="animate-fade-in"
            />
            <FeatureCard
              title="Multilingual Support"
              description="Understand technical terminology across multiple European languages for international recruitment."
              icon={<Languages className="w-6 h-6" />}
              className="animate-fade-in-slow"
            />
            <FeatureCard
              title="One-Click Integration"
              description="Easy browser extension installation with no complicated setup or configuration required."
              icon={<Zap className="w-6 h-6" />}
              className="animate-fade-in-slower"
            />
            <FeatureCard
              title="Company Wiki"
              description="Build and maintain a centralized knowledge base of company-specific terminology, processes, and best practices."
              icon={<BookOpen className="w-6 h-6" />}
              className="animate-fade-in"
            />
            <FeatureCard
              title="On-the-Job Learning"
              description="Facilitate continuous learning with contextual explanations of technical concepts as employees encounter them in their work."
              icon={<GraduationCap className="w-6 h-6" />}
              className="animate-fade-in-slow"
            />
            <FeatureCard
              title="Great Questions Generator"
              description="Generate intelligent, context-aware questions for technical interviews based on candidate CVs and job descriptions."
              icon={<MessageCircleQuestion className="w-6 h-6" />}
              className="animate-fade-in-slower"
            />
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section id="how-it-works" className="section-padding bg-white border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              How TechLex EU Works
            </h2>
            <p className="text-lg text-gray-600">
              Our intuitive browser extension seamlessly integrates with your workflow.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl text-center border border-gray-100 animate-fade-in">
              <div className="w-16 h-16 mx-auto bg-techlex-blue bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <UploadCloud className="w-8 h-8 text-techlex-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Install & Activate</h3>
              <p className="text-gray-600">
                Add the TechLex EU extension to your browser and activate it with your account credentials.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl text-center border border-gray-100 animate-fade-in-slow">
              <div className="w-16 h-16 mx-auto bg-techlex-blue bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-techlex-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Browse & Analyze</h3>
              <p className="text-gray-600">
                Open CVs, PDFs, or web pages with technical content, and TechLex automatically identifies technical terms.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl text-center border border-gray-100 animate-fade-in-slower">
              <div className="w-16 h-16 mx-auto bg-techlex-blue bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <Database className="w-8 h-8 text-techlex-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Customize & Learn</h3>
              <p className="text-gray-600">
                Create custom glossaries for your team and continuously improve your technical knowledge.
              </p>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <Button className="btn-primary">
              See TechLex in Action
            </Button>
          </div>
        </div>
      </section>
      
      {/* Use Cases Section */}
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
      
      {/* Testimonials Section */}
      <section className="section-padding bg-white border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              What Recruitment Professionals Say
            </h2>
            <p className="text-lg text-gray-600">
              TechLex EU is transforming how recruitment agencies evaluate technical candidates.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="TechLex has completely transformed how our non-technical recruiters handle IT positions. The ability to understand complex technical terminology instantly has increased our placement rates by 30%."
              author="Marie Dubois"
              role="Technical Recruitment Manager"
              company="TechStaff Paris"
              className="animate-fade-in"
            />
            <TestimonialCard
              quote="As someone who came from a non-technical background, TechLex has been invaluable. I can now confidently discuss technical requirements with clients and understand candidate qualifications."
              author="Jan Kowalski"
              role="Senior Recruiter"
              company="IT Talents Berlin"
              className="animate-fade-in-slow"
            />
            <TestimonialCard
              quote="The custom glossary feature has become an essential part of our onboarding process. New team members get up to speed much faster, and we maintain consistency in our technical understanding."
              author="Sofia Bergmann"
              role="HR Director"
              company="Nordic Recruitment"
              className="animate-fade-in-slower"
            />
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section id="pricing" className="section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-gray-600">
              Choose the plan that fits your recruitment team's needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard
              name="Starter"
              price="€29"
              description="Perfect for individual recruiters or small teams"
              features={[
                { text: "Unlimited term definitions", included: true },
                { text: "PDF & web page support", included: true },
                { text: "Basic term highlighting", included: true },
                { text: "Single language support", included: true },
                { text: "Custom glossaries (1)", included: true },
                { text: "Team sharing features", included: false },
                { text: "API access", included: false },
              ]}
              ctaText="Start Free Trial"
              className="animate-fade-in"
            />
            <PricingCard
              name="Professional"
              price="€79"
              description="Ideal for growing recruitment agencies"
              features={[
                { text: "Unlimited term definitions", included: true },
                { text: "PDF & web page support", included: true },
                { text: "Advanced term highlighting", included: true },
                { text: "Multi-language support", included: true },
                { text: "Custom glossaries (5)", included: true },
                { text: "Team sharing features", included: true },
                { text: "API access", included: false },
              ]}
              popular={true}
              ctaText="Start Free Trial"
              className="animate-fade-in-slow"
            />
            <PricingCard
              name="Enterprise"
              price="Custom"
              description="For large agencies with advanced needs"
              features={[
                { text: "Unlimited term definitions", included: true },
                { text: "PDF & web page support", included: true },
                { text: "Advanced term highlighting", included: true },
                { text: "Multi-language support", included: true },
                { text: "Unlimited custom glossaries", included: true },
                { text: "Team sharing & admin features", included: true },
                { text: "API access & integrations", included: true },
              ]}
              ctaText="Contact Sales"
              className="animate-fade-in-slower"
            />
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about TechLex EU
            </p>
          </div>
          
          <div className="space-y-6 glossary-fade-in">
            <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
              <h3 className="font-semibold text-xl mb-2">How does the browser extension work?</h3>
              <p className="text-gray-600">
                TechLex EU integrates with your browser and automatically identifies technical terms on web pages, PDFs, and other documents. It highlights these terms and provides instant definitions when you hover over them.
              </p>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
              <h3 className="font-semibold text-xl mb-2">Can I create custom terminology definitions?</h3>
              <p className="text-gray-600">
                Yes! You can create custom glossaries with your own definitions and explanations. This is perfect for company-specific terminology or for focusing on particular technology sectors.
              </p>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
              <h3 className="font-semibold text-xl mb-2">Which browsers are supported?</h3>
              <p className="text-gray-600">
                TechLex EU works with all major browsers including Chrome, Firefox, Safari, and Edge. The extension offers the same features and functionality across all supported browsers.
              </p>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
              <h3 className="font-semibold text-xl mb-2">Is my data secure?</h3>
              <p className="text-gray-600">
                Yes, we take data security very seriously. The extension processes documents locally on your device whenever possible. Any data sent to our servers is encrypted and we never store the actual content of your documents or web pages.
              </p>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
              <h3 className="font-semibold text-xl mb-2">How can I get early access?</h3>
              <p className="text-gray-600">
                You can request early access by signing up with your email on our website. Early access users will receive exclusive benefits, including extended free trial periods and priority support.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section id="contact" className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-techlex-blue opacity-10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-techlex-lightblue opacity-10 rounded-full blur-3xl"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10">
              <div>
                <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Technical Recruitment?</h2>
                <p className="text-gray-600 mb-6">
                  Join our early access program and be among the first to experience TechLex EU. Early adopters receive exclusive benefits and help shape the future of the product.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-techlex-blue mt-0.5 flex-shrink-0" />
                    <span className="ml-2">Extended free trial period</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-techlex-blue mt-0.5 flex-shrink-0" />
                    <span className="ml-2">Priority customer support</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-techlex-blue mt-0.5 flex-shrink-0" />
                    <span className="ml-2">Influence future features</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <h3 className="font-semibold text-xl mb-4">Request Early Access</h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <Input id="name" placeholder="John Smith" className="input-primary" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Work Email
                    </label>
                    <Input id="email" type="email" placeholder="john@company.com" className="input-primary" />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name
                    </label>
                    <Input id="company" placeholder="Your Company" className="input-primary" />
                  </div>
                  <div>
                    <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
                      Team Size
                    </label>
                    <select id="size" className="input-primary">
                      <option value="">Select team size</option>
                      <option value="1-5">1-5 employees</option>
                      <option value="6-20">6-20 employees</option>
                      <option value="21-50">21-50 employees</option>
                      <option value="51+">51+ employees</option>
                    </select>
                  </div>
                  <Button className="btn-primary w-full">
                    Submit Request
                  </Button>
                  <p className="text-xs text-gray-500 text-center mt-4">
                    By submitting, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

// Helper component for check icons
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

// Helper component for file icon
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

export default Index;
