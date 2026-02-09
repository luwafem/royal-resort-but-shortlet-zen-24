import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiArrowRight } from 'react-icons/fi';
import { naijaStaysData } from '../data/naijaStaysData';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'Properties', path: '/properties' }
  ];

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Sync scroll lock when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
  }, [isMenuOpen]);

  return (
    <>
      {/* ================= HEADER ================= */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-xl border-b border-zinc-200/50 py-4'
            : 'bg-transparent py-7'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo: Editorial Style */}
            <Link to="/" className="group flex flex-col items-start">
              <span className={`text-2xl font-extralight tracking-tighter transition-colors duration-500 ${
                isScrolled ? 'text-zinc-900' : 'text-white'
              }`}>
                SAKARI<span className="font-medium ml-1">HOMES</span>
              </span>
              <span className={`text-[8px] tracking-[0.6em] uppercase transition-colors duration-500 ${
                isScrolled ? 'text-zinc-400' : 'text-white/50'
              }`}>
                Elevated Living
              </span>
            </Link>

            {/* Desktop Nav: Minimalist */}
            <nav className="hidden lg:flex items-center gap-12">
              {navigation.map(item => {
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`group relative text-[11px] tracking-[0.3em] uppercase font-medium transition-colors ${
                      active
                        ? isScrolled ? 'text-zinc-900' : 'text-white'
                        : isScrolled ? 'text-zinc-400 hover:text-zinc-900' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {item.name}
                    <span className={`absolute -bottom-2 left-0 h-[1px] bg-current transition-all duration-500 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTA: Outlined/Modern */}
            <div className="hidden lg:block">
              <a
                href={`https://wa.me/${naijaStaysData.contact.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-3 px-7 py-3 rounded-full text-[11px] uppercase tracking-widest font-bold transition-all duration-500 ${
                  isScrolled
                    ? 'bg-zinc-900 text-white hover:bg-zinc-800'
                    : 'border border-white/30 text-white hover:bg-white hover:text-zinc-900'
                }`}
              >
                Inquire <FiArrowRight className="text-lg" />
              </a>
            </div>

            {/* Mobile Toggle */}
            <button
              className={`lg:hidden p-2 transition-colors ${
                isScrolled ? 'text-zinc-900' : 'text-white'
              }`}
              onClick={() => setIsMenuOpen(true)}
            >
              <div className="flex flex-col gap-1.5 items-end">
                <span className={`h-0.5 w-8 bg-current transition-all`} />
                <span className={`h-0.5 w-5 bg-current transition-all`} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* ================= MOBILE OVERLAY ================= */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-zinc-950 text-white flex flex-col"
          >
            {/* Close Button */}
            <div className="absolute top-8 right-8">
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="w-12 h-12 flex items-center justify-center border border-white/10 rounded-full"
              >
                <FiX size={24} />
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center px-10">
              <p className="text-white/30 text-xs tracking-[0.5em] uppercase mb-12">— Menu</p>
              
              <nav className="flex flex-col gap-8">
                {navigation.map((item, idx) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * idx }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-5xl font-extralight tracking-tighter hover:italic transition-all"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-20 pt-10 border-t border-white/10"
              >
                <p className="text-white/40 text-sm mb-6 font-light">Direct Contact</p>
                <a 
                  href={`https://wa.me/${naijaStaysData.contact.whatsapp}`}
                  className="text-xl font-light underline underline-offset-8 decoration-white/20"
                >
                  Book on WhatsApp
                </a>
              </motion.div>
            </div>

            {/* Bottom Brand Stamp */}
            <div className="p-10 opacity-20">
              <span className="text-xs tracking-[1em] uppercase">SAKARI HOMES © 2026</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;