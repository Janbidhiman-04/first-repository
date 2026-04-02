import * as React from 'react';
import { Dialog } from './ui/Dialog';
import { Button } from './ui/Button';
import { ContentItem } from '../types';
import { FileText, Brain, Gamepad2, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ContentModalProps {
  content: ContentItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ContentModal({ content, isOpen, onClose }: ContentModalProps) {
  if (!content) return null;

  const getYoutubeEmbedUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
  };

  const embedUrl = content.videoUrl ? getYoutubeEmbedUrl(content.videoUrl) : null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div className="max-w-4xl -m-6 overflow-hidden bg-white">
        <div className="relative">
          {content.contentType === 'video' && embedUrl ? (
            <div className="aspect-video w-full">
              <iframe
                src={embedUrl}
                title={content.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="aspect-video w-full bg-slate-100 flex items-center justify-center">
              <img 
                src={content.thumbnailUrl} 
                alt={content.title} 
                className="h-full w-full object-cover opacity-50"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                {content.contentType === 'quiz' && <Brain className="h-20 w-20 text-[#4A90E2]" />}
                {content.contentType === 'game' && <Gamepad2 className="h-20 w-20 text-[#7ED321]" />}
                {content.contentType === 'text' && <FileText className="h-20 w-20 text-orange-500" />}
              </div>
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#4A90E2] mb-1">
                {content.subject} • {content.topic}
              </p>
              <h2 className="text-2xl font-bold text-slate-900">{content.title}</h2>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <ExternalLink className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>

          <div className="prose prose-slate max-w-none mb-8">
            {content.textContent ? (
              <ReactMarkdown>{content.textContent}</ReactMarkdown>
            ) : (
              <p className="text-slate-600">
                This is a {content.contentType} content for {content.subject}. 
                Complete this activity to earn {content.pointsReward} XP!
              </p>
            )}
          </div>

          <div className="flex items-center justify-between border-t pt-6">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-xs font-bold text-slate-400 uppercase">Points</p>
                <p className="text-lg font-bold text-[#7ED321]">+{content.pointsReward} XP</p>
              </div>
              <div className="h-8 w-px bg-slate-100" />
              <div className="text-center">
                <p className="text-xs font-bold text-slate-400 uppercase">Type</p>
                <p className="text-lg font-bold text-slate-700 capitalize">{content.contentType}</p>
              </div>
            </div>
            <Button className="bg-[#4A90E2] hover:bg-[#357ABD] px-8 py-6 text-lg font-bold rounded-2xl shadow-lg shadow-blue-200">
              {content.contentType === 'video' ? 'Mark as Completed' : 'Start Activity'}
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
