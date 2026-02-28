const OREF_URL =
  'https://www.oref.org.il/warningMessages/alert/History/AlertsHistory.json'

export async function GET() {
  try {
    const res = await fetch(OREF_URL, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Referer: 'https://www.oref.org.il/',
      },
    })
    if (!res.ok) {
      throw new Error(`Upstream ${res.status}`)
    }
    const data = await res.json()
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 's-maxage=60, stale-while-revalidate',
      },
    })
  } catch {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch alerts' }),
      { status: 502, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
