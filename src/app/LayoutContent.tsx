'use client';

import { Footer } from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import { StarryBackground } from "@/components/figma/StaryBackground";
import { useThemeContext } from "@/context/ThemeContext";
import { useState } from "react";
import { GameModal } from "@/components/game/GameModal";
import { Gamepad2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isDark } = useThemeContext();
  const [isGameOpen, setIsGameOpen] = useState(false);

  const pathname = usePathname();

  const hideFooter = pathname.startsWith('/cs') ||
    pathname.startsWith('/wie') ||
    pathname.startsWith('/ras') ||
    pathname.startsWith('/pes') ||
    pathname.startsWith('/comsoc')||
    pathname.startsWith('/dashboard');
  
  // const hideNavbar = pathname.startsWith('/dashboard');  

  return (
    <>
      {isDark && <StarryBackground />}
      <Toaster position="top-center" reverseOrder={false} />
      <div className="mb-20">
 <Navbar />    </div>

      {children}
      {!hideFooter && (
        <button
          onClick={() => setIsGameOpen(true)}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-ieee-aqua-80 to-ieee-cyan-80 text-white px-8 py-4 rounded-full shadow-2xl hover:shadow-ieee-yellow-100/50 hover:scale-105 transition-all duration-300 flex items-center gap-3 z-50 group border-2 border-ieee-yellow-100/30"
        >
          <Gamepad2 className="w-6 h-6 group-hover:rotate-12 transition-transform" />
          <span>Play IEEE Game</span>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FFD100]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
        </button>
      )}

      {/* Game Modal */}
      <GameModal isOpen={isGameOpen} onClose={() => setIsGameOpen(false)} />
      {!hideFooter && <Footer />}
    </>
  );
}