
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Introduction } from './components/Introduction';
import { ScienceSection } from './components/ScienceSection';
import { BACSimulator } from './components/BACSimulator';
import { ImpactMetrics } from './components/ImpactMetrics';
import { TeamSection } from './components/TeamSection';
import { Footer } from './components/Footer';
import { AIConsultant } from './components/AIConsultant';
import { ProductSection } from './components/ProductSection';
import { CartProvider } from './components/CartProvider';
import { CartDrawer } from './components/CartDrawer';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <CartProvider>
      <div className="min-h-screen selection:bg-[#A4D266] selection:text-white">
        <Header scrolled={scrolled} />
        <CartDrawer />
        
        <main>
          <Hero />
          
          <div id="shop">
            <ProductSection />
          </div>

          <div id="about">
            <Introduction />
          </div>

          <div id="technology">
            <ScienceSection />
          </div>

          <div id="simulator" className="py-24 bg-stone-50">
            <BACSimulator />
          </div>

          <div id="impact">
            <ImpactMetrics />
          </div>

          <div id="team">
            <TeamSection />
          </div>
        </main>

        <AIConsultant />
        <Footer />
      </div>
    </CartProvider>
  );
};

export default App;
