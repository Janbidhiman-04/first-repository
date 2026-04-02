import * as React from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { Progress } from './ui/Progress';
import { Avatar } from './ui/Avatar';
import { Trophy, Star, Clock, BookOpen, Gamepad2, TrendingUp, Settings, LogOut, Mail, Phone, Calendar, Sparkles, Crown } from 'lucide-react';
import { motion } from 'framer-motion';
import { UserProfile } from '../types';
import { LEVELS } from '../constants';
import { cn } from '../lib/utils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ProfileProps {
  user: UserProfile;
  onLogout: () => void;
  onUpdateLevel: () => void;
}

const activityData = [
  { name: 'Mon', points: 120 },
  { name: 'Tue', points: 250 },
  { name: 'Wed', points: 180 },
  { name: 'Thu', points: 320 },
  { name: 'Fri', points: 450 },
  { name: 'Sat', points: 380 },
  { name: 'Sun', points: 520 },
];

export function Profile({ user, onLogout, onUpdateLevel }: ProfileProps) {
  const currentLevel = LEVELS.find(l => l.id === user.selectedLevel);

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <Card className="relative overflow-hidden p-0 border-none shadow-2xl shadow-slate-200/50">
        <div className="h-48 w-full bg-gradient-to-r from-[#4A90E2] to-[#357ABD]" />
        <div className="relative z-10 -mt-16 px-8 pb-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-6 md:flex-row md:items-end">
              <Avatar
                src={user.photoURL}
                alt={user.displayName}
                size="xl"
                className="h-32 w-32 border-8 border-white shadow-xl"
              />
              <div className="space-y-1 pb-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold text-slate-900">{user.displayName}</h1>
                  {user.isPremium && (
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 border-yellow-200">
                      <Crown className="mr-1.5 h-4 w-4" />
                      Premium
                    </Badge>
                  )}
                </div>
                <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Mail className="h-4 w-4" />
                    {user.email}
                  </div>
                  {user.phoneNumber && (
                    <div className="flex items-center gap-1.5">
                      <Phone className="h-4 w-4" />
                      {user.phoneNumber}
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    Joined {new Date(user.createdAt.seconds * 1000).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-3 pb-2">
              <Button variant="outline" className="gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
              <Button variant="ghost" onClick={onLogout} className="gap-2 text-red-500 hover:bg-red-50 hover:text-red-600">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Stats & Activity */}
        <div className="space-y-8 lg:col-span-2">
          {/* Activity Chart */}
          <Card className="p-6">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4A90E2]/10 text-[#4A90E2]">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Learning Activity</h2>
              </div>
              <Badge variant="outline">Last 7 Days</Badge>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                    dx={-10}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      borderRadius: '12px',
                      border: 'none',
                      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="points"
                    stroke="#4A90E2"
                    strokeWidth={4}
                    dot={{ r: 6, fill: '#4A90E2', strokeWidth: 2, stroke: '#fff' }}
                    activeDot={{ r: 8, fill: '#4A90E2', strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Achievements */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">Achievements</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: 'Early Bird', desc: 'Login 5 days in a row', icon: Clock, color: 'bg-blue-500', progress: 100 },
                { title: 'Quiz Master', desc: 'Complete 50 quizzes', icon: BookOpen, color: 'bg-orange-500', progress: 65 },
                { title: 'Game Pro', desc: 'Win 10 games', icon: Gamepad2, color: 'bg-green-500', progress: 40 },
                { title: 'Social Star', desc: 'Refer 3 friends', icon: Star, color: 'bg-purple-500', progress: 10 },
              ].map((achievement) => (
                <Card key={achievement.title} className="p-4">
                  <div className="flex items-center gap-4">
                    <div className={cn('flex h-12 w-12 items-center justify-center rounded-2xl text-white', achievement.color)}>
                      <achievement.icon className="h-7 w-7" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-slate-900">{achievement.title}</h4>
                        <span className="text-xs font-bold text-slate-400">{achievement.progress}%</span>
                      </div>
                      <p className="text-xs text-slate-500">{achievement.desc}</p>
                      <Progress value={achievement.progress} className="h-1.5" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Level Info & Points */}
        <div className="space-y-8">
          {/* Current Level Card */}
          <Card className="p-6">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Current Level</h3>
              <Button variant="ghost" size="sm" onClick={onUpdateLevel} className="text-[#4A90E2]">
                Change
              </Button>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#4A90E2]/10 text-[#4A90E2]">
                <Sparkles className="h-10 w-10" />
              </div>
              <h4 className="text-2xl font-bold text-slate-900">{currentLevel?.name}</h4>
              <p className="mt-1 text-sm font-medium text-[#4A90E2]">{currentLevel?.ageRange}</p>
              <p className="mt-4 text-sm text-slate-500">{currentLevel?.description}</p>
            </div>
          </Card>

          {/* Points & Rewards */}
          <Card className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-bold">Points Wallet</h3>
              <Trophy className="h-6 w-6 text-yellow-500" />
            </div>
            <div className="mb-8">
              <p className="text-sm font-medium text-slate-400 uppercase tracking-widest">Total Balance</p>
              <p className="text-5xl font-bold tracking-tight">{user.totalPoints.toLocaleString()}</p>
              <p className="mt-2 text-sm text-[#7ED321] font-bold">+250 XP this week</p>
            </div>
            <div className="space-y-3">
              <Button className="w-full bg-[#7ED321] hover:bg-[#6AB01B] text-white font-bold h-12">
                Redeem Rewards
              </Button>
              <Button variant="ghost" className="w-full text-slate-400 hover:text-white hover:bg-white/5">
                Transaction History
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
