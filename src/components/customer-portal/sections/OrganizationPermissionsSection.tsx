
import React, { useState, useEffect } from 'react';
import { User } from '@/hooks/auth/types';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { UserRole, Organization, OrganizationMember } from '@/types/organization';
import { toast } from 'sonner';
import { useOrganizations } from '@/hooks/useOrganizations';
import { Shield, Users, Settings, LucideIcon } from 'lucide-react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface OrganizationPermissionsSectionProps {
  user: User;
  setLocalLoading: (loading: boolean) => void;
}

interface PermissionSetting {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  permissions: {
    [key in UserRole]?: boolean;
  };
}

const defaultPermissionSettings: PermissionSetting[] = [
  {
    id: 'edit_glossary',
    label: 'Edit Glossary Terms',
    description: 'Can add, edit, or delete glossary terms',
    icon: Settings,
    permissions: {
      'owner': true,
      'admin': true,
      'manager': true,
      'team_lead': true,
      'employee': false,
      'consultant': false
    }
  },
  {
    id: 'invite_members',
    label: 'Invite Members',
    description: 'Can invite new members to the organization',
    icon: Users,
    permissions: {
      'owner': true,
      'admin': true,
      'manager': true,
      'team_lead': false,
      'employee': false,
      'consultant': false
    }
  },
  {
    id: 'manage_permissions',
    label: 'Manage Permissions',
    description: 'Can change user roles and permissions',
    icon: Shield,
    permissions: {
      'owner': true,
      'admin': true,
      'manager': false,
      'team_lead': false,
      'employee': false,
      'consultant': false
    }
  }
];

const OrganizationPermissionsSection: React.FC<OrganizationPermissionsSectionProps> = ({ user, setLocalLoading }) => {
  const { organizations, activeOrganization, setActiveOrganization, members, updateMemberRole, isLoading } = useOrganizations();
  const [permissionSettings, setPermissionSettings] = useState<PermissionSetting[]>(defaultPermissionSettings);
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  useEffect(() => {
    // Find the user's role in the active organization
    if (activeOrganization && members.length > 0) {
      const currentMember = members.find(member => member.user_id === user.id);
      if (currentMember) {
        setUserRole(currentMember.role);
      }
    }
  }, [activeOrganization, members, user.id]);

  const handleUpdateMemberRole = async (memberId: string, newRole: UserRole) => {
    setLocalLoading(true);
    try {
      await updateMemberRole(memberId, newRole);
      toast.success('Member role updated successfully');
    } catch (error) {
      console.error('Error updating member role:', error);
      toast.error('Failed to update member role');
    } finally {
      setLocalLoading(false);
    }
  };

  // Only users with owner or admin role can manage permissions
  const canManagePermissions = userRole === 'owner' || userRole === 'admin';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-4">Organization Permissions</h2>
          <p className="text-gray-600 mb-6">
            Manage user roles and permissions for your organization.
          </p>
        </div>
        
        {organizations.length > 0 && (
          <Select
            value={activeOrganization?.id}
            onValueChange={(orgId) => {
              const org = organizations.find(o => o.id === orgId);
              if (org) setActiveOrganization(org);
            }}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select organization" />
            </SelectTrigger>
            <SelectContent>
              {organizations.map((org) => (
                <SelectItem key={org.id} value={org.id}>
                  {org.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
      
      {isLoading ? (
        <LoadingSpinner message="Loading organization data..." />
      ) : !activeOrganization ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-6">
              <p className="text-gray-500 mb-4">You are not a member of any organization.</p>
              <Button 
                onClick={() => {
                  // Handle organization creation flow
                  toast.info('Organization creation feature coming soon');
                }}
              >
                Create an Organization
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Member Roles</CardTitle>
              <CardDescription>
                Manage roles for members in {activeOrganization.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {members.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {members.map((member) => {
                      const memberName = member.user?.name || member.invited_name || 'Unknown';
                      const memberEmail = member.user?.email || member.invited_email || 'Unknown';
                      const initials = memberName
                        .split(' ')
                        .map(part => part[0])
                        .join('')
                        .toUpperCase()
                        .slice(0, 2);
                        
                      return (
                        <TableRow key={member.id}>
                          <TableCell className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarFallback>{initials}</AvatarFallback>
                            </Avatar>
                            <span>{memberName}</span>
                          </TableCell>
                          <TableCell>{memberEmail}</TableCell>
                          <TableCell>
                            {canManagePermissions && member.user_id !== user.id ? (
                              <Select
                                value={member.role}
                                onValueChange={(role) => handleUpdateMemberRole(member.id, role as UserRole)}
                                disabled={!canManagePermissions}
                              >
                                <SelectTrigger className="w-[140px]">
                                  <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                  {Object.keys(ROLE_LABELS).map((role) => (
                                    <SelectItem key={role} value={role}>
                                      {ROLE_LABELS[role as UserRole]}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            ) : (
                              <span className="font-medium">
                                {ROLE_LABELS[member.role as UserRole]}
                              </span>
                            )}
                          </TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              member.status === 'active' ? 'bg-green-100 text-green-800' :
                              member.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                      // View member details
                                      toast.info(`Details for ${memberName}`);
                                    }}
                                  >
                                    View
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>View member details</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500">No members in this organization yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          {canManagePermissions && (
            <Card>
              <CardHeader>
                <CardTitle>Role Permissions</CardTitle>
                <CardDescription>
                  Configure what each role can do in your organization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Permission</TableHead>
                      {Object.keys(ROLE_LABELS).map((role) => (
                        <TableHead key={role} className="text-center">
                          {ROLE_LABELS[role as UserRole]}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {permissionSettings.map((setting) => (
                      <TableRow key={setting.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <setting.icon className="h-4 w-4" />
                            <span>{setting.label}</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{setting.description}</p>
                        </TableCell>
                        {Object.keys(ROLE_LABELS).map((role) => (
                          <TableCell key={role} className="text-center">
                            <Switch
                              checked={setting.permissions[role as UserRole] || false}
                              onCheckedChange={(checked) => {
                                // Only owner can change owner permissions
                                if (role === 'owner') return;
                                
                                setPermissionSettings(prev => 
                                  prev.map(s => 
                                    s.id === setting.id 
                                      ? {
                                          ...s,
                                          permissions: {
                                            ...s.permissions,
                                            [role]: checked
                                          }
                                        }
                                      : s
                                  )
                                );
                                
                                toast.success(`Updated ${setting.label} for ${ROLE_LABELS[role as UserRole]}`);
                              }}
                              disabled={role === 'owner' || !canManagePermissions}
                            />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default OrganizationPermissionsSection;
