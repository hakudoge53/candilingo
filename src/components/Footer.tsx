
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="mb-3">
              <img 
                src="/public/lovable-uploads/cbe6d14b-3d9f-4814-af61-b96347790cb1.png" 
                alt="Candilingo" 
                className="h-8"
              />
            </div>
            <p className="text-sm text-gray-600">
              Decoding technical jargon to help recruiters make better technical hiring decisions.
            </p>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-candilingo-pink">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-candilingo-pink">Team</a></li>
              <li><a href="#" className="text-gray-600 hover:text-candilingo-pink">Careers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-candilingo-pink">Contact</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-3">Products</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-candilingo-pink">AI Assistant</a></li>
              <li><a href="#" className="text-gray-600 hover:text-candilingo-pink">Browser Extension</a></li>
              <li><a href="#" className="text-gray-600 hover:text-candilingo-pink">Job Analysis</a></li>
              <li><a href="#" className="text-gray-600 hover:text-candilingo-pink">Tech Dictionary</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-candilingo-pink">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-candilingo-pink">Documentation</a></li>
              <li><Link to="/portal" className="text-gray-600 hover:text-candilingo-pink">Customer Portal</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between">
          <p className="text-sm text-gray-600 mb-4 md:mb-0">
            © 2023 Candilingo. All rights reserved.
          </p>
          <div className="space-x-6">
            <a href="#" className="text-sm text-gray-600 hover:text-candilingo-pink">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-600 hover:text-candilingo-pink">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
