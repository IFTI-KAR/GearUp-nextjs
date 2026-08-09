import React from 'react';
import { Metadata } from 'next';
import { ShieldCheck, Lock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | GearUp',
  description: 'GearUp Privacy Policy details how we collect, store, protect, and process user information.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
          <Lock className="w-4 h-4" /> Data Protection & Privacy
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">Privacy Policy</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">Last updated: August 1, 2026</p>
      </div>

      <div className="glass-panel border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 rounded-3xl p-8 space-y-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed shadow-sm">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">1. Information We Collect</h2>
          <p>We collect personal information that you voluntarily provide to us when registering for an account, submitting gear rental orders, or listing equipment. This includes your full name, email address, phone number, physical address, payment authorization metadata, and equipment photos.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">2. How We Use Your Data</h2>
          <p>Your data is strictly used to facilitate booking confirmations between rental customers and equipment providers, process secure payment transactions via PCI-DSS compliant payment gateways, prevent fraudulent accounts, and send order notifications.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">3. Payment Security & Encryption</h2>
          <p>GearUp does not store complete credit card numbers or banking secrets on our servers. Payment processing is handled exclusively through Stripe and SSLCommerz using 256-bit SSL encryption.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">4. Cookies & Local Storage</h2>
          <p>We use essential cookies and browser local storage to maintain user authentication sessions, remember your theme preference (light vs dark mode), and store active search filters.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">5. Your Data Rights</h2>
          <p>You have the right to request access to your personal data, update your profile information in settings, or request account deletion at any time by contacting support@gearup-sports.com.</p>
        </section>
      </div>
    </div>
  );
}
