import { NextResponse } from 'next/server';
import client from '@/app/lib/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

export async function POST(req : Request) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.json(
            { error: 'Unauthorized' },
            {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }

    const body = await req.json();
    const { title, description, imageSrc, category, spaceCount, location, price } = body;

    if (!title || !description || !imageSrc || !category || !spaceCount || !price || !location) {
        return NextResponse.json(
            { error: 'Missing required fields' },
            {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }

    try {
        const listing = await client.listing.create({
            data: {
                title,
                description,
                imageSrc,
                category,
                spaceCount,
                locationValue : location.value,
                price : parseInt(price, 10),
                userId: currentUser.id,
            },
        });

        return NextResponse.json(
            listing,
            {
                status: 201,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    } catch (error) {
        console.error('Error creating listing:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}