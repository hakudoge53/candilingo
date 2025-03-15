
import React, { useState, useEffect } from 'react';
import { User } from '@/hooks/auth/types';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Bookmark } from 'lucide-react';
import { GlossaryTerm } from '@/types/glossary';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { toast } from 'sonner';
import { publicGlossaries, publicGlossaryTerms } from '@/data/publicGlossaryTerms';

interface PublicDictionariesSectionProps {
  user: User;
  setLocalLoading: (loading: boolean) => void;
}

const PublicDictionariesSection: React.FC<PublicDictionariesSectionProps> = ({ user, setLocalLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGlossary, setSelectedGlossary] = useState<string | null>(null);
  const [glossaryTerms, setGlossaryTerms] = useState<GlossaryTerm[]>([]);

  // Simulate fetching glossaries from Supabase
  useEffect(() => {
    const fetchPublicGlossaries = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Select the first glossary by default if available
        if (publicGlossaries.length > 0 && !selectedGlossary) {
          setSelectedGlossary(publicGlossaries[0].id);
        }
      } catch (error) {
        console.error("Error fetching public glossaries:", error);
        toast.error("Failed to load public glossaries");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPublicGlossaries();
  }, []);

  // Fetch glossary terms when a glossary is selected
  useEffect(() => {
    if (!selectedGlossary) return;
    
    const fetchGlossaryTerms = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Filter terms for the selected glossary
        const filteredTerms = publicGlossaryTerms.filter(term => term.glossary_id === selectedGlossary);
        setGlossaryTerms(filteredTerms);
      } catch (error) {
        console.error("Error fetching glossary terms:", error);
        toast.error("Failed to load glossary terms");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGlossaryTerms();
  }, [selectedGlossary]);

  // Filter terms by search
  const filteredTerms = glossaryTerms.filter(term => 
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
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Public Dictionaries</h2>
        <p className="text-gray-600 mb-6">
          Access and search public dictionaries available to all users.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Dictionaries</CardTitle>
              <CardDescription>Available public dictionaries</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {isLoading && !publicGlossaries.length ? (
                <LoadingSpinner message="Loading dictionaries..." />
              ) : (
                publicGlossaries.map(glossary => (
                  <Button 
                    key={glossary.id}
                    variant={selectedGlossary === glossary.id ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setSelectedGlossary(glossary.id)}
                  >
                    <Bookmark className="mr-2 h-4 w-4" />
                    {glossary.name}
                  </Button>
                ))
              )}
              
              {!isLoading && publicGlossaries.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  <p>No public dictionaries available</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>
                {publicGlossaries.find(g => g.id === selectedGlossary)?.name || 'Dictionary Terms'}
              </CardTitle>
              <CardDescription>
                {publicGlossaries.find(g => g.id === selectedGlossary)?.description || 'Search and browse terms'}
              </CardDescription>
              
              <div className="mt-4 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search terms..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="max-h-[60vh] overflow-y-auto">
              {isLoading && !glossaryTerms.length ? (
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
                          <div className="font-medium text-gray-900">{term.term}</div>
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
              
              {!isLoading && filteredTerms.length === 0 && (
                <div className="text-center py-10 text-gray-500">
                  {searchTerm ? (
                    <p>No terms found matching "{searchTerm}"</p>
                  ) : (
                    <p>No terms available in this dictionary</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PublicDictionariesSection;
