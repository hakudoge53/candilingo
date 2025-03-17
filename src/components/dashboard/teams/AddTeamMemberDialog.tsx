
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { OrganizationMember, UserRole, MemberStatus } from '@/types/organization';
import { supabase } from '@/integrations/supabase/client';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { SearchIcon } from 'lucide-react';

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
      const availableMembers = data.filter(member => 
        !existingMemberIds.includes(member.id)
      ).map(member => {
        // Create a properly shaped user object, handling potential errors
        let userObject = member.user;
        if (!userObject || typeof userObject === 'object' && 'error' in userObject) {
          // If user is missing or has an error, create a fallback user object
          userObject = {
            name: member.invited_name || 'Unknown',
            email: member.invited_email || 'No email',
            avatar_url: null
          };
        }

        return {
          ...member,
          status: member.status as MemberStatus,
          role: member.role as UserRole,
          user: userObject
        } as OrganizationMember;
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
          <div className="relative">
            <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              className="pl-9"
              placeholder="Search members by name or email"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="border rounded-md">
            <ScrollArea className="h-64">
              {isLoading ? (
                <div className="p-4 space-y-4">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              ) : filteredMembers.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  No members found
                </div>
              ) : (
                <div>
                  {filteredMembers.map((member) => (
                    <div 
                      key={member.id}
                      className={`p-3 flex items-center space-x-3 border-b last:border-b-0 cursor-pointer hover:bg-gray-50 ${
                        selectedMember?.id === member.id ? 'bg-gray-100' : ''
                      }`}
                      onClick={() => toggleSelectMember(member)}
                    >
                      <Checkbox 
                        checked={selectedMember?.id === member.id}
                        onCheckedChange={() => toggleSelectMember(member)}
                      />
                      <Avatar className="h-8 w-8">
                        <AvatarImage 
                          src={member.user?.avatar_url || undefined} 
                          alt={member.user?.name || member.invited_name || ''} 
                        />
                        <AvatarFallback>
                          {((member.user?.name || member.invited_name || 'U').charAt(0)).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {member.user?.name || member.invited_name || 'Unknown'}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {member.user?.email || member.invited_email}
                        </p>
                      </div>
                      <Badge variant={
                        member.role === 'admin' ? 'destructive' : 
                        member.role === 'manager' ? 'default' : 
                        'outline'
                      }>
                        {member.role}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="is-manager"
              checked={isManager}
              onCheckedChange={setIsManager}
              disabled={!selectedMember}
            />
            <Label htmlFor="is-manager">Add as team manager</Label>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleAddMember} 
            disabled={isSubmitting || !selectedMember}
          >
            {isSubmitting ? "Adding..." : "Add to Team"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTeamMemberDialog;
