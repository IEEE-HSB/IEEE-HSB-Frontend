"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion";
import { useThemeContext } from "@/context/ThemeContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import IeeeLogo from "@/assets/logos/ieeeLogo";
import IeeeHelwan from "@/assets/logos/ieeeHelwan";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    const { isDark, toggleTheme } = useThemeContext();


    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDark]);

    const navLinks = [
        { name: "Home", page: "home" },
        { name: "About", page: "about" },
        { name: "Events", page: "events" },
        { name: "Projects", page: "projects" },
        { name: "Announcements", page: "announcements" },
        { name: "Gallery", page: "gallery" },
        { name: "Contact", page: "contact" },
    ];

   
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
    ${isScrolled
                    ? "bg-white/90 dark:bg-ieee-blue-100 backdrop-blur-xl shadow-md border-b border-border"
                    : "dark:bg-ieee-blue-100/5 bg-white/5 backdrop-blur-lg"
                }`}
        >

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-3 group"
                    >

                        {/* logo 207DA9*/}
                        <div className="relative">
                            <div className=" absolute inset-0 bg-gradient-to-br from-[#004d7a] to-[white] rounded-xl blur-lg opacity-35 transition-opacity" />
                            <IeeeLogo size={50} fillColor={isDark?'white':'#207DA9'}></IeeeLogo>
                        </div>

                        <div className="flex flex-col items-start">
                        <IeeeHelwan width={170} height={50}  fillColor={isDark?'white': '#207DA9'}/>
                           </div>
                    </motion.button>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const href = `/${link.page === "home" ? "" : link.page}`;
                            const isActive = pathname === href;

                            return (
                                <motion.div
                                    key={link.page}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="relative px-4 py-2 group"
                                >
                                    <Link
                                        href={href}
                                        className={`relative z-10 transition-colors text-ieee-blue-100 dark:text-white duration-300 ${isActive
                                            ? "text-ieee-blue-100! dark:text-ieee-yellow-100!"
                                            : "text-foreground hover:text-ieee-blue-100! dark:hover:text-ieee-yellow-100!"
                                            }`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>

                                    {/* Underline animation */}
                                    <motion.div
                                        className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full transition-all duration-300 ${isActive
                                            ? "bg-[#00629B] dark:bg-[#FFD100] opacity-100"
                                            : "bg-gradient-to-r from-ieee-blue-80 to-ieee-blue-100 dark:from-ieee-gold-60 dark:to-ieee-gold-100 opacity-0"
                                            }`}
                                    />
                                </motion.div>
                            );
                        })}
                    </div>


                    {/* Right side buttons */}
                    <div className="flex items-center gap-3">
                        {/* Theme Toggle */}
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleTheme}
                                className="relative w-11 h-11 rounded-full border border-border bg-background/50 hover:bg-accent"
                            >
                                <AnimatePresence mode="wait">
                                    {isDark ? (
                                        <motion.div
                                            key="sun"
                                            initial={{ rotate: -90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: 90, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Sun className="h-5 w-5 text-[#FFD100]" />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="moon"
                                            initial={{ rotate: 90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: -90, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Moon className="h-5 w-5 text-[#00629B]" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </Button>
                        </motion.div>

                        {/* Login Button */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="hidden md:block"
                        >
                            <Button
                                className="relative overflow-hidden bg-gradient-to-r from-ieee-blue-80 to-ieee-blue-100 text-white border-0 px-6 h-11 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                            >
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-ieee-gold-60 to-ieee-gold-100 opacity-0 hover:opacity-100 transition-opacity"
                                    whileHover={{ opacity: 1 }}
                                />
                                <Link href='/login' className="relative z-10">Login</Link>
                            </Button>
                        </motion.div>

                        {/* Mobile menu button */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden w-11 h-11 rounded-full border border-border bg-background/50 flex items-center justify-center hover:bg-accent transition-colors"
                        >
                            <AnimatePresence mode="wait">
                                {isMobileMenuOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                    >
                                        <X className="h-6 w-6" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                    >
                                        <Menu className="h-6 w-6" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </div>

              {/* Mobile Menu */}
<AnimatePresence>
  {isMobileMenuOpen && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="lg:hidden overflow-hidden"
    >
      <div className="py-4 space-y-1 bg-card/50 backdrop-blur-xl rounded-2xl my-2 border border-border shadow-lg">
        {navLinks.map((link, index) => {
          const href = `/${link.page === "home" ? "" : link.page}`;
          const isActive = pathname === href;

          return (
            <motion.div
              key={link.page}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                href={href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block w-full text-left px-6 py-3 rounded-lg mx-2 transition-colors duration-200 ${
                  isActive
                    ? "bg-ieee-blue-100/20 text-ieee-blue-100 dark:text-ieee-yellow-100 border-l-4 border-ieee-blue-100 dark:border-ieee-yellow-100"
                    : "hover:bg-ieee-blue-100/10 "
                }`}
              >
                {link.name}
              </Link>
            </motion.div>
          );
        })}

        {/* Login / Register Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: navLinks.length * 0.05 }}
        >
          <Link
            href="/login"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block w-full text-left px-6 py-3 mx-2 bg-gradient-to-r from-ieee-blue-80 to-ieee-blue-100 text-white rounded-lg hover:shadow-lg transition-shadow"
          >
            Login / Register
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )}
</AnimatePresence>

        </div>
        </motion.nav >
    );
}


//   <div className="py-4 space-y-1 bg-card/50 backdrop-blur-xl rounded-2xl my-2 border border-border shadow-lg">
//                                 {navLinks.map((link, index) => (
//                                     <motion.button
//                                         key = { link.page }
//                                         initial = {{ opacity: 0, x: -20 }}
//                                 animate={{ opacity: 1, x: 0 }}
//                                 transition={{ delay: index * 0.05 }}
//                                         // onClick={() => handleNavClick(link.page)}
//                                 className={'block w-full text-left px-6 py-3 transition-colors rounded-lg mx-2 '
//                                     //     ${
//                                     //   currentPage === link.page
//                                     //     ? "bg-[#00629B]/10 dark:bg-[#FFD100]/10 text-[#00629B] dark:text-[#FFD100]"
//                                     //     : "hover:bg-accent"
//                                     // }
//                                 }
//                                     >
//                                 {link.name}
//                             </motion.button>
// )                                }))
//                             <motion.button
//                                 initial={{ opacity: 0, x: -20 }}
//                                 animate={{ opacity: 1, x: 0 }}
//                                 transition={{ delay: navLinks.length * 0.05 }}
//                                 //   onClick={() => handleNavClick("login")}
//                                 className="block w-full text-left px-6 py-3 mx-2 bg-gradient-to-r from-ieee-blue-80 to-ieee-blue-100 text-white rounded-lg hover:shadow-lg transition-shadow"
//                             >
//                                 Login / Register
//                             </motion.button>
//                         </div>