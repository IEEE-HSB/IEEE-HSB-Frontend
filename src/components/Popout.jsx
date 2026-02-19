
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
                            x: [0,  0,  55,    120, 250, 360, 250, 120, 55,  0,  -55,  -120, -250, -360, -250, -120, -55, 0],
                            y: [0, -360, 250, -180, -55, 0,   55,  180, 250, 360, 250, 180, 55, 0,   -55, -180, -250, -360, 0],
                            // rotate: [0, 20, -20, 30, -30, 45, 90],
                            scale: [1, .2, .2],
                            opacity: [1, 1, 1, 1, 0.9, 0.9, .9, .9, .8, .6, .6, .6, .6, 0],
                        }
                        : {
                            opacity: 1,
                            scale: 1,
                        }
                }
                transition={{
                    duration: startExit ? 3 : 0.8,
                    ease: "easeInOut",
                }}
                className="bg-ieee-blue-100 flex text-white px-8 py-4 rounded-2xl gap-2 text-xl font-bold shadow-2xl"
            >
                 Ramadan Mubarak <Moon className="text-yellow-300"/>
            </motion.div>
        </div>
    );
}