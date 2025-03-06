
import TestimonialCard from "@/components/TestimonialCard";

const TestimonialsSection = () => {
  return (
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
  );
};

export default TestimonialsSection;
