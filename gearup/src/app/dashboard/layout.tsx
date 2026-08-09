import React from 'react';
import { DashboardSidebar } from '@/components/dashboard-sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-4.5rem)] max-w-7xl mx-auto w-full">
      <DashboardSidebar />
      <div className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
        {children}
      </div>
    </div>
  );
}
