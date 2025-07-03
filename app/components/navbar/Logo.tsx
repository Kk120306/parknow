'use client'

import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Logo = () => {
    const router = useRouter();

    return (
        <div
            className="cursor-pointer hover:opacity-80 transition"
            onClick={() => router.push('/')}
        >
            <Image
                src="/images/logo.png"
                alt="ParkNow Logo"
                width={100}
                height={100}
                className="hidden md:block"
            />
        </div>
    );
};

export default Logo;
