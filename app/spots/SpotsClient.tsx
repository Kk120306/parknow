'use client'

import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeReservation, SafeUser } from "../types";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

interface SpotsClientInterface {
    reservations: SafeReservation[];
    currentUser?: SafeUser | null;
}

const SpotsClient: React.FC<SpotsClientInterface> = ({
    reservations,
    currentUser
}) => {

    const router = useRouter();
    const [deletingId, setDeletingId] = useState("");

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);
        axios.delete(`/api/reservations/${id}`)
            .then(() => {
                toast.success("Reservation cancelled");
                router.refresh();
            })
            .catch((error) => {
                toast.error("Something went wrong");
            })
            .finally(() => {
                setDeletingId("");
                router.refresh();
            });
    }, [router]);

    return (
        <div className="md:pt-6">
            <Container>
                <Heading
                    title="Your Reservations"
                    subtitle="Properties you have booked"
                />
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                    {reservations.map((reservation) => (
                        <ListingCard   
                            key={reservation.id}
                            data={reservation.listing}
                            reservation={reservation}
                            actionId={reservation.id}
                            onAction={onCancel}
                            disabled={deletingId === reservation.id}
                            actionLabel="Cancel reservation"
                            currentUser={currentUser}
                        />
                    ))}

                </div>
            </Container>
        </div>
    );
}

export default SpotsClient;