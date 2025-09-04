'use client';

import React, { useState } from 'react';
import { useSpring, animated, useTrail } from '@react-spring/web';
import { Plus, X, MessageCircle, HelpCircle, Zap, Upload, Calendar, BookOpen } from 'lucide-react';

const actions = [
  { icon: MessageCircle, label: 'Chat Support', color: '#667eea' },
  { icon: HelpCircle, label: 'Help Center', color: '#f093fb' },
  { icon: Zap, label: 'Quick Actions', color: '#4facfe' },
  { icon: Upload, label: 'Upload File', color: '#43e97b' },
  { icon: Calendar, label: 'Schedule', color: '#fa709a' },
  { icon: BookOpen, label: 'Resources', color: '#30cfd0' },
];

export const FloatingActionMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const buttonSpring = useSpring({
    transform: isOpen ? 'rotate(45deg) scale(1.1)' : 'rotate(0deg) scale(1)',
  });

  const trail = useTrail(actions.length, {
    from: { opacity: 0, transform: 'scale(0) translateY(20px)' },
    to: { 
      opacity: isOpen ? 1 : 0,
      transform: isOpen ? 'scale(1) translateY(0px)' : 'scale(0) translateY(20px)'
    },
    config: { tension: 300, friction: 20 }
  });

  return (
    <div className="fixed bottom-8 right-8 z-40">
      <div className="relative">
        {trail.map((style, index) => {
          const action = actions[index];
          const angle = (index * 60) + 90;
          const radius = 80;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;

          return (
            <animated.div
              key={index}
              style={{
                ...style,
                position: 'absolute',
                bottom: -y,
                right: x,
                pointerEvents: isOpen ? 'auto' : 'none',
              }}
              className="group"
            >
              <button
                className="relative w-12 h-12 rounded-full glass-dark border border-white/20 
                         flex items-center justify-center hover:scale-110 transition-transform duration-200
                         group-hover:shadow-lg"
                style={{
                  boxShadow: `0 8px 32px ${action.color}40`,
                }}
              >
                <action.icon className="w-5 h-5 text-white" />
                <span className="absolute right-full mr-3 px-2 py-1 bg-black/90 text-white text-xs rounded 
                               opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  {action.label}
                </span>
              </button>
            </animated.div>
          );
        })}

        <animated.button
          style={buttonSpring}
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500
                   flex items-center justify-center shadow-2xl hover:shadow-purple-500/50 
                   transition-shadow duration-300 z-10"
        >
          <Plus className="w-6 h-6 text-white" />
          {!isOpen && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-full animate-ping" />
          )}
        </animated.button>
      </div>
    </div>
  );
};