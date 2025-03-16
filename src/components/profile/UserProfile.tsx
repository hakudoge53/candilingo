
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from '@/hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard } from 'lucide-react';

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
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-[#6E59A5] text-white text-center">
        <CardTitle className="text-xl">Welcome, {user.name}!</CardTitle>
        <CardDescription className="text-gray-100">
          You're now logged into your Candilingo account.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        <div className="p-4 bg-gray-50 rounded-md">
          <h3 className="font-bold text-[#6E59A5] mb-2 text-base">Account Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="font-bold text-gray-700">Email:</p>
              <p className="text-gray-700">{user.email}</p>
            </div>
            <div>
              <p className="font-bold text-gray-700">Membership:</p>
              <p className="text-gray-700">{user.membership_tier || 'Free'}</p>
            </div>
            <div>
              <p className="font-bold text-gray-700">Status:</p>
              <p className="text-gray-700">{user.status || 'Active'}</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-md">
          <h3 className="font-bold text-[#6E59A5] mb-2 text-base">Your Resources</h3>
          <ul className="list-disc list-inside text-gray-700 pl-4 space-y-1">
            <li>Technical Glossary Access</li>
            <li>Resume Analysis Tools</li>
            <li>Developer Skills Assessment</li>
            <li>Interview Preparation Materials</li>
          </ul>
        </div>
        
        <Button 
          onClick={handleDashboardClick} 
          className="w-full bg-[#6E59A5] hover:bg-[#9b87f5] flex items-center justify-center text-lg py-6 font-bold rounded-md"
        >
          <LayoutDashboard className="mr-2 h-5 w-5" /> Go to Dashboard
        </Button>
      </CardContent>
      <CardFooter className="bg-gray-50">
        <Button onClick={onLogout} variant="outline" className="w-full border-[#6E59A5] text-[#6E59A5] hover:bg-[#6E59A5] hover:text-white rounded-md" disabled={isLoading}>
          {isLoading ? "Signing out..." : "Sign Out"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserProfile;
