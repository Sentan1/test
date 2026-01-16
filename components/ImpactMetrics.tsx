
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';

const data = [
  { name: 'Cheap Imports', accuracy: 65, stability: 40, fill: '#E5E7EB' },
  { name: 'Semiconductor', accuracy: 82, stability: 60, fill: '#9CA3AF' },
  { name: 'Andatech Pro', accuracy: 99.8, stability: 98, fill: '#A4D266' },
];

export const ImpactMetrics: React.FC = () => {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-serif text-stone-900 mb-6">Unrivaled <br /> Performance.</h2>
            <p className="text-stone-600">Comparing Andatech fuel cell technology against standard industry alternatives. Accuracy isn't just a number—it's a safeguard.</p>
          </div>
          <div className="flex gap-12 text-right">
             <div>
               <span className="block text-4xl font-serif text-stone-900">0.001</span>
               <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Detection Increment</span>
             </div>
             <div>
               <span className="block text-4xl font-serif text-stone-900">AS3547</span>
               <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Certification Standard</span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 h-[400px] glass rounded-[40px] p-8">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#4b5563', fontSize: 12}} dy={10} />
                  <YAxis hide />
                  <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                  />
                  <Bar dataKey="accuracy" radius={[10, 10, 10, 10]} barSize={60}>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
           </div>
           
           <div className="space-y-4">
              <div className="glass bg-accent/5 border-accent/20 rounded-[32px] p-8">
                 <h4 className="text-stone-900 font-bold uppercase tracking-widest text-xs mb-4">Precision Lead</h4>
                 <p className="text-stone-600 text-sm mb-6">Andatech's FX series sensors maintain calibration 3x longer than competitive semiconductor models.</p>
                 <div className="h-1 w-full bg-stone-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '98%' }}
                      transition={{ duration: 1.5 }}
                      className="h-full bg-accent" 
                    />
                 </div>
              </div>
              <div className="glass rounded-[32px] p-8">
                 <h4 className="text-stone-900 font-bold uppercase tracking-widest text-xs mb-4">Response Time</h4>
                 <p className="text-stone-600 text-sm mb-6">Average warm-up time of 3 seconds. Rapid sequence testing capability for high-volume sites.</p>
                 <div className="h-1 w-full bg-stone-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '92%' }}
                      transition={{ duration: 1.5, delay: 0.2 }}
                      className="h-full bg-stone-900" 
                    />
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};
