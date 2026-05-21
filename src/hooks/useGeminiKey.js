import { useState, useEffect } from "react";

const STORAGE_KEY = "gemini_api_key";
const EVENT_NAME = "gemini-key-change";

/**
 * Hook quản lý API key của Gemini dùng chung trong cả app.
 * Khi update ở 1 component, các component khác tự đồng bộ qua window event.
 */
export default function useGeminiKey() {
  const [apiKey, setApiKey] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || "";
    } catch {
      return "";
    }
  });

  useEffect(() => {
    const handler = (e) => {
      setApiKey(e.detail || "");
    };
    window.addEventListener(EVENT_NAME, handler);
    return () => window.removeEventListener(EVENT_NAME, handler);
  }, []);

  const saveKey = (key) => {
    const trimmed = (key || "").trim();
    if (trimmed) localStorage.setItem(STORAGE_KEY, trimmed);
    else localStorage.removeItem(STORAGE_KEY);
    setApiKey(trimmed);
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: trimmed }));
  };

  return { apiKey, saveKey, hasKey: !!apiKey };
}

/**
 * Gọi Gemini API trực tiếp.
 * @param {string} apiKey
 * @param {string} systemPrompt - hướng dẫn cho AI
 * @param {string} userPrompt - nội dung user gửi
 * @param {object} opts - { jsonMode, temperature, maxTokens }
 */
export async function callGemini(apiKey, systemPrompt, userPrompt, opts = {}) {
  const { jsonMode = false, temperature = 0.5, maxTokens = 1200 } = opts;

  const body = {
    contents: [{ role: "user", parts: [{ text: userPrompt }] }],
    systemInstruction: { parts: [{ text: systemPrompt }] },
    generationConfig: {
      temperature,
      maxOutputTokens: maxTokens,
      ...(jsonMode && { responseMimeType: "application/json" }),
    },
  };

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Gemini API ${res.status}: ${text.slice(0, 200)}`);
  }

  const data = await res.json();
  const raw = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

  if (jsonMode) {
    // Strip markdown fence nếu có
    const cleaned = raw.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, "").trim();
    try {
      return JSON.parse(cleaned);
    } catch (e) {
      throw new Error("Gemini trả về JSON không hợp lệ: " + cleaned.slice(0, 200));
    }
  }

  return raw;
}
