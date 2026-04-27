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
You may receive previous context to help understand incomplete sentences, and a new transcript segment.
Extract action items ONLY from the new transcript segment, using the context only to understand broken sentences.
Respond with a JSON object in this exact format:
{"items": [{"content": "action description", "assignee": "person or null", "dueDate": "date string or null"}]}
If there are no action items in the new segment, return: {"items": []}`;

export async function extractActionItems(transcript: string, context?: string): Promise<RawActionItem[]> {
  if (!transcript.trim()) {
    return [];
  }

  const userContent = context
    ? `[이전 대화 컨텍스트]\n${context}\n\n[새 발화 내용]\n${transcript}`
    : transcript;

  const client = await getGroqClient();

  try {
    const completion = await client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userContent },
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
