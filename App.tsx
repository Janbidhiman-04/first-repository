import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Auth } from './components/Auth';
import { Home } from './components/Home';
import { Learn } from './components/Learn';
import { Games } from './components/Games';
import { AITutor } from './components/AITutor';
import { Profile } from './components/Profile';
import { LevelSelection } from './components/LevelSelection';
import { ContentModal } from './components/ContentModal';
import { ToastProvider, useToast } from './components/ui/Toast';
import { authService, MockUser } from './services/authService';
import { aiService } from './services/aiService';
import { UserProfile, LevelID, ContentItem } from './types';
import { Loader2 } from 'lucide-react';

function AppContent() {
  const [user, setUser] = React.useState<MockUser | null>(null);
  const [profile, setProfile] = React.useState<UserProfile | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [selectedContent, setSelectedContent] = React.useState<ContentItem | null>(null);
  const [isContentModalOpen, setIsContentModalOpen] = React.useState(false);
  const { addToast } = useToast();
  const navigate = useNavigate();

  React.useEffect(() => {
    const unsubscribe = authService.onAuthChange(async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const userProfile = await authService.getUserProfile(firebaseUser.uid);
        setProfile(userProfile);
        if (!userProfile) {
          navigate('/select-level');
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, [navigate]);

  const handleContentClick = (content: ContentItem) => {
    setSelectedContent(content);
    setIsContentModalOpen(true);
  };

  const handleLogin = async (email: string, pass: string) => {
    try {
      await authService.login(email, pass);
      addToast('Welcome back!', 'success');
      navigate('/');
    } catch (error: any) {
      addToast(error.message, 'error');
    }
  };

  const handleRegister = async (email: string, pass: string) => {
    try {
      await authService.register(email, pass);
      addToast('Account created successfully!', 'success');
      navigate('/select-level');
    } catch (error: any) {
      addToast(error.message, 'error');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await authService.googleLogin();
      addToast('Logged in with Google', 'success');
      navigate('/');
    } catch (error: any) {
      addToast(error.message, 'error');
    }
  };

  const handleLevelSelect = async (levelId: LevelID) => {
    if (user) {
      try {
        const newProfile = await authService.createUserProfile(user, levelId);
        setProfile(newProfile);
        addToast(`Level ${levelId} selected!`, 'success');
        navigate('/');
      } catch (error: any) {
        addToast(error.message, 'error');
      }
    }
  };

  const handleLogout = async () => {
    await authService.logout();
    addToast('Logged out successfully', 'info');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-[#4A90E2]" />
          <p className="text-lg font-bold text-slate-600">Loading Eduana...</p>
        </div>
      </div>
    );
  }

  const featuredContent: ContentItem[] = [
    {
      id: 'c1',
      levelId: profile?.selectedLevel || 'L1',
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
      levelId: profile?.selectedLevel || 'L3',
      subject: 'Coding',
      topic: 'Basics',
      title: 'Python for Beginners',
      contentType: 'video',
      videoUrl: 'https://www.youtube.com/watch?v=kqtD5dpn9C8',
      pointsReward: 25,
      isPremium: true,
      thumbnailUrl: 'https://img.youtube.com/vi/kqtD5dpn9C8/maxresdefault.jpg',
    },
  ];

  return (
    <Routes>
      <Route
        path="/login"
        element={
          user ? (
            <Navigate to="/" />
          ) : (
            <Auth
              onLogin={handleLogin}
              onRegister={handleRegister}
              onGoogleLogin={handleGoogleLogin}
              onPhoneLogin={(phone) => addToast(`OTP sent to ${phone}`, 'info')}
            />
          )
        }
      />
      <Route
        path="/select-level"
        element={
          user ? (
            <div className="mx-auto max-w-4xl p-8">
              <div className="mb-12 text-center">
                <h1 className="text-4xl font-bold text-slate-900">Choose Your Level</h1>
                <p className="mt-4 text-lg text-slate-500">Select the educational stage that fits you best.</p>
              </div>
              <LevelSelection onSelect={handleLevelSelect} selectedLevel={profile?.selectedLevel} />
            </div>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/*"
        element={
          user && profile ? (
            <Layout user={profile} onLogout={handleLogout}>
              <Routes>
                <Route
                  path="/"
                  element={
                    <Home
                      user={profile}
                      featuredContent={featuredContent}
                      onContentClick={handleContentClick}
                    />
                  }
                />
                <Route
                  path="/learn"
                  element={
                    <Learn
                      levelId={profile.selectedLevel}
                      onContentClick={handleContentClick}
                    />
                  }
                />
                <Route
                  path="/games"
                  element={
                    <Games
                      levelId={profile.selectedLevel}
                      onPlay={(id) => addToast(`Starting game ${id}`, 'success')}
                    />
                  }
                />
                <Route
                  path="/ai-tutor"
                  element={
                    <AITutor
                      userLevel={profile.selectedLevel}
                      onSendMessage={(msg) => aiService.generateTutorResponse(msg, profile.selectedLevel)}
                    />
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <Profile
                      user={profile}
                      onLogout={handleLogout}
                      onUpdateLevel={() => navigate('/select-level')}
                    />
                  }
                />
              </Routes>
              <ContentModal 
                content={selectedContent} 
                isOpen={isContentModalOpen} 
                onClose={() => setIsContentModalOpen(false)} 
              />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <Router>
        <AppContent />
      </Router>
    </ToastProvider>
  );
}
