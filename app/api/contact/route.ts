import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validators';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validationResult = contactFormSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          ok: false,
          error: validationResult.error.errors[0]?.message || 'Validation failed',
        },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = validationResult.data;

    // Insert into Supabase
    const { data, error } = await supabase.from('contact_submissions').insert([
      {
        name,
        email,
        subject,
        message,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        {
          ok: false,
          error: 'Failed to save your message. Please try again later.',
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: 'Thank you for your message. We will get back to you soon!',
    });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      {
        ok: false,
        error: 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}
