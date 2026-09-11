const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export async function getContent() {
  const res = await fetch(`${API_URL}/api/content`);
  if (!res.ok) throw new Error('Failed to load content');
  return res.json();
}

export async function sendContactMessage(payload) {
  const res = await fetch(`${API_URL}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || 'Something went wrong sending your message.');
  }
  return data;
}
