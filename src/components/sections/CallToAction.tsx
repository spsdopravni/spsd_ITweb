'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSpring, animated, useInView } from '@react-spring/web';
import {
  Send, MapPin, Phone, Mail,
  CheckCircle
} from 'lucide-react';

export const CallToAction: React.FC = () => {
  const { t } = useLanguage();
  
  const tString = (key: string, fallback?: string): string => {
    const result = t(key, fallback);
    return Array.isArray(result) ? result[0] || fallback || key : result;
  };
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ref, inView] = useInView({ once: true });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const containerSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px)' : 'translateY(50px)',
  });

  const contactInfo = [
    {
      icon: MapPin,
      label: t('contact.address') || 'Adresa',
      value: t('contact.realAddress') || 'Plzeňská 298/217a, 150 00 Praha 5 - Motol',
    },
    {
      icon: Phone,
      label: t('contact.phone') || 'Telefon',
      value: t('contact.realPhone') || '+420 725 044 828',
    },
    {
      icon: Mail,
      label: t('contact.email') || 'Email',
      value: t('contact.realEmail') || 'studijnioddeleni@sps-dopravni.cz',
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">

      <animated.div ref={ref} style={containerSpring} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            {t('cta.title') || 'Začněte svou IT cestu už dnes'}
          </h2>
          
          <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">
            {t('cta.subtitle') || 'Připojte se k nám a objevte svůj potenciál v oblasti informačních technologií'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact form */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {t('cta.formTitle') || 'Máte otázky? Napište nám!'}
              </h3>
              <p className="text-white/70">
                {t('cta.formSubtitle') || 'Rádi vám poskytneme další informace o studiu'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder={tString('form.name', 'Vaše jméno')}
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 glass rounded-lg border border-white/10 focus:border-red-400 focus:outline-none text-white placeholder-white/50 transition-all duration-300"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder={tString('form.email', 'Váš email')}
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 glass rounded-lg border border-white/10 focus:border-red-400 focus:outline-none text-white placeholder-white/50 transition-all duration-300"
                    required
                  />
                </div>
              </div>

              <input
                type="tel"
                name="phone"
                placeholder={tString('form.phone', 'Telefon (nepovinné)')}
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 glass rounded-lg border border-white/10 focus:border-red-400 focus:outline-none text-white placeholder-white/50 transition-all duration-300"
              />

              <textarea
                name="message"
                placeholder={tString('form.message', 'Vaše zpráva')}
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-4 py-3 glass rounded-lg border border-white/10 focus:border-red-400 focus:outline-none text-white placeholder-white/50 resize-none transition-all duration-300"
                required
              />

              <button
                type="submit"
                disabled={isSubmitted}
                className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-semibold transition-all duration-300 ${
                  isSubmitted
                    ? 'bg-green-500 text-white'
                    : 'gradient-accent text-white hover:gradient-warm hover:scale-105 glow-spsd-hover'
                }`}
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>{t('form.sent') || 'Zpráva odeslána!'}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>{t('form.submit') || 'Odeslat zprávu'}</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact info */}
          <div className="space-y-8">
            {/* Contact information */}
            <div className="glass rounded-2xl p-8 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6">
                {t('cta.contactInfo') || 'Kontaktní informace'}
              </h3>

              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-10 h-10 gradient-accent rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-white" />
                      </div>

                      <div>
                        <div className="font-semibold text-white/90 text-sm">
                          {info.label}
                        </div>
                        <div className="text-white/70">
                          {info.value}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center glass rounded-2xl p-8 border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-4">
            {t('cta.finalTitle') || 'Připraveni začít?'}
          </h3>
          
          <p className="text-white/70 mb-6 max-w-2xl mx-auto">
            {t('cta.finalSubtitle') || 'Staňte se součástí 70leté tradice technického vzdělávání. Fakultní škola ČVUT s přímým napojením na praxi v DPP.'}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.sps-dopravni.cz/pro-uchazece/info/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 gradient-accent text-white font-semibold rounded-full hover:gradient-warm transition-all duration-300 hover:scale-105 glow-spsd-hover inline-flex items-center justify-center"
            >
              {t('cta.apply') || 'Přihlásit se ke studiu'}
            </a>

            <a
              href="https://www.sps-dopravni.cz/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border-2 border-white/20 text-white font-semibold rounded-full hover:border-red-400 hover:bg-red-400/10 transition-all duration-300 inline-flex items-center justify-center"
            >
              {t('cta.learnMore') || 'Zjistit více'}
            </a>
          </div>
        </div>
      </animated.div>
    </section>
  );
};