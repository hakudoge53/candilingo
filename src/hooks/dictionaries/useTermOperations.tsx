
import { GlossaryTerm } from '@/types/glossary';
import { toast } from 'sonner';

export interface TermFormValues {
  term: string;
  definition: string;
  category: string;
}

export const useTermOperations = (
  activeGlossary: { id: string } | null,
  addTerm: (glossaryId: string, term: string, definition: string, category?: string) => Promise<GlossaryTerm | null>,
  updateTerm: (termId: string, updates: Partial<GlossaryTerm>) => Promise<GlossaryTerm | null>,
  deleteTerm: (termId: string) => Promise<void>,
  setIsTermDialogOpen: (isOpen: boolean) => void,
  setEditingTerm: (term: GlossaryTerm | null) => void
) => {
  // Handle edit term button click
  const handleEditTermClick = (term: GlossaryTerm) => {
    setEditingTerm(term);
    setIsTermDialogOpen(true);
  };

  // Handle add new term button click
  const handleAddTermClick = () => {
    setEditingTerm(null);
    setIsTermDialogOpen(true);
  };

  // Add new term to glossary
  const handleAddTerm = async (values: TermFormValues) => {
    if (!activeGlossary?.id) {
      toast.error("No dictionary selected");
      return;
    }
    
    try {
      const newTerm = await addTerm(
        activeGlossary.id, 
        values.term, 
        values.definition, 
        values.category || 'General'
      );
      
      if (newTerm) {
        setIsTermDialogOpen(false);
        toast.success("Term added successfully");
      }
    } catch (error) {
      console.error("Error adding term:", error);
      toast.error("Failed to add term");
    }
  };

  // Update an existing term
  const handleUpdateTerm = async (termId: string, values: TermFormValues) => {
    try {
      const updated = await updateTerm(termId, {
        term: values.term,
        definition: values.definition,
        category: values.category || undefined
      });
      
      if (updated) {
        setIsTermDialogOpen(false);
        setEditingTerm(null);
        toast.success("Term updated successfully");
      }
    } catch (error) {
      console.error("Error updating term:", error);
      toast.error("Failed to update term");
    }
  };

  // Handle delete term
  const handleDeleteTerm = async (termId: string) => {
    try {
      await deleteTerm(termId);
      toast.success("Term deleted successfully");
    } catch (error) {
      console.error("Error deleting term:", error);
      toast.error("Failed to delete term");
    }
  };

  return {
    handleEditTermClick,
    handleAddTermClick,
    handleAddTerm,
    handleUpdateTerm,
    handleDeleteTerm
  };
};
