import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import ArticlePage from "./pages/ArticlePage.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import MontazhCeny from "./pages/MontazhCeny.tsx";
import AdminLogin from "./pages/AdminLogin.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import Overview from "./pages/admin/Overview.tsx";
import AdminServices from "./pages/admin/AdminServices.tsx";
import AdminCatalog from "./pages/admin/AdminCatalog.tsx";
import AdminPortfolio from "./pages/admin/AdminPortfolio.tsx";
import AdminArticles from "./pages/admin/AdminArticles.tsx";
import AdminPromos from "./pages/admin/AdminPromos.tsx";
import AdminContacts from "./pages/admin/AdminContacts.tsx";
import AdminSubmissions from "./pages/admin/AdminSubmissions.tsx";
import AdminSections from "./pages/admin/AdminSections.tsx";
import AdminChats from "./pages/admin/AdminChats.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/articles/:slug" element={<ArticlePage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/montazh-ceny" element={<MontazhCeny />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={<Overview />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="catalog" element={<AdminCatalog />} />
            <Route path="portfolio" element={<AdminPortfolio />} />
            <Route path="articles" element={<AdminArticles />} />
            <Route path="promos" element={<AdminPromos />} />
            <Route path="contacts" element={<AdminContacts />} />
            <Route path="submissions" element={<AdminSubmissions />} />
            <Route path="sections" element={<AdminSections />} />
            <Route path="chats" element={<AdminChats />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
