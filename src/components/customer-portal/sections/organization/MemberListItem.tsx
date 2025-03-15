
import React from 'react';
import { OrganizationMember, ROLE_LABELS } from '@/types/organization';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Shield, Trash2 } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface MemberListItemProps {
  member: OrganizationMember;
  currentUserId: string;
  onChangeRole: (member: OrganizationMember) => void;
  onRemoveMember: (member: OrganizationMember) => void;
}

const MemberListItem: React.FC<MemberListItemProps> = ({
  member,
  currentUserId,
  onChangeRole,
  onRemoveMember
}) => {
  return (
    <li className="flex items-center justify-between p-3 rounded-md bg-gray-50 border">
      <div className="flex items-center space-x-3">
        <Avatar className="h-8 w-8">
          <AvatarFallback>{member.user?.name?.substring(0, 2).toUpperCase() || member.user_id.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{member.user?.name || member.invited_name || member.user_id}</p>
          <p className="text-sm text-gray-500">{ROLE_LABELS[member.role]}</p>
        </div>
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onChangeRole(member)} disabled={currentUserId === member.user_id}>
            <Shield className="mr-2 h-4 w-4" />
            Change Role
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onRemoveMember(member)} disabled={currentUserId === member.user_id}>
            <Trash2 className="mr-2 h-4 w-4" />
            Remove Member
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </li>
  );
};

export default MemberListItem;
