
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Home = () => {
  useEffect(() => {
    // Initialize ScrollReveal animations
    if (window.ScrollReveal) {
      window.ScrollReveal().reveal('.fade-in', { delay: 100, distance: '20px', origin: 'bottom' });
      window.ScrollReveal().reveal('.slide-up', { delay: 150, distance: '30px', origin: 'bottom' });
      window.ScrollReveal().reveal('.zoom-in', { scale: 0.9, delay: 200 });
    }
  }, []);

  const keyModules = [
    { name: 'DPP Score Engine', description: 'AI-powered compliance scoring', status: 'Live' },
    { name: 'Supplier Portal', description: 'Document upload & verification', status: 'Live' },
    { name: 'Blockchain Anchoring', description: 'Immutable audit trails', status: 'Live' },
    { name: 'Public QR Viewer', description: 'Consumer-facing passports', status: 'Live' },
  ];

  const trustedLogos = [
    'Manufacturing Corp',
    'Battery Systems Ltd',
    'Green Energy Co',
    'Sustainable Tech',
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center space-y-8 fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                Make Compliance Work <br />
                <span className="text-primary">For You — Not Against You</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                Passportify transforms the complexity of EU Digital Product Passport regulations 
                into a streamlined digital workflow powered by AI, blockchain, and modular compliance engines.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" asChild className="px-8 py-6 text-lg">
                <Link to="/contact">Request Demo</Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="px-8 py-6 text-lg">
                <a href="https://app.passportify.online">Login</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Modules Preview */}
      <section className="py-20 bg-background">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center space-y-4 mb-16 slide-up">
            <h2 className="text-3xl md:text-4xl font-bold">Platform Modules</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools for every stage of digital product passport creation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyModules.map((module, index) => (
              <Card key={module.name} className="hover-scale zoom-in" style={{animationDelay: `${index * 100}ms`}}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{module.name}</CardTitle>
                    <Badge variant="secondary">{module.status}</Badge>
                  </div>
                  <CardDescription>{module.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" asChild>
              <Link to="/platform">View All Modules</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Preview */}
      <section className="py-20 bg-muted/50">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 fade-in">
              <h2 className="text-3xl md:text-4xl font-bold">Simple 5-Step Process</h2>
              <p className="text-xl text-muted-foreground">
                From company onboarding to public passport creation, our platform guides you through 
                every step of DPP compliance with automated workflows and AI assistance.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-full text-white flex items-center justify-center font-bold">1</div>
                  <span>Company & Product Onboarding</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-full text-white flex items-center justify-center font-bold">2</div>
                  <span>Supplier Document Upload</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-full text-white flex items-center justify-center font-bold">3</div>
                  <span>AI Verification & Scoring</span>
                </div>
              </div>
              <Button variant="outline" asChild>
                <Link to="/how-it-works">Learn How It Works</Link>
              </Button>
            </div>
            
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-8 zoom-in">
              <div className="aspect-square bg-white rounded-lg shadow-lg flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 bg-primary rounded-lg mx-auto flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">QR</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Digital Product Passport</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Simplified */}
      <section className="py-20 bg-background">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center space-y-8 slide-up">
            <h2 className="text-3xl md:text-4xl font-bold">EU DPP Compliance Simplified</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay ahead of European Union Digital Product Passport regulations. 
              Starting with batteries in 2027, expanding to electronics and apparel.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <Card className="text-center hover-scale">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-primary">2027</CardTitle>
                  <CardDescription>Battery DPP Mandatory</CardDescription>
                </CardHeader>
              </Card>
              <Card className="text-center hover-scale">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-primary">2028</CardTitle>
                  <CardDescription>Electronics Follow</CardDescription>
                </CardHeader>
              </Card>
              <Card className="text-center hover-scale">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-primary">2030</CardTitle>
                  <CardDescription>Apparel & Textiles</CardDescription>
                </CardHeader>
              </Card>
            </div>
            
            <Button asChild>
              <Link to="/compliance">Understand DPP Regulations</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-20 bg-muted/50">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center space-y-8 fade-in">
            <h2 className="text-2xl font-semibold text-muted-foreground">Trusted by Leading Manufacturers</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
              {trustedLogos.map((logo) => (
                <div key={logo} className="text-center py-4 px-6 bg-white rounded-lg shadow-sm">
                  <span className="text-lg font-medium text-muted-foreground">{logo}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
