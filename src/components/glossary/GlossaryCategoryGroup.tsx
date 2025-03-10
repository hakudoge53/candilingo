
import React from 'react';
import { GlossaryTerm } from '@/types/glossary';
import GlossaryTermItem from './GlossaryTermItem';

interface GlossaryCategoryGroupProps {
  category: string;
  terms: GlossaryTerm[];
  highlightKeywordsInDefinition: (definition: string) => { __html: string };
  highlightedTerms: Record<string, boolean>;
  jumpToTerm: (term: string) => void;
}

const GlossaryCategoryGroup = ({ 
  category, 
  terms, 
  highlightKeywordsInDefinition, 
  highlightedTerms, 
  jumpToTerm 
}: GlossaryCategoryGroupProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
      <h2 className="text-xl font-semibold mb-4 text-techlex-blue">{category}</h2>
      <div className="space-y-4">
        {terms.map((term) => (
          <GlossaryTermItem
            key={term.term}
            term={term}
            highlightKeywordsInDefinition={highlightKeywordsInDefinition}
            highlightedTerms={highlightedTerms}
            jumpToTerm={jumpToTerm}
          />
        ))}
      </div>
    </div>
  );
};

export default GlossaryCategoryGroup;
