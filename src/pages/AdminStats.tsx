import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Helmet } from 'react-helmet';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AdminStats = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          setIsLoading(false);
          return;
        }

        setUser(session.user);

        // Check if user has admin role
        const { data: roles, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .eq('role', 'admin')
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error checking admin role:', error);
          toast.error('Error checking permissions');
          setIsLoading(false);
          return;
        }

        setIsAuthenticated(!!roles);
        setIsLoading(false);
      } catch (error) {
        console.error('Error in admin check:', error);
        setIsLoading(false);
      }
    };

    checkAdminAccess();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          setIsAuthenticated(false);
          setUser(null);
        } else if (event === 'SIGNED_IN' && session) {
          checkAdminAccess();
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/admin-stats`
        }
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error signing in:', error);
      toast.error('Error signing in');
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success('Signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Error signing out');
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

  if (isLoading) {
    return (
      <>
        <Helmet>
          <meta name="robots" content="noindex,nofollow" />
          <title>Admin Access - Get Transfer Tunisia</title>
        </Helmet>
        <div className="min-h-screen bg-background flex items-center justify-center p-8">
          <Card className="w-full max-w-md">
            <CardContent className="flex justify-center items-center h-32">
              <div className="text-tunisia-blue">Loading...</div>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  // Show sign-in prompt if not authenticated or not admin
  if (!user || !isAuthenticated) {
    return (
      <>
        <Helmet>
          <meta name="robots" content="noindex,nofollow" />
          <title>Admin Access - Get Transfer Tunisia</title>
        </Helmet>
        <div className="min-h-screen bg-background flex items-center justify-center p-8">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-center text-tunisia-blue">Admin Access Required</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!user ? (
                <>
                  <p className="text-center text-muted-foreground">
                    Please sign in to access the admin panel
                  </p>
                  <Button 
                    onClick={handleSignIn} 
                    className="w-full bg-tunisia-blue hover:bg-tunisia-blue/90"
                  >
                    Sign In with Google
                  </Button>
                </>
              ) : (
                <>
                  <p className="text-center text-muted-foreground">
                    You don't have admin permissions. Contact a system administrator.
                  </p>
                  <Button 
                    onClick={handleSignOut} 
                    variant="outline"
                    className="w-full"
                  >
                    Sign Out
                  </Button>
                </>
              )}
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
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-tunisia-blue mb-2">Admin Statistics</h1>
            <p className="text-muted-foreground">Lightweight click tracking (localStorage only)</p>
          </div>
          <Button 
            onClick={handleSignOut} 
            variant="outline"
            className="text-tunisia-blue border-tunisia-blue hover:bg-tunisia-blue/10"
          >
            Sign Out
          </Button>
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