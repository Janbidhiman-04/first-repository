import * as React from 'react';
import { Sparkles, Send, Bot, User, Brain, Heart, Calendar, Search, Youtube, FileText, ArrowLeft, Smile, Frown, Meh, SmilePlus, Angry } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';
import { aiService } from '../services/aiService';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Avatar } from './ui/Avatar';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AITutorProps {
  onSendMessage: (message: string) => Promise<string>;
  userLevel: string;
}

type TutorMode = 'tutor' | 'psychologist' | 'youtube' | 'timetable';

export function AITutor({ onSendMessage, userLevel }: AITutorProps) {
  const navigate = useNavigate();
  const [mode, setMode] = React.useState<TutorMode>('tutor');
  const [mood, setMood] = React.useState<number>(5);
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hello! I'm your AI Tutor for **${userLevel}**. How can I help you today?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      let response = '';
      if (mode === 'tutor') {
        response = await onSendMessage(input);
      } else if (mode === 'psychologist') {
        response = await aiService.generatePsychologistResponse(mood, input);
      } else if (mode === 'youtube') {
        response = await aiService.summarizeYoutubeVideo(input);
      } else if (mode === 'timetable') {
        // Simplified: assuming input is subjects for now
        response = await aiService.generateTimetable('Next Month', 4, input.split(','));
      }
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Failed to get AI response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = (newMode: TutorMode) => {
    setMode(newMode);
    let initialMessage = '';
    if (newMode === 'tutor') {
      initialMessage = `Back to tutoring! What's our next topic for **${userLevel}**?`;
    } else if (newMode === 'psychologist') {
      initialMessage = "I'm here as your AI Psychologist. How are you feeling today? Please select your mood below and tell me what's on your mind.";
    } else if (newMode === 'youtube') {
      initialMessage = "Paste a YouTube link here, and I'll summarize it and create a quiz for you!";
    } else if (newMode === 'timetable') {
      initialMessage = "Tell me your subjects (separated by commas), and I'll generate a study timetable for you!";
    }

    setMessages([
      {
        id: Date.now().toString(),
        role: 'assistant',
        content: initialMessage,
        timestamp: new Date(),
      },
    ]);
  };

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const quickActions = [
    { name: 'Timetable', icon: Calendar, color: 'bg-blue-500', mode: 'timetable' as TutorMode },
    { name: 'YouTube', icon: Youtube, color: 'bg-red-500', mode: 'youtube' as TutorMode },
    { name: 'Search', icon: Search, color: 'bg-green-500', action: () => navigate('/learn') },
    { name: 'Psychologist', icon: Heart, color: 'bg-pink-500', mode: 'psychologist' as TutorMode },
    { name: 'Tutor', icon: Bot, color: 'bg-indigo-500', mode: 'tutor' as TutorMode },
  ];

  const moodIcons = [
    { val: 1, icon: Angry, color: 'text-red-500' },
    { val: 3, icon: Frown, color: 'text-orange-500' },
    { val: 5, icon: Meh, color: 'text-yellow-500' },
    { val: 7, icon: Smile, color: 'text-green-500' },
    { val: 10, icon: SmilePlus, color: 'text-emerald-500' },
  ];

  return (
    <div className="flex h-[calc(100vh-120px)] flex-col gap-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {quickActions.map((action) => (
          <button
            key={action.name}
            onClick={() => action.action ? action.action() : switchMode(action.mode!)}
            className={cn(
              "flex flex-col items-center gap-2 rounded-2xl bg-white p-4 shadow-sm border transition-all hover:shadow-md hover:-translate-y-1 active:scale-95",
              mode === action.mode ? "border-[#4A90E2] ring-2 ring-[#4A90E2]/10" : "border-slate-100"
            )}
          >
            <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl text-white', action.color)}>
              <action.icon className="h-6 w-6" />
            </div>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">{action.name}</span>
          </button>
        ))}
      </div>

      <Card className="flex flex-1 flex-col overflow-hidden p-0 shadow-2xl shadow-slate-200/50">
        <div className="flex items-center justify-between border-b border-slate-100 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl text-white",
              mode === 'psychologist' ? 'bg-pink-500' : 'bg-indigo-500'
            )}>
              {mode === 'psychologist' ? <Heart className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {mode === 'psychologist' ? 'AI Psychologist' : 'Eduana AI Tutor'}
              </h3>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Online</span>
              </div>
            </div>
          </div>
          {mode !== 'tutor' && (
            <Button variant="ghost" size="sm" onClick={() => switchMode('tutor')} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Tutor
            </Button>
          )}
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto bg-slate-50/50 p-6 space-y-6">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={cn(
                'flex gap-3 max-w-[85%]',
                msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
              )}
            >
              <Avatar
                className={cn(
                  'h-8 w-8 mt-1',
                  msg.role === 'assistant' 
                    ? (mode === 'psychologist' ? 'bg-pink-500 text-white' : 'bg-indigo-500 text-white') 
                    : 'bg-[#4A90E2] text-white'
                )}
                fallback={msg.role === 'assistant' ? 'AI' : 'ME'}
              />
              <div
                className={cn(
                  'rounded-2xl px-4 py-3 text-sm shadow-sm',
                  msg.role === 'user'
                    ? 'bg-[#4A90E2] text-white rounded-tr-none'
                    : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
                )}
              >
                <div className="prose prose-sm max-w-none prose-slate prose-invert">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
                <p className={cn(
                  'mt-2 text-[10px] font-medium uppercase tracking-widest',
                  msg.role === 'user' ? 'text-blue-100' : 'text-slate-400'
                )}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <div className="flex gap-3 max-w-[85%] mr-auto">
              <Avatar className={cn("h-8 w-8 text-white", mode === 'psychologist' ? 'bg-pink-500' : 'bg-indigo-500')} fallback="AI" />
              <div className="bg-white rounded-2xl rounded-tl-none border border-slate-100 px-4 py-3 flex items-center gap-1">
                <div className="h-1.5 w-1.5 rounded-full bg-slate-300 animate-bounce" />
                <div className="h-1.5 w-1.5 rounded-full bg-slate-300 animate-bounce [animation-delay:0.2s]" />
                <div className="h-1.5 w-1.5 rounded-full bg-slate-300 animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
        </div>

        {mode === 'psychologist' && messages.length < 3 && (
          <div className="bg-pink-50/50 p-4 border-t border-pink-100">
            <p className="text-xs font-bold text-pink-600 uppercase tracking-wider mb-3 text-center">How stressed do you feel? (1-10)</p>
            <div className="flex justify-center gap-4">
              {moodIcons.map((m) => (
                <button
                  key={m.val}
                  onClick={() => setMood(m.val)}
                  className={cn(
                    "flex flex-col items-center gap-1 p-2 rounded-xl transition-all",
                    mood === m.val ? "bg-white shadow-md scale-110" : "opacity-50 hover:opacity-100"
                  )}
                >
                  <m.icon className={cn("h-8 w-8", m.color)} />
                  <span className="text-[10px] font-bold text-slate-500">{m.val}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="border-t border-slate-100 bg-white p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-3"
          >
            <Input
              placeholder={
                mode === 'youtube' ? 'Paste YouTube URL here...' :
                mode === 'psychologist' ? 'Tell me how you feel...' :
                mode === 'timetable' ? 'Enter subjects (Math, Science...)' :
                'Ask anything...'
              }
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 h-12"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              className={cn(
                "h-12 w-12 rounded-xl p-0",
                mode === 'psychologist' ? 'bg-pink-500 hover:bg-pink-600' : ''
              )}
            >
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
