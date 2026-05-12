import React, { useState, useEffect } from 'react';
import { Camera, MapPin, AtSign, Quote, User as UserIcon } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const TopWidget = () => {
  const [data, setData] = useState({
    bgImage: 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1000&auto=format&fit=crop',
    avatar: '',
    name: 'AI Studio User',
    handle: 'aistudio_dev',
    quote: '你说陪我到某年某月某天',
    ip: 'IP: 浙江'
  });

  const [isEditing, setIsEditing] = useState<string | null>(null);

  const bgInputRef = React.useRef<HTMLInputElement>(null);
  const avatarInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('top_widget_data');
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved widget data', e);
      }
    }
  }, []);

  const [handleWidth, setHandleWidth] = useState(0);
  const [nameWidth, setNameWidth] = useState(0);
  const [ipWidth, setIpWidth] = useState(0);
  const handleSpanRef = React.useRef<HTMLSpanElement>(null);
  const nameSpanRef = React.useRef<HTMLSpanElement>(null);
  const ipSpanRef = React.useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (handleSpanRef.current) {
      setHandleWidth(handleSpanRef.current.offsetWidth + 4);
    }
  }, [data.handle]);

  useEffect(() => {
    if (nameSpanRef.current) {
      setNameWidth(nameSpanRef.current.offsetWidth + 12);
    }
  }, [data.name]);

  useEffect(() => {
    if (ipSpanRef.current) {
      setIpWidth(ipSpanRef.current.offsetWidth + 8);
    }
  }, [data.ip]);

  const updateField = (field: keyof typeof data, value: string) => {
    const newData = { ...data, [field]: value };
    setData(newData);
    localStorage.setItem('top_widget_data', JSON.stringify(newData));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'bgImage' | 'avatar') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      updateField(field, base64String);
    };
    reader.readAsDataURL(file);
  };

  const EditableText = ({ 
    field, 
    value, 
    className, 
    placeholder 
  }: { 
    field: keyof typeof data, 
    value: string, 
    className?: string,
    placeholder?: string
  }) => (
    <input
      type="text"
      value={value}
      onChange={(e) => updateField(field, e.target.value)}
      onPointerDown={(e) => e.stopPropagation()}
      className={cn(
        "bg-transparent border-none outline-none focus:ring-1 focus:ring-white/30 rounded transition-all text-center placeholder:text-white/40",
        className
      )}
      placeholder={placeholder}
    />
  );

  return (
    <div className="w-full px-4 pt-8 pb-4">
      {/* Hidden File Inputs */}
      <input 
        type="file" 
        ref={bgInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={(e) => handleFileChange(e, 'bgImage')} 
      />
      <input 
        type="file" 
        ref={avatarInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={(e) => handleFileChange(e, 'avatar')} 
      />

      <div className="relative w-full bg-white/40 backdrop-blur-md rounded-[32px] overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] border border-white/60 flex flex-col items-center">
        {/* Background Image Container */}
        <div 
          onClick={(e) => {
            e.stopPropagation();
            bgInputRef.current?.click();
          }}
          onPointerDown={(e) => e.stopPropagation()}
          className="relative w-full h-64 overflow-hidden group cursor-pointer shadow-[inset_0_-60px_80px_-30px_rgba(0,0,0,0.4)]"
        >
          <img 
            src={data.bgImage} 
            alt="header" 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
          <div className="absolute inset-0 bg-black/5 transition-opacity group-hover:opacity-100 opacity-0 flex items-center justify-center">
             <div className="bg-black/40 backdrop-blur-md p-4 rounded-full text-white scale-90 group-hover:scale-100 transition-all">
                <Camera className="w-7 h-7" />
             </div>
          </div>
        </div>

        {/* Avatar */}
        <div 
          className="relative -mt-12 group cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            avatarInputRef.current?.click();
          }}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-zinc-100 shadow-lg flex items-center justify-center">
            {data.avatar ? (
              <img src={data.avatar} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              <UserIcon className="w-12 h-12 text-zinc-300" />
            )}
          </div>
          <div className="absolute bottom-0 right-0 p-1.5 bg-black/60 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
            <Camera className="w-4 h-4" />
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col items-center gap-1 mt-1 px-6 pb-6 w-full">
           <div className="relative flex justify-center w-full">
             {/* Invisible span for name width measurement */}
             <span 
               ref={nameSpanRef} 
               className="absolute invisible whitespace-pre text-xl font-bold font-sans"
             >
               {data.name || 'Name'}
             </span>
             <input
               type="text"
               value={data.name}
               onChange={(e) => updateField('name', e.target.value)}
               onFocus={(e) => e.target.select()}
               onPointerDown={(e) => e.stopPropagation()}
               style={{ width: nameWidth ? `${nameWidth}px` : 'auto' }}
               className="bg-transparent border-none outline-none focus:ring-1 focus:ring-black/5 rounded transition-all text-center placeholder:text-zinc-300 text-xl font-bold text-zinc-900 px-1"
               placeholder="Name"
             />
           </div>
           
           <div className="flex items-center gap-0.5 justify-center relative">
             {/* Invisible span for width measurement */}
             <span 
               ref={handleSpanRef} 
               className="absolute invisible whitespace-pre text-sm font-sans"
             >
               {data.handle || 'id'}
             </span>

             <AtSign className="w-3.5 h-3.5 text-zinc-400 translate-y-[0.5px]" />
             <input
               type="text"
               value={data.handle}
               onChange={(e) => updateField('handle', e.target.value)}
               onFocus={(e) => e.target.select()}
               onPointerDown={(e) => e.stopPropagation()}
               style={{ width: handleWidth ? `${handleWidth}px` : 'auto' }}
               className="bg-transparent border-none outline-none focus:ring-1 focus:ring-black/5 rounded transition-all text-left placeholder:text-white/40 text-sm text-zinc-500 px-0"
               placeholder="id"
             />
           </div>

           <div className="mt-1 flex items-center justify-center gap-2 w-full px-2">
             <Quote className="w-3 h-3 text-zinc-300 flex-shrink-0" />
             <EditableText 
               field="quote" 
               value={data.quote} 
               className="text-[11px] text-zinc-400 font-light tracking-tight w-full"
               placeholder="Say something..."
             />
           </div>

           <div className="mt-2 flex items-center gap-1 px-3 py-1 bg-black/5 rounded-full relative">
             {/* Invisible span for IP width measurement */}
             <span 
               ref={ipSpanRef} 
               className="absolute invisible whitespace-pre text-[10px] font-bold uppercase tracking-widest font-sans"
             >
               {data.ip || 'IP: Location'}
             </span>
             
             <MapPin className="w-3 h-3 text-zinc-400" />
             <input
               type="text"
               value={data.ip}
               onChange={(e) => updateField('ip', e.target.value)}
               onFocus={(e) => e.target.select()}
               onPointerDown={(e) => e.stopPropagation()}
               style={{ width: ipWidth ? `${ipWidth}px` : 'auto' }}
               className="bg-transparent border-none outline-none focus:ring-1 focus:ring-black/10 rounded transition-all text-left placeholder:text-zinc-300 text-[10px] text-zinc-400 font-bold uppercase tracking-widest px-0"
               placeholder="IP: Location"
             />
           </div>
        </div>
      </div>
    </div>
  );
};
