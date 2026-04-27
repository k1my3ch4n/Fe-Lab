import { useState, useEffect } from "react";
import { getApiKey, saveApiKey } from "@/shared/api";
import { Button } from "@/shared/ui";

type SaveStatus = "idle" | "saved" | "error";
type MicStatus = "unknown" | "granted" | "denied" | "requesting";

export function OptionsPage() {
  const [apiKey, setApiKey] = useState("");
  const [status, setStatus] = useState<SaveStatus>("idle");
  const [micStatus, setMicStatus] = useState<MicStatus>("unknown");

  useEffect(() => {
    navigator.permissions.query({ name: "microphone" as PermissionName }).then((result) => {
      setMicStatus(result.state as MicStatus);
      result.addEventListener("change", () => {
        setMicStatus(result.state as MicStatus);
      });
    });
  }, []);

  useEffect(() => {
    getApiKey().then((key) => {
      if (key) {
        setApiKey(key);
      }
    });
  }, []);

  async function handleRequestMic() {
    setMicStatus("requesting");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
      setMicStatus("granted");
    } catch {
      setMicStatus("denied");
    }
  }

  async function handleSave() {
    if (!apiKey.trim()) {
      return;
    }
    try {
      await saveApiKey(apiKey.trim());
      setStatus("saved");
    } catch {
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 2000);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-start justify-center pt-16 px-4">
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 w-full max-w-md p-6">
        <header className="mb-6">
          <h1 className="text-lg font-semibold text-gray-900">
            VoxTask 설정
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Groq API 키를 입력하면 음성 인식 및 액션 아이템 추출 기능을 사용할
            수 있습니다.
          </p>
        </header>

        <section className="mb-6 p-4 rounded-lg border border-gray-200 bg-gray-50">
          <h2 className="text-sm font-medium text-gray-700 mb-1">마이크 권한</h2>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              {micStatus === "granted" && "✅ 허용됨"}
              {micStatus === "denied" && "❌ 차단됨 — 브라우저 설정에서 직접 허용해주세요"}
              {micStatus === "requesting" && "요청 중..."}
              {(micStatus === "unknown" || micStatus === "prompt" as MicStatus) && "권한이 필요합니다"}
            </span>
            {micStatus !== "granted" && micStatus !== "denied" && (
              <Button
                size="sm"
                onClick={handleRequestMic}
                disabled={micStatus === "requesting"}
              >
                권한 허용
              </Button>
            )}
          </div>
        </section>

        <div className="space-y-3">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="api-key"
          >
            Groq API 키
          </label>
          <input
            id="api-key"
            type="password"
            value={apiKey}
            onChange={(event) => setApiKey(event.target.value)}
            placeholder="gsk_..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-400">
            API 키는 기기에만 저장되며 외부로 전송되지 않습니다.
          </p>
        </div>

        <footer className="mt-6 flex items-center gap-3">
          <Button onClick={handleSave} disabled={!apiKey.trim()}>
            저장
          </Button>
          {status === "saved" && (
            <span className="text-sm text-green-600">저장되었습니다.</span>
          )}
          {status === "error" && (
            <span className="text-sm text-red-600">저장에 실패했습니다.</span>
          )}
        </footer>
      </section>
    </main>
  );
}
