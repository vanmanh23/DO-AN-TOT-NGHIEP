import React from 'react';
import { Sparkles } from 'lucide-react';

interface AiConsultButtonProps {
  onClick?: () => void;
  isLoading?: boolean;
}

const AiConsultButton: React.FC<AiConsultButtonProps> = ({ onClick, isLoading = false }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isLoading}
      className={`
        group relative w-full flex items-center justify-center gap-2.5
        py-1 px-5
        bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600
        hover:from-indigo-500 hover:via-purple-500 hover:to-fuchsia-500
        text-white font-semibold text-sm tracking-wide
        rounded-lg
        shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40
        border border-white/10
        transition-all duration-300 ease-out
        active:scale-[0.98]
        ${isLoading ? 'opacity-70 cursor-wait' : 'cursor-pointer'}
      `}
    >
      {/* Icon: Hiệu ứng xoay nhẹ khi hover hoặc lấp lánh */}
      <Sparkles 
        size={18} 
        className={`text-indigo-100 ${isLoading ? 'animate-spin' : 'group-hover:animate-pulse'}`} 
      />
      
      <span>
        {isLoading ? 'Đang phân tích...' : 'AI Tư vấn dinh dưỡng'}
      </span>

      {/* Hiệu ứng Shine (vệt sáng lướt qua khi hover) - Optional */}
      <div className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:left-[200%] transition-all duration-700 ease-in-out" />
      </div>
    </button>
  );
};

export default AiConsultButton;