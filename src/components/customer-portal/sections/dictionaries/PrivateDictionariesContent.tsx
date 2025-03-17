
import React from 'react';
import GlossaryList from './GlossaryList';
import TermList from './TermList';
import TermEditor from './TermEditor';
import GlossaryCreator from './GlossaryCreator';
import { usePrivateDictionaries } from '@/hooks/dictionaries/usePrivateDictionaries';
import { useIsMobile } from '@/hooks/use-mobile';

interface PrivateDictionariesContentProps {
  organizationId: string | undefined;
  isLoading: boolean;
}

const PrivateDictionariesContent: React.FC<PrivateDictionariesContentProps> = ({
  organizationId,
  isLoading: externalLoading
}) => {
  const isMobile = useIsMobile();
  
  const {
    glossaries,
    activeGlossary,
    terms,
    searchTerm,
    setSearchTerm,
    isGlossaryDialogOpen,
    setIsGlossaryDialogOpen,
    editingGlossary,
    isTermDialogOpen,
    setIsTermDialogOpen,
    editingTerm,
    isGlossaryLoading,
    isTermsLoading,
    handleSelectGlossary,
    handleCreateGlossary,
    handleUpdateGlossary,
    handleDeleteGlossary,
    handleAddTerm,
    handleUpdateTerm,
    handleEditTermClick,
    handleDeleteTerm,
    handleAddTermClick,
    handleEditGlossaryClick
  } = usePrivateDictionaries(organizationId);

  const totalLoading = externalLoading || isGlossaryLoading || isTermsLoading;

  return (
    <div className={isMobile ? "space-y-6" : "grid grid-cols-1 lg:grid-cols-4 gap-6"}>
      <div className={isMobile ? "w-full" : "lg:col-span-1"}>
        <GlossaryList
          glossaries={glossaries}
          selectedGlossaryId={activeGlossary?.id || null}
          isLoading={totalLoading}
          onSelectGlossary={handleSelectGlossary}
          onCreateGlossary={() => setIsGlossaryDialogOpen(true)}
          onEditGlossary={handleEditGlossaryClick}
          onDeleteGlossary={handleDeleteGlossary}
        />
      </div>

      <div className={isMobile ? "w-full" : "lg:col-span-3"}>
        <TermList
          activeGlossary={activeGlossary}
          terms={terms}
          searchTerm={searchTerm}
          isLoading={totalLoading}
          onSearchChange={setSearchTerm}
          onEditTerm={handleEditTermClick}
          onDeleteTerm={handleDeleteTerm}
          onAddTermClick={handleAddTermClick}
        />
        
        {activeGlossary && (
          <TermEditor
            isOpen={isTermDialogOpen}
            isLoading={totalLoading}
            editingTerm={editingTerm}
            onOpenChange={setIsTermDialogOpen}
            onAddTerm={handleAddTerm}
            onUpdateTerm={handleUpdateTerm}
          />
        )}
      </div>

      <GlossaryCreator
        isOpen={isGlossaryDialogOpen}
        isLoading={totalLoading}
        editingGlossary={editingGlossary}
        onOpenChange={setIsGlossaryDialogOpen}
        onCreateGlossary={handleCreateGlossary}
        onUpdateGlossary={handleUpdateGlossary}
      />
    </div>
  );
};

export default PrivateDictionariesContent;
