
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash } from 'lucide-react';

interface Component {
  id: string;
  name: string;
  type: string;
  content: any;
  props: any;
  created_at: string;
  created_by: string;
}

const ComponentsManager = () => {
  const [components, setComponents] = useState<Component[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchComponents();
  }, []);

  const fetchComponents = async () => {
    try {
      const { data, error } = await supabase
        .from('components')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setComponents(data || []);
    } catch (error) {
      console.error('Error fetching components:', error);
      toast({
        title: "Error",
        description: "Failed to fetch components",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteComponent = async (id: string) => {
    if (!confirm('Are you sure you want to delete this component?')) return;

    try {
      const { error } = await supabase
        .from('components')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Component deleted successfully",
      });
      fetchComponents();
    } catch (error) {
      console.error('Error deleting component:', error);
      toast({
        title: "Error",
        description: "Failed to delete component",
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
          <h1 className="text-3xl font-bold">Components & Widgets</h1>
          <p className="text-muted-foreground">Manage reusable components and widgets</p>
        </div>
        <Link to="/admin/components/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Component
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Components</CardTitle>
          <CardDescription>
            View and manage all components and widgets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {components.map((component) => (
                <TableRow key={component.id}>
                  <TableCell>
                    <div className="font-medium">{component.name}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{component.type}</Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(component.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Link to={`/admin/components/edit/${component.id}`}>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => deleteComponent(component.id)}
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
          {components.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No components found. Create your first component to get started.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ComponentsManager;
