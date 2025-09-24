import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Helmet } from 'react-helmet';

// PIN for admin access - change this to your preferred PIN
const ADMIN_PIN = "2468";

const AdminStats = () => {
  const [pin, setPin] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinError, setPinError] = useState("");

  const checkPin = () => {
    if (pin === ADMIN_PIN) {
      setIsAuthenticated(true);
      setPinError("");
    } else {
      setPinError("Incorrect PIN");
      setPin("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      checkPin();
    }
  };

  const getClickStats = (): Record<string, number> => {
    try {
      const data = JSON.parse(localStorage.getItem('contactClicks') || '{}');
      // Ensure all values are numbers
      const sanitized: Record<string, number> = {};
      for (const [key, value] of Object.entries(data)) {
        sanitized[key] = Number(value) || 0;
      }
      return sanitized;
    } catch (e) {
      return {};
    }
  };

  const stats = getClickStats();

  const statItems = [
    { key: 'WhatsApp Book', label: 'WhatsApp Bookings' },
    { key: 'Email Book', label: 'Email Bookings' },
    { key: 'PayPal Pay', label: 'PayPal Payments' },
    { key: 'Revolut Pay', label: 'Revolut Payments' },
    { key: 'WhatsApp Driver', label: 'WhatsApp Driver Applications' },
    { key: 'Email Driver', label: 'Email Driver Applications' },
  ];

  const totalClicks = Object.values(stats).reduce((sum: number, count: number) => sum + count, 0);

  const resetCounters = () => {
    localStorage.removeItem('contactClicks');
    window.location.reload();
  };

  // Show PIN prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <>
        <Helmet>
          <meta name="robots" content="noindex,nofollow" />
          <title>Admin Access - Get Transfer Tunisia</title>
        </Helmet>
        <div className="min-h-screen bg-background flex items-center justify-center p-8">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-center text-tunisia-blue">Admin Access</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="pin" className="text-sm font-medium">
                  Enter PIN:
                </label>
                <Input
                  id="pin"
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter 4-digit PIN"
                  maxLength={4}
                  className="text-center"
                />
                {pinError && (
                  <p className="text-sm text-red-600 text-center">{pinError}</p>
                )}
              </div>
              <Button 
                onClick={checkPin} 
                className="w-full bg-tunisia-blue hover:bg-tunisia-blue/90"
              >
                Access Admin Panel
              </Button>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex,nofollow" />
        <title>Admin Statistics - Get Transfer Tunisia</title>
      </Helmet>
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-tunisia-blue mb-2">Admin Statistics</h1>
          <p className="text-muted-foreground">Lightweight click tracking (localStorage only)</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="col-span-1 md:col-span-2 lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-tunisia-blue">Total Clicks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-tunisia-coral">{totalClicks}</div>
            </CardContent>
          </Card>

          {statItems.map(({ key, label }) => (
            <Card key={key}>
              <CardHeader>
                <CardTitle className="text-sm">{label}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-tunisia-blue">
                  {stats[key] || 0}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Raw Data (JSON)</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded text-sm overflow-auto">
                {JSON.stringify(stats, null, 2)}
              </pre>
            </CardContent>
          </Card>
        </div>

          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">Reset Data</CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={resetCounters}
                  variant="destructive"
                  className="w-full"
                >
                  Reset All Counters
                </Button>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  This will permanently delete all stored analytics data.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>This page shows client-side analytics stored in localStorage.</p>
            <p>No personal information is collected or stored.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminStats;