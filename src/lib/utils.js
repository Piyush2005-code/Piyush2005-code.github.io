// Lightweight stand-in for shadcn's `cn` helper (normally clsx + tailwind-merge).
// This project doesn't run Tailwind, so there are no conflicting utility
// classes to merge — this just joins truthy class values with a space.
export function cn(...inputs) {
  return inputs
    .flat(Infinity)
    .filter(Boolean)
    .join(' ');
}
