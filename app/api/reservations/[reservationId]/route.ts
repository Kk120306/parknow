import client from '@/app/lib/prismadb';
import { NextResponse } from 'next/server';
import getCurrentUser from '@/app/actions/getCurrentUser';

interface IParams {
    reservationId?: string;
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { reservationId } = await params;

    if (!reservationId || typeof reservationId !== 'string') {
        throw new Error('Invalid reservation ID');
    }

    const reservation = await client.reservation.deleteMany({
        where: {
            id: reservationId,
            OR: [
                { userId: currentUser.id },
                { listing: { userId: currentUser.id } }
            ]
        }
    });

    return NextResponse.json(reservation);
}
