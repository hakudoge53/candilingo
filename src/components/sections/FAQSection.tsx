
const FAQSection = () => {
  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about Candilingo
          </p>
        </div>
        
        <div className="space-y-6 glossary-fade-in">
          <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
            <h3 className="font-semibold text-xl mb-2">How does the browser extension work?</h3>
            <p className="text-gray-600">
              Candilingo integrates with your browser and automatically identifies technical terms on web pages, PDFs, and other documents. It highlights these terms and provides instant definitions when you hover over them.
            </p>
          </div>
          
          <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
            <h3 className="font-semibold text-xl mb-2">Can I create custom terminology definitions?</h3>
            <p className="text-gray-600">
              Yes! You can create custom glossaries with your own definitions and explanations. This is perfect for company-specific terminology or for focusing on particular technology sectors.
            </p>
          </div>
          
          <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
            <h3 className="font-semibold text-xl mb-2">Which browsers are supported?</h3>
            <p className="text-gray-600">
              Candilingo works with all major browsers including Chrome, Firefox, Safari, and Edge. The extension offers the same features and functionality across all supported browsers.
            </p>
          </div>
          
          <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
            <h3 className="font-semibold text-xl mb-2">Is my data secure?</h3>
            <p className="text-gray-600">
              Yes, we take data security very seriously. The extension processes documents locally on your device whenever possible. Any data sent to our servers is encrypted and we never store the actual content of your documents or web pages.
            </p>
          </div>
          
          <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
            <h3 className="font-semibold text-xl mb-2">How can I get early access?</h3>
            <p className="text-gray-600">
              You can request early access by signing up with your email on our website. Early access users will receive exclusive benefits, including extended free trial periods and priority support.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
