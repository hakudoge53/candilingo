
import React, { useState, useEffect } from 'react';
import { Glossary, GlossaryTerm } from '@/types/organization';
import { toast } from 'sonner';

// Import refactored components
import GlossaryHeader from './glossary/GlossaryHeader';
import EmptyGlossaryState from './glossary/EmptyGlossaryState';
import GlossaryTabs from './glossary/GlossaryTabs';
import GlossaryContent from './glossary/GlossaryContent';
import GlossaryActions from './glossary/GlossaryActions';
import GlossaryTermActions from './glossary/GlossaryTermActions';

export interface GlossaryPanelProps {
  glossaries: Glossary[];
  activeGlossary: Glossary | null;
  setActiveGlossary: (glossary: Glossary) => void;
  terms: GlossaryTerm[];
  addTerm: (glossaryId: string, term: string, definition: string, category?: string) => Promise<GlossaryTerm | null>;
  updateTerm: (termId: string, updates: Partial<GlossaryTerm>) => Promise<GlossaryTerm | null>;
  deleteTerm: (termId: string) => Promise<void>;
  addGlossary?: (name: string, description?: string) => Promise<Glossary | null>;
  updateGlossary: (glossaryId: string, updates: Partial<Glossary>) => Promise<Glossary | null>;
  deleteGlossary: (glossaryId: string) => Promise<void>;
  isLoadingGlossaries?: boolean;
  isLoadingTerms?: boolean;
}

