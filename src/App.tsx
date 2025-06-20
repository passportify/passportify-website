import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import Index from '@/pages/Index';
import Platform from '@/pages/Platform';
import HowItWorks from '@/pages/HowItWorks';
import WhyPassportify from '@/pages/WhyPassportify';
import Compliance from '@/pages/Compliance';
import Resources from '@/pages/Resources';
import Contact from '@/pages/Contact';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsOfService from '@/pages/TermsOfService';
import NotFound from '@/pages/NotFound';
import Auth from '@/pages/Auth';
import AdminLayout from '@/components/AdminLayout';
import Dashboard from '@/pages/admin/Dashboard';
import PagesManager from '@/pages/admin/PagesManager';
import PageEditor from '@/pages/admin/PageEditor';
import BlogManager from '@/pages/admin/BlogManager';
import BlogEditor from '@/pages/admin/BlogEditor';
import ContactsManager from '@/pages/admin/ContactsManager';
import { Toaster } from '@/components/ui/toaster';
import ProtectedRoute from '@/components/ProtectedRoute';
import CaseStudyEditor from '@/pages/admin/CaseStudyEditor';
import ComponentsManager from '@/pages/admin/ComponentsManager';
import ComponentEditor from '@/pages/admin/ComponentEditor';
import SiteSettingsManager from '@/pages/admin/SiteSettingsManager';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Layout><Index /></Layout>} />
        <Route path="/platform" element={<Layout><Platform /></Layout>} />
        <Route path="/how-it-works" element={<Layout><HowItWorks /></Layout>} />
        <Route path="/why-passportify" element={<Layout><WhyPassportify /></Layout>} />
        <Route path="/compliance" element={<Layout><Compliance /></Layout>} />
        <Route path="/resources" element={<Layout><Resources /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/privacy-policy" element={<Layout><PrivacyPolicy /></Layout>} />
        <Route path="/terms-of-service" element={<Layout><TermsOfService /></Layout>} />
        <Route path="/auth" element={<Auth />} />

        {/* Protected admin routes */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute requireAdmin>
              <AdminLayout><Dashboard /></AdminLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/pages" 
          element={
            <ProtectedRoute requireAdmin>
              <AdminLayout><PagesManager /></AdminLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/pages/:id" 
          element={
            <ProtectedRoute requireAdmin>
              <AdminLayout><PageEditor /></AdminLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/blog" 
          element={
            <ProtectedRoute requireAdmin>
              <AdminLayout><BlogManager /></AdminLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/blog/:id" 
          element={
            <ProtectedRoute requireAdmin>
              <AdminLayout><BlogEditor /></AdminLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/case-studies" 
          element={
            <ProtectedRoute requireAdmin>
              <AdminLayout><CaseStudiesManager /></AdminLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/case-studies/:id" 
          element={
            <ProtectedRoute requireAdmin>
              <AdminLayout><CaseStudyEditor /></AdminLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/contacts" 
          element={
            <ProtectedRoute requireAdmin>
              <AdminLayout><ContactsManager /></AdminLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/components" 
          element={
            <ProtectedRoute requireAdmin>
              <AdminLayout><ComponentsManager /></AdminLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/components/:id" 
          element={
            <ProtectedRoute requireAdmin>
              <AdminLayout><ComponentEditor /></AdminLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/settings" 
          element={
            <ProtectedRoute requireAdmin>
              <AdminLayout><SiteSettingsManager /></AdminLayout>
            </ProtectedRoute>
          } 
        />

        {/* Catch all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
