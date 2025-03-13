
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import LoginForm from './LoginForm';

interface LoginDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  setIsLoading: (loading: boolean) => void;
  title?: string;
  description?: string;
}

const LoginDialog = ({ 
  isOpen, 
  setIsOpen, 
  setIsLoading,
  title = "Sign In to Candilingo",
  description = "Sign in to your account to access all features."
}: LoginDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <LoginForm setIsLoading={setIsLoading} onSuccess={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
