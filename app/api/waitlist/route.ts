import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.trim()) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const formData = new URLSearchParams();
    formData.append('email', email.trim());

    const res = await fetch(
      'https://subscribe-forms.beehiiv.com/de7b925b-6f1f-4557-9fde-cf8005c34c5f',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      }
    );

    if (!res.ok) {
      console.error('Beehiiv subscription failed:', res.status, await res.text());
      return NextResponse.json({ error: 'Subscription failed' }, { status: 502 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
