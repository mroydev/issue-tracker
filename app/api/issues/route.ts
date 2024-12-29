import { auth } from '@/auth';
import { issueSchema } from '@/lib/validations';
import prisma from '@/prisma/client';

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Parse and validate the request body
    const body = await request.json();
    const validatedIssue = issueSchema.safeParse(body);

    if (!validatedIssue.success) {
      return NextResponse.json(
        { errors: validatedIssue.error.errors },
        { status: 400 }
      );
    }

    // Destructure the validated data
    const { title, description } = validatedIssue.data;

    // Check user authentication
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { error: 'You must be logged in to create an issue' },
        { status: 401 }
      );
    }

    if (!session) return null;
    // Create a new issue with the authenticated user
    const newIssue = await prisma.issue.create({
      data: {
        title,
        description,
      },
    });

    return NextResponse.json(newIssue, { status: 201 });
  } catch (error) {
    console.error('Error creating issue:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while creating the issue.' },
      { status: 500 }
    );
  }
}
