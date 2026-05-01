'use client';
import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-30">
            <div className="max-w-5xl mx-auto px-6 h-16 flex justify-between items-center">
                <Link href="/" className="text-2xl font-serif font-bold tracking-tighter">
                    Explorer<span className="text-blue-600">.</span>
                </Link>
                
                <div className="flex items-center gap-6">
                    <Link 
                        href="/editor" 
                        className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-zinc-800 transition-colors"
                    >
                        <span className="text-lg leading-none">+</span> Write Note
                    </Link>
                </div>
            </div>
        </nav>
    );
}