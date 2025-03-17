
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { OrganizationMember } from '@/types/organization';

interface MembersListProps {
  isLoading: boolean;
  filteredMembers: OrganizationMember[];
  selectedMember: OrganizationMember | null;
  toggleSelectMember: (member: OrganizationMember) => void;
}

const MembersList: React.FC<MembersListProps> = ({
  isLoading,
  filteredMembers,
  selectedMember,
  toggleSelectMember
}) => {
  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  if (filteredMembers.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        No members found
      </div>
    );
  }

  return (
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
              {member.user?.email || member.invited_email || 'No email'}
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
  );
};

export default MembersList;
