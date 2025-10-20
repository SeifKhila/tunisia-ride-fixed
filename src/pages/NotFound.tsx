import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md mx-auto p-8">
        <h1 className="text-6xl font-bold mb-4 text-tunisia-blue">404</h1>
        <p className="text-xl text-foreground mb-6">Page not found</p>
        <div className="space-y-4 text-muted-foreground">
          <p>We're a simple booking service that operates via:</p>
          <div className="flex flex-col gap-2">
            <p>📱 WhatsApp: +44 7956 643 662</p>
            <p>📧 Email: khilas592@gmail.com</p>
          </div>
          <p className="text-sm">No online accounts or complex forms - just direct contact for bookings.</p>
        </div>
        <a 
          href="/" 
          className="inline-block mt-6 px-6 py-3 bg-tunisia-blue text-white rounded-lg hover:bg-tunisia-blue/90 transition-colors"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
