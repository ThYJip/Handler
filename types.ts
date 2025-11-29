export enum TaskStatus {
    LOCKED,
    ACTIVE,
    COMPLETED
}

export interface CurriculumTask {
    id: string;
    title: string;
    description: string;
    objectives: string[];
    conceptKey: 'architecture' | 'looper' | 'queue' | 'handler' | 'reuse';
}

export interface AndroidMessage {
    id: number;
    what: number; // Message ID in Android terms
    obj?: string; // Payload
    when: number; // Execution time
    target: string; // Handler name
    isRecycled: boolean; // For object pool visual
}

export interface AndroidLooper {
    active: boolean;
    threadName: string;
    isLooping: boolean;
}

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
    isError?: boolean;
}