
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface GlossarySearchFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeCategory: string | null;
  setActiveCategory: (category: string | null) => void;
  categories: string[];
  resetFilters: () => void;
}

const GlossarySearchFilter = ({
  searchTerm,
  setSearchTerm,
  activeCategory,
  setActiveCategory,
  categories,
  resetFilters
}: GlossarySearchFilterProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 mb-8">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Search terms or definitions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={resetFilters}
            className="whitespace-nowrap"
          >
            Reset Filters
          </Button>
        </div>
      </div>
      
      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <Badge 
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            className={`cursor-pointer ${activeCategory === category ? 'bg-techlex-blue' : 'hover:bg-gray-100'}`}
            onClick={() => setActiveCategory(activeCategory === category ? null : category)}
          >
            {category}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default GlossarySearchFilter;
