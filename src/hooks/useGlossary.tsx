
import { useState, useEffect } from 'react';
import { GlossaryTerm } from '@/types/glossary';

export const useGlossary = (glossaryTerms: GlossaryTerm[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [highlightedTerms, setHighlightedTerms] = useState<Record<string, boolean>>({});

  // Group terms by category
  const groupedTerms = glossaryTerms.reduce((acc, term) => {
    if (!acc[term.category]) {
      acc[term.category] = [];
    }
    acc[term.category].push(term);
    return acc;
  }, {} as Record<string, GlossaryTerm[]>);

  // Sort categories alphabetically
  const sortedCategories = Object.keys(groupedTerms).sort();

  // Handle filtering terms
  const filteredCategories = activeCategory 
    ? [activeCategory] 
    : searchTerm 
      ? sortedCategories.filter(category => 
          groupedTerms[category].some(term => 
            term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
            term.definition.toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      : sortedCategories;

  // Filtered terms based on search input and active category
  const getFilteredTerms = (category: string) => {
    return searchTerm
      ? groupedTerms[category].filter(term => 
          term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
          term.definition.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : groupedTerms[category];
  };

  // Function to highlight keywords in definition
  const highlightKeywordsInDefinition = (definition: string) => {
    let processedDefinition = definition;
    
    // Sort terms by length (descending) to avoid partial matches
    const sortedTerms = glossaryTerms
      .map(term => term.term)
      .sort((a, b) => b.length - a.length);
    
    // Create a temporary element to work with HTML safely
    const tempDiv = document.createElement('div');
    tempDiv.textContent = processedDefinition;
    processedDefinition = tempDiv.innerHTML;
    
    // Create a map of all term matches in the definition
    const matches: {term: string, index: number}[] = [];
    
    sortedTerms.forEach(term => {
      const termRegex = new RegExp(`\\b${term}\\b`, 'gi');
      let match;
      
      while ((match = termRegex.exec(processedDefinition)) !== null) {
        matches.push({
          term,
          index: match.index
        });
      }
    });
    
    // Sort matches by their position in descending order to avoid index shifting
    matches.sort((a, b) => b.index - a.index);
    
    // Replace each match with a span
    matches.forEach(match => {
      const termObject = glossaryTerms.find(t => 
        t.term.toLowerCase() === match.term.toLowerCase()
      );
      
      if (termObject) {
        const before = processedDefinition.substring(0, match.index);
        const after = processedDefinition.substring(match.index + match.term.length);
        
        processedDefinition = `${before}<span class="cursor-pointer font-medium text-techlex-blue hover:underline" data-term="${match.term}">${match.term}</span>${after}`;
      }
    });
    
    return { __html: processedDefinition };
  };

  // Jump to a term when clicked in the related terms or in highlighted definition
  const jumpToTerm = (term: string) => {
    // Find the term in the glossary
    const foundTerm = glossaryTerms.find(t => t.term.toLowerCase() === term.toLowerCase());
    if (foundTerm) {
      setActiveCategory(foundTerm.category);
      setSearchTerm(term);
      
      // Highlight the term temporarily
      setHighlightedTerms(prev => ({ ...prev, [term]: true }));
      
      // Scroll to the term
      setTimeout(() => {
        const element = document.getElementById(`term-${term.replace(/\s+/g, '-')}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          element.classList.add('bg-amber-50');
          setTimeout(() => {
            element.classList.remove('bg-amber-50');
            setHighlightedTerms(prev => ({ ...prev, [term]: false }));
          }, 2000);
        }
      }, 100);
    }
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setActiveCategory(null);
  };

  // Set up event delegation for term clicks in definitions
  useEffect(() => {
    const handleTermClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.hasAttribute('data-term')) {
        const term = target.getAttribute('data-term');
        if (term) {
          jumpToTerm(term);
        }
      }
    };
    
    document.addEventListener('click', handleTermClick);
    return () => {
      document.removeEventListener('click', handleTermClick);
    };
  }, [glossaryTerms]); // Re-add event listener if glossary terms change

  return {
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
  };
};
