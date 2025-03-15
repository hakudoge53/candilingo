
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { TechLingoTerm } from "@/hooks/useTechLingoWiki";

interface TermCardProps {
  term: TechLingoTerm;
  isAdmin: boolean;
  onEdit: (term: TechLingoTerm) => void;
  onDelete: (id: string) => void;
}

const TermCard = ({ term, isAdmin, onEdit, onDelete }: TermCardProps) => {
  return (
    <Card key={term.id} className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">
              {term.term}
              <Badge className="ml-2" variant="outline">{term.difficulty || 'Beginner'}</Badge>
            </CardTitle>
            <CardDescription>{term.category || 'General'}</CardDescription>
          </div>
          
          {isAdmin && (
            <div className="flex space-x-1">
              <Button variant="ghost" size="icon" onClick={() => onEdit(term)}>
                <Edit className="h-4 w-4" />
              </Button>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-red-500">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Term</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete "{term.term}"? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      className="bg-red-500 hover:bg-red-600"
                      onClick={() => onDelete(term.id)}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">{term.definition}</p>
      </CardContent>
    </Card>
  );
};

export default TermCard;
