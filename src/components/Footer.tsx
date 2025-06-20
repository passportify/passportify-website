
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-muted border-t">
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img
                src="/passportify-logo.png"
                alt="Passportify"
                className="h-8 w-auto"
              />
            </div>    
            <p className="text-sm text-muted-foreground">
              Digital Product Passport platform for EU regulation compliance. 
              AI-driven, blockchain-anchored, supplier-ready.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="font-semibold">Product</h3>
            <div className="space-y-2">
              <Link to="/platform" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Platform
              </Link>
              <Link to="/how-it-works" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                How It Works
              </Link>
              <Link to="/why-passportify" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Why Passportify
              </Link>
            </div>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-semibold">Company</h3>
            <div className="space-y-2">
              <Link to="/compliance" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Compliance
              </Link>
              <Link to="/resources" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Resources
              </Link>
              <Link to="/contact" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Legal & Social */}
          <div className="space-y-4">
            <h3 className="font-semibold">Legal</h3>
            <div className="space-y-2">
              <Link to="/legal/privacy-policy" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/legal/terms-of-service" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                LinkedIn
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Twitter
              </a>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Passportify. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-sm text-muted-foreground">Language:</span>
            <select className="text-sm bg-background border rounded px-2 py-1">
              <option>EN</option>
              <option>DE</option>
              <option>FR</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
