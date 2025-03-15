
import React from 'react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusCircle, MoreHorizontal, FileEdit, Trash2 } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Glossary, GlossaryTerm } from '@/types/organization';

interface GlossaryContentProps {
  glossary: Glossary;
  terms: GlossaryTerm[];
  onAddTermClick: () => void;
  onEditTerm: (term: GlossaryTerm) => void;
  onDeleteTerm: (termId: string) => void;
}

const GlossaryContent: React.FC<GlossaryContentProps> = ({
  glossary,
  terms,
  onAddTermClick,
  onEditTerm,
  onDeleteTerm,
}) => {
  // Group terms by category for better display
  const groupedTerms = terms.reduce((groups, term) => {
    const category = term.category || 'Uncategorized';
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(term);
    return groups;
  }, {} as Record<string, GlossaryTerm[]>);

  // Sort categories alphabetically
  const sortedCategories = Object.keys(groupedTerms).sort();

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-semibold">{glossary.name}</h3>
          {glossary.description && (
            <p className="text-gray-500 mt-1">{glossary.description}</p>
          )}
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-techlex-blue" onClick={onAddTermClick}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Term
            </Button>
          </DialogTrigger>
        </Dialog>
      </div>
      
      {terms.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No terms in this glossary yet. Add some terms to get started.</p>
        </div>
      ) : (
        <ScrollArea className="h-[500px] pr-4">
          {sortedCategories.map((category) => (
            <div key={category} className="mb-6">
              <h4 className="text-lg font-medium mb-3 text-techlex-blue">{category}</h4>
              <div className="space-y-4">
                {groupedTerms[category].map((term) => (
                  <div key={term.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <h5 className="text-md font-semibold">{term.term}</h5>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => onEditTerm(term)}>
                            <FileEdit className="mr-2 h-4 w-4" />
                            Edit Term
                          </DropdownMenuItem>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-500">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Term
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <p className="text-gray-600 mt-2">{term.definition}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </ScrollArea>
      )}
    </>
  );
};

export default GlossaryContent;
