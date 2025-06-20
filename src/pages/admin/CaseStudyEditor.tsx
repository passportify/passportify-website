
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { Save, Eye } from 'lucide-react';

interface CaseStudy {
  id?: string;
  title: string;
  slug: string;
  company_name: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string;
  featured_image: string;
  logo_image: string;
  status: string;
  published_at?: string;
}

const CaseStudyEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [caseStudy, setCaseStudy] = useState<CaseStudy>({
    title: '',
    slug: '',
    company_name: '',
    industry: '',
    challenge: '',
    solution: '',
    results: '',
    featured_image: '',
    logo_image: '',
    status: 'draft'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id && id !== 'new') {
      fetchCaseStudy();
    }
  }, [id]);

  const fetchCaseStudy = async () => {
    try {
      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setCaseStudy(data);
    } catch (error) {
      console.error('Error fetching case study:', error);
      toast({
        title: "Error",
        description: "Failed to fetch case study",
        variant: "destructive",
      });
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  const saveCaseStudy = async () => {
    setLoading(true);
    try {
      const caseStudyData = {
        ...caseStudy,
        author_id: user?.id,
        updated_at: new Date().toISOString(),
        published_at: caseStudy.status === 'published' ? new Date().toISOString() : null
      };

      if (id === 'new') {
        const { error } = await supabase
          .from('case_studies')
          .insert(caseStudyData);
        if (error) throw error;
        toast({
          title: "Success",
          description: "Case study created successfully",
        });
        navigate('/admin/case-studies');
      } else {
        const { error } = await supabase
          .from('case_studies')
          .update(caseStudyData)
          .eq('id', id);
        if (error) throw error;
        toast({
          title: "Success",
          description: "Case study updated successfully",
        });
      }
    } catch (error) {
      console.error('Error saving case study:', error);
      toast({
        title: "Error",
        description: "Failed to save case study",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">
            {id === 'new' ? 'Create New Case Study' : 'Edit Case Study'}
          </h1>
          <p className="text-muted-foreground">
            {id === 'new' ? 'Create a new case study' : 'Edit your case study content'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/admin/case-studies')}>
            Cancel
          </Button>
          {caseStudy.status === 'published' && caseStudy.slug && (
            <Button variant="outline" asChild>
              <a href={`/case-studies/${caseStudy.slug}`} target="_blank">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </a>
            </Button>
          )}
          <Button onClick={saveCaseStudy} disabled={loading}>
            <Save className="w-4 h-4 mr-2" />
            {loading ? 'Saving...' : 'Save Case Study'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Case Study Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={caseStudy.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setCaseStudy(prev => ({ 
                      ...prev, 
                      title,
                      slug: prev.slug || generateSlug(title)
                    }));
                  }}
                  placeholder="Enter case study title"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Company Name</label>
                <Input
                  value={caseStudy.company_name}
                  onChange={(e) => setCaseStudy(prev => ({ ...prev, company_name: e.target.value }))}
                  placeholder="Enter company name"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Challenge</label>
                <Textarea
                  value={caseStudy.challenge}
                  onChange={(e) => setCaseStudy(prev => ({ ...prev, challenge: e.target.value }))}
                  placeholder="Describe the challenge"
                  rows={4}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Solution</label>
                <Textarea
                  value={caseStudy.solution}
                  onChange={(e) => setCaseStudy(prev => ({ ...prev, solution: e.target.value }))}
                  placeholder="Describe the solution"
                  rows={4}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Results</label>
                <Textarea
                  value={caseStudy.results}
                  onChange={(e) => setCaseStudy(prev => ({ ...prev, results: e.target.value }))}
                  placeholder="Describe the results"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Case Study Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Status</label>
                <Select 
                  value={caseStudy.status} 
                  onValueChange={(value) => setCaseStudy(prev => ({ ...prev, status: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">URL Slug</label>
                <Input
                  value={caseStudy.slug}
                  onChange={(e) => setCaseStudy(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="case-study-url-slug"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Industry</label>
                <Input
                  value={caseStudy.industry}
                  onChange={(e) => setCaseStudy(prev => ({ ...prev, industry: e.target.value }))}
                  placeholder="Company industry"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Featured Image URL</label>
                <Input
                  value={caseStudy.featured_image}
                  onChange={(e) => setCaseStudy(prev => ({ ...prev, featured_image: e.target.value }))}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Company Logo URL</label>
                <Input
                  value={caseStudy.logo_image}
                  onChange={(e) => setCaseStudy(prev => ({ ...prev, logo_image: e.target.value }))}
                  placeholder="https://example.com/logo.png"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyEditor;
