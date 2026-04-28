import React from 'react';
import { Trophy, Medal, ArrowRight } from 'lucide-react';
import { awardsData } from '@/data/AwardsData';
import Link from 'next/link'; 

const AwardsSection: React.FC = () => {
  const featuredAwards = awardsData.slice(0, 3);

  return (
    <section className="py-24 px-6 bg-background relative overflow-hidden transition-colors duration-500">
      {/* Background Blurs */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-ieee-blue-100 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-ieee-gold-100 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header with View All Link */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-ieee-gold-100 mb-3">
              Achievements
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              A Legacy of <span className="text-ieee-blue-100">Winning.</span>
            </h3>
          </div>
          
          <Link 
            href="/awards" 
            className="group flex items-center gap-2 bg-ieee-blue-100 hover:bg-ieee-blue-80 text-white px-6 py-3 rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-ieee-blue-100/20"
          >
            View All Awards
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* The Grid (Featured Only) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredAwards.map((award, index) => (
            <div 
              key={index}
              className="group relative bg-card border border-border/50 p-8 rounded-[2rem] hover:border-ieee-gold-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-ieee-blue-100/5"
            >
              <div className="mb-8 flex justify-between items-start">
                <div className="p-4 rounded-2xl bg-ieee-gold-20 text-ieee-gold-100 group-hover:scale-110 transition-transform duration-500">
                  <Trophy size={28} />
                </div>
                <span className="text-4xl font-black text-muted-foreground/10 group-hover:text-ieee-gold-100/20 transition-colors">
                  {award.year}
                </span>
              </div>

              <h4 className="text-xl font-bold text-foreground mb-3 group-hover:text-ieee-blue-100 transition-colors">
                {award.name}
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                {award.description}
              </p>

              <div className="mt-8 w-10 h-1 bg-ieee-gold-100/30 group-hover:w-full group-hover:bg-ieee-gold-100 transition-all duration-700 rounded-full" />
            </div>
          ))}
        </div>

        <div className="mt-20 p-8 rounded-[2.5rem] bg-gradient-to-br from-ieee-blue-100 to-ieee-blue-80 text-white flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
            <div className="absolute right-0 top-0 opacity-10 -rotate-12 translate-x-1/4">
                <Trophy size={200} />
            </div>
            
            <div className="flex items-center gap-6 relative z-10">
                <div className="bg-white/10 p-4 rounded-full backdrop-blur-md">
                    <Medal size={40} className="text-ieee-gold-100 animate-pulse" />
                </div>
                <div className="text-left">
                    <h4 className="text-2xl font-bold italic">And Still Competing...</h4>
                    <p className="text-ieee-blue-20 text-sm max-w-sm">
                        Our trophy cabinet is growing every year. Join us to be part of the next win.
                    </p>
                </div>
            </div>
            
            {/* <Link 
                href="/competition-registeration" 
                className="relative z-10 bg-white text-ieee-blue-100 px-8 py-3 rounded-full font-bold hover:bg-ieee-gold-20 hover:text-ieee-gold-100 transition-colors shadow-xl"
            >
                Join the Team
            </Link> */}
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;