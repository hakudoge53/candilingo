
import React from 'react';
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface GlossaryFormValues {
  name: string;
  description: string;
}

interface GlossaryCreatorProps {
  isOpen: boolean;
  isLoading: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateGlossary: (values: GlossaryFormValues) => Promise<void>;
}

const GlossaryCreator: React.FC<GlossaryCreatorProps> = ({
  isOpen,
  isLoading,
  onOpenChange,
  onCreateGlossary
}) => {
  const form = useForm<GlossaryFormValues>({
    defaultValues: {
      name: '',
      description: ''
    }
  });

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Dictionary</DialogTitle>
          <DialogDescription>
            Add a new dictionary for your organization.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onCreateGlossary)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Technical Terms" {...field} />
                  </FormControl>
                  <FormDescription>
                    The name of your dictionary
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="A collection of technical terms for our team" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Short description of the dictionary's purpose
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Dictionary"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default GlossaryCreator;
