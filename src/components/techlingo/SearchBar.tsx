
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Search, Plus } from "lucide-react";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isAdmin: boolean;
  onAddTermClick: () => void;
}

const SearchBar = ({ 
  searchQuery, 
  onSearchChange, 
  isAdmin, 
  onAddTermClick 
}: SearchBarProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search terms..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      {isAdmin && (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="ml-4" onClick={onAddTermClick}>
              <Plus className="mr-2 h-4 w-4" /> Add Term
            </Button>
          </DialogTrigger>
        </Dialog>
      )}
    </div>
  );
};

export default SearchBar;
