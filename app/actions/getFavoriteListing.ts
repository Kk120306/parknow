import client from "@/app/lib/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";


export default async function getFavoriteListing() {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return [];
        }

        const favorites = await client.listing.findMany({
            where: {
                id: {
                    in: [...currentUser.favoriteIds || []]
                }

            },
        });

        const safeFavorites = favorites.map((favorite) => ({
            ...favorite,
            createdAt: favorite.createdAt.toISOString(),
        }));

        return safeFavorites;

    } catch (_error) {
        throw new Error(_error instanceof Error ? _error.message : String(_error));
    }
}