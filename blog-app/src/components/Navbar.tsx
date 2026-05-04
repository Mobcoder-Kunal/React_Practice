'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-30">
            <div className="max-w-5xl mx-auto px-6 h-16 flex justify-around items-center">
                <div className="flex items-center gap-4">
                    <Link href="/" className="text-2xl font-serif font-bold tracking-tighter mr-4">
                        Explorer<span className="text-blue-600">.</span>
                    </Link>
                    <div className="hidden md:flex items-center bg-zinc-50 border border-zinc-100 px-3 py-1.5 rounded-full">
                        <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input 
                            type="text" 
                            placeholder="Search" 
                            className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-40"
                        />
                    </div>
                </div>
                
                <div className="flex items-center gap-6">
                    <Link 
                        href="/editor" 
                        className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-zinc-800 transition-colors"
                    >
                        <span className="text-lg leading-none">+</span> Write Note
                    </Link>
                    <Link href="/our-story" className="hidden sm:block text-sm text-zinc-600 hover:text-black transition-colors">
                        Our story
                    </Link>

                    {isLoggedIn ? (
                        <>
                            {/* Authenticated View */}
                            <Link href="/editor" className="flex items-center gap-2 text-zinc-500 hover:text-black">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                <span className="text-sm hidden md:inline">Write</span>
                            </Link>

                            <button className="text-zinc-500 hover:text-black">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                            </button>

                            <div className="w-8 h-8 bg-zinc-200 rounded-full cursor-pointer hover:ring-2 ring-zinc-100 transition-all">
                                {/* User Profile Image would go here */}
                            </div>
                        </>
                    ) : (
                        <>
                            <button 
                                onClick={() => setIsLoggedIn(true)} 
                                className="text-sm text-zinc-600 hover:text-black transition-colors cursor-pointer"
                            >
                                Sign in
                            </button>
                            <Link 
                                href="/signup" 
                                className="bg-black text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-zinc-800 transition-colors"
                            >
                                Get started
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

