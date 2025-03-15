
import React from 'react';
import { OrganizationInvitation } from './types';
import InviteListItem from './InviteListItem';

interface InvitesListProps {
  invites: OrganizationInvitation[];
  onRevokeInvite: (inviteId: string) => void;
}

const InvitesList: React.FC<InvitesListProps> = ({
  invites,
  onRevokeInvite
}) => {
  return (
    <div>
      <h3 className="text-md font-semibold mb-2">Pending Invites</h3>
      <ul className="list-none space-y-2">
        {invites.map(invite => (
          <InviteListItem
            key={invite.id}
            invite={invite}
            onRevokeInvite={onRevokeInvite}
          />
        ))}
      </ul>
      
      {invites.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          <p>No pending invites</p>
        </div>
      )}
    </div>
  );
};

export default InvitesList;
