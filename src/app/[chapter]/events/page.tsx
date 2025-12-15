"use client";
import React, { useState, useEffect, use, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import Slider from "react-slick";
import axios from "axios";
import Calendar from "@/assets/icons/calendar";
import Location from "@/assets/icons/location";
import { useThemeContext } from "@/context/ThemeContext";
import { chaptersData } from "@/data/chaptersData";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LoadingSpinner from "@/components/common/LoadingSpinner";

interface EventItem {
    id: number;
    name: string;
    details: string;
    image: string;
    location: string;
    date: string; // YYYY-MM-DD
    chapterId: string;
}

type EventsData = Record<string, EventItem[]>;

interface ChapterEventsProps {
    params: Promise<{ chapter: string }>;

}

export default function ChapterEvents({ params }: ChapterEventsProps) {
    const resolvedParams = use(params);
    const chapterId = resolvedParams.chapter;

    const chapterInfo = chaptersData.find((ch) => ch.chapterId === chapterId);
    const mainColor = chapterInfo?.color.split("-").slice(0, 2).join("-") || "ieee-blue";

    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear.toString());
    // const [years, setYears] = useState<string[]>([]);
    // const [allEvents, setAllEvents] = useState<EventItem[]>([]);
    const { isDark } = useThemeContext();

    const { data, isLoading, isError, error } = useQuery<EventsData>({
        queryKey: ["events"],
        queryFn: async () => {
            const response = await axios.get("https://ieee-hsb-backend.vercel.app/api/events");
            return response.data.data;
        },
    });

    const years = useMemo(() => {
        if (!data) return []
        return Object.keys(data);
    }, [data])

    const chapterEvents = useMemo(() => {
        if (!data) return []
        return Object.values(data).flat().filter(
            (e) => e.chapterId && e.chapterId.toLowerCase() === chapterId.toLowerCase()
        );
    }, [data, chapterId]);

    const filteredEvents = useMemo(() => {
        return chapterEvents.filter((event) => event.date.split('-')[0] == selectedYear)
    }, [chapterEvents, selectedYear])

    useEffect(() => {
        if (years.length && !years.includes(selectedYear)) {
            setSelectedYear(years[0]);
        }
    }, [years, selectedYear]);

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <div>Error fetching events: {error.message}</div>;


    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 1280, settings: { slidesToShow: 5, slidesToScroll: 1 } },
            { breakpoint: 1024, settings: { slidesToShow: 4, slidesToScroll: 1 } },
            { breakpoint: 768, settings: { slidesToShow: 3, slidesToScroll: 1 } },
            { breakpoint: 480, settings: { slidesToShow: 2, slidesToScroll: 1 } },
        ],
    };

    return (
        <div className="overflow-x-hidden relative">
            {!isDark && <div className="absolute -z-10 inset-0 bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]"

                style={{
                    backgroundImage: `
      linear-gradient(to right, var(--${mainColor}-20) 1px, transparent 1px),
      linear-gradient(to bottom, var(--${mainColor}-20), 1px, transparent 1px)
    `,
                }}
            ></div>}
            {/* Slider Years */}
            <div className={`slider-container fixed z-10 w-full text-xl text-center bg-${mainColor}-100`}
                style={{ color: `var(--${mainColor}-60)` }}
            >
                <Slider {...settings}>
                    {years.map((year) => (
                        <div
                            key={year}
                            onClick={() => setSelectedYear(year)}
                            className={`cursor-pointer ${selectedYear === year ? "text-[#fff]" : ""} inline-block`}
                        >
                            <h3 className="font-sans font-bold md:font-black m-1">{year}</h3>
                        </div>
                    ))}
                </Slider>
            </div>

            {/* Events Cards */}
            <div
                className="relative overflow-auto bg-opacity-75"

            >
                <div className="h-cards overflow-y-auto w-3/4 my-20 m-auto">
                    <div className="space-y-6">
                        {filteredEvents.length > 0 ? (
                            filteredEvents.map((event) => (
                                <div key={event.id} className="bg-white dark:bg-ieee-blue-100 rounded-lg shadow-md overflow-hidden">
                                    <div className="flex flex-col-reverse lg:flex-row lg:my-10 text-ieee-blue-100 dark:text-gray-300">
                                        <div className="flex-1 p-6">
                                            <div className="flex justify-between sm:items-center text-xl gap-3 mb-4 font-bold font-ubuntu">
                                                <div className="flex items-center">
                                                    <Location strokeColor={isDark ? "#d1d5dc" : "#00629B"} />
                                                    <span className="text-xl">{event.location}</span>
                                                </div>
                                                <div className="flex">
                                                    <span className="px-2">{event.date.split("-")[0]}</span>
                                                    <Calendar className="relative top-1" fillColor={isDark ? "#d1d5dc" : "#207DA9"} />
                                                </div>
                                            </div>

                                            <h3 className="text-lg sm:text-xl font-black font-sans mb-3 uppercase">{event.name}</h3>
                                            <p className="text-customGray mb-6 text-base font-ubuntu font-bold">{event.details}</p>

                                            <div className="flex flex-col sm:flex-row gap-4 self-end font-sans">
                                                <button
                                                    className={`px-6 py-2 leading-7 font-black border-${mainColor}-100 text-custom-dark-blue rounded-md flex-1 hover:bg-${mainColor}-100 border-2 hover:text-gray-300 transition-colors text-lg`}
                                                >
                                                    GALLERY
                                                </button>
                                                <button
                                                    className={`px-6 py-2 font-black leading-7 text-lg border-${mainColor}-100 border-2 bg-${mainColor}-100 dark:bg-ieee-blue-100 dark:text-${mainColor}-100 rounded-md hover:bg-transparent hover:text-${mainColor}-100 flex-1 transition-colors`}
                                                >
                                                    MORE DETAILS
                                                </button>
                                            </div>
                                        </div>

                                        <div
                                            className="lg:w-[40%] h-48 sm:h-64 lg:h-auto lg:me-10 border border-black rounded-xl lg:mt-0 m-7 box-border bg-green-500"
                                            style={{
                                                backgroundImage: `url(${event.image})`,

                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                                backgroundRepeat: "no-repeat",
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-20 text-lg font-semibold">No events found for {chapterInfo?.title || chapterId} chapter.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
