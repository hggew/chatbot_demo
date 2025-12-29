// /api/ollama.js
export default async function handler(req, res) {
  // POST 요청만 처리
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // 발급받으신 Cloudflare 임시 주소
    const CLOUDFLARE_URL = "https://seems-recommendations-silence-eat.trycloudflare.com";

    const response = await fetch(`${CLOUDFLARE_URL}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: `Ollama Error: ${errorText}` });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Vercel Proxy Error:", error);
    res.status(500).json({ error: "사내 AI 서버에 연결할 수 없습니다. 터널 실행 여부를 확인하세요." });
  }
}