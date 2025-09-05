import HeroSection from "../organisms/FrontHome/Hero"; 
import Features from "../organisms/FrontHome/Feature";
import ExpertTrainersSection from "../organisms/FrontHome/ExpertTrainer";
import ServicesSection from "../organisms/FrontHome/ServicesSection";
import PlanPricingSection from "../organisms/FrontHome/PlanPricingSection";


export default function Home() {
  return (
    <main>
      <HeroSection />
      <Features/>
      {/* <ServicesSection/> */}
      <ExpertTrainersSection/>
      <PlanPricingSection/>
      {/* <TestimonialsSection/> */}
    </main>
  );
}
