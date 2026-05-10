import { ShieldAlert, CheckCircle2, Clock, Send, FileText, ArrowRight, Loader2, LogOut, Ban } from 'lucide-react';

export default function DashboardLoading() {
  return (
    <div className="py-20 md:py-32 relative overflow-hidden min-h-screen bg-mesh">
      <div className="absolute inset-0 bg-carbon opacity-20 pointer-events-none" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10 animate-pulse">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 relative z-10">
          <div className="space-y-4">
            <div className="h-4 w-40 bg-white/5 rounded-sm skeleton-shimmer" />
            <div className="h-12 w-64 bg-white/5 rounded-sm skeleton-shimmer" />
            <div className="h-4 w-56 bg-white/5 rounded-sm skeleton-shimmer" />
          </div>
          <div className="flex items-center gap-4">
            <div className="h-12 w-32 bg-white/5 rounded-sm skeleton-shimmer" />
            <div className="h-12 w-12 bg-white/5 rounded-sm skeleton-shimmer" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative z-10">
          <div className="md:col-span-2 space-y-8">
            <div className="h-64 bg-white/5 rounded-sm skeleton-shimmer" />
            <div className="h-80 bg-white/5 rounded-sm skeleton-shimmer" />
          </div>
          <div className="space-y-8">
            <div className="h-56 bg-white/5 rounded-sm skeleton-shimmer" />
            <div className="h-96 bg-white/5 rounded-sm skeleton-shimmer" />
          </div>
        </div>
      </div>
    </div>
  );
}
