
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from '@/hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Database } from 'lucide-react';

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

  const handleSupabaseDashboardClick = () => {
    window.open('https://supabase.com/dashboard/project/dqkemwzltxfsvuykzmfm', '_blank');
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome, {user.name}!</CardTitle>
        <CardDescription>
          You're now logged into your Candilingo account.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-md">
          <h3 className="font-medium text-candilingo-purple mb-2">Account Information</h3>
          <p className="text-gray-700"><span className="font-medium">Email:</span> {user.email}</p>
          <p className="text-gray-700"><span className="font-medium">Membership:</span> {user.membership_tier || 'Free'}</p>
          <p className="text-gray-700"><span className="font-medium">Status:</span> {user.status || 'Active'}</p>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-md">
          <h3 className="font-medium text-candilingo-purple mb-2">Your Resources</h3>
          <ul className="list-disc list-inside text-gray-700">
            <li>Technical Glossary Access</li>
            <li>Resume Analysis Tools</li>
            <li>Developer Skills Assessment</li>
            <li>Interview Preparation Materials</li>
          </ul>
        </div>
        
        <div className="flex flex-col gap-3">
          <Button 
            onClick={handleDashboardClick} 
            className="w-full bg-candilingo-purple hover:bg-candilingo-lightpurple flex items-center justify-center text-lg py-6 font-bold"
          >
            <LayoutDashboard className="mr-2 h-5 w-5" /> Go to Dashboard
          </Button>
          
          <Button 
            onClick={handleSupabaseDashboardClick} 
            className="w-full bg-candilingo-teal hover:bg-candilingo-lightteal flex items-center justify-center py-4"
          >
            <Database className="mr-2 h-5 w-5" /> Open Supabase Dashboard
          </Button>
        </div>
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
