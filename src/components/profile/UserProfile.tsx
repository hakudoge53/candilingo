
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from '@/hooks/auth/types';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, CreditCard } from 'lucide-react';

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
    <div className="space-y-6">
      <Card className="border border-gray-100 shadow-sm">
        <CardHeader className="bg-gradient-to-r from-candilingo-purple to-candilingo-pink">
          <CardTitle className="text-2xl font-bold text-white text-center">Welcome, {user.name}!</CardTitle>
          <CardDescription className="text-white text-center">
            You're now logged into your Candilingo account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          <div className="p-4 bg-gray-50 rounded-md">
            <h3 className="font-medium text-candilingo-purple mb-2">Account Information</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="font-medium">Email:</p>
                <p className="text-gray-700">{user.email}</p>
              </div>
              <div>
                <p className="font-medium">Membership:</p>
                <p className="text-gray-700">{user.membership_tier || 'Free'}</p>
              </div>
              <div>
                <p className="font-medium">Status:</p>
                <p className="text-gray-700">{user.status || 'Active'}</p>
              </div>
            </div>
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
          
          <Button 
            onClick={handleDashboardClick} 
            className="w-full bg-candilingo-purple hover:bg-candilingo-lightpurple flex items-center justify-center text-lg py-6 font-bold"
          >
            <LayoutDashboard className="mr-2 h-5 w-5" /> Go to Dashboard
          </Button>
        </CardContent>
        <CardFooter className="bg-gray-50 border-t">
          <Button onClick={onLogout} variant="outline" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing out..." : "Sign Out"}
          </Button>
        </CardFooter>
      </Card>

      <Card className="border border-gray-100 shadow-sm">
        <CardHeader className="border-b bg-gradient-to-r from-candilingo-purple/10 to-candilingo-teal/10">
          <CardTitle className="text-xl font-bold text-candilingo-darkpurple">Billing & Subscription</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-md p-4">
              <h3 className="font-medium text-candilingo-purple mb-2">Current Plan</h3>
              <p className="text-lg font-semibold">Free Plan</p>
              <p className="text-sm text-gray-500 mb-4">Basic features included</p>
              <Button className="w-full bg-candilingo-pink hover:bg-candilingo-lightpink">
                <CreditCard className="mr-2 h-4 w-4" /> Upgrade to Premium
              </Button>
            </div>
            
            <div className="border rounded-md p-4">
              <h3 className="font-medium text-candilingo-purple mb-2">Payment Methods</h3>
              <p className="text-gray-700 mb-4">No payment methods added yet</p>
              <Button variant="outline" className="w-full border-candilingo-purple text-candilingo-purple hover:bg-candilingo-purple/10">
                <CreditCard className="mr-2 h-4 w-4" /> Add Payment Method
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
