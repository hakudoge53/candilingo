
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-3">TechLex</h3>
            <p className="text-sm text-gray-600">
              Bridging the gap between legal professionals and technology expertise.
            </p>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-techlex-blue">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-techlex-blue">Team</a></li>
              <li><a href="#" className="text-gray-600 hover:text-techlex-blue">Careers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-techlex-blue">Contact</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-3">Products</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-techlex-blue">AI Assistant</a></li>
              <li><a href="#" className="text-gray-600 hover:text-techlex-blue">Browser Extension</a></li>
              <li><a href="#" className="text-gray-600 hover:text-techlex-blue">Job Analysis</a></li>
              <li><a href="#" className="text-gray-600 hover:text-techlex-blue">Tech Dictionary</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-techlex-blue">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-techlex-blue">Documentation</a></li>
              <li><Link to="/glossary" className="text-gray-600 hover:text-techlex-blue">Glossary</Link></li>
              <li><Link to="/portal" className="text-gray-600 hover:text-techlex-blue">Customer Portal</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between">
          <p className="text-sm text-gray-600 mb-4 md:mb-0">
            © 2023 TechLex. All rights reserved.
          </p>
          <div className="space-x-6">
            <a href="#" className="text-sm text-gray-600 hover:text-techlex-blue">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-600 hover:text-techlex-blue">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
