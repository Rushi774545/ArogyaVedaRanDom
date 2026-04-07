import React from 'react';
import { Leaf, Globe, MessageCircle, Send, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const ModernFooter = () => {
  return (
    <footer className="bg-[var(--color-bg)] pt-24 pb-12 border-t border-[var(--color-primary)]/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-[var(--color-primary)] rounded-xl flex items-center justify-center text-white">
                <Leaf size={24} />
              </div>
              <span className="text-2xl font-bold tracking-tight text-[var(--color-primary)]">
                Arogya<span className="text-[var(--color-secondary)]">Veda</span>
              </span>
            </Link>
            <p className="text-[var(--color-text-light)] mb-8 max-w-xs">
              Pioneering the future of holistic wellbeing by bridging ancient Ayurvedic wisdom with modern life.
            </p>
            <div className="flex gap-4">
              {[Globe, MessageCircle, Send, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white border border-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all shadow-sm">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Solutions</h4>
            <ul className="space-y-4 text-[var(--color-text-light)]">
              <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Prana Management</a></li>
              <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Dosha Analysis</a></li>
              <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Wellness Rituals</a></li>
              <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Organic Wisdom</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Company</h4>
            <ul className="space-y-4 text-[var(--color-text-light)]">
              <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Expert Team</a></li>
              <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Research</a></li>
              <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Global Impact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Support</h4>
            <ul className="space-y-4 text-[var(--color-text-light)]">
              <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-[var(--color-primary)]/5 text-center text-sm text-[var(--color-text-light)]">
          <p>© {new Date().getFullYear()} ArogyaVeda Holistic Health Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default ModernFooter;
