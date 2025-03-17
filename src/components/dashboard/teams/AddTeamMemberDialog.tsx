
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { OrganizationMember, UserRole, MemberStatus } from '@/types/organization';
import { supabase } from '@/integrations/supabase/client';
import { SelectQueryError, UserData } from '@/hooks/organization/types';
import MemberSearchInput from './components/MemberSearchInput';
import MembersList from './components/MembersList';
import TeamManagerToggle from './components/TeamManagerToggle';
import DialogActions from './components/DialogActions';

interface AddTeamMemberDialogProps {
  isOpen: boolean;
  onClose: () => void;
  organizationId: string;
  onAddMember: (member: OrganizationMember, isManager: boolean) => Promise<void>;
  existingMemberIds: string[];
}

const AddTeamMemberDialog: React.FC<AddTeamMemberDialogProps> = ({
  isOpen,
  onClose,
  organizationId,
  onAddMember,
  existingMemberIds
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isManager, setIsManager] = useState(false);
  const [selectedMember, setSelectedMember] = useState<OrganizationMember | null>(null);
  const [allMembers, setAllMembers] = useState<OrganizationMember[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<OrganizationMember[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch all organization members when the dialog opens
  useEffect(() => {
    if (isOpen && organizationId) {
      fetchOrganizationMembers();
    }
  }, [isOpen, organizationId]);

  // Update filtered members when search query changes
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredMembers(allMembers);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = allMembers.filter(member => 
        (member.user?.name?.toLowerCase().includes(query) || 
         member.user?.email?.toLowerCase().includes(query) ||
         (member.invited_email && member.invited_email.toLowerCase().includes(query)) ||
         (member.invited_name && member.invited_name.toLowerCase().includes(query)))
      );
      setFilteredMembers(filtered);
    }
  }, [searchQuery, allMembers]);

  const fetchOrganizationMembers = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('organization_members')
        .select(`
          *,
          user:profiles(id, name, email, avatar_url)
        `)
        .eq('organization_id', organizationId)
        .eq('status', 'active');

      if (error) throw error;

      // Filter out members that are already in the team with safer type handling
      const availableMembers = data
        .filter(member => !existingMemberIds.includes(member.id))
        .map(member => {
          // Handle case when user is present but might be an error
          let userObject: UserData | SelectQueryError | null = member.user;
          
          // If user is an error or null, create a fallback user object
          if (!userObject || (typeof userObject === 'object' && 'error' in userObject)) {
            userObject = {
              name: member.invited_name || 'Unknown',
              email: member.invited_email || 'No email',
              avatar_url: null
            } as UserData;
          }

          // Create a properly typed member object
          const memberWithUserData = {
            ...member,
            status: member.status as MemberStatus,
            role: member.role as UserRole,
            user: userObject as UserData
          } as OrganizationMember;
          
          return memberWithUserData;
        });

      setAllMembers(availableMembers);
      setFilteredMembers(availableMembers);
    } catch (error) {
      console.error('Error fetching organization members:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddMember = async () => {
    if (!selectedMember) return;
    
    setIsSubmitting(true);
    await onAddMember(selectedMember, isManager);
    setIsSubmitting(false);
    
    // Reset form
    setSelectedMember(null);
    setIsManager(false);
    setSearchQuery('');
    
    // Close dialog
    onClose();
  };

  const toggleSelectMember = (member: OrganizationMember) => {
    if (selectedMember?.id === member.id) {
      setSelectedMember(null);
    } else {
      setSelectedMember(member);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Team Member</DialogTitle>
          <DialogDescription>
            Select an organization member to add to this team.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          <MemberSearchInput 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          
          <div className="border rounded-md">
            <MembersList
              isLoading={isLoading}
              filteredMembers={filteredMembers}
              selectedMember={selectedMember}
              toggleSelectMember={toggleSelectMember}
            />
          </div>
          
          <TeamManagerToggle
            isManager={isManager}
            setIsManager={setIsManager}
            disabled={!selectedMember}
          />
        </div>
        
        <DialogActions
          onClose={onClose}
          onAddMember={handleAddMember}
          isSubmitting={isSubmitting}
          isDisabled={!selectedMember}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddTeamMemberDialog;
