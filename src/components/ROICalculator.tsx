
import { useState, useEffect } from 'react';
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

interface ROICalculatorProps {
  className?: string;
}

const ROICalculator = ({ className }: ROICalculatorProps) => {
  const [cvCount, setCvCount] = useState<number>(100);
  const [interviewCount, setInterviewCount] = useState<number>(10);
  const [cvCostPerUnit, setCvCostPerUnit] = useState<number>(0);
  const [interviewCostPerUnit, setInterviewCostPerUnit] = useState<number>(0);

  // Regular monthly subscription cost (in €)
  const regularSubscriptionCost = 79;
  // Discounted monthly subscription cost (50% off)
  const baseSubscriptionCost = 39.50;
  // Average time spent per CV (in minutes)
  const timePerCv = 15;
  // Average time spent per interview (in minutes)
  const timePerInterview = 45;
  // Average recruiter hourly rate (in €)
  const hourlyRate = 35;

  useEffect(() => {
    // Calculate cost per CV
    const cvCost = cvCount > 0 ? baseSubscriptionCost / cvCount : 0;
    setCvCostPerUnit(cvCost);

    // Calculate cost per interview
    const interviewCost = interviewCount > 0 ? baseSubscriptionCost / interviewCount : 0;
    setInterviewCostPerUnit(interviewCost);
  }, [cvCount, interviewCount]);

  const handleCvInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= 500) {
      setCvCount(value);
    }
  };

  const handleInterviewInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= 40) {
      setInterviewCount(value);
    }
  };

  // Calculate traditional cost without tool (still needed for the summary calculation)
  const traditionalCvCost = (timePerCv / 60) * hourlyRate;
  const traditionalInterviewCost = (timePerInterview / 60) * hourlyRate;

  return (
    <div className={`bg-white p-6 rounded-xl shadow-md ${className}`}>
      {/* Monthly subscription at the top */}
      <div className="mb-6 p-4 bg-gradient-to-r from-candilingo-purple/10 to-candilingo-pink/10 rounded-lg border border-candilingo-purple/20">
        <div className="flex flex-col space-y-1">
          <div className="flex justify-between items-center">
            <p className="font-medium text-gray-700">Regular price:</p>
            <p className="text-gray-500 line-through">€{regularSubscriptionCost.toFixed(2)}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-bold text-candilingo-purple">Early access price:</p>
            <p className="font-bold text-candilingo-purple">€{baseSubscriptionCost.toFixed(2)}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm text-green-600">Your savings:</p>
            <p className="text-sm text-green-600 font-medium">€{(regularSubscriptionCost - baseSubscriptionCost).toFixed(2)} (50% off)</p>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium">CVs processed per month</label>
          <Input
            type="number"
            min={1}
            max={500}
            value={cvCount}
            onChange={handleCvInputChange}
            className="w-20 text-right"
          />
        </div>
        <Slider
          value={[cvCount]}
          min={1}
          max={500}
          step={1}
          onValueChange={(value) => setCvCount(value[0])}
          className="my-4"
        />
        <div className="bg-gray-50 p-4 rounded-lg mt-2">
          <p className="text-sm text-gray-600">Investment with Candilingo: <span className="font-semibold">€{cvCostPerUnit.toFixed(2)}</span> per CV</p>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium">Interviews conducted per month</label>
          <Input
            type="number"
            min={1}
            max={40}
            value={interviewCount}
            onChange={handleInterviewInputChange}
            className="w-20 text-right"
          />
        </div>
        <Slider
          value={[interviewCount]}
          min={1}
          max={40}
          step={1}
          onValueChange={(value) => setInterviewCount(value[0])}
          className="my-4"
        />
        <div className="bg-gray-50 p-4 rounded-lg mt-2">
          <p className="text-sm text-gray-600">Investment with Candilingo: <span className="font-semibold">€{interviewCostPerUnit.toFixed(2)}</span> per interview</p>
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;
