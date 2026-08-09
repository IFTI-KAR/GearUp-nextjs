import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BLOG_POSTS } from '../page';
import { Calendar, Clock, ArrowLeft, Share2, Bookmark } from 'lucide-react';

interface BlogDetailProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: BlogDetailProps) {
  const resolvedParams = await params;
  const post = BLOG_POSTS.find((p) => p.id === resolvedParams.id);
  if (!post) return { title: 'Article Not Found | GearUp' };
  return {
    title: `${post.title} | GearUp Blog`,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: BlogDetailProps) {
  const resolvedParams = await params;
  const post = BLOG_POSTS.find((p) => p.id === resolvedParams.id);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Back button */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Journal & Articles
      </Link>

      {/* Article Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-xs font-semibold">
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            {post.category}
          </span>
          <span className="text-slate-400">•</span>
          <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
          <span className="text-slate-400">•</span>
          <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center justify-between pt-2 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-extrabold flex items-center justify-center text-sm">
              {post.author.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">{post.author}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{post.authorRole}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Cover Image */}
      <div className="relative h-72 sm:h-96 rounded-3xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
      </div>

      {/* Article Content */}
      <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 space-y-6 text-sm sm:text-base leading-relaxed">
        {post.content.split('\n\n').map((paragraph, idx) => {
          if (paragraph.trim().startsWith('###')) {
            return (
              <h3 key={idx} className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
                {paragraph.replace('###', '').trim()}
              </h3>
            );
          }
          return (
            <p key={idx} className="text-slate-600 dark:text-slate-300">
              {paragraph.trim()}
            </p>
          );
        })}
      </div>

      {/* Footer CTA */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 shadow-lg">
        <div>
          <h3 className="text-lg font-bold">Ready to hit the trails?</h3>
          <p className="text-xs text-emerald-100 mt-1">Rent top-rated mountain bikes, camping gear, and water sports equipment instantly.</p>
        </div>
        <Link
          href="/gear"
          className="px-6 py-3 rounded-xl bg-white text-slate-950 font-bold text-xs hover:bg-slate-100 transition shrink-0"
        >
          Explore Rental Gear
        </Link>
      </div>
    </article>
  );
}
