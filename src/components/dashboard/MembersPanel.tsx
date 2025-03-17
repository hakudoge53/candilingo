import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { OrganizationMember } from '@/types/organization';
import { useMembersFetch } from '@/hooks/organization/members/useMembersFetch';
import { useAuth } from '@/hooks/auth/useAuth';
import ActiveMembersTable from './members/ActiveMembersTable';
import PendingInvitationsTable from './members/PendingInvitationsTable';
import InviteMemberDialog from './members/InviteMemberDialog';

const MembersPanel = () => {
  const { activeUser } = useAuth();
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [members, setMembers] = useState<OrganizationMember[]>([]);
  const { isLoading } = useMembersFetch({ setMembers });

  const handleInviteDialogOpen = () => {
    setIsInviteDialogOpen(true);
  };

  const handleInviteDialogClose = () => {
    setIsInviteDialogOpen(false);
  };

  const [invitations, setInvitations] = useState([]);
  const [loadingInvitations, setLoadingInvitations] = useState(true);

  useEffect(() => {
    const fetchInvitations = async () => {
      if (!activeUser?.user_metadata?.organization_id) {
        setLoadingInvitations(false);
        return;
      }

      setLoadingInvitations(true);
      try {
        const { data, error } = await supabase
          .from('organization_invites')
          .select('*')
          .eq('organization_id', activeUser.user_metadata.organization_id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error("Error fetching invitations:", error);
          toast.error("Failed to load invitations");
        } else {
          setInvitations(data || []);
        }
      } catch (error) {
        console.error("Error fetching invitations:", error);
        toast.error("Failed to load invitations");
      } finally {
        setLoadingInvitations(false);
      }
    };

    fetchInvitations();
  }, [activeUser?.user_metadata?.organization_id]);

  const handleRevokeInvite = async (inviteId: string) => {
    try {
      const { error } = await supabase
        .from('organization_invites')
        .delete()
        .eq('id', inviteId);

      if (error) {
        console.error("Error revoking invite:", error);
        toast.error("Failed to revoke invite");
      } else {
        setInvitations(prev => prev.filter(invite => invite.id !== inviteId));
        toast.success("Invite revoked successfully");
      }
    } catch (error) {
      console.error("Error revoking invite:", error);
      toast.error("Failed to revoke invite");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center mb-2">
            <img
              src="/lovable-uploads/3ba829c2-54b7-4152-b767-9eb28429dbd7.png"
              alt="Candilingo"
              className="h-10 w-auto mr-2"
            />
            <h2 className="text-xl font-semibold">
              Manage Team Members
            </h2>
          </div>
          <p className="text-sm text-gray-500">Invite, manage, and remove members from your organization.</p>
        </div>

        {(activeUser?.role === 'owner' || activeUser?.role === 'admin') && (
          <button
            onClick={handleInviteDialogOpen}
            className="bg-candilingo-purple text-white font-semibold py-2 px-4 rounded hover:bg-candilingo-lightpurple transition-colors"
          >
            Invite Member
          </button>
        )}
      </div>

      <ActiveMembersTable members={members} isLoading={isLoading} setMembers={setMembers} />

      <PendingInvitationsTable
        invitations={invitations}
        loadingInvitations={loadingInvitations}
        onRevokeInvite={handleRevokeInvite}
      />

      <InviteMemberDialog
        isOpen={isInviteDialogOpen}
        onClose={handleInviteDialogClose}
        setInvitations={setInvitations}
      />
    </div>
  );
};

export default MembersPanel;
