
import React from 'react';
import { AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";

interface DeleteConfirmationDialogProps {
  title: string;
  description: string;
  onConfirm: () => Promise<void>;
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  title,
  description,
  onConfirm
}) => {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        <AlertDialogDescription>
          {description}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          className="bg-red-500 hover:bg-red-600"
          onClick={onConfirm}
        >
          Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default DeleteConfirmationDialog;
