import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, CreditCard, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

interface PaymentDepositProps {
  bookingReference?: string;
  defaultAmount?: number;
  onPaymentInitiated?: (method: 'paypal' | 'revolut', amount: number, currency: string) => void;
}

const PaymentDeposit: React.FC<PaymentDepositProps> = ({ 
  bookingReference, 
  defaultAmount = 25,
  onPaymentInitiated 
}) => {
  const { t, language } = useLanguage();
  const [currency, setCurrency] = useState<'EUR' | 'GBP'>('EUR');
  const [amount, setAmount] = useState(defaultAmount);
  const [generatedReference, setGeneratedReference] = useState('');

  // Generate booking reference if not provided
  useEffect(() => {
    if (!bookingReference) {
      const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      const random = Math.floor(Math.random() * 99) + 1;
      const reference = `GT-${date}-${random.toString().padStart(2, '0')}`;
      setGeneratedReference(reference);
    }
  }, [bookingReference]);

  const displayReference = bookingReference || generatedReference;

  const copyReference = () => {
    navigator.clipboard.writeText(displayReference);
    toast.success('Booking reference copied to clipboard');
  };

  const handlePayPalPayment = () => {
    const paypalUrl = `https://www.paypal.me/seifkhila1/${amount}${currency}`;
    window.open(paypalUrl, '_blank');
    onPaymentInitiated?.('paypal', amount, currency);
  };

  const handleRevolutPayment = () => {
    const revolutUrl = `https://revolut.me/seifededju/${amount}${currency.toLowerCase()}`;
    window.open(revolutUrl, '_blank');
    onPaymentInitiated?.('revolut', amount, currency);
  };

  return (
    <Card className={`w-full max-w-lg mx-auto border-tunisia-gold/20 shadow-elegant ${language === 'ar' ? 'font-arabic text-right' : ''}`}>
      <CardHeader>
        <CardTitle className="text-tunisia-blue text-center flex items-center justify-center gap-2">
          <CreditCard className="w-5 h-5" />
          Pay Deposit
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Deposit Message */}
        <div className="text-center p-4 bg-tunisia-blue/10 rounded-lg">
          <p className="text-sm text-tunisia-blue font-medium leading-relaxed">
            To confirm your ride, please pay a 25% deposit online. Balance due to the driver at pickup.
          </p>
        </div>

        {/* Booking Reference */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Booking Reference:
          </label>
          <div className="flex items-center gap-2 p-3 bg-muted rounded border">
            <code className="flex-1 font-mono text-sm text-tunisia-blue font-bold">
              {displayReference}
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
            Please include this reference in your payment message
          </p>
        </div>

        {/* Currency Selection */}
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-foreground">
            Currency:
          </label>
          <Select value={currency} onValueChange={(value) => setCurrency(value as 'EUR' | 'GBP')}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="EUR">EUR</SelectItem>
              <SelectItem value="GBP">GBP</SelectItem>
            </SelectContent>
          </Select>
          <div className="text-lg font-bold text-tunisia-blue">
            {amount} {currency}
          </div>
        </div>

        {/* Payment Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handlePayPalPayment}
            className="w-full h-14 bg-[#0070ba] hover:bg-[#005a9c] text-white font-semibold text-base flex items-center justify-center gap-3"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" className="fill-current">
              <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 2.928C5.026 2.407 5.474 2 5.998 2h7.46c2.57 0 4.578.543 5.69 1.531 1.05.93 1.51 2.188 1.51 3.501 0 1.998-.797 3.592-2.314 4.632-.454.312-.956.55-1.483.709-.263.08-.53.148-.797.201-.05.01-.101.02-.152.029L15.814 13l-2.076-.001c-1.622 0-2.688.35-3.24 1.078-.264.348-.404.74-.404 1.143 0 .804.294 1.482.876 2.024.579.54 1.365.812 2.344.812 1.197 0 2.168-.272 2.883-.81.296-.223.537-.495.719-.81l.017-.032c.132-.256.2-.537.2-.837 0-.622-.186-1.117-.557-1.48-.372-.366-.867-.548-1.486-.548-.273 0-.525.04-.756.119-.232.079-.438.195-.616.347l-.015.013c-.177.152-.266.337-.266.553 0 .216.089.401.266.553.177.152.383.268.615.347.231.079.483.119.756.119.619 0 1.114.182 1.486.548.371.363.557.858.557 1.48 0 .3-.068.581-.2.837l-.017.032c-.182.315-.423.587-.719.81-.715.538-1.686.81-2.883.81-.979 0-1.765-.272-2.344-.812-.582-.542-.876-1.22-.876-2.024 0-.403.14-.795.404-1.143.552-.728 1.618-1.078 3.24-1.078L15.814 13l.1-.001z"/>
            </svg>
            Pay with PayPal
            <ExternalLink className="w-4 h-4" />
          </Button>

          <Button
            onClick={handleRevolutPayment}
            className="w-full h-14 bg-[#0075eb] hover:bg-[#0066d1] text-white font-semibold text-base flex items-center justify-center gap-3"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" className="fill-current">
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 13.5h-9v-3h9v3zm0-4.5h-9V8h9v3z"/>
            </svg>
            Pay with Revolut
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>

        {/* Payment Instructions */}
        <div className="space-y-3 text-sm">
          <div className="p-3 bg-muted/50 rounded border">
            <p className="font-medium text-tunisia-blue mb-1">PayPal Instructions:</p>
            <p className="text-muted-foreground">
              Please paste your booking reference <strong>{displayReference}</strong> in the note field during payment.
            </p>
          </div>
          
          <div className="p-3 bg-muted/50 rounded border">
            <p className="font-medium text-tunisia-blue mb-1">Revolut Instructions:</p>
            <p className="text-muted-foreground">
              Please paste your booking reference <strong>{displayReference}</strong> in the message field during payment.
            </p>
          </div>
        </div>

        {/* Card Icons */}
        <div className="flex items-center justify-center gap-4 pt-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <svg width="32" height="20" viewBox="0 0 32 20" className="border rounded">
              <rect width="32" height="20" fill="#1a1f71"/>
              <text x="16" y="13" textAnchor="middle" fill="white" fontSize="8" fontFamily="Arial">VISA</text>
            </svg>
            <svg width="32" height="20" viewBox="0 0 32 20" className="border rounded">
              <rect width="32" height="20" fill="#eb001b"/>
              <circle cx="12" cy="10" r="6" fill="#ff5f00"/>
              <circle cx="20" cy="10" r="6" fill="#f79e1b"/>
            </svg>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="text-xs text-muted-foreground text-center p-3 bg-muted/30 rounded">
          <p>
            Payments processed by PayPal or Revolut. We do not store card details.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentDeposit;