import * as React from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { Gamepad2, Trophy, Star, Play, Lock, Sparkles, Brain, Puzzle, Code } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

interface Game {
  id: string;
  title: string;
  description: string;
  type: 'puzzle' | 'coding' | 'quiz' | 'drag-drop';
  points: number;
  isLocked: boolean;
  thumbnail: string;
}

interface GamesProps {
  levelId: string;
  onPlay: (gameId: string) => void;
}

export function Games({ levelId, onPlay }: GamesProps) {
  const games: Game[] = [
    {
      id: 'g1',
      title: 'Match the Colors',
      description: 'Identify and match vibrant colors to objects.',
      type: 'drag-drop',
      points: 15,
      isLocked: false,
      thumbnail: 'https://picsum.photos/seed/colors/400/225',
    },
    {
      id: 'g2',
      title: 'Fix the Bug',
      description: 'Correct the code blocks to help the robot move.',
      type: 'coding',
      points: 25,
      isLocked: levelId === 'L1',
      thumbnail: 'https://picsum.photos/seed/coding/400/225',
    },
    {
      id: 'g3',
      title: 'History Match',
      description: 'Match historical figures to their inventions.',
      type: 'puzzle',
      points: 20,
      isLocked: levelId === 'L1' || levelId === 'L2',
      thumbnail: 'https://picsum.photos/seed/history/400/225',
    },
    {
      id: 'g4',
      title: 'Mock Test Battle',
      description: 'Compete with others in real-time quiz battles.',
      type: 'quiz',
      points: 50,
      isLocked: !['L4', 'L5', 'L7'].includes(levelId),
      thumbnail: 'https://picsum.photos/seed/battle/400/225',
    },
  ];

  const icons = {
    puzzle: <Puzzle className="h-5 w-5" />,
    coding: <Code className="h-5 w-5" />,
    quiz: <Brain className="h-5 w-5" />,
    'drag-drop': <Gamepad2 className="h-5 w-5" />,
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Gamified Learning</h2>
          <p className="text-slate-500">Learn while you play and earn points!</p>
        </div>
        <div className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm border border-slate-100">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-100 text-yellow-600">
            <Trophy className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Your Rank</p>
            <p className="text-lg font-bold text-slate-900">Silver II</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {games.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={cn(
              'group relative overflow-hidden p-0 h-full flex flex-col',
              game.isLocked && 'opacity-75 grayscale'
            )}>
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={game.thumbnail}
                  alt={game.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute left-3 top-3 flex gap-2">
                  <Badge className="bg-white/90 text-slate-900 backdrop-blur-sm">
                    {icons[game.type]}
                    <span className="ml-1.5">{game.type.toUpperCase()}</span>
                  </Badge>
                </div>
                {game.isLocked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-900 shadow-xl">
                      <Lock className="h-6 w-6" />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900">{game.title}</h3>
                  <div className="flex items-center gap-1 font-bold text-[#7ED321]">
                    <Star className="h-4 w-4 fill-current" />
                    {game.points}
                  </div>
                </div>
                <p className="text-sm text-slate-500 flex-1">{game.description}</p>
                <Button
                  disabled={game.isLocked}
                  onClick={() => onPlay(game.id)}
                  className="mt-6 w-full gap-2"
                  variant={game.isLocked ? 'ghost' : 'primary'}
                >
                  {game.isLocked ? 'Locked for your level' : (
                    <>
                      <Play className="h-4 w-4 fill-current" />
                      Play Now
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
