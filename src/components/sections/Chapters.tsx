import React from 'react'
import Card from '../common/ChapterCard'
import { motion } from "framer-motion";
import { chaptersData } from '@/data/chaptersData';

export default function Chapters() {
   


    return (
        <div className="flex flex-row mx-5 flex-wrap ">
            {chaptersData.map((chapter, index) => (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -5, scale: 1.03 }}
                    transition={{
                        duration: 0.5,
                        delay: index * 0.1,
                        ease: "easeOut",
                        type: "spring",
                        stiffness: 300
                    }}

                    className={`${index === 3 ? 'md:basis-2/3' : 'md:basis-1/3'
                        } p-3 sm:basis-1/2`}
                    key={chapter.chapterId}>


                    <Card

                        chapterName={chapter.chapterName}
                        title={chapter.title}
                        brief={chapter.brief}
                        imageUrl={chapter.logo}
                        color={chapter.color}
                        chapterId={chapter.chapterId}
                    />
                </motion.div>







            ))
            }
        </div >
    )
}
