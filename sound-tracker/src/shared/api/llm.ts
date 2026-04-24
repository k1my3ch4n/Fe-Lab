import { getGroqClient } from './groqClient';

export interface RawActionItem {
  content: string;
  assignee: string | null;
  dueDate: string | null;
}

interface LlmResponse {
  items: RawActionItem[];
}

const SYSTEM_PROMPT = `You are an assistant that extracts action items from meeting transcripts.
Extract any action items, tasks, or to-dos mentioned in the given text.
Respond with a JSON object in this exact format:
{"items": [{"content": "action description", "assignee": "person or null", "dueDate": "date string or null"}]}
If there are no action items, return: {"items": []}`;

export async function extractActionItems(transcript: string): Promise<RawActionItem[]> {
  if (!transcript.trim()) {
    return [];
  }

  const client = await getGroqClient();

  try {
    const completion = await client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: transcript },
      ],
      temperature: 0.1,
      max_tokens: 1024,
      response_format: { type: 'json_object' },
    });

    const text = completion.choices[0]?.message?.content ?? '{"items":[]}';

    try {
      const parsed = JSON.parse(text) as LlmResponse;
      return Array.isArray(parsed.items) ? parsed.items : [];
    } catch {
      return [];
    }
  } catch (error) {
    throw new Error(`액션 아이템 추출 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
  }
}
