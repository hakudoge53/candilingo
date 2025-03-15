
import React from 'react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BookMarked, UserPlus, FolderPlus, Edit, Clock } from 'lucide-react';

const ActivityFeed = () => {
  // Typically this would come from an API, but we'll mock it for now
  const activities = [
    {
      id: 1,
      type: 'glossary_created',
      user: 'Alex Smith',
      target: 'Technical Terms',
      timeAgo: '2 hours ago',
    },
    {
      id: 2,
      type: 'member_invited',
      user: 'Emma Johnson',
      target: 'Sarah Chen',
      timeAgo: '5 hours ago',
    },
    {
      id: 3,
      type: 'organization_created',
      user: 'You',
      target: 'Development Team',
      timeAgo: '1 day ago',
    },
    {
      id: 4,
      type: 'glossary_updated',
      user: 'David Wilson',
      target: 'API Documentation',
      timeAgo: '2 days ago',
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'glossary_created':
        return <BookMarked className="h-4 w-4 text-blue-600" />;
      case 'member_invited':
        return <UserPlus className="h-4 w-4 text-green-600" />;
      case 'organization_created':
        return <FolderPlus className="h-4 w-4 text-candilingo-purple" />;
      case 'glossary_updated':
        return <Edit className="h-4 w-4 text-orange-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getActivityText = (activity: typeof activities[0]) => {
    switch (activity.type) {
      case 'glossary_created':
        return (
          <>
            <span className="font-medium">{activity.user}</span> created glossary{' '}
            <span className="font-medium">{activity.target}</span>
          </>
        );
      case 'member_invited':
        return (
          <>
            <span className="font-medium">{activity.user}</span> invited{' '}
            <span className="font-medium">{activity.target}</span> to the team
          </>
        );
      case 'organization_created':
        return (
          <>
            <span className="font-medium">{activity.user}</span> created organization{' '}
            <span className="font-medium">{activity.target}</span>
          </>
        );
      case 'glossary_updated':
        return (
          <>
            <span className="font-medium">{activity.user}</span> updated glossary{' '}
            <span className="font-medium">{activity.target}</span>
          </>
        );
      default:
        return 'Unknown activity';
    }
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
    <div className="space-y-4">
      {activities.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No recent activity
        </div>
      ) : (
        <ul className="space-y-4">
          {activities.map((activity) => (
            <li key={activity.id} className="flex items-start space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-gray-100 text-gray-800">
                  {getInitials(activity.user)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-1">
                <p className="text-sm text-gray-800">
                  {getActivityText(activity)}
                </p>
                <div className="flex items-center text-xs text-gray-500">
                  {getActivityIcon(activity.type)}
                  <span className="ml-1">{activity.timeAgo}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ActivityFeed;
