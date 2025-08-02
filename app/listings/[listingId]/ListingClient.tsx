'use client'

import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { useCallback, useMemo, useState, useEffect } from "react";
import { categories } from "@/app/components/navbar/Categories";
import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";
import ListingReservation from "@/app/components/listings/ListingReservation";
import { Range } from "react-date-range";


const intialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

interface ListingClientProps {
    reservation?: SafeReservation[]
    listing: SafeListing & {
        user: SafeUser;
    };
    currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
    listing,
    reservation = [],
    currentUser
}) => {
    const loginModal = useLoginModal();
    const router = useRouter();

    const disableDates = useMemo(() => {
        let dates: Date[] = [];
        reservation.forEach((res) => {
            const range = eachDayOfInterval({
                start: new Date(res.startDate),
                end: new Date(res.endDate)
            });

            dates = [...dates, ...range]
        });

        return dates;
    }, [reservation])

    const [isLoading, setIsLoading] = useState(false);
    const [dateRange, setDateRange] = useState<Range>(intialDateRange);
    const [totalPrice, setTotalPrice] = useState(listing.price);

    const onCreateReservation = useCallback(async (data: Range) => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        setIsLoading(true)

        console.log(data.startDate, data.endDate, totalPrice, listing.id);

        axios.post('/api/reservations', {
            totalPrice,
            startDate: data.startDate,
            endDate: data.endDate,
            listingId: listing.id,
        })
            .then(() => {
                toast.success('Reservation created!');
                setDateRange(intialDateRange);
                router.push('/spots');
            })
            .catch(() => {
                toast.error('Something went wrong!');
            })
            .finally(() => {
                setIsLoading(false);
            });


    }, [currentUser, loginModal, totalPrice, listing.id, router]);

    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate
            );

            if (dayCount && listing.price) {
                setTotalPrice(dayCount * listing.price);
            } else {
                setTotalPrice(listing.price);
            }
        }
    }, [dateRange, listing.price]);

    const category = useMemo(() => {
        return categories.find((item) => item.label === listing.category);
    }, [listing.category]);

    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHead
                        title={listing.title}
                        imageSrc={listing.imageSrc}
                        locationValue={listing.locationValue}
                        id={listing.id}
                        currentUser={currentUser}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 mt-6">
                        <ListingInfo
                            user={listing.user}
                            description={listing.description}
                            spaceCount={listing.spaceCount}
                            category={category}
                            locationValue={listing.locationValue}
                        />
                        <div className="order-first md:order-last mb-10">
                            <ListingReservation
                                price={listing.price}
                                totalPrice={totalPrice}
                                dateRange={dateRange}
                                onChangeDate={(value) => setDateRange(value)}
                                onSubmit={() => onCreateReservation(dateRange)}
                                disabledDates={disableDates}
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container >
    );
}

export default ListingClient;