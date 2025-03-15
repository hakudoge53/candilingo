
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlossarySearchFilter from "@/components/glossary/GlossarySearchFilter";
import GlossaryCategoryGroup from "@/components/glossary/GlossaryCategoryGroup";
import { useGlossary } from "@/hooks/useGlossary";
import { publicGlossaryTerms } from "@/data/publicGlossaryTerms";

const Glossary = () => {
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-candilingo-pink">Candilingo Glossary</h1>
          <p className="text-gray-600 mb-8 text-lg">
            This comprehensive glossary contains technical terms and definitions used in software development, 
            making it easier to understand technical jargon in candidate resumes and job descriptions.
          </p>

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
      </div>
      <Footer />
    </div>
  );
};

export default Glossary;
