import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AndroidMessage, AndroidLooper, CurriculumTask } from '../types';
import { Play, Pause, Flame, Plus, RefreshCw, Clock, Trash2, Box } from 'lucide-react';

interface CampfireSimProps {
    activeTask: CurriculumTask;
}

const CampfireSim: React.FC<CampfireSimProps> = ({ activeTask }) => {
    // Android System State
    const [looper, setLooper] = useState<AndroidLooper>({ active: false, threadName: 'MainThread', isLooping: false });
    const [queue, setQueue] = useState<AndroidMessage[]>([]);
    const [processingMsg, setProcessingMsg] = useState<AndroidMessage | null>(null);
    const [logs, setLogs] = useState<string[]>([]); // System logs console
    
    // Pool stats for Task 2.5.5
    const [poolSize, setPoolSize] = useState(5); 

    const msgIdCounter = useRef(0);

    // --- Actions ---

    const addLog = (text: string) => {
        setLogs(prev => [`[${new Date().toLocaleTimeString().split(' ')[0]}] ${text}`, ...prev].slice(0, 50));
    };

    const prepareLooper = () => {
        if (looper.active) {
            addLog("❌ Looper already prepared! ThreadLocal<Looper> already has a value.");
            return;
        }
        setLooper({ ...looper, active: true });
        addLog("✅ Looper.prepare() called. Rin-chan has set up the campsite.");
    };

    const startLoop = () => {
        if (!looper.active) {
            addLog("❌ Cannot loop! call prepare() first. (Throw RuntimeException)");
            return;
        }
        if (looper.isLooping) {
            addLog("⚠️ Looper is already looping.");
            return;
        }
        setLooper(prev => ({ ...prev, isLooping: true }));
        addLog("🔥 Looper.loop() called. The fire is burning, waiting for logs.");
    };

    const stopLoop = () => {
        setLooper(prev => ({ ...prev, isLooping: false }));
        addLog("🛑 Looper stopped.");
    };

    // Handler: Send Message
    const sendMessage = (delay: number = 0, isObtain: boolean = false) => {
        if (!looper.active) {
            addLog("⚠️ Handler warning: Looper not ready. Sending blindly.");
        }

        let newMsg: AndroidMessage;
        
        if (isObtain && poolSize > 0) {
            setPoolSize(p => p - 1);
            addLog("♻️ Message.obtain() called. Reusing object from pool.");
             newMsg = {
                id: msgIdCounter.current++,
                what: Math.floor(Math.random() * 100),
                when: Date.now() + delay,
                target: 'Handler',
                isRecycled: true
            };
        } else {
            if (isObtain) addLog("⚠️ Pool empty, creating new Message anyway.");
            else addLog("🪵 new Message() created. Fresh allocation.");
            
            newMsg = {
                id: msgIdCounter.current++,
                what: Math.floor(Math.random() * 100),
                when: Date.now() + delay,
                target: 'Handler',
                isRecycled: false
            };
        }

        // Add to Queue (Simulate MessageQueue.enqueueMessage sorting)
        setQueue(prev => {
            const nextQ = [...prev, newMsg].sort((a, b) => a.when - b.when);
            return nextQ;
        });
        addLog(`📨 sendMessage${delay > 0 ? 'Delayed' : ''} (what=${newMsg.what}, delay=${delay}ms)`);
    };

    // The Looper Engine
    useEffect(() => {
        if (!looper.isLooping) return;

        const interval = setInterval(() => {
            setQueue(currentQueue => {
                if (currentQueue.length === 0) return currentQueue;

                const now = Date.now();
                const nextMsg = currentQueue[0];

                if (now >= nextMsg.when) {
                    // Ready to process
                    setProcessingMsg(nextMsg);
                    addLog(`🔥 dispatchMessage(what=${nextMsg.what}). Processing...`);
                    
                    // Simulate processing time then recycle
                    setTimeout(() => {
                        setProcessingMsg(null);
                        // Task 2.5.5: Auto recycle if obtained? Simplified for visual
                        if (nextMsg.isRecycled || activeTask.conceptKey === 'reuse') {
                            setPoolSize(p => Math.min(p + 1, 10)); // Recycle back to pool
                            addLog(`♻️ msg ${nextMsg.what} recycled back to pool.`);
                        }
                    }, 800);

                    return currentQueue.slice(1); // Remove from head
                }
                return currentQueue; // Wait for timer
            });
        }, 500); // Check every 500ms

        return () => clearInterval(interval);
    }, [looper.isLooping, activeTask.conceptKey]);


    // --- Render ---

    return (
        <div className="flex flex-col gap-6">
            
            {/* STAGE */}
            <div className="relative h-96 w-full bg-gradient-to-b from-gray-900 via-slate-900 to-gray-800 rounded-xl overflow-hidden border-2 border-slate-700 shadow-2xl p-6">
                
                {/* Background Decorations */}
                <div className="absolute top-10 right-10 opacity-20 text-6xl animate-pulse">🌙</div>
                <div className="absolute bottom-20 left-10 opacity-10 text-8xl">🌲</div>
                <div className="absolute bottom-20 right-20 opacity-10 text-8xl">🌲</div>

                {/* Main Elements */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                    
                    {/* The Looper (Rin) */}
                    <div className={`transition-all duration-1000 ${looper.active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="flex flex-col items-center">
                            <div className="w-24 h-24 bg-blue-900 rounded-full border-4 border-camp-text flex items-center justify-center shadow-lg relative">
                                <span className="text-3xl">🏕️</span>
                                {looper.isLooping && (
                                    <div className="absolute -top-2 -right-2 bg-green-500 w-6 h-6 rounded-full animate-bounce border-2 border-white" title="Active"></div>
                                )}
                            </div>
                            <span className="mt-2 font-hand text-xl bg-slate-800 px-3 py-1 rounded-full text-blue-200">
                                Looper (Rin)
                            </span>
                        </div>
                    </div>

                    {/* The Fire (Processing) */}
                    <div className="mt-8 relative w-32 h-32 flex items-center justify-center">
                        {looper.isLooping ? (
                            <div className={`text-6xl transition-all duration-500 ${processingMsg ? 'scale-125 text-red-500' : 'scale-100 text-orange-400'}`}>
                                🔥
                            </div>
                        ) : (
                            <div className="text-4xl text-gray-600">🪨</div>
                        )}
                        {processingMsg && (
                            <div className="absolute -top-12 animate-float bg-camp-orange text-slate-900 px-3 py-1 rounded-lg font-bold text-sm">
                                what: {processingMsg.what}
                            </div>
                        )}
                    </div>

                    {/* The Queue (Logs) */}
                    <div className="absolute bottom-4 left-4 right-4 h-24 bg-black/30 rounded-lg p-2 flex items-center gap-2 overflow-x-auto border border-white/10">
                        <span className="text-xs text-gray-400 absolute top-1 left-2">MessageQueue</span>
                        {queue.length === 0 && <span className="text-gray-500 text-sm ml-4 italic">Empty... waiting for logs</span>}
                        {queue.map((msg, idx) => (
                            <div key={msg.id} className="min-w-[60px] h-[60px] bg-amber-800 rounded flex flex-col items-center justify-center border border-amber-600 relative shrink-0">
                                <span className="text-xl">🪵</span>
                                <span className="text-xs font-mono text-amber-200">{msg.what}</span>
                                {msg.when > Date.now() + 1000 && (
                                    <Clock size={12} className="absolute top-1 right-1 text-yellow-300" />
                                )}
                                {msg.isRecycled && (
                                    <RefreshCw size={12} className="absolute top-1 left-1 text-green-300" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Message Pool (Task 2.5.5) */}
                {activeTask.conceptKey === 'reuse' && (
                    <div className="absolute top-4 left-4 bg-slate-800/90 p-3 rounded-lg border border-slate-600">
                        <h4 className="text-xs text-gray-400 uppercase mb-1">Object Pool</h4>
                        <div className="flex gap-1 flex-wrap w-24">
                            {Array.from({length: poolSize}).map((_, i) => (
                                <div key={i} className="w-4 h-4 bg-green-800 rounded-full border border-green-500" title="Recycled Message"></div>
                            ))}
                        </div>
                        <div className="text-xs text-green-400 mt-1">{poolSize} available</div>
                    </div>
                )}
            </div>

            {/* CONTROLS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Looper Controls */}
                <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                    <h3 className="text-camp-orange font-hand text-lg mb-3 flex items-center"><Flame className="mr-2" size={18}/> Looper Controls</h3>
                    <div className="flex gap-2">
                        <button 
                            onClick={prepareLooper}
                            disabled={looper.active}
                            className={`flex-1 py-2 rounded font-bold text-sm transition ${looper.active ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}
                        >
                            Looper.prepare()
                        </button>
                        <button 
                            onClick={looper.isLooping ? stopLoop : startLoop}
                            disabled={!looper.active}
                            className={`flex-1 py-2 rounded font-bold text-sm flex items-center justify-center gap-2 transition ${!looper.active ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : looper.isLooping ? 'bg-red-600 hover:bg-red-500' : 'bg-green-600 hover:bg-green-500'} text-white`}
                        >
                            {looper.isLooping ? <><Pause size={16}/> Quit</> : <><Play size={16}/> Loop</>}
                        </button>
                    </div>
                </div>

                {/* Handler Controls */}
                <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                    <h3 className="text-camp-green font-hand text-lg mb-3 flex items-center"><Box className="mr-2" size={18}/> Handler Controls</h3>
                    <div className="grid grid-cols-2 gap-2">
                        <button 
                            onClick={() => sendMessage(0, activeTask.conceptKey === 'reuse')}
                            className="bg-amber-700 hover:bg-amber-600 text-amber-100 py-2 rounded text-sm font-bold flex items-center justify-center gap-1"
                        >
                            <Plus size={14}/> Send Message
                        </button>
                        <button 
                            onClick={() => sendMessage(3000, activeTask.conceptKey === 'reuse')}
                            className="bg-amber-800 hover:bg-amber-700 text-amber-200 py-2 rounded text-sm font-bold flex items-center justify-center gap-1"
                        >
                            <Clock size={14}/> Delay (3s)
                        </button>
                        {activeTask.conceptKey === 'reuse' && (
                             <button 
                                onClick={() => sendMessage(0, true)}
                                className="col-span-2 bg-green-700 hover:bg-green-600 text-green-100 py-2 rounded text-sm font-bold flex items-center justify-center gap-1"
                            >
                                <RefreshCw size={14}/> obtain() & Send
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* LOGS */}
            <div className="bg-black/50 p-4 rounded-lg font-mono text-xs h-40 overflow-y-auto border border-gray-800">
                {logs.length === 0 && <div className="text-gray-600">System logs will appear here...</div>}
                {logs.map((log, i) => (
                    <div key={i} className={`mb-1 ${log.includes('❌') ? 'text-red-400' : log.includes('🔥') ? 'text-orange-300' : 'text-gray-300'}`}>
                        {log}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CampfireSim;