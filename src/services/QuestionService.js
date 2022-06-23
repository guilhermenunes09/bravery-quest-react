export async function createQuestion(data) {
  const response = await fetch(`questions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({questions: data})
  })
  return await response.json();
}