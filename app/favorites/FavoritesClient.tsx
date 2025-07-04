'use client'

import { SafeListing, SafeUser } from "@/app/types";
import Heading from "../components/Heading";
import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";

interface FavoritesClientProps {
    favorites: SafeListing[];
    currentUser: SafeUser | null;
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
    favorites,
    currentUser
}) => {
    return (
        <div className="md:mt-6">
            <Container>
                <Heading
                    title="Favorites"
                    subtitle="List of your favorite properties"
                />
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {favorites.map((favorite) => (
                        <ListingCard
                            key={favorite.id}
                            data={favorite}
                            currentUser={currentUser}
                        />
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default FavoritesClient;
