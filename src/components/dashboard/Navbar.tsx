'use client'
import { UserContext } from '@/context/UserContext';
import Link from 'next/link';
import { useContext, useState } from 'react';
export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const {user} = useContext(UserContext)
console.log("USER =", user)
  return (
    <>
      <nav className="fixed top-20 z-50 w-full bg-linear-to-b from-ieee-blue-80 to-ieee-blue-60  border-default">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} type="button" className=" box-border border border-transparent cursor-pointer text-white leading-5 text-lg p-2 ">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="M5 7h14M5 12h14M5 17h10" />
                </svg>
              </button>
              <Link href="/dashboard" className="flex ms-2 md:me-24">
                <span className="self-center text-lg sm:text-3xl font-semibold whitespace-nowrap text-white">Dashboard</span>
              </Link>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3 relative">
                <div>
                  <button onClick={() => setDropdownOpen(!dropdownOpen)} type="button" className="flex cursor-pointer text-sm rounded-full focus:ring-4 focus:ring-ieee-blue-100">
                    <span className="sr-only">Open user menu</span>
                    <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo" />
                  </button>
                </div>
                <div className={`z-50 text-white bg-linear-to-b from-ieee-blue-80 to-ieee-blue-60 rounded shadow-lg absolute right-0 mt-4 -mr-2 top-full ${dropdownOpen ? 'block' : 'hidden'
                  }`} >

                  <div className="px-4 py-3 border-b">
                    <p className="text-sm">
                      {user?.name}
                    </p>
                    <p className="text-xs text-ieee-aqua-20">
                      {user?.email}
                    </p>
                  </div>
                  <ul className="p-2 text-sm text-body font-medium">
                    <li>
                      <Link href="/dashboard/profile" className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded" role="menuitem">Profile</Link>
                    </li>
                    <li>
                      <Link href="/dashboard/settings" className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded" role="menuitem">Settings</Link>
                    </li>
                    <li>
                      <Link href="/dashboard/notifications" className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded" role="menuitem">Notifications</Link>
                    </li>
                  
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        className={`fixed text-white text-xl top-36.25 bg-linear-to-t from-ieee-blue-80 to-ieee-blue-60 left-0 z-40 w-64 h-full transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}>
        <div className="h-full px-3 py-4 overflow-y-auto ">
          
          <ul className="space-y-2 font-medium">
            <li>
              <Link href="/dashboard" className="flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group">
                <svg className="w-5 h-5 transition duration-75 group-hover:text-fg-brand" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6.025A7.5 7.5 0 1 0 17.975 14H10V6.025Z" /><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 3c-.169 0-.334.014-.5.025V11h7.975c.011-.166.025-.331.025-.5A7.5 7.5 0 0 0 13.5 3Z" /></svg>
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/announcements" className="flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group">
                <svg className="shrink-0 w-5 h-5 transition duration-75 group-hover:text-fg-brand" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v14M9 5v14M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" /></svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Announcements</span>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/events" className="flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group">
                <svg className="shrink-0 w-5 h-5 transition duration-75 group-hover:text-fg-brand" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v14M9 5v14M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" /></svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Events</span>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/gallery" className="flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group">
                <svg className="shrink-0 w-5 h-5 transition duration-75 group-hover:text-fg-brand" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 13h3.439a.991.991 0 0 1 .908.6 3.978 3.978 0 0 0 7.306 0 .99.99 0 0 1 .908-.6H20M4 13v6a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-6M4 13l2-9h12l2 9M9 7h6m-7 3h8" /></svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Gallery</span>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/users" className="flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group">
                <svg className="shrink-0 w-5 h-5 transition duration-75 group-hover:text-fg-brand" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="M16 19h4a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-2m-2.236-4a3 3 0 1 0 0-4M3 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/projects" className="flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group">
                <svg className="shrink-0 w-5 h-5 transition duration-75 group-hover:text-fg-brand" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10V6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v4m3-2 .917 11.923A1 1 0 0 1 17.92 21H6.08a1 1 0 0 1-.997-1.077L6 8h12Z" /></svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Projects</span>
              </Link>
            </li>
            <li>
              <Link href="/login" className="flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group">
                <svg className="shrink-0 w-5 h-5 transition duration-75 group-hover:text-fg-brand" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2" /></svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Sign Out</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
