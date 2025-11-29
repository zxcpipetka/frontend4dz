export function formatMessage(text) {
  // demonstrate a small util function
  const now = new Date();
  return `${text} — ${now.toLocaleTimeString()}`;
}
