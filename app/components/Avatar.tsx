'use client'

import Image from 'next/image';

const Avatar = () => {
    return ( 
        <div>
            <Image 
                className="rounded-full"
                src="/images/placeholder.png"
                alt="Avatar"
                width={30}
                height={30}
            />
        </div>
     );
}
 
export default Avatar;