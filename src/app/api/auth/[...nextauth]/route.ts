// This file is no longer used for authentication.
// It is kept to prevent build errors if it is referenced somewhere,
// but the authentication logic has been removed from the application.
export function GET() {
  return new Response("Authentication is not configured.", { status: 404 });
}
export function POST() {
  return new Response("Authentication is not configured.", { status: 404 });
}
