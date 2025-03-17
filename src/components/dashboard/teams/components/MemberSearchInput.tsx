
import React from 'react';
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';

interface MemberSearchInputProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const MemberSearchInput: React.FC<MemberSearchInputProps> = ({
  searchQuery,
  setSearchQuery
}) => {
  return (
    <div className="relative">
      <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
      <Input
        className="pl-9"
        placeholder="Search members by name or email"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default MemberSearchInput;
