'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSpring, animated, useInView } from '@react-spring/web';
import { 
  Star, Quote, ChevronLeft, ChevronRight,
  ExternalLink, Trophy, Users, Heart 
} from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
  rating: number;
  year: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tech: string[];
  author: string;
  link?: string;
}

export const SuccessStories: React.FC = () => {
  const { t } = useLanguage();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [activeTab, setActiveTab] = useState<'testimonials' | 'projects' | 'achievements'>('testimonials');
  const [ref, inView] = useInView({ once: true });

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Jan Novák',
      role: 'IT Specialista',
      company: 'Dopravní podnik hl. m. Prahy',
      image: '/api/placeholder/80/80',
      quote: 'SPŠD mi dala perfektní základ. Díky absolventskému programu DPP jsem hned našel práci u zřizovatele školy.',
      rating: 5,
      year: '2022'
    },
    {
      id: 2,
      name: 'Marie Svobodová',
      role: 'Síťový administrátor',
      company: 'Soukromá IT firma',
      image: '/api/placeholder/80/80',
      quote: 'Cisco kurzy a praktická výuka v laboratořích mi daly dovednosti, které používám každý den.',
      rating: 5,
      year: '2023'
    },
    {
      id: 3,
      name: 'Petr Dvořák',
      role: 'Student FD ČVUT',
      company: 'Fakulta dopravní ČVUT',
      image: '/api/placeholder/80/80',
      quote: 'Jako fakultní škola ČVUT mi SPŠD usnadnila přechod na vysokou školu. Mám výborný základ.',
      rating: 5,
      year: '2024'
    }
  ];

  const projects: Project[] = [
    {
      id: 1,
      title: 'Systém řízení dopravy DPP',
      description: 'Webová aplikace pro monitoring a řízení autobusových linek v reálném čase',
      image: '/api/placeholder/300/200',
      tech: ['React', 'Node.js', 'PostgreSQL', 'WebSocket'],
      author: 'Jan Novák, 4.A',
      link: '#'
    },
    {
      id: 2,
      title: 'Cisco Router Configurator',
      description: 'Automatizační nástroj pro konfiguraci síťových zařízení Cisco',
      image: '/api/placeholder/300/200',
      tech: ['Python', 'Netmiko', 'Flask', 'SQLite'],
      author: 'Marie Svobodová, 4.B',
      link: '#'
    },
    {
      id: 3,
      title: 'Databáze vozového parku',
      description: 'Oracle databázový systém pro správu vozového parku DPP s reportingem',
      image: '/api/placeholder/300/200',
      tech: ['Oracle DB', 'PL/SQL', 'Java', 'JavaFX'],
      author: 'Petr Dvořák, 4.A',
      link: '#'
    },
    {
      id: 4,
      title: 'Metro Information System',
      description: 'Informační systém pro cestující metra s real-time údaji o spojích',
      image: '/api/placeholder/300/200',
      tech: ['C#', '.NET', 'SQL Server', 'WPF'],
      author: 'Tereza Nováková, 4.B',
      link: '#'
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    if (activeTab === 'testimonials') {
      const timer = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 8000); // Delší interval
      return () => clearInterval(timer);
    }
  }, [activeTab, testimonials.length]);

  const containerSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px)' : 'translateY(50px)',
  });

  // Simple fade animation for testimonials
  const testimonialSpring = useSpring({
    opacity: 1,
    transform: 'scale(1)',
    from: { opacity: 0, transform: 'scale(0.95)' },
    config: { tension: 200, friction: 25 },
    key: currentTestimonial,
  });

  const achievements = [
    { icon: Trophy, label: t('achievements.years') || 'Roky tradice', value: '70+' },
    { icon: Users, label: t('achievements.students') || 'Studentů celkem', value: '~1400' },
    { icon: Heart, label: t('achievements.partner') || 'Hlavní partner', value: 'DPP a.s.' },
    { icon: Star, label: t('achievements.faculty') || 'Fakultní škola', value: 'ČVUT' }
  ];

  const tabs = [
    { id: 'testimonials', label: t('success.tabs.testimonials') || 'Absolventi', icon: Users },
    { id: 'projects', label: t('success.tabs.projects') || 'Projekty', icon: Trophy },
    { id: 'achievements', label: t('success.tabs.achievements') || 'Úspěchy', icon: Star }
  ];

  return (
    <section className="py-20 relative overflow-hidden">

      <animated.div ref={ref} style={containerSpring} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/30 mb-6">
            <Star className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-white/80 font-medium">
              {t('success.badge') || 'Příběhy úspěchu'}
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            {t('success.title') || 'Naši absolventi mění svět'}
          </h2>
          
          <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">
            {t('success.subtitle') || 'Inspirující příběhy studentů, kteří díky studiu na SPSD dosáhli svých snů'}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center mb-12">
          <div className="flex items-center glass rounded-full p-1 border border-white/10">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'testimonials' | 'projects' | 'achievements')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    isActive 
                      ? 'gradient-accent text-white shadow-lg glow-spsd' 
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="min-h-[400px]">
          {/* Testimonials */}
          {activeTab === 'testimonials' && (
            <div className="relative">
              <div className="flex items-center justify-center mb-8">
                {/* Left Arrow */}
                <button
                  onClick={prevTestimonial}
                  className="absolute left-2 md:left-0 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 glass rounded-full border border-white/10 hover:border-red-400/50 transition-all duration-300 hover:scale-110 group"
                  aria-label="Předchozí testimonial"
                >
                  <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white/70 group-hover:text-white transition-colors" />
                </button>

                {/* Testimonial Content */}
                <animated.div style={testimonialSpring} className="w-full max-w-4xl mx-12 md:mx-16">
                  <div className="glass rounded-2xl p-6 md:p-8 border border-white/10 text-center min-h-[350px] md:min-h-[400px] flex flex-col justify-center">
                    {(() => {
                      const item = testimonials[currentTestimonial];
                      return (
                        <>
                          {/* Quote icon */}
                          <div className="flex justify-center mb-4 md:mb-6">
                            <div className="w-10 h-10 md:w-12 md:h-12 gradient-accent rounded-full flex items-center justify-center">
                              <Quote className="w-5 h-5 md:w-6 md:h-6 text-white" />
                            </div>
                          </div>

                          {/* Quote */}
                          <blockquote className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 md:mb-8 leading-relaxed px-2">
                            &ldquo;{item.quote}&rdquo;
                          </blockquote>

                          {/* Author info */}
                          <div className="flex items-center justify-center gap-3 md:gap-4 mb-4 md:mb-6">
                            <div className="w-12 h-12 md:w-16 md:h-16 gradient-accent rounded-full flex items-center justify-center text-white font-bold text-base md:text-lg">
                              {item.name.charAt(0)}
                            </div>
                            
                            <div className="text-left">
                              <div className="font-semibold text-white text-sm md:text-base">{item.name}</div>
                              <div className="text-orange-300 text-sm">{item.role}</div>
                              <div className="text-white/60 text-xs md:text-sm">{item.company} • Absolvent {item.year}</div>
                            </div>
                          </div>

                          {/* Rating */}
                          <div className="flex justify-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-3 h-3 md:w-4 md:h-4 ${
                                  i < item.rating ? 'text-yellow-400 fill-current' : 'text-gray-400'
                                }`} 
                              />
                            ))}
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </animated.div>

                {/* Right Arrow */}
                <button
                  onClick={nextTestimonial}
                  className="absolute right-2 md:right-0 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 glass rounded-full border border-white/10 hover:border-red-400/50 transition-all duration-300 hover:scale-110 group"
                  aria-label="Další testimonial"
                >
                  <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white/70 group-hover:text-white transition-colors" />
                </button>
              </div>

              {/* Navigation dots */}
              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentTestimonial 
                        ? 'gradient-accent w-8' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {activeTab === 'projects' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <animated.div
                  key={project.id}
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateY(0px)' : 'translateY(30px)',
                    transition: `all 0.5s ease ${index * 0.1}s`,
                  }}
                  className="group"
                >
                  <div className="glass rounded-2xl overflow-hidden border border-white/10 hover:border-red-400/30 transition-all duration-300">
                    {/* Project image */}
                    <div className="aspect-video bg-gradient-to-br from-red-500/20 to-orange-500/20 relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 gradient-accent rounded-full flex items-center justify-center">
                          <Trophy className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Project info */}
                    <div className="p-6">
                      <h3 className="font-bold text-white mb-2 group-hover:text-orange-300 transition-colors">
                        {project.title}
                      </h3>
                      
                      <p className="text-white/70 text-sm mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-white/5 rounded text-xs text-white/80"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Author and link */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-white/60">
                          {project.author}
                        </span>
                        
                        {project.link && (
                          <button className="text-red-400 hover:text-orange-400 transition-colors">
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </animated.div>
              ))}
            </div>
          )}

          {/* Achievements */}
          {activeTab === 'achievements' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                
                return (
                  <animated.div
                    key={index}
                    style={{
                      opacity: inView ? 1 : 0,
                      transform: inView ? 'scale(1)' : 'scale(0.9)',
                      transition: `all 0.5s ease ${index * 0.1}s`,
                    }}
                    className="text-center"
                  >
                    <div className="glass rounded-2xl p-8 border border-white/10 hover:border-red-400/30 transition-all duration-300 hover:scale-105">
                      {/* Icon */}
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 gradient-accent rounded-full flex items-center justify-center">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                      </div>

                      {/* Value */}
                      <div className="text-3xl font-bold text-white mb-2">
                        {achievement.value}
                      </div>

                      {/* Label */}
                      <div className="text-white/70 text-sm">
                        {achievement.label}
                      </div>
                    </div>
                  </animated.div>
                );
              })}
            </div>
          )}
        </div>
      </animated.div>
    </section>
  );
};