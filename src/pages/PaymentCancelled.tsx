
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';

const PaymentCancelled = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [returnUrl, setReturnUrl] = useState('/customer-portal');

  useEffect(() => {
    // Could potentially fetch additional session information from Stripe
    // if needed in the future
    const referrer = document.referrer;
    if (referrer && referrer.includes(window.location.hostname)) {
      setReturnUrl(referrer);
    }
    
    // Log for debugging
    console.log("Payment cancelled, session ID:", sessionId);
  }, [sessionId]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="mx-auto w-16 h-16 flex items-center justify-center">
            <XCircle className="w-16 h-16 text-red-500" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900">Payment Cancelled</h1>
          
          <p className="text-gray-600">
            Your payment process was cancelled. No charges have been made to your account.
          </p>
          
          <div className="pt-4 space-y-3">
            <Button asChild variant="purple" className="w-full">
              <Link to={returnUrl}>
                Return to Candilingo
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="w-full">
              <Link to="/customer-portal">
                Go to Customer Portal
              </Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PaymentCancelled;
