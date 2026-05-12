/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  Book, 
  Settings as SettingsIcon, 
  Camera,
  Search,
  Mic,
  Calendar,
  Clock,
  Cloud,
  Mail,
  Camera as CameraIcon,
  Music,
  Compass,
  Phone,
  LayoutGrid
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

import { WeChat } from './components/WeChat';
import { WorldBook } from './components/WorldBook';
import { Settings } from './components/Settings';
import { TopWidget } from './components/TopWidget';

// --- Components ---

const DynamicIsland = ({ activeApp }: { activeApp: string | null }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="absolute top-3 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        layout
        initial={{ width: 120, height: 35, borderRadius: 20 }}
        animate={{ 
          width: expanded ? 320 : (activeApp ? 180 : 120), 
          height: expanded ? 80 : 35,
          borderRadius: 25
        }}
        onClick={() => setExpanded(!expanded)}
        className="bg-black/90 backdrop-blur-md flex items-center justify-center cursor-pointer overflow-hidden border border-white/10"
      >
        <div className="flex items-center gap-3 px-4 w-full justify-between">
          {!expanded && activeApp && (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] text-white font-medium uppercase">{activeApp}</span>
            </div>
          )}
          {!expanded && !activeApp && (
            <div className="w-full flex justify-center">
               <div className="w-16 h-4 rounded-full bg-black" />
            </div>
          )}
          {expanded && (
            <div className="flex items-center gap-4 w-full px-2">
               <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                  <Music className="w-6 h-6 text-white" />
               </div>
               <div className="flex flex-col">
                  <span className="text-white text-xs font-bold">Now Playing</span>
                  <span className="text-white/60 text-[10px]">AI Studio Beats</span>
               </div>
               <div className="ml-auto flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white" />
                  </div>
               </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const AppIcon = ({ 
  icon: Icon, 
  name, 
  color, 
  onClick 
}: { 
  icon: any, 
  name: string, 
  color: string,
  onClick: () => void 
}) => (
  <motion.div 
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
    className="flex flex-col items-center gap-1.5 cursor-pointer"
  >
    <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg", color)}>
      <Icon className="w-10 h-10 text-white" />
    </div>
    <span className="text-[11px] text-black/80 font-medium px-1 truncate w-16 text-center">{name}</span>
  </motion.div>
);

const HomeScreen = ({ openApp }: { openApp: (app: string) => void }) => {
  return (
    <div className="h-full flex flex-col pt-12 overflow-y-auto no-scrollbar pb-32">
      <TopWidget />
      
      <div className="grid grid-cols-4 gap-y-8 gap-x-4 p-8 pt-4">
        <AppIcon 
          icon={MessageSquare} 
          name="WeChat" 
          color="bg-[#07C160]" 
          onClick={() => openApp('wechat')} 
        />
        <AppIcon 
          icon={Book} 
          name="世界书" 
          color="bg-orange-500" 
          onClick={() => openApp('worldbook')} 
        />
        <AppIcon 
          icon={SettingsIcon} 
          name="设置" 
          color="bg-gray-500" 
          onClick={() => openApp('settings')} 
        />
        <AppIcon icon={Mail} name="Mail" color="bg-blue-500" onClick={() => {}} />
        <AppIcon icon={Calendar} name="Calendar" color="bg-white !text-red-500" onClick={() => {}} />
        <AppIcon icon={CameraIcon} name="Camera" color="bg-zinc-600" onClick={() => {}} />
        <AppIcon icon={Compass} name="Safari" color="bg-white text-blue-600" onClick={() => {}} />
        <AppIcon icon={Music} name="Music" color="bg-gradient-to-tr from-pink-500 to-rose-400" onClick={() => {}} />
        <AppIcon icon={Phone} name="Phone" color="bg-green-500" onClick={() => {}} />
        <AppIcon icon={Cloud} name="Weather" color="bg-sky-400" onClick={() => {}} />
        <AppIcon icon={Clock} name="Clock" color="bg-zinc-800" onClick={() => {}} />
        <AppIcon icon={LayoutGrid} name="Files" color="bg-white text-blue-500 border border-zinc-200" onClick={() => {}} />
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activeApp, setActiveApp] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const closeApp = () => setActiveApp(null);

  // Background style
  const bgStyle = {
    background: 'linear-gradient(to bottom, #FFFFFF, #E7E7E7, #D1D1D1)'
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-4">
      {/* iPhone 17 Pro Mock Profile (no borders as requested, just the screen with radius) */}
      <div 
        className="relative bg-white w-full max-w-[400px] h-[866px] rounded-none overflow-hidden shadow-2xl flex flex-col"
        style={bgStyle}
      >
        <DynamicIsland activeApp={activeApp} />

        <main className="flex-1 relative">
          <AnimatePresence mode="wait">
            {!activeApp ? (
              <motion.div
                key="home"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="h-full"
              >
                {/* Horizontal Paging Placeholder */}
                <motion.div 
                  className="flex h-full w-[200%]"
                  drag="x"
                  dragConstraints={{ left: -400, right: 0 }}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -100) setCurrentPage(1);
                    if (info.offset.x > 100) setCurrentPage(0);
                  }}
                  animate={{ x: currentPage === 0 ? 0 : -400 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                >
                  <div className="w-[400px]">
                    <HomeScreen openApp={setActiveApp} />
                  </div>
                  <div className="w-[400px] p-8 flex flex-col gap-6">
                    <div className="w-full h-40 bg-white/40 backdrop-blur-lg rounded-3xl p-6 shadow-sm flex flex-col justify-between border border-white/50">
                      <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Productivity</span>
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm" />
                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm" />
                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm" />
                      </div>
                    </div>
                    <div className="w-full h-64 bg-white/40 backdrop-blur-lg rounded-3xl p-6 shadow-sm border border-white/50">
                      <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">News</span>
                      <div className="mt-4 space-y-3">
                         <div className="h-3 w-3/4 bg-black/5 rounded" />
                         <div className="h-3 w-1/2 bg-black/5 rounded" />
                         <div className="h-3 w-2/3 bg-black/5 rounded" />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Page Dots */}
                <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex gap-2">
                  <div className={cn("w-2 h-2 rounded-full transition-all", currentPage === 0 ? "bg-black" : "bg-black/20")} />
                  <div className={cn("w-2 h-2 rounded-full transition-all", currentPage === 1 ? "bg-black" : "bg-black/20")} />
                </div>

                {/* Dock */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] h-24 bg-white/40 backdrop-blur-xl rounded-[35px] border border-white/50 shadow-lg p-4 flex justify-between items-center px-6">
                  <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center shadow-sm cursor-pointer">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm cursor-pointer text-blue-500">
                    <Compass className="w-8 h-8" />
                  </div>
                   <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center shadow-sm cursor-pointer">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                   <div className="w-14 h-14 bg-gradient-to-tr from-pink-500 to-rose-400 rounded-2xl flex items-center justify-center shadow-sm cursor-pointer">
                    <Music className="w-8 h-8 text-white" />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="app"
                initial={{ y: 866 }}
                animate={{ y: 0 }}
                exit={{ y: 866 }}
                transition={{ type: 'spring', damping: 32, stiffness: 300, mass: 0.8 }}
                className="absolute inset-0 bg-white z-30"
              >
                {activeApp === 'wechat' && <WeChat />}
                {activeApp === 'worldbook' && <WorldBook />}
                {activeApp === 'settings' && <Settings />}
                
                {/* Close Gesture Bar */}
                <div 
                   onClick={closeApp}
                   className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-black/10 rounded-full cursor-pointer hover:bg-black/20 transition-colors z-50 mix-blend-difference" 
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
