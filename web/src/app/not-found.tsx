'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Home, Compass, AlertCircle, BookOpen } from 'lucide-react';
import { useSpring, animated, useTrail } from '@react-spring/web';
import { useLanguage } from '@/contexts/LanguageContext';

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [glitchText, setGlitchText] = useState('404');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Glitch effect
  useEffect(() => {
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?0123456789ABCDEF';
    const interval = setInterval(() => {
      if (Math.random() > 0.95) {
        const randomChar = glitchChars[Math.floor(Math.random() * glitchChars.length)];
        setGlitchText('4' + randomChar + '4');
        setTimeout(() => setGlitchText('404'), 10);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    delay: 200,
  });

  const numberAnimation = useSpring({
    from: { scale: 0.5, opacity: 0 },
    to: { scale: 1, opacity: 1 },
    config: { tension: 120, friction: 14 },
  });

  const trail = useTrail(3, {
    from: { opacity: 0, transform: 'scale(0.9)' },
    to: { opacity: 1, transform: 'scale(1)' },
    delay: 400,
  });

  const floatingAnimation = useSpring({
    loop: { reverse: true },
    from: { transform: 'translateY(0px)' },
    to: { transform: 'translateY(-10px)' },
    config: { duration: 2000 },
  });

  const { t } = useLanguage();

  const actions = [
    { icon: Home, label: t('notFound.backHome'), href: '/' },
    { icon: BookOpen, label: t('notFound.aboutProgram'), href: '/about' },
    { icon: Compass, label: t('notFound.viewProjects'), href: '/projects' },
  ];

  return (
    <div className="min-h-screen bg-black overflow-hidden relative flex items-center justify-center">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(200, 30, 28, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(200, 30, 28, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
      </div>

      {/* Floating particles - static positions to avoid hydration mismatch */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { left: 10, top: 20, delay: 0, duration: 8 },
          { left: 30, top: 60, delay: 1, duration: 12 },
          { left: 70, top: 30, delay: 2, duration: 10 },
          { left: 90, top: 80, delay: 0.5, duration: 9 },
          { left: 50, top: 10, delay: 3, duration: 11 },
          { left: 20, top: 70, delay: 1.5, duration: 7 },
          { left: 80, top: 50, delay: 2.5, duration: 13 },
          { left: 15, top: 85, delay: 4, duration: 8 },
          { left: 60, top: 25, delay: 0.8, duration: 10 },
          { left: 35, top: 90, delay: 3.2, duration: 9 },
        ].map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-red-500/30 rounded-full animate-float"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 sm:px-6 w-full max-w-4xl mx-auto">
        {/* 404 Number */}
        <animated.div style={numberAnimation} className="relative mb-8">
          <div className="relative inline-block">
            {/* Glow effect */}
            <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-red-600/50 to-orange-600/50 animate-pulse" />
            
            {/* Main 404 text */}
            <h1 
              className="relative text-[120px] sm:text-[150px] md:text-[200px] font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-red-400 select-none"
              style={{
                textShadow: '0 0 80px rgba(200, 30, 28, 0.5)',
                letterSpacing: '0.1em',
              }}
            >
              {glitchText}
            </h1>

            {/* Glitch layers */}
            <div className="absolute inset-0 text-[120px] sm:text-[150px] md:text-[200px] font-black text-blue-500/20 select-none" style={{ clipPath: 'inset(40% 0 60% 0)' }}>
              404
            </div>
            <div className="absolute inset-0 text-[120px] sm:text-[150px] md:text-[200px] font-black text-orange-500/20 select-none" style={{ clipPath: 'inset(60% 0 40% 0)', transform: 'translateX(2px)' }}>
              404
            </div>
          </div>
        </animated.div>

        {/* Error message */}
        <animated.div style={fadeIn} className="mb-8 sm:mb-12">
          <animated.div style={floatingAnimation} className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 glass rounded-full mb-4">
            <AlertCircle className="w-4 sm:w-5 h-4 sm:h-5 text-orange-400" />
            <span className="text-xs sm:text-sm text-gray-300">{t('notFound.title')}</span>
          </animated.div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            {t('notFound.subtitle')}
          </h2>
          <p className="text-gray-400 max-w-md mx-auto text-sm sm:text-base md:text-lg px-4">
            {t('notFound.description')}
          </p>
        </animated.div>

        {/* Action buttons */}
        <div className="px-4">
          <p className="text-gray-400 text-sm mb-4">{t('notFound.suggestions')}</p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            {trail.map((style, index) => {
              const Icon = actions[index].icon;
              return (
                <animated.div key={actions[index].href} style={style} className="w-full sm:w-auto">
                  <Link
                    href={actions[index].href}
                    className="group flex items-center justify-center sm:justify-start gap-2 px-4 sm:px-6 py-3 glass rounded-full border border-white/10 hover:border-red-500/50 transition-all hover:scale-105 w-full sm:w-auto"
                  >
                    <Icon className="w-4 sm:w-5 h-4 sm:h-5 text-red-400 group-hover:text-orange-400 flex-shrink-0" />
                    <span className="text-white/90 group-hover:text-white text-sm sm:text-base">{actions[index].label}</span>
                  </Link>
                </animated.div>
              );
            })}
          </div>
        </div>

        {/* Help text - mobile optimized */}
        <animated.div style={fadeIn} className="mt-8 sm:mt-12 px-4">
          <div className="glass rounded-lg p-4 sm:p-6 max-w-md mx-auto">
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('notFound.helpText')}
            </p>
            
            {/* Mobile-friendly search tip */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-gray-500 text-xs">
                <span className="block sm:hidden">Tip: Použijte navigační menu pro hledání</span>
                <span className="hidden sm:block">Tip: Použijte vyhledávání v navigačním menu</span>
              </p>
            </div>
            
          </div>
        </animated.div>

        {/* Decorative elements */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
    </div>
  );
}