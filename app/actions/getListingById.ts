import client from '@/app/lib/prismadb';

interface IParams {
    listingId?: string;
}

export default async function getListingById(
    params: IParams
) {
    try {
        const { listingId } = await params;
        const listing = await client.listing.findUnique({
            where : {
                id : listingId
            },
            include : {
                user : true,
            }
        });

        if (!listing) {
            return null;
        }

        return {
            ...listing,
            createdAt: listing.createdAt.toISOString(),
            user: {
                ...listing.user,
                createdAt: listing.user.createdAt.toISOString(),
                updatedAt: listing.user.updatedAt.toISOString(),
                emailVerified: listing.user.emailVerified ? listing.user.emailVerified.toISOString() : null,
            }
        }
    } catch (error : any) {
        throw new Error(error);
    }
}