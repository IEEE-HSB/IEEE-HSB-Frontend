
"use client";

import { motion } from "framer-motion";
import { Moon } from "lucide-react";
import { useState, useEffect } from "react";

export default function Popout() {
    const [startExit, setStartExit] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setStartExit(true), 3000);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className={`fixed inset-0 flex items-center justify-center pointer-events-none z-50`}>
            <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={
                    startExit
                        ? {
                            scale: [.1],
                            opacity: [0],
                        }
                        : {
                            opacity: 1,
                            scale: 1,
                        }
                }
                transition={{
                    duration: 0.7,
                    ease: "easeInOut",
                }}
                className="from-yellow-800 to-yellow-500 bg-linear-to-r flex text-white px-8 py-4 rounded-2xl gap-2 text-xl font-bold shadow-2xl"
            >
                 Ramadan Mubarak <Moon className="text-yellow-300"/>
            </motion.div>
        </div>
    );
}