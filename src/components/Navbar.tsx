
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from 'react-router-dom';
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-white shadow-md py-2" 
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="h-10 w-10 rounded-md bg-techlex-blue text-white flex items-center justify-center mr-2 animate-pulse-subtle">
                <span className="font-bold text-lg">T</span>
              </div>
              <span className="font-bold text-xl hidden sm:inline-block">TechLex EU</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="font-medium text-gray-700 hover:text-techlex-blue transition-colors">Features</a>
            <a href="#how-it-works" className="font-medium text-gray-700 hover:text-techlex-blue transition-colors">How It Works</a>
            <a href="#pricing" className="font-medium text-gray-700 hover:text-techlex-blue transition-colors">Pricing</a>
            <a href="#contact" className="font-medium text-gray-700 hover:text-techlex-blue transition-colors">Contact</a>
            <Button className="btn-primary">
              Request Early Access
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 px-2 rounded-lg bg-white shadow-lg animate-fade-in">
            <div className="flex flex-col space-y-4">
              <a 
                href="#features" 
                className="font-medium text-gray-700 hover:text-techlex-blue transition-colors px-2 py-1.5"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#how-it-works" 
                className="font-medium text-gray-700 hover:text-techlex-blue transition-colors px-2 py-1.5"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How It Works
              </a>
              <a 
                href="#pricing" 
                className="font-medium text-gray-700 hover:text-techlex-blue transition-colors px-2 py-1.5"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <a 
                href="#contact" 
                className="font-medium text-gray-700 hover:text-techlex-blue transition-colors px-2 py-1.5"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>
              <Button className="btn-primary" onClick={() => setIsMobileMenuOpen(false)}>
                Request Early Access
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
