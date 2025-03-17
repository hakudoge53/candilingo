
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Plus, Tag, FileText, Edit, Trash2, Pencil } from "lucide-react";
import { Glossary, GlossaryTerm } from '@/types/organization';

interface GlossaryContentProps {
  glossary: Glossary;
  terms: GlossaryTerm[];
  isLoading?: boolean;
  onAddTermClick: () => void;
  onEditTerm: (term: GlossaryTerm) => void;
  onDeleteTerm: (termId: string) => void;
}

const GlossaryContent: React.FC<GlossaryContentProps> = ({ 
  glossary, 
  terms, 
  isLoading = false,
  onAddTermClick, 
  onEditTerm, 
  onDeleteTerm 
}) => {
  const sortedTerms = [...terms].sort((a, b) => a.term.localeCompare(b.term));
  
  // Get unique categories
  const categories = Array.from(new Set(terms.map(term => term.category || 'Uncategorized')))
    .sort((a, b) => a.localeCompare(b));
  
  // Group terms by category
  const termsByCategory: Record<string, GlossaryTerm[]> = {};
  categories.forEach(category => {
    termsByCategory[category] = sortedTerms.filter(term => 
      (term.category || 'Uncategorized') === category
    );
  });
  
  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading terms...</div>;
  }
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium">{glossary.name}</h3>
          {glossary.description && (
            <p className="text-sm text-gray-500">{glossary.description}</p>
          )}
        </div>
        <Button onClick={onAddTermClick} size="sm">
          <Plus className="h-4 w-4 mr-1" /> Add Term
        </Button>
      </div>
      
      {terms.length === 0 ? (
        <Card>
          <CardContent className="p-6">
            <div className="text-center space-y-3 py-6">
              <FileText className="h-12 w-12 text-gray-300 mx-auto" />
              <h3 className="text-lg font-medium">No Terms Yet</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                This glossary doesn't have any terms yet. Add your first term to get started.
              </p>
              <Button onClick={onAddTermClick} className="mt-2">
                <PlusCircle className="h-4 w-4 mr-2" /> Add First Term
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Terms ({terms.length})</TabsTrigger>
            {categories.map(category => (
              <TabsTrigger key={category} value={category}>
                {category} ({termsByCategory[category].length})
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sortedTerms.map(term => (
                <TermCard 
                  key={term.id} 
                  term={term} 
                  onEdit={() => onEditTerm(term)}
                  onDelete={() => onDeleteTerm(term.id)}
                />
              ))}
            </div>
          </TabsContent>
          
          {categories.map(category => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {termsByCategory[category].map(term => (
                  <TermCard 
                    key={term.id} 
                    term={term} 
                    onEdit={() => onEditTerm(term)}
                    onDelete={() => onDeleteTerm(term.id)}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
};

interface TermCardProps {
  term: GlossaryTerm;
  onEdit: () => void;
  onDelete: () => void;
}

const TermCard: React.FC<TermCardProps> = ({ term, onEdit, onDelete }) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-medium">{term.term}</h4>
            <div className="flex space-x-1">
              <Button variant="ghost" size="icon" onClick={onEdit} className="h-7 w-7">
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={onDelete} className="h-7 w-7 text-red-500">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <p className="text-sm text-gray-600">{term.definition}</p>
          {term.category && (
            <div className="mt-3">
              <Badge variant="outline" className="flex items-center w-fit">
                <Tag className="h-3 w-3 mr-1" /> {term.category}
              </Badge>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GlossaryContent;
