
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  imageSrc?: string;
  className?: string;
}

const TestimonialCard = ({ 
  quote, 
  author, 
  role, 
  company, 
  imageSrc,
  className 
}: TestimonialCardProps) => {
  return (
    <div className={cn(
      "bg-white rounded-xl p-6 shadow-md card-hover border border-gray-100",
      className
    )}>
      <div className="mb-4">
        {/* Quote icon */}
        <svg className="w-8 h-8 text-techlex-blue opacity-30" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>
      
      <p className="text-gray-700 mb-5 leading-relaxed">{quote}</p>
      
      <div className="flex items-center">
        {imageSrc ? (
          <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-gray-100">
            <img src={imageSrc} alt={author} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-full bg-techlex-blue text-white flex items-center justify-center mr-4">
            <span className="font-medium text-lg">{author.charAt(0)}</span>
          </div>
        )}
        
        <div>
          <h4 className="font-semibold">{author}</h4>
          <p className="text-sm text-gray-600">{role}, {company}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
