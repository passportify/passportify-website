
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Save, Plus, Edit, Trash, ArrowUp, ArrowDown, Eye } from 'lucide-react';
import type { Database } from '@/integrations/supabase/types';

interface Section {
  id: string;
  type: string;
  title: string;
  content: any;
  order: number;
}

interface Page {
  id?: string;
  slug: string;
  title: string;
  meta_description: string;
  content: {
    sections: Section[];
  };
  status: string;
}

type DbPage = Database['public']['Tables']['pages']['Row'];
type DbPageInsert = Database['public']['Tables']['pages']['Insert'];
type DbPageUpdate = Database['public']['Tables']['pages']['Update'];

const PageEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [page, setPage] = useState<Page>({
    slug: '',
    title: '',
    meta_description: '',
    content: { sections: [] },
    status: 'draft'
  });
  const [loading, setLoading] = useState(false);
  const [isNewSection, setIsNewSection] = useState(false);
  const [editingSection, setEditingSection] = useState<Section | null>(null);

  useEffect(() => {
    if (id && id !== 'new') {
      fetchPage();
    }
  }, [id]);

  const fetchPage = async () => {
    try {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      // Convert database format to our internal format
      const dbPage = data as DbPage;
      const convertedPage: Page = {
        id: dbPage.id,
        slug: dbPage.slug,
        title: dbPage.title,
        meta_description: dbPage.meta_description || '',
        content: dbPage.content && typeof dbPage.content === 'object' && 'sections' in dbPage.content
          ? dbPage.content as { sections: Section[] }
          : { sections: [] },
        status: dbPage.status || 'draft'
      };
      
      setPage(convertedPage);
    } catch (error) {
      console.error('Error fetching page:', error);
      toast({
        title: "Error",
        description: "Failed to fetch page",
        variant: "destructive",
      });
    }
  };

  const savePage = async () => {
    setLoading(true);
    try {
      // Convert our internal format to database format
      const pageData: DbPageInsert | DbPageUpdate = {
        slug: page.slug,
        title: page.title,
        meta_description: page.meta_description,
        content: page.content as any, // Cast to Json type
        status: page.status,
        updated_at: new Date().toISOString()
      };

      if (id === 'new') {
        const { error } = await supabase
          .from('pages')
          .insert(pageData as DbPageInsert);
        if (error) throw error;
        toast({
          title: "Success",
          description: "Page created successfully",
        });
        navigate('/admin/pages');
      } else {
        const { error } = await supabase
          .from('pages')
          .update(pageData as DbPageUpdate)
          .eq('id', id);
        if (error) throw error;
        toast({
          title: "Success",
          description: "Page updated successfully",
        });
      }
    } catch (error) {
      console.error('Error saving page:', error);
      toast({
        title: "Error",
        description: "Failed to save page",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addSection = (type: string) => {
    const newSection: Section = {
      id: Date.now().toString(),
      type,
      title: '',
      content: getSectionDefaults(type),
      order: page.content.sections.length
    };
    
    setPage(prev => ({
      ...prev,
      content: {
        sections: [...prev.content.sections, newSection]
      }
    }));
    setIsNewSection(false);
  };

  const getSectionDefaults = (type: string) => {
    switch (type) {
      case 'hero':
        return { subtitle: '', description: '', buttonText: 'Get Started', buttonLink: '#' };
      case 'text':
        return { body: '' };
      case 'features':
        return { items: [{ title: '', description: '', icon: '' }] };
      case 'stats':
        return { items: [{ value: '', label: '' }] };
      case 'cta':
        return { description: '', buttonText: 'Contact Us', buttonLink: '/contact' };
      default:
        return {};
    }
  };

  const updateSection = (sectionId: string, updates: Partial<Section>) => {
    setPage(prev => ({
      ...prev,
      content: {
        sections: prev.content.sections.map(section =>
          section.id === sectionId ? { ...section, ...updates } : section
        )
      }
    }));
  };

  const deleteSection = (sectionId: string) => {
    setPage(prev => ({
      ...prev,
      content: {
        sections: prev.content.sections.filter(section => section.id !== sectionId)
      }
    }));
  };

  const moveSection = (sectionId: string, direction: 'up' | 'down') => {
    const sections = [...page.content.sections];
    const index = sections.findIndex(s => s.id === sectionId);
    
    if (direction === 'up' && index > 0) {
      [sections[index], sections[index - 1]] = [sections[index - 1], sections[index]];
    } else if (direction === 'down' && index < sections.length - 1) {
      [sections[index], sections[index + 1]] = [sections[index + 1], sections[index]];
    }
    
    // Update order values
    sections.forEach((section, idx) => {
      section.order = idx;
    });
    
    setPage(prev => ({
      ...prev,
      content: { sections }
    }));
  };

  const renderSectionEditor = (section: Section) => {
    switch (section.type) {
      case 'hero':
        return (
          <div className="space-y-4">
            <Input
              placeholder="Hero Title"
              value={section.title}
              onChange={(e) => updateSection(section.id, { title: e.target.value })}
            />
            <Input
              placeholder="Subtitle"
              value={section.content.subtitle || ''}
              onChange={(e) => updateSection(section.id, { 
                content: { ...section.content, subtitle: e.target.value }
              })}
            />
            <Textarea
              placeholder="Description"
              value={section.content.description || ''}
              onChange={(e) => updateSection(section.id, { 
                content: { ...section.content, description: e.target.value }
              })}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Button Text"
                value={section.content.buttonText || ''}
                onChange={(e) => updateSection(section.id, { 
                  content: { ...section.content, buttonText: e.target.value }
                })}
              />
              <Input
                placeholder="Button Link"
                value={section.content.buttonLink || ''}
                onChange={(e) => updateSection(section.id, { 
                  content: { ...section.content, buttonLink: e.target.value }
                })}
              />
            </div>
          </div>
        );
      case 'text':
        return (
          <div className="space-y-4">
            <Input
              placeholder="Section Title"
              value={section.title}
              onChange={(e) => updateSection(section.id, { title: e.target.value })}
            />
            <Textarea
              placeholder="Content"
              rows={6}
              value={section.content.body || ''}
              onChange={(e) => updateSection(section.id, { 
                content: { ...section.content, body: e.target.value }
              })}
            />
          </div>
        );
      case 'cta':
        return (
          <div className="space-y-4">
            <Input
              placeholder="CTA Title"
              value={section.title}
              onChange={(e) => updateSection(section.id, { title: e.target.value })}
            />
            <Textarea
              placeholder="Description"
              value={section.content.description || ''}
              onChange={(e) => updateSection(section.id, { 
                content: { ...section.content, description: e.target.value }
              })}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Button Text"
                value={section.content.buttonText || ''}
                onChange={(e) => updateSection(section.id, { 
                  content: { ...section.content, buttonText: e.target.value }
                })}
              />
              <Input
                placeholder="Button Link"
                value={section.content.buttonLink || ''}
                onChange={(e) => updateSection(section.id, { 
                  content: { ...section.content, buttonLink: e.target.value }
                })}
              />
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-4">
            <Input
              placeholder="Section Title"
              value={section.title}
              onChange={(e) => updateSection(section.id, { title: e.target.value })}
            />
            <Textarea
              placeholder="Custom content (JSON format)"
              rows={4}
              value={JSON.stringify(section.content, null, 2)}
              onChange={(e) => {
                try {
                  const content = JSON.parse(e.target.value);
                  updateSection(section.id, { content });
                } catch (error) {
                  // Invalid JSON, ignore
                }
              }}
            />
          </div>
        );
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">
            {id === 'new' ? 'Create New Page' : 'Edit Page'}
          </h1>
          <p className="text-muted-foreground">
            {id === 'new' ? 'Create a new page for your website' : 'Edit page content and structure'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/admin/pages')}>
            Cancel
          </Button>
          <Button onClick={savePage} disabled={loading}>
            <Save className="w-4 h-4 mr-2" />
            {loading ? 'Saving...' : 'Save Page'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Page Settings */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Page Settings</CardTitle>
              <CardDescription>Configure basic page information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Page Title</label>
                <Input
                  value={page.title}
                  onChange={(e) => setPage(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter page title"
                />
              </div>
              <div>
                <label className="text-sm font-medium">URL Slug</label>
                <Input
                  value={page.slug}
                  onChange={(e) => setPage(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="page-url-slug"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Meta Description</label>
                <Textarea
                  value={page.meta_description}
                  onChange={(e) => setPage(prev => ({ ...prev, meta_description: e.target.value }))}
                  placeholder="SEO meta description"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Status</label>
                <Select 
                  value={page.status} 
                  onValueChange={(value) => setPage(prev => ({ ...prev, status: value }))}
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
              {page.slug && (
                <Button variant="outline" className="w-full" asChild>
                  <a href={`/${page.slug}`} target="_blank">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview Page
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Content Editor */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Page Content</CardTitle>
                  <CardDescription>Build your page using sections</CardDescription>
                </div>
                <Dialog open={isNewSection} onOpenChange={setIsNewSection}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Section
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Section</DialogTitle>
                      <DialogDescription>
                        Choose the type of section to add to your page
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        variant="outline"
                        className="h-20 flex-col"
                        onClick={() => addSection('hero')}
                      >
                        <span className="text-lg mb-1">🎯</span>
                        Hero Section
                      </Button>
                      <Button
                        variant="outline"
                        className="h-20 flex-col"
                        onClick={() => addSection('text')}
                      >
                        <span className="text-lg mb-1">📝</span>
                        Text Content
                      </Button>
                      <Button
                        variant="outline"
                        className="h-20 flex-col"
                        onClick={() => addSection('features')}
                      >
                        <span className="text-lg mb-1">⭐</span>
                        Features
                      </Button>
                      <Button
                        variant="outline"
                        className="h-20 flex-col"
                        onClick={() => addSection('stats')}
                      >
                        <span className="text-lg mb-1">📊</span>
                        Statistics
                      </Button>
                      <Button
                        variant="outline"
                        className="h-20 flex-col"
                        onClick={() => addSection('cta')}
                      >
                        <span className="text-lg mb-1">📢</span>
                        Call to Action
                      </Button>
                      <Button
                        variant="outline"
                        className="h-20 flex-col"
                        onClick={() => addSection('custom')}
                      >
                        <span className="text-lg mb-1">🔧</span>
                        Custom
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {page.content.sections.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <p>No sections added yet. Click "Add Section" to get started.</p>
                  </div>
                ) : (
                  page.content.sections.map((section, index) => (
                    <Card key={section.id} className="relative">
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">{section.type}</Badge>
                            <span className="font-medium">{section.title || 'Untitled Section'}</span>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => moveSection(section.id, 'up')}
                              disabled={index === 0}
                            >
                              <ArrowUp className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => moveSection(section.id, 'down')}
                              disabled={index === page.content.sections.length - 1}
                            >
                              <ArrowDown className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setEditingSection(section)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteSection(section.id)}
                            >
                              <Trash className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      {editingSection?.id === section.id && (
                        <CardContent>
                          {renderSectionEditor(section)}
                          <div className="flex justify-end gap-2 mt-4">
                            <Button
                              variant="outline"
                              onClick={() => setEditingSection(null)}
                            >
                              Cancel
                            </Button>
                            <Button onClick={() => setEditingSection(null)}>
                              Done
                            </Button>
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PageEditor;
