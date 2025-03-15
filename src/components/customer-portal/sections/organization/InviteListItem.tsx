
import React from 'react';
import { OrganizationInvitation } from './types';
import { ROLE_LABELS } from '@/types/organization';
import { Button } from '@/components/ui/button';
import { AlertTriangle, MoreHorizontal, X } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface InviteListItemProps {
  invite: OrganizationInvitation;
  onRevokeInvite: (inviteId: string) => void;
}

const InviteListItem: React.FC<InviteListItemProps> = ({
  invite,
  onRevokeInvite
}) => {
  return (
    <li className="flex items-center justify-between p-3 rounded-md bg-gray-50 border">
      <div className="flex items-center space-x-3">
        <AlertTriangle className="text-yellow-500 h-4 w-4" />
        <div>
          <p className="font-medium">{invite.invited_name || invite.invited_email}</p>
          <p className="text-sm text-gray-500">
            Invited as {ROLE_LABELS[invite.role]}
          </p>
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
          <DropdownMenuItem onClick={() => onRevokeInvite(invite.id)}>
            <X className="mr-2 h-4 w-4" />
            Revoke Invite
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </li>
  );
};

export default InviteListItem;
