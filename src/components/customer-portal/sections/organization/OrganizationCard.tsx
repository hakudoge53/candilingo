import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Organization, OrganizationMember, UserRole } from '@/types/organization';
import { Button } from '@/components/ui/button';
import { Edit, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface OrganizationCardProps {
  organization: Organization;
  member?: OrganizationMember | null;
  onEditClick: (organization: Organization) => void;
}

const OrganizationCard: React.FC<OrganizationCardProps> = ({
  organization,
  member,
  onEditClick
}) => {
  const navigate = useNavigate();
  
  const handleManageMembersClick = () => {
    navigate('/dashboard?tab=members');
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div className="space-y-0.5">
          <CardTitle className="text-lg font-semibold">{organization.name}</CardTitle>
          <CardDescription className="text-gray-500">
            Joined {organization.created_at}
          </CardDescription>
        </div>
        
        {(member && (member.role === 'owner' || member.role === 'admin')) && (
          <Button variant="ghost" size="sm" onClick={() => onEditClick(organization)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/avatars/0.png" />
            <AvatarFallback>{organization.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium leading-none">{organization.name}</p>
            <p className="text-sm text-gray-500">
              {organization.member_count} Members
            </p>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          className="mt-4 w-full justify-center"
          onClick={handleManageMembersClick}
        >
          <Users className="mr-2 h-4 w-4" />
          Manage Members
        </Button>
      </CardContent>
    </Card>
  );
};

export default OrganizationCard;
