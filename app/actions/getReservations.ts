import client from "@/app/lib/prismadb";

interface IParams {
    listingId?: string;
    userId?: string;
    authorId?: string;
}

export default async function getReservations(params: IParams) {
    try {
        const { listingId, userId, authorId } = await params;

        const query: any = {};

        if (listingId) {
            query.listingId = listingId;
        }

        if (userId) {
            query.userId = userId;
        }

        if (authorId) {
            query.listing = {
                userId: authorId
            };
        }

        const reservations = await client.reservation.findMany({
            where: query,
            include: {
                listing: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return reservations.map((reservation) => ({
            ...reservation,
            createdAt: reservation.createdAt.toISOString(),
            startDate: reservation.startDate.toISOString(),
            endDate: reservation.endDate.toISOString(),
            listing: {
                ...reservation.listing,
                createdAt: reservation.listing.createdAt.toISOString(),
            },
        }));

    } catch (error: any) {
        throw new Error(error);
    }
}
