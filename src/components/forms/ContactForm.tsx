import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Phone, MessageSquare, Calendar } from 'lucide-react';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import FormCaptcha from './FormCaptcha';
import { contactFormSchema, ContactFormValues, defaultContactFormValues } from './ContactFormSchema';

const ContactForm = () => {
  const [submitting, setSubmitting] = useState(false);

  // Setup form with validation
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: defaultContactFormValues,
  });

  const onSubmit = (data: ContactFormValues) => {
    setSubmitting(true);
    
    // Here we would send the form data to the backend
    console.log("Form submitted:", data);
    
    // Show success message
    toast.success('Thank you for your request! Our team will contact you shortly to schedule a discovery call.');
    
    // Reset form
    form.reset();
    setSubmitting(false);
  };

  return (
    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
      <h3 className="font-semibold text-xl mb-4 flex items-center">
        <Calendar className="w-5 h-5 mr-2 text-techlex-blue" />
        Request a Discovery Call
      </h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Smith" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Work Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="john@company.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your Company" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder="Germany" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-gray-400" />
                    <Input placeholder="+49 123 456 7890" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Team Size</FormLabel>
                <FormControl>
                  <select 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    {...field}
                  >
                    <option value="">Select team size</option>
                    <option value="1-5">1-5 employees</option>
                    <option value="6-20">6-20 employees</option>
                    <option value="21-50">21-50 employees</option>
                    <option value="51+">51+ employees</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Message</FormLabel>
                <FormControl>
                  <div className="flex items-start">
                    <MessageSquare className="w-4 h-4 mr-2 mt-2 text-gray-400" />
                    <Textarea 
                      placeholder="Tell us about your recruitment challenges and what you hope to achieve with HighlightHire..." 
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormCaptcha form={form} name="captcha" />
          
          <Button 
            type="submit" 
            className="w-full bg-techlex-blue hover:bg-techlex-blue/90"
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Schedule Discovery Call'}
          </Button>
          
          <p className="text-xs text-gray-500 text-center mt-4">
            By submitting, you agree to our Terms of Service and Privacy Policy.
          </p>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
