import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sun, Cloud, CloudRain, Wind, Thermometer, Droplets } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface WeatherData {
  location: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

const WeatherWidget: React.FC = () => {
  const { t, language } = useLanguage();
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock weather data for Tunisia locations
  useEffect(() => {
    const mockWeatherData: WeatherData[] = [
      {
        location: 'Tunis',
        temperature: 24,
        description: 'Sunny',
        humidity: 65,
        windSpeed: 12,
        icon: 'sun'
      },
      {
        location: 'Sousse',
        temperature: 26,
        description: 'Partly Cloudy',
        humidity: 70,
        windSpeed: 8,
        icon: 'cloud'
      },
      {
        location: 'Hammamet',
        temperature: 25,
        description: 'Clear',
        humidity: 68,
        windSpeed: 10,
        icon: 'sun'
      },
      {
        location: 'Monastir',
        temperature: 27,
        description: 'Sunny',
        humidity: 72,
        windSpeed: 15,
        icon: 'sun'
      }
    ];

    // Simulate API call delay
    setTimeout(() => {
      setWeatherData(mockWeatherData);
      setLoading(false);
    }, 1000);
  }, []);

  const getWeatherIcon = (iconType: string) => {
    switch (iconType) {
      case 'sun':
        return <Sun className="h-6 w-6 text-tunisia-gold" />;
      case 'cloud':
        return <Cloud className="h-6 w-6 text-tunisia-blue" />;
      case 'rain':
        return <CloudRain className="h-6 w-6 text-tunisia-turquoise" />;
      default:
        return <Sun className="h-6 w-6 text-tunisia-gold" />;
    }
  };

  const translations = {
    en: {
      title: '🌤️ Tunisia Weather',
      description: 'Current weather in popular destinations',
      loading: 'Loading weather...',
      humidity: 'Humidity',
      wind: 'Wind Speed'
    },
    fr: {
      title: '🌤️ Météo Tunisie',
      description: 'Météo actuelle dans les destinations populaires',
      loading: 'Chargement météo...',
      humidity: 'Humidité',
      wind: 'Vitesse du Vent'
    },
    ar: {
      title: '🌤️ طقس تونس',
      description: 'الطقس الحالي في الوجهات الشعبية',
      loading: 'تحميل الطقس...',
      humidity: 'الرطوبة',
      wind: 'سرعة الرياح'
    }
  };

  const wt = (key: string) => translations[language]?.[key] || translations.en[key];

  if (loading) {
    return (
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-tunisia-blue">
                {wt('loading')}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 bg-muted/30">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm shadow-elegant">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-tunisia-blue">
              {wt('title')}
            </CardTitle>
            <p className="text-muted-foreground">
              {wt('description')}
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {weatherData.map((weather, index) => (
                <div
                  key={index}
                  className="text-center p-4 rounded-lg bg-gradient-to-br from-tunisia-turquoise/10 to-tunisia-gold/10 border border-tunisia-turquoise/20"
                >
                  <div className="flex justify-center mb-2">
                    {getWeatherIcon(weather.icon)}
                  </div>
                  <h3 className="font-semibold text-tunisia-blue mb-1">
                    {weather.location}
                  </h3>
                  <div className="text-2xl font-bold text-tunisia-coral mb-1">
                    {weather.temperature}°C
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {weather.description}
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div className="flex items-center justify-center gap-1">
                      <Droplets className="h-3 w-3" />
                      <span>{weather.humidity}%</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <Wind className="h-3 w-3" />
                      <span>{weather.windSpeed} km/h</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default WeatherWidget;