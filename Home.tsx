import * as React from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { Progress } from './ui/Progress';
import { Avatar } from './ui/Avatar';
import { Sparkles, Trophy, BookOpen, Gamepad2, TrendingUp, Star, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { UserProfile, ContentItem } from '../types';
import { LEVELS } from '../constants';
import { cn } from '../lib/utils';

interface HomeProps {
  user: UserProfile;
  featuredContent: ContentItem[];
  onContentClick: (content: ContentItem) => void;
}

export function Home({ user, featuredContent, onContentClick }: HomeProps) {
  const currentLevel = LEVELS.find(l => l.id === user.selectedLevel);

  return (
    <div className="space-y-8">
      {/* Welcome Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#4A90E2] to-[#357ABD] p-8 text-white shadow-2xl shadow-[#4A90E2]/20">
        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold md:text-4xl">Hello, {user.displayName}! 👋</h1>
            <p className="text-lg text-blue-100">Ready to level up your knowledge today?</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Badge variant="accent" className="bg-white/20 text-white border-white/30">
                <Trophy className="mr-1.5 h-4 w-4" />
                {user.totalPoints} Points
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Star className="mr-1.5 h-4 w-4" />
                {currentLevel?.name}
              </Badge>
            </div>
          </div>
          <div className="flex -space-x-4">
            {[1, 2, 3].map((i) => (
              <Avatar
                key={i}
                src={`https://picsum.photos/seed/user${i}/100/100`}
                className="h-16 w-16 border-4 border-white/20"
              />
            ))}
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white/20 bg-white/10 text-sm font-bold backdrop-blur-sm">
              +12k
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
      </section>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content Area */}
        <div className="space-y-8 lg:col-span-2">
          {/* Daily Progress */}
          <Card className="p-6">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7ED321]/10 text-[#7ED321]">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Daily Progress</h2>
              </div>
              <span className="text-sm font-bold text-[#4A90E2]">75% Complete</span>
            </div>
            <Progress value={75} variant="accent" className="h-4" />
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { label: 'Quizzes', value: '3/4', icon: BookOpen },
                { label: 'Games', value: '2/2', icon: Gamepad2 },
                { label: 'Time', value: '45m', icon: Clock },
                { label: 'Streak', value: '5 Days', icon: Star },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl bg-slate-50 p-4 text-center">
                  <stat.icon className="mx-auto mb-2 h-5 w-5 text-slate-400" />
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{stat.label}</p>
                  <p className="text-lg font-bold text-slate-900">{stat.value}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Featured Content */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">Recommended for You</h2>
              <Button variant="ghost" className="text-[#4A90E2]">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {featuredContent.map((content) => (
                <Card
                  key={content.id}
                  onClick={() => onContentClick(content)}
                  className="group cursor-pointer overflow-hidden p-0"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={content.thumbnailUrl || `https://picsum.photos/seed/${content.id}/400/225`}
                      alt={content.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <Badge className="absolute left-3 top-3 bg-white/90 text-slate-900 backdrop-blur-sm">
                      {content.contentType.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#4A90E2]">
                      {content.subject} • {content.topic}
                    </p>
                    <h3 className="mt-1 text-lg font-bold text-slate-900 line-clamp-1">{content.title}</h3>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-sm font-bold text-[#7ED321]">
                        <Trophy className="h-4 w-4" />
                        +{content.pointsReward} XP
                      </div>
                      <Button size="sm" variant="ghost" className="h-8 w-8 rounded-full p-0">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Area */}
        <div className="space-y-8">
          {/* AI Tutor Quick Access */}
          <Card className="border-none bg-gradient-to-br from-indigo-500 to-purple-600 p-6 text-white">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-white">
              <Sparkles className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold">AI Tutor</h3>
            <p className="mt-2 text-indigo-100">Stuck on a problem? Ask your AI tutor for instant help.</p>
            <Button className="mt-6 w-full bg-white text-indigo-600 hover:bg-indigo-50">
              Start Chatting
            </Button>
          </Card>

          {/* Leaderboard Preview */}
          <Card className="p-6">
            <h3 className="mb-4 text-lg font-bold text-slate-900">Leaderboard</h3>
            <div className="space-y-4">
              {[
                { name: 'Alex Johnson', points: 2450, rank: 1 },
                { name: 'Sarah Miller', points: 2100, rank: 2 },
                { name: 'Mike Ross', points: 1950, rank: 3 },
              ].map((player) => (
                <div key={player.name} className="flex items-center gap-3">
                  <div className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold",
                    player.rank === 1 ? "bg-yellow-100 text-yellow-700" :
                    player.rank === 2 ? "bg-slate-100 text-slate-700" :
                    "bg-orange-100 text-orange-700"
                  )}>
                    {player.rank}
                  </div>
                  <Avatar src={`https://picsum.photos/seed/${player.name}/100/100`} size="sm" />
                  <div className="flex-1 overflow-hidden">
                    <p className="truncate text-sm font-bold text-slate-900">{player.name}</p>
                    <p className="text-xs text-slate-500">{player.points} XP</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="mt-6 w-full text-slate-500">
              View Full Rankings
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
