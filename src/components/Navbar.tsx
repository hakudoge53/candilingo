
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "@/hooks/auth/useAuth";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react";
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { isLoggedIn, handleLogout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="bg-candilingo-pink py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white">
          <img 
            src="/lovable-uploads/c4cf5eba-6c4b-4b24-9ef1-840fd66a9bd6.png" 
            alt="Candilingo" 
            className="h-12 w-auto" 
          />
        </Link>

        {/* Navigation Links */}
        <nav className="flex gap-8 items-center">
          <Link to="/" className="text-white hover:text-gray-300 font-medium hidden md:block">
            Home
          </Link>
          {isLoggedIn && (
            <Link to="/dashboard" className="text-white hover:text-gray-300 font-medium hidden md:block">
              Dashboard
            </Link>
          )}
          
          {/* Authentication Buttons */}
          {isLoggedIn ? (
            <Button variant="outline" size="sm" className="hidden md:block" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Link to="/portal" className="text-white hover:text-gray-300 font-medium hidden md:block">
                Login
              </Link>
              <Link to="/portal" className="text-white hover:text-gray-300 font-medium hidden md:block">
                Sign Up
              </Link>
            </>
          )}

          <ThemeToggle />
        </nav>

        {/* Mobile Menu Button */}
        <Sheet>
          <SheetTrigger className="md:hidden">
            <Menu className="h-6 w-6 text-white cursor-pointer" />
          </SheetTrigger>
          <SheetContent side="left" className="bg-white">
            <SheetHeader>
              <SheetTitle>
                <img 
                  src="/lovable-uploads/3ba829c2-54b7-4152-b767-9eb28429dbd7.png" 
                  alt="Candilingo" 
                  className="h-10 w-auto" 
                />
              </SheetTitle>
              <SheetDescription>
                Decoding technical jargon to help recruiters make better technical hiring decisions.
              </SheetDescription>
            </SheetHeader>
            <div className="mt-4">
              <Link to="/" className="block py-2 text-gray-800 hover:bg-gray-100">
                Home
              </Link>
              {isLoggedIn && (
                <>
                  <Link to="/dashboard" className="block py-2 text-gray-800 hover:bg-gray-100">
                    Dashboard
                  </Link>
                  <Link to="/portal" className="block py-2 text-gray-800 hover:bg-gray-100">
                    Customer Portal
                  </Link>
                </>
              )}
              {isLoggedIn ? (
                <Button variant="outline" size="sm" className="w-full mt-2" onClick={handleLogout}>
                  Logout
                </Button>
              ) : (
                <>
                  <Link to="/portal" className="block py-2 text-gray-800 hover:bg-gray-100">
                    Login
                  </Link>
                  <Link to="/portal" className="block py-2 text-gray-800 hover:bg-gray-100">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
            <ThemeToggle />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Navbar;
