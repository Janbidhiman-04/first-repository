import * as React from 'react';
import { LEVELS } from '../constants';
import { LevelID } from '../types';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

interface LevelSelectionProps {
  onSelect: (levelId: LevelID) => void;
  selectedLevel?: LevelID;
}

export function LevelSelection({ onSelect, selectedLevel }: LevelSelectionProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {LEVELS.map((level, index) => (
        <motion.div
          key={level.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <Card
            onClick={() => onSelect(level.id)}
            className={cn(
              'relative cursor-pointer border-2 transition-all h-full flex flex-col',
              selectedLevel === level.id
                ? 'border-[#4A90E2] bg-[#4A90E2]/5'
                : 'border-transparent hover:border-slate-200'
            )}
          >
            {selectedLevel === level.id && (
              <div className="absolute right-4 top-4 text-[#4A90E2]">
                <CheckCircle2 className="h-6 w-6 fill-current" />
              </div>
            )}
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">{level.name}</h3>
            <p className="mt-1 text-sm font-medium text-[#4A90E2]">{level.ageRange}</p>
            <p className="mt-2 text-sm text-slate-500 flex-1">{level.description}</p>
            <Button
              variant={selectedLevel === level.id ? 'primary' : 'ghost'}
              className="mt-6 w-full"
            >
              {selectedLevel === level.id ? 'Selected' : 'Select Level'}
            </Button>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
