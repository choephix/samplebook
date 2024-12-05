export function toTitleCase(input: string): string {
  // Step 1: Replace various delimiters (-, _, etc.) with spaces and split camelCase words.
  const formatted = input
    .replace(/([a-z])([A-Z])/g, '$1 $2')  // Handle camelCase to separate words.
    .replace(/[-_]+/g, ' ')               // Handle kebab-case and snake_case.
    .replace(/\s+/g, ' ')                // Remove any extra spaces.
    .toLowerCase();

  // Step 2: Convert each word to title case.
  return formatted
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
