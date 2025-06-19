
import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Platform = () => {
  useEffect(() => {
    if (window.ScrollReveal) {
      window.ScrollReveal().reveal('.fade-in', { delay: 100, distance: '20px', origin: 'bottom' });
      window.ScrollReveal().reveal('.module-card', { delay: 150, distance: '30px', origin: 'bottom', interval: 100 });
    }
  }, []);

  const modules = {
    onboarding: [
      { 
        name: 'Company Profile Setup', 
        description: 'Centralized company information and compliance settings',
        detail: 'Configure your organization\'s profile, regulatory requirements, and product categories.',
        status: 'Live' 
      },
      { 
        name: 'Product Registration', 
        description: 'Product lifecycle and metadata management',
        detail: 'Register products with detailed specifications, materials, and regulatory classifications.',
        status: 'Live' 
      },
      { 
        name: 'Supplier Network Mapping', 
        description: 'Supply chain visibility and connection management',
        detail: 'Map your entire supplier network with role-based access and document requirements.',
        status: 'Live' 
      },
    ],
    supplier: [
      { 
        name: 'Supplier Portal', 
        description: 'Self-service document upload and verification interface',
        detail: 'Intuitive portal for suppliers to upload certificates, test reports, and compliance documents.',
        status: 'Live' 
      },
      { 
        name: 'Document Template Engine', 
        description: 'Standardized forms for consistent data collection',
        detail: 'Pre-built templates for different document types with automatic validation rules.',
        status: 'Live' 
      },
      { 
        name: 'Verification Workflows', 
        description: 'Multi-stage approval and validation processes',
        detail: 'Customizable approval workflows with automated notifications and deadline tracking.',
        status: 'Upcoming' 
      },
    ],
    ai: [
      { 
        name: 'DPP Score Engine', 
        description: 'AI-powered compliance scoring and risk assessment',
        detail: 'Machine learning algorithms analyze documents and calculate compliance scores in real-time.',
        status: 'AI-Powered' 
      },
      { 
        name: 'Document Intelligence', 
        description: 'Automated data extraction and validation',
        detail: 'Extract key information from PDFs, certificates, and reports with high accuracy.',
        status: 'AI-Powered' 
      },
      { 
        name: 'Anomaly Detection', 
        description: 'Identify inconsistencies and potential compliance issues',
        detail: 'AI monitors for data inconsistencies, missing information, and regulatory red flags.',
        status: 'Upcoming' 
      },
    ],
    blockchain: [
      { 
        name: 'Blockchain Anchoring', 
        description: 'Immutable audit trails and data integrity',
        detail: 'Cryptographically secure timestamps and data fingerprints on distributed ledger.',
        status: 'Live' 
      },
      { 
        name: 'Verifiable Credentials', 
        description: 'Cryptographically signed compliance certificates',
        detail: 'Issue and verify tamper-proof digital certificates using W3C standards.',
        status: 'Live' 
      },
      { 
        name: 'Smart Contract Automation', 
        description: 'Automated compliance triggers and notifications',
        detail: 'Programmable rules for automatic compliance actions and supplier notifications.',
        status: 'Upcoming' 
      },
    ],
    public: [
      { 
        name: 'QR Passport Viewer', 
        description: 'Consumer-facing digital product information',
        detail: 'Mobile-optimized public interface showing product sustainability and compliance data.',
        status: 'Public' 
      },
      { 
        name: 'Compliance Badge System', 
        description: 'Visual indicators for regulatory compliance status',
        detail: 'Dynamic badges and indicators showing real-time compliance status and certifications.',
        status: 'Live' 
      },
      { 
        name: 'Multi-Language Support', 
        description: 'Localized passport content for global markets',
        detail: 'Automatic translation and localization for different regulatory regions.',
        status: 'Upcoming' 
      },
    ],
    analytics: [
      { 
        name: 'Compliance Dashboard', 
        description: 'Real-time visibility into compliance status',
        detail: 'Executive dashboards with compliance metrics, risk indicators, and progress tracking.',
        status: 'Live' 
      },
      { 
        name: 'Audit Trail Viewer', 
        description: 'Complete history of changes and approvals',
        detail: 'Detailed audit logs with search, filtering, and export capabilities for regulatory reviews.',
        status: 'Live' 
      },
      { 
        name: 'Regulatory Reporting', 
        description: 'Automated report generation for authorities',
        detail: 'Generate standardized regulatory reports with one-click export to required formats.',
        status: 'Upcoming' 
      },
    ],
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Live': return 'bg-green-100 text-green-800';
      case 'AI-Powered': return 'bg-purple-100 text-purple-800';
      case 'Public': return 'bg-blue-100 text-blue-800';
      case 'Upcoming': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen py-16">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-4 mb-16 fade-in">
          <h1 className="text-4xl md:text-5xl font-bold">Platform Modules</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive digital product passport platform with modular components 
            designed for every stage of the compliance lifecycle.
          </p>
        </div>

        {/* Product Onboarding */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 fade-in">Product Onboarding</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.onboarding.map((module, index) => (
              <Card key={module.name} className="module-card hover-scale">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{module.name}</CardTitle>
                    <Badge className={getStatusColor(module.status)}>{module.status}</Badge>
                  </div>
                  <CardDescription>{module.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{module.detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Supplier Portal */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 fade-in">Supplier Portal</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.supplier.map((module, index) => (
              <Card key={module.name} className="module-card hover-scale">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{module.name}</CardTitle>
                    <Badge className={getStatusColor(module.status)}>{module.status}</Badge>
                  </div>
                  <CardDescription>{module.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{module.detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* AI Engines */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 fade-in">AI Engines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.ai.map((module, index) => (
              <Card key={module.name} className="module-card hover-scale">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{module.name}</CardTitle>
                    <Badge className={getStatusColor(module.status)}>{module.status}</Badge>
                  </div>
                  <CardDescription>{module.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{module.detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Blockchain & Anchoring */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 fade-in">Blockchain & Anchoring</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.blockchain.map((module, index) => (
              <Card key={module.name} className="module-card hover-scale">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{module.name}</CardTitle>
                    <Badge className={getStatusColor(module.status)}>{module.status}</Badge>
                  </div>
                  <CardDescription>{module.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{module.detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Public Passport Viewer */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 fade-in">Public Passport Viewer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.public.map((module, index) => (
              <Card key={module.name} className="module-card hover-scale">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{module.name}</CardTitle>
                    <Badge className={getStatusColor(module.status)}>{module.status}</Badge>
                  </div>
                  <CardDescription>{module.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{module.detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Admin / Analytics */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 fade-in">Admin / Analytics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.analytics.map((module, index) => (
              <Card key={module.name} className="module-card hover-scale">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{module.name}</CardTitle>
                    <Badge className={getStatusColor(module.status)}>{module.status}</Badge>
                  </div>
                  <CardDescription>{module.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{module.detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Platform;
