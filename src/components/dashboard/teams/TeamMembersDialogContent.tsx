
import React, { useState } from 'react';
import { DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Team, TeamMember } from '@/hooks/organization/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusIcon } from 'lucide-react';
import TeamMembersList from './TeamMembersList';
import TeamManagersList from './TeamManagersList';

interface TeamMembersDialogContentProps {
  team: Team;
  teamMembers: TeamMember[];
  isLoading: boolean;
  onRemoveMember: (id: string) => Promise<void>;
  onToggleManager: (teamMember: TeamMember) => Promise<void>;
  onAddMemberClick: () => void;
}

const TeamMembersDialogContent: React.FC<TeamMembersDialogContentProps> = ({
  team,
  teamMembers,
  isLoading,
  onRemoveMember,
  onToggleManager,
  onAddMemberClick
}) => {
  const [activeTab, setActiveTab] = useState('members');
  const managers = teamMembers.filter(m => m.is_team_manager);
  
  return (
    <>
      <DialogHeader>
        <DialogTitle>Team Members: {team?.name}</DialogTitle>
        <DialogDescription>
          Manage the members of this team and their roles.
        </DialogDescription>
      </DialogHeader>
      
      <div className="mt-4">
        <div className="flex justify-between items-center mb-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="members">Team Members</TabsTrigger>
                <TabsTrigger value="managers">Team Managers</TabsTrigger>
              </TabsList>
              
              <Button onClick={onAddMemberClick}>
                <PlusIcon className="mr-2 h-4 w-4" />
                Add Member
              </Button>
            </div>
            
            <TabsContent value="members" className="mt-4">
              <TeamMembersList
                teamMembers={teamMembers}
                isLoading={isLoading}
                onRemoveMember={onRemoveMember}
                onToggleManager={onToggleManager}
                onAddMemberClick={onAddMemberClick}
              />
            </TabsContent>
            
            <TabsContent value="managers" className="mt-4">
              <TeamManagersList 
                managers={managers}
                isLoading={isLoading}
                onRemoveManagerRole={onToggleManager}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default TeamMembersDialogContent;
