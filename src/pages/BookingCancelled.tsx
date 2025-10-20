import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle, Home, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const BookingCancelled = () => {
  const navigate = useNavigate();

  // Clear pending booking from session
  React.useEffect(() => {
    sessionStorage.removeItem('pendingBooking');
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
        <div className="max-w-md mx-auto">
          <Card className="p-8 text-center">
            <XCircle className="h-20 w-20 text-gray-400 mx-auto mb-4" />
            
            <h1 className="text-2xl font-bold mb-2">Booking Cancelled</h1>
            <p className="text-gray-600 mb-6">
              Your payment was cancelled or could not be completed.
              No charges have been made to your account.
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6 text-left">
              <h3 className="font-semibold mb-2">Need Help?</h3>
              <p className="text-sm text-gray-600">
                If you experienced any issues during checkout or have questions, 
                we're here to help. Contact us via WhatsApp or try booking again.
              </p>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={() => navigate('/')} 
                className="w-full"
              >
                <Home className="mr-2 h-4 w-4" />
                Try Again
              </Button>
              
              <Button 
                onClick={() => window.open('https://wa.me/447956643662?text=Hi, I had an issue with my booking payment', '_blank')}
                variant="outline"
                className="w-full"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Contact Support
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookingCancelled;