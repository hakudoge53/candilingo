
import React from 'react';
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Glossary } from '@/types/organization';

interface GlossaryFormValues {
  name: string;
  description: string;
}

interface GlossaryCreatorProps {
  isOpen: boolean;
  isLoading: boolean;
  editingGlossary?: Glossary | null;
  onOpenChange: (open: boolean) => void;
  onCreateGlossary: (values: GlossaryFormValues) => Promise<void>;
  onUpdateGlossary?: (glossaryId: string, values: GlossaryFormValues) => Promise<void>;
}

const GlossaryCreator: React.FC<GlossaryCreatorProps> = ({
  isOpen,
  isLoading,
  editingGlossary,
  onOpenChange,
  onCreateGlossary,
  onUpdateGlossary
}) => {
  const form = useForm<GlossaryFormValues>({
    defaultValues: {
      name: editingGlossary?.name || '',
      description: editingGlossary?.description || ''
    }
  });

  // Update form when editing glossary changes
  React.useEffect(() => {
    if (editingGlossary) {
      form.reset({
        name: editingGlossary.name,
        description: editingGlossary.description || ''
      });
    } else {
      form.reset({
        name: '',
        description: ''
      });
    }
  }, [editingGlossary, form]);

  const handleSubmit = async (values: GlossaryFormValues) => {
    if (editingGlossary && onUpdateGlossary) {
      await onUpdateGlossary(editingGlossary.id, values);
    } else {
      await onCreateGlossary(values);
    }
  };

  const isEditMode = !!editingGlossary;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Edit Dictionary' : 'Create New Dictionary'}</DialogTitle>
          <DialogDescription>
            {isEditMode ? 'Update dictionary details' : 'Create a new custom dictionary for your organization.'}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dictionary Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter dictionary name" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter dictionary description" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button 
                type="submit" 
                disabled={isLoading}
              >
                {isLoading ? (isEditMode ? "Updating..." : "Creating...") : (isEditMode ? "Update Dictionary" : "Create Dictionary")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default GlossaryCreator;
