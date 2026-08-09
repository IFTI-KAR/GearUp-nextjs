import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { Calendar, User, Clock, ArrowRight, BookOpen, Tag } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Outdoor & Gear Blog | GearUp',
  description: 'Expert sports equipment rental guides, maintenance tips, trail reviews, and adventure news.',
};

export const BLOG_POSTS = [
  {
    id: '1',
    slug: 'ultimate-mountain-bike-buying-vs-renting-guide',
    title: 'Buying vs. Renting a Carbon Mountain Bike: The 2026 Financial Breakdown',
    excerpt: 'Is dropping $5,000+ on a high-end full suspension bike really worth it if you only hit downhill trails 10 weekends a year? We crunch the numbers.',
    category: 'Cycling',
    author: 'Sarah Jenkins',
    authorRole: 'Downhill MTB Racer',
    date: 'August 2, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
    content: `
      Mountain biking technology has evolved rapidly over the past decade. Frame geometry is longer and slacker, suspension damper designs are more responsive, and 12-speed electronic shifting is standard on mid-to-high end builds.
      
      However, with carbon fiber frames regularly topping $6,000 to $10,000, many riders are reconsidering whether buying outright makes financial sense.

      ### The Hidden Cost of Bike Ownership
      When you purchase a full-suspension bike, the initial retail price is only part of the equation:
      - **Annual Fork & Shock Service**: $250 - $400
      - **Brake Bleeds & Pad Replacements**: $100 - $150
      - **Drivetrain Wear (Chain, Cassette)**: $200 - $350
      - **Depreciation**: High-end bikes lose ~30% value in Year 1 alone.

      ### Why Renting High-End Builds Makes Sense
      Renting through platforms like GearUp allows you to ride the absolute newest model year bikes (Trek Slash, Specialized Enduro, Santa Cruz Hightower) perfectly prepped by mechanics for $65 - $95 a day.

      If you ride 12 weekends a year, your total rental cost is under $1,000 — with zero maintenance overhead, zero storage hassle, and zero depreciation.
    `
  },
  {
    id: '2',
    slug: '4-season-camping-tent-setup-in-sub-zero-weather',
    title: 'How to Properly Pitch a 4-Season Expedition Tent in High Winds',
    excerpt: 'Mastering guy-line tension, snow stake anchoring, and vestibule ventilation when camping above the treeline.',
    category: 'Camping',
    author: 'Marcus Vance',
    authorRole: 'Backcountry Guide',
    date: 'July 28, 2026',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80',
    content: `
      Camping above the treeline in sub-zero conditions requires gear you can trust 100%. A standard 3-season backpacking tent will collapse under heavy snowfall or 40mph wind gusts.

      Here is our guide to setting up 4-season expedition tents like the MSR Hubba Hubba or Mountain Hardwear Trango.

      ### Key Anchoring Rules
      1. **Never skip guy-lines**: In high winds, guy-lines transfer load directly away from pole intersections.
      2. **Deadman snow anchors**: Use buried snow stakes or sacks filled with snow instead of standard aluminum pegs.
      3. **Ventilation is mandatory**: Keep roof vents open to prevent internal frost buildup from your breath.
    `
  },
  {
    id: '3',
    slug: 'stand-up-paddleboard-sup-safety-essentials',
    title: 'Stand-Up Paddleboarding (SUP) Safety Essentials for Alpine Lakes',
    excerpt: 'Cold water shock awareness, proper PFD selection, and leash safety protocols every paddleboarder needs to know.',
    category: 'Water Sports',
    author: 'Elena Rostova',
    authorRole: 'Safety Lead',
    date: 'July 15, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=800&q=80',
    content: `
      Alpine lake paddleboarding offers breathtaking glass-like water reflections, but mountain water temperatures often stay below 55°F (12°C) even in July.

      ### Crucial Safety Gear Checklist
      - **Type III PFD or Inflatable Belt Pack**: Required by law in most state parks.
      - **Coiled Ankle Leash**: Keeps your board attached if you fall into choppy water.
      - **Dry Bag with Hydration & Whistle**: Essential for multi-hour lake tours.
    `
  }
];

export default function BlogListPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
          <BookOpen className="w-4 h-4" /> GearUp Journal & Guides
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">Adventure News & Gear Reviews</h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          In-depth equipment maintenance advice, trail recommendations, and rental tips written by industry experts.
        </p>
      </div>

      {/* Featured Blog Hero */}
      <div className="glass-panel border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 shadow-sm">
        <div className="relative h-64 lg:h-auto min-h-[300px]">
          <img
            src={BLOG_POSTS[0].image}
            alt={BLOG_POSTS[0].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-emerald-500 text-white dark:text-slate-950 font-bold text-xs">
            Featured Guide
          </div>
        </div>
        <div className="p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">{BLOG_POSTS[0].category}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {BLOG_POSTS[0].date}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {BLOG_POSTS[0].readTime}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition">
              <Link href={`/blog/${BLOG_POSTS[0].id}`}>{BLOG_POSTS[0].title}</Link>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {BLOG_POSTS[0].excerpt}
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center justify-center">
                SJ
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">{BLOG_POSTS[0].author}</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">{BLOG_POSTS[0].authorRole}</p>
              </div>
            </div>
            <Link
              href={`/blog/${BLOG_POSTS[0].id}`}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white dark:text-slate-950 font-bold text-xs transition flex items-center gap-1"
            >
              Read Article <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Grid of Other Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {BLOG_POSTS.map((post) => (
          <div
            key={post.id}
            className="glass-card border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 rounded-3xl overflow-hidden flex flex-col justify-between shadow-sm"
          >
            <div className="relative h-48">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-slate-900/80 text-emerald-400 text-[10px] font-bold backdrop-blur-md border border-slate-700">
                {post.category}
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition">
                  <Link href={`/blog/${post.id}`}>{post.title}</Link>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">By {post.author}</span>
                <Link
                  href={`/blog/${post.id}`}
                  className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                >
                  Read More <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
