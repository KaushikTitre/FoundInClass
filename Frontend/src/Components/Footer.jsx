import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Post Lost Item', href: '#post-lost' },
    { name: 'Dashboard', href: '#dashboard' },
    { name: 'Contact', href: '#contact' }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#facebook', color: 'hover:text-blue-600' },
    { name: 'Instagram', icon: Instagram, href: '#instagram', color: 'hover:text-pink-600' },
    { name: 'Twitter', icon: Twitter, href: '#twitter', color: 'hover:text-sky-500' },
    { name: 'LinkedIn', icon: Linkedin, href: '#linkedin', color: 'hover:text-blue-700' }
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 w-full">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Company Info - Centered */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">FIC</span>
            </div>
            <h2 className="text-white text-2xl font-bold">FoundInClass</h2>
          </div>
          <p className="text-sm leading-relaxed max-w-2xl mx-auto">
            Helping reunite people with their lost belongings. Your trusted platform for reporting and finding lost items.
          </p>
        </div>

        {/* Quick Links and Contact - Two Columns */}
        <div className="flex flex-col md:flex-row justify-center gap-12 md:gap-20 lg:gap-32 mb-12">
          
          {/* Quick Links - Left */}
          <div className="text-left">
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm hover:text-blue-400 transition-colors duration-300 inline-block hover:translate-x-1 transform"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact Info - Right */}
          <div className="text-left">
            <h3 className="text-white font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-sm">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <a 
                  href="mailto:support@foundinclass.com" 
                  className="hover:text-blue-400 transition-colors duration-300"
                >
                  support@foundinclass.com
                </a>
              </li>
              <li className="flex items-start space-x-3 text-sm">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <a 
                  href="tel:+11234567890" 
                  className="hover:text-blue-400 transition-colors duration-300"
                >
                  +1 (123) 456-7890
                </a>
              </li>
              <li className="flex items-start space-x-3 text-sm">
                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span>
                  123 Main Street<br />
                  New York, NY 10001
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media - Centered */}
        <div className="text-center mb-8">
          <h3 className="text-white font-semibold text-lg mb-4">Follow Us</h3>
          <p className="text-sm mb-4">Stay connected with us on social media</p>
          <div className="flex justify-center space-x-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className={`w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center ${social.color} transition-all duration-300 hover:scale-110 hover:bg-gray-700`}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <p className="text-sm text-gray-400">
              © {currentYear} FoundInClass. All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="flex space-x-6 text-sm">
              <a href="#privacy" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#terms" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}