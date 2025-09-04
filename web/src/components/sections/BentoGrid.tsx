'use client';

import React from 'react';
import { useSpring, animated, useInView } from '@react-spring/web';
import { 
  Rocket, Calendar, Trophy, BookOpen, Globe, Users, 
  TrendingUp, Cpu, Code, Palette, BarChart, MessageSquare,
  FileText, Video, Headphones, Award, Target, Lightbulb
} from 'lucide-react';

interface BentoCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
  size: 'small' | 'medium' | 'large';
  delay?: number;
}

const BentoCard: React.FC<BentoCardProps> = ({ title, description, icon: Icon, gradient, size, delay = 0 }) => {
  const [ref, inView] = useInView({ once: true });
  const [isHovered, setIsHovered] = React.useState(false);

  const springProps = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px)' : 'translateY(50px)',
    delay,
  });

  const hoverSpring = useSpring({
    transform: isHovered ? 'scale(1.02)' : 'scale(1)',
    boxShadow: isHovered 
      ? '0 20px 40px rgba(0, 0, 0, 0.4)' 
      : '0 10px 20px rgba(0, 0, 0, 0.2)',
  });

  const sizeClasses = {
    small: 'col-span-1 row-span-1',
    medium: 'col-span-2 row-span-1',
    large: 'col-span-2 row-span-2',
  };

  return (
    <animated.div
      ref={ref}
      style={{ ...springProps, ...hoverSpring }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${sizeClasses[size]} relative overflow-hidden rounded-2xl glass-dark cursor-pointer group`}
    >
      <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
        <div 
          className="absolute inset-0"
          style={{ background: gradient }}
        />
      </div>

      <div className="relative p-6 h-full flex flex-col justify-between">
        <div>
          <div className="inline-flex p-3 rounded-xl glass mb-4">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
          <p className="text-gray-400 text-sm">{description}</p>
        </div>

        {size === 'large' && (
          <div className="mt-8 space-y-3">
            <div className="flex items-center justify-between p-3 glass rounded-lg">
              <span className="text-gray-300 text-sm">Active Now</span>
              <span className="text-white font-bold">234</span>
            </div>
            <div className="flex items-center justify-between p-3 glass rounded-lg">
              <span className="text-gray-300 text-sm">This Week</span>
              <span className="text-white font-bold">1.2K</span>
            </div>
          </div>
        )}

        {size === 'medium' && (
          <div className="mt-4 flex items-center gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-1 h-2 glass rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full"
                  style={{ 
                    width: `${Math.random() * 40 + 60}%`,
                    background: gradient 
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </animated.div>
  );
};

export const BentoGrid: React.FC = () => {
  const categories = [
    {
      title: 'AI Study Assistant',
      description: 'Get personalized help with your coursework using advanced AI',
      icon: Cpu,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      size: 'large' as const,
    },
    {
      title: 'Live Events',
      description: 'Join workshops and seminars happening right now',
      icon: Calendar,
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      size: 'medium' as const,
    },
    {
      title: 'Code Lab',
      description: 'Practice coding with real-time collaboration',
      icon: Code,
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      size: 'small' as const,
    },
    {
      title: 'Design Studio',
      description: 'Create stunning projects with professional tools',
      icon: Palette,
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      size: 'small' as const,
    },
    {
      title: 'Analytics Hub',
      description: 'Track your academic progress and performance',
      icon: BarChart,
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      size: 'medium' as const,
    },
    {
      title: 'Study Groups',
      description: 'Connect with peers for collaborative learning',
      icon: Users,
      gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
      size: 'small' as const,
    },
    {
      title: 'Resource Library',
      description: 'Access thousands of study materials and guides',
      icon: BookOpen,
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      size: 'small' as const,
    },
    {
      title: 'Career Path',
      description: 'Plan your future with industry insights and opportunities',
      icon: TrendingUp,
      gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
      size: 'medium' as const,
    },
  ];

  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">
            Everything You Need
          </h2>
          <p className="text-xl text-gray-400">
            Powerful tools designed for modern students
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[200px]">
          {categories.map((category, index) => (
            <BentoCard
              key={index}
              {...category}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};