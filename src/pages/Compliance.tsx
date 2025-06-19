
import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Compliance = () => {
  useEffect(() => {
    if (window.ScrollReveal) {
      window.ScrollReveal().reveal('.fade-in', { delay: 100, distance: '20px', origin: 'bottom' });
      window.ScrollReveal().reveal('.timeline-item', { delay: 150, distance: '30px', origin: 'left', interval: 200 });
    }
  }, []);

  const timeline = [
    { year: '2024', status: 'Active', title: 'EU Battery Regulation Published', description: 'Regulation (EU) 2023/1542 comes into effect' },
    { year: '2025', status: 'Upcoming', title: 'Preparation Phase', description: 'Manufacturers begin DPP system implementation' },
    { year: '2026', status: 'Upcoming', title: 'Testing & Validation', description: 'Pilot programs and compliance system testing' },
    { year: '2027', status: 'Critical', title: 'Battery DPP Mandatory', description: 'All batteries sold in EU must have digital product passports' },
    { year: '2028', status: 'Planned', title: 'Electronics Extension', description: 'DPP requirements extend to electronics and electrical equipment' },
    { year: '2030', status: 'Planned', title: 'Apparel & Textiles', description: 'Full implementation across apparel and textile industries' },
  ];

  const requirements = [
    {
      category: 'Product Information',
      items: [
        'Product identification and model information',
        'Manufacturing date and location',
        'Material composition and sourcing',
        'Performance and technical specifications'
      ]
    },
    {
      category: 'Sustainability Data',
      items: [
        'Carbon footprint and lifecycle assessment',
        'Recyclability and end-of-life information',
        'Due diligence on supply chain',
        'Environmental impact metrics'
      ]
    },
    {
      category: 'Compliance Certificates',
      items: [
        'Conformity declarations and test reports',
        'Safety and quality certifications',
        'Regulatory compliance documentation',
        'Third-party verification records'
      ]
    },
    {
      category: 'Supply Chain Data',
      items: [
        'Supplier identification and certification',
        'Raw material traceability',
        'Manufacturing process documentation',
        'Transportation and logistics records'
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'Upcoming': return 'bg-orange-100 text-orange-800';
      case 'Planned': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen py-16">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-4 mb-16 fade-in">
          <h1 className="text-4xl md:text-5xl font-bold">EU DPP Compliance</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Understanding the European Union's Digital Product Passport regulations 
            and how they impact manufacturers and suppliers across industries.
          </p>
        </div>

        {/* What is DPP */}
        <section className="mb-20">
          <Card className="fade-in">
            <CardHeader>
              <CardTitle className="text-2xl">What is the Digital Product Passport?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg text-muted-foreground">
                The Digital Product Passport (DPP) is a comprehensive digital record that contains 
                essential information about a product's lifecycle, from raw materials to end-of-life disposal.
              </p>
              <p>
                Under EU regulations, DPPs will be mandatory for certain product categories to increase 
                transparency, enable circular economy principles, and support sustainable consumption patterns.
              </p>
              <div className="bg-primary/5 p-6 rounded-lg">
                <h3 className="font-semibold mb-2">Key Objectives:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Increase product transparency and traceability</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Support circular economy and sustainable practices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Enable better consumer decision-making</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Facilitate regulatory compliance and enforcement</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Timeline */}
        <section className="mb-20">
          <div className="text-center space-y-4 mb-12 fade-in">
            <h2 className="text-3xl font-bold">Implementation Timeline</h2>
            <p className="text-xl text-muted-foreground">
              Phased rollout across different product categories starting with batteries in 2027
            </p>
          </div>
          
          <div className="space-y-6">
            {timeline.map((item, index) => (
              <div key={item.year} className="timeline-item">
                <Card className="hover-scale">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {item.year}
                        </div>
                        <div>
                          <CardTitle className="text-xl">{item.title}</CardTitle>
                          <CardDescription className="text-base">{item.description}</CardDescription>
                        </div>
                      </div>
                      <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                    </div>
                  </CardHeader>
                </Card>
              </div>
            ))}
          </div>
        </section>

        {/* Requirements */}
        <section className="mb-20">
          <div className="text-center space-y-4 mb-12 fade-in">
            <h2 className="text-3xl font-bold">What is Required?</h2>
            <p className="text-xl text-muted-foreground">
              Comprehensive data requirements for digital product passports
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {requirements.map((requirement, index) => (
              <Card key={requirement.category} className="hover-scale fade-in" style={{animationDelay: `${index * 100}ms`}}>
                <CardHeader>
                  <CardTitle className="text-xl text-primary">{requirement.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {requirement.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* EU Green Deal Context */}
        <section className="mb-20">
          <Card className="bg-gradient-to-br from-green-50 to-blue-50 fade-in">
            <CardHeader>
              <CardTitle className="text-2xl">Why It Matters: EU Green Deal Context</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                The Digital Product Passport initiative is a cornerstone of the European Green Deal, 
                aimed at making Europe the first climate-neutral continent by 2050.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">55%</div>
                  <div className="text-sm text-muted-foreground">CO2 Reduction Target by 2030</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">€1T</div>
                  <div className="text-sm text-muted-foreground">Green Deal Investment Plan</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">2050</div>
                  <div className="text-sm text-muted-foreground">Climate Neutrality Target</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* How Passportify Helps */}
        <section>
          <Card className="bg-primary text-primary-foreground fade-in">
            <CardHeader>
              <CardTitle className="text-2xl text-white">How Passportify Helps</CardTitle>
              <CardDescription className="text-primary-foreground/80 text-lg">
                Our platform transforms complex regulatory requirements into automated, manageable workflows
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-white mb-2">Automated Compliance</h3>
                  <p className="text-primary-foreground/90 text-sm">
                    AI-powered document processing and verification ensures all required data 
                    is collected and validated automatically.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Supplier Integration</h3>
                  <p className="text-primary-foreground/90 text-sm">
                    Seamlessly connect with your entire supply chain through dedicated 
                    portals and automated workflows.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Real-time Monitoring</h3>
                  <p className="text-primary-foreground/90 text-sm">
                    Track compliance status across all products and receive alerts 
                    for missing or expired documentation.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Future-Proof Platform</h3>
                  <p className="text-primary-foreground/90 text-sm">
                    Built to adapt to evolving regulations across all product categories 
                    as DPP requirements expand.
                  </p>
                </div>
              </div>
              
              <div className="flex justify-center pt-4">
                <Button variant="secondary" size="lg" asChild>
                  <Link to="/contact">Get Started with Compliance</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Compliance;
