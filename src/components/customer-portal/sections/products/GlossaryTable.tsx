
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGlossaries } from '@/hooks/useGlossaries';

interface GlossaryTableProps {
  organizationId?: string;
}

interface GlossaryTableRow {
  id: string;
  industry: string;
  role: string;
  public: boolean;
  company: boolean;
  team: boolean;
  personal: boolean;
  rolesSet: 'Roles Not Set' | 'Roles set' | 'Setting Now';
  status: 'Not Configured' | 'Active' | 'Completed';
}

const GlossaryTable: React.FC<GlossaryTableProps> = ({ organizationId }) => {
  const { glossaries, isLoading } = useGlossaries(organizationId);
  
  // Sample data for demonstration - in a real app, this would be derived from the glossaries
  const glossaryRows: GlossaryTableRow[] = [
    {
      id: '1',
      industry: 'IT',
      role: 'Recruiter',
      public: true,
      company: true,
      team: true,
      personal: false,
      rolesSet: 'Roles Not Set',
      status: 'Not Configured'
    },
    {
      id: '2',
      industry: 'IT',
      role: 'HR',
      public: true,
      company: true,
      team: false,
      personal: false,
      rolesSet: 'Roles Not Set',
      status: 'Not Configured'
    },
    {
      id: '3',
      industry: 'IT',
      role: 'Team Leader',
      public: false,
      company: true,
      team: false,
      personal: false,
      rolesSet: 'Roles set',
      status: 'Active'
    },
    {
      id: '4',
      industry: 'IT',
      role: 'Digital Marketer',
      public: false,
      company: false,
      team: false,
      personal: false,
      rolesSet: 'Roles set',
      status: 'Completed'
    }
  ];

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'Not Configured':
        return <Badge variant="outline" className="bg-pink-100 text-pink-800 border-pink-300">Not Configured</Badge>;
      case 'Active':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300">Setting Now</Badge>;
      case 'Completed':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Industry</TableHead>
            <TableHead className="w-[120px]">Role</TableHead>
            <TableHead className="w-[80px] text-center">Public</TableHead>
            <TableHead className="w-[80px] text-center">Company</TableHead>
            <TableHead className="w-[80px] text-center">Team</TableHead>
            <TableHead className="w-[80px] text-center">Personal</TableHead>
            <TableHead className="w-[150px]">Roles - Edit</TableHead>
            <TableHead className="w-[120px]">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {glossaryRows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.industry}</TableCell>
              <TableCell>{row.role}</TableCell>
              <TableCell className="text-center">{row.public ? 'Yes' : 'No'}</TableCell>
              <TableCell className="text-center">{row.company ? 'Yes' : 'No'}</TableCell>
              <TableCell className="text-center">{row.team ? 'Yes' : 'No'}</TableCell>
              <TableCell className="text-center">{row.personal ? 'Yes' : 'No'}</TableCell>
              <TableCell>{row.rolesSet}</TableCell>
              <TableCell>{renderStatusBadge(row.status)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default GlossaryTable;
