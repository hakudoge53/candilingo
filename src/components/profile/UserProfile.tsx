
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from '@/hooks/useAuth';

interface UserProfileProps {
  user: User;
  onLogout: () => void;
  isLoading: boolean;
}

const UserProfile = ({ user, onLogout, isLoading }: UserProfileProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome, {user.name}!</CardTitle>
        <CardDescription>
          You're now logged into your TechLex account.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-md">
          <h3 className="font-medium text-techlex-blue mb-2">Account Information</h3>
          <p className="text-gray-700"><span className="font-medium">Email:</span> {user.email}</p>
          <p className="text-gray-700"><span className="font-medium">Membership:</span> {user.membership_tier || 'Free'}</p>
          <p className="text-gray-700"><span className="font-medium">Status:</span> {user.status || 'Active'}</p>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-md">
          <h3 className="font-medium text-techlex-blue mb-2">Your Resources</h3>
          <ul className="list-disc list-inside text-gray-700">
            <li>Technical Glossary Access</li>
            <li>Resume Analysis Tools</li>
            <li>Developer Skills Assessment</li>
            <li>Interview Preparation Materials</li>
          </ul>
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