const GlossaryPanel = ({ 
  glossaries, 
  activeGlossary,
  setActiveGlossary,
  terms,
  addTerm,
  updateTerm,
  deleteTerm,
  addGlossary,
  updateGlossary,
  deleteGlossary,
  isLoadingGlossaries,
  isLoadingTerms
}: GlossaryPanelProps) => {
  const [newGlossaryOpen, setNewGlossaryOpen] = useState(false);
  const [editGlossaryOpen, setEditGlossaryOpen] = useState(false);
  const [newTermOpen, setNewTermOpen] = useState(false);
  const [editTermOpen, setEditTermOpen] = useState(false);
  const [editingGlossary, setEditingGlossary] = useState<Glossary | null>(null);
  const [editingTerm, setEditingTerm] = useState<GlossaryTerm | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Set active glossary when glossaries are loaded and none is selected
  useEffect(() => {
    if (glossaries.length > 0 && !activeGlossary) {
      setActiveGlossary(glossaries[0]);
    }
  }, [glossaries, activeGlossary, setActiveGlossary]);

  const handleCreateGlossary = async (name: string, description: string) => {
    if (!name.trim() || !addGlossary) return;
    
    setIsSubmitting(true);
    try {
      const glossary = await addGlossary(name, description);
      if (glossary) {
        toast.success("Glossary created successfully!");
        
        // Set the new glossary as active
        setActiveGlossary(glossary);
      }
    } catch (error) {
      console.error("Error creating glossary:", error);
      toast.error("Failed to create glossary");
    } finally {
      setIsSubmitting(false);
      setNewGlossaryOpen(false);
    }
  };

  const handleUpdateGlossary = async (glossaryId: string, name: string, description: string) => {
    if (!name.trim() || !glossaryId) return;
    
    setIsSubmitting(true);
    try {
      const updatedGlossary = await updateGlossary(glossaryId, {
        name,
        description
      });
      
      if (updatedGlossary) {
        toast.success("Glossary updated successfully!");
        
        // Update active glossary if it's the one that was edited
        if (activeGlossary && activeGlossary.id === glossaryId) {
          setActiveGlossary(updatedGlossary);
        }
      }
    } catch (error) {
      console.error("Error updating glossary:", error);
      toast.error("Failed to update glossary");
    } finally {
      setIsSubmitting(false);
      setEditGlossaryOpen(false);
    }
  };

  const handleDeleteGlossary = async (glossaryId: string) => {
    try {
      await deleteGlossary(glossaryId);
      toast.success("Glossary deleted successfully!");
      
      // If the active glossary was deleted, set a new active glossary
      if (activeGlossary && activeGlossary.id === glossaryId) {
        const remainingGlossaries = glossaries.filter(g => g.id !== glossaryId);
        if (remainingGlossaries.length > 0) {
          setActiveGlossary(remainingGlossaries[0]);
        } else {
          setActiveGlossary(null);
        }
      }
    } catch (error) {
      console.error("Error deleting glossary:", error);
      toast.error("Failed to delete glossary");
    }
  };

  const handleAddTerm = async (term: string, definition: string, category: string) => {
    if (!term.trim() || !definition.trim() || !activeGlossary) return;
    
    setIsSubmitting(true);
    try {
      const newTerm = await addTerm(
        activeGlossary.id, 
        term, 
        definition, 
        category.trim() || undefined
      );
      
      if (newTerm) {
        toast.success("Term added successfully!");
      }
    } catch (error) {
      console.error("Error adding term:", error);
      toast.error("Failed to add term");
    } finally {
      setIsSubmitting(false);
      setNewTermOpen(false);
    }
  };

  const handleUpdateTerm = async (termId: string, term: string, definition: string, category: string) => {
    if (!term.trim() || !definition.trim() || !termId) return;
    
    setIsSubmitting(true);
    try {
      const updatedTerm = await updateTerm(termId, {
        term,
        definition,
        category: category.trim() || undefined
      });
      
      if (updatedTerm) {
        toast.success("Term updated successfully!");
      }
    } catch (error) {
      console.error("Error updating term:", error);
      toast.error("Failed to update term");
    } finally {
      setIsSubmitting(false);
      setEditTermOpen(false);
    }
  };

  const handleEditTerm = (term: GlossaryTerm) => {
    setEditingTerm(term);
    setEditTermOpen(true);
  };

  const handleDeleteTerm = async (termId: string) => {
    try {
      await deleteTerm(termId);
      toast.success("Term deleted successfully!");
    } catch (error) {
      console.error("Error deleting term:", error);
      toast.error("Failed to delete term");
    }
  };

  const handleEditGlossary = (glossary: Glossary) => {
    setEditingGlossary(glossary);
    setEditGlossaryOpen(true);
  };

  const handleNewGlossaryClick = () => {
    setNewGlossaryOpen(true);
  };

  const handleAddTermClick = () => {
    setNewTermOpen(true);
  };

  if (isLoadingGlossaries) {
    return <div className="flex items-center justify-center h-64">Loading glossaries...</div>;
  }

  return (
    <div className="space-y-6">
      <GlossaryHeader 
        activeGlossary={activeGlossary}
        onNewGlossaryOpen={handleNewGlossaryClick} 
      />

      {glossaries.length === 0 ? (
        <EmptyGlossaryState onCreateClick={handleNewGlossaryClick} />
      ) : (
        <GlossaryTabs 
          glossaries={glossaries}
          activeGlossary={activeGlossary}
          setActiveGlossary={setActiveGlossary}
          onEditGlossary={handleEditGlossary}
          onDeleteGlossary={handleDeleteGlossary}
        >
          {activeGlossary && (
            <GlossaryContent
              glossary={activeGlossary}
              terms={terms}
              isLoading={isLoadingTerms}
              onAddTermClick={handleAddTermClick}
              onEditTerm={handleEditTerm}
              onDeleteTerm={handleDeleteTerm}
            />
          )}
        </GlossaryTabs>
      )}

      {/* Dialog components for actions */}
      <GlossaryActions
        newGlossaryOpen={newGlossaryOpen}
        setNewGlossaryOpen={setNewGlossaryOpen}
        editGlossaryOpen={editGlossaryOpen}
        setEditGlossaryOpen={setEditGlossaryOpen}
        editingGlossary={editingGlossary}
        isSubmitting={isSubmitting}
        onCreateGlossary={handleCreateGlossary}
        onUpdateGlossary={handleUpdateGlossary}
        onDeleteGlossary={handleDeleteGlossary}
      />

      <GlossaryTermActions
        newTermOpen={newTermOpen}
        setNewTermOpen={setNewTermOpen}
        editTermOpen={editTermOpen}
        setEditTermOpen={setEditTermOpen}
        editTermId={editingTerm?.id || null}
        editingTerm={editingTerm}
        isSubmitting={isSubmitting}
        onAddTerm={handleAddTerm}
        onUpdateTerm={handleUpdateTerm}
        onDeleteTerm={handleDeleteTerm}
      />
    </div>
  );
};

export default GlossaryPanel;
