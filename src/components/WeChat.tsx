import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Paperclip, Smile, Plus } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { cn } from '@/src/lib/utils';
import Markdown from 'react-markdown';

interface Message {
  role: 'user' | 'model';
  content: string;
}

export const WeChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: '您好！我是您的AI助手，有什么我可以帮您的吗？' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      // Get config from localStorage or fallback to env
      const savedKey = localStorage.getItem('ai_key') || process.env.GEMINI_API_KEY;
      
      if (!savedKey) {
        throw new Error('Please set your API Key in Settings.');
      }

      const ai = new GoogleGenAI({ apiKey: savedKey });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userMsg,
      });

      const aiContent = response.text || "Sorry, I couldn't generate a response.";
      setMessages(prev => [...prev, { role: 'model', content: aiContent }]);
    } catch (error: any) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', content: `Error: ${error.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#EDEDED] relative">
      {/* Header */}
      <div className="h-12 flex items-center justify-center border-bottom border-zinc-200 bg-[#EDEDED] flex-shrink-0">
        <span className="font-bold text-sm">WeChat</span>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 pb-20"
      >
        {messages.map((msg, i) => (
          <div 
            key={i} 
            className={cn(
              "flex items-start gap-3",
              msg.role === 'user' ? "flex-row-reverse" : "flex-row"
            )}
          >
            <div className={cn(
              "w-10 h-10 rounded flex-shrink-0 flex items-center justify-center",
              msg.role === 'user' ? "bg-blue-500" : "bg-white"
            )}>
              {msg.role === 'user' ? <User className="w-6 h-6 text-white" /> : <Bot className="w-6 h-6 text-zinc-600" />}
            </div>
            <div className={cn(
              "max-w-[70%] p-3 rounded-lg text-sm shadow-sm",
              msg.role === 'user' ? "bg-[#95EC69] text-black" : "bg-white text-black"
            )}>
              <div className="markdown-body">
                <Markdown>{msg.content}</Markdown>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-zinc-400 text-xs">
            <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" />
            <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:0.2s]" />
            <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:0.4s]" />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 w-full bg-[#F7F7F7] border-t border-zinc-200 p-3 flex items-end gap-3">
        <div className="p-1 cursor-pointer">
          <Plus className="w-6 h-6 text-zinc-600" />
        </div>
        <textarea
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          className="flex-1 bg-white rounded-md border border-zinc-200 p-2 text-sm max-h-32 focus:outline-none resize-none"
          placeholder="Type a message..."
        />
        <div className="flex gap-2 mb-1">
           <Smile className="w-6 h-6 text-zinc-600 cursor-pointer" />
           <button 
             onClick={handleSend}
             disabled={isLoading}
             className={cn(
               "p-1.5 rounded transition-colors",
               input.trim() ? "bg-green-500 text-white" : "text-zinc-400"
             )}
           >
             <Send className="w-5 h-5" />
           </button>
        </div>
      </div>
    </div>
  );
};
