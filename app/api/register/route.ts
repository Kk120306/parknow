import client from '@/app/lib/prismadb';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const body = await request.json();
    const { email, name, password } = body;

    if (!email || !name || !password) {
        return NextResponse.json(
            { error: 'Missing required fields' },
            {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }

    try {
        const existingUser = await client.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: 'Email already exists' },
                {
                    status: 409,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await client.user.create({
            data: {
                email,
                name,
                hashedPassword,
            },
        });

        return NextResponse.json(
            user,
            {
                status: 201,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}
