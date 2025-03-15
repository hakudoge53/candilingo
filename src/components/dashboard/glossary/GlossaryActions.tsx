
import React from 'react';
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Dialog } from "@/components/ui/dialog";
import { Glossary } from "@/types/organization";
import DeleteConfirmationDialog from "./dialogs/DeleteConfirmationDialog";
import EditGlossaryDialog from "./dialogs/EditGlossaryDialog";
import NewGlossaryDialog from "./dialogs/NewGlossaryDialog";

interface GlossaryActionsProps {
  newGlossaryOpen: boolean;
  setNewGlossaryOpen: (open: boolean) => void;
  editGlossaryOpen: boolean;
  setEditGlossaryOpen: (open: boolean) => void;
  editingGlossary: Glossary | null;
  isSubmitting: boolean;
  onCreateGlossary: (name: string, description: string) => Promise<void>;
  onUpdateGlossary: (glossaryId: string, name: string, description: string) => Promise<void>;
  onDeleteGlossary: (glossaryId: string) => Promise<void>;
}

const GlossaryActions: React.FC<GlossaryActionsProps> = ({
  newGlossaryOpen,
  setNewGlossaryOpen,
  editGlossaryOpen,
  setEditGlossaryOpen,
  editingGlossary,
  isSubmitting,
  onCreateGlossary,
  onUpdateGlossary,
  onDeleteGlossary
}) => {
  return (
    <>
      {/* New Glossary Dialog */}
      <Dialog open={newGlossaryOpen} onOpenChange={setNewGlossaryOpen}>
        <NewGlossaryDialog
          isSubmitting={isSubmitting}
          onCreateGlossary={onCreateGlossary}
        />
      </Dialog>
      
      {/* Edit Glossary Dialog */}
      {editingGlossary && (
        <Dialog open={editGlossaryOpen} onOpenChange={setEditGlossaryOpen}>
          <EditGlossaryDialog
            glossary={editingGlossary}
            isSubmitting={isSubmitting}
            onUpdateGlossary={onUpdateGlossary}
          />
        </Dialog>
      )}
      
      {/* Delete Glossary Confirmation Dialog */}
      <AlertDialog>
        <DeleteConfirmationDialog
          title="Delete Glossary"
          description="Are you sure you want to delete this glossary? This will permanently delete all terms within it."
          onConfirm={() => editingGlossary && onDeleteGlossary(editingGlossary.id)}
        />
      </AlertDialog>
    </>
  );
};

export default GlossaryActions;
