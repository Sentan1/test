
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from './CartProvider';

export const CartDrawer: React.FC = () => {
  const { isCartOpen, setIsCartOpen, cart, removeFromCart, cartTotal } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-[201] shadow-2xl flex flex-col"
          >
            <div className="p-8 border-b border-stone-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-stone-900" />
                <h2 className="text-2xl font-serif">Your Collection</h2>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-stone-50 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                  <ShoppingBag className="w-12 h-12 mb-4 stroke-1" />
                  <p className="font-serif text-lg">Your cart is currently empty</p>
                  <button onClick={() => setIsCartOpen(false)} className="text-accent font-bold text-xs uppercase tracking-widest mt-4">Continue Shopping</button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-24 h-24 bg-stone-50 rounded-2xl overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 py-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-serif text-lg">{item.title}</h4>
                        <button onClick={() => removeFromCart(item.id)} className="text-stone-300 hover:text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-stone-400 text-sm mb-2">Quantity: {item.quantity}</p>
                      <p className="font-bold text-accent">${(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-8 bg-stone-50 border-t border-stone-100">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-stone-400 uppercase tracking-widest text-xs font-bold">Subtotal</span>
                  <span className="text-2xl font-serif">${cartTotal.toLocaleString()} AUD</span>
                </div>
                <button className="w-full bg-stone-900 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-accent hover:text-stone-900 transition-all shadow-xl shadow-stone-200">
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5" />
                </button>
                <p className="text-center text-[10px] text-stone-400 mt-4 uppercase tracking-[0.2em]">Shipping & Taxes calculated at checkout</p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
