
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
import { Save } from 'lucide-react';

interface Component {
  id?: string;
  name: string;
  type: string;
  content: any;
  props: any;
}

const ComponentEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [component, setComponent] = useState<Component>({
    name: '',
    type: 'widget',
    content: {},
    props: {}
  });
  const [loading, setLoading] = useState(false);
  const [contentText, setContentText] = useState('{}');
  const [propsText, setPropsText] = useState('{}');

  useEffect(() => {
    if (id && id !== 'new') {
      fetchComponent();
    }
  }, [id]);

  const fetchComponent = async () => {
    try {
      const { data, error } = await supabase
        .from('components')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setComponent(data);
      setContentText(JSON.stringify(data.content || {}, null, 2));
      setPropsText(JSON.stringify(data.props || {}, null, 2));
    } catch (error) {
      console.error('Error fetching component:', error);
      toast({
        title: "Error",
        description: "Failed to fetch component",
        variant: "destructive",
      });
    }
  };

  const saveComponent = async () => {
    setLoading(true);
    try {
      let parsedContent, parsedProps;
      
      try {
        parsedContent = JSON.parse(contentText);
      } catch {
        throw new Error('Invalid JSON in content field');
      }
      
      try {
        parsedProps = JSON.parse(propsText);
      } catch {
        throw new Error('Invalid JSON in props field');
      }

      const componentData = {
        ...component,
        content: parsedContent,
        props: parsedProps,
        created_by: user?.id,
        updated_at: new Date().toISOString()
      };

      if (id === 'new') {
        const { error } = await supabase
          .from('components')
          .insert(componentData);
        if (error) throw error;
        toast({
          title: "Success",
          description: "Component created successfully",
        });
        navigate('/admin/components');
      } else {
        const { error } = await supabase
          .from('components')
          .update(componentData)
          .eq('id', id);
        if (error) throw error;
        toast({
          title: "Success",
          description: "Component updated successfully",
        });
      }
    } catch (error: any) {
      console.error('Error saving component:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to save component",
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
            {id === 'new' ? 'Create New Component' : 'Edit Component'}
          </h1>
          <p className="text-muted-foreground">
            {id === 'new' ? 'Create a new reusable component' : 'Edit component configuration'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/admin/components')}>
            Cancel
          </Button>
          <Button onClick={saveComponent} disabled={loading}>
            <Save className="w-4 h-4 mr-2" />
            {loading ? 'Saving...' : 'Save Component'}
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Component Details</CardTitle>
            <CardDescription>Basic component information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <Input
                  value={component.name}
                  onChange={(e) => setComponent(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Component name"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Type</label>
                <Select 
                  value={component.type} 
                  onValueChange={(value) => setComponent(prev => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="widget">Widget</SelectItem>
                    <SelectItem value="section">Section</SelectItem>
                    <SelectItem value="layout">Layout</SelectItem>
                    <SelectItem value="form">Form</SelectItem>
                    <SelectItem value="navigation">Navigation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Component Configuration</CardTitle>
            <CardDescription>Configure component content and properties</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Content (JSON)</label>
              <Textarea
                value={contentText}
                onChange={(e) => setContentText(e.target.value)}
                placeholder="Component content in JSON format"
                rows={8}
                className="font-mono text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Props (JSON)</label>
              <Textarea
                value={propsText}
                onChange={(e) => setPropsText(e.target.value)}
                placeholder="Component props in JSON format"
                rows={6}
                className="font-mono text-sm"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ComponentEditor;
