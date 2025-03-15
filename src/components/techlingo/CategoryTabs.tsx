
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import TermCard from './TermCard';
import { TechLingoTerm } from "@/hooks/useTechLingoWiki";
import { Button } from "@/components/ui/button";
import { Plus, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
        groupedTerms[category]?.some(term => 
          term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
          term.definition.toLowerCase().includes(searchQuery.toLowerCase())
        ) || category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : categories;

  // Identify industry-specific categories
  const industryCategories = ['Healthcare', 'Finance', 'Legal', 'Manufacturing'];
  
  // Function to check if a category is industry-specific
  const isIndustryCategory = (category: string) => {
    return industryCategories.some(industry => 
      category.toLowerCase().includes(industry.toLowerCase())
    );
  };

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
            <TabsTrigger key={category} value={category} className="flex items-center gap-1">
              {isIndustryCategory(category) && <Briefcase className="h-3 w-3" />}
              {category}
              {isIndustryCategory(category) && (
                <Badge variant="outline" className="ml-1 px-1 py-0 text-xs bg-candilingo-purple/10">
                  Industry
                </Badge>
              )}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      
      {filteredCategories.map((category) => (
        <TabsContent key={category} value={category} className="space-y-4">
          {isIndustryCategory(category) && (
            <div className="bg-candilingo-purple/5 p-3 rounded-md mb-4 border border-candilingo-purple/20">
              <div className="flex items-center gap-2 mb-1">
                <Briefcase className="h-4 w-4 text-candilingo-purple" />
                <h3 className="font-medium text-candilingo-purple">Industry-Specific Glossary</h3>
              </div>
              <p className="text-sm text-gray-600">
                These terms are specific to the {category} industry and help recruiters understand domain-specific terminology.
              </p>
            </div>
          )}
          
          {groupedTerms[category]
            ?.filter(term => 
              !searchQuery || 
              term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
              term.definition.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((term) => (
              <TermCard 
                key={term.id}
                term={term}
                isAdmin={isAdmin}
                onEdit={() => onEditTerm(term)}
                onDelete={() => onDeleteTerm(term.id)}
              />
            ))}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default CategoryTabs;
