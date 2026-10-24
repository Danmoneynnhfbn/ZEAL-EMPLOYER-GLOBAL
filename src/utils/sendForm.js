const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

export async function sendForm({ subject, fromName, fields }) {
  const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;
  if (!accessKey) {
    throw new Error('Form delivery is not configured yet. Please try again later.');
  }

  let response;
  try {
    response = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        subject,
        from_name: fromName,
        ...fields,
      }),
    });
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('We could not reach form delivery. Check your connection and try again.');
    }
    throw error;
  }

  if (!response.ok) {
    throw new Error('We could not send your request. Please try again.');
  }

  let result;
  try {
    result = await response.json();
  } catch {
    throw new Error('The form service returned an unreadable response. Please try again.');
  }
  if (result.success !== true) {
    throw new Error(result.message || 'We could not send your request. Please try again.');
  }

  return result;
}
