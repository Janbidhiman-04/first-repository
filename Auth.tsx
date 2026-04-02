import * as React from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Card } from './ui/Card';
import { Sparkles, Mail, Lock, Phone, ArrowRight, Github, Chrome } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AuthProps {
  onLogin: (email: string, pass: string) => void;
  onRegister: (email: string, pass: string) => void;
  onGoogleLogin: () => void;
  onPhoneLogin: (phone: string) => void;
}

export function Auth({ onLogin, onRegister, onGoogleLogin, onPhoneLogin }: AuthProps) {
  const [isLogin, setIsLogin] = React.useState(true);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [showPhone, setShowPhone] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      onLogin(email, password);
    } else {
      onRegister(email, password);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-2xl shadow-slate-200/50">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#4A90E2] text-white shadow-xl shadow-[#4A90E2]/20">
            <Sparkles className="h-10 w-10" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            {isLogin ? 'Welcome Back!' : 'Join Eduana'}
          </h1>
          <p className="mt-2 text-slate-500">
            {isLogin ? 'Continue your learning journey' : 'Start your gamified learning experience'}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!showPhone ? (
            <motion.form
              key="email-form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <Input
                label="Email Address"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button type="submit" className="w-full h-12 text-lg font-bold">
                {isLogin ? 'Login' : 'Create Account'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.form>
          ) : (
            <motion.div
              key="phone-form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              <Input
                label="Phone Number"
                type="tel"
                placeholder="+1 234 567 8900"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <Button onClick={() => onPhoneLogin(phone)} className="w-full h-12 text-lg font-bold">
                Send OTP
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="my-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-slate-100" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Or continue with</span>
          <div className="h-px flex-1 bg-slate-100" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" onClick={onGoogleLogin} className="h-12">
            <Chrome className="mr-2 h-5 w-5" />
            Google
          </Button>
          <Button variant="outline" onClick={() => setShowPhone(!showPhone)} className="h-12">
            {showPhone ? <Mail className="mr-2 h-5 w-5" /> : <Phone className="mr-2 h-5 w-5" />}
            {showPhone ? 'Email' : 'Phone'}
          </Button>
        </div>

        <p className="mt-8 text-center text-sm text-slate-500">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-1 font-bold text-[#4A90E2] hover:underline"
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </p>
      </Card>
    </div>
  );
}
