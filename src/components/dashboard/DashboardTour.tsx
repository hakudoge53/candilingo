import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface DashboardTourProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onClose: () => void;
}

const DashboardTour: React.FC<DashboardTourProps> = ({ activeTab, setActiveTab, onClose }) => {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Welcome to your Candilingo Dashboard!</DialogTitle>
          <DialogDescription>
            Let's take a quick tour to get you familiar with the main sections.
          </DialogDescription>
        </DialogHeader>

        {activeTab === 'glossaries' && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Glossaries</h3>
            <p>
              Here you can manage your glossaries, create new ones, and add terms.
            </p>
          </div>
        )}

        {activeTab === 'organization' && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Organization</h3>
            <p>
              Manage your organization settings and details in this section.
            </p>
          </div>
        )}

        {activeTab === 'members' && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Team Members</h3>
            <p>
              Invite and manage your team members and their roles.
            </p>
          </div>
        )}

        <DialogFooter>
          <Button onClick={onClose}>
            Close Tour
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DashboardTour;
