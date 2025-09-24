import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const DriverForm = () => {
  const { t, language } = useLanguage();

  return (
    <Card className={`w-full max-w-4xl mx-auto ${language === 'ar' ? 'font-arabic text-right' : ''}`} id="drivers">
      <CardHeader>
        <CardTitle className="text-2xl text-tunisia-blue">{t('driver.title')}</CardTitle>
        <CardDescription>Join our network of professional drivers. Fill out the form below to apply.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          {/* Placeholder for Tally form - User needs to replace with actual embed code */}
          <div className="bg-muted/20 border-2 border-dashed border-muted rounded-lg p-8 text-center">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold mb-4">Driver Application Form</h3>
            <p className="text-muted-foreground mb-4">
              To complete the setup, please:
            </p>
            <ol className="text-left text-sm text-muted-foreground space-y-2 max-w-md mx-auto">
              <li>1. Go to <a href="https://tally.so" target="_blank" rel="noopener noreferrer" className="text-tunisia-blue hover:underline">Tally.so</a> and create a free account</li>
              <li>2. Create a new form with these fields:
                <ul className="ml-4 mt-1 space-y-1">
                  <li>• Full Name (required)</li>
                  <li>• Email (required)</li>
                  <li>• Phone/WhatsApp (required)</li>
                  <li>• City/Zone(s) (required)</li>
                  <li>• Vehicle Type (required)</li>
                  <li>• Years Experience (required)</li>
                  <li>• Languages (required)</li>
                  <li>• Driver's License/ID Upload (required)</li>
                  <li>• Notes (optional)</li>
                </ul>
              </li>
              <li>3. Set up email notifications to: your-email@gmail.com</li>
              <li>4. Add this autoresponder: "Thanks for applying to drive with Get Tunisia Transfer. We'll review your details and get back to you within 24 hours."</li>
              <li>5. Get the embed code and replace this placeholder</li>
            </ol>
            
            {/* Temporary form structure showing the expected fields */}
            <div className="mt-8 p-6 bg-background rounded-lg border text-left">
              <h4 className="font-semibold mb-4">Expected Form Structure:</h4>
              <div className="space-y-4 text-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name *</label>
                    <div className="h-10 bg-muted rounded border"></div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email *</label>
                    <div className="h-10 bg-muted rounded border"></div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone (WhatsApp) *</label>
                    <div className="h-10 bg-muted rounded border"></div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">City/Zone(s) *</label>
                    <div className="h-10 bg-muted rounded border"></div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Vehicle Type *</label>
                    <div className="h-10 bg-muted rounded border"></div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Years Experience *</label>
                    <div className="h-10 bg-muted rounded border"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Languages *</label>
                  <div className="h-10 bg-muted rounded border"></div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Driver's License/ID Upload *</label>
                  <div className="h-20 bg-muted rounded border flex items-center justify-center">
                    <span className="text-muted-foreground">File Upload Area</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Notes</label>
                  <div className="h-20 bg-muted rounded border"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* This is where the actual Tally embed will go */}
          {/* 
          Replace the placeholder above with your Tally embed code, something like:
          <iframe 
            data-tally-src="https://tally.so/embed/YOUR_FORM_ID" 
            width="100%" 
            height="800" 
            frameBorder="0" 
            marginHeight="0" 
            marginWidth="0" 
            title="Driver Application">
          </iframe>
          */}
        </div>
      </CardContent>
    </Card>
  );
};

export default DriverForm;
