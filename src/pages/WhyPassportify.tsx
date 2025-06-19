
import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const WhyPassportify = () => {
  useEffect(() => {
    if (window.ScrollReveal) {
      window.ScrollReveal().reveal('.fade-in', { delay: 100, distance: '20px', origin: 'bottom' });
      window.ScrollReveal().reveal('.comparison-table', { delay: 200, distance: '30px', origin: 'bottom' });
    }
  }, []);

  const features = [
    { name: 'AI-Based Document Preprocessing', passportify: true, circularise: false, spreadsheets: false },
    { name: 'Verifiable Credentials (VC)', passportify: true, circularise: false, spreadsheets: false },
    { name: 'DPP Score Calculation', passportify: true, circularise: false, spreadsheets: false },
    { name: 'Audit Trail Viewer', passportify: true, circularise: false, spreadsheets: false },
    { name: 'Public QR Passport Viewer', passportify: true, circularise: true, spreadsheets: false },
    { name: 'Blockchain Anchoring', passportify: true, circularise: true, spreadsheets: false },
    { name: 'Supplier Portal', passportify: true, circularise: true, spreadsheets: false },
    { name: 'Multi-Language Support', passportify: true, circularise: false, spreadsheets: false },
    { name: 'Real-time Compliance Monitoring', passportify: true, circularise: false, spreadsheets: false },
    { name: 'Automated Regulatory Reporting', passportify: true, circularise: false, spreadsheets: false },
  ];

  const whyNowReasons = [
    {
      title: 'EU Battery Regulation (2027)',
      description: 'Mandatory DPP for all batteries sold in EU market starting February 2027',
      urgency: 'Critical'
    },
    {
      title: 'Electronics DPP (2028)',
      description: 'Extension to electronics and electrical equipment across EU',
      urgency: 'High'
    },
    {
      title: 'Competitive Advantage',
      description: 'Early adoption provides significant market positioning benefits',
      urgency: 'Strategic'
    },
    {
      title: 'Supply Chain Pressure',
      description: 'Major manufacturers requiring DPP compliance from suppliers',
      urgency: 'Immediate'
    }
  ];

  const targetAudiences = [
    {
      role: 'Compliance Managers',
      description: 'Streamline regulatory compliance with automated workflows and real-time monitoring',
      benefits: ['Automated document collection', 'Real-time compliance scoring', 'Audit-ready reporting']
    },
    {
      role: 'Product Teams',
      description: 'Integrate DPP requirements into product development and lifecycle management',
      benefits: ['Product passport templates', 'Supplier integration tools', 'Public-facing QR codes']
    },
    {
      role: 'Sustainability Heads',
      description: 'Demonstrate environmental compliance and sustainability commitments transparently',
      benefits: ['Sustainability metrics tracking', 'Public transparency tools', 'ESG reporting integration']
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Strategic': return 'bg-blue-100 text-blue-800';
      case 'Immediate': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen py-16">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-4 mb-16 fade-in">
          <h1 className="text-4xl md:text-5xl font-bold">Why Passportify?</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The only AI-powered, blockchain-secured DPP platform designed specifically 
            for EU regulatory compliance and built for enterprise scale.
          </p>
        </div>

        {/* Feature Comparison */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center fade-in">Platform Comparison</h2>
          <div className="comparison-table">
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-4 font-semibold">Feature</th>
                      <th className="text-center p-4 font-semibold text-primary">Passportify</th>
                      <th className="text-center p-4 font-semibold">Circularise</th>
                      <th className="text-center p-4 font-semibold">Spreadsheets</th>
                    </tr>
                  </thead>
                  <tbody>
                    {features.map((feature, index) => (
                      <tr key={feature.name} className="border-b hover:bg-muted/25">
                        <td className="p-4 font-medium">{feature.name}</td>
                        <td className="text-center p-4">
                          {feature.passportify ? (
                            <span className="text-green-600 text-xl">✅</span>
                          ) : (
                            <span className="text-red-500 text-xl">❌</span>
                          )}
                        </td>
                        <td className="text-center p-4">
                          {feature.circularise ? (
                            <span className="text-green-600 text-xl">✅</span>
                          ) : (
                            <span className="text-red-500 text-xl">❌</span>
                          )}
                        </td>
                        <td className="text-center p-4">
                          {feature.spreadsheets ? (
                            <span className="text-green-600 text-xl">✅</span>
                          ) : (
                            <span className="text-red-500 text-xl">❌</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </section>

        {/* Why Now */}
        <section className="mb-20">
          <div className="text-center space-y-4 mb-12 fade-in">
            <h2 className="text-3xl font-bold">Why Now?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The regulatory landscape is changing rapidly. Early preparation is essential for compliance readiness.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyNowReasons.map((reason, index) => (
              <Card key={reason.title} className="hover-scale fade-in" style={{animationDelay: `${index * 100}ms`}}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{reason.title}</CardTitle>
                    <Badge className={getUrgencyColor(reason.urgency)}>{reason.urgency}</Badge>
                  </div>
                  <CardDescription>{reason.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Target Audiences */}
        <section className="mb-20">
          <div className="text-center space-y-4 mb-12 fade-in">
            <h2 className="text-3xl font-bold">Built for Compliance Professionals</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Designed specifically for the teams responsible for regulatory compliance and sustainability.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {targetAudiences.map((audience, index) => (
              <Card key={audience.role} className="hover-scale fade-in" style={{animationDelay: `${index * 150}ms`}}>
                <CardHeader>
                  <CardTitle className="text-xl text-primary">{audience.role}</CardTitle>
                  <CardDescription className="text-base">{audience.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {audience.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Key Differentiators */}
        <section>
          <div className="text-center space-y-4 mb-12 fade-in">
            <h2 className="text-3xl font-bold">What Makes Us Different</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover-scale fade-in">
              <CardHeader>
                <CardTitle className="text-2xl">🤖</CardTitle>
                <CardTitle className="text-lg">AI-First Approach</CardTitle>
                <CardDescription>Automated document processing and compliance scoring</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center hover-scale fade-in">
              <CardHeader>
                <CardTitle className="text-2xl">🔗</CardTitle>
                <CardTitle className="text-lg">Blockchain Security</CardTitle>
                <CardDescription>Immutable audit trails and verifiable credentials</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center hover-scale fade-in">
              <CardHeader>
                <CardTitle className="text-2xl">⚡</CardTitle>
                <CardTitle className="text-lg">Rapid Deployment</CardTitle>
                <CardDescription>Up and running in under 24 hours</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center hover-scale fade-in">
              <CardHeader>
                <CardTitle className="text-2xl">🎯</CardTitle>
                <CardTitle className="text-lg">EU-Specific</CardTitle>
                <CardDescription>Built exclusively for EU DPP regulations</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default WhyPassportify;
