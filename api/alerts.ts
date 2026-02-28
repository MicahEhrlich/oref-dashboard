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

    const text = await res.text()
    let body: unknown

    try {
      body = JSON.parse(text)
    } catch {
      body = {
        error: 'Upstream did not return JSON',
        status: res.status,
      }
    }

    return new Response(JSON.stringify(body), {
      status: res.status,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 's-maxage=60, stale-while-revalidate',
      },
    })
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Failed to reach upstream alerts endpoint',
      }),
      { status: 502, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
