import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const DriverForm = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceZones: '',
    vehicleDetails: '',
    vehiclePhotos: '',
    documents: '',
    availability: '',
    consent: false
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{ applicationId?: string; success: boolean } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) {
      toast.error("Please accept the terms and conditions");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('submit-driver-application', {
        body: formData
      });

      if (error) throw error;

      if (data.success) {
        setSubmissionResult({ applicationId: data.applicationId, success: true });
        setIsSubmitted(true);
        toast.success(t('driver.success'));
      } else {
        throw new Error(data.error || 'Failed to submit driver application');
      }
    } catch (error: any) {
      console.error('Driver application submission error:', error);
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-4">🚗</div>
          <h3 className="text-2xl font-bold text-tunisia-blue mb-4">Application Submitted!</h3>
          <p className="text-muted-foreground">{t('driver.success')}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`w-full max-w-2xl mx-auto ${language === 'ar' ? 'font-arabic text-right' : ''}`} id="drivers">
      <CardHeader>
        <CardTitle className="text-2xl text-tunisia-blue">{t('driver.title')}</CardTitle>
        <CardDescription>Join our network of professional drivers</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="driver-name">{t('driver.name')}</Label>
              <Input
                id="driver-name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
                className="min-h-[48px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="driver-email">{t('driver.email')}</Label>
              <Input
                id="driver-email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                className="min-h-[48px]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="driver-phone">{t('driver.phone')}</Label>
            <Input
              id="driver-phone"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              required
              className="min-h-[48px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="service-zones">{t('driver.service_zones')}</Label>
            <Textarea
              id="service-zones"
              value={formData.serviceZones}
              onChange={(e) => handleInputChange('serviceZones', e.target.value)}
              placeholder="List the areas where you provide service (e.g., Tunis, Hammamet, Sousse...)"
              className="min-h-[80px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="vehicle-details">{t('driver.vehicle_details')}</Label>
            <Textarea
              id="vehicle-details"
              value={formData.vehicleDetails}
              onChange={(e) => handleInputChange('vehicleDetails', e.target.value)}
              placeholder="Vehicle type, make, model, year, number of seats, luggage capacity..."
              className="min-h-[80px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="vehicle-photos">{t('driver.vehicle_photos')}</Label>
            <Input
              id="vehicle-photos"
              type="file"
              multiple
              accept="image/*"
              className="min-h-[48px]"
            />
            <p className="text-sm text-muted-foreground">Upload photos of your vehicle (exterior and interior)</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="documents">{t('driver.documents')}</Label>
            <Input
              id="documents"
              type="file"
              multiple
              accept="image/*,.pdf"
              className="min-h-[48px]"
            />
            <p className="text-sm text-muted-foreground">Upload ID, driving license, and insurance documents</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="availability">{t('driver.availability')}</Label>
            <Textarea
              id="availability"
              value={formData.availability}
              onChange={(e) => handleInputChange('availability', e.target.value)}
              placeholder="Your availability (days, hours, special notes...)"
              className="min-h-[80px]"
            />
          </div>

          {/* Consent */}
          <div className={`flex items-start space-x-2 ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <Checkbox
              id="driver-consent"
              checked={formData.consent}
              onCheckedChange={(checked) => handleInputChange('consent', !!checked)}
              className="mt-1"
            />
            <Label htmlFor="driver-consent" className="text-sm leading-relaxed">
              {t('driver.consent')}
            </Label>
          </div>

          <Button 
            type="submit" 
            className="w-full min-h-[48px] bg-tunisia-coral hover:bg-tunisia-coral/90 text-white font-semibold"
            disabled={!formData.consent || isLoading}
          >
            {isLoading ? "Submitting..." : t('driver.submit')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DriverForm;