
import React from 'react';

interface EmptyMembersStateProps {
  message: string;
  subMessage: string;
  icon: React.ReactNode;
}

const EmptyMembersState: React.FC<EmptyMembersStateProps> = ({ message, subMessage, icon }) => {
  return (
    <div className="text-center py-8">
      <div className="flex justify-center mb-2">
        {icon}
      </div>
      <h3 className="mt-2 text-sm font-semibold text-gray-900">{message}</h3>
      <p className="mt-1 text-sm text-gray-500">
        {subMessage}
      </p>
    </div>
  );
};

export default EmptyMembersState;
