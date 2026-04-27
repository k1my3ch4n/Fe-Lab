import Groq from 'groq-sdk';

export async function getGroqClient(): Promise<Groq> {
  const { groqApiKey } = await chrome.storage.sync.get('groqApiKey');
  if (!groqApiKey) {
    throw new Error('Groq API 키가 설정되지 않았습니다. 익스텐션 설정에서 API 키를 입력해주세요.');
  }
  return new Groq({ apiKey: groqApiKey as string, dangerouslyAllowBrowser: true });
}

export async function saveApiKey(apiKey: string): Promise<void> {
  await chrome.storage.sync.set({ groqApiKey: apiKey });
}

export async function getApiKey(): Promise<string | null> {
  const { groqApiKey } = await chrome.storage.sync.get('groqApiKey');
  return (groqApiKey as string | undefined) ?? null;
}
