
import cards from "@/data/SponsorsData";
import React from "react";


export default function SponsorsMarquee() {
    return (
        <div className="relative w-full overflow-hidden py-10 ">

            <div className="flex w-max animate-marquee hover:paused">
                {[...cards, ...cards].map((card, index) => (
                    <div
                        key={index}
                        className="mx-4 w-50 flex items-center justify-center rounded-2xl bg-white dark:bg-[#0F172B] shadow-lg border-t-2 border-b-2 border-ieee-blue-100 p-4"
                    >
                        <img src={card.src} className="w-full p-2" alt={card.title} />
                    </div>
                ))}
            </div>
        </div>
    );

}
