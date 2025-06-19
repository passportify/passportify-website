
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Eye, Trash } from 'lucide-react';

interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  company_name: string;
  industry: string;
  status: string;
  published_at: string;
  created_at: string;
}

const CaseStudiesManager = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    try {
      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCaseStudies(data || []);
    } catch (error) {
      console.error('Error fetching case studies:', error);
      toast({
        title: "Error",
        description: "Failed to fetch case studies",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteCaseStudy = async (id: string) => {
    if (!confirm('Are you sure you want to delete this case study?')) return;

    try {
      const { error } = await supabase
        .from('case_studies')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Case study deleted successfully",
      });
      fetchCaseStudies();
    } catch (error) {
      console.error('Error deleting case study:', error);
      toast({
        title: "Error",
        description: "Failed to delete case study",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Case Studies</h1>
          <p className="text-muted-foreground">Manage your case studies</p>
        </div>
        <Link to="/admin/case-studies/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Case Study
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Case Studies</CardTitle>
          <CardDescription>
            View and manage all case studies on your website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Published</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {caseStudies.map((caseStudy) => (
                <TableRow key={caseStudy.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{caseStudy.title}</div>
                      <div className="text-sm text-muted-foreground">/{caseStudy.slug}</div>
                    </div>
                  </TableCell>
                  <TableCell>{caseStudy.company_name}</TableCell>
                  <TableCell>{caseStudy.industry || 'Not specified'}</TableCell>
                  <TableCell>
                    <Badge variant={caseStudy.status === 'published' ? 'default' : 'secondary'}>
                      {caseStudy.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {caseStudy.published_at 
                      ? new Date(caseStudy.published_at).toLocaleDateString()
                      : 'Not published'
                    }
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {caseStudy.status === 'published' && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={`/case-studies/${caseStudy.slug}`} target="_blank">
                            <Eye className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                      <Link to={`/admin/case-studies/edit/${caseStudy.id}`}>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => deleteCaseStudy(caseStudy.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {caseStudies.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No case studies found. Create your first case study to get started.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CaseStudiesManager;
