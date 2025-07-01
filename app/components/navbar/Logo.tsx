'use client'

import { CarFront } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Logo = () => {
    const router = useRouter();

    return (
        <div
            className="cursor-pointer hover:opacity-80 transition"
            onClick={() => router.push('/')}
        >
            <CarFront className="h-8 w-8 text-primary hidden md:block" />
        </div>
    );
};

export default Logo;
