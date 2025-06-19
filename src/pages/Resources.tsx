
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const Resources = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');

  useEffect(() => {
    if (window.ScrollReveal) {
      window.ScrollReveal().reveal('.fade-in', { delay: 100, distance: '20px', origin: 'bottom' });
      window.ScrollReveal().reveal('.resource-card', { delay: 150, distance: '30px', origin: 'bottom', interval: 100 });
    }
  }, []);

  const filters = ['All', 'Whitepapers', 'Blogs', 'Case Studies', 'Guides'];

  // Placeholder resources for future content
  const resources = [
    {
      type: 'Whitepaper',
      title: 'Complete Guide to EU Digital Product Passport Compliance',
      description: 'Comprehensive overview of DPP regulations, requirements, and implementation strategies for manufacturers.',
      date: 'Coming Soon',
      readTime: '15 min read',
      featured: true
    },
    {
      type: 'Blog',
      title: 'Battery DPP Regulation: What Manufacturers Need to Know by 2027',
      description: 'Deep dive into the specific requirements for battery manufacturers under the new EU regulations.',
      date: 'Coming Soon',
      readTime: '8 min read',
      featured: false
    },
    {
      type: 'Case Study',
      title: 'How Manufacturing Corp Achieved 100% DPP Compliance in 6 Months',
      description: 'Real-world implementation story of a major manufacturer adopting Passportify for compliance.',
      date: 'Coming Soon',
      readTime: '12 min read',
      featured: false
    },
    {
      type: 'Guide',
      title: 'Supplier Onboarding Best Practices for DPP Success',
      description: 'Step-by-step guide for engaging and onboarding suppliers into your DPP compliance program.',
      date: 'Coming Soon',
      readTime: '10 min read',
      featured: false
    },
    {
      type: 'Whitepaper',
      title: 'AI in Compliance: Automating Document Verification at Scale',
      description: 'Technical deep dive into how artificial intelligence transforms compliance document processing.',
      date: 'Coming Soon',
      readTime: '20 min read',
      featured: true
    },
    {
      type: 'Blog',
      title: 'Blockchain for Supply Chain Transparency: Beyond the Hype',
      description: 'Practical applications of blockchain technology in creating verifiable supply chain records.',
      date: 'Coming Soon',
      readTime: '6 min read',
      featured: false
    }
  ];

  const filteredResources = selectedFilter === 'All' 
    ? resources 
    : resources.filter(resource => resource.type === selectedFilter.slice(0, -1));

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Whitepaper': return 'bg-purple-100 text-purple-800';
      case 'Blog': return 'bg-blue-100 text-blue-800';
      case 'Case Study': return 'bg-green-100 text-green-800';
      case 'Guide': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen py-16">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-4 mb-16 fade-in">
          <h1 className="text-4xl md:text-5xl font-bold">Resources</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Expert insights, guides, and case studies to help you navigate 
            EU Digital Product Passport compliance and implementation.
          </p>
        </div>

        {/* Coming Soon Notice */}
        <div className="mb-12 fade-in">
          <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Content Library Coming Soon</CardTitle>
              <CardDescription className="text-lg">
                We're preparing comprehensive resources including whitepapers, implementation guides, 
                and industry case studies. Subscribe to our newsletter to be notified when new content is available.
              </CardDescription>
              <div className="pt-4">
                <Button variant="outline">
                  Subscribe for Updates
                </Button>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center fade-in">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={selectedFilter === filter ? "default" : "outline"}
              onClick={() => setSelectedFilter(filter)}
              className="rounded-full"
            >
              {filter}
            </Button>
          ))}
        </div>

        {/* Featured Resources */}
        {selectedFilter === 'All' && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8 fade-in">Featured Resources</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {resources.filter(resource => resource.featured).map((resource, index) => (
                <Card key={resource.title} className="resource-card hover-scale" style={{animationDelay: `${index * 100}ms`}}>
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge className={getTypeColor(resource.type)}>{resource.type}</Badge>
                      <Badge variant="secondary">Featured</Badge>
                    </div>
                    <CardTitle className="text-xl">{resource.title}</CardTitle>
                    <CardDescription className="text-base">{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <span>{resource.date}</span>
                      <span>{resource.readTime}</span>
                    </div>
                    <Button className="w-full mt-4" disabled>
                      Coming Soon
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* All Resources */}
        <section>
          <h2 className="text-2xl font-bold mb-8 fade-in">
            {selectedFilter === 'All' ? 'All Resources' : selectedFilter}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource, index) => (
              <Card key={resource.title} className="resource-card hover-scale" style={{animationDelay: `${index * 100}ms`}}>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge className={getTypeColor(resource.type)}>{resource.type}</Badge>
                    {resource.featured && <Badge variant="secondary">Featured</Badge>}
                  </div>
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
                    <span>{resource.date}</span>
                    <span>{resource.readTime}</span>
                  </div>
                  <Button className="w-full" variant="outline" disabled>
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="mt-20">
          <Card className="bg-muted fade-in">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Stay Updated</CardTitle>
              <CardDescription className="text-lg">
                Get notified when we publish new resources about DPP compliance, 
                regulatory updates, and industry best practices.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-md border bg-background"
                />
                <Button>Subscribe</Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Resources;
