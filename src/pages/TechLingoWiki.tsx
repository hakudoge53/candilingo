
import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTechLingoWiki, TechLingoTerm } from "@/hooks/useTechLingoWiki";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/auth/useAuth";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import AddTermDialog from '@/components/techlingo/AddTermDialog';
import EditTermDialog from '@/components/techlingo/EditTermDialog';
import SearchBar from '@/components/techlingo/SearchBar';
import CategoryTabs from '@/components/techlingo/CategoryTabs';

const TechLingoWiki = () => {
  const { terms, isLoading, addTerm, updateTerm, deleteTerm, isAdding, isUpdating, isDeleting } = useTechLingoWiki();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState<TechLingoTerm | null>(null);
  const { activeUser } = useAuth();
  
  const isAdmin = activeUser?.id && activeUser.membership_tier === 'Admin';

  // Group terms by category
  const groupedTerms = terms.reduce((groups: Record<string, TechLingoTerm[]>, term) => {
    const category = term.category || 'General';
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(term);
    return groups;
  }, {});

  const categories = Object.keys(groupedTerms).sort();

  // Handle adding a term
  const handleAddTerm = (values: any) => {
    addTerm(values.term, values.definition, values.category, values.difficulty);
    setIsAddDialogOpen(false);
  };

  // Handle editing a term
  const editTerm = (term: TechLingoTerm) => {
    setSelectedTerm(term);
    setIsEditDialogOpen(true);
  };

  // Handle updating a term
  const handleUpdateTerm = (values: any) => {
    if (selectedTerm) {
      updateTerm(selectedTerm.id, values.term, values.definition, values.category, values.difficulty);
      setIsEditDialogOpen(false);
    }
  };

  // Handle deleting a term
  const handleDeleteTerm = (id: string) => {
    deleteTerm(id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-candilingo-pink">TechLingo Wiki</h1>
          <p className="text-gray-600 mb-8 text-lg">
            Navigate technical terms and explanations to better understand the language of technology.
          </p>

          {/* Search Bar and Add Term Button */}
          <SearchBar 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            isAdmin={isAdmin}
            onAddTermClick={() => setIsAddDialogOpen(true)}
          />

          {/* Content */}
          {isLoading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner message="Loading tech terms..." />
            </div>
          ) : terms.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <p className="text-center text-gray-500 mb-4">
                  No terms in the database yet.
                </p>
                {isAdmin && (
                  <button 
                    className="px-4 py-2 bg-candilingo-pink text-white rounded-md hover:bg-candilingo-pink/90"
                    onClick={() => setIsAddDialogOpen(true)}
                  >
                    Add Your First Term
                  </button>
                )}
              </CardContent>
            </Card>
          ) : (
            <CategoryTabs 
              groupedTerms={groupedTerms}
              categories={categories}
              searchQuery={searchQuery}
              isAdmin={isAdmin}
              onEditTerm={editTerm}
              onDeleteTerm={handleDeleteTerm}
              onAddTerm={() => setIsAddDialogOpen(true)}
            />
          )}

          {/* Add Term Dialog */}
          <AddTermDialog 
            isOpen={isAddDialogOpen}
            onOpenChange={setIsAddDialogOpen}
            onSubmit={handleAddTerm}
            isAdding={isAdding}
          />

          {/* Edit Term Dialog */}
          <EditTermDialog 
            isOpen={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            onSubmit={handleUpdateTerm}
            isUpdating={isUpdating}
            selectedTerm={selectedTerm}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TechLingoWiki;
