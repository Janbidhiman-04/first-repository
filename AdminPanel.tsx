import * as React from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { Input } from './ui/Input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/Tabs';
import { Users, BookOpen, Video, Plus, Search, Filter, Shield, MoreVertical, Edit, Trash2, CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

export function AdminPanel() {
  const [activeTab, setActiveTab] = React.useState('users');
  const [searchQuery, setSearchQuery] = React.useState('');

  const stats = [
    { label: 'Total Users', value: '12,450', icon: Users, color: 'bg-blue-500' },
    { label: 'Active Today', value: '1,200', icon: Shield, color: 'bg-green-500' },
    { label: 'Total Content', value: '450', icon: BookOpen, color: 'bg-orange-500' },
    { label: 'Premium Users', value: '850', icon: Video, color: 'bg-purple-500' },
  ];

  const users = [
    { id: 'u1', name: 'Dhiman Janbi', email: 'dhimanjanbi@gmail.com', level: 'L7', status: 'active', isPremium: true },
    { id: 'u2', name: 'Sarah Miller', email: 'sarah@example.com', level: 'L3', status: 'pending', isPremium: false },
    { id: 'u3', name: 'Mike Ross', email: 'mike@example.com', level: 'L5', status: 'active', isPremium: false },
  ];

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.level.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Admin Dashboard</h2>
          <p className="text-slate-500">Manage users, content, and system settings.</p>
        </div>
        <Button className="gap-2 h-12">
          <Plus className="h-5 w-5" />
          Add New Content
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-6">
            <div className="flex items-center gap-4">
              <div className={cn('flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg', stat.color)}>
                <stat.icon className="h-7 w-7" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <TabsList className="bg-white border border-slate-100">
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="content">Content Library</TabsTrigger>
            <TabsTrigger value="premium">Premium Plans</TabsTrigger>
            <TabsTrigger value="settings">System Settings</TabsTrigger>
          </TabsList>
          <div className="flex w-full max-w-sm items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-10 text-sm"
              />
            </div>
            <Button variant="outline" size="sm" className="h-10 w-10 p-0">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="users" className="mt-8">
          <Card className="overflow-hidden p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 font-bold text-slate-900">User</th>
                    <th className="px-6 py-4 font-bold text-slate-900">Level</th>
                    <th className="px-6 py-4 font-bold text-slate-900">Status</th>
                    <th className="px-6 py-4 font-bold text-slate-900">Membership</th>
                    <th className="px-6 py-4 font-bold text-slate-900 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">{user.name}</p>
                            <p className="text-xs text-slate-500">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="outline">{user.level}</Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          {user.status === 'active' ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-orange-500" />
                          )}
                          <span className={cn(
                            'font-medium capitalize',
                            user.status === 'active' ? 'text-green-600' : 'text-orange-600'
                          )}>
                            {user.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {user.isPremium ? (
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">Premium</Badge>
                        ) : (
                          <Badge variant="outline">Free</Badge>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 px-6 py-4">
              <p className="text-xs font-medium text-slate-500">Showing 3 of 12,450 users</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="mt-8">
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-dashed border-slate-200">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-50 text-slate-400">
              <BookOpen className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Content Library</h3>
            <p className="mt-2 text-slate-500 max-w-md">Upload and manage educational videos, quizzes, and games for each level.</p>
            <Button className="mt-8 gap-2">
              <Plus className="h-5 w-5" />
              Upload First Content
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
