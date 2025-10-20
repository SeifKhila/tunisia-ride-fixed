import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, CreditCard, ExternalLink, MessageCircle, Mail, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useBookingReference } from "@/hooks/useBookingReference";
import { toast } from "sonner";

interface BookingBreakdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  route: {
    from: string;
    to: string;
    basePriceEUR: number;
  };
}

const BookingBreakdownModal: React.FC<BookingBreakdownModalProps> = ({
  isOpen,
  onClose,
  route
}) => {
  const { t, language } = useLanguage();
  const { currency, formatPrice, convertFromEUR } = useCurrency();
  const { bookingReference, copyToClipboard } = useBookingReference();

  // Calculate amounts
  const totalFareConverted = convertFromEUR(route.basePriceEUR, currency === 'TND' ? 'EUR' : currency);
  const deposit = Math.round(totalFareConverted * 0.25 * 100) / 100;
  const balance = Math.round((totalFareConverted - deposit) * 100) / 100;

  // Format currency for payment links
  const paymentCurrency = currency === 'TND' ? 'EUR' : currency;
  const paymentAmount = currency === 'TND' ? 
    Math.round(route.basePriceEUR * 0.25 * 100) / 100 : 
    deposit;

  const copyReference = async () => {
    const success = await copyToClipboard();
    if (success) {
      toast.success('Booking reference copied to clipboard');
    } else {
      toast.error('Failed to copy reference');
    }
  };

  // Payment and contact URLs
  const paypalUrl = `https://www.paypal.me/seifkhila1/${paymentAmount}${paymentCurrency}`;
  const revolutUrl = `https://revolut.me/seifededju/${paymentAmount}${paymentCurrency.toLowerCase()}`;
  const whatsappUrl = `https://wa.me/447956643662?text=${encodeURIComponent(`Hi Get Tunisia Transfer 👋\nI'd like to book ${route.from} ⇄ ${route.to} transfer\nBooking Ref: ${bookingReference}`)}`;
  const emailUrl = `mailto:khilas592@gmail.com?subject=${encodeURIComponent("New Booking Enquiry – Get Tunisia Transfer")}&body=${encodeURIComponent(`Hi Get Tunisia Transfer\nI'd like to book ${route.from} ⇄ ${route.to} transfer\nBooking Ref: ${bookingReference}`)}`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`max-w-lg mx-auto ${language === 'ar' ? 'font-arabic text-right' : ''}`}>
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="text-tunisia-blue">Booking Details</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Route Information */}
          <Card className="border-tunisia-blue/20">
            <CardContent className="p-4">
              <div className="text-center">
                <h3 className="font-bold text-lg text-tunisia-blue mb-2">
                  {route.from} ⇄ {route.to}
                </h3>
                <div className="text-2xl font-bold text-tunisia-coral">
                  {formatPrice(route.basePriceEUR)}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Price Breakdown */}
          <Card className="border-tunisia-gold/20">
            <CardContent className="p-4 space-y-3">
              <h4 className="font-semibold text-tunisia-blue text-center">Price Breakdown</h4>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span>Total fare:</span>
                  <span className="font-semibold">{formatPrice(route.basePriceEUR)}</span>
                </div>
                
                <div className="flex justify-between items-center text-tunisia-coral">
                  <span>Deposit now (25%):</span>
                  <span className="font-bold">
                    {currency === 'TND' ? `€${Math.round(route.basePriceEUR * 0.25 * 100) / 100}` : 
                     `${formatPrice(route.basePriceEUR * 0.25)}`}
                  </span>
                </div>
                
                <div className="flex justify-between items-center text-muted-foreground">
                  <span>Pay driver at pickup (75%):</span>
                  <span className="font-semibold">
                    {currency === 'TND' ? `€${Math.round(route.basePriceEUR * 0.75 * 100) / 100}` : 
                     `${formatPrice(route.basePriceEUR * 0.75)}`}
                  </span>
                </div>
              </div>

              <div className="text-xs text-muted-foreground text-center p-2 bg-muted/50 rounded">
                Deposit is 25% of the fare; balance due to the driver at pickup.
              </div>
            </CardContent>
          </Card>

          {/* Booking Reference */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Booking Reference:</label>
            <div className="flex items-center gap-2 p-3 bg-tunisia-blue/5 rounded border border-tunisia-blue/20">
              <code className="flex-1 font-mono text-sm text-tunisia-blue font-bold">
                {bookingReference}
              </code>
              <Button
                variant="ghost"
                size="sm"
                onClick={copyReference}
                className="h-8 w-8 p-0"
                aria-label="Copy booking reference"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Payment Buttons */}
          <div className="space-y-3">
            <a
              href={paypalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full"
            >
              <Button
                className="w-full h-14 bg-[#0070ba] hover:bg-[#005a9c] text-white font-semibold text-base flex items-center justify-center gap-3"
                aria-label={`Pay deposit with PayPal – 25% of fare (${paymentAmount} ${paymentCurrency})`}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                  <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 2.928C5.026 2.407 5.474 2 5.998 2h7.46c2.57 0 4.578.543 5.69 1.531 1.05.93 1.51 2.188 1.51 3.501 0 1.998-.797 3.592-2.314 4.632-.454.312-.956.55-1.483.709-.263.08-.53.148-.797.201-.05.01-.101.02-.152.029L15.814 13l-2.076-.001c-1.622 0-2.688.35-3.24 1.078-.264.348-.404.74-.404 1.143 0 .804.294 1.482.876 2.024.579.54 1.365.812 2.344.812 1.197 0 2.168-.272 2.883-.81.296-.223.537-.495.719-.81l.017-.032c.132-.256.2-.537.2-.837 0-.622-.186-1.117-.557-1.48-.372-.366-.867-.548-1.486-.548-.273 0-.525.04-.756.119-.232.079-.438.195-.616.347l-.015.013c-.177.152-.266.337-.266.553 0 .216.089.401.266.553.177.152.383.268.615.347.231.079.483.119.756.119.619 0 1.114.182 1.486.548.371.363.557.858.557 1.48 0 .3-.068.581-.2.837l-.017.032c-.182.315-.423.587-.719.81-.715.538-1.686.81-2.883.81-.979 0-1.765-.272-2.344-.812-.582-.542-.876-1.22-.876-2.024 0-.403.14-.795.404-1.143.552-.728 1.618-1.078 3.24-1.078L15.814 13l.1-.001z"/>
                </svg>
                Pay Deposit via PayPal
                <ExternalLink className="w-4 h-4" />
              </Button>
            </a>

            <a
              href={revolutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full"
            >
              <Button
                className="w-full h-14 bg-[#0075eb] hover:bg-[#0066d1] text-white font-semibold text-base flex items-center justify-center gap-3"
                aria-label={`Pay deposit with Revolut – 25% of fare (${paymentAmount} ${paymentCurrency})`}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 13.5h-9v-3h9v3zm0-4.5h-9V8h9v3z"/>
                </svg>
                Pay Deposit via Revolut
                <ExternalLink className="w-4 w-4" />
              </Button>
            </a>
          </div>

          {/* Contact Options */}
          <div className="border-t pt-4 space-y-3">
            <p className="text-sm text-center text-muted-foreground">
              We'll confirm by WhatsApp/Email
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 border-tunisia-blue text-tunisia-blue hover:bg-tunisia-blue hover:text-white"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </Button>
              </a>
              
              <a
                href={emailUrl}
                className="block w-full"
              >
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 border-tunisia-blue text-tunisia-blue hover:bg-tunisia-blue hover:text-white"
                >
                  <Mail className="h-4 w-4" />
                  Email
                </Button>
              </a>
            </div>
          </div>

          {/* Payment Instructions */}
          <div className="text-xs text-muted-foreground text-center p-3 bg-muted/30 rounded">
            <p className="mb-2 font-medium">Paste your booking reference in the payment note.</p>
            <p>Payments are processed by PayPal or Revolut. We don't store card details.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingBreakdownModal;