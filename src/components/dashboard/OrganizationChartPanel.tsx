
import React, { useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { useTeams } from '@/hooks/organization/teams/useTeams';
import { useTeamMembers } from '@/hooks/organization/teams/useTeamMembers';
import { OrganizationMember } from '@/types/organization';
import { Team } from '@/hooks/organization/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface OrganizationChartPanelProps {
  organizationId: string;
  orgName: string;
  admins: OrganizationMember[];
}

const OrganizationChartPanel: React.FC<OrganizationChartPanelProps> = ({ 
  organizationId, 
  orgName,
  admins
}) => {
  const { teams, isLoading: isTeamsLoading, fetchTeams } = useTeams();
  const { teamMembers, isLoading: isMembersLoading, fetchTeamMembers } = useTeamMembers();
  
  useEffect(() => {
    if (organizationId) {
      fetchTeams(organizationId);
    }
  }, [organizationId]);

  useEffect(() => {
    // When teams are loaded, fetch members of the first team
    if (teams.length > 0 && teams[0].id) {
      fetchTeamMembers(teams[0].id);
    }
  }, [teams]);

  const isLoading = isTeamsLoading || isMembersLoading;

  // Temp function to get avatar initials
  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    const nameParts = name.split(' ');
    if (nameParts.length > 1) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    return name[0].toUpperCase();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Organization Chart</CardTitle>
        <CardDescription>
          Visualize your organization's team structure
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
        ) : (
          <div className="org-chart">
            {/* Organization Root */}
            <div className="flex flex-col items-center mb-8">
              <div className="bg-primary/10 border border-primary/20 rounded-md p-4 text-center w-64">
                <h3 className="font-bold text-lg">{orgName}</h3>
                <p className="text-sm text-gray-500">Organization</p>
              </div>
              
              {/* Vertical line connector */}
              <div className="h-8 w-0.5 bg-gray-300"></div>
            </div>
            
            {/* Leadership Section */}
            <div className="mb-8">
              <h4 className="text-sm font-medium text-gray-500 mb-4 text-center">Leadership</h4>
              
              <div className="flex justify-center gap-4 flex-wrap">
                {admins.map(admin => (
                  <div key={admin.id} className="bg-secondary/10 border border-secondary/20 rounded-md p-3 text-center w-48">
                    <Avatar className="mx-auto mb-2 h-12 w-12">
                      <AvatarImage src={admin.user?.avatar_url || undefined} alt={admin.user?.name || ''} />
                      <AvatarFallback>{getInitials(admin.user?.name)}</AvatarFallback>
                    </Avatar>
                    <h4 className="font-medium">{admin.user?.name}</h4>
                    <Badge variant="outline" className="mt-1">{admin.role}</Badge>
                  </div>
                ))}
              </div>
              
              {/* Vertical line connector */}
              {teams.length > 0 && (
                <div className="flex justify-center">
                  <div className="h-8 w-0.5 bg-gray-300 mt-4"></div>
                </div>
              )}
            </div>
            
            {/* Teams Section */}
            {teams.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-4 text-center">Teams</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {teams.map(team => (
                    <div key={team.id} className="bg-card border rounded-md p-4">
                      <h3 className="font-bold text-center mb-2">{team.name}</h3>
                      <p className="text-sm text-gray-500 text-center mb-4">
                        {team.member_count} {team.member_count === 1 ? 'member' : 'members'}
                      </p>
                      
                      {/* Team Managers */}
                      <div className="mb-3">
                        <h5 className="text-xs font-medium text-gray-500 mb-2">Team Managers</h5>
                        <div className="flex flex-wrap gap-2">
                          {teamMembers
                            .filter(tm => tm.team_id === team.id && tm.is_team_manager)
                            .map(manager => (
                              <div key={manager.id} className="flex items-center space-x-2 bg-secondary/5 rounded-full px-2 py-1">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={manager.member?.user?.avatar_url || undefined} />
                                  <AvatarFallback>{getInitials(manager.member?.user?.name)}</AvatarFallback>
                                </Avatar>
                                <span className="text-xs font-medium truncate max-w-[100px]">
                                  {manager.member?.user?.name}
                                </span>
                              </div>
                            ))}
                          {teamMembers.filter(tm => tm.team_id === team.id && tm.is_team_manager).length === 0 && (
                            <span className="text-xs text-gray-500">No managers assigned</span>
                          )}
                        </div>
                      </div>
                      
                      {/* Team Members */}
                      <div>
                        <h5 className="text-xs font-medium text-gray-500 mb-2">Team Members</h5>
                        <div className="flex flex-wrap gap-1">
                          {teamMembers
                            .filter(tm => tm.team_id === team.id && !tm.is_team_manager)
                            .slice(0, 5) // Show only first 5 members
                            .map(member => (
                              <Avatar key={member.id} className="h-8 w-8 border-2 border-background">
                                <AvatarImage src={member.member?.user?.avatar_url || undefined} />
                                <AvatarFallback>{getInitials(member.member?.user?.name)}</AvatarFallback>
                              </Avatar>
                            ))}
                          {teamMembers.filter(tm => tm.team_id === team.id && !tm.is_team_manager).length > 5 && (
                            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                              +{teamMembers.filter(tm => tm.team_id === team.id && !tm.is_team_manager).length - 5}
                            </div>
                          )}
                          {teamMembers.filter(tm => tm.team_id === team.id && !tm.is_team_manager).length === 0 && (
                            <span className="text-xs text-gray-500">No members assigned</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OrganizationChartPanel;
