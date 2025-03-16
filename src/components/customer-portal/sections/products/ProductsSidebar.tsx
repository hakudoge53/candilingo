
import React from 'react';
import { 
  Book, 
  Globe, 
  Clock, 
  Users, 
  User, 
  CreditCard, 
  Settings,
  HelpCircle,
  MessageCircle,
  FileText,
  Building,
  Package
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

interface ProductsSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const ProductsSidebar: React.FC<ProductsSidebarProps> = ({ 
  activeSection,
  onSectionChange
}) => {
  // Section groups
  const productSections = [
    { id: 'glossary', name: 'Glossary', icon: Book },
    { id: 'web-extension', name: 'Web Extension', icon: Globe, badge: true },
    { id: 'roadmap', name: 'Roadmap', icon: Clock }
  ];
  
  const glossarySections = [
    { id: 'public', name: 'Public', icon: Globe },
    { id: 'organization', name: 'Organization', icon: Building },
    { id: 'personal', name: 'Personal', icon: User },
    { id: 'team', name: 'Team', icon: Users },
    { id: 'company', name: 'Company', icon: Building }
  ];
  
  const organizationSections = [
    { id: 'team', name: 'Team', icon: Users },
    { id: 'users', name: 'Users', icon: User },
    { id: 'billing', name: 'Billing', icon: CreditCard },
    { id: 'settings', name: 'Settings', icon: Settings, badge: true }
  ];
  
  const resourceSections = [
    { id: 'faq', name: 'FAQ', icon: HelpCircle, badge: true },
    { id: 'support', name: 'Support', icon: MessageCircle, badge: true },
    { id: 'privacy-policy', name: 'Privacy Policy', icon: FileText }
  ];

  return (
    <div className="space-y-8">
      {/* Products */}
      <div>
        <h3 className="text-xl font-bold text-candilingo-purple mb-4 flex items-center">
          <Package className="mr-2 h-5 w-5" />
          Products
        </h3>
        <div className="space-y-1 pl-2">
          {productSections.map((section) => (
            <Button
              key={section.id}
              variant="ghost"
              className={cn(
                "w-full justify-start text-left font-normal",
                activeSection === section.id && "bg-candilingo-purple/10 text-candilingo-purple font-medium"
              )}
              onClick={() => onSectionChange(section.id)}
            >
              <section.icon className="mr-2 h-4 w-4" />
              {section.name}
              {section.badge && (
                <span className="ml-auto bg-candilingo-purple text-white text-xs py-0.5 px-1.5 rounded-md">
                  ⭐
                </span>
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* Glossary */}
      <div>
        <h3 className="text-md font-medium text-gray-500 mb-2 flex items-center pl-2">
          <Book className="mr-2 h-4 w-4" />
          Glossary
        </h3>
        <div className="space-y-1 pl-4">
          {glossarySections.map((section) => (
            <Button
              key={section.id}
              variant="ghost"
              size="sm"
              className={cn(
                "w-full justify-start text-left font-normal text-sm",
                activeSection === `glossary-${section.id}` && "bg-candilingo-pink/10 text-candilingo-pink font-medium"
              )}
              onClick={() => onSectionChange(`glossary-${section.id}`)}
            >
              <section.icon className="mr-2 h-3 w-3" />
              {section.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Organization */}
      <div>
        <h3 className="text-xl font-bold text-candilingo-purple mb-4 flex items-center">
          <Building className="mr-2 h-5 w-5" />
          Organization
        </h3>
        <div className="space-y-1 pl-2">
          {organizationSections.map((section) => (
            <Button
              key={section.id}
              variant="ghost"
              className={cn(
                "w-full justify-start text-left font-normal",
                activeSection === `org-${section.id}` && "bg-candilingo-purple/10 text-candilingo-purple font-medium"
              )}
              onClick={() => onSectionChange(`org-${section.id}`)}
            >
              <section.icon className="mr-2 h-4 w-4" />
              {section.name}
              {section.badge && (
                <span className="ml-auto bg-blue-500 text-white text-xs py-0.5 px-1.5 rounded-full">
                  i
                </span>
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* Resources */}
      <div>
        <h3 className="text-xl font-bold text-candilingo-purple mb-4 flex items-center">
          <FileText className="mr-2 h-5 w-5" />
          Resources
        </h3>
        <div className="space-y-1 pl-2">
          {resourceSections.map((section) => (
            <Button
              key={section.id}
              variant="ghost"
              className={cn(
                "w-full justify-start text-left font-normal",
                activeSection === `res-${section.id}` && "bg-candilingo-purple/10 text-candilingo-purple font-medium"
              )}
              onClick={() => onSectionChange(`res-${section.id}`)}
            >
              <section.icon className="mr-2 h-4 w-4" />
              {section.name}
              {section.badge && (
                <span className="ml-auto bg-blue-500 text-white text-xs py-0.5 px-1.5 rounded-full">
                  {section.id === 'faq' ? '8' : '1'}
                </span>
              )}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsSidebar;
