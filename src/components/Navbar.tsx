import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
import { 
  Menu, 
  BookOpen, 
  LayoutDashboard, 
  UserCircle, 
  Settings,
  Home,
  PieChart 
} from "lucide-react";
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { isLoggedIn, handleLogout, activeUser } = useAuth();
  const location = useLocation();

  // Helper to determine if a link is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Get active link class
  const getActiveLinkClass = (path: string) => {
    return isActive(path) 
      ? "text-candilingo-purple font-semibold" 
      : "text-gray-700 hover:text-candilingo-purple font-medium";
  };

  return (
    <div className="bg-white py-4 shadow-sm sticky top-0 z-50 dark:bg-gray-900 dark:text-white">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/3ba829c2-54b7-4152-b767-9eb28429dbd7.png" 
            alt="Candilingo" 
            className="h-10 w-auto mr-2" 
          />
          <span className="text-lg font-semibold text-candilingo-purple dark:text-white">Candilingo</span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex gap-8 items-center">
          <Link to="/" className={`${getActiveLinkClass('/')} hidden md:flex items-center gap-1 dark:text-gray-200`}>
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Link>
          
          <Link to="/how-it-works" className={`${getActiveLinkClass('/how-it-works')} hidden md:flex items-center gap-1 dark:text-gray-200`}>
            <BookOpen className="h-4 w-4" />
            <span>How It Works</span>
          </Link>
          
          {isLoggedIn && (
            <>
              <Link to="/dashboard" className={`${getActiveLinkClass('/dashboard')} hidden md:flex items-center gap-1`}>
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
              
              <Link to="/customer-portal" className={`${getActiveLinkClass('/customer-portal')} hidden md:flex items-center gap-1`}>
                <UserCircle className="h-4 w-4" />
                <span>Portal</span>
              </Link>
            </>
          )}
          
          {/* Authentication Buttons */}
          {isLoggedIn ? (
            <div className="hidden md:flex items-center gap-4">
              {activeUser && (
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-candilingo-purple/20 text-candilingo-purple flex items-center justify-center">
                    {activeUser.name ? activeUser.name[0].toUpperCase() : 'U'}
                  </div>
                </div>
              )}
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/customer-portal" className="text-gray-700 hover:text-candilingo-purple font-medium">
                Login
              </Link>
              <Link to="/customer-portal">
                <Button size="sm" variant="purple">Sign Up</Button>
              </Link>
            </div>
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
              <SheetTitle className="flex items-center">
                <img 
                  src="/lovable-uploads/3ba829c2-54b7-4152-b767-9eb28429dbd7.png" 
                  alt="Candilingo" 
                  className="h-6 w-auto mr-2" 
                />
                Candilingo
              </SheetTitle>
              <SheetDescription>
                Decoding technical jargon to help recruiters make better technical hiring decisions
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6 flex flex-col gap-2">
              <Link to="/" className={`flex items-center gap-2 p-2 rounded-md ${isActive('/') ? 'bg-candilingo-purple/10 text-candilingo-purple' : 'hover:bg-gray-100'}`}>
                <PieChart className="h-4 w-4" />
                Home
              </Link>
              
              <Link to="/how-it-works" className={`flex items-center gap-2 p-2 rounded-md ${isActive('/how-it-works') ? 'bg-candilingo-purple/10 text-candilingo-purple' : 'hover:bg-gray-100'}`}>
                <BookOpen className="h-4 w-4" />
                How It Works
              </Link>
              
              {isLoggedIn && (
                <>
                  <Link to="/dashboard" className={`flex items-center gap-2 p-2 rounded-md ${isActive('/dashboard') ? 'bg-candilingo-purple/10 text-candilingo-purple' : 'hover:bg-gray-100'}`}>
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>
                  
                  <Link to="/customer-portal" className={`flex items-center gap-2 p-2 rounded-md ${isActive('/customer-portal') ? 'bg-candilingo-purple/10 text-candilingo-purple' : 'hover:bg-gray-100'}`}>
                    <UserCircle className="h-4 w-4" />
                    Customer Portal
                  </Link>
                  
                  <Link to="/customer-portal?section=settings" className={`flex items-center gap-2 p-2 rounded-md ${location.search.includes('settings') ? 'bg-candilingo-purple/10 text-candilingo-purple' : 'hover:bg-gray-100'}`}>
                    <Settings className="h-4 w-4" />
                    Account Settings
                  </Link>
                </>
              )}
              
              <div className="my-2 border-t border-gray-100"></div>
              
              {isLoggedIn ? (
                <Button variant="outline" size="sm" className="w-full mt-2" onClick={handleLogout}>
                  Logout
                </Button>
              ) : (
                <div className="space-y-2">
                  <Link to="/customer-portal" className="block w-full">
                    <Button variant="outline" size="sm" className="w-full">Login</Button>
                  </Link>
                  <Link to="/customer-portal" className="block w-full">
                    <Button variant="purple" size="sm" className="w-full">Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Navbar;
