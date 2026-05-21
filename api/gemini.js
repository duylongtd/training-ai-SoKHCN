// Vercel Serverless Function — chạy ở server, key ẩn hoàn toàn với browser
// File này tự động deploy thành endpoint POST /api/gemini

export default async function handler(req, res) {
  // CORS cho dev (vercel dev hoặc local)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Chỉ chấp nhận POST" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({
      error: "Server chưa cấu hình GEMINI_API_KEY",
      hint: "Admin cần đặt biến môi trường GEMINI_API_KEY trong Vercel dashboard hoặc file .env.local khi chạy local",
    });
  }

  const body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});
  const {
    systemPrompt,
    userPrompt,
    jsonMode = false,
    temperature = 0.5,
    maxTokens = 1200,
    model = "gemini-2.5-flash",
  } = body;

  if (!userPrompt || typeof userPrompt !== "string") {
    return res.status(400).json({ error: "Thiếu userPrompt (chuỗi)" });
  }

  try {
    const payload = {
      contents: [{ role: "user", parts: [{ text: userPrompt }] }],
      ...(systemPrompt && {
        systemInstruction: { parts: [{ text: systemPrompt }] },
      }),
      generationConfig: {
        temperature,
        maxOutputTokens: maxTokens,
        ...(jsonMode && { responseMimeType: "application/json" }),
      },
    };

    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (!r.ok) {
      const errText = await r.text();
      return res.status(r.status).json({
        error: `Gemini API trả ${r.status}`,
        details: errText.slice(0, 400),
      });
    }

    const data = await r.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    return res.status(200).json({ text });
  } catch (e) {
    console.error("[/api/gemini] Error:", e);
    return res.status(500).json({ error: String(e.message || e) });
  }
}
