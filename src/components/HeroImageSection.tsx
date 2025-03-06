
import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroImageSectionProps {
  className?: string;
}

const HeroImageSection = ({ className }: HeroImageSectionProps) => {
  const [loaded, setLoaded] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = 2;

  useEffect(() => {
    // Simulate image loading
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const goToNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % totalSlides);
  };

  const goToPrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className={cn(
      "relative w-full h-full flex items-center justify-center",
      className
    )}>
      {/* Browser window mockup */}
      <div className="relative w-full max-w-2xl hero-glass rounded-xl overflow-hidden shadow-2xl transition-all duration-700 transform">
        {/* Browser header */}
        <div className="bg-gray-100 px-4 py-2 flex items-center border-b border-gray-200">
          <div className="flex space-x-2 mr-4">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-gray-500 flex items-center">
            <svg className="w-3.5 h-3.5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
            resume-review.example.com
          </div>
        </div>

        {/* Browser content with slide deck */}
        <div className="bg-white p-6 relative">
          <div className={cn(
            "transition-opacity duration-1000",
            loaded ? "opacity-100" : "opacity-0"
          )}>
            {/* Slide 1: Developer CV */}
            <div className={`${activeSlide === 0 ? 'block' : 'hidden'}`}>
              <h2 className="text-xl font-bold mb-4">Developer CV</h2>
              <div className="space-y-4 text-gray-700 text-sm">
                <div className="space-y-1">
                  <h3 className="font-semibold text-base">John Developer</h3>
                  <p className="text-gray-500">Senior Software Engineer</p>
                  <p className="text-gray-500">john.dev@example.com | (123) 456-7890</p>
                </div>
                
                <div>
                  <h4 className="font-medium">Skills</h4>
                  <p className="leading-relaxed">
                    <span className="tech-term mx-1" title="JavaScript is a programming language used to create interactive effects within web browsers">JavaScript</span>, 
                    <span className="tech-term mx-1" title="TypeScript is a strict syntactical superset of JavaScript that adds static typing">TypeScript</span>, 
                    <span className="tech-term mx-1" title="Java Enterprise Edition - A platform for server-side application development">Java EE</span>, 
                    <span className="tech-term mx-1" title="Spring Boot is an open source Java-based framework used to create microservices">Spring Boot</span>, 
                    <span className="tech-term mx-1" title="A popular JavaScript library for building user interfaces">React</span>, 
                    <span className="tech-term mx-1" title="A JavaScript framework for building web applications">Vue.js</span>, 
                    <span className="tech-term mx-1" title="Representational State Transfer - An architectural style for designing networked applications">RESTful APIs</span>, 
                    <span className="tech-term mx-1" title="An open source SQL database management system">PostgreSQL</span>,
                    <span className="tech-term mx-1" title="A NoSQL document database">MongoDB</span>
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium">Experience</h4>
                  <div className="ml-2 mb-2">
                    <p className="font-medium">Senior Developer, TechCorp</p>
                    <p className="text-xs text-gray-500">2019 - Present</p>
                    <p className="text-xs mt-1">
                      Led development of microservices using 
                      <span className="tech-term mx-1" title="Spring Boot is an open source Java-based framework used to create microservices">Spring Boot</span> 
                      and 
                      <span className="tech-term mx-1" title="Continuous Integration and Continuous Deployment - Practices that enable frequent code changes to be automatically tested and deployed">CI/CD</span> 
                      pipelines with 
                      <span className="tech-term mx-1" title="An open source tool for creating lightweight, portable virtualized application containers">Docker</span> 
                      and 
                      <span className="tech-term mx-1" title="A container orchestration system for automating deployment and management">Kubernetes</span>.
                    </p>
                  </div>
                  <div className="ml-2">
                    <p className="font-medium">Full Stack Developer, WebSolutions</p>
                    <p className="text-xs text-gray-500">2016 - 2019</p>
                    <p className="text-xs mt-1">
                      Built 
                      <span className="tech-term mx-1" title="Single Page Applications - Web apps that load a single HTML page and dynamically update content">SPAs</span> 
                      with 
                      <span className="tech-term mx-1" title="A popular JavaScript library for building user interfaces">React</span> 
                      and 
                      <span className="tech-term mx-1" title="A state management pattern + library for JavaScript applications">Redux</span> 
                      connecting to 
                      <span className="tech-term mx-1" title="An open source SQL database management system">PostgreSQL</span> 
                      databases.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Slide 2: Resume Analysis (similar to the original content) */}
            <div className={`${activeSlide === 1 ? 'block' : 'hidden'}`}>
              <h2 className="text-xl font-bold mb-4">Resume Analysis: Java Developer</h2>
              <div className="space-y-2 text-gray-700 text-sm">
                <p className="leading-relaxed">
                  Candidate has 5+ years experience as a 
                  <span className="tech-term mx-1" title="Java Enterprise Edition - A platform for server-side application development">Java EE</span> 
                  developer with expertise in 
                  <span className="tech-term mx-1" title="Spring Boot is an open source Java-based framework used to create microservices">Spring Boot</span> 
                  and 
                  <span className="tech-term mx-1" title="A popular JavaScript library for building user interfaces">React</span>. 
                  They've implemented 
                  <span className="tech-term mx-1" title="Representational State Transfer - An architectural style for designing networked applications">RESTful APIs</span> 
                  and worked with 
                  <span className="tech-term mx-1" title="An open source SQL database management system">PostgreSQL</span>.
                </p>
                <p className="leading-relaxed">
                  They've also worked with
                  <span className="tech-term mx-1" title="Continuous Integration and Continuous Deployment - Practices that enable frequent code changes to be automatically tested and deployed">CI/CD</span> 
                  pipelines using 
                  <span className="tech-term mx-1" title="An open source automation server that helps automate software development">Jenkins</span>
                  and 
                  <span className="tech-term mx-1" title="An open source tool for creating lightweight, portable virtualized application containers">Docker</span>.
                  The candidate has experience with 
                  <span className="tech-term mx-1" title="A software design pattern that supports the building of maintainable applications">MVC architecture</span> 
                  and 
                  <span className="tech-term mx-1" title="A software development methodology that emphasizes incremental delivery and team collaboration">Agile methodologies</span>.
                </p>
              </div>
              <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-md">
                <h3 className="text-sm font-medium text-gray-700 mb-2">TechLex Analysis</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Strong Backend Skills</span>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Modern Tech Stack</span>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">DevOps Knowledge</span>
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Microservices Experience</span>
                </div>
              </div>
            </div>
            
            {/* Navigation arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 flex justify-between w-full px-2 z-10">
              <button 
                onClick={goToPrevSlide}
                className="bg-white bg-opacity-70 p-1 rounded-full shadow-md hover:bg-opacity-100 transition-all"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              <button 
                onClick={goToNextSlide}
                className="bg-white bg-opacity-70 p-1 rounded-full shadow-md hover:bg-opacity-100 transition-all"
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>
            </div>
            
            {/* Slide indicator */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {[...Array(totalSlides)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSlide(i)}
                  className={`w-2 h-2 rounded-full ${
                    i === activeSlide ? 'bg-techlex-blue' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          
          {/* Loading overlay */}
          <div className={cn(
            "absolute inset-0 bg-white flex items-center justify-center transition-opacity duration-500",
            loaded ? "opacity-0 pointer-events-none" : "opacity-100"
          )}>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 border-4 border-techlex-blue border-t-transparent rounded-full animate-spin"></div>
              <span className="mt-2 text-sm text-gray-500">Loading content...</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating tooltip example - with faster animation and precise positioning */}
      <div className="absolute top-32 -right-2 md:right-5 w-72 bg-techlex-blue text-white p-4 rounded-lg shadow-lg transform transition-all duration-250 animate-[float_2s_ease-in-out_infinite]">
        <div className="absolute -left-4 top-8 w-0 h-0 border-t-8 border-r-8 border-b-8 border-transparent border-r-techlex-blue"></div>
        <h4 className="font-medium mb-1">Spring Boot</h4>
        <p className="text-sm opacity-90">An open-source Java-based framework used to create microservice applications. It provides pre-configured settings for a fast development environment.</p>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-8 -left-10 w-20 h-20 bg-techlex-lightblue opacity-20 rounded-full blur-2xl"></div>
      <div className="absolute -top-12 -right-4 w-24 h-24 bg-techlex-blue opacity-10 rounded-full blur-3xl"></div>
    </div>
  );
};

export default HeroImageSection;
