export const INFO_REQUEST_URL = 'https://api.thesportsremote.com/api/tsr/info/request';

export const sendInfoRequest = async ({ contact, fromEmail, message, website, ts, turnstileToken }) => {
  const res = await fetch(INFO_REQUEST_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contact, fromEmail, message, website, ts, turnstileToken }),
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json().catch(() => ({}));
};
