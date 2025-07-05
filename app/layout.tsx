import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/navbar/Navbar";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "./components/modals/RentModal";
import SearchModal from "./components/modals/SearchModal";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "ParkNow | Rent & Find Parking Spaces Near You Instantly",
    description: "Discover and rent parking spots near you in seconds with ParkNow. List your unused space, earn passive income, and make parking hassle-free anywhere, anytime.",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const currentUser = await getCurrentUser();
    return (
        <html lang="en" className="h-full">
            <body className={`${inter.className} h-full flex flex-col`}>
                <ToasterProvider />
                <RegisterModal />
                <LoginModal />
                <RentModal />
                <SearchModal />
                <Navbar currentUser={currentUser} />

                <main className="flex-grow pt-28 md:pt-50">
                    {children}
                </main>

                <Footer />
            </body>
        </html>
    );
}
