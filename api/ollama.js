// // /api/ollama.js
// export default async function handler(req, res) {
//   // POST 요청만 처리
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method Not Allowed' });
//   }

//   try {
//     // 발급받으신 Cloudflare 임시 주소
//     const CLOUDFLARE_URL = "https://seems-recommendations-silence-eat.trycloudflare.com";

//     const response = await fetch(`${CLOUDFLARE_URL}/api/chat`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(req.body),
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       return res.status(response.status).json({ error: `Ollama Error: ${errorText}` });
//     }

//     const data = await response.json();
//     res.status(200).json(data);
//   } catch (error) {
//     if (error === "unauthorized") {
//        return res.status(401).json({ error: "Ollama 서버 인증 오류. 서버 설정을 확인하세요." });
//     }

//     console.error("Vercel Proxy Error:", error);
//     res.status(500).json({ error: "사내 AI 서버에 연결할 수 없습니다. 터널 실행 여부를 확인하세요." });
//   }
// }

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    const CLOUDFLARE_URL = "https://seems-recommendations-silence-eat.trycloudflare.com";
    
    console.log("Ollama 요청 시작:", req.body.model);

    const response = await fetch(`${CLOUDFLARE_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    // 1. 응답 텍스트를 먼저 받습니다. (json() 바로 호출 금지)
    const responseText = await response.text();
    console.log("Ollama 응답 상태:", response.status);
    console.log("Ollama 응답 본문:", responseText);

    if (!response.ok) {
      return res.status(response.status).send(responseText);
    }

    if (!responseText) {
      return res.status(500).json({ error: "Ollama로부터 빈 응답을 받았습니다." });
    }

    // 2. 받은 텍스트를 JSON으로 파싱하여 전달
    const data = JSON.parse(responseText);
    res.status(200).json(data);

  } catch (error) {
    console.error("Vercel Proxy 내부 에러:", error);
    res.status(500).json({ error: error.message });
  }
}