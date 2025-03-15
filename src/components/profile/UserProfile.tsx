
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from '@/hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Shield, CreditCard, User as UserIcon } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface UserProfileProps {
  user: User;
  onLogout: () => void;
  isLoading: boolean;
}

const UserProfile = ({ user, onLogout, isLoading }: UserProfileProps) => {
  const navigate = useNavigate();
  
  const handleDashboardClick = () => {
    navigate('/dashboard');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12 border-2 border-candilingo-purple">
            <AvatarFallback className="bg-candilingo-purple text-white text-lg">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>Welcome, {user.name}!</CardTitle>
            <CardDescription>
              You're now logged into your Candilingo account
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-md flex items-start space-x-3">
            <UserIcon className="h-5 w-5 text-candilingo-purple mt-0.5" />
            <div>
              <h3 className="font-medium text-candilingo-purple mb-1">Account Info</h3>
              <p className="text-sm text-gray-700">{user.email}</p>
              <p className="text-sm text-gray-700">
                <span className="inline-flex items-center gap-1">
                  <Shield className="h-3.5 w-3.5" />
                  {user.membership_tier || 'Free'} Plan
                </span>
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-md flex items-start space-x-3">
            <CreditCard className="h-5 w-5 text-candilingo-purple mt-0.5" />
            <div>
              <h3 className="font-medium text-candilingo-purple mb-1">Billing</h3>
              <p className="text-sm text-gray-700">Status: {user.status || 'Active'}</p>
              <Link to="/customer-portal" className="text-sm text-candilingo-purple hover:underline">
                Manage Subscription
              </Link>
            </div>
          </div>
        </div>
        
        <Button 
          onClick={handleDashboardClick} 
          className="w-full bg-candilingo-purple hover:bg-candilingo-lightpurple flex items-center justify-center text-lg py-6 font-bold"
        >
          <LayoutDashboard className="mr-2 h-5 w-5" /> Go to Dashboard
        </Button>
      </CardContent>
      <CardFooter>
        <Button onClick={onLogout} variant="outline" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing out..." : "Sign Out"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserProfile;
