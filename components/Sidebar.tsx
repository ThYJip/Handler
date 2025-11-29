import React from 'react';
import { CURRICULUM } from '../constants';
import { CheckCircle, Circle, Map } from 'lucide-react';

interface SidebarProps {
    currentTaskId: string;
    onSelectTask: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentTaskId, onSelectTask }) => {
    return (
        <div className="w-full md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-full">
            <div className="p-6 border-b border-slate-800">
                <h1 className="text-2xl font-hand font-bold text-camp-text flex items-center gap-2">
                    <Map className="text-camp-green" />
                    Camp Map
                </h1>
                <p className="text-xs text-gray-500 mt-1">Phase 27: Handler Basics</p>
            </div>
            
            <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                {CURRICULUM.map((task) => {
                    const isActive = task.id === currentTaskId;
                    return (
                        <button
                            key={task.id}
                            onClick={() => onSelectTask(task.id)}
                            className={`w-full text-left p-3 rounded-lg text-sm transition-all duration-200 flex items-start gap-3 ${
                                isActive 
                                    ? 'bg-slate-800 text-camp-orange border-l-2 border-camp-orange shadow-md' 
                                    : 'text-gray-400 hover:bg-slate-800/50 hover:text-gray-200'
                            }`}
                        >
                            {isActive ? <CheckCircle size={16} className="mt-0.5 shrink-0"/> : <Circle size={16} className="mt-0.5 shrink-0"/>}
                            <div>
                                <span className="font-bold block">{task.id}</span>
                                <span className="text-xs opacity-90">{task.title.split(': ')[1]}</span>
                            </div>
                        </button>
                    );
                })}
            </nav>
            
            <div className="p-4 border-t border-slate-800 text-xs text-gray-600 text-center">
                 Yuru Camp Learning <br/> 
                 © 2023 Android Internals
            </div>
        </div>
    );
};

export default Sidebar;