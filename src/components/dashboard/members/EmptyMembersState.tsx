
import React from 'react';
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

interface EmptyMembersStateProps {
  isAdmin: boolean;
  onInvite: () => void;
}

const EmptyMembersState: React.FC<EmptyMembersStateProps> = ({ isAdmin, onInvite }) => {
  return (
    <div className="text-center py-10">
      <div className="bg-gray-100 p-4 rounded-full mx-auto w-16 h-16 flex items-center justify-center mb-4">
        <UserPlus className="h-8 w-8 text-gray-500" />
      </div>
      <h3 className="text-lg font-semibold mb-2">No Team Members Yet</h3>
      <p className="text-gray-500 mb-6 max-w-md mx-auto">
        {isAdmin
          ? "Start building your team by inviting members to collaborate with you."
          : "Your organization doesn't have any members yet. Contact your administrator."
        }
      </p>
      
      {isAdmin && (
        <Button onClick={onInvite} className="bg-candilingo-purple">
          <UserPlus className="mr-2 h-4 w-4" /> Invite Team Members
        </Button>
      )}
    </div>
  );
};

export default EmptyMembersState;
