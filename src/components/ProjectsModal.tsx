import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type Props = {
    images: string[];
    onClose: () => void;
    bgColor: string;
    projectName?: string;
};

export default function ProjectsModal({ images, onClose, bgColor, projectName}: Props) {
    const settings = {
        dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        waitForAnimate: false
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className={`relative ${bgColor} w-full max-w-2xl bg-neutral-primary-soft border border-default rounded-2xl shadow-sm p-4 md:p-6`}>

                {/* Header */}
                <div className="flex text-white items-center justify-between border-b border-default pb-4">
                    <h3 className="text-xl font-medium text-heading">
                        Look at this!🚀 <span className="text-lg">{projectName}</span>
                    </h3>
                    
                    <button
                        onClick={onClose}
                        className="text-body text-xl cursor-pointer w-9 h-9 inline-flex justify-center items-center"
                    >
                        ✕
                    </button>
                </div>

                {/* Slider */}
                <div className="p-6">
                    <Slider {...settings}>
                        {images.map((image, index) => (
                            <div key={index} className="flex justify-center">
                                <img
                                    src={image}
                                    alt={`Slide ${index + 1}`}
                                    className="max-h-[400px] object-contain mx-auto"
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
           
            </div>
        </div>
    );
}
