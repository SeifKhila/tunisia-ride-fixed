import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Are prices per person or per car?",
    answer: "All our prices are per car (up to 4 passengers), not per person. This makes it more affordable for families and groups traveling together."
  },
  {
    question: "Do you have larger vehicles available?",
    answer: "Yes! We have vans and minibuses for larger groups. Contact us via WhatsApp with your group size and we'll provide pricing for appropriate vehicles."
  },
  {
    question: "What if my flight is delayed?",
    answer: "Flight delays are covered! We monitor your flight status and adjust pickup times automatically. No extra charges for flight delays."
  },
  {
    question: "What is your cancellation policy?",
    answer: "Free cancellation up to 48 hours before your scheduled pickup time. Cancellations within 48 hours may be subject to the deposit amount."
  },
  {
    question: "How do I pay?",
    answer: "Pay a 30% deposit via Revolut or PayPal after booking confirmation. The remaining balance is paid directly to the driver upon pickup."
  },
  {
    question: "Do you provide child seats?",
    answer: "Yes, we can provide child seats upon request. Please mention this when booking via WhatsApp or email so we can arrange appropriate seating."
  },
  {
    question: "Are there any hidden fees?",
    answer: "No hidden fees! Our listed prices include taxes and tolls. No night or holiday surcharges are applied to our fixed prices."
  },
  {
    question: "What if my destination isn't listed?",
    answer: "Contact us with your specific pickup and drop-off locations, dates, and times. We'll provide you with the best price for any destination in Tunisia."
  }
];

export default function FAQ() {
  return (
    <section id="faq" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Frequently Asked Questions</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about our airport transfer service
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}