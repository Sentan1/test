
import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter } from 'lucide-react';

const team = [
  { name: 'Dr. Sarah Henderson', role: 'Head of Biomedical Research', img: 'https://picsum.photos/400/500?random=1' },
  { name: 'Michael Chen', role: 'Lead Sensor Engineer', img: 'https://picsum.photos/400/500?random=2' },
  { name: 'Alistair Ross', role: 'Compliance & Standards Director', img: 'https://picsum.photos/400/500?random=3' },
];

export const TeamSection: React.FC = () => {
  return (
    <section className="py-32 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-serif mb-6 text-stone-900">The Minds Behind <br /> <span className="italic">The Mission.</span></h2>
          <div className="h-px w-24 bg-accent mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {team.map((member, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="relative group overflow-hidden rounded-[32px] bg-white shadow-xl shadow-stone-200/50"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-serif text-stone-900 mb-1">{member.name}</h3>
                <p className="text-accent text-sm font-bold uppercase tracking-widest mb-4">{member.role}</p>
                <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Linkedin className="w-4 h-4 text-stone-400 hover:text-stone-900 cursor-pointer" />
                  <Twitter className="w-4 h-4 text-stone-400 hover:text-stone-900 cursor-pointer" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
