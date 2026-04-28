import React from 'react';
import { Trophy, Medal, Star, ArrowLeft, Crown, Award } from 'lucide-react';
import Link from 'next/link';
import { awardsData } from '@/data/AwardsData';

const Awards: React.FC = () => {
  const sortedAwards = [...awardsData].sort((a, b) => Number(b.year) - Number(a.year));

  return (
    <main className="min-h-screen bg-background transition-colors duration-500 pb-20">
      
      <section className="relative pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto relative z-10">
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-foreground mb-6">
            THE <span className="text-ieee-blue-100">ARCHIVE.</span>
          </h1>
          <p className="max-w-xl text-muted-foreground text-lg font-medium border-l-2 border-ieee-gold-100 pl-6">
            A comprehensive record of every victory, recognition, and milestone achieved by IEEE Helwan Student Branch.
          </p>
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto">
        <div className="flex flex-col">
          {sortedAwards.map((award, index) => (
            <div 
              key={index}
              className="group relative grid grid-cols-1 md:grid-cols-[150px_1fr] py-12 border-b border-border hover:bg-ieee-blue-20/10 transition-colors duration-500 px-4 rounded-xl"
            >
              {/* Year Column */}
              <div className="mb-4 md:mb-0">
                <span className="text-3xl font-black text-muted-foreground/30 group-hover:text-ieee-blue-100 transition-colors">
                  {award.year}
                </span>
              </div>

              {/* Content Column */}
              <div className="relative">
                {/* Decoration for Gold/Top Awards (First 2 items) */}
                {index < 2 && (
                    <div className="absolute -left-4 top-0 bottom-0 w-1 bg-ieee-gold-100 rounded-full" />
                )}

                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="max-w-3xl">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:translate-x-2 transition-transform duration-300">
                      {award.name}
                    </h2>
                    <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl">
                      {award.description}
                    </p>
                  </div>

                  {/* Icon Badge */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-muted-foreground group-hover:bg-ieee-gold-100 group-hover:text-white transition-all duration-500 group-hover:rotate-12 shadow-sm">
                      {index < 2 ? <Crown size={30} /> : <Trophy size={30} />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Footer Note --- */}
      <section className="mt-32 text-center px-6">
        <div className="inline-block p-[1px] rounded-full bg-gradient-to-r from-transparent via-ieee-gold-100 to-transparent w-full max-w-4xl mb-12" />
        <div className="flex flex-col items-center">
            <Medal size={40} className="text-ieee-black-40 mb-4" />
            <h3 className="text-xl font-bold text-foreground italic">"History is still being written."</h3>
        </div>
      </section>
    </main>
  );
};

export default Awards;