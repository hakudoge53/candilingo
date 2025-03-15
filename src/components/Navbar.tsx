
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
        <Link to="/" className="flex items-center">
          <img 
            src="/public/lovable-uploads/dd4d9cc8-eaa4-43df-bc05-3b8a88297f00.png" 
            alt="Candilingo Logo" 
            className="h-10"
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
                <div className="flex justify-center">
                  <img 
                    src="/public/lovable-uploads/cbe6d14b-3d9f-4814-af61-b96347790cb1.png" 
                    alt="Candilingo" 
                    className="h-8"
                  />
                </div>
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
