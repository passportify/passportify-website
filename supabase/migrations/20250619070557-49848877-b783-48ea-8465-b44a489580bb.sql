
-- Create content management tables for the admin backend

-- Pages table to store all website pages
CREATE TABLE public.pages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  meta_description text,
  content jsonb DEFAULT '{}',
  status text DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  created_by uuid REFERENCES auth.users(id),
  updated_by uuid REFERENCES auth.users(id)
);

-- Blog posts table
CREATE TABLE public.blog_posts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text,
  content text NOT NULL,
  featured_image text,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  author_id uuid REFERENCES auth.users(id),
  tags text[] DEFAULT '{}',
  category text
);

-- Case studies table
CREATE TABLE public.case_studies (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  company_name text NOT NULL,
  industry text,
  challenge text NOT NULL,
  solution text NOT NULL,
  results text NOT NULL,
  featured_image text,
  logo_image text,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  author_id uuid REFERENCES auth.users(id)
);

-- Components table for managing reusable components
CREATE TABLE public.components (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text UNIQUE NOT NULL,
  type text NOT NULL,
  props jsonb DEFAULT '{}',
  content jsonb DEFAULT '{}',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Site settings table for global configurations
CREATE TABLE public.site_settings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  key text UNIQUE NOT NULL,
  value jsonb NOT NULL,
  description text,
  updated_at timestamp with time zone DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id)
);

-- User roles table for admin permissions
CREATE TABLE public.user_roles (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('super_admin', 'admin', 'editor', 'user')),
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Contact form submissions
CREATE TABLE public.contact_submissions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  company text,
  role text,
  message text NOT NULL,
  status text DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'closed')),
  created_at timestamp with time zone DEFAULT now(),
  notes text
);

-- Enable RLS on all tables
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.components ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create function to check if user has admin role
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_roles.user_id = $1 
    AND role IN ('super_admin', 'admin')
  );
$$;

-- Create function to check if user is super admin
CREATE OR REPLACE FUNCTION public.is_super_admin(user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_roles.user_id = $1 
    AND role = 'super_admin'
  );
$$;

-- RLS Policies for pages
CREATE POLICY "Public can view published pages"
  ON public.pages FOR SELECT
  USING (status = 'published');

CREATE POLICY "Admins can manage all pages"
  ON public.pages FOR ALL
  USING (public.is_admin(auth.uid()));

-- RLS Policies for blog posts
CREATE POLICY "Public can view published blog posts"
  ON public.blog_posts FOR SELECT
  USING (status = 'published');

CREATE POLICY "Admins can manage all blog posts"
  ON public.blog_posts FOR ALL
  USING (public.is_admin(auth.uid()));

-- RLS Policies for case studies
CREATE POLICY "Public can view published case studies"
  ON public.case_studies FOR SELECT
  USING (status = 'published');

CREATE POLICY "Admins can manage all case studies"
  ON public.case_studies FOR ALL
  USING (public.is_admin(auth.uid()));

-- RLS Policies for components
CREATE POLICY "Public can view components"
  ON public.components FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Admins can manage components"
  ON public.components FOR ALL
  USING (public.is_admin(auth.uid()));

-- RLS Policies for site settings
CREATE POLICY "Public can view site settings"
  ON public.site_settings FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Super admins can manage site settings"
  ON public.site_settings FOR ALL
  USING (public.is_super_admin(auth.uid()));

-- RLS Policies for user roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Super admins can manage all user roles"
  ON public.user_roles FOR ALL
  USING (public.is_super_admin(auth.uid()));

-- RLS Policies for contact submissions
CREATE POLICY "Admins can view all contact submissions"
  ON public.contact_submissions FOR SELECT
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Anyone can insert contact submissions"
  ON public.contact_submissions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can update contact submissions"
  ON public.contact_submissions FOR UPDATE
  USING (public.is_admin(auth.uid()));

-- Insert initial site settings
INSERT INTO public.site_settings (key, value, description) VALUES
('site_title', '"Passportify"', 'Main site title'),
('site_description', '"Digital Product Passport platform for EU compliance"', 'Site meta description'),
('contact_email', '"hello@passportify.ai"', 'Main contact email'),
('social_links', '{"linkedin": "", "twitter": ""}', 'Social media links'),
('maintenance_mode', 'false', 'Enable/disable maintenance mode');

-- Insert initial page content for existing pages
INSERT INTO public.pages (slug, title, meta_description, content, status) VALUES
('home', 'Home', 'Passportify - Digital Product Passport platform for EU compliance', '{}', 'published'),
('platform', 'Platform', 'Explore Passportify''s comprehensive DPP platform modules', '{}', 'published'),
('how-it-works', 'How It Works', 'Learn how Passportify simplifies DPP compliance in 5 steps', '{}', 'published'),
('why-passportify', 'Why Passportify', 'Discover why Passportify is the best choice for DPP compliance', '{}', 'published'),
('compliance', 'Compliance', 'Understanding EU Digital Product Passport regulations', '{}', 'published'),
('resources', 'Resources', 'Expert insights and guides for DPP compliance', '{}', 'published'),
('contact', 'Contact', 'Get in touch with our team for a demo', '{}', 'published');

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER handle_pages_updated_at BEFORE UPDATE ON public.pages FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
CREATE TRIGGER handle_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
CREATE TRIGGER handle_case_studies_updated_at BEFORE UPDATE ON public.case_studies FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
CREATE TRIGGER handle_components_updated_at BEFORE UPDATE ON public.components FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
CREATE TRIGGER handle_site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
