import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { SafeUser } from '@/app/types';
import useLoginModal from './useLoginModal';
import axios from 'axios';

interface UseFavoriteProps {
    listingId: string;
    currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: UseFavoriteProps) => {

    const router = useRouter();
    const loginModal = useLoginModal();

    const hasFavorites = useMemo(() => {
        const favorites = currentUser?.favoriteIds || [];

        return favorites.includes(listingId);
    }, [currentUser, listingId]);

    const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        if (!currentUser) {
            return loginModal.onOpen();
        }

        try {
            let request;

            if (hasFavorites) {
                request = () => axios.delete(`/api/favorites/${listingId}`);
            } else {
                request = () => axios.post(`/api/favorites/${listingId}`);
            }

            await request();
            router.refresh();
            toast.success(hasFavorites ? "Removed from favorites" : "Added to favorites");
        } catch (error) {
            toast.error("Something went wrong");
            return;
        }

    }, [listingId, currentUser, router, loginModal, hasFavorites]);

    return {
        hasFavorites,
        toggleFavorite
    }
}

export default useFavorite;