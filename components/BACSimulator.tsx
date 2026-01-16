
import React, { useState, useMemo } from 'react';
import { Info, RefreshCw } from 'lucide-react';

export const BACSimulator: React.FC = () => {
  const [weight, setWeight] = useState(75); // kg
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [drinks, setDrinks] = useState(2);
  const [hours, setHours] = useState(1);

  const bac = useMemo(() => {
    // Widmark Formula: BAC = [Alcohol consumed in grams / (Body weight in grams * r)] * 100 - (Time in hours * 0.015)
    // r = 0.68 for men, 0.55 for women
    const alcoholGrams = drinks * 10; // 1 standard drink = 10g
    const weightGrams = weight * 1000;
    const r = gender === 'male' ? 0.68 : 0.55;
    
    let result = (alcoholGrams / (weightGrams * r)) * 100 - (hours * 0.015);
    return Math.max(0, result).toFixed(3);
  }, [weight, gender, drinks, hours]);

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div>
          <h2 className="text-4xl md:text-5xl font-serif text-stone-900 mb-8">
            The Interactive <br /><span className="italic">BAC Lab.</span>
          </h2>
          <p className="text-stone-600 mb-12 max-w-md">
            Understand how variables like weight, time, and gender affect your Blood Alcohol Concentration. Note: This is an estimation only. Always use a calibrated breathalyser for accuracy.
          </p>

          <div className="space-y-8 glass p-10 rounded-[32px] border-stone-200">
            {/* Gender */}
            <div className="flex gap-4">
              <button 
                onClick={() => setGender('male')}
                className={`flex-1 py-3 rounded-xl font-bold transition-all ${gender === 'male' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-400'}`}
              >
                Male
              </button>
              <button 
                onClick={() => setGender('female')}
                className={`flex-1 py-3 rounded-xl font-bold transition-all ${gender === 'female' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-400'}`}
              >
                Female
              </button>
            </div>

            {/* Weight */}
            <div>
              <div className="flex justify-between mb-4">
                <label className="text-sm font-bold uppercase tracking-widest text-stone-500">Weight (kg)</label>
                <span className="font-serif text-xl">{weight} kg</span>
              </div>
              <input 
                type="range" min="40" max="150" value={weight} 
                onChange={(e) => setWeight(parseInt(e.target.value))}
                className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-accent"
              />
            </div>

            {/* Drinks */}
            <div>
              <div className="flex justify-between mb-4">
                <label className="text-sm font-bold uppercase tracking-widest text-stone-500">Standard Drinks</label>
                <span className="font-serif text-xl">{drinks}</span>
              </div>
              <input 
                type="range" min="0" max="15" value={drinks} 
                onChange={(e) => setDrinks(parseInt(e.target.value))}
                className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-accent"
              />
            </div>

            {/* Time */}
            <div>
              <div className="flex justify-between mb-4">
                <label className="text-sm font-bold uppercase tracking-widest text-stone-500">Hours Since First Drink</label>
                <span className="font-serif text-xl">{hours} hrs</span>
              </div>
              <input 
                type="range" min="0" max="12" value={hours} 
                onChange={(e) => setHours(parseInt(e.target.value))}
                className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-accent"
              />
            </div>
          </div>
        </div>

        <div className="sticky top-32">
          <div className="bg-stone-900 rounded-[40px] p-12 text-center overflow-hidden relative group">
            <div className={`absolute inset-0 opacity-20 transition-all duration-1000 ${parseFloat(bac) >= 0.05 ? 'bg-red-500' : 'bg-accent'}`} />
            
            <h3 className="text-stone-400 text-xs font-bold uppercase tracking-[0.4em] mb-8">Estimated BAC</h3>
            
            <div className="relative mb-8">
              <span className={`text-[120px] font-serif transition-colors duration-500 ${parseFloat(bac) >= 0.05 ? 'text-red-400' : 'text-accent'}`}>
                {bac}
              </span>
              <span className="text-stone-500 text-xl block mt-[-30px]">% BAC</span>
            </div>

            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-stone-300 text-sm">
              <Info className="w-4 h-4 text-accent" />
              {parseFloat(bac) >= 0.05 ? 'Exceeds Legal Driving Limit (AU)' : 'Below Legal Driving Limit (AU)'}
            </div>

            <div className="mt-12 pt-12 border-t border-white/10 text-left">
              <p className="text-stone-500 text-xs leading-relaxed italic">
                *The Widmark formula provides a mathematical approximation based on average metabolism. Actual results vary based on body fat percentage, hydration, and food intake. Never drink and drive.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
