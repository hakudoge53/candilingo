
import TestimonialCard from "@/components/TestimonialCard";

const TestimonialsSection = () => {
  return (
    <section className="section-padding bg-white border-y border-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            What We Envision Recruitment Pros Will Say
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Here's how we hope TechLex EU will transform recruitment agencies when launched.
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-700 text-sm">
            <p>These are aspirational testimonials for our future product. Real reviews coming soon! 😉</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TestimonialCard
            quote="We expect TechLex to completely transform how our non-tech recruiters handle IT positions. The ability to understand complex tech terms instantly should increase our placement rates by 30%."
            author="Future Customer"
            role="Tech Recruitment Manager"
            company="TechStaff Paris"
            className="animate-fade-in"
          />
          <TestimonialCard
            quote="As someone from a non-tech background, we believe TechLex will be invaluable. I should be able to confidently discuss tech requirements with clients and understand candidate qualifications."
            author="Potential User"
            role="Senior Recruiter"
            company="IT Talents Berlin"
            className="animate-fade-in-slow"
          />
          <TestimonialCard
            quote="We anticipate the custom glossary feature will become essential for our onboarding process. New team members should get up to speed much faster, maintaining consistency in our tech understanding."
            author="Future Client"
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
