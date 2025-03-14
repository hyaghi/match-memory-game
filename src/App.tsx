
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { initAnalytics } from "./config/firebase";

// Create a query client
const queryClient = new QueryClient();

// Add extensive console logs to help debug
console.log("App rendering, environment:", import.meta.env.MODE);
console.log("Base URL:", import.meta.env.BASE_URL);
console.log("Current URL:", window.location.href);
console.log("Window location object:", {
  pathname: window.location.pathname,
  hash: window.location.hash,
  search: window.location.search
});

const App = () => {
  console.log("App component rendering");
  
  // Initialize Firebase Analytics when app loads
  useEffect(() => {
    const setupAnalytics = async () => {
      try {
        const analytics = await initAnalytics();
        if (analytics) {
          console.log("Firebase Analytics initialized successfully");
        } else {
          console.log("Firebase Analytics not supported in this environment");
        }
      } catch (error) {
        console.error("Error initializing Firebase Analytics:", error);
      }
    };
    
    setupAnalytics();
  }, []);
  
  return (
    <div className="app-root">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <HashRouter>
            <div className="app-container">
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </HashRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </div>
  );
};

export default App;
