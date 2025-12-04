'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const Sidebar = ({ color }: { color: string }) => {
    const pathname = usePathname();
    const chapter = pathname.split('/')[1] || 'cs';
    const [collapsed, setCollapsed] = useState(false);

    const sidebarLinks = [
        {
            route: `/${chapter}`,
            label: 'Home',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                    <path d="M3 10a2 2 0 0 1 .71-1.53l7-6a2 2 0 0 1 2.58 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                </svg>
            )
        },
        {
            route: `/${chapter}/about`,
            label: 'About',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78
            4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77
            4 4 0 0 1 0-6.76Z" />
                    <line x1="12" x2="12" y1="16" y2="12" />
                    <line x1="12" x2="12.01" y1="8" y2="8" />
                </svg>
            )
        },
        {
            route: `/${chapter}/gallery`,
            label: 'Gallery',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="m20 13.7-2.1-2.1a2 2 0 0 0-2.8 0L9.7 17" />
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a2.5 2.5 0 0 1 0-5H20" />
                    <circle cx="10" cy="8" r="2" />
                </svg>
            )
        },
        {
            route: `/${chapter}/projects`,
            label: 'Projects',
            icon: (
                <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m10.051 8.102-3.778.322-1.994 1.994a.94.94 0 0 0 .533 1.6l2.698.316m8.39 1.617-.322 3.78-1.994 1.994a.94.94 0 0 1-1.595-.533l-.4-2.652m8.166-11.174a1.366 1.366 0 0 0-1.12-1.12c-1.616-.279-4.906-.623-6.38.853-1.671 1.672-5.211 8.015-6.31 10.023a.932.932 0 0 0 .162 1.111l.828.835.833.832a.932.932 0 0 0 1.111.163c2.008-1.102 8.35-4.642 10.021-6.312 1.475-1.478 1.133-4.77.855-6.385Zm-2.961 3.722a1.88 1.88 0 1 1-3.76 0 1.88 1.88 0 0 1 3.76 0Z" />
                </svg>
            )
        },
        {
            route: `/${chapter}/events`,
            label: 'Events',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M8 2v4" />
                    <path d="M16 2v4" />
                    <rect width="18" height="18" x="3" y="4" rx="2" />
                    <path d="M3 10h18" />
                </svg>
            )
        },
        {
            route: `/${chapter}/podcasts`,
            label: 'Podcasts',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="11" r="2" />
                    <path d="M12 2a9 9 0 0 1 9 9" />
                    <path d="M12 2a9 9 0 0 0-9 9" />
                    <path d="M5 20a7 7 0 0 1 14 0" />
                </svg>
            )
        },
        {
            route: `/${chapter}/quizzes`,
            label: 'Quizzes',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M12 21V7" />
                    <path d="m16 12 2 2 4-4" />
                    <path d="M22 6V4a1 1 0 0 0-1-1h-5a4 4 0 0 0-4 4 4 4 0 0 0-4-4H3a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h6a3 3 0 0 1 3 3 3 3 0 0 1 3-3h6a1 1 0 0 0 1-1v-1.3" />
                </svg>
            )
        },
        {
            route: `/dashboard`,
            label: 'Dashboard',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <rect width="7" height="9" x="3" y="3" rx="1" />
                    <rect width="7" height="5" x="14" y="3" rx="1" />
                    <rect width="7" height="9" x="14" y="12" rx="1" />
                    <rect width="7" height="5" x="3" y="16" rx="1" />
                </svg>
            )
        },
    ];

    function OpenIcon() {
        return (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 12h16" />
                <path d="M4 6h16" />
                <path d="M4 18h16" />
            </svg>
        );
    }

    function CloseIcon() {
        return (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18" />
                <path d="M6 6l12 12" />
            </svg>
        );
    }

    return (
        <div className='flex gap-1'>
            <aside
                className={cn(
                    "h-screen border-r fixed top-20 left-0 bottom-0 transition-all duration-300 flex flex-col z-40",
                    collapsed ? "w-[70px]" : "w-[260px]"
                )}
                style={{ backgroundColor: `var(--${color})` }}
            >
                <nav className="flex flex-col gap-2 px-2 mt-3">
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className={cn('z-50 cursor-pointer text-white p-4 rounded-lg transition')}
                    >
                        {collapsed ? <OpenIcon /> : <CloseIcon />}
                    </button>

                    {sidebarLinks.map(({ route, label, icon }) => {
                        const isActive = pathname === route;

                        return (
                            <Link
                                key={label}
                                href={route}
                                className={cn(
                                    'flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:bg-white/20',
                                    { 'justify-center': collapsed }
                                )}
                                style={{
                                    color: isActive ? `var(--${color})` : 'white',
                                    backgroundColor: isActive ? 'white' : 'transparent',
                                }}
                            >
                                {React.cloneElement(icon as React.ReactElement<{ stroke?: string }>, {
                                    stroke: isActive ? `var(--${color})` : 'currentColor'
                                })}
                                {!collapsed && <span className="text-lg font-medium">{label}</span>}
                            </Link>
                        );
                    })}
                </nav>
            </aside>
        </div>
    );
};

export default Sidebar;
