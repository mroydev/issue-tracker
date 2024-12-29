import { patchIssueSchema } from '@/lib/validations';
import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

// Handle PATCH request for updating an issue
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Parse the request body
    const body = await request.json();

    // Validate request body
    const validatedIssue = patchIssueSchema.safeParse(body);
    if (!validatedIssue.success) {
      return NextResponse.json(
        { errors: validatedIssue.error.errors },
        { status: 400 }
      );
    }

    // Destructure the validated data
    const { title, description, assignedToUserId } = validatedIssue.data;

    const issueId = (await params).id; // Retrieve the id from the dynamic route params

    // Check if the assigned user exists (if provided)
    if (assignedToUserId) {
      const existingUser = await prisma.user.findUnique({
        where: { id: assignedToUserId },
      });

      if (!existingUser) {
        return NextResponse.json(
          { error: 'The assigned user does not exist.' },
          { status: 400 }
        );
      }
    }

    // Update the issue with the provided id
    const updatedIssue = await prisma.issue.update({
      where: { id: parseInt(issueId) }, // Ensure issueId is parsed as an integer
      data: {
        title,
        description,
        assignedToUserId: assignedToUserId || null, // Ensure null is set if no user assigned
      },
    });

    return NextResponse.json(updatedIssue, { status: 200 });
  } catch (error) {
    console.error('Error updating issue:', error);
    return NextResponse.json(
      { error: 'Failed to update the issue.' },
      { status: 500 }
    );
  }
}

// Handle DELETE request for deleting an issue
export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const issueId = (await params).id;

  try {
    const deletedIssue = await prisma.issue.delete({
      where: { id: parseInt(issueId) }, // Ensure issueId is parsed as an integer
    });

    return NextResponse.json(deletedIssue, { status: 200 });
  } catch (error) {
    console.error('Error deleting issue:', error);
    return NextResponse.json(
      { error: 'Failed to delete the issue.' },
      { status: 500 }
    );
  }
}
