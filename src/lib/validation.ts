import { z } from 'zod';

// Booking reference validation
export const bookingReferenceSchema = z.string()
  .regex(/^GT-\d{8}-\d{2}$/, 'Invalid booking reference format')
  .length(14, 'Booking reference must be exactly 14 characters');

// Message content validation (for WhatsApp/Email)
export const messageContentSchema = z.string()
  .min(1, 'Message cannot be empty')
  .max(2000, 'Message is too long (max 2000 characters)')
  .refine(
    (value) => {
      // Basic sanitization - no script tags or suspicious content
      const dangerousPatterns = [
        /<script/i,
        /javascript:/i,
        /on\w+\s*=/i,
        /data:text\/html/i
      ];
      return !dangerousPatterns.some(pattern => pattern.test(value));
    },
    'Message contains potentially unsafe content'
  );

// Payment amount validation
export const paymentAmountSchema = z.number()
  .min(0.01, 'Payment amount must be greater than 0')
  .max(10000, 'Payment amount is too large')
  .multipleOf(0.01, 'Payment amount must be a valid currency amount');

// Contact form validation schemas
export const contactFormSchema = z.object({
  name: z.string()
    .trim()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s\u0600-\u06FF\u0080-\u024F\u1E00-\u1EFF]+$/, 'Name contains invalid characters'),
  
  email: z.string()
    .trim()
    .email('Invalid email address')
    .max(255, 'Email must be less than 255 characters'),
    
  phone: z.string()
    .trim()
    .min(8, 'Phone number must be at least 8 digits')
    .max(20, 'Phone number must be less than 20 characters')
    .regex(/^[+]?[\d\s\-\(\)]+$/, 'Invalid phone number format')
    .optional(),
    
  message: z.string()
    .trim()
    .min(1, 'Message is required')
    .max(1000, 'Message must be less than 1000 characters')
});

// URL sanitization helper
export const sanitizeUrl = (url: string): string => {
  try {
    const urlObj = new URL(url);
    // Only allow http, https, mailto, and WhatsApp protocols
    const allowedProtocols = ['http:', 'https:', 'mailto:', 'whatsapp:'];
    if (!allowedProtocols.includes(urlObj.protocol)) {
      throw new Error('Invalid protocol');
    }
    return urlObj.toString();
  } catch {
    return '#'; // Return safe default
  }
};

// Text sanitization for display (escape HTML)
export const sanitizeText = (text: string): string => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

// Validate and sanitize booking message
export const validateBookingMessage = (message: string) => {
  try {
    messageContentSchema.parse(message);
    return {
      isValid: true,
      sanitizedMessage: sanitizeText(message),
      error: null
    };
  } catch (error) {
    return {
      isValid: false,
      sanitizedMessage: '',
      error: error instanceof z.ZodError ? error.issues[0]?.message : 'Invalid message'
    };
  }
};