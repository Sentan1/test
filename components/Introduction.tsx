
import React from 'react';
import { motion } from 'framer-motion';

export const Introduction: React.FC = () => {
  return (
    <section className="py-32 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif text-stone-900 mb-8 leading-tight">
              The Responsibility of <br /><span className="italic">True Accuracy.</span>
            </h2>
            <div className="prose prose-lg text-stone-600">
              <p className="mb-6 first-letter:text-7xl first-letter:font-serif first-letter:text-stone-900 first-letter:mr-3 first-letter:float-left first-letter:leading-none">
                In a world where safety is non-negotiable, the margin for error must be zero. For over two decades, Andatech has stood at the intersection of medical science and portable technology, crafting instruments that don't just measure—they protect.
              </p>
              <p>
                From heavy mining operations in the outback to local households, our mission remains unchanged: providing the clarity needed to make the right decisions.
              </p>
            </div>
          </motion.div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="aspect-square rounded-3xl overflow-hidden bg-stone-200"
            >
              <img 
                src="https://picsum.photos/800/800?grayscale" 
                alt="Precision Engineering" 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-[2s]"
              />
            </motion.div>
            <div className="absolute -bottom-10 -left-10 glass p-8 rounded-2xl hidden md:block max-w-[240px]">
              <span className="block text-4xl font-serif text-accent mb-2">20+</span>
              <span className="text-sm font-medium uppercase tracking-widest text-stone-500">Years of Innovation in Australia</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
