
import { useEffect } from 'react';

const TermsOfService = () => {
  useEffect(() => {
    if (window.ScrollReveal) {
      window.ScrollReveal().reveal('.fade-in', { delay: 100, distance: '20px', origin: 'bottom' });
    }
  }, []);

  return (
    <div className="min-h-screen py-16">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="fade-in">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing and using Passportify's digital product passport platform, you accept and agree 
                to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
              <p className="text-muted-foreground">
                Passportify provides a comprehensive digital product passport platform for EU regulatory compliance, 
                including AI-powered document processing, blockchain anchoring, and supplier management tools.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. User Obligations</h2>
              <p className="text-muted-foreground">
                Users are responsible for maintaining the confidentiality of their account information and 
                for all activities that occur under their account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property</h2>
              <p className="text-muted-foreground">
                The platform and its original content, features, and functionality are owned by Passportify 
                and are protected by international copyright, trademark, and other intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                In no event shall Passportify be liable for any indirect, incidental, special, consequential, 
                or punitive damages arising out of your use of the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Termination</h2>
              <p className="text-muted-foreground">
                We may terminate or suspend your account and bar access to the service immediately, 
                without prior notice or liability, under our sole discretion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Contact Information</h2>
              <p className="text-muted-foreground">
                For questions about these Terms of Service, please contact us at legal@passportify.ai
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
