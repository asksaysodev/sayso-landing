import { NextRequest, NextResponse } from 'next/server';
import { verifyFeedbackPassword, mockFeedbackUser } from '@/lib/auth';

/**
 * POST /api/feedback/auth
 * Verifies the feedback page password and returns the shared feedback user
 *
 * Request body:
 * {
 *   password: string
 * }
 *
 * Response on success:
 * {
 *   success: true,
 *   user: { id, name, email }
 * }
 *
 * Response on failure:
 * {
 *   error: string
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      );
    }

    // Verify the password
    const isValid = verifyFeedbackPassword(password);

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        user: mockFeedbackUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Feedback auth error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
