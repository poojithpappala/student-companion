
"use client";

// This component is no longer used for authentication.
// It is kept to prevent breaking imports if they exist elsewhere,
// but it renders nothing.

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
