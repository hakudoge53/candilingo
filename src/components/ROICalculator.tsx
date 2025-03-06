
import { useState, useEffect } from 'react';
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

interface ROICalculatorProps {
  className?: string;
}

const ROICalculator = ({ className }: ROICalculatorProps) => {
  const [cvCount, setCvCount] = useState<number>(100);
  const [interviewCount, setInterviewCount] = useState<number>(10);
  const [cvCostSavings, setCvCostSavings] = useState<number>(0);
  const [interviewCostSavings, setInterviewCostSavings] = useState<number>(0);

  // Average time saved per CV (in minutes)
  const timePerCv = 15;
  // Average time saved per interview (in minutes)
  const timePerInterview = 45;
  // Average recruiter hourly rate (in €)
  const hourlyRate = 35;

  useEffect(() => {
    // Calculate cost savings for CVs
    const cvHoursSaved = (cvCount * timePerCv) / 60;
    const cvSavings = cvHoursSaved * hourlyRate;
    setCvCostSavings(cvSavings);

    // Calculate cost savings for interviews
    const interviewHoursSaved = (interviewCount * timePerInterview) / 60;
    const interviewSavings = interviewHoursSaved * hourlyRate;
    setInterviewCostSavings(interviewSavings);
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

  return (
    <div className={`bg-white p-6 rounded-xl shadow-md ${className}`}>
      <h3 className="text-xl font-semibold mb-4">Calculate Your ROI</h3>
      
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
          <p className="text-sm text-gray-600">Time saved: <span className="font-semibold">{Math.round(cvCount * timePerCv / 60)} hours</span></p>
          <p className="text-sm text-gray-600">Estimated savings: <span className="font-semibold">€{Math.round(cvCostSavings)}</span> per month</p>
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
          <p className="text-sm text-gray-600">Time saved: <span className="font-semibold">{Math.round(interviewCount * timePerInterview / 60)} hours</span></p>
          <p className="text-sm text-gray-600">Estimated savings: <span className="font-semibold">€{Math.round(interviewCostSavings)}</span> per month</p>
        </div>
      </div>

      <div className="mt-8 p-4 bg-techlex-blue bg-opacity-10 rounded-lg">
        <p className="font-medium text-techlex-blue">
          Total estimated savings: <span className="font-bold">€{Math.round(cvCostSavings + interviewCostSavings)}</span> per month
        </p>
      </div>
    </div>
  );
};

export default ROICalculator;
