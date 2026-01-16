
import React from 'react';
import { Shield, Menu, X, ShoppingBag } from 'lucide-react';
import { useCart } from './CartProvider';

interface HeaderProps {
  scrolled: boolean;
}

export const Header: React.FC<HeaderProps> = ({ scrolled }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { cartCount, setIsCartOpen } = useCart();

  const navItems = [
    { name: 'Technology', href: '#technology' },
    { name: 'Shop', href: '#shop' },
    { name: 'Simulator', href: '#simulator' },
    { name: 'Impact', href: '#impact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-4' : 'py-8'}`}>
      <div className={`mx-auto max-w-7xl px-6 lg:px-8 transition-all duration-500 ${scrolled ? 'glass rounded-full shadow-lg' : ''}`}>
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-accent" />
            <span className="text-xl font-serif font-bold tracking-tight">ANDATECH <span className="font-sans font-light text-stone-400 uppercase text-sm tracking-tighter">Prestige</span></span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-stone-600 hover:text-accent transition-colors uppercase tracking-widest"
              >
                {item.name}
              </a>
            ))}
            
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:bg-stone-50 rounded-full transition-all group"
            >
              <ShoppingBag className="w-6 h-6 text-stone-900 group-hover:text-accent transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-stone-900 text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-in zoom-in duration-300">
                  {cartCount}
                </span>
              )}
            </button>

            <button className="bg-stone-900 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-accent hover:text-stone-900 transition-all">
              Quick Contact
            </button>
          </div>

          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white pt-24 px-6">
          <div className="flex flex-col gap-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-2xl font-serif border-b border-stone-100 pb-4"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <button className="bg-accent text-stone-900 px-8 py-4 rounded-xl font-bold mt-4">
              Shop Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
