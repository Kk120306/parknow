'use client'

import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

import { SafeListing, SafeUser } from '@/app/types';

import Heading from '@/app/components/Heading';
import Container from '@/app/components/Container';
import ListingCard from '../components/listings/ListingCard';

interface PropertiesClientProps {
    listings: SafeListing[];
    currentUser?: SafeUser | null;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
    listings,
    currentUser
}) => {

    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');
    const onCancel = useCallback((id: string) => {
        setDeletingId(id);
        axios.delete(`/api/listings/${id}`)
            .then(() => {
                toast.success('Listing Closed');
                router.refresh();
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message || 'Something went wrong');
            })
            .finally(() => {
                setDeletingId('');
            });
    }, [router]);


    return (
        <div className="md:pt-6">
            <Container>
                <Heading
                    title="Properties"
                    subtitle="List of your properties"
                />
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                    {listings.map((listing) => (
                        <ListingCard
                            key={listing.id}
                            data={listing}
                            actionId={listing.id}
                            onAction={onCancel}
                            disabled={deletingId === listing.id}
                            actionLabel="Delete Property"
                            currentUser={currentUser}
                        />
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default PropertiesClient;