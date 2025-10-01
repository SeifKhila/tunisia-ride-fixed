import { Card, CardContent } from "@/components/ui/card";
import { Shield, CreditCard, Lock, CheckCircle, Users, Award } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const badges = [
  {
    icon: Shield,
    title: "Secure Booking",
    description: "SSL encrypted transactions"
  },
  {
    icon: CreditCard,
    title: "PayPal Verified",
    description: "Safe payment processing"
  },
  {
    icon: Lock,
    title: "Fixed Price",
    description: "No hidden fees or surcharges"
  },
  {
    icon: CheckCircle,
    title: "Licensed Drivers",
    description: "All drivers fully vetted"
  },
  {
    icon: Users,
    title: "1000+ Transfers",
    description: "Trusted by thousands"
  },
  {
    icon: Award,
    title: "Best Price Guarantee",
    description: "We match any quote"
  }
];

export default function EnhancedTrustBadges() {
  const { language } = useLanguage();

  return (
    <section className="relative py-12 bg-tunisia-blue text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h3 className={`text-2xl font-bold mb-2 ${language === 'ar' ? 'font-arabic' : ''}`}>
            Why Book With Us?
          </h3>
          <p className="text-white/80">Your safety and satisfaction are our priorities</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-7xl mx-auto">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <Card 
                key={index}
                className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
              >
                <CardContent className="p-4 text-center">
                  <Icon className="h-10 w-10 mx-auto mb-3 text-tunisia-coral" />
                  <h4 className="font-semibold text-sm mb-1">{badge.title}</h4>
                  <p className="text-xs text-white/70">{badge.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="flex justify-center gap-6 mt-8 flex-wrap">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
            <img 
              src="https://www.paypalobjects.com/webstatic/icon/pp258.png" 
              alt="PayPal" 
              className="h-6"
            />
            <span className="text-sm font-medium">PayPal Accepted</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
            <Lock className="h-5 w-5 text-tunisia-coral" />
            <span className="text-sm font-medium">SSL Secured</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
            <Award className="h-5 w-5 text-tunisia-coral" />
            <span className="text-sm font-medium">Best Price Guarantee</span>
          </div>
        </div>
      </div>
    </section>
  );
}
