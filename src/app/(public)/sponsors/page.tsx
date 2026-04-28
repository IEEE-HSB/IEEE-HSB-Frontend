'use client'
import React from 'react';
import { Handshake, ArrowUpRight, Plus } from 'lucide-react';
import sponsors from "@/data/SponsorsData";
import Image from 'next/image';
import Link from 'next/link';

const SponsorsPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-background transition-colors duration-500 pb-20">
      
      <section className="relative pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-foreground mb-6 uppercase">
            OUR <span className="text-ieee-blue-100">SPONSORS</span>
          </h1>
          <p className="max-w-xl text-muted-foreground text-lg font-medium border-l-2 border-ieee-gold-100 pl-6 italic">
            Celebrating the industry leaders and sponsors who drive our success forward.
          </p>
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto">
        <div className="flex flex-col">
          {sponsors.map((sponsor, index) => (
            <div 
              key={index}
              className="group relative grid grid-cols-1 md:grid-cols-[150px_1fr] py-10 border-b border-border hover:bg-ieee-blue-20/10 transition-all duration-500 px-4 rounded-xl items-center"
            >
              <div className="mb-4 md:mb-0">
                <span className="text-4xl font-black text-muted-foreground/20 group-hover:text-ieee-blue-100 transition-colors">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Content Column */}
              <div className="relative">
                {/* Gold Accent for the first 3 */}
                {index < 3 && (
                    <div className="absolute -left-4 top-0 bottom-0 w-1 bg-ieee-gold-100 rounded-full" />
                )}

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                  {/* Name Side */}
                  <div className="flex-grow">
                    <h2 className="text-3xl md:text-5xl font-black text-foreground group-hover:translate-x-2 transition-transform duration-300 uppercase italic tracking-tighter">
                      {sponsor.title}
                    </h2>
                    <div className="mt-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-ieee-gold-100 opacity-0 group-hover:opacity-100 transition-all">
                        <Plus size={14} /> Official Partner
                    </div>
                  </div>

                  {/* Logo Side (High Contrast) */}
                  <div className="flex-shrink-0">
                    <div className="w-48 h-28 md:w-64 md:h-36 rounded-[2rem] bg-white dark:bg-ieee-black-100 flex items-center justify-center p-8 border border-transparent group-hover:border-ieee-blue-100 group-hover:shadow-2xl transition-all duration-500 overflow-hidden">
                      <Image 
                        src={sponsor.src} 
                        alt={sponsor.title} 
                        width={250} 
                        height={120}
                        className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Footer CTA --- */}
      <section className="mt-32 text-center px-6">
        <div className="inline-block p-[1px] rounded-full bg-gradient-to-r from-transparent via-ieee-gold-100 to-transparent w-full max-w-4xl mb-12 opacity-30" />
        <div className="flex flex-col items-center">
            <Handshake size={48} className="text-ieee-gold-100 mb-6 animate-pulse" />
            <h3 className="text-3xl font-black text-foreground mb-6 tracking-tight uppercase italic">Grow with IEEE Helwan</h3>
            <Link 
                href="/contact" 
                className="group flex items-center gap-3 bg-ieee-blue-100 hover:bg-ieee-black-100 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest transition-all shadow-xl"
            >
                Start Partnership
                <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
        </div>
      </section>
    </main>
  );
};

export default SponsorsPage;