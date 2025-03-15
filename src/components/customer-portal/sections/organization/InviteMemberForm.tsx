
import React from 'react';
import { UserRole, ROLE_LABELS } from '@/types/organization';
import { useForm } from "react-hook-form";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { 
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";

interface InviteFormValues {
  email: string;
  name: string;
  role: UserRole;
}

interface InviteMemberFormProps {
  onInvite: (values: InviteFormValues) => Promise<void>;
  isLoading: boolean;
}

const InviteMemberForm: React.FC<InviteMemberFormProps> = ({
  onInvite,
  isLoading
}) => {
  const form = useForm<InviteFormValues>({
    defaultValues: {
      email: '',
      name: '',
      role: 'employee'
    }
  });

  return (
    <>
      <DialogHeader>
        <DialogTitle>Invite New Member</DialogTitle>
        <DialogDescription>
          Invite a new member to your organization.
        </DialogDescription>
      </DialogHeader>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onInvite)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john.doe@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="owner">{ROLE_LABELS['owner']}</SelectItem>
                    <SelectItem value="manager">{ROLE_LABELS['manager']}</SelectItem>
                    <SelectItem value="team_lead">{ROLE_LABELS['team_lead']}</SelectItem>
                    <SelectItem value="employee">{ROLE_LABELS['employee']}</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select the role for this member.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Inviting..." : "Invite Member"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};

export default InviteMemberForm;
