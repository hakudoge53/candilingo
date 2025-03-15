
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import TermCard from './TermCard';
import { TechLingoTerm } from "@/hooks/useTechLingoWiki";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface CategoryTabsProps {
  groupedTerms: Record<string, TechLingoTerm[]>;
  categories: string[];
  searchQuery: string;
  isAdmin: boolean;
  onEditTerm: (term: TechLingoTerm) => void;
  onDeleteTerm: (id: string) => void;
  onAddTerm: () => void;
}

const CategoryTabs = ({ 
  groupedTerms,
  categories,
  searchQuery,
  isAdmin,
  onEditTerm,
  onDeleteTerm,
  onAddTerm
}: CategoryTabsProps) => {
  // Filter categories based on search
  const filteredCategories = searchQuery 
    ? categories.filter(category => 
        groupedTerms[category].some(term => 
          term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
          term.definition.toLowerCase().includes(searchQuery.toLowerCase())
        ) || category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : categories;

  if (filteredCategories.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <p className="text-center text-gray-500 mb-4">
            {searchQuery ? `No terms found matching "${searchQuery}"` : "No terms in the database yet."}
          </p>
          {isAdmin && !searchQuery && (
            <Button onClick={onAddTerm} className="bg-candilingo-pink hover:bg-candilingo-pink/90">
              <Plus className="mr-2 h-4 w-4" /> Add Your First Term
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Tabs defaultValue={filteredCategories[0] || "all"} className="space-y-4">
      <div className="overflow-x-auto pb-2">
        <TabsList className="w-max">
          {filteredCategories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      
      {filteredCategories.map((category) => (
        <TabsContent key={category} value={category} className="space-y-4">
          {groupedTerms[category]
            .filter(term => 
              !searchQuery || 
              term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
              term.definition.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((term) => (
              <TermCard 
                key={term.id}
                term={term}
                isAdmin={isAdmin}
                onEdit={onEditTerm}
                onDelete={onDeleteTerm}
              />
            ))}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default CategoryTabs;
