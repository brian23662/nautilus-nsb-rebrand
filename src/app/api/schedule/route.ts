import { NextResponse } from 'next/server';

/**
 * GET /api/schedule
 *
 * Fetches the next 7 days of class events from a public Google Calendar.
 *
 * ENV VARS (set in .env.local):
 *   GOOGLE_CALENDAR_API_KEY  - Read-only API key, restricted to this domain
 *   GOOGLE_CALENDAR_ID       - The public calendar ID (e.g. xxx@group.calendar.google.com)
 *
 * If either is missing we return a sample schedule so the UI still works
 * out of the box.
 */
export async function GET() {
  const apiKey = process.env.GOOGLE_CALENDAR_API_KEY;
  const calendarId = process.env.GOOGLE_CALENDAR_ID;

  // No creds yet — return mock data so the UI still works in development
  if (!apiKey || !calendarId) {
    return NextResponse.json({
      error: 'using-mock',
      events: buildMockWeek()
    });
  }

  try {
    const now = new Date();
    const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    const url = new URL(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
        calendarId
      )}/events`
    );
    url.searchParams.set('key', apiKey);
    url.searchParams.set('timeMin', now.toISOString());
    url.searchParams.set('timeMax', weekFromNow.toISOString());
    url.searchParams.set('singleEvents', 'true'); // expand recurring
    url.searchParams.set('orderBy', 'startTime');
    url.searchParams.set('maxResults', '100');

    const res = await fetch(url.toString(), {
      // Cache for 5 min — Google Calendar updates don't need to be instant
      next: { revalidate: 300 }
    });

    if (!res.ok) {
      throw new Error(`Calendar API responded ${res.status}`);
    }

    const data = await res.json();
    const events = (data.items ?? []).map((item: any) => ({
      id: item.id,
      summary: item.summary ?? 'Class',
      // dateTime preferred, but all-day events use `date`
      start: item.start?.dateTime ?? item.start?.date,
      end: item.end?.dateTime ?? item.end?.date,
      location: item.location
    }));

    return NextResponse.json({ events });
  } catch (err) {
    console.error('Schedule fetch failed', err);
    return NextResponse.json({
      error: 'fetch-failed',
      events: buildMockWeek()
    });
  }
}

/**
 * Builds a deterministic 7-day demo schedule so designers / reviewers
 * can see the UI without any API keys configured.
 */
function buildMockWeek() {
  const titles = [
    'Essentrics',
    'Cardio Sculpt',
    'Gentle Vinyasa Flow',
    'Functional Strength',
    'Silver Sneakers',
    'Fit For Life',
    'Tone, Sculpt & Stretch',
    'Zumba',
    'Pilates'
  ];
  const events: any[] = [];
  const now = new Date();
  for (let day = 0; day < 7; day++) {
    const base = new Date(now);
    base.setDate(now.getDate() + day);
    base.setHours(7, 0, 0, 0);
    const slots = [7, 9, 11, 17, 18];
    slots.forEach((hour, i) => {
      const start = new Date(base);
      start.setHours(hour, 0, 0, 0);
      const end = new Date(start);
      end.setMinutes(end.getMinutes() + 55);
      events.push({
        id: `mock-${day}-${i}`,
        summary: titles[(day + i) % titles.length],
        start: start.toISOString(),
        end: end.toISOString(),
        location: i % 2 === 0 ? 'Studio A' : 'Studio B'
      });
    });
  }
  return events;
}
