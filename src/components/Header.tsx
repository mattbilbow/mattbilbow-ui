'use client';

import Link from 'next/link';
import {useAuth} from '@/contexts/AuthContext';
import Image from "next/image";
import {useState} from 'react';

const Header = () => {
    const {logout, isAuthenticated} = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <>
            <header className="bg-light xl:px-12 py-4 fixed flex justify-between items-center left-0 right-0 top-0 z-50 px-4">
                <Link href="/posts" className="block">
                    <Image
                        src="/logo_red.svg"
                        alt="Matt Bilbow Logo"
                        width={50}
                        height={50}
                        className="flex-shrink-0 hover:animate-[spin_0.35s_linear_infinite]"
                    />
                </Link>
                <div className="flex grow" />
                <a
                    href="/mattbilbow_cv.pdf"
                    download="Matt_Bilbow_CV.pdf"
                    className="mr-5 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-dark bg-white border rounded-md hover:border-main border-gray-300 transition-all duration-200"
                >
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Resume
                </a>

                <button
                    onClick={toggleMenu}
                    className="border-0 w-8 h-8 flex flex-col justify-center items-center space-y-1 transition-opacity bg-white cursor-pointer rounded-full"
                    aria-label="Toggle menu"
                >
                    <span className={`w-5 h-0.5 bg-dark transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                    <span className={`w-5 h-0.5 bg-dark transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                </button>
            </header>

            <div
                className={`fixed top-0 right-0 h-full w-80 bg-dark z-50 transform transition-transform duration-300 ease-in-out ${
                    isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}>
                <button
                    onClick={closeMenu}
                    className="border-0 absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center bg-light text-dark hover:bg-accent cursor-pointer hover:text-white transition-colors"
                    aria-label="Close menu"
                >
                    ×
                </button>

                <div className="pt-20 px-8">
                    <div className="mb-8">
                        <nav className="space-y-4">
                            <Link
                                href="/"
                                onClick={closeMenu}
                                className="block text-light text-2xl font-bold hover:text-accent transition-colors"
                            >
                                Home
                            </Link>
                            <Link
                                href="/about"
                                onClick={closeMenu}
                                className="block text-light text-2xl font-bold hover:text-accent transition-colors"
                            >
                                About
                            </Link>
                            <Link
                                href="mailto:hello@mattbilbow.co.uk"
                                onClick={closeMenu}
                                className="block text-light text-2xl font-bold hover:text-accent transition-colors"
                            >
                                Contact
                            </Link>
                        </nav>
                    </div>

                    <div className="border-t border-main/30">

                        <h4 className="text-accent text-lg font-medium mb-2">Matt Bilbow</h4>
                        <p className="text-main text-sm leading-relaxed">
                            A software engineer and design enthusiast sharing insights on code, aesthetics, user experience and sometimes life.
                        </p>
                        <Link
                            href="/about"
                            onClick={closeMenu}
                            className="text-sm block hover:text-accent transition-colors text-white !underline"
                        >Read more
                        </Link>
                    </div>

                    {isAuthenticated && (
                        <div className="border-t border-main/30 pt-8 space-y-4">
                            <Link
                                href="/posts/new"
                                onClick={closeMenu}
                                className="block text-center px-4 py-3 text-sm font-medium text-white bg-accent rounded-md hover:bg-accent/90 transition-colors"
                            >
                                New Post
                            </Link>
                            <button
                                onClick={() => {
                                    logout();
                                    closeMenu();
                                }}
                                className="block w-full text-center text-sm text-main hover:text-light transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Header;