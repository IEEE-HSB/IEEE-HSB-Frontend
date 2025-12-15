"use client";
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import Slider from "react-slick";
import axios from "axios";
import Calendar from "@/assets/icons/calendar";
import { useThemeContext } from "@/context/ThemeContext";
import Location from "@/assets/icons/location";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LoadingSpinner from "../common/LoadingSpinner";


interface EventItem {
    id: number;
    name: string;
    details: string;
    location: string;
    image: string;
    date: string; // YYYY-MM-DD
}

type EventsData = Record<string, EventItem[]>;

export default function EventsTimeline() {
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState<string>(currentYear.toString());
    const { isDark } = useThemeContext()


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
           
    }, [data]);

    const events = useMemo(()=>{
        if (!data) return []
         return Object.values(data).flat()
    },[data])

    const filteredEvents = useMemo(() => {
            return events.filter((event) => event.date.split('-')[0] == selectedYear)
        }, [events, selectedYear])
    

    if (isLoading) return <div className="flex justify-center items-center py-20">
        <LoadingSpinner />
    </div>;
    if (isError)
        return <div className="flex justify-center items-center py-20">Error fetching events: {error.message}</div>;


    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
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
                            className={`cursor-pointer ${selectedYear === year ? "text-white" : ""} inline-block`}
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
                <div className="h-cards overflow-y-auto w-100 md:w-3/4 my-20 m-auto">
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

                                        <div
  className="lg:w-[40%] h-48 sm:h-64 lg:h-auto lg:me-10 border border-black rounded-xl lg:mt-0 m-7 box-border"
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
                            <div className="flex justify-center items-center py-20">No events found.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
