// 이 코드는 클라이언트(브라우저)가 아닌 Vercel 서버에서 실행됩니다.
// 따라서 브라우저의 CORS 및 사설망 접근 제한(Private Network Access)을 우회할 수 있습니다.

export default async function handler(req, res) {
  // POST 요청만 허용
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // 사내 서버 주소로 요청 전달
    const response = await fetch("http://172.21.21.13:11435/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Ollama Server Error: ${errorText}`);
    }

    const data = await response.json();
    // 클라이언트에 결과 반환
    res.status(200).json(data);
  } catch (error) {
    console.error("Proxy Error:", error);
    res.status(500).json({ error: error.message });
  }
}