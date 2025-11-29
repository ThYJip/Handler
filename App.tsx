import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import CampfireSim from './components/CampfireSim';
import ConceptCard from './components/ConceptCard';
import AIChat from './components/AIChat';
import { CURRICULUM } from './constants';
import { Menu, X } from 'lucide-react';

const App: React.FC = () => {
    const [activeTaskId, setActiveTaskId] = useState(CURRICULUM[0].id);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const activeTask = CURRICULUM.find(t => t.id === activeTaskId) || CURRICULUM[0];

    return (
        <div className="flex h-screen w-full bg-camp-night text-camp-text font-sans overflow-hidden">
            
            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-black/80 z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
            )}

            {/* Sidebar (Responsive) */}
            <div className={`fixed md:relative z-50 h-full transition-transform duration-300 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                <Sidebar currentTaskId={activeTaskId} onSelectTask={(id) => { setActiveTaskId(id); setIsMobileMenuOpen(false); }} />
            </div>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                
                {/* Mobile Header */}
                <header className="md:hidden p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900">
                    <h1 className="text-xl font-hand text-camp-orange">Yuru Camp Handler</h1>
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white">
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </header>

                <div className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        {/* Center Stage (2 cols) */}
                        <div className="lg:col-span-2 space-y-8">
                            <ConceptCard task={activeTask} />
                            <CampfireSim activeTask={activeTask} />
                        </div>

                        {/* Right Panel (1 col) - AI Chat */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-8">
                                <AIChat contextTask={activeTask.title + " - " + activeTask.description} />
                                
                                <div className="mt-8 bg-slate-800/50 p-6 rounded-lg border border-slate-700/50 text-sm text-gray-400">
                                    <h4 className="font-bold text-gray-300 mb-2">Did you know?</h4>
                                    <p>
                                        In Android, the UI Thread is just a Thread with a Looper pre-prepared. 
                                        If you block the loop (burn a log that takes too long), the app freezes (ANR)!
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;