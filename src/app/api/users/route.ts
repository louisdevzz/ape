import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI as string;
const client = new MongoClient(uri);


export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');

    if (!username) {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }

    await client.connect();
    const db = client.db('apekingkong');
    const collection = db.collection('users');

    const user = await collection.findOne({ username });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } finally {
    await client.close();
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, invitedBy } = body;

    if (!username) {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }

    await client.connect();
    const db = client.db('apekingkong');
    const collection = db.collection('users');

    // Use findOneAndUpdate with upsert to prevent race conditions
    const result = await collection.findOneAndUpdate(
      { username }, // find condition
      {
        $setOnInsert: { // only set these fields if document is being inserted
          username,
          codeInviter: generateReferralCode(),
          ...(invitedBy && { invitedBy })
        },
        $set: { // always update these fields
          lastActive: Date.now()
        }
      },
      {
        upsert: true, // create document if it doesn't exist
        returnDocument: 'after' // return the document after update
      }
    );

    return NextResponse.json(result?.value, { 
      status: result?.lastErrorObject?.upserted ? 201 : 200 
    });

  } catch (error) {
    console.error('Error creating/updating user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } finally {
    await client.close();
  }
}

function generateReferralCode() {
    const prefix = "ref_";
    const codeLength = 8;
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    
    // Generate random 8-character code
    for (let i = 0; i < codeLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters[randomIndex];
    }
    
    return prefix + code;
}