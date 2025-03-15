
import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { GlossaryTerm } from '@/types/glossary';

interface TermFormValues {
  term: string;
  definition: string;
  category: string;
}

interface TermEditorProps {
  isOpen: boolean;
  isLoading: boolean;
  editingTerm?: GlossaryTerm | null;
  onOpenChange: (open: boolean) => void;
  onAddTerm: (values: TermFormValues) => Promise<void>;
  onUpdateTerm?: (termId: string, values: TermFormValues) => Promise<void>;
}

const TermEditor: React.FC<TermEditorProps> = ({
  isOpen,
  isLoading,
  editingTerm,
  onOpenChange,
  onAddTerm,
  onUpdateTerm
}) => {
  const form = useForm<TermFormValues>({
    defaultValues: {
      term: '',
      definition: '',
      category: ''
    }
  });

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      form.reset({
        term: '',
        definition: '',
        category: ''
      });
    }
  }, [isOpen, form]);

  // Set form values when editing a term
  useEffect(() => {
    if (editingTerm) {
      form.reset({
        term: editingTerm.term,
        definition: editingTerm.definition,
        category: editingTerm.category || ''
      });
    }
  }, [editingTerm, form]);

  const handleSubmit = async (values: TermFormValues) => {
    if (editingTerm && onUpdateTerm) {
      await onUpdateTerm(editingTerm.id, values);
    } else {
      await onAddTerm(values);
    }
  };

  const isEditMode = !!editingTerm;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Edit Term' : 'Add New Term'}</DialogTitle>
          <DialogDescription>
            {isEditMode ? 'Update term details' : 'Add a new term to your dictionary.'}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="term"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Term</FormLabel>
                  <FormControl>
                    <Input placeholder="API" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="definition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Definition</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Application Programming Interface" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="Technical" {...field} />
                  </FormControl>
                  <FormDescription>
                    Optional category to organize terms
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (isEditMode ? "Updating..." : "Adding...") : (isEditMode ? "Update Term" : "Add Term")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default TermEditor;
