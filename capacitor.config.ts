import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.fc61611a285c4349a471c691fd9f33d0',
  appName: 'tunisia-ride-fixed',
  webDir: 'dist',
  server: {
    url: 'https://fc61611a-285c-4349-a471-c691fd9f33d0.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0
    }
  }
};

export default config;