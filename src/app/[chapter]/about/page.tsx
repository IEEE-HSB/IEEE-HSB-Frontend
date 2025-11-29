'use client';
import { chaptersData } from "@/data/chaptersData";
import React, { use } from 'react';
import { Calendar, CheckCircle, Eye, Target } from 'lucide-react';
import { notFound } from "next/navigation";
export default function About({ params }: { params: Promise<{ chapter: string }> }) {
    const resolvedParams = use(params);
    const chapterData = chaptersData.find(ch => ch.chapterId === resolvedParams.chapter);

    if (!chapterData)
        notFound();

    const mainColor = chapterData.color.split('-').slice(0, 2).join('-'); // ieee-blue-100 -> ieee-blue

    return (
        <main className="flex flex-col w-full relative dark:bg-ieee-blue-100 max-w-full overflow-x-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#99a1af40_1px,transparent_1px),linear-gradient(to_bottom,#99a1af40_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]"></div>

            {/* about section */}
            <section
                className="py-20 px-4 relative overflow-hidden">
                <div className="md:max-w-6xl mx-auto relative z-10">


                    <div className="relative group mb-16">

                        <div className="relative backdrop-blur-2xl rounded-3xl py-10 px-2 md:p-16 shadow-2xl"
                            style={{
                                backgroundImage: `linear-gradient(
                                                        to bottom right,
                                                        var(--${mainColor}-80),
                                                        var(--${mainColor}-20),
                                                        var(--${mainColor}-80)
                                                        )`,
                            }}>

                            <h2 className="text-transparent bg-clip-text md:mb-8 text-center text-2xl md:text-3xl font-bold"
                                style={{
                                    backgroundImage: `linear-gradient(
                                                        to bottom right,
                                                        var(--${mainColor}-100),
                                                        var(--${mainColor}-80),
                                                        var(--${mainColor}-60)
                                                        )`,
                                    WebkitBackgroundClip: 'text',
                                }}

                            >
                                About {chapterData.chapterName}
                            </h2>

                            <p className="text-black text-xs leading-relaxed md:text-lg text-center">{chapterData.about}</p>

                        </div>

                    </div>

                    <div className=" text-center">
                        <div className="inline-block relative group">
                            <div className="absolute -inset-2 rounded-full blur-lg opacity-50 group-hover:opacity-100 transition duration-500"
                                style={{
                                    background: `linear-gradient(to bottom, var(--${mainColor}-80), var(--${mainColor}-60))`,
                                }}
                            ></div>
                            <div className="relative flex items-center gap-3 bg-white text-black backdrop-blur-xl px-8 py-4 rounded-full border shadow-2xl"
                                style={{
                                    color: `var(--${mainColor}-100)`,
                                }}
                            >
                                <Calendar className="w-6 h-6 " />
                                <span className="">Founded in {chapterData.foundedIn}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* why join us */}
            <section className=" px-4">

                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="text-center mb-12">
                        <h2 className=" font-bold text-2xl mb-4 inline-block"
                            style={{
                                color: `var(--${mainColor}-100)`,
                            }}>
                            Why Join Us
                        </h2>
                        <div className="w-32 h-1 mx-auto rounded-full"
                            style={{
                                backgroundColor: `var(--${mainColor}-100)`,
                            }}>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {chapterData.whyJoinUs.map((item, index) => (
                            <div
                                key={`${chapterData.chapterId}-${index}`}
                                className="group relative"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >

                                {/* Card */}
                                <div className="relative shadow-2xl rounded-xl p-6 h-full"
                                    style={{
                                        background: `linear-gradient(to bottom right, var(--${mainColor}-20), var(--${mainColor}-60))`,
                                    }}>
                                    <div className="flex items-start gap-4">
                                        <div className="relative">
                                            <CheckCircle className="relative w-6 h-6 flex-shrink-0 mt-1"
                                                style={{
                                                    color: `var(--${mainColor}-100)`,
                                                }} />
                                        </div>
                                        <p>{item}</p>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* vission and mission section */}
            <section className="py-20 px-4 relative overflow-hidden ">

                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Mission Card */}
                        <div className="group relative">

                            <div className="relative rounded-2xl md:px-8 px-4 py-8 shadow-2xl h-full hover:scale-[1.02] transition-transform duration-300"
                                style={{
                                    background: `linear-gradient(to bottom right, var(--${mainColor}-80), var(--${mainColor}-100))`,
                                }}>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="relative">
                                        <div className="relative p-3 rounded-lg"
                                            style={{
                                                background: `linear-gradient(to bottom right, var(--${mainColor}-80), var(--${mainColor}-100))`,
                                            }}>
                                            <Target className="w-8 h-8 text-white" />
                                        </div>
                                    </div>
                                    <h3 className="text-white">Mission</h3>
                                </div>

                                <p className="text-white leading-relaxed">{chapterData.mission}</p>

                            </div>
                        </div>

                        {/* Vision Card */}
                        <div className="group relative">

                            <div className="relative rounded-2xl md:px-8 px-4 py-8 shadow-2xl h-full hover:scale-[1.02] transition-transform duration-300"
                                style={{
                                    background: `linear-gradient(to bottom right, var(--${mainColor}-60), var(--${mainColor}-80))`,
                                }}>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="relative">

                                        <div className=" p-3 rounded-lg"
                                            style={{
                                                background: `linear-gradient(to bottom right, var(--${mainColor}-80), var(--${mainColor}-100))`,
                                            }}>
                                            <Eye className="w-8 h-8 text-white" />
                                        </div>
                                    </div>
                                    <h3 className="text-white">Vision</h3>
                                </div>

                                <p className="text-white leading-relaxed">{chapterData.vission}</p>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>

    );
}


// export default function About({ params }: { params: { chapter: string } }) {
//     const chapterData = chaptersData.find(ch => ch.chapterId === params.chapter);

//     if (!chapterData) return <div>Chapter not found</div>;
//     // const mainColor = `var(--${chapterData.color})`;
//     const mainColor = chapterData.color.split('-')[0]; //ieee-blue-100 -> ieee-blue

//     return (
//         <div>
//             <h1 className="text-2xl font-bold" style={{ color: `var(--${chapterData.color})` }}>
//                 {chapterData.title}
//             </h1>
//             <p className={`mt-5 text${mainColor}-80`}>{chapterData.brief}</p>
//             <p className="mt-4 whitespace-pre-line">{chapterData.description}</p>
//         </div>
//     );
// }
