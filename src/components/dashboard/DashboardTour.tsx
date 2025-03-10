
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText, Compass, Building, Download, MessageSquareText, ChartBar } from "lucide-react";

interface TourStep {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const DashboardTour = () => {
  const [open, setOpen] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  
  const tourSteps: TourStep[] = [
    {
      title: "Welcome to TechLex EU Dashboard",
      description: "Let's take a quick tour to help you get started with our platform and understand the key features available to you.",
      icon: <Compass className="h-8 w-8 text-techlex-blue" />,
    },
    {
      title: "Install the Web Extension",
      description: "Download our browser extension to easily access term definitions and explanations while browsing tech content online.",
      icon: <Download className="h-8 w-8 text-techlex-blue" />,
    },
    {
      title: "CV Reader Integration",
      description: "Connect our CV Reader to automatically scan and analyze technical CVs, highlighting key skills and providing insights.",
      icon: <FileText className="h-8 w-8 text-techlex-blue" />,
    },
    {
      title: "AI-Powered Summaries",
      description: "Our AI tools can generate concise summaries of technical documents, candidate profiles, and job descriptions to save you time.",
      icon: <MessageSquareText className="h-8 w-8 text-techlex-blue" />,
    },
    {
      title: "Company Insights",
      description: "Gain valuable insights into companies by analyzing their tech stacks, industry presence, and technical requirements.",
      icon: <ChartBar className="h-8 w-8 text-techlex-blue" />,
    },
    {
      title: "Getting Started",
      description: "Create your first organization, invite team members, and customize your glossaries to make TechLex work for your specific needs.",
      icon: <Building className="h-8 w-8 text-techlex-blue" />,
    },
  ];

  const handleNextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setOpen(false);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    setOpen(false);
  };

  const currentTourStep = tourSteps[currentStep];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            {currentTourStep.icon}
          </div>
          <DialogTitle className="text-center text-xl">
            {currentTourStep.title}
          </DialogTitle>
          <DialogDescription className="text-center py-2">
            {currentTourStep.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex justify-center my-2">
          {tourSteps.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 w-5 mx-1 rounded-full ${
                index === currentStep ? "bg-techlex-blue" : "bg-gray-200"
              }`}
            />
          ))}
        </div>
        
        <DialogFooter className="flex sm:justify-between mt-4">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleSkip}
              className="text-gray-500"
            >
              Skip Tour
            </Button>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handlePrevStep}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            <Button onClick={handleNextStep}>
              {currentStep === tourSteps.length - 1 ? "Finish" : "Next"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DashboardTour;
