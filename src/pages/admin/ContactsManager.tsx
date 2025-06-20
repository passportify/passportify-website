
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Eye, Edit } from 'lucide-react';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  message: string;
  status: string;
  notes: string;
  created_at: string;
}

const ContactsManager = () => {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContacts(data || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast({
        title: "Error",
        description: "Failed to fetch contact submissions",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateContact = async () => {
    if (!selectedContact) return;

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({
          status,
          notes,
          // Note: contact_submissions table doesn't have updated_at, so we don't include it
        })
        .eq('id', selectedContact.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Contact updated successfully",
      });
      
      setSelectedContact(null);
      fetchContacts();
    } catch (error: any) {
      console.error('Error updating contact:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update contact",
        variant: "destructive",
      });
    }
  };

  const openContactDialog = (contact: ContactSubmission) => {
    setSelectedContact(contact);
    setNotes(contact.notes || '');
    setStatus(contact.status);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'new': return 'destructive';
      case 'contacted': return 'secondary';
      case 'qualified': return 'default';
      case 'closed': return 'outline';
      default: return 'secondary';
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Contact Submissions</h1>
        <p className="text-muted-foreground">Manage and respond to contact form submissions</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Contact Submissions</CardTitle>
          <CardDescription>
            View and manage all contact form submissions from your website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{contact.name}</div>
                      {contact.role && (
                        <div className="text-sm text-muted-foreground">{contact.role}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{contact.company || 'Not provided'}</TableCell>
                  <TableCell>
                    <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">
                      {contact.email}
                    </a>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(contact.status)}>
                      {contact.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(contact.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openContactDialog(contact)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Contact Submission Details</DialogTitle>
                          <DialogDescription>
                            View and update contact submission from {contact.name}
                          </DialogDescription>
                        </DialogHeader>
                        {selectedContact && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium">Name</label>
                                <p className="text-sm">{selectedContact.name}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Email</label>
                                <p className="text-sm">{selectedContact.email}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Company</label>
                                <p className="text-sm">{selectedContact.company || 'Not provided'}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Role</label>
                                <p className="text-sm">{selectedContact.role || 'Not provided'}</p>
                              </div>
                            </div>
                            
                            <div>
                              <label className="text-sm font-medium">Message</label>
                              <div className="mt-1 p-3 bg-gray-50 rounded-md">
                                <p className="text-sm whitespace-pre-wrap">{selectedContact.message}</p>
                              </div>
                            </div>

                            <div>
                              <label className="text-sm font-medium">Status</label>
                              <Select value={status} onValueChange={setStatus}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="new">New</SelectItem>
                                  <SelectItem value="contacted">Contacted</SelectItem>
                                  <SelectItem value="qualified">Qualified</SelectItem>
                                  <SelectItem value="closed">Closed</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <label className="text-sm font-medium">Internal Notes</label>
                              <Textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Add internal notes about this contact..."
                                rows={3}
                              />
                            </div>

                            <div className="flex justify-end gap-2">
                              <Button variant="outline" onClick={() => setSelectedContact(null)}>
                                Cancel
                              </Button>
                              <Button onClick={updateContact}>
                                Update Contact
                              </Button>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {contacts.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No contact submissions found.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactsManager;
