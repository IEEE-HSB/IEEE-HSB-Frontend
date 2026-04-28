import sponsors from "@/data/SponsorsData";
import React from "react";

export default function SponsorsMarquee() {
  return (
    <div className="relative w-full overflow-hidden">

      <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-marquee hover:paused items-center gap-2">
        {[...sponsors, ...sponsors].map((sponsor, index) => (
          <div
            key={index}
            className="group relative mx-4 w-52 h-28 flex items-center justify-center rounded-3xl 
                       bg-white dark:bg-ieee-black-100 border border-transparent
                       transition-all duration-500 hover:scale-110"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-ieee-blue-100 to-ieee-gold-100 opacity-0 group-hover:opacity-100 transition-opacity p-[2px] -z-10" />
            
            <div className="absolute inset-px bg-white dark:bg-[#0B1222] rounded-[calc(1.5rem-1px)] -z-10" />

            <div className="absolute inset-0 bg-ieee-blue-100/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 scale-50 group-hover:scale-100" />

            <img 
              src={sponsor.src} 
              alt={sponsor.title} 
              className="max-w-32.5 max-h-17.5 w-auto h-auto object-contain 
                         drop-shadow-sm group-hover:drop-shadow-[0_0_15px_rgba(0,105,170,0.4)]
                         transition-all duration-500 group-hover:scale-105"
            />
          </div>
        ))}
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-1/2 bg-ieee-blue-100/5 blur-[120px] -z-20 pointer-events-none" />
    </div>
  );
}