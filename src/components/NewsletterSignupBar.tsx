
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle2 } from "lucide-react";

const NewsletterSignupBar = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Use the rpc call to add the subscriber
      const { error } = await supabase.rpc('add_newsletter_subscriber', { subscriber_email: email });

      if (error) {
        if (error.code === '23505') { // Unique violation error code
          toast.info("You're already subscribed to our newsletter!");
        } else {
          console.error("Subscription error:", error);
          throw error;
        }
      } else {
        setIsSuccess(true);
        toast.success("Thanks for subscribing to our newsletter!");
        setEmail('');
        
        // Reset success state after 5 seconds
        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
      }
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      toast.error("Failed to subscribe. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-candilingo-purple/90 to-candilingo-pink/90 py-2 px-4 text-white">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
        <div className="mb-2 sm:mb-0 text-center sm:text-left">
          <p className="text-sm font-medium">Stay updated with our latest features and updates!</p>
        </div>
        {isSuccess ? (
          <div className="flex items-center gap-2 text-white bg-green-500/80 px-4 py-2 rounded">
            <CheckCircle2 className="h-4 w-4" />
            <span className="text-sm font-medium">Successfully subscribed!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex w-full sm:w-auto gap-2">
            <div className="flex-1 min-w-0">
              <Label htmlFor="newsletter-email" className="sr-only">Email</Label>
              <Input
                id="newsletter-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-9 bg-white/90 border-transparent focus:border-white text-gray-800"
                disabled={isSubmitting}
                required
              />
            </div>
            <Button 
              type="submit" 
              size="sm" 
              variant="secondary"
              disabled={isSubmitting}
              className="whitespace-nowrap bg-white text-candilingo-purple hover:bg-gray-100"
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default NewsletterSignupBar;
