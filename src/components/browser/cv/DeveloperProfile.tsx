
import React from 'react';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';

const DeveloperProfile = () => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-semibold">
          JD
        </div>
        <div>
          <h3 className="font-semibold text-base text-candilingo-purple">John Developer</h3>
          <p className="text-gray-600">Senior Software Engineer</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mt-2">
        <div className="flex items-center gap-1">
          <Mail className="w-3.5 h-3.5 text-gray-400" />
          <span>john.dev@example.com</span>
        </div>
        <div className="flex items-center gap-1">
          <Phone className="w-3.5 h-3.5 text-gray-400" />
          <span>(123) 456-7890</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-gray-400" />
          <span>San Francisco, CA</span>
        </div>
        <div className="flex items-center gap-1">
          <Linkedin className="w-3.5 h-3.5 text-gray-400" />
          <span>linkedin.com/in/johndev</span>
        </div>
      </div>
    </div>
  );
};

export default DeveloperProfile;
