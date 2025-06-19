
import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const HowItWorks = () => {
  useEffect(() => {
    if (window.ScrollReveal) {
      window.ScrollReveal().reveal('.fade-in', { delay: 100, distance: '20px', origin: 'bottom' });
      window.ScrollReveal().reveal('.step-card', { delay: 150, distance: '30px', origin: 'bottom', interval: 200 });
    }
  }, []);

  const steps = [
    {
      number: 1,
      title: 'Company & Product Onboarding',
      description: 'Set up your organization profile and register products requiring DPP compliance.',
      details: [
        'Configure company profile with regulatory requirements',
        'Register product categories and specifications',
        'Define supplier network and document requirements',
        'Set up compliance workflows and approval processes'
      ],
      icon: '🏢'
    },
    {
      number: 2,
      title: 'Supplier Document Upload',
      description: 'Suppliers access dedicated portals to upload certificates and compliance documents.',
      details: [
        'Suppliers receive automated invitations with portal access',
        'Upload certificates, test reports, and compliance documents',
        'Real-time validation and format checking',
        'Automated notifications for missing or expired documents'
      ],
      icon: '📄'
    },
    {
      number: 3,
      title: 'AI Verification & Scoring',
      description: 'Our AI engines process, verify, and score all uploaded documentation automatically.',
      details: [
        'Document intelligence extracts key data points',
        'Cross-reference information against regulatory databases',
        'Calculate DPP compliance scores using ML algorithms',
        'Flag anomalies and potential compliance issues'
      ],
      icon: '🤖'
    },
    {
      number: 4,
      title: 'Blockchain Anchoring',
      description: 'Verified data is cryptographically secured and timestamped on blockchain infrastructure.',
      details: [
        'Generate cryptographic fingerprints of all data',
        'Anchor timestamps and hashes to distributed ledger',
        'Create verifiable credentials using W3C standards',
        'Establish immutable audit trail for compliance'
      ],
      icon: '🔗'
    },
    {
      number: 5,
      title: 'Public Passport Creation',
      description: 'Generate consumer-facing QR codes linking to public digital product passports.',
      details: [
        'Automatically generate unique QR codes per product',
        'Create mobile-optimized public passport pages',
        'Display compliance status, certifications, and sustainability data',
        'Support multi-language localization for global markets'
      ],
      icon: '📱'
    }
  ];

  return (
    <div className="min-h-screen py-16">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-4 mb-16 fade-in">
          <h1 className="text-4xl md:text-5xl font-bold">How It Works</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From company onboarding to public passport creation, our platform automates 
            the entire DPP compliance journey with AI-powered workflows.
          </p>
        </div>

        {/* Process Timeline */}
        <div className="space-y-8">
          {steps.map((step, index) => (
            <div key={step.number} className="step-card">
              <Card className="relative overflow-hidden hover-scale">
                {/* Step Number */}
                <div className="absolute top-6 left-6 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {step.number}
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Content */}
                  <div className="pl-24 pr-6 py-6">
                    <CardHeader className="p-0">
                      <CardTitle className="text-2xl mb-2 flex items-center gap-3">
                        <span className="text-2xl">{step.icon}</span>
                        {step.title}
                      </CardTitle>
                      <CardDescription className="text-lg">{step.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 mt-6">
                      <ul className="space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start gap-2">
                            <span className="text-primary">•</span>
                            <span className="text-sm text-muted-foreground">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </div>
                  
                  {/* Visual */}
                  <div className="flex items-center justify-center p-6">
                    <div className="w-64 h-48 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
                      <span className="text-6xl">{step.icon}</span>
                    </div>
                  </div>
                </div>
                
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="absolute bottom-0 left-12 w-0.5 h-8 bg-border transform translate-y-full"></div>
                )}
              </Card>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-20 text-center fade-in">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Complete DPP Lifecycle Management</CardTitle>
              <CardDescription className="text-lg">
                Our platform handles the entire digital product passport lifecycle, 
                from initial setup to consumer-facing compliance information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">&lt; 24h</div>
                  <div className="text-sm text-muted-foreground">Average Setup Time</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">95%</div>
                  <div className="text-sm text-muted-foreground">Document Processing Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">100%</div>
                  <div className="text-sm text-muted-foreground">Blockchain Security</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
