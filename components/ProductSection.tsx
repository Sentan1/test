
import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Plus } from 'lucide-react';
import { useCart } from './CartProvider';

const products = [
  {
    id: 'fx-70',
    title: 'Andatech FX-70',
    subtitle: 'Professional Fuel Cell',
    price: 399,
    rating: 4.9,
    image: 'https://picsum.photos/600/600?random=10',
    tag: 'Bestseller'
  },
  {
    id: 'fx-80',
    title: 'Andatech FX-80',
    subtitle: 'Industrial High-Volume',
    price: 549,
    rating: 5.0,
    image: 'https://picsum.photos/600/600?random=11',
    tag: 'Precision Standard'
  },
  {
    id: 'alcosense-pro',
    title: 'AlcoSense Pro 2',
    subtitle: 'Premium Personal Device',
    price: 289,
    rating: 4.8,
    image: 'https://picsum.photos/600/600?random=12',
    tag: 'Sleek Design'
  }
];

export const ProductSection: React.FC = () => {
  const { addToCart } = useCart();

  return (
    <section id="shop" className="py-32 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl">
            <span className="text-accent text-xs font-bold uppercase tracking-[0.4em] mb-4 block">The Collection</span>
            <h2 className="text-4xl md:text-6xl font-serif text-stone-900 leading-tight">Elite Accuracy <br /> For Every Need.</h2>
          </div>
          <p className="text-stone-500 max-w-sm mb-2">Each device in our professional range is individually calibrated and certified to Australian Standard AS3547.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {products.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -10 }}
              className="group relative bg-white rounded-[40px] overflow-hidden shadow-2xl shadow-stone-200/50 p-6 flex flex-col"
            >
              <div className="relative aspect-square rounded-[32px] overflow-hidden bg-stone-100 mb-8">
                <img src={product.image} alt={product.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-stone-900 text-[10px] font-bold uppercase tracking-widest border border-stone-100">
                    {product.tag}
                  </span>
                </div>
                <button 
                  onClick={() => addToCart({ ...product, quantity: 1 })}
                  className="absolute bottom-4 right-4 w-14 h-14 bg-stone-900 text-white rounded-full flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all hover:bg-accent hover:text-stone-900 shadow-xl"
                >
                  <Plus className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-accent fill-accent' : 'text-stone-200'}`} />
                  ))}
                  <span className="text-[10px] text-stone-400 font-bold ml-1">{product.rating}</span>
                </div>
                <h3 className="text-2xl font-serif mb-1">{product.title}</h3>
                <p className="text-stone-400 text-sm mb-6">{product.subtitle}</p>
                
                <div className="flex items-center justify-between pt-6 border-t border-stone-50">
                  <span className="text-2xl font-bold text-stone-900">${product.price} <span className="text-sm font-normal text-stone-400">AUD</span></span>
                  <button className="text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors">Details</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
