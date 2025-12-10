import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, CheckCircle, XCircle, ExternalLink } from "lucide-react";

const VALID_TOKEN = "READY2025";

const QASelfTest = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<any>(null);
  const [healthCheck, setHealthCheck] = useState<any>(null);

  if (token !== VALID_TOKEN) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Alert variant="destructive">
          <AlertDescription>Invalid or missing token. Access denied.</AlertDescription>
        </Alert>
      </div>
    );
  }

  const runHealthCheck = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('healthz');
      if (error) throw error;
      setHealthCheck(data);
    } catch (error: any) {
      console.error('Health check failed:', error);
      setHealthCheck({ ok: false, error: error.message });
    }
  };

  const runE2ETest = async () => {
    setIsRunning(true);
    setTestResults(null);

    try {
      // Run health check first
      await runHealthCheck();

      // Run the self-test
      const { data, error } = await supabase.functions.invoke('booking-selftest', {
        body: {},
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (error) throw error;
      
      setTestResults(data);
    } catch (error: any) {
      console.error('Test failed:', error);
      setTestResults({ ok: false, error: error.message });
    } finally {
      setIsRunning(false);
    }
  };

  const openWhatsAppFallback = () => {
    const message = `🚗 NEW BOOKING REQUEST

👤 Customer: John Doe (TEST)
📱 Phone: +216 28 602 147
📧 Email: gemma.test+qa@example.com

📍 Pickup: Yasmine Hammamet
📍 Drop-off: Enfidha (NBE)
📅 Date: 2025-10-16
⏰ Time: 10:00
✈️ Flight: TU123

👥 Passengers: 3
🧳 Luggage: 3

🔄 Trip Type: one-way

📝 Notes: Child seat please (TEST)

---
Get Tunisia Transfer`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/21628602147?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>QA Self-Test: WhatsApp Booking Flow</CardTitle>
            <CardDescription>
              End-to-end test of the booking form WhatsApp delivery system
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <Button 
                onClick={runE2ETest} 
                disabled={isRunning}
                size="lg"
              >
                {isRunning && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Run End-to-End Test
              </Button>
              
              <Button 
                onClick={openWhatsAppFallback}
                variant="outline"
                size="lg"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Open WhatsApp Fallback
              </Button>

              <Button 
                onClick={runHealthCheck}
                variant="secondary"
                size="lg"
              >
                Check Health
              </Button>
            </div>

            {healthCheck && (
              <Card className="bg-muted">
                <CardHeader>
                  <CardTitle className="text-base">Health Check</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="text-xs overflow-auto p-3 bg-background rounded">
                    {JSON.stringify(healthCheck, null, 2)}
                  </pre>
                </CardContent>
              </Card>
            )}

            {testResults && (
              <div className="space-y-4">
                <Alert variant={testResults.ok ? "default" : "destructive"}>
                  <AlertDescription className="flex items-center gap-2">
                    {testResults.ok ? (
                      <>
                        <CheckCircle className="h-4 w-4" />
                        Test completed successfully
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4" />
                        Test failed: {testResults.error}
                      </>
                    )}
                  </AlertDescription>
                </Alert>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">WhatsApp Result</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Status:</span>
                        {testResults.whatsapp?.ok ? (
                          <span className="text-green-600 flex items-center gap-1">
                            <CheckCircle className="h-4 w-4" />
                            Sent
                          </span>
                        ) : (
                          <span className="text-red-600 flex items-center gap-1">
                            <XCircle className="h-4 w-4" />
                            Failed
                          </span>
                        )}
                      </div>
                      {testResults.whatsapp?.messageId && (
                        <div>
                          <span className="font-medium">Message ID:</span> {testResults.whatsapp.messageId}
                        </div>
                      )}
                      <pre className="text-xs overflow-auto p-3 bg-muted rounded">
                        {JSON.stringify(testResults.whatsapp, null, 2)}
                      </pre>
                    </div>
                  </CardContent>
                </Card>

                {testResults.email?.attempted && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Email Result</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <pre className="text-xs overflow-auto p-3 bg-muted rounded">
                        {JSON.stringify(testResults.email, null, 2)}
                      </pre>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Test Payload</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="text-xs overflow-auto p-3 bg-muted rounded">
                      {JSON.stringify(testResults.payloadEcho, null, 2)}
                    </pre>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Full Response</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="text-xs overflow-auto p-3 bg-muted rounded">
                      {JSON.stringify(testResults, null, 2)}
                    </pre>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QASelfTest;
