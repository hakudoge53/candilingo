
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
    <div className="bg-white py-4 shadow-sm">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-candilingo-purple">
          <span className="text-candilingo-purple text-3xl font-bold">Candi</span>
          <span className="text-candilingo-pink text-3xl font-bold">lingo</span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex gap-8 items-center">
          <Link to="/" className="text-gray-700 hover:text-candilingo-purple font-medium hidden md:block">
            Home
          </Link>
          <Link to="/how-it-works" className="text-gray-700 hover:text-candilingo-purple font-medium hidden md:block">
            How It Works
          </Link>
          {isLoggedIn && (
            <Link to="/dashboard" className="text-gray-700 hover:text-candilingo-purple font-medium hidden md:block">
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
              <Link to="/portal" className="text-gray-700 hover:text-candilingo-purple font-medium hidden md:block">
                Login
              </Link>
              <Link to="/portal" className="hidden md:block">
                <Button size="sm" variant="purple">Sign Up</Button>
              </Link>
            </>
          )}

          <ThemeToggle />
        </nav>

        {/* Mobile Menu Button */}
        <Sheet>
          <SheetTrigger className="md:hidden">
            <Menu className="h-6 w-6 text-candilingo-purple cursor-pointer" />
          </SheetTrigger>
          <SheetContent side="left" className="bg-white">
            <SheetHeader>
              <SheetTitle>
                <span className="text-candilingo-purple font-bold">Candi</span>
                <span className="text-candilingo-pink font-bold">lingo</span>
              </SheetTitle>
              <SheetDescription>
                Decoding technical jargon to help recruiters make better technical hiring decisions.
              </SheetDescription>
            </SheetHeader>
            <div className="mt-4">
              <Link to="/" className="block py-2 text-gray-800 hover:bg-gray-100">
                Home
              </Link>
              <Link to="/how-it-works" className="block py-2 text-gray-800 hover:bg-gray-100">
                How It Works
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
