import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Shield, Globe, Key, Save, AlertCircle } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const Settings = () => {
  const [url, setUrl] = useState('');
  const [key, setKey] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedUrl = localStorage.getItem('ai_url') || '';
    const savedKey = localStorage.getItem('ai_key') || '';
    setUrl(savedUrl);
    setKey(savedKey);
  }, []);

  const handleSave = () => {
    localStorage.setItem('ai_url', url);
    localStorage.setItem('ai_key', key);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-zinc-50">
      <div className="p-8 pt-12 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Settings</h1>
          <p className="text-zinc-500 text-sm">Configure your AI experience</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-200 space-y-6">
          <div className="flex items-center gap-4 text-zinc-900 font-bold mb-2">
            <Shield className="w-5 h-5 text-blue-500" />
            <span>AI Configuration</span>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider ml-1">
                Base URL
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input 
                  type="text" 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://api.example.com/v1"
                  className="w-full bg-zinc-50 rounded-xl py-3 pl-10 pr-4 text-sm border-2 border-transparent focus:border-blue-500 focus:outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider ml-1">
                API Key
              </label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input 
                  type="password" 
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  placeholder="Enter your API Key..."
                  className="w-full bg-zinc-50 rounded-xl py-3 pl-10 pr-4 text-sm border-2 border-transparent focus:border-blue-500 focus:outline-none transition-all"
                />
              </div>
              <p className="text-[10px] text-zinc-400 mt-1 flex items-start gap-1">
                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                Your key is stored locally in your browser and never sent anywhere else.
              </p>
            </div>
          </div>

          <button 
            onClick={handleSave}
            className={cn(
              "w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg",
              isSaved ? "bg-green-500 text-white shadow-green-200" : "bg-blue-600 text-white shadow-blue-200"
            )}
          >
            {isSaved ? "Saved Successfully!" : <><Save className="w-5 h-5" /> Save Changes</>}
          </button>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-200">
          <div className="flex items-center justify-between py-2 cursor-not-allowed opacity-50">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                  <span className="text-purple-600 font-bold">P</span>
                </div>
                <span className="font-bold text-sm">Pro Mode</span>
             </div>
             <div className="w-10 h-5 bg-zinc-200 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
