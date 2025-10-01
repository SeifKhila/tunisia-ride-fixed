import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CalendarIcon, Clock, MessageCircle, Mail, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { getAllLocations } from "@/data/locations";
import { useLanguage } from "@/contexts/LanguageContext";

const bookingSchema = z.object({
  pickup: z.string().min(2, "Pickup location is required"),
  dropoff: z.string().min(2, "Drop-off location is required"),
  pickupDate: z.date({ message: "Pickup date is required" }),
  pickupTime: z.string().min(1, "Pickup time is required"),
  flightNumber: z.string().optional(),
  passengers: z.string().min(1, "Number of passengers is required"),
  luggage: z.string().min(1, "Number of luggage is required"),
  children: z.boolean().default(false),
  childSeats: z.string().optional(),
  tripType: z.enum(["one-way", "return"]),
  returnDate: z.date().optional(),
  returnTime: z.string().optional(),
  customerName: z.string().min(2, "Full name is required"),
  customerPhone: z.string().min(8, "Valid phone number is required"),
  customerEmail: z.string().email("Valid email is required"),
  notes: z.string().optional(),
  consent: z.boolean().refine(val => val === true, "You must accept the terms")
}).refine(data => {
  if (data.tripType === "return") {
    return data.returnDate && data.returnTime;
  }
  return true;
}, {
  message: "Return date and time are required for return trips",
  path: ["returnDate"]
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export default function ComprehensiveBookingForm() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReturnFields, setShowReturnFields] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState<string[]>([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState<string[]>([]);
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
  const [showDropoffSuggestions, setShowDropoffSuggestions] = useState(false);

  const allLocations = getAllLocations();

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      tripType: "one-way",
      children: false,
      consent: false
    }
  });

  const filterLocations = (input: string) => {
    if (!input || input.length < 2) return [];
    return allLocations.filter(location =>
      location.toLowerCase().includes(input.toLowerCase())
    ).slice(0, 5);
  };

  const handlePickupChange = (value: string) => {
    form.setValue("pickup", value);
    const suggestions = filterLocations(value);
    setPickupSuggestions(suggestions);
    setShowPickupSuggestions(suggestions.length > 0);
  };

  const handleDropoffChange = (value: string) => {
    form.setValue("dropoff", value);
    const suggestions = filterLocations(value);
    setDropoffSuggestions(suggestions);
    setShowDropoffSuggestions(suggestions.length > 0);
  };

  const onSubmit = async (data: BookingFormValues) => {
    setIsSubmitting(true);

    try {
      // Prepare booking message
      const message = `
NEW BOOKING REQUEST

Pickup: ${data.pickup}
Drop-off: ${data.dropoff}
Date: ${format(data.pickupDate, "PPP")}
Time: ${data.pickupTime}
${data.flightNumber ? `Flight: ${data.flightNumber}` : ''}

Passengers: ${data.passengers}
Luggage: ${data.luggage}
${data.children ? `Child Seats: ${data.childSeats || 'Yes'}` : ''}

Trip Type: ${data.tripType}
${data.tripType === 'return' ? `Return: ${format(data.returnDate!, "PPP")} at ${data.returnTime}` : ''}

Customer: ${data.customerName}
Phone: ${data.customerPhone}
Email: ${data.customerEmail}
${data.notes ? `Notes: ${data.notes}` : ''}
      `.trim();

      // Send WhatsApp notification
      const whatsappUrl = `https://wa.me/447956643662?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');

      // Show success message
      toast({
        title: "Booking Request Sent!",
        description: "Thanks! We've received your request. We'll confirm on WhatsApp and email shortly.",
      });

      // Reset form
      form.reset();
      setShowReturnFields(false);

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit booking. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto border-tunisia-blue/20 shadow-tunisia bg-white/95 backdrop-blur-sm">
      <CardHeader className="text-center bg-gradient-to-r from-tunisia-blue to-tunisia-coral text-white">
        <CardTitle className={`text-3xl ${language === 'ar' ? 'font-arabic' : ''}`}>
          Book Your Transfer
        </CardTitle>
        <CardDescription className="text-white/90">
          Fill out the form below to request your transfer
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Pickup Location */}
            <FormField
              control={form.control}
              name="pickup"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>Pickup Location *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter pickup location (airport, hotel, city)"
                      onChange={(e) => handlePickupChange(e.target.value)}
                      onFocus={() => field.value && setShowPickupSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowPickupSuggestions(false), 200)}
                    />
                  </FormControl>
                  {showPickupSuggestions && pickupSuggestions.length > 0 && (
                    <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                      {pickupSuggestions.map((location) => (
                        <button
                          key={location}
                          type="button"
                          className="w-full px-4 py-2 text-left hover:bg-muted"
                          onClick={() => {
                            form.setValue("pickup", location);
                            setShowPickupSuggestions(false);
                          }}
                        >
                          {location}
                        </button>
                      ))}
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Drop-off Location */}
            <FormField
              control={form.control}
              name="dropoff"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>Drop-off Location *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter drop-off location"
                      onChange={(e) => handleDropoffChange(e.target.value)}
                      onFocus={() => field.value && setShowDropoffSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowDropoffSuggestions(false), 200)}
                    />
                  </FormControl>
                  {showDropoffSuggestions && dropoffSuggestions.length > 0 && (
                    <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                      {dropoffSuggestions.map((location) => (
                        <button
                          key={location}
                          type="button"
                          className="w-full px-4 py-2 text-left hover:bg-muted"
                          onClick={() => {
                            form.setValue("dropoff", location);
                            setShowDropoffSuggestions(false);
                          }}
                        >
                          {location}
                        </button>
                      ))}
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date and Time */}
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="pickupDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pickup Date *</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pickupTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pickup Time *</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input {...field} type="time" />
                        <Clock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Flight Number */}
            <FormField
              control={form.control}
              name="flightNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Flight Number (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., TU123" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Passengers and Luggage */}
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="passengers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Passengers *</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" min="1" placeholder="1" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="luggage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Luggage/Cases *</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" min="0" placeholder="0" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Children and Child Seats */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="children"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="!mt-0">Traveling with children (need child seats)</FormLabel>
                  </FormItem>
                )}
              />

              {form.watch("children") && (
                <FormField
                  control={form.control}
                  name="childSeats"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Child Seats</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" min="1" placeholder="1" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            {/* Trip Type */}
            <FormField
              control={form.control}
              name="tripType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trip Type *</FormLabel>
                  <FormControl>
                    <RadioGroup
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                        setShowReturnFields(value === "return");
                      }}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="one-way" id="one-way" />
                        <label htmlFor="one-way" className="cursor-pointer">One-way</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="return" id="return" />
                        <label htmlFor="return" className="cursor-pointer">Return (Save 10%!)</label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Return Trip Fields */}
            {showReturnFields && (
              <div className="grid md:grid-cols-2 gap-4 p-4 border border-tunisia-coral/30 rounded-lg bg-tunisia-coral/5">
                <FormField
                  control={form.control}
                  name="returnDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Return Date *</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < (form.watch("pickupDate") || new Date())}
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="returnTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Return Time *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input {...field} type="time" />
                          <Clock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Customer Details */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-lg font-semibold text-tunisia-blue">Your Contact Information</h3>
              
              <FormField
                control={form.control}
                name="customerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="John Doe" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="customerPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number *</FormLabel>
                      <FormControl>
                        <Input {...field} type="tel" placeholder="+44 7956 643662" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="customerEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address *</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" placeholder="your@email.com" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Notes */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes for Driver (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      placeholder="Any special requirements or additional information..."
                      className="min-h-24"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Consent */}
            <FormField
              control={form.control}
              name="consent"
              render={({ field }) => (
                <FormItem className="flex items-start space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="!mt-0 text-sm">
                    I agree to the terms and conditions and privacy policy *
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-tunisia-coral hover:bg-tunisia-coral/90 text-white font-bold py-6 text-lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Submit Booking Request
                  </>
                )}
              </Button>
              
              <p className="text-center text-sm text-muted-foreground mt-4">
                We'll confirm your booking via WhatsApp and email within 30 minutes
              </p>
              
              <div className="mt-4 text-center">
                <a
                  href="https://wa.me/447956643662"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button variant="outline" type="button" className="border-tunisia-blue text-tunisia-blue hover:bg-tunisia-blue hover:text-white">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Chat on WhatsApp Now
                  </Button>
                </a>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
