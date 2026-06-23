import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({ children, className = '', hover = true }: GlassCardProps) {
  return (
    <div
      className={`bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 ${
        hover ? 'hover:bg-white/10 hover:border-[#FFD700]/30 transition-all duration-300' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
