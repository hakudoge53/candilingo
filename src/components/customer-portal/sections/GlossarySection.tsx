
import React from 'react';
import { User } from '@/hooks/auth/types';
import { useGlossary } from "@/hooks/useGlossary";
import { publicGlossaryTerms } from "@/data/publicGlossaryTerms";
import GlossarySearchFilter from "@/components/glossary/GlossarySearchFilter";
import GlossaryCategoryGroup from "@/components/glossary/GlossaryCategoryGroup";

interface GlossarySectionProps {
  user: User | null;
  setLocalLoading: (loading: boolean) => void;
}

const GlossarySection: React.FC<GlossarySectionProps> = ({ user, setLocalLoading }) => {
  const {
    searchTerm,
    setSearchTerm,
    activeCategory,
    setActiveCategory,
    highlightedTerms,
    sortedCategories,
    filteredCategories,
    getFilteredTerms,
    highlightKeywordsInDefinition,
    jumpToTerm,
    resetFilters
  } = useGlossary(publicGlossaryTerms);

  return (
    <div className="space-y-6">
      <div className="flex justify-center mb-4">
        <img 
          src="/public/lovable-uploads/cbe6d14b-3d9f-4814-af61-b96347790cb1.png" 
          alt="Candilingo" 
          className="h-10"
        />
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Candilingo Glossary</h2>
        <p className="text-gray-600 mb-6">
          This comprehensive glossary contains technical terms and definitions used in software development, 
          making it easier to understand technical jargon in candidate resumes and job descriptions.
        </p>
      </div>

      {/* Search and Filter */}
      <GlossarySearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        categories={sortedCategories}
        resetFilters={resetFilters}
      />

      <div className="glossary-fade-in space-y-8 mb-12">
        {filteredCategories.map((category) => (
          <GlossaryCategoryGroup
            key={category}
            category={category}
            terms={getFilteredTerms(category)}
            highlightKeywordsInDefinition={highlightKeywordsInDefinition}
            highlightedTerms={highlightedTerms}
            jumpToTerm={jumpToTerm}
          />
        ))}
      </div>
    </div>
  );
};

export default GlossarySection;
