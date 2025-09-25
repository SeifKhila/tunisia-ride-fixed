import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, CreditCard, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useBookingReference } from "@/hooks/useBookingReference";
import { toast } from "sonner";
import { paymentAmountSchema, bookingReferenceSchema } from "@/lib/validation";

interface PaymentDepositProps {
  totalFareEUR: number;
  onPaymentInitiated?: (method: 'paypal' | 'revolut', amount: number, currency: string) => void;
}

const PaymentDeposit: React.FC<PaymentDepositProps> = ({ 
  totalFareEUR,
  onPaymentInitiated 
}) => {
  const { t, language } = useLanguage();
  const { currency: globalCurrency, convertFromEUR, formatPrice } = useCurrency();
  const { bookingReference, copyToClipboard } = useBookingReference();
  
  // Calculate deposit amounts
  const totalFareConverted = convertFromEUR(totalFareEUR, globalCurrency === 'TND' ? 'EUR' : globalCurrency);
  const depositAmount = Math.round(totalFareConverted * 0.25 * 100) / 100;
  const balanceAmount = Math.round((totalFareConverted - depositAmount) * 100) / 100;
  
  // For payment links, use EUR for TND currency, otherwise use the selected currency
  const paymentCurrency = globalCurrency === 'TND' ? 'EUR' : globalCurrency;
  const paymentAmount = globalCurrency === 'TND' ? 
    Math.round(totalFareEUR * 0.25 * 100) / 100 : 
    depositAmount;

  const copyReference = async () => {
    const success = await copyToClipboard();
    if (success) {
      toast.success(t('booking.reference_copied') || 'Booking reference copied to clipboard');
    } else {
      toast.error('Failed to copy reference');
    }
  };

  const handlePayPalPayment = () => {
    // Validate payment amount and booking reference
    const amountValidation = paymentAmountSchema.safeParse(paymentAmount);
    const referenceValidation = bookingReferenceSchema.safeParse(bookingReference);
    
    if (!amountValidation.success) {
      toast.error('Invalid payment amount');
      return;
    }
    
    if (!referenceValidation.success) {
      toast.error('Invalid booking reference');
      return;
    }
    
    const paypalUrl = `https://www.paypal.me/seifkhila1/${paymentAmount}${paymentCurrency}`;
    window.open(paypalUrl, '_blank', 'noopener,noreferrer');
    onPaymentInitiated?.('paypal', paymentAmount, paymentCurrency);
  };

  const handleRevolutPayment = () => {
    // Validate payment amount and booking reference
    const amountValidation = paymentAmountSchema.safeParse(paymentAmount);
    const referenceValidation = bookingReferenceSchema.safeParse(bookingReference);
    
    if (!amountValidation.success) {
      toast.error('Invalid payment amount');
      return;
    }
    
    if (!referenceValidation.success) {
      toast.error('Invalid booking reference');
      return;
    }
    
    const revolutUrl = `https://revolut.me/seifededju/${paymentAmount}${paymentCurrency.toLowerCase()}`;
    window.open(revolutUrl, '_blank', 'noopener,noreferrer');
    onPaymentInitiated?.('revolut', paymentAmount, paymentCurrency);
  };

  return (
    <Card className={`w-full max-w-lg mx-auto border-tunisia-gold/20 shadow-elegant ${language === 'ar' ? 'font-arabic text-right' : ''}`}>
      <CardHeader>
        <CardTitle className="text-tunisia-blue text-center flex items-center justify-center gap-2">
          <CreditCard className="w-5 h-5" />
          {t('payment.pay_deposit') || 'Pay Deposit'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Price Breakdown */}
        <div className="space-y-3 p-4 bg-tunisia-blue/10 rounded-lg border border-tunisia-blue/20">
          <h4 className="font-semibold text-tunisia-blue text-center">Price Breakdown</h4>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span>Total fare:</span>
              <span className="font-semibold">{formatPrice(totalFareEUR)}</span>
            </div>
            
            <div className="flex justify-between items-center text-tunisia-coral">
              <span>Deposit now (25%):</span>
              <span className="font-bold">
                {globalCurrency === 'TND' ? `€${Math.round(totalFareEUR * 0.25 * 100) / 100}` : 
                 `${formatPrice(totalFareEUR * 0.25)}`}
              </span>
            </div>
            
            <div className="flex justify-between items-center text-muted-foreground">
              <span>Pay driver at pickup (75%):</span>
              <span className="font-semibold">
                {globalCurrency === 'TND' ? `€${Math.round(totalFareEUR * 0.75 * 100) / 100}` : 
                 `${formatPrice(totalFareEUR * 0.75)}`}
              </span>
            </div>
          </div>

          <div className="text-xs text-muted-foreground text-center p-2 bg-muted/50 rounded">
            Deposit is 25% of the fare; balance due to the driver at pickup.
          </div>
        </div>

        {/* Booking Reference */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            {t('payment.booking_reference') || 'Booking Reference:'}
          </label>
          <div className="flex items-center gap-2 p-3 bg-muted rounded border">
            <code className="flex-1 font-mono text-sm text-tunisia-blue font-bold">
              {bookingReference}
            </code>
            <Button
              variant="ghost"
              size="sm"
              onClick={copyReference}
              className="h-8 w-8 p-0"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            {t('payment.copy_reference') || 'Copy this reference for your payment'}
          </p>
        </div>


        {/* Payment Buttons */}
        <div className="space-y-3">
            <Button
            onClick={handlePayPalPayment}
            className="w-full h-14 bg-[#0070ba] hover:bg-[#005a9c] text-white font-semibold text-base flex items-center justify-center gap-3"
            aria-label={`Pay deposit with PayPal – 25% of fare (${paymentAmount} ${paymentCurrency})`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" className="fill-current">
              <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 2.928C5.026 2.407 5.474 2 5.998 2h7.46c2.57 0 4.578.543 5.69 1.531 1.05.93 1.51 2.188 1.51 3.501 0 1.998-.797 3.592-2.314 4.632-.454.312-.956.55-1.483.709-.263.08-.53.148-.797.201-.05.01-.101.02-.152.029L15.814 13l-2.076-.001c-1.622 0-2.688.35-3.24 1.078-.264.348-.404.74-.404 1.143 0 .804.294 1.482.876 2.024.579.54 1.365.812 2.344.812 1.197 0 2.168-.272 2.883-.81.296-.223.537-.495.719-.81l.017-.032c.132-.256.2-.537.2-.837 0-.622-.186-1.117-.557-1.48-.372-.366-.867-.548-1.486-.548-.273 0-.525.04-.756.119-.232.079-.438.195-.616.347l-.015.013c-.177.152-.266.337-.266.553 0 .216.089.401.266.553.177.152.383.268.615.347.231.079.483.119.756.119.619 0 1.114.182 1.486.548.371.363.557.858.557 1.48 0 .3-.068.581-.2.837l-.017.032c-.182.315-.423.587-.719.81-.715.538-1.686.81-2.883.81-.979 0-1.765-.272-2.344-.812-.582-.542-.876-1.22-.876-2.024 0-.403.14-.795.404-1.143.552-.728 1.618-1.078 3.24-1.078L15.814 13l.1-.001z"/>
            </svg>
            {t('payment.pay_with_paypal') || 'Pay Deposit via PayPal'}
            <ExternalLink className="w-4 h-4" />
          </Button>

          <Button
            onClick={handleRevolutPayment}
            className="w-full h-14 bg-[#0075eb] hover:bg-[#0066d1] text-white font-semibold text-base flex items-center justify-center gap-3"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" className="fill-current">
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 13.5h-9v-3h9v3zm0-4.5h-9V8h9v3z"/>
            </svg>
            {t('payment.pay_with_revolut') || 'Pay with Revolut'}
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>

        {/* Payment Instructions */}
        <div className="text-xs text-muted-foreground text-center p-3 bg-muted/30 rounded">
          <p className="mb-2 font-medium">Paste your booking reference in the payment note.</p>
          <p>Payments are processed by PayPal or Revolut. We don't store card details.</p>
        </div>

        {/* Card Icons */}
        <div className="flex items-center justify-center gap-4 pt-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <svg width="32" height="20" viewBox="0 0 32 20" className="border rounded">
              <rect width="32" height="20" fill="#1a1f71"/>
              <text x="16" y="13" textAnchor="middle" fill="white" fontSize="8" fontFamily="Arial, sans-serif">VISA</text>
            </svg>
            <svg width="32" height="20" viewBox="0 0 32 20" className="border rounded">
              <rect width="32" height="20" fill="white"/>
              <circle cx="12" cy="10" r="6" fill="#eb001b"/>
              <circle cx="20" cy="10" r="6" fill="#f79e1b"/>
              <circle cx="16" cy="10" r="6" fill="#ff5f00"/>
            </svg>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentDeposit;