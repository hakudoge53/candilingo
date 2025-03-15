
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, Plus, Trash2, Edit } from 'lucide-react';
import { Glossary } from '@/types/organization';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

interface GlossaryListProps {
  glossaries: Glossary[];
  selectedGlossaryId: string | null;
  isLoading: boolean;
  onSelectGlossary: (glossaryId: string) => void;
  onCreateGlossary: () => void;
  onEditGlossary?: (glossary: Glossary) => void;
  onDeleteGlossary?: (glossaryId: string) => void;
}

const GlossaryList: React.FC<GlossaryListProps> = ({
  glossaries,
  selectedGlossaryId,
  isLoading,
  onSelectGlossary,
  onCreateGlossary,
  onEditGlossary,
  onDeleteGlossary
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Dictionaries</CardTitle>
        <CardDescription>Dictionaries your organization owns</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {isLoading && !glossaries.length ? (
          <LoadingSpinner message="Loading dictionaries..." />
        ) : (
          glossaries.map(glossary => (
            <div key={glossary.id} className="flex items-center justify-between">
              <Button 
                variant={selectedGlossaryId === glossary.id ? "default" : "ghost"}
                className="w-full justify-start text-left"
                onClick={() => onSelectGlossary(glossary.id)}
              >
                <Lock className="mr-2 h-4 w-4" />
                {glossary.name}
              </Button>
              
              {(onEditGlossary || onDeleteGlossary) && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 ml-1">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {onEditGlossary && (
                      <DropdownMenuItem onClick={() => onEditGlossary(glossary)}>
                        <Edit className="mr-2 h-4 w-4" /> Edit Dictionary
                      </DropdownMenuItem>
                    )}
                    {onDeleteGlossary && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-500">
                            <Trash2 className="mr-2 h-4 w-4" /> Delete Dictionary
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Dictionary</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{glossary.name}"? This will permanently delete 
                              all terms in this dictionary. This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              className="bg-red-500 hover:bg-red-600"
                              onClick={() => onDeleteGlossary(glossary.id)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          ))
        )}
        
        {!isLoading && glossaries.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            <p>No private dictionaries available</p>
            <Button 
              variant="outline" 
              className="mt-2"
              onClick={onCreateGlossary}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create first dictionary
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GlossaryList;
