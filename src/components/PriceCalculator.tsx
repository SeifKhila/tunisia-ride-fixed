import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

interface PriceData {
  destination: string;
  price: number;
}

const monastirPrices: PriceData[] = [
  { destination: "Sousse", price: 70 },
  { destination: "Hammamet", price: 170 },
  { destination: "Yasmine Hammamet", price: 150 },
  { destination: "Mahdia", price: 90 },
];

const enfidhaPrices: PriceData[] = [
  { destination: "Hammamet", price: 120 },
  { destination: "Yasmine Hammamet", price: 110 },
  { destination: "Sousse", price: 130 },
  { destination: "Monastir", price: 150 },
  { destination: "Mahdia", price: 180 },
];

const tunisPrices: PriceData[] = [
  { destination: "Hammamet", price: 130 },
  { destination: "Yasmine Hammamet", price: 140 },
  { destination: "Sousse", price: 160 },
  { destination: "Monastir", price: 180 },
  { destination: "Mahdia", price: 200 },
];

export default function PriceCalculator() {
  const { t } = useLanguage();

  const PriceTable = ({ title, prices }: { title: string; prices: PriceData[] }) => (
    <Card className="bg-card/80 backdrop-blur-sm border border-tunisia-gold/20 shadow-elegant">
      <CardHeader className="pb-4">
        <CardTitle className="text-center text-tunisia-blue text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {prices.map((item, index) => (
          <div key={index} className="flex justify-between items-center py-2 border-b border-tunisia-gold/10 last:border-b-0">
            <span className="text-foreground font-medium">{item.destination}</span>
            <span className="text-tunisia-blue font-bold text-lg">{item.price} TND</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  return (
    <section id="calculator" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">All Fixed Prices</h2>
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <PriceTable title="From Monastir Airport" prices={monastirPrices} />
          <PriceTable title="From Enfidha Airport" prices={enfidhaPrices} />
          <PriceTable title="From Tunis-Carthage Airport" prices={tunisPrices} />
        </div>

        <div className="text-center mt-8">
          <div className="space-y-2 text-muted-foreground">
            <p className="flex items-center justify-center gap-2">
              <span className="text-tunisia-coral">🚗</span>
              <span>• Prices are per car (up to 4 passengers)</span>
            </p>
            <p className="flex items-center justify-center gap-2">
              <span className="text-tunisia-blue">🚐</span>
              <span>• For vans/minibuses, ask on WhatsApp</span>
            </p>
            <p className="flex items-center justify-center gap-2">
              <span className="text-tunisia-gold">🏨</span>
              <span>• Any location within the destination area (hotels, rentals, beaches)</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}