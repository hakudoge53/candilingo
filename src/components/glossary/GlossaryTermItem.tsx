
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { GlossaryTerm } from '@/types/glossary';

interface GlossaryTermItemProps {
  term: GlossaryTerm;
  highlightKeywordsInDefinition: (definition: string) => { __html: string };
  highlightedTerms: Record<string, boolean>;
  jumpToTerm: (term: string) => void;
}

const GlossaryTermItem = ({
  term,
  highlightKeywordsInDefinition,
  highlightedTerms,
  jumpToTerm
}: GlossaryTermItemProps) => {
  return (
    <div 
      id={`term-${term.term.replace(/\s+/g, '-')}`} 
      className={`group transition-all duration-300 ${highlightedTerms[term.term] ? 'bg-amber-50' : ''}`}
    >
      <div className="flex items-start">
        <Badge variant="default" className="mt-1 bg-techlex-pink text-white">
          {term.term}
        </Badge>
        <div className="ml-3">
          <div 
            className="text-gray-700"
            dangerouslySetInnerHTML={highlightKeywordsInDefinition(term.definition)}
          />
          
          {/* Related Terms */}
          {term.relatedTerms && term.relatedTerms.length > 0 && (
            <div className="mt-2">
              <p className="text-xs text-gray-500">Related: </p>
              <div className="flex flex-wrap gap-1 mt-1">
                {term.relatedTerms.map(relatedTerm => (
                  <Badge 
                    key={relatedTerm} 
                    variant="outline"
                    className="text-xs cursor-pointer hover:bg-gray-100"
                    onClick={() => jumpToTerm(relatedTerm)}
                  >
                    {relatedTerm}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Separator className="mt-4 opacity-50" />
    </div>
  );
};

export default GlossaryTermItem;
