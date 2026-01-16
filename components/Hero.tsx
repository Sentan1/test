
import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight, Target, Activity, ShoppingBag } from 'lucide-react';
import { QuantumScene } from './QuantumScene';

export const Hero: React.FC = () => {
  return (
    <section className="relative h-screen flex items-center overflow-hidden pt-20">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-100">
        <Suspense fallback={<div className="w-full h-full bg-stone-100 animate-pulse" />}>
          <QuantumScene />
        </Suspense>
      </div>

      {/* Tech HUD Overlays */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <motion.div 
          className="absolute left-0 right-0 h-[1px] bg-accent/20"
          animate={{ top: ['0%', '100%', '0%'] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        
        <div className="absolute top-32 left-8 font-mono text-[10px] text-stone-400 space-y-1 hidden md:block">
          <p>SYS.MONITOR.ACTIVE</p>
          <p>VAL: 0.00% BAC</p>
          <p>TEMP: 36.5°C</p>
          <p className="text-accent animate-pulse">FLOW_SENSOR: OPTIMAL</p>
        </div>

        <div className="absolute bottom-32 right-8 font-mono text-[10px] text-stone-400 text-right hidden md:block">
          <p>STORE_SESSION: SECURE</p>
          <p>CURRENCY: AUD</p>
          <p>CERT: AS3547_2019</p>
        </div>

        <div className="absolute top-10 left-10 w-20 h-20 border-t border-l border-stone-200" />
        <div className="absolute bottom-10 right-10 w-20 h-20 border-b border-r border-stone-200" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-[0.3em]">
                Elite Collection
              </span>
              <Activity className="w-4 h-4 text-accent animate-pulse" />
            </div>
            
            <h1 className="text-6xl md:text-8xl font-serif leading-none text-stone-900 mb-8">
              Clarity in <br />
              <span className="italic flex items-center gap-4">
                Every Breath.
                <Target className="w-12 h-12 md:w-16 md:h-16 text-stone-200 stroke-[1px]" />
              </span>
            </h1>
            <p className="text-xl text-stone-600 mb-10 leading-relaxed max-w-lg">
              World-class fuel cell technology combined with intelligent processing. Secure the gold standard in precision safety equipment today.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#shop" className="group flex items-center gap-3 bg-stone-900 text-white px-8 py-4 rounded-full font-medium hover:bg-accent hover:text-stone-900 transition-all shadow-xl">
                Shop Collection
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#technology" className="px-8 py-4 rounded-full font-medium border border-stone-200 hover:border-stone-900 transition-all group overflow-hidden relative">
                <span className="relative z-10">Our Technology</span>
                <div className="absolute inset-0 bg-accent -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown className="w-5 h-5 text-stone-300" />
      </motion.div>
    </section>
  );
};
