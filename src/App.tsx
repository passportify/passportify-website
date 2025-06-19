
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import AdminLayout from "./components/AdminLayout";
import Home from "./pages/Home";
import Platform from "./pages/Platform";
import HowItWorks from "./pages/HowItWorks";
import WhyPassportify from "./pages/WhyPassportify";
import Compliance from "./pages/Compliance";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Auth from "./pages/Auth";
import Dashboard from "./pages/admin/Dashboard";
import PagesManager from "./pages/admin/PagesManager";
import PageEditor from "./pages/admin/PageEditor";
import BlogManager from "./pages/admin/BlogManager";
import BlogEditor from "./pages/admin/BlogEditor";
import CaseStudiesManager from "./pages/admin/CaseStudiesManager";
import ContactsManager from "./pages/admin/ContactsManager";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/platform" element={<Layout><Platform /></Layout>} />
          <Route path="/how-it-works" element={<Layout><HowItWorks /></Layout>} />
          <Route path="/why-passportify" element={<Layout><WhyPassportify /></Layout>} />
          <Route path="/compliance" element={<Layout><Compliance /></Layout>} />
          <Route path="/resources" element={<Layout><Resources /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/legal/privacy-policy" element={<Layout><PrivacyPolicy /></Layout>} />
          <Route path="/legal/terms-of-service" element={<Layout><TermsOfService /></Layout>} />
          
          {/* Auth routes */}
          <Route path="/auth" element={<Auth />} />
          
          {/* Admin routes */}
          <Route path="/admin" element={<AdminLayout><Dashboard /></AdminLayout>} />
          <Route path="/admin/pages" element={<AdminLayout><PagesManager /></AdminLayout>} />
          <Route path="/admin/pages/:id" element={<AdminLayout><PageEditor /></AdminLayout>} />
          <Route path="/admin/blog" element={<AdminLayout><BlogManager /></AdminLayout>} />
          <Route path="/admin/blog/:id" element={<AdminLayout><BlogEditor /></AdminLayout>} />
          <Route path="/admin/case-studies" element={<AdminLayout><CaseStudiesManager /></AdminLayout>} />
          <Route path="/admin/contacts" element={<AdminLayout><ContactsManager /></AdminLayout>} />
          
          {/* 404 route */}
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
