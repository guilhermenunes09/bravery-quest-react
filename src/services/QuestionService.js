export async function showQuestion(question_id) {
  const response = await fetch(`questions/${question_id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  return await response.json();
}


export async function createQuestion(data) {
  const response = await fetch(`questions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({questions: data})
  })
  return await response.json();
}