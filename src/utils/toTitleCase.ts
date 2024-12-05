export function toTitleCase(input: string): string {
  const formatted = input
    .replace(/([a-z])([A-Z])/g, '$1 $2')  // Handle camelCase to separate words.
    .replace(/[-_]+/g, ' ')               // Handle kebab-case and snake_case.
    .replace(/\s+/g, ' ')                // Remove any extra spaces.
    .toLowerCase();

  return formatted
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
