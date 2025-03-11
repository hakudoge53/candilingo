
import { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import ContactForm from '@/components/forms/ContactForm';
import CTAContent from './CTAContent';

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
          <div className="absolute -top-12 -right-12 w-24 h-24 bg-techlex-blue opacity-10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-techlex-lightblue opacity-10 rounded-full blur-3xl"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10">
            <CTAContent seatsRemaining={seatsRemaining} />
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
