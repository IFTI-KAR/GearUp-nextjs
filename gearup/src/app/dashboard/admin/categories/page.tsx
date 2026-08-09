'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import { Grid, Plus, Trash2, Edit } from 'lucide-react';

const INITIAL_CATEGORIES = [
  { id: '1', name: 'Cycling', itemCount: 124, status: 'ACTIVE' },
  { id: '2', name: 'Camping', itemCount: 256, status: 'ACTIVE' },
  { id: '3', name: 'Water Sports', itemCount: 92, status: 'ACTIVE' },
  { id: '4', name: 'Winter Sports', itemCount: 148, status: 'ACTIVE' },
  { id: '5', name: 'Fitness & Gym', itemCount: 182, status: 'ACTIVE' },
  { id: '6', name: 'Climbing', itemCount: 76, status: 'ACTIVE' },
];

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [newCatName, setNewCatName] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    const newCat = {
      id: String(Date.now()),
      name: newCatName.trim(),
      itemCount: 0,
      status: 'ACTIVE',
    };
    setCategories([...categories, newCat]);
    setNewCatName('');
    toast.success(`Category "${newCat.name}" added successfully!`);
  };

  const handleDelete = (id: string, name: string) => {
    setCategories(categories.filter((c) => c.id !== id));
    toast.success(`Category "${name}" removed.`);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="space-y-1">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Equipment Category Management</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">Add, edit, and organize marketplace categories</p>
      </div>

      {/* Add New Category Form */}
      <form onSubmit={handleAdd} className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 flex flex-col sm:flex-row gap-3 shadow-sm">
        <input
          type="text"
          placeholder="New Category Name (e.g. Kayaking, Trekking)..."
          value={newCatName}
          onChange={(e) => setNewCatName(e.target.value)}
          className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-white dark:text-slate-950 font-bold text-xs transition flex items-center justify-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </form>

      {/* Category List */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 space-y-4 shadow-sm">
        <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
          <Grid className="w-5 h-5 text-amber-500" /> Active Platform Categories
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between"
            >
              <div>
                <span className="font-bold text-slate-900 dark:text-white text-sm block">{cat.name}</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">{cat.itemCount} listed items</span>
              </div>
              <button
                onClick={() => handleDelete(cat.id, cat.name)}
                className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-500/10 transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
