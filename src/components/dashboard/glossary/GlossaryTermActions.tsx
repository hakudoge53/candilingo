
import React from 'react';
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Dialog } from "@/components/ui/dialog";
import { GlossaryTerm } from "@/types/organization";
import DeleteConfirmationDialog from "./dialogs/DeleteConfirmationDialog";
import EditTermDialog from "./dialogs/EditTermDialog";
import NewTermDialog from "./dialogs/NewTermDialog";

interface GlossaryTermActionsProps {
  newTermOpen: boolean;
  setNewTermOpen: (open: boolean) => void;
  editTermOpen: boolean;
  setEditTermOpen: (open: boolean) => void;
  editTermId: string | null;
  editingTerm: GlossaryTerm | null;
  isSubmitting: boolean;
  onAddTerm: (term: string, definition: string, category: string) => Promise<void>;
  onUpdateTerm: (termId: string, term: string, definition: string, category: string) => Promise<void>;
  onDeleteTerm: (termId: string) => Promise<void>;
}

const GlossaryTermActions: React.FC<GlossaryTermActionsProps> = ({
  newTermOpen,
  setNewTermOpen,
  editTermOpen,
  setEditTermOpen,
  editingTerm,
  isSubmitting,
  onAddTerm,
  onUpdateTerm,
  onDeleteTerm
}) => {
  return (
    <>
      {/* New Term Dialog */}
      <Dialog open={newTermOpen} onOpenChange={setNewTermOpen}>
        <NewTermDialog
          isSubmitting={isSubmitting}
          onAddTerm={onAddTerm}
        />
      </Dialog>
      
      {/* Edit Term Dialog */}
      {editingTerm && (
        <Dialog open={editTermOpen} onOpenChange={setEditTermOpen}>
          <EditTermDialog
            term={editingTerm}
            isSubmitting={isSubmitting}
            onUpdateTerm={onUpdateTerm}
          />
        </Dialog>
      )}
      
      {/* Delete Term Confirmation Dialog */}
      <AlertDialog>
        <DeleteConfirmationDialog
          title="Delete Term"
          description="Are you sure you want to delete this term? This action cannot be undone."
          onConfirm={() => editingTerm && onDeleteTerm(editingTerm.id)}
        />
      </AlertDialog>
    </>
  );
};

export default GlossaryTermActions;
