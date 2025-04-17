import { NextResponse } from 'next/server'

export function middleware(request) {
  const username = request.cookies.get('username')?.value
  const token = request.cookies.get('token')?.value

  //console.log(`MIDDLEWARE ${request} ${username} ${token}`);

  // Ensure we have both username and token
  if (!username || !token) {
    const url = request.nextUrl.clone()
    url.pathname = '/unauthorized'
    return NextResponse.redirect(url)
  }

  return fetch('http://localhost:4000/api/tokencheck', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: username, token: token }),
  })
    .then(res => res.json()) // Parse the response body as JSON
    .then(data => {
      // If token check fails, redirect to unauthorized page
      if (data.status !== 200) {
        const url = request.nextUrl.clone()
        url.pathname = '/unauthorized'
        return NextResponse.redirect(url)
      }

      // Allow request to proceed if token is valid
      return NextResponse.next()
    })
    .catch(error => {
      console.error('Error:', error)

      // Handle errors by redirecting to unauthorized page
      const url = request.nextUrl.clone()
      url.pathname = '/unauthorized'
      return NextResponse.redirect(url)
    })
}

export const config = {
  matcher: [
    '/profile',
    '/topic',
    '/topicabout'
  ], // Only apply to this route
}