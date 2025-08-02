import client from '@/app/lib/prismadb';

export interface IListingParams {
    userId?: string;
    spaceCount?: number;
    category?: string;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
}

export default async function getListings(
    params: IListingParams
) {
    try {
        const { userId, spaceCount, category, startDate, endDate, locationValue } = params;

        const query: Record<string, unknown> = {};

        if (userId) {
            query.userId = userId;
        }

        if (spaceCount) {
            query.spaceCount = {
                gte: spaceCount,
            };
        }

        if (category) {
            query.category = category;
        }

        if (locationValue) {
            query.locationValue = locationValue;
        }

        if (startDate && endDate) {
            query.NOT = {
                reservations: {
                    some: {
                        OR: [
                            {
                                endDate: { gte: startDate },
                                startDate: { lte: startDate },
                            },
                            {
                                startDate: { lte: endDate },
                                endDate: { gte: endDate },
                            }
                        ]
                    }
                }
            };
        }

        const listings = await client.listing.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc',
            },
        });

        const safeListings = listings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
        }));

        return safeListings;

    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error(String(error));
    }
}
