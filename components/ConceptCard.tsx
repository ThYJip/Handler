import React from 'react';
import { CurriculumTask } from '../types';
import { INITIAL_HINTS } from '../constants';

interface ConceptCardProps {
    task: CurriculumTask;
}

const ConceptCard: React.FC<ConceptCardProps> = ({ task }) => {
    return (
        <div className="bg-slate-800/80 border-l-4 border-camp-orange p-6 rounded-r-lg shadow-lg backdrop-blur-sm mb-6">
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-2xl font-hand text-camp-orange mb-2">{task.title}</h2>
                    <p className="text-gray-300 font-sans text-sm md:text-base mb-4">{task.description}</p>
                    
                    <div className="bg-slate-900/50 p-4 rounded-lg">
                        <h3 className="text-camp-green font-bold text-xs uppercase tracking-wider mb-2">Camp Guide's Note:</h3>
                        <p className="text-gray-400 italic font-hand text-lg">
                            "{INITIAL_HINTS[task.conceptKey]}"
                        </p>
                    </div>
                </div>
            </div>
            
            <div className="mt-4">
                 <h4 className="text-sm font-semibold text-gray-400 mb-2">Checklist:</h4>
                 <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                     {task.objectives.map((obj, idx) => (
                         <li key={idx} className="flex items-center">
                             <span className="w-1.5 h-1.5 bg-camp-orange rounded-full mr-2"></span>
                             {obj}
                         </li>
                     ))}
                 </ul>
            </div>
        </div>
    );
};

export default ConceptCard;