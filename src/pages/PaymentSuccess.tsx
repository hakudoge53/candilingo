
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";

const PaymentSuccess = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [sessionDetails, setSessionDetails] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    const fetchSessionDetails = async () => {
      try {
        // Get the session ID from the URL
        const params = new URLSearchParams(location.search);
        const sessionId = params.get('session_id');
        
        if (sessionId) {
          // In a real app, you would verify the session with your backend
          const { data, error } = await supabase.functions.invoke('verify-payment', {
            body: { sessionId }
          });
          
          if (error) {
            console.error('Error verifying payment:', error);
            setSessionDetails({
              status: 'success',
              paymentId: sessionId.substring(0, 8) + '...',
            });
          } else {
            setSessionDetails(data || {
              status: 'success',
              paymentId: sessionId.substring(0, 8) + '...',
            });
          }
        }
      } catch (error) {
        console.error('Error fetching session details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSessionDetails();
  }, [location]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Loader2 className="h-12 w-12 animate-spin text-candilingo-purple" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <div className="mb-6 flex justify-center">
          <CheckCircle className="h-20 w-20 text-green-500" />
        </div>
        
        <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your subscription to Candilingo. Your payment has been processed successfully.
        </p>
        
        {sessionDetails && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-gray-500 mb-1">Payment Reference:</p>
            <p className="font-medium">{sessionDetails.paymentId}</p>
          </div>
        )}
        
        <div className="space-y-3">
          <Button className="w-full" asChild>
            <Link to="/dashboard">Go to Dashboard</Link>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link to="/customer-portal">Go to Customer Portal</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
