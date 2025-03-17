
import { Button } from "@/components/ui/button";
import { Home, FileText, UploadCloud } from "lucide-react";

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="section-padding bg-white border-y border-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            How Candilingo Works
          </h2>
          <p className="text-lg text-gray-600">
            Our intuitive browser extension seamlessly integrates with your workflow.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-6 rounded-xl text-center border border-gray-100 animate-fade-in">
            <div className="w-16 h-16 mx-auto bg-candilingo-pink bg-opacity-10 rounded-full flex items-center justify-center mb-4">
              <UploadCloud className="w-8 h-8 text-candilingo-pink" />
            </div>
            <h3 className="text-xl font-semibold mb-2">1. Install & Activate</h3>
            <p className="text-gray-600">
              Add the Candilingo extension to your browser and activate it with your account credentials.
            </p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-xl text-center border border-gray-100 animate-fade-in-slow">
            <div className="w-16 h-16 mx-auto bg-candilingo-pink bg-opacity-10 rounded-full flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-candilingo-pink" />
            </div>
            <h3 className="text-xl font-semibold mb-2">2. Browse & Analyze</h3>
            <p className="text-gray-600">
              Open CVs, PDFs, or web pages with technical content, and Candilingo automatically identifies technical terms.
            </p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-xl text-center border border-gray-100 animate-fade-in-slower">
            <div className="w-16 h-16 mx-auto bg-candilingo-pink bg-opacity-10 rounded-full flex items-center justify-center mb-4">
              <Home className="w-8 h-8 text-candilingo-pink" />
            </div>
            <h3 className="text-xl font-semibold mb-2">3. Customize & Learn</h3>
            <p className="text-gray-600">
              Create custom glossaries for your team and continuously improve your technical knowledge.
            </p>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <Button className="btn-primary">
            See Candilingo in Action
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
