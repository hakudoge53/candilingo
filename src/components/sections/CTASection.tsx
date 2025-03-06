
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CTASection = () => {
  return (
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
  );
};

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

export default CTASection;
