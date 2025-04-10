
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/auth/useAuth';
import { useOrganizations } from '@/hooks/useOrganizations';
import { useGlossaries } from '@/hooks/useGlossaries';
import { Organization, OrganizationMember, MemberStatus, UserRole } from '@/types/organization';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function useDashboardState() {
  const navigate = useNavigate();
  const { activeUser, isLoggedIn, isLoading: authLoading } = useAuth();
  const { 
    organizations, 
    activeOrganization, 
    setActiveOrganization,
    members,
    createOrganization,
    isLoading: orgLoading 
  } = useOrganizations();
  
  const { 
    glossaries,
    activeGlossary,
    setActiveGlossary,
    isLoading: glossariesLoading,
    isLoadingTerms,
    terms,
    addTerm,
    updateTerm,
    deleteTerm,
    createGlossary,
    updateGlossary,
    deleteGlossary
  } = useGlossaries(activeOrganization?.id);
  
  const [activeSection, setActiveSection] = useState('products');
  const [activeTab, setActiveTab] = useState('');
  const [adminMembers, setAdminMembers] = useState<OrganizationMember[]>([]);
  
  // Redirect to auth page if user is not logged in
  useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      navigate('/auth');
    }
  }, [isLoggedIn, authLoading, navigate]);
  
  // Auto-select the first available glossary if none is selected
  useEffect(() => {
    if (!activeGlossary && glossaries && glossaries.length > 0 && !glossariesLoading) {
      setActiveGlossary(glossaries[0]);
    }
  }, [glossaries, activeGlossary, glossariesLoading, setActiveGlossary]);
  
  // Fetch admin members when organization changes
  useEffect(() => {
    if (activeOrganization?.id) {
      fetchAdminMembers(activeOrganization.id);
    }
  }, [activeOrganization, members]);
  
  const fetchAdminMembers = async (orgId: string) => {
    try {
      if (members && members.length > 0) {
        setAdminMembers(members.filter(m => 
          m.role === 'admin' || m.role === 'manager'
        ));
      } else {
        const { data, error } = await supabase
          .from('organization_members')
          .select(`
            *,
            user:profiles(id, name, email, avatar_url)
          `)
          .eq('organization_id', orgId)
          .in('role', ['admin', 'manager'])
          .eq('status', 'active');
        
        if (error) throw error;
        
        const typedMembers: OrganizationMember[] = (data || []).map((member: any) => {
          return {
            ...member,
            role: member.role as UserRole,
            status: member.status as MemberStatus,
            user: member.user || {}
          };
        });
        
        setAdminMembers(typedMembers);
      }
    } catch (error) {
      console.error('Error fetching admin members:', error);
      toast.error('Error loading organization administrators');
    }
  };
  
  const handleOrganizationChange = (org: Organization) => {
    setActiveOrganization(org);
    // Reset active glossary when organization changes
    setActiveGlossary(null);
  };
  
  const handleTabChange = (tab: string) => {
    if (tab.includes('.')) {
      const [section, tabName] = tab.split('.');
      setActiveSection(section);
      setActiveTab(tab);
    } else {
      // If just a section is provided, set it as active section
      setActiveSection(tab);
      setActiveTab('');
    }
  };

  return {
    activeUser,
    activeOrganization,
    organizations,
    activeSection,
    activeTab,
    glossaries,
    activeGlossary,
    setActiveGlossary,
    terms,
    adminMembers,
    isLoading: authLoading || orgLoading,
    glossariesLoading,
    isLoadingTerms,
    handleOrganizationChange,
    handleTabChange,
    addTerm,
    updateTerm,
    deleteTerm,
    createGlossary,
    updateGlossary,
    deleteGlossary,
    createOrganization,
    orgLoading
  };
}
