import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GearItem } from '@/lib/types';
import { Star, MapPin, Tag, ArrowRight } from 'lucide-react';

interface GearCardProps {
  gear: GearItem;
}

export function GearCard({ gear }: GearCardProps) {
  return (
    <div className="group glass-card rounded-2xl overflow-hidden flex flex-col h-full border border-slate-200 dark:border-slate-800/80">
      {/* Thumbnail Header */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
        <Image
          src={gear.images[0] || 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80'}
          alt={gear.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

        {/* Category Pill */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-950/80 text-emerald-400 border border-emerald-500/30 backdrop-blur-md">
          <Tag className="w-3 h-3" />
          {gear.category}
        </div>

        {/* Availability Badge */}
        <div className="absolute top-3 right-3">
          {gear.status === 'ACTIVE' ? (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 backdrop-blur-md">
              In Stock ({gear.quantityTotal})
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/40 backdrop-blur-md">
              Unavailable
            </span>
          )}
        </div>

        {/* Price Tag Overlay bottom right */}
        <div className="absolute bottom-3 right-3 bg-slate-950/90 border border-slate-800 rounded-xl px-3 py-1.5 backdrop-blur-md text-right">
          <span className="text-xs text-slate-400 block font-medium">Daily Rate</span>
          <span className="text-lg font-extrabold text-white text-emerald-400">${gear.pricePerDay}</span>
          <span className="text-xs text-slate-400">/day</span>
        </div>
      </div>

      {/* Body Info */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Location & Brand */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">{gear.brand}</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
              {gear.location}
            </span>
          </div>

          {/* Title */}
          <Link href={`/gear/${gear.id}`} className="block">
            <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
              {gear.name}
            </h3>
          </Link>

          {/* Description snippet */}
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {gear.description}
          </p>
        </div>

        {/* Card Footer */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs">
            <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span className="font-bold text-slate-900 dark:text-white">{gear.rating}</span>
            <span className="text-slate-500 dark:text-slate-400">({gear.reviewCount})</span>
          </div>

          <Link
            href={`/gear/${gear.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-500 dark:group-hover:text-emerald-300 group-hover:translate-x-0.5 transition-all"
          >
            Rent Details <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}