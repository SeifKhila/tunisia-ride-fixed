import React, { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Loader2, Save, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AdminPricingSettings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    flat_eur_uplift: 5.00,
    eur_rounding_decimals: 2,
    gbp_rounding_decimals: 2,
    usd_rounding_decimals: 2,
    tnd_rounding_to_nearest: 1,
    enable_live_fx: true,
    fx_cache_hours: 6,
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('pricing_settings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error) throw error;
      
      if (data) {
        setSettings({
          flat_eur_uplift: Number(data.flat_eur_uplift),
          eur_rounding_decimals: data.eur_rounding_decimals,
          gbp_rounding_decimals: data.gbp_rounding_decimals,
          usd_rounding_decimals: data.usd_rounding_decimals,
          tnd_rounding_to_nearest: data.tnd_rounding_to_nearest,
          enable_live_fx: data.enable_live_fx,
          fx_cache_hours: data.fx_cache_hours,
        });
      }
    } catch (error: any) {
      console.error('Error loading settings:', error);
      toast({
        title: "Error",
        description: "Failed to load pricing settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from('pricing_settings')
        .insert({
          ...settings,
          updated_by: user?.id,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Pricing settings updated successfully",
      });
    } catch (error: any) {
      console.error('Error saving settings:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to save pricing settings",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Pricing Settings</h2>
        <Button onClick={loadSettings} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="space-y-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <Label htmlFor="flat_eur_uplift" className="text-lg font-semibold">
            Flat EUR Uplift (Service Fee)
          </Label>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-2xl font-bold text-blue-600">€</span>
            <Input
              id="flat_eur_uplift"
              type="number"
              step="0.01"
              min="0"
              value={settings.flat_eur_uplift}
              onChange={(e) => setSettings({ ...settings, flat_eur_uplift: parseFloat(e.target.value) })}
              className="text-lg font-semibold max-w-32"
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Added to every ride price before currency conversion
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="eur_decimals">EUR Decimals</Label>
            <Input
              id="eur_decimals"
              type="number"
              min="0"
              max="4"
              value={settings.eur_rounding_decimals}
              onChange={(e) => setSettings({ ...settings, eur_rounding_decimals: parseInt(e.target.value) })}
            />
          </div>
          
          <div>
            <Label htmlFor="gbp_decimals">GBP Decimals</Label>
            <Input
              id="gbp_decimals"
              type="number"
              min="0"
              max="4"
              value={settings.gbp_rounding_decimals}
              onChange={(e) => setSettings({ ...settings, gbp_rounding_decimals: parseInt(e.target.value) })}
            />
          </div>
          
          <div>
            <Label htmlFor="usd_decimals">USD Decimals</Label>
            <Input
              id="usd_decimals"
              type="number"
              min="0"
              max="4"
              value={settings.usd_rounding_decimals}
              onChange={(e) => setSettings({ ...settings, usd_rounding_decimals: parseInt(e.target.value) })}
            />
          </div>
          
          <div>
            <Label htmlFor="tnd_nearest">TND Round To</Label>
            <Input
              id="tnd_nearest"
              type="number"
              min="1"
              value={settings.tnd_rounding_to_nearest}
              onChange={(e) => setSettings({ ...settings, tnd_rounding_to_nearest: parseInt(e.target.value) })}
            />
          </div>
        </div>

        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <Label htmlFor="enable_live_fx" className="font-semibold">
              Enable Live FX Rates
            </Label>
            <p className="text-sm text-gray-600">
              Automatically fetch exchange rates from API
            </p>
          </div>
          <Switch
            id="enable_live_fx"
            checked={settings.enable_live_fx}
            onCheckedChange={(checked) => setSettings({ ...settings, enable_live_fx: checked })}
          />
        </div>

        <div>
          <Label htmlFor="fx_cache_hours">FX Cache Duration (hours)</Label>
          <Input
            id="fx_cache_hours"
            type="number"
            min="1"
            max="24"
            value={settings.fx_cache_hours}
            onChange={(e) => setSettings({ ...settings, fx_cache_hours: parseInt(e.target.value) })}
            className="max-w-32"
          />
          <p className="text-sm text-gray-600 mt-1">
            How long to cache exchange rates before refreshing
          </p>
        </div>

        <Button onClick={saveSettings} disabled={saving} className="w-full">
          {saving ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</>
          ) : (
            <><Save className="mr-2 h-4 w-4" /> Save Settings</>
          )}
        </Button>
      </div>
    </Card>
  );
};

export default AdminPricingSettings;