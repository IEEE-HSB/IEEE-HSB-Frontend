"use client";

import { Facebook, Twitter, Instagram, Linkedin, Github, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import IeeeLogo from "@/assets/logos/ieeeLogo";
import IeeeHelwan from "@/assets/logos/ieeeHelwan";
import { useThemeContext } from "@/context/ThemeContext";
import Image from "next/image";
import Link from "next/link";
export function Footer() {
  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/ieeehsb/", label: "Facebook" },
    { icon: Instagram, href: "https://www.instagram.com/ieee_hsb/", label: "Instagram" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/ieee-helwan-sb", label: "LinkedIn" },
    // { icon: Github, href: "#", label: "Github" },
  ];
  const { isDark } = useThemeContext()

  const quickLinks = [
    { name: "About Us", href: "#" },
    { name: "Events", href: "#" },
    { name: "Projects", href: "#" },
    { name: "Gallery", href: "#" },
    { name: "Contact", href: "#" },
  ];

  return (
    <footer className="relative mt-20">
      {/* Curved Top Border */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden h-24 -mt-24">
        <svg
          className="absolute bottom-0 w-full h-24"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="footerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={isDark ? '#022A57' : '#00639C'} />
              <stop offset="50%" stopColor={isDark ? '#193C67' : '#0070AD'} />
              <stop offset="100%" stopColor={isDark ? '#2E4D76' : '#007CBD'} />
            </linearGradient>
          </defs>
          <path
            d="M0,0 C300,90 900,90 1200,0 L1200,120 L0,120 Z"
            fill="url(#footerGradient)"
            className="dark:opacity-100 opacity-95"
          />
        </svg>
      </div>

      <div className="relative bg-linear-to-br from-ieee-blue-100 via-ieee-blue-80 to-ieee-blue-100 text-white">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Logo & About */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl" />
                  <IeeeLogo size={50} fillColor="white" />

                </div>
                <div>
                  <IeeeHelwan fillColor="white" />
                  <p className="text-sm text-white/70">Helwan Student Branch</p>
                </div>
              </div>
              <p className="text-white/80 mb-6 leading-relaxed max-w-md">
                Empowering innovation and fostering technological excellence for the benefit of humanity.
                3rd IEEE Student Branch created in Egypt.
              </p>
              <div className="flex gap-3 max-w-fit lg:ml-[0] mx-auto">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/20 transition-all border border-white/10 shadow-lg"
                    aria-label={social.label}
                    target="_blank"
                  >
                    <social.icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="mb-6 text-lg">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-white/70 group hover:text-white transition-colors">
                  <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0 border border-white/10 group-hover:bg-white/20 transition-colors">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="pt-2">
                    <p className="text-xs text-white/50 mb-1">Email</p>
                    <p className="text-sm">ieee.hsb.2026@gmail.com</p>
                  </div>
                </li>

              </ul>
            </motion.div>
          </div>

          {/* Chapter Colors Showcase */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-2 mb-8"
          >
            {[

              { name: "RAS", src: "/assets/logos/rasLogo.png" },
              { name: "PES", src: "/assets/logos/pesLogo.png" },
              { name: "WIE", src: "/assets/logos/wieLogo.png" },
              { name: "ComSoc", src: "/assets/logos/comsocLogo.png" },
              { name: "CS", src: "/assets/logos/csLogo.png" },
            ].map((chapter, index) => (
              <motion.div
                key={chapter.name}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0 + index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="text-sm backdrop-blur-sm flex items-center justify-center w-15 h-15"
              // style={{ backgroundColor: `${chapter.color}20` }}
              >
                <Link href={`/${chapter.name.toLowerCase()}`}>
                  <Image className={`object-contain  ${chapter.name === 'RAS' || chapter.name === 'CS' ? 'p-2' : 'p-0'}`} src={chapter.src} alt={chapter.name} width={80} height={80} />

                </Link>

              </motion.div>
            ))}
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
            className="pt-8 border-t border-white/10 text-center"
          >
            <p className="text-white/60 text-sm">
              © 2026 IEEE Helwan Student Branch. All rights reserved.
            </p>
            <p className="text-white/40 text-xs mt-2">
              Advancing Technology for Humanity
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
