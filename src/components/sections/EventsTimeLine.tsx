"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Slider from "react-slick";
import axios from "axios";
import Calendar from "@/assets/icons/calendar";
import { useThemeContext } from "@/context/ThemeContext";
import Location from "@/assets/icons/location";

interface EventItem {
    id: number;
    name: string;
    details: string;
    location: string;
    date: string; // YYYY-MM-DD
}

type EventsData = Record<string, EventItem[]>;

export default function EventsTimeline() {
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState<string>(currentYear.toString());
    const [years, setYears] = useState<string[]>([]);
    const [allEvents, setAllEvents] = useState<EventItem[]>([]);
    const { isDark } = useThemeContext()


    const { data, isLoading, error } = useQuery<EventsData>({
        queryKey: ["events"],
        queryFn: async () => {
            const response = await axios.get("http://localhost:4000/events");
            return response.data;
        },
    });


    useEffect(() => {
        if (data) {
            const newYears = Object.keys(data);
            setYears(newYears);
            setAllEvents(Object.values(data).flat());
            if (!newYears.includes(selectedYear)) {
                setSelectedYear(newYears[0] || currentYear.toString());
            }
        }
    }, [data, selectedYear, currentYear]);

    if (isLoading) return <div>Loading...</div>;
    if (error instanceof Error)
        return <div>Error fetching events: {error.message}</div>;

    const filteredEvents = allEvents.filter(
        (event) => event.date.split("-")[0] === selectedYear
    );

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3, infinite: true, dots: true } },
            { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 2, initialSlide: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ],
    };

    return (
        <div className="overflow-x-hidden">
            {/* ======= SLIDER YEARS ======= */}
            <div className=" slider-container w-full text-xl text-ieee-blue-40 text-center bg-ieee-blue-100">
                <Slider {...settings}>
                    {years.map((year) => (
                        <div
                            key={year}
                            onClick={() => setSelectedYear(year)}
                            className={selectedYear === year ? "text-[#fff] cursor-pointer" : "cursor-pointer"}
                        >
                            <h3 className="font-sans font-black my-1">{year}</h3>
                        </div>
                    ))}
                </Slider>
            </div>

            {/* ======= EVENTS CARDS ======= */}
            <div
                className="relative overflow-auto text-ieee-blue-100 bg-opacity-75"
                style={isDark ? {} : {
                     backgroundImage:
                        'linear-gradient(rgba(233, 242, 264, 0.9) , rgba(233, 242, 264, 0.9)), url("/assets/images/elecBg.png")',
            
                }}
            >
                <div className="h-cards overflow-y-auto w-3/4 my-20 m-auto">
                    <div className="space-y-6">
                        {filteredEvents.length > 0 ? (
                            filteredEvents.map((event) => (
                                <div
                                    key={event.id}
                                    className="bg-white dark:bg-ieee-blue-100 rounded-lg shadow-md overflow-hidden"
                                >
                                    <div className="flex flex-col-reverse lg:flex-row lg:my-10  text-ieee-blue-100 dark:text-gray-300">
                                        <div className="flex-1 p-6">
                                            <div className="flex justify-between sm:items-center text-xl gap-3 mb-4 font-bold font-ubuntu">
                                                <div className="flex items-center ">
                                                    <Location strokeColor={isDark ? '#d1d5dc ' : '#00629B'}></Location>
                                                    <span className="text-xl">{event.location}</span>
                                                </div>
                                                <div className="flex">
                                                    <span className="  px-2">
                                                        {event.date.split("-")[0]}
                                                    </span>
                                                    <Calendar className="relative top-1" fillColor={isDark ? '#d1d5dc ' : '#207DA9'}></Calendar>
                                                </div>
                                            </div>

                                            <h3 className="text-lg sm:text-xl font-black font-sans mb-3 uppercase">
                                                {event.name}
                                            </h3>
                                            <p className="text-customGray mb-6 text-base font-ubuntu font-bold">
                                                {event.details}
                                            </p>

                                            <div className="flex flex-col sm:flex-row gap-4 self-end font-sans">
                                                <button className="px-6 py-2 leading-7 font-black border-ieee-blue-100 dark:border-gray-300 text-custom-dark-blue rounded-md flex-1 hover:bg-ieee-blue-100 border-2 hover:text-gray-300 transition-colors text-lg">
                                                    GALLERY
                                                </button>
                                                <button className="px-6 py-2 font-black leading-7 text-lg border-ieee-blue-100 border-2 bg-ieee-blue-100 dark:bg-gray-300 text-gray-300 dark:text-ieee-blue-100 rounded-md hover:bg-transparent hover:text-ieee-blue-100 flex-1 transition-colors">
                                                    MORE DETAILS
                                                </button>
                                            </div>
                                        </div>

                                        <div className="lg:w-[40%] h-48 sm:h-64 lg:h-auto lg:me-10 border border-black rounded-xl lg:mt-0 m-7 box-border  bg-green-500"
                                            style={{
                                                backgroundImage:
                                                    'linear-gradient(rgba(255, 255, 255, 0.87), rgba(255, 255, 255, 0.87)), url("/assets/logos/ieee.png")',
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                                backgroundRepeat: "no-repeat",
                                            }}>

                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>No events found.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
