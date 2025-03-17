
export interface SidebarTab {
  label: string;
  value: string;
}

export interface SidebarSection {
  title: string;
  key: string;
  tabs: SidebarTab[];
}

export const getDashboardSidebarConfig = (): SidebarSection[] => {
  return [
    {
      title: 'Products',
      key: 'products',
      tabs: [
        { label: 'Glossaries', value: 'products.glossaries' },
        { label: 'Web Extensions', value: 'products.extensions' }
      ]
    },
    {
      title: 'Organization',
      key: 'organization',
      tabs: [
        { label: 'Overview', value: 'organization.overview' },
        { label: 'Members', value: 'organization.members' },
        { label: 'Teams', value: 'organization.teams' },
        { label: 'Org Chart', value: 'organization.chart' },
        { label: 'Licenses', value: 'organization.licenses' }
      ]
    },
    {
      title: 'Resources',
      key: 'resources',
      tabs: [
        { label: 'Documentation', value: 'resources.documentation' },
        { label: 'Roadmap', value: 'resources.roadmap' }
      ]
    }
  ];
};
