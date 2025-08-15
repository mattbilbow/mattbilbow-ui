import {ReactNode} from "react";
import "./globals.css";
import {Merriweather} from "next/font/google";
import {Metadata} from "next";
import Script from "next/script";
import {AuthProvider} from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";

const merriweather = Merriweather({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700", "900"],
    display: "swap"
});

export const metadata: Metadata = {
    title: "Matt Bilbow - Software Developer",
    description: "Personal website and blog of Matt Bilbow, a passionate software developer sharing insights on modern web development and technical experiences.",
    keywords: ["Matt Bilbow", "Software Developer", "Web Development", "Programming", "Tech Blog", "Next.js", "Phoenix", "JavaScript", "TypeScript"],
    authors: [{ name: "Matt Bilbow" }],
    creator: "Matt Bilbow",
    publisher: "Matt Bilbow",

    openGraph: {
        type: "website",
        locale: "en_GB",
        url: "https://mattbilbow.co.uk",
        siteName: "Matt Bilbow",
        title: "Matt Bilbow - Software Developer",
        description: "Personal website and blog of Matt Bilbow, a passionate software developer sharing insights on modern web development and technical experiences.",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Matt Bilbow - Software Developer",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: "Matt Bilbow - Software Developer & Technical Writer",
        description: "Personal website and blog of Matt Bilbow, a passionate software developer sharing insights on modern web development, programming tutorials, and technical experiences.",
        creator: "@mattbilbow",
        images: ["/twitter-card.jpg"],
    },

    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },

    verification: {
        google: "your-google-site-verification-code",
    },

    alternates: {
        canonical: "https://www.mattbilbow.co.uk",
    },
};

export default function RootLayout({
                                       children,
                                   }: {
    children: ReactNode;
}) {
    return (
        <html lang="en">
        <body className={`${merriweather.className} m-0 bg-light`}>
        {process.env.NEXT_PUBLIC_GA_ID && (
            <>
                <Script
                    src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                                    page_path: window.location.pathname,
                                });
                            `}
                </Script>
            </>
        )}
        <AuthProvider>
            <Header />
            <main className="flex-1 max-w-5xl m-auto">
                {children}
            </main>
            <Footer />
        </AuthProvider>
        <Analytics />
        </body>
        </html>
    );
}