'use client';

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";

interface ListingHeadProps {
    title: string;
    imageSrc: string;
    locationValue: string;
    id: string;
    currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
    title,
    imageSrc,
    locationValue,
    id,
    currentUser
}) => {
    const { getByValue } = useCountries();
    const location = getByValue(locationValue);

    return (
        <div className="pt-10">
            <Heading
                title={title}
                subtitle={`${location?.region}, ${location?.label}`}
                
            />
            <hr className="my-4" />
            <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
                <Image
                    fill
                    src={imageSrc}
                    alt="Image"
                    className="w-full object-cover"
                />
                <div className="absolute top-5 right-5">
                    <HeartButton
                        listingId={id}
                        currentUser={currentUser}
                    />
                </div>
            </div>
        </div>
    );
}

export default ListingHead;