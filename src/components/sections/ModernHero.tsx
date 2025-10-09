'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';
import Link from 'next/link';

export const ModernHero: React.FC = () => {
  const { t } = useLanguage();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for interactive elements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 100,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 100,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation springs
  const mainContentSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(30px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    delay: 200,
  });

  const ctaSpring = useSpring({
    from: { opacity: 0, transform: 'scale(0.9)' },
    to: { opacity: 1, transform: 'scale(1)' },
    delay: 800,
  });

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute opacity-20"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 2) * 40}%`,
              transform: `translate(${mousePosition.x * (0.01 + i * 0.005)}px, ${mousePosition.y * (0.01 + i * 0.005)}px)`,
              transition: 'transform 0.3s ease-out',
            }}
          >
            <div 
              className={`w-3 h-3 ${
                i % 3 === 0 ? 'rounded-full gradient-accent' : i % 3 === 1 ? 'rotate-45 gradient-warm' : 'rounded-sm gradient-cool'
              } animate-pulse`}
              style={{
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${2 + i * 0.5}s`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <animated.div style={mainContentSpring}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/30 mb-8 group hover:border-blue-400/50 transition-all duration-300">
            <Sparkles className="w-4 h-4 text-blue-400 group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-sm text-white/80 font-medium">
              {t('home.badge') || 'Střední průmyslová škola dopravní'}
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
            <span className="text-gradient-accent">
              {t('home.title') || 'SPSD IT'}
            </span>
            <br />
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white/60 font-light">
              {t('home.subtitle2') || 'budoucnosti'}
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed">
            {t('home.description') || 'Webová prezentace oboru + obsah + rozcestník 2026. Připravujeme studenty na dynamicky se rozvíjející oblast informačních technologií.'}
          </p>

          {/* CTA buttons */}
          <animated.div style={ctaSpring} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link 
              href="/about" 
              className="group relative inline-flex items-center gap-2 px-8 py-4 gradient-accent rounded-full text-white font-semibold hover:gradient-warm transition-all duration-300 hover:scale-105 glow-spsd-hover"
            >
              <span>{t('home.aboutBtn') || 'Více o oboru'}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>

            <button className="group inline-flex items-center gap-2 px-8 py-4 border-2 border-white/20 rounded-full text-white font-semibold hover:border-red-400 hover:bg-red-400/10 transition-all duration-300 hover:scale-105">
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span>{t('home.watchVideo') || 'Přehrát video'}</span>
            </button>
          </animated.div>
        </animated.div>
      </div>
    </section>
  );
};