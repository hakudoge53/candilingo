import React from 'react';
import GlossaryPanel from '../GlossaryPanel';
import WebExtensionsPanel from '../WebExtensionsPanel';
import OrganizationPanel from '../OrganizationPanel';
import ResourcesPanel from '../ResourcesPanel';
import MembersPanel from '../MembersPanel';
import TeamsPanel from '../TeamsPanel';
import LicensesPanel from '../LicensesPanel';
import OrganizationChartPanel from '../OrganizationChartPanel';
import OrganizationOverviewPanel from '../OrganizationOverviewPanel';
import ResourcesDocumentationPanel from '../ResourcesDocumentationPanel';
import { Glossary, GlossaryTerm } from '@/types/organization';
import { Organization, OrganizationMember } from '@/types/organization';

interface DashboardPanelRendererProps {
  activeSection: string;
  activeTab: string;
  activeOrganization: Organization | null;
  glossaries: Glossary[];
  activeGlossary: Glossary | null;
  setActiveGlossary: (glossary: Glossary) => void;
  terms: GlossaryTerm[];
  organizations: Organization[];
  adminMembers: OrganizationMember[];
  glossariesLoading: boolean;
  isLoadingTerms: boolean;
  addTerm: (glossaryId: string, term: string, definition: string, category?: string) => Promise<GlossaryTerm | null>;
  updateTerm: (termId: string, updates: Partial<GlossaryTerm>) => Promise<GlossaryTerm | null>;
  deleteTerm: (termId: string) => Promise<void>;
  createGlossary: (name: string, description?: string) => Promise<Glossary | null>;
  updateGlossary: (glossaryId: string, updates: Partial<Glossary>) => Promise<Glossary | null>;
  deleteGlossary: (glossaryId: string) => Promise<void>;
  createOrganization: (name: string) => Promise<Organization | null>;
  orgLoading: boolean;
}

const DashboardPanelRenderer: React.FC<DashboardPanelRendererProps> = ({
  activeSection,
  activeTab,
  activeOrganization,
  glossaries,
  activeGlossary,
  setActiveGlossary,
  terms,
  organizations,
  adminMembers,
  glossariesLoading,
  isLoadingTerms,
  addTerm,
  updateTerm,
  deleteTerm,
  createGlossary,
  updateGlossary,
  deleteGlossary,
  createOrganization,
  orgLoading
}) => {
  const renderPanel = () => {
    const tabParts = activeTab.split('.');
    
    switch (activeTab) {
      case 'products.glossaries':
        return (
          <GlossaryPanel 
            glossaries={glossaries}
            activeGlossary={activeGlossary}
            setActiveGlossary={setActiveGlossary}
            terms={terms}
            isLoadingGlossaries={glossariesLoading}
            isLoadingTerms={isLoadingTerms}
            addTerm={addTerm}
            updateTerm={updateTerm}
            deleteTerm={deleteTerm}
            addGlossary={createGlossary}
            updateGlossary={updateGlossary}
            deleteGlossary={deleteGlossary}
          />
        );
        
      case 'products.extensions':
        return <WebExtensionsPanel />;
        
      case 'organization.overview':
        return <OrganizationOverviewPanel activeOrganization={activeOrganization} />;
        
      case 'organization.members':
        return <MembersPanel organizationId={activeOrganization?.id || ''} />;
        
      case 'organization.teams':
        return <TeamsPanel organizationId={activeOrganization?.id || ''} />;
        
      case 'organization.chart':
        return (
          <OrganizationChartPanel 
            organizationId={activeOrganization?.id || ''} 
            orgName={activeOrganization?.name || 'Organization'}
            admins={adminMembers}
          />
        );
        
      case 'organization.licenses':
        return <LicensesPanel organizationId={activeOrganization?.id || ''} />;
        
      case 'resources.documentation':
        return <ResourcesDocumentationPanel />;
        
      case 'resources.roadmap':
        return <ResourcesPanel activeTab={activeTab} />;
        
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">Select a tab to view content</p>
          </div>
        );
    }
  };
  
  return (
    <div className="h-full">
      {renderPanel()}
    </div>
  );
};

export default DashboardPanelRenderer;
