import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PromosSection from "@/components/PromosSection";
import TrustSection from "@/components/TrustSection";
import HowWeWorkSection from "@/components/HowWeWorkSection";
import SelectionSection from "@/components/SelectionSection";
import CatalogSection from "@/components/CatalogSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import ReviewsSection from "@/components/ReviewsSection";
import ArticlesSection from "@/components/ArticlesSection";
import GeographySection from "@/components/GeographySection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import SilkCSSBackground from "@/components/SilkCSSBackground";

const Index = () => (
  <div className="min-h-screen">
    <SilkCSSBackground />
    <Header />
    <HeroSection />
    <TrustSection />
    <HowWeWorkSection />
    <SelectionSection />
    <PromosSection />
    <CatalogSection />
    <ServicesSection />
    <PortfolioSection />
    <ReviewsSection />
    <ArticlesSection />
    <GeographySection />
    <CtaSection />
    <Footer />
  </div>
);

export default Index;
