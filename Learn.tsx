import * as React from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { Input } from './ui/Input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/Tabs';
import { BookOpen, Search, Filter, Play, FileText, Brain, Gamepad2, Trophy, Star, Clock, ArrowRight, ChevronRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { ContentItem } from '../types';
import { cn } from '../lib/utils';

interface LearnProps {
  levelId: string;
  onContentClick: (content: ContentItem) => void;
}

export function Learn({ levelId, onContentClick }: LearnProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeTab, setActiveTab] = React.useState('all');

  const subjects = [
    { name: 'Mathematics', icon: Brain, color: 'bg-blue-500' },
    { name: 'Science', icon: Sparkles, color: 'bg-green-500' },
    { name: 'English', icon: BookOpen, color: 'bg-orange-500' },
    { name: 'History', icon: Clock, color: 'bg-purple-500' },
    { name: 'Coding', icon: Gamepad2, color: 'bg-indigo-500' },
  ];

  const contentItems: ContentItem[] = [
    {
      id: 'c1',
      levelId: 'L1',
      subject: 'English',
      topic: 'Rhymes',
      title: 'Twinkle Twinkle Little Star',
      contentType: 'video',
      videoUrl: 'https://www.youtube.com/watch?v=yCjJyiqpAuU',
      pointsReward: 15,
      isPremium: false,
      thumbnailUrl: 'https://img.youtube.com/vi/yCjJyiqpAuU/maxresdefault.jpg',
    },
    {
      id: 'c2',
      levelId: 'L3',
      subject: 'Coding',
      topic: 'Basics',
      title: 'Python for Beginners',
      contentType: 'video',
      videoUrl: 'https://www.youtube.com/watch?v=kqtD5dpn9C8',
      pointsReward: 25,
      isPremium: true,
      thumbnailUrl: 'https://img.youtube.com/vi/kqtD5dpn9C8/maxresdefault.jpg',
    },
    {
      id: 'c3',
      levelId: 'L5',
      subject: 'Science',
      topic: 'Biology',
      title: 'The Human Heart Explained',
      contentType: 'video',
      videoUrl: 'https://www.youtube.com/watch?v=7XaftdE_h60',
      pointsReward: 50,
      isPremium: false,
      thumbnailUrl: 'https://img.youtube.com/vi/7XaftdE_h60/maxresdefault.jpg',
    },
    {
      id: 'c4',
      levelId: 'L7',
      subject: 'Mathematics',
      topic: 'Calculus',
      title: 'Integration by Parts',
      contentType: 'video',
      videoUrl: 'https://www.youtube.com/watch?v=sS_Y7V2sZ0Y',
      pointsReward: 100,
      isPremium: true,
      thumbnailUrl: 'https://img.youtube.com/vi/sS_Y7V2sZ0Y/maxresdefault.jpg',
    },
    {
      id: 'c5',
      levelId: 'L1',
      subject: 'Mathematics',
      topic: 'Numbers',
      title: 'Counting to 100',
      contentType: 'video',
      videoUrl: 'https://www.youtube.com/watch?v=0TgLtF3PMOc',
      pointsReward: 20,
      isPremium: false,
      thumbnailUrl: 'https://img.youtube.com/vi/0TgLtF3PMOc/maxresdefault.jpg',
    },
  ];

  const filteredContent = contentItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || item.contentType === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Learning Library</h2>
          <p className="text-slate-500">Explore subjects and topics tailored for your level.</p>
        </div>
        <div className="flex w-full max-w-md items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search subjects, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
          <Button variant="outline" className="h-12 w-12 p-0">
            <Filter className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {subjects.map((subject) => (
          <button
            key={subject.name}
            className="group flex flex-col items-center gap-3 rounded-2xl bg-white p-6 shadow-sm border border-slate-100 transition-all hover:shadow-md hover:-translate-y-1 active:scale-95"
          >
            <div className={cn('flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg transition-transform group-hover:scale-110', subject.color)}>
              <subject.icon className="h-8 w-8" />
            </div>
            <span className="text-sm font-bold text-slate-700">{subject.name}</span>
          </button>
        ))}
      </div>

      {/* Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <TabsList className="bg-white border border-slate-100">
            <TabsTrigger value="all">All Content</TabsTrigger>
            <TabsTrigger value="video">Videos</TabsTrigger>
            <TabsTrigger value="quiz">Quizzes</TabsTrigger>
            <TabsTrigger value="game">Games</TabsTrigger>
            <TabsTrigger value="text">Notes</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
            <span>Sort by:</span>
            <select className="bg-transparent font-bold text-slate-900 outline-none">
              <option>Newest First</option>
              <option>Most Popular</option>
              <option>Points (High to Low)</option>
            </select>
          </div>
        </div>

        <TabsContent value={activeTab} className="mt-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredContent.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  onClick={() => onContentClick(item)}
                  className="group cursor-pointer overflow-hidden p-0 flex flex-col h-full"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={item.thumbnailUrl}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="absolute left-3 top-3 flex gap-2">
                      <Badge className="bg-white/90 text-slate-900 backdrop-blur-sm">
                        {item.contentType === 'video' && <Play className="mr-1.5 h-3 w-3 fill-current" />}
                        {item.contentType === 'quiz' && <Brain className="mr-1.5 h-3 w-3" />}
                        {item.contentType === 'game' && <Gamepad2 className="mr-1.5 h-3 w-3" />}
                        {item.contentType === 'text' && <FileText className="mr-1.5 h-3 w-3" />}
                        {item.contentType.toUpperCase()}
                      </Badge>
                      {item.isPremium && (
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 border-yellow-200">
                          PREMIUM
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-bold uppercase tracking-wider text-[#4A90E2]">
                        {item.subject}
                      </p>
                      <div className="flex items-center gap-1 text-xs font-bold text-[#7ED321]">
                        <Trophy className="h-3 w-3" />
                        +{item.pointsReward} XP
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 line-clamp-2 flex-1">{item.title}</h3>
                    <div className="mt-4 flex items-center justify-between border-t border-slate-50 pt-4">
                      <span className="text-xs font-medium text-slate-500">{item.topic}</span>
                      <Button size="sm" variant="ghost" className="h-8 w-8 rounded-full p-0 group-hover:bg-[#4A90E2] group-hover:text-white">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          {filteredContent.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <Search className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">No content found</h3>
              <p className="mt-2 text-slate-500">Try adjusting your search or filters.</p>
              <Button variant="outline" onClick={() => { setSearchQuery(''); setActiveTab('all'); }} className="mt-6">
                Clear all filters
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
