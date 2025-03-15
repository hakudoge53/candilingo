
import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Organization } from '@/types/organization';
import { Button } from '@/components/ui/button';
import { Bell, User, Menu } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/useAuth';

interface DashboardHeaderProps {
  activeOrganization: Organization | null;
  organizations: Organization[];
  onOrganizationChange: (org: Organization) => void;
  toggleSidebar: () => void;
}

const DashboardHeader = ({ 
  activeOrganization, 
  organizations, 
  onOrganizationChange,
  toggleSidebar
}: DashboardHeaderProps) => {
  const { activeUser } = useAuth();
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <header className="bg-white border-b py-3 px-4 md:px-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
        
        {activeOrganization && organizations.length > 0 && (
          <Select 
            value={activeOrganization.id} 
            onValueChange={(value) => {
              const org = organizations.find(o => o.id === value);
              if (org) onOrganizationChange(org);
            }}
          >
            <SelectTrigger className="w-[220px]">
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
      
      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-candilingo-coral"></span>
        </Button>
        
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8 bg-candilingo-purple">
            <AvatarFallback>
              {activeUser?.name ? getInitials(activeUser.name) : 'U'}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium hidden md:inline">
            {activeUser?.name || 'User'}
          </span>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
