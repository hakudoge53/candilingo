
import { Glossary } from '@/types/organization';
import { toast } from 'sonner';

export interface GlossaryFormValues {
  name: string;
  description: string;
}

export const useGlossaryOperations = (
  organizationId: string | undefined,
  glossaries: Glossary[],
  activeGlossary: Glossary | null,
  setActiveGlossary: (glossary: Glossary) => void,
  createGlossary: (name: string, description?: string) => Promise<Glossary | null>,
  updateGlossary: (glossaryId: string, updates: Partial<Glossary>) => Promise<Glossary | null>,
  deleteGlossary: (glossaryId: string) => Promise<void>,
  setIsGlossaryDialogOpen: (isOpen: boolean) => void,
  setEditingGlossary: (glossary: Glossary | null) => void
) => {
  // Handle glossary selection
  const handleSelectGlossary = (glossaryId: string) => {
    const selected = glossaries.find(g => g.id === glossaryId);
    if (selected) {
      setActiveGlossary(selected);
    }
  };

  // Handle edit glossary
  const handleEditGlossaryClick = (glossary: Glossary) => {
    setEditingGlossary(glossary);
    setIsGlossaryDialogOpen(true);
  };

  // Create new glossary
  const handleCreateGlossary = async (values: GlossaryFormValues) => {
    try {
      const newGlossary = await createGlossary(values.name, values.description);
      if (newGlossary) {
        setIsGlossaryDialogOpen(false);
        toast.success("Dictionary created successfully");
      }
    } catch (error) {
      console.error("Error creating glossary:", error);
      toast.error("Failed to create dictionary");
    }
  };

  // Update existing glossary
  const handleUpdateGlossary = async (glossaryId: string, values: GlossaryFormValues) => {
    try {
      const updated = await updateGlossary(glossaryId, {
        name: values.name,
        description: values.description
      });
      
      if (updated) {
        setIsGlossaryDialogOpen(false);
        setEditingGlossary(null);
        toast.success("Dictionary updated successfully");
      }
    } catch (error) {
      console.error("Error updating glossary:", error);
      toast.error("Failed to update dictionary");
    }
  };

  // Handle delete glossary
  const handleDeleteGlossary = async (glossaryId: string) => {
    try {
      await deleteGlossary(glossaryId);
      toast.success("Dictionary deleted successfully");
    } catch (error) {
      console.error("Error deleting glossary:", error);
      toast.error("Failed to delete dictionary");
    }
  };

  return {
    handleSelectGlossary,
    handleEditGlossaryClick,
    handleCreateGlossary,
    handleUpdateGlossary,
    handleDeleteGlossary
  };
};
