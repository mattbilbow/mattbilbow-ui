import {ReactNode} from "react";
import "./globals.css";
import {Merriweather} from "next/font/google";
import {Metadata} from "next";
import {AuthProvider} from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const merriweather = Merriweather({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700", "900"],
    display: "swap"
});

export const metadata: Metadata = {
    title: "The Personal website of Matt Bilbow",
    description: "A blog built with Phoenix and Next.js`",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${merriweather.className} m-0 bg-light`}>
                <AuthProvider>
                    <Header />
                    <main className="flex-1 max-w-5xl m-auto">
                        {children}
                    </main>
                    <Footer />
                </AuthProvider>
            </body>
        </html>
    );
}