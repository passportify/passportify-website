
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { Save, Plus, Trash } from 'lucide-react';

interface SiteSetting {
  id: string;
  key: string;
  value: any;
  description: string;
}

const SiteSettingsManager = () => {
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .order('key');

      if (error) throw error;
      setSettings(data || []);
    } catch (error) {
      console.error('Error fetching site settings:', error);
      toast({
        title: "Error",
        description: "Failed to fetch site settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveSetting = async (setting: SiteSetting) => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert({
          id: setting.id,
          key: setting.key,
          value: setting.value,
          description: setting.description,
          updated_at: new Date().toISOString(),
          updated_by: user?.id
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Setting saved successfully",
      });
    } catch (error) {
      console.error('Error saving setting:', error);
      toast({
        title: "Error",
        description: "Failed to save setting",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const deleteSetting = async (id: string) => {
    if (!confirm('Are you sure you want to delete this setting?')) return;

    try {
      const { error } = await supabase
        .from('site_settings')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Setting deleted successfully",
      });
      fetchSettings();
    } catch (error) {
      console.error('Error deleting setting:', error);
      toast({
        title: "Error",
        description: "Failed to delete setting",
        variant: "destructive",
      });
    }
  };

  const addNewSetting = () => {
    const newSetting: SiteSetting = {
      id: crypto.randomUUID(),
      key: '',
      value: '',
      description: ''
    };
    setSettings([...settings, newSetting]);
  };

  const updateSetting = (id: string, field: keyof SiteSetting, value: any) => {
    setSettings(settings.map(setting => 
      setting.id === id ? { ...setting, [field]: value } : setting
    ));
  };

  const handleValueChange = (id: string, value: string) => {
    // Try to parse as JSON, fallback to string
    let parsedValue;
    try {
      parsedValue = JSON.parse(value);
    } catch {
      parsedValue = value;
    }
    updateSetting(id, 'value', parsedValue);
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Site Settings</h1>
          <p className="text-muted-foreground">Manage global site configuration</p>
        </div>
        <Button onClick={addNewSetting}>
          <Plus className="w-4 h-4 mr-2" />
          Add Setting
        </Button>
      </div>

      <div className="space-y-4">
        {settings.map((setting) => (
          <Card key={setting.id}>
            <CardHeader>
              <CardTitle className="text-lg">Setting Configuration</CardTitle>
              <CardDescription>
                Configure individual site setting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Key</label>
                  <Input
                    value={setting.key}
                    onChange={(e) => updateSetting(setting.id, 'key', e.target.value)}
                    placeholder="setting_key"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Input
                    value={setting.description}
                    onChange={(e) => updateSetting(setting.id, 'description', e.target.value)}
                    placeholder="Setting description"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium">Value (JSON or String)</label>
                  <Textarea
                    value={typeof setting.value === 'string' ? setting.value : JSON.stringify(setting.value, null, 2)}
                    onChange={(e) => handleValueChange(setting.id, e.target.value)}
                    placeholder="Setting value"
                    rows={3}
                  />
                </div>
                <div className="md:col-span-2 flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => deleteSetting(setting.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => saveSetting(setting)}
                    disabled={saving}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {saving ? 'Saving...' : 'Save'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {settings.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">No site settings found. Add your first setting to get started.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SiteSettingsManager;
