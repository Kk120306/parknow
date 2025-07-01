import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/navbar/Navbar";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "ParkNow | Rent & Find Parking Spaces Near You Instantly",
    description: "Discover and rent parking spots near you in seconds with ParkNow. List your unused space, earn passive income, and make parking hassle-free anywhere, anytime.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${inter.className} antialiased`}
            >
                <ToasterProvider />
                <RegisterModal />
                <Navbar />
                {children}
            </body>
        </html>
    );
}
