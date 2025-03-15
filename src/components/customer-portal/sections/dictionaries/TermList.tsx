
import React from 'react';
import { Search, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { GlossaryTerm } from '@/types/glossary';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Glossary } from '@/types/organization';

interface TermListProps {
  activeGlossary: Glossary | null;
  terms: GlossaryTerm[];
  searchTerm: string;
  isLoading: boolean;
  onSearchChange: (search: string) => void;
  onEditTerm?: (term: GlossaryTerm) => void;
  onDeleteTerm?: (termId: string) => void;
  onAddTermClick: () => void;
}

const TermList: React.FC<TermListProps> = ({
  activeGlossary,
  terms,
  searchTerm,
  isLoading,
  onSearchChange,
  onEditTerm,
  onDeleteTerm,
  onAddTermClick
}) => {
  // Filter terms by search
  const filteredTerms = terms.filter(term => 
    term.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
    term.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (term.category && term.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Group terms by category
  const groupedTerms = filteredTerms.reduce((groups, term) => {
    const category = term.category || 'Uncategorized';
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(term);
    return groups;
  }, {} as Record<string, GlossaryTerm[]>);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>
            {activeGlossary?.name || 'Dictionary Terms'}
          </CardTitle>
          <CardDescription>
            {activeGlossary?.description || 'Search and browse terms'}
          </CardDescription>
        </div>
        
        {activeGlossary && (
          <Button size="sm" onClick={onAddTermClick}>
            Add Term
          </Button>
        )}
      </CardHeader>
      
      <div className="px-6 pb-2">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search terms..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
      
      <CardContent className="max-h-[60vh] overflow-y-auto">
        {isLoading && !terms.length ? (
          <LoadingSpinner message="Loading terms..." />
        ) : (
          Object.entries(groupedTerms).map(([category, terms]) => (
            <div key={category} className="mb-6">
              <h3 className="text-md font-semibold mb-2 text-gray-700 border-b pb-1">
                {category}
              </h3>
              <div className="space-y-3">
                {terms.map((term) => (
                  <div key={term.id} className="border rounded-md p-3 bg-gray-50">
                    <div className="flex justify-between">
                      <div className="font-medium text-gray-900">{term.term}</div>
                      <div className="flex space-x-2">
                        {onEditTerm && (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6"
                            onClick={() => onEditTerm(term)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                        {onDeleteTerm && (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6 text-red-500"
                            onClick={() => onDeleteTerm(term.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">{term.definition}</div>
                    {term.relatedTerms && term.relatedTerms.length > 0 && (
                      <div className="text-xs text-gray-500 mt-2">
                        Related: {term.relatedTerms.join(', ')}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
        
        {!isLoading && activeGlossary && filteredTerms.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            {searchTerm ? (
              <p>No terms found matching "{searchTerm}"</p>
            ) : (
              <div>
                <p>No terms in this dictionary yet</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={onAddTermClick}
                >
                  Add your first term
                </Button>
              </div>
            )}
          </div>
        )}
        
        {!activeGlossary && !isLoading && (
          <div className="text-center py-10 text-gray-500">
            <p>Select a dictionary to view terms</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TermList;
