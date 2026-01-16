
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Sparkles } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const AIConsultant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([]);
  const [loading, setLoading] = useState(false);

  const handleConsult = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMsg = query;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setQuery('');
    setLoading(true);

    try {
      // Initialize AI right before request to ensure correct context and API key usage
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      // Upgrade to gemini-3-pro-preview for sophisticated technical reasoning about alcohol safety and standards
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: userMsg,
        config: {
          systemInstruction: "You are an expert safety consultant for Andatech, an Australian leader in breathalyser technology. Your goal is to provide accurate, professional information about alcohol safety, breathalyser technology (fuel cells vs semiconductors), and workplace safety compliance (AS3547). Keep responses sophisticated and helpful.",
        }
      });

      // Extract generated text from response property directly
      setMessages(prev => [...prev, { role: 'ai', text: response.text || 'I apologize, I could not process that request at this time.' }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'ai', text: "Error connecting to safety database. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-96 glass rounded-[32px] shadow-2xl overflow-hidden flex flex-col h-[500px]"
          >
            <div className="bg-stone-900 p-6 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-stone-900">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-lg leading-tight">Safety Consultant</h4>
                  <p className="text-[10px] text-accent font-bold uppercase tracking-widest">Powered by Andatech AI</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:text-accent">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth">
              {messages.length === 0 && (
                <div className="text-center py-10">
                   <Sparkles className="w-10 h-10 text-stone-200 mx-auto mb-4" />
                   <p className="text-stone-400 text-sm">Ask me about Fuel Cell tech, calibration, or alcohol safety standards.</p>
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${
                    m.role === 'user' 
                      ? 'bg-accent text-stone-900 font-medium' 
                      : 'bg-stone-100 text-stone-700'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {loading && <div className="text-xs text-stone-400 italic">Consulting safety database...</div>}
            </div>

            <form onSubmit={handleConsult} className="p-4 bg-white/50 border-t border-stone-100 flex gap-2">
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask our consultant..."
                className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button type="submit" className="bg-stone-900 text-white p-2 rounded-xl hover:bg-accent hover:text-stone-900 transition-colors">
                <Send className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-stone-900 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-accent hover:text-stone-900 transition-all group"
      >
        <MessageSquare className={`w-8 h-8 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
      </motion.button>
    </div>
  );
};
