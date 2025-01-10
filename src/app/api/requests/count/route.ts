import { NextResponse } from 'next/server';
import { prisma } from '../../../..//lib/prisma';

export async function GET() {
  try {
    const count = await prisma.ApiRequest.count();
    return NextResponse.json({ count });
  } catch (error) {
    console.error('Error getting request count:', error);
    return NextResponse.json(
      { error: 'Failed to get request count' },
      { status: 500 }
    );
  }
} 