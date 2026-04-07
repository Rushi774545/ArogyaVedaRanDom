import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Menu, X, Smartphone, Heart, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const ModernNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navLinks = [
    { name: 'Wellness', href: '#wellness', icon: Heart },
    { name: 'Vedas', href: '#journey', icon: BookOpen },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-3' : 'py-6'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className={`glass rounded-2xl px-6 py-3 flex items-center justify-between transition-all ${
          isScrolled ? 'shadow-lg' : 'bg-white/40'
        }`}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-[var(--color-primary)] rounded-xl flex items-center justify-center text-white transition-transform group-hover:rotate-12">
              <Leaf size={24} />
            </div>
            <span className="text-2xl font-bold tracking-tight text-[var(--color-primary)]">
              Arogya<span className="text-[var(--color-secondary)]">Veda</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-[var(--color-text-light)] hover:text-[var(--color-primary)] transition-colors flex items-center gap-2"
              >
                <link.icon size={16} />
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/login" className="text-sm font-semibold text-[var(--color-primary)] hover:opacity-80">
              Sign In
            </Link>
            <Link to="/register" className="btn-primary py-2 px-6 text-sm">
              Get Started
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-[var(--color-primary)]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass mx-6 mt-2 rounded-2xl overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium text-[var(--color-text)] flex items-center gap-3"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <link.icon size={20} className="text-[var(--color-primary)]" />
                  {link.name}
                </a>
              ))}
              <hr className="border-white/20" />
              <Link to="/login" className="text-lg font-semibold text-[var(--color-primary)]">
                Sign In
              </Link>
              <Link to="/register" className="btn-primary text-center">
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default ModernNavbar;
