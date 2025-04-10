
import React from 'react';
import { User } from '@/hooks/auth/types';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { OrganizationMember, Organization, UserRole } from '@/types/organization';
import MembersList from './MembersList';
import InvitesList from './InvitesList';
import NoOrganizationCard from './NoOrganizationCard';
import OrganizationCard from './OrganizationCard';
import { useIsMobile } from '@/hooks/use-mobile';

interface OrganizationContentProps {
  user: User;
  activeOrganization: Organization | null;
  members: OrganizationMember[];
  activeMembers: OrganizationMember[];
  pendingInvites: OrganizationMember[];
  isLoading: boolean;
  error: string | null;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  handleCreateOrganization: (name: string) => Promise<void>;
  handleUpdateOrganization: (id: string, name: string) => Promise<void>;
  handleDeleteOrganization: (id: string) => Promise<void>;
  handleLeaveOrganization: (id: string) => Promise<void>;
  handleInviteMember: (values: { email: string; name: string; role: UserRole }) => Promise<void>;
  handleRoleChange: (memberId: string, role: UserRole) => Promise<void>;
  handleRemoveMember: (memberId: string) => Promise<void>;
  handleRevokeInvitation: (inviteId: string) => Promise<void>;
}

const OrganizationContent: React.FC<OrganizationContentProps> = ({
  user,
  activeOrganization,
  members,
  activeMembers,
  pendingInvites,
  isLoading,
  error,
  activeTab,
  setActiveTab,
  handleCreateOrganization,
  handleUpdateOrganization,
  handleDeleteOrganization,
  handleLeaveOrganization,
  handleInviteMember,
  handleRoleChange,
  handleRemoveMember,
  handleRevokeInvitation
}) => {
  const isMobile = useIsMobile();
  
  if (isLoading) {
    return <div className="text-center py-8">Loading organization data...</div>;
  }
  
  if (!activeOrganization) {
    return (
      <NoOrganizationCard
        onCreateOrganization={handleCreateOrganization}
        isLoading={isLoading}
      />
    );
  }
  
  return (
    <div className="space-y-6 px-4 md:px-0">
      <OrganizationCard
        organization={activeOrganization}
        member={members.find(m => m.user_id === user.id) || null}
        onEditClick={(org) => handleUpdateOrganization(org.id, org.name)}
      />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className={`mb-4 ${isMobile ? 'w-full' : ''}`}>
          <TabsTrigger className={isMobile ? 'flex-1' : ''} value="members">Members ({activeMembers.length})</TabsTrigger>
          <TabsTrigger className={isMobile ? 'flex-1' : ''} value="invites">Pending Invites ({pendingInvites.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="members">
          <MembersList
            members={activeMembers}
            currentUserId={user.id}
            onChangeRole={member => handleRoleChange(member.id, member.role)}
            onRemoveMember={member => handleRemoveMember(member.id)}
          />
        </TabsContent>
        
        <TabsContent value="invites">
          <InvitesList
            invites={pendingInvites.map(invite => ({
              id: invite.id,
              organization_id: invite.organization_id,
              invited_email: invite.invited_email || '',
              invited_name: invite.invited_name || null,
              role: invite.role,
              status: invite.status,
              created_at: invite.created_at || ''
            }))}
            onRevokeInvite={handleRevokeInvitation}
          />
        </TabsContent>
      </Tabs>
      
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default OrganizationContent;
