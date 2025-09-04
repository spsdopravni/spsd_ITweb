'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Home, Search, ArrowLeft, Compass, AlertCircle } from 'lucide-react';
import { useSpring, animated, useTrail } from '@react-spring/web';

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
        setTimeout(() => setGlitchText('404'), 100);
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

  const actions = [
    { icon: Home, label: 'Go Home', href: '/' },
    { icon: Search, label: 'Search', href: '/search' },
    { icon: Compass, label: 'Explore', href: '/explore' },
  ];

  return (
    <div className="min-h-screen bg-black overflow-hidden relative flex items-center justify-center">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(102, 126, 234, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(102, 126, 234, 0.2) 1px, transparent 1px)
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
            className="absolute w-1 h-1 bg-purple-500/30 rounded-full animate-float"
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
      <div className="relative z-10 text-center px-6">
        {/* 404 Number */}
        <animated.div style={numberAnimation} className="relative mb-8">
          <div className="relative inline-block">
            {/* Glow effect */}
            <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-purple-600/50 to-pink-600/50 animate-pulse" />
            
            {/* Main 404 text */}
            <h1 
              className="relative text-[150px] md:text-[200px] font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 select-none"
              style={{
                textShadow: '0 0 80px rgba(168, 85, 247, 0.5)',
                letterSpacing: '0.1em',
              }}
            >
              {glitchText}
            </h1>

            {/* Glitch layers */}
            <div className="absolute inset-0 text-[150px] md:text-[200px] font-black text-red-500/20 select-none" style={{ clipPath: 'inset(40% 0 60% 0)' }}>
              404
            </div>
            <div className="absolute inset-0 text-[150px] md:text-[200px] font-black text-blue-500/20 select-none" style={{ clipPath: 'inset(60% 0 40% 0)', transform: 'translateX(2px)' }}>
              404
            </div>
          </div>
        </animated.div>

        {/* Error message */}
        <animated.div style={fadeIn} className="mb-12">
          <animated.div style={floatingAnimation} className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-4">
            <AlertCircle className="w-5 h-5 text-yellow-400" />
            <span className="text-sm text-gray-300">Page Not Found</span>
          </animated.div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Lost in the Digital Void
          </h2>
          <p className="text-gray-400 max-w-md mx-auto text-lg">
            The page you're looking for has drifted into the cosmos. 
            Let's navigate you back to familiar territory.
          </p>
        </animated.div>

        {/* Action buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {trail.map((style, index) => {
            const Icon = actions[index].icon;
            return (
              <animated.div key={actions[index].href} style={style}>
                <Link
                  href={actions[index].href}
                  className="group flex items-center gap-2 px-6 py-3 glass rounded-full border border-white/10 hover:border-purple-500/50 transition-all hover:scale-105"
                >
                  <Icon className="w-5 h-5 text-purple-400 group-hover:text-purple-300" />
                  <span className="text-white/90 group-hover:text-white">{actions[index].label}</span>
                </Link>
              </animated.div>
            );
          })}
        </div>

        {/* Fun message */}
        <animated.div style={fadeIn} className="mt-12">
          <p className="text-gray-500 text-sm">
            Error Code: STUDENT_404 | Page Not Found
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Pro tip: You can press <kbd className="px-2 py-1 glass rounded text-purple-400">⌘K</kbd> to search
          </p>
        </animated.div>

        {/* Decorative elements */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
    </div>
  );
}