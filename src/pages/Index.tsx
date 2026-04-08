import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PromosSection from "@/components/PromosSection";
import TrustSection from "@/components/TrustSection";
import HowWeWorkSection from "@/components/HowWeWorkSection";

import CatalogSection from "@/components/CatalogSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import ReviewsSection from "@/components/ReviewsSection";
import ArticlesSection from "@/components/ArticlesSection";
import Footer from "@/components/Footer";
import SilkCSSBackground from "@/components/SilkCSSBackground";
import { ChatProvider } from "@/components/ChatContext";
import ChatWidget from "@/components/ChatWidget";

const Index = () => (
  <ChatProvider>
    <div className="min-h-screen">
      <SilkCSSBackground />
      <Header />
      <HeroSection />
      <TrustSection />
      <HowWeWorkSection />
      
      <PromosSection />
      <CatalogSection />
      <ServicesSection />
      <PortfolioSection />
      <ReviewsSection />
      <ArticlesSection />
      <Footer />
      <ChatWidget />
    </div>
  </ChatProvider>
);

export default Index;
