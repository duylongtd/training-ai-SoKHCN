import { useState, useEffect } from "react";

/**
 * Gọi Gemini qua server proxy /api/gemini.
 * API key nằm ở biến môi trường GEMINI_API_KEY phía server,
 * browser KHÔNG bao giờ thấy.
 */
export async function callGemini(systemPrompt, userPrompt, opts = {}) {
  const { jsonMode = false, temperature = 0.5, maxTokens = 1200 } = opts;

  const res = await fetch("/api/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ systemPrompt, userPrompt, jsonMode, temperature, maxTokens }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const err = new Error(data.error || `Server lỗi ${res.status}`);
    err.status = res.status;
    err.serverNotConfigured = res.status === 503;
    err.details = data.details || "";
    throw err;
  }

  const text = data.text || "";

  if (jsonMode) {
    const cleaned = text
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/```\s*$/, "")
      .trim();
    try {
      return JSON.parse(cleaned);
    } catch (e) {
      throw new Error("JSON không hợp lệ: " + cleaned.slice(0, 200));
    }
  }

  return text;
}

/**
 * Hook check xem server đã cấu hình key chưa.
 * Lần đầu mount: gọi 1 request thử để biết server có key.
 * Cache kết quả trong sessionStorage để không gọi lại nhiều lần.
 */
export default function useGeminiKey() {
  const [hasKey, setHasKey] = useState(() => {
    try {
      const cached = sessionStorage.getItem("ai_server_has_key");
      return cached === "1";
    } catch {
      return false;
    }
  });
  const [checked, setChecked] = useState(() => {
    try {
      return sessionStorage.getItem("ai_server_has_key") !== null;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (checked) return;
    // Health check: gửi request rỗng để xem server có key không
    fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userPrompt: "ping", maxTokens: 5 }),
    })
      .then((r) => {
        const has = r.status !== 503 && r.status !== 404;
        setHasKey(has);
        setChecked(true);
        try {
          sessionStorage.setItem("ai_server_has_key", has ? "1" : "0");
        } catch {}
      })
      .catch(() => {
        setHasKey(false);
        setChecked(true);
        try {
          sessionStorage.setItem("ai_server_has_key", "0");
        } catch {}
      });
  }, [checked]);

  return { hasKey, checked, apiKey: "server-managed", saveKey: () => {} };
}
