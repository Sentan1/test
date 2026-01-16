
import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Zap, Beaker, Layers, Shield, MousePointer2 } from 'lucide-react';
import { DeviceCanvas } from './DeviceCanvas';

const features = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Fuel Cell Technology",
    desc: "Electro-chemical sensors that react specifically to alcohol molecules, ensuring zero cross-reactivity with acetone or other vapors."
  },
  {
    icon: <Activity className="w-6 h-6" />,
    title: "Dynamic Calibration",
    desc: "Intelligent software compensation for atmospheric pressure and temperature variations in extreme Australian climates."
  },
  {
    icon: <Beaker className="w-6 h-6" />,
    title: "Medical Grade",
    desc: "Instruments designed to meet and exceed Australian Standards AS3547 for rigorous professional and clinical use."
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: "Rapid Recovery",
    desc: "Ultra-fast sensor clearing allows for consecutive testing within seconds, essential for high-volume environments."
  }
];

export const ScienceSection: React.FC = () => {
  return (
    <section className="py-32 bg-stone-900 text-stone-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-24">
          <span className="text-accent text-xs font-bold uppercase tracking-[0.4em] mb-4 block">Engineered for Life</span>
          <h2 className="text-4xl md:text-6xl font-serif mb-6">The Science of Certainty</h2>
          <div className="h-px w-24 bg-accent mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-stone-900 transition-all duration-500">
                {f.icon}
              </div>
              <h3 className="text-xl font-serif mb-4">{f.title}</h3>
              <p className="text-stone-400 text-sm leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-32 relative group">
           <div className="absolute inset-0 bg-accent/20 blur-[150px] pointer-events-none group-hover:bg-accent/40 transition-all duration-1000" />
           <div className="relative glass border-white/5 rounded-[40px] p-12 overflow-hidden flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-accent uppercase tracking-widest mb-6">
                  Interactive Inspector
                </div>
                <h3 className="text-3xl md:text-5xl font-serif mb-6">Platinum Fuel Cell Sensors</h3>
                <p className="text-stone-400 mb-8 max-w-xl leading-relaxed">
                  Unlike traditional semiconductor sensors that react to varied gases, our platinum-plated fuel cells generate a precise electrical current directly proportional to alcohol concentration. 
                  <br /><br />
                  Inspect the FX-Series architecture to the right. Drag to rotate and explore the ergonomic design and medical-grade materials used in our flagship hardware.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="px-6 py-2 rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-widest text-stone-300">High Specificity</div>
                  <div className="px-6 py-2 rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-widest text-stone-300">Long Term Stability</div>
                </div>
                
                <div className="mt-12 flex items-center gap-3 text-stone-500 text-xs">
                  <MousePointer2 className="w-4 h-4 animate-bounce" />
                  <span>Click and drag to rotate the 3D model</span>
                </div>
              </div>
              
              <div className="w-full lg:w-1/2 aspect-square relative h-[500px] lg:h-[600px]">
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent pointer-events-none z-10" />
                <DeviceCanvas />
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};
