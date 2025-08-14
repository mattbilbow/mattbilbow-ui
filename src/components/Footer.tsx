"use client"

import {JSX, useState, useEffect} from "react";

export default function Footer(): JSX.Element {
    const [showScrollTop, setShowScrollTop] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <footer className="py-10">
            <div className="max-w-4xl mx-auto px-6">
                {/* Social Links */}
                <div className="flex justify-center items-center gap-6 mb-4">
                    <a
                        href="https://linkedin.com/mattbilbow"
                        className="text-main hover:text-accent transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Linkedin
                    </a>
                    <span className="text-accent">•</span>
                    <a
                        href="https://github.com/mattbilbow"
                        className="text-main hover:text-accent transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Github
                    </a>
                    <span className="text-accent">•</span>
                    <a
                        href="https://dribbble.com/mattbilbow"
                        className="text-main hover:text-accent transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Dribbble
                    </a>
                </div>

                <div className="text-center">
                    <p className="text-main opacity-60">
                        ©2025 Matt Bilbow — All rights reserved.
                    </p>
                </div>

                {/* Scroll to top button with fade animation */}
                <div className={`fixed bottom-8 right-8 z-50 transition-all duration-500 ease-in-out ${
                    showScrollTop
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-4 pointer-events-none'
                }`}>
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="bg-dark text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-accent hover:scale-110 transition-all duration-300 shadow-lg border-0 cursor-pointer"
                        aria-label="Scroll to top"
                        type="button"
                    >
                        {/* Chevron up SVG */}
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </footer>
    )
}