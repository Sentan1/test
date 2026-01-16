
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, ArrowRight, Minus, Plus } from 'lucide-react';
import { useCart } from './CartProvider';

export const CartDrawer: React.FC = () => {
  const { isCartOpen, setIsCartOpen, cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-md z-[200]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-[201] shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="p-8 border-b border-stone-100 flex items-center justify-between bg-white sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-accent" />
                </div>
                <h2 className="text-2xl font-serif text-stone-900">Your Selection</h2>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)} 
                className="p-3 hover:bg-stone-50 rounded-full transition-colors group"
              >
                <X className="w-6 h-6 text-stone-400 group-hover:text-stone-900" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-20">
                  <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag className="w-10 h-10 text-stone-200" />
                  </div>
                  <p className="font-serif text-xl text-stone-900 mb-2">Your collection is empty</p>
                  <p className="text-stone-400 text-sm mb-8">Start your journey toward safety by <br />browsing our precision instruments.</p>
                  <button 
                    onClick={() => setIsCartOpen(false)} 
                    className="bg-stone-900 text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-accent hover:text-stone-900 transition-all"
                  >
                    Continue Browsing
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={item.id} 
                    className="flex gap-6 group"
                  >
                    <div className="w-28 h-28 bg-stone-50 rounded-[24px] overflow-hidden flex-shrink-0 border border-stone-100">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 py-1 flex flex-col">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-serif text-lg text-stone-900">{item.title}</h4>
                        <button 
                          onClick={() => removeFromCart(item.id)} 
                          className="text-stone-300 hover:text-red-500 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-accent text-[10px] font-bold uppercase tracking-widest mb-4">Precision Device</p>
                      
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center border border-stone-200 rounded-full px-2 py-1">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 hover:text-accent transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-bold font-mono">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 hover:text-accent transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="font-bold text-stone-900 text-lg">${(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-8 bg-stone-50 border-t border-stone-100 space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-stone-400 uppercase tracking-widest text-[10px] font-bold">
                    <span>Shipping</span>
                    <span className="text-stone-900">Free (Standard)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-900 font-serif text-xl">Total</span>
                    <span className="text-3xl font-serif text-stone-900">${cartTotal.toLocaleString()} <span className="text-sm font-sans font-normal text-stone-400">AUD</span></span>
                  </div>
                </div>
                
                <button className="w-full bg-stone-900 text-white py-5 rounded-[24px] font-bold flex items-center justify-center gap-4 hover:bg-accent hover:text-stone-900 transition-all shadow-2xl shadow-stone-200 group">
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <div className="flex items-center justify-center gap-4 grayscale opacity-40">
                  <div className="w-8 h-5 bg-stone-200 rounded-sm" title="Visa" />
                  <div className="w-8 h-5 bg-stone-200 rounded-sm" title="Mastercard" />
                  <div className="w-8 h-5 bg-stone-200 rounded-sm" title="Amex" />
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
