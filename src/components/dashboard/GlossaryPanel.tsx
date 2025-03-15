
import React, { useState } from 'react';
import { Glossary, GlossaryTerm } from '@/types/organization';

// Import refactored components
import GlossaryHeader from './glossary/GlossaryHeader';
import EmptyGlossaryState from './glossary/EmptyGlossaryState';
import GlossaryTabs from './glossary/GlossaryTabs';
import GlossaryContent from './glossary/GlossaryContent';
import GlossaryActions from './glossary/GlossaryActions';
import GlossaryTermActions from './glossary/GlossaryTermActions';

interface GlossaryPanelProps {
  glossaries: Glossary[];
  activeGlossary: Glossary | null;
  setActiveGlossary: (glossary: Glossary) => void;
  terms: GlossaryTerm[];
  createGlossary: (name: string, description?: string) => Promise<Glossary | null>;
  updateGlossary: (glossaryId: string, updates: Partial<Glossary>) => Promise<Glossary | null>;
  deleteGlossary: (glossaryId: string) => Promise<void>;
  addTerm: (glossaryId: string, term: string, definition: string, category?: string) => Promise<GlossaryTerm | null>;
  updateTerm: (termId: string, updates: Partial<GlossaryTerm>) => Promise<GlossaryTerm | null>;
  deleteTerm: (termId: string) => Promise<void>;
  organizationId: string;
  isLoading: boolean;
}

const GlossaryPanel = ({ 
  glossaries, 
  activeGlossary,
  setActiveGlossary,
  terms,
  createGlossary, 
  updateGlossary,
  deleteGlossary,
  addTerm,
  updateTerm,
  deleteTerm,
  isLoading 
}: GlossaryPanelProps) => {
  const [newGlossaryOpen, setNewGlossaryOpen] = useState(false);
  const [editGlossaryOpen, setEditGlossaryOpen] = useState(false);
  const [newTermOpen, setNewTermOpen] = useState(false);
  const [editTermOpen, setEditTermOpen] = useState(false);
  const [editingGlossary, setEditingGlossary] = useState<Glossary | null>(null);
  const [editingTerm, setEditingTerm] = useState<GlossaryTerm | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateGlossary = async (name: string, description: string) => {
    if (!name.trim()) return;
    
    setIsSubmitting(true);
    await createGlossary(name, description);
    setIsSubmitting(false);
    setNewGlossaryOpen(false);
  };

  const handleUpdateGlossary = async (glossaryId: string, name: string, description: string) => {
    if (!name.trim() || !glossaryId) return;
    
    setIsSubmitting(true);
    await updateGlossary(glossaryId, {
      name,
      description
    });
    setIsSubmitting(false);
    setEditGlossaryOpen(false);
  };

  const handleDeleteGlossary = async (glossaryId: string) => {
    await deleteGlossary(glossaryId);
  };

  const handleAddTerm = async (term: string, definition: string, category: string) => {
    if (!term.trim() || !definition.trim() || !activeGlossary) return;
    
    setIsSubmitting(true);
    await addTerm(
      activeGlossary.id, 
      term, 
      definition, 
      category.trim() || undefined
    );
    setIsSubmitting(false);
    setNewTermOpen(false);
  };

  const handleUpdateTerm = async (termId: string, term: string, definition: string, category: string) => {
    if (!term.trim() || !definition.trim() || !termId) return;
    
    setIsSubmitting(true);
    await updateTerm(termId, {
      term,
      definition,
      category: category.trim() || undefined
    });
    setIsSubmitting(false);
    setEditTermOpen(false);
  };

  const handleEditTerm = (term: GlossaryTerm) => {
    setEditingTerm(term);
    setEditTermOpen(true);
  };

  const handleDeleteTerm = async (termId: string) => {
    await deleteTerm(termId);
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

  return (
    <div className="space-y-6">
      <GlossaryHeader onNewGlossaryOpen={handleNewGlossaryClick} />

      {glossaries.length === 0 ? (
        <EmptyGlossaryState />
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
