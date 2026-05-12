import React, { useState } from 'react';
import { Globe, BookOpen, Sparkles, Compass, MapPin, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

const CATEGORIES = [
  { id: 'history', name: 'History', icon: BookOpen, color: 'text-amber-600', bg: 'bg-amber-50' },
  { id: 'nature', name: 'Nature', icon: Compass, color: 'text-green-600', bg: 'bg-green-50' },
  { id: 'tech', name: 'Technology', icon: Sparkles, color: 'text-blue-600', bg: 'bg-blue-50' },
  { id: 'culture', name: 'Culture', icon: MapPin, color: 'text-purple-600', bg: 'bg-purple-50' },
];

export const WorldBook = () => {
  const [selectedCategory, setSelectedCategory] = useState('history');

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-6 pt-12 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">世界书</h1>
            <p className="text-zinc-500 text-sm">Explore the wisdom of the world</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-200">
            <Globe className="w-6 h-6 text-white" />
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input 
            type="text" 
            placeholder="Search the world..." 
            className="w-full bg-zinc-100 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {CATEGORIES.map((cat) => (
            <motion.div
              key={cat.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                "p-4 rounded-2xl cursor-pointer transition-all border-2",
                selectedCategory === cat.id 
                  ? "border-orange-500 shadow-md" 
                  : "border-transparent " + cat.bg
              )}
            >
              <cat.icon className={cn("w-6 h-6 mb-2", cat.color)} />
              <span className="font-bold text-sm block">{cat.name}</span>
            </motion.div>
          ))}
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-bold text-zinc-900">Featured Stories</h2>
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex gap-4 p-4 rounded-2xl bg-zinc-50 hover:bg-zinc-100 transition-colors group cursor-pointer">
              <div className="w-20 h-20 rounded-xl bg-zinc-200 overflow-hidden flex-shrink-0 animate-pulse" />
              <div className="flex flex-col justify-center gap-1">
                <div className="h-4 w-32 bg-zinc-300 rounded animate-pulse" />
                <div className="h-3 w-48 bg-zinc-200 rounded animate-pulse" />
                <div className="mt-1 flex items-center gap-1 text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                   Read More
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
