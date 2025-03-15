
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-50 to-gray-100 py-10 mt-auto border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-3 text-candilingo-purple">Candilingo</h3>
            <p className="text-sm text-gray-600">
              Decoding technical jargon to help recruiters make better technical hiring decisions.
            </p>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-3 text-candilingo-teal">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-candilingo-teal transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-candilingo-teal transition-colors">Team</a></li>
              <li><a href="#" className="text-gray-600 hover:text-candilingo-teal transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-3 text-candilingo-coral">Products</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-candilingo-coral transition-colors">AI Assistant</a></li>
              <li><a href="#" className="text-gray-600 hover:text-candilingo-coral transition-colors">Browser Extension</a></li>
              <li><a href="#" className="text-gray-600 hover:text-candilingo-coral transition-colors">Job Analysis</a></li>
              <li><a href="#" className="text-gray-600 hover:text-candilingo-coral transition-colors">Tech Dictionary</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-3 text-candilingo-pink">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/blog" className="text-gray-600 hover:text-candilingo-pink transition-colors">Blog</Link></li>
              <li><Link to="/documentation" className="text-gray-600 hover:text-candilingo-pink transition-colors">Documentation</Link></li>
              <li><Link to="/customer-portal" className="text-gray-600 hover:text-candilingo-pink transition-colors">Customer Portal</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between">
          <p className="text-sm text-gray-600 mb-4 md:mb-0">
            © 2025 Candilingo. All rights reserved.
          </p>
          <div className="space-x-6">
            <a href="#" className="text-sm text-gray-600 hover:text-candilingo-purple transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-600 hover:text-candilingo-purple transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
