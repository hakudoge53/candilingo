
import { useState, useEffect } from 'react';
import CTAContent from './CTAContent';
import { Button } from "@/components/ui/button";
import ContactDialog from "@/components/ContactDialog";

const CTASection = () => {
  const [seatsRemaining, setSeatsRemaining] = useState(200);
  const [confirmedLicenses, setConfirmedLicenses] = useState(1);
  
  useEffect(() => {
    // This is where we would fetch the actual confirmed licenses count
    // For now, we're using a static value
    setSeatsRemaining(200 - confirmedLicenses);
  }, [confirmedLicenses]);

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute -top-12 -right-12 w-24 h-24 bg-candilingo-orange opacity-10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-candilingo-lightorange opacity-10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <CTAContent seatsRemaining={seatsRemaining} />
            
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center">
              <Button 
                variant="orange"
                className="w-full sm:w-auto text-lg py-6 px-8 shadow-md hover:shadow-lg transition-all duration-300"
                onClick={() => window.location.href = '/dashboard'}
              >
                Start Your Free Trial
              </Button>
              
              <ContactDialog />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
