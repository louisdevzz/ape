import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri as string);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { username, points, timestamp } = body;

        if (!username || points === undefined) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        await client.connect();
        const database = client.db('apekingkong');
        const collection = database.collection('points');

        await collection.insertOne({
            username,
            points,
            timestamp,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error saving points:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    } finally {
        await client.close();
    }
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const username = searchParams.get('username');

        if (!username) {
            return NextResponse.json({ error: 'Username is required' }, { status: 400 });
        }

        await client.connect();
        const database = client.db('apekingkong');
        const collection = database.collection('points');

        // Get all points entries for the user
        const userPoints = await collection.find({ username }).toArray();
        
        // Calculate total points
        const totalPoints = userPoints.reduce((sum, entry) => sum + entry.points, 0);

        return NextResponse.json({ totalPoints });
    } catch (error) {
        console.error('Error fetching points:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    } finally {
        await client.close();
    }
}

