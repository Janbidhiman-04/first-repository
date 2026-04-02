import * as React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, BookOpen, Gamepad2, MessageSquare, User, LogOut, Menu, X, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from './ui/Button';
import { Avatar } from './ui/Avatar';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
  user?: any; // Replace with actual user type
  onLogout?: () => void;
}

export function Layout({ children, user, onLogout }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Learn', path: '/learn', icon: BookOpen },
    { name: 'Games', path: '/games', icon: Gamepad2 },
    { name: 'AI Tutor', path: '/ai-tutor', icon: MessageSquare },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] font-sans">
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 hidden h-full w-64 flex-col border-r border-slate-200 bg-white lg:flex">
        <div className="flex h-20 items-center gap-3 px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4A90E2] text-white shadow-lg shadow-[#4A90E2]/20">
            <Sparkles className="h-6 w-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-[#4A90E2]">Eduana</span>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-[#4A90E2]/10 text-[#4A90E2]'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                )
              }
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-slate-100 p-4">
          {user ? (
            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
              <Avatar src={user.photoURL} alt={user.displayName} size="sm" />
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-bold text-slate-900">{user.displayName}</p>
                <p className="truncate text-xs text-slate-500">{user.totalPoints} Points</p>
              </div>
              <button
                onClick={onLogout}
                className="rounded-lg p-2 text-slate-400 hover:bg-white hover:text-red-500 transition-colors"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Button onClick={() => navigate('/login')} className="w-full">
              Login
            </Button>
          )}
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 lg:hidden">
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-[#4A90E2]" />
          <span className="text-xl font-bold text-[#4A90E2]">Eduana</span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
            />
            <motion.nav
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 z-50 h-full w-72 bg-white p-6 shadow-2xl lg:hidden"
            >
              <div className="mb-8 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4A90E2] text-white">
                  <Sparkles className="h-6 w-6" />
                </div>
                <span className="text-2xl font-bold text-[#4A90E2]">Eduana</span>
              </div>
              <div className="space-y-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-3 rounded-xl px-4 py-4 text-base font-medium transition-all',
                        isActive
                          ? 'bg-[#4A90E2]/10 text-[#4A90E2]'
                          : 'text-slate-500 hover:bg-slate-50'
                      )
                    }
                  >
                    <item.icon className="h-6 w-6" />
                    {item.name}
                  </NavLink>
                ))}
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                {user && (
                  <Button
                    variant="ghost"
                    onClick={onLogout}
                    className="w-full justify-start gap-3 text-red-500 hover:bg-red-50 hover:text-red-600"
                  >
                    <LogOut className="h-5 w-5" />
                    Logout
                  </Button>
                )}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="lg:pl-64">
        <div className="mx-auto max-w-7xl p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
