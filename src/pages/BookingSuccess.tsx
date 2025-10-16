import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2, Home, Mail, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const BookingSuccess = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(true);
  const [booking, setBooking] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    completeBooking();
  }, []);

  const completeBooking = async () => {
    try {
      // Get pending booking from session storage
      const pendingData = sessionStorage.getItem('pendingBooking');
      if (!pendingData) {
        throw new Error('No pending booking found');
      }

      const { bookingData, depositInfo, paymentMethod, orderId } = JSON.parse(pendingData);

      // Complete the booking via edge function
      const { data, error } = await supabase.functions.invoke('complete-booking', {
        body: {
          paymentMethod,
          orderId,
          bookingData,
          depositInfo,
        },
      });

      if (error) throw error;

      setBooking(data.booking);
      sessionStorage.removeItem('pendingBooking');
      
      toast({
        title: "🎉 Booking Confirmed!",
        description: `Your booking reference is ${data.booking.reference}`,
      });

    } catch (err: any) {
      console.error('Booking completion error:', err);
      setError(err.message || 'Failed to complete booking');
      toast({
        title: "Booking Error",
        description: err.message || "Failed to complete booking. Please contact support.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (isProcessing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <Card className="p-8 text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-blue-600" />
          <h2 className="text-xl font-semibold mb-2">Completing Your Booking...</h2>
          <p className="text-gray-600">Please wait while we process your payment</p>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-50 p-4">
          <Card className="p-8 max-w-md text-center">
            <div className="text-red-500 mb-4">
              <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">Booking Error</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Button onClick={() => navigate('/')}>
              <Home className="mr-2 h-4 w-4" />
              Return Home
            </Button>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8">
            <div className="text-center mb-8">
              <CheckCircle2 className="h-20 w-20 text-green-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold mb-2">Booking Confirmed! 🎉</h1>
              <p className="text-gray-600">Thank you for choosing Get Tunisia Transfer</p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6">
              <h3 className="font-semibold text-lg mb-4">Booking Reference</h3>
              <div className="text-3xl font-bold text-blue-600 text-center tracking-wider">
                {booking?.reference}
              </div>
              <p className="text-sm text-center text-gray-600 mt-2">
                Save this reference for your records
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <h3 className="font-semibold text-lg">Payment Summary</h3>
              
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Total Fare:</span>
                <span className="font-semibold">{booking?.currency}{booking?.total?.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between py-2 border-b bg-green-50 px-4 rounded">
                <span className="text-green-700 font-semibold">Deposit Paid ✓</span>
                <span className="font-bold text-green-700">{booking?.currency}{booking?.deposit?.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Balance Due on Pickup:</span>
                <span className="font-semibold text-lg">{booking?.currency}{booking?.balance?.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <h4 className="font-semibold mb-2">What Happens Next?</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <Mail className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-yellow-600" />
                  <span>Check your email for a detailed confirmation</span>
                </li>
                <li className="flex items-start">
                  <MessageCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-yellow-600" />
                  <span>We'll send driver details 24 hours before pickup</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">💰</span>
                  <span>Pay the remaining balance ({booking?.currency}{booking?.balance?.toFixed(2)}) directly to your driver</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🚗</span>
                  <span>Your driver will meet you with a name board</span>
                </li>
              </ul>
            </div>

            <div className="flex gap-4">
              <Button onClick={() => navigate('/')} variant="outline" className="flex-1">
                <Home className="mr-2 h-4 w-4" />
                Return Home
              </Button>
              
              <Button 
                onClick={() => window.open(`https://wa.me/21628602147?text=Hi, I have a question about booking ${booking?.reference}`, '_blank')}
                className="flex-1 bg-[#25D366] hover:bg-[#20BA5A]"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Contact Us
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookingSuccess;