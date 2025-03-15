
import React from 'react';
import { OrganizationMember } from '@/types/organization';
import MemberListItem from './MemberListItem';

interface MembersListProps {
  members: OrganizationMember[];
  currentUserId: string;
  onChangeRole: (member: OrganizationMember) => void;
  onRemoveMember: (member: OrganizationMember) => void;
}

const MembersList: React.FC<MembersListProps> = ({
  members,
  currentUserId,
  onChangeRole,
  onRemoveMember
}) => {
  return (
    <div>
      <h3 className="text-md font-semibold mb-2">Members</h3>
      <ul className="list-none space-y-2">
        {members.map(member => (
          <MemberListItem
            key={member.id}
            member={member}
            currentUserId={currentUserId}
            onChangeRole={onChangeRole}
            onRemoveMember={onRemoveMember}
          />
        ))}
      </ul>
      
      {members.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          <p>No members in this organization yet</p>
        </div>
      )}
    </div>
  );
};

export default MembersList;
