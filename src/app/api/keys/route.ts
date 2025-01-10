import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  try {
    const apiKeys = await prisma.apiKey.findMany({

      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        name: true,
        key: true,
        createdAt: true
      }
    });
    
    return new NextResponse(JSON.stringify(apiKeys), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching API keys:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to fetch API keys' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    
    // Generate a unique API key
    const apiKey = `sk_${uuidv4().replace(/-/g, '')}`;
    
    // Save to database
    const newKey = await prisma.ApiKey.create({
      data: {
        name,
        key: apiKey,
      },
    });

    return NextResponse.json(newKey);
  } catch (error) {
    console.error('Error creating API key:', error);
    return NextResponse.json(
      { error: 'Failed to create API key' },
      { status: 500 }
    );
  }
}