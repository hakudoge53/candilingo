
import React, { useState, useEffect } from 'react';
import { User } from '@/hooks/auth/types';
import { useTechLingoWiki } from '@/hooks/useTechLingoWiki';
import SearchBar from '@/components/techlingo/SearchBar';
import CategoryTabs from '@/components/techlingo/CategoryTabs';
import TermCard from '@/components/techlingo/TermCard';
import AddTermDialog from '@/components/techlingo/AddTermDialog';
import EditTermDialog from '@/components/techlingo/EditTermDialog';
import { toast } from 'sonner';
import { TechLingoTerm } from '@/hooks/useTechLingoWiki';

interface TechLingoWikiSectionProps {
  user: User;
  setLocalLoading: (loading: boolean) => void;
}

const TechLingoWikiSection: React.FC<TechLingoWikiSectionProps> = ({ user, setLocalLoading }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showAddTermDialog, setShowAddTermDialog] = useState(false);
  const [termToEdit, setTermToEdit] = useState<TechLingoTerm | null>(null);
  
  const { 
    terms, 
    isLoading,
    error,
    addTerm, 
    updateTerm, 
    deleteTerm,
    getTermsByCategory,
    searchTerms,
    getCategories,
    isAdding,
    isUpdating,
    isDeleting
  } = useTechLingoWiki();
  
  // Get all available categories
  const categories = getCategories ? getCategories() : [];
  
  // Group terms by category
  const groupedTerms: Record<string, TechLingoTerm[]> = getTermsByCategory ? getTermsByCategory() : {};
  
  // Check if user is admin (for adding/editing terms)
  const isAdmin = user?.role === 'admin' || user?.role === 'super_admin';
  
  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error.message}`);
    }
  }, [error]);
  
  const handleAddTerm = async (termData: any) => {
    setLocalLoading(true);
    try {
      await addTerm(termData.term, termData.definition, termData.category, termData.difficulty);
      toast.success("Term added successfully!");
      setShowAddTermDialog(false);
    } catch (error) {
      console.error("Error adding term:", error);
      toast.error("Failed to add term. Please try again.");
    }
    setLocalLoading(false);
  };
  
  const handleUpdateTerm = async (id: string, termData: any) => {
    setLocalLoading(true);
    try {
      await updateTerm(id, termData.term, termData.definition, termData.category, termData.difficulty);
      toast.success("Term updated successfully!");
      setTermToEdit(null);
    } catch (error) {
      console.error("Error updating term:", error);
      toast.error("Failed to update term. Please try again.");
    }
    setLocalLoading(false);
  };
  
  const handleDeleteTerm = async (id: string) => {
    setLocalLoading(true);
    try {
      await deleteTerm(id);
      toast.success("Term deleted successfully!");
    } catch (error) {
      console.error("Error deleting term:", error);
      toast.error("Failed to delete term. Please try again.");
    }
    setLocalLoading(false);
  };
  
  // Filter terms based on search query and active category
  const filteredTerms = terms.filter(term => {
    const matchesSearch = 
      term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      term.definition.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory ? term.category === activeCategory : true;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">TechLingo Wiki</h2>
        <p className="text-gray-600">
          Browse and search through technical terms and their definitions.
        </p>
      </div>
      
      <SearchBar 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isAdmin={isAdmin}
        onAddTermClick={() => setShowAddTermDialog(true)}
      />
      
      <CategoryTabs 
        groupedTerms={groupedTerms}
        categories={categories}
        searchQuery={searchQuery}
        isAdmin={isAdmin}
        onEditTerm={setTermToEdit}
        onDeleteTerm={handleDeleteTerm}
        onAddTerm={() => setShowAddTermDialog(true)}
      />
      
      {isLoading ? (
        <div className="py-10 text-center">Loading terms...</div>
      ) : filteredTerms.length === 0 ? (
        <div className="py-10 text-center bg-gray-50 rounded-lg">
          <p className="text-gray-500">No terms found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {filteredTerms.map(term => (
            <TermCard
              key={term.id}
              term={term}
              isAdmin={isAdmin}
              onEdit={() => setTermToEdit(term)}
              onDelete={() => handleDeleteTerm(term.id)}
            />
          ))}
        </div>
      )}
      
      {/* Add Term Dialog */}
      {showAddTermDialog && (
        <AddTermDialog
          isOpen={showAddTermDialog}
          onOpenChange={setShowAddTermDialog}
          onSubmit={handleAddTerm}
          isAdding={isAdding}
        />
      )}
      
      {/* Edit Term Dialog */}
      {termToEdit && (
        <EditTermDialog
          isOpen={!!termToEdit}
          onOpenChange={(open) => !open && setTermToEdit(null)}
          onSubmit={(data) => handleUpdateTerm(termToEdit.id, data)}
          isUpdating={isUpdating}
          selectedTerm={termToEdit}
        />
      )}
    </div>
  );
};

export default TechLingoWikiSection;
