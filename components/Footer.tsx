
import React from 'react';
import { Shield, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-stone-900 text-stone-100 py-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-24">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <Shield className="w-8 h-8 text-accent" />
              <span className="text-2xl font-serif font-bold tracking-tight">ANDATECH <span className="font-sans font-light text-stone-500">PRESTIGE</span></span>
            </div>
            <p className="text-stone-400 text-lg max-w-md leading-relaxed mb-8">
              Advancing the standard of safety through precision instrumentation and unwavering commitment to Australian excellence.
            </p>
            <div className="flex gap-4">
               {['Linkedin', 'Instagram', 'Twitter', 'Facebook'].map(s => (
                 <a key={s} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent hover:text-stone-900 transition-all">
                   <span className="sr-only">{s}</span>
                   <div className="w-2 h-2 rounded-full bg-current" />
                 </a>
               ))}
            </div>
          </div>

          <div>
            <h4 className="text-accent font-bold uppercase tracking-widest text-xs mb-8">Navigation</h4>
            <ul className="space-y-4 text-stone-400">
              <li><a href="#technology" className="hover:text-white transition-colors">Technology</a></li>
              <li><a href="#simulator" className="hover:text-white transition-colors">Simulator</a></li>
              <li><a href="#impact" className="hover:text-white transition-colors">Impact Data</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-accent font-bold uppercase tracking-widest text-xs mb-8">Get in Touch</h4>
            <ul className="space-y-6 text-stone-400">
              <li className="flex gap-4">
                <Mail className="w-5 h-5 text-stone-500" />
                <span>sales@andatech.com.au</span>
              </li>
              <li className="flex gap-4">
                <Phone className="w-5 h-5 text-stone-500" />
                <span>1300 800 200</span>
              </li>
              <li className="flex gap-4">
                <MapPin className="w-5 h-5 text-stone-500" />
                <span>Melbourne, VIC 3150, Australia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-stone-500 text-sm">
          <p>© 2025 Andatech Pty Ltd. All Rights Reserved.</p>
          <div className="flex gap-8">
             <span className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-accent" />
               AS3547:2019 Certified
             </span>
             <span className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-accent" />
               ISO 9001 Quality Managed
             </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
