
import { CheckCircle } from 'lucide-react';

interface CTAContentProps {
  seatsRemaining: number;
}

const CTAContent = ({ seatsRemaining }: CTAContentProps) => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Technical Recruitment?</h2>
      <p className="text-gray-600 mb-4">
        Schedule a discovery call with our team to learn how HighlightHire can help your recruitment process. We'll demonstrate our 4-in-1 solution and answer any questions you may have.
      </p>
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
        <p className="text-amber-700 text-sm mb-2">
          <strong>Early Access Campaign:</strong> Get 50% off for the first year as an early bird.
        </p>
        <p className="text-amber-700 text-sm font-bold">
          All plans include a 1-month free trial!
        </p>
      </div>
      <ul className="space-y-3 mb-6">
        <li className="flex items-start">
          <CheckCircle className="w-5 h-5 text-techlex-blue mt-0.5 flex-shrink-0" />
          <span className="ml-2">Personalized product demonstration</span>
        </li>
        <li className="flex items-start">
          <CheckCircle className="w-5 h-5 text-techlex-blue mt-0.5 flex-shrink-0" />
          <span className="ml-2">Custom solution tailored to your needs</span>
        </li>
        <li className="flex items-start">
          <CheckCircle className="w-5 h-5 text-techlex-blue mt-0.5 flex-shrink-0" />
          <span className="ml-2">No obligation, friendly conversation</span>
        </li>
      </ul>
    </div>
  );
};

export default CTAContent;
