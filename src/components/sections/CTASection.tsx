
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from 'sonner';
import { Calendar, Phone, CheckCircle, MessageSquare } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Define form schema with validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  company: z.string().min(1, { message: "Company name is required." }),
  country: z.string().min(1, { message: "Country is required." }),
  phone: z.string().min(5, { message: "Please enter a valid phone number." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  size: z.string().min(1, { message: "Please select your team size." }),
  captcha: z.string().min(1, { message: "Please complete the captcha." }),
});

type FormValues = z.infer<typeof formSchema>;

const CTASection = () => {
  const [captchaValue, setCaptchaValue] = useState("");
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [seatsRemaining, setSeatsRemaining] = useState(200);

  // Setup form with validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      country: "",
      phone: "",
      message: "",
      size: "",
      captcha: "",
    },
  });

  // Generate a simple math captcha
  useEffect(() => {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    setCaptchaValue(`${num1} + ${num2} = ?`);
    setCaptchaAnswer((num1 + num2).toString());
  }, []);

  const onSubmit = (data: FormValues) => {
    // Verify captcha
    if (data.captcha !== captchaAnswer) {
      toast.error("Incorrect captcha answer. Please try again.");
      return;
    }

    // Here we would send the form data to the backend
    console.log("Form submitted:", data);
    
    // Show success message
    toast.success('Thank you for your request! Our team will contact you shortly to schedule a discovery call.');
    
    // Reset form
    form.reset();
    
    // Generate new captcha
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    setCaptchaValue(`${num1} + ${num2} = ?`);
    setCaptchaAnswer((num1 + num2).toString());
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute -top-12 -right-12 w-24 h-24 bg-techlex-blue opacity-10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-techlex-lightblue opacity-10 rounded-full blur-3xl"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10">
            <div>
              <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Technical Recruitment?</h2>
              <p className="text-gray-600 mb-4">
                Schedule a discovery call with our team to learn how HighlightHire can help your recruitment process. We'll demonstrate our 4-in-1 solution and answer any questions you may have.
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                <p className="text-amber-700 text-sm mb-2">
                  <strong>Early Access Campaign:</strong> Get 50% off for the first year as an early bird.
                </p>
                <p className="text-amber-700 text-sm font-bold">
                  All plans include a 1-month free trial!
                </p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-techlex-blue mt-0.5 flex-shrink-0" />
                  <span className="ml-2">Personalized product demonstration</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-techlex-blue mt-0.5 flex-shrink-0" />
                  <span className="ml-2">Custom solution tailored to your needs</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-techlex-blue mt-0.5 flex-shrink-0" />
                  <span className="ml-2">No obligation, friendly conversation</span>
                </li>
              </ul>
            </div>
            
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
                  
                  <FormField
                    control={form.control}
                    name="captcha"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Security Check</FormLabel>
                        <div className="flex flex-col space-y-2">
                          <div className="bg-gray-100 p-2 rounded-md font-medium text-center">
                            {captchaValue}
                          </div>
                          <FormControl>
                            <Input placeholder="Enter the answer" {...field} />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-techlex-blue hover:bg-techlex-blue/90"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? 'Submitting...' : 'Schedule Discovery Call'}
                  </Button>
                  
                  <p className="text-xs text-gray-500 text-center mt-4">
                    By submitting, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
