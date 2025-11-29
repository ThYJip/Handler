import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { ChatMessage } from '../types';
import { askCampGuide } from '../services/geminiService';

interface AIChatProps {
    contextTask: string;
}

const AIChat: React.FC<AIChatProps> = ({ contextTask }) => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<ChatMessage[]>([
        { role: 'model', text: 'Hi! I can explain these Android concepts in camping terms. Ask me anything!' }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setIsLoading(true);

        const response = await askCampGuide(userMsg, `Current learning task: ${contextTask}`);
        
        setMessages(prev => [...prev, { role: 'model', text: response }]);
        setIsLoading(false);
    };

    return (
        <div className="bg-slate-800 rounded-lg border border-slate-700 flex flex-col h-[400px]">
            <div className="p-3 bg-slate-900 border-b border-slate-700 flex items-center gap-2">
                <Sparkles size={16} className="text-camp-orange" />
                <span className="font-hand text-camp-orange font-bold">Ask Camp Guide Rin</span>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3" ref={scrollRef}>
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] px-4 py-2 rounded-lg text-sm ${
                            msg.role === 'user' 
                                ? 'bg-blue-600 text-white rounded-br-none' 
                                : 'bg-slate-700 text-gray-200 rounded-bl-none'
                        }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-slate-700 px-4 py-2 rounded-lg rounded-bl-none text-sm text-gray-400 italic">
                            Thinking... 🏕️
                        </div>
                    </div>
                )}
            </div>

            <div className="p-3 border-t border-slate-700 flex gap-2">
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask about Looper or Handler..."
                    className="flex-1 bg-slate-900 border border-slate-600 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-camp-orange"
                />
                <button 
                    onClick={handleSend}
                    disabled={isLoading}
                    className="bg-camp-orange hover:bg-orange-600 text-white p-2 rounded transition-colors disabled:opacity-50"
                >
                    <Send size={18} />
                </button>
            </div>
        </div>
    );
};

export default AIChat;