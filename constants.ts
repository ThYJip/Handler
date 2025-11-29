import { CurriculumTask } from './types';

export const CURRICULUM: CurriculumTask[] = [
    {
        id: '2.5.1',
        title: 'Task 2.5.1: 消息循环架构 (Architecture)',
        description: '理解Handler/Looper/MessageQueue三者关系。生产者-消费者模式。',
        objectives: ['观察三者协作架构图', '理解生产者(Handler)与消费者(Looper)'],
        conceptKey: 'architecture'
    },
    {
        id: '2.5.2',
        title: 'Task 2.5.2: Looper的prepare和loop',
        description: '理解Looper的创建和启动。ThreadLocal保证线程单例。',
        objectives: ['调用 prepare() 初始化', '调用 loop() 开始循环'],
        conceptKey: 'looper'
    },
    {
        id: '2.5.3',
        title: 'Task 2.5.3: MessageQueue的数据结构',
        description: '理解消息队列的内部实现（按时间排序的链表）。',
        objectives: ['查看优先队列结构', '理解延时消息原理'],
        conceptKey: 'queue'
    },
    {
        id: '2.5.4',
        title: 'Task 2.5.4: Handler的发送和处理',
        description: '理解Handler如何关联目标Looper。',
        objectives: ['发送普通消息', '发送延时消息', '理解 dispatchMessage'],
        conceptKey: 'handler'
    },
    {
        id: '2.5.5',
        title: 'Task 2.5.5: Message对象复用',
        description: '理解Message的对象池机制(obtain vs new)。',
        objectives: ['对比 new Message()', '使用 Message.obtain()', '观察 recycle()'],
        conceptKey: 'reuse'
    }
];

export const INITIAL_HINTS = {
    architecture: "Think of the Campfire as the MessageQueue. Rin-chan is the Looper who tends the fire. Nadeshiko is the Handler bringing firewood (Messages).",
    looper: "A campsite (Thread) can only have one Head Camper (Looper). They must prepare the site before they can start the loop of tending the fire.",
    queue: "Firewood isn't just thrown in! It's organized by when it needs to be burnt. The pile is a Linked List sorted by time.",
    handler: "Handlers are like different campers who all put wood onto the SAME fire. They need to know which fire (Looper) they are assigned to.",
    reuse: "Don't chop a new tree every time! Reuse the unburnt wood or baskets (Message Objects) to save the forest (Memory)."
};