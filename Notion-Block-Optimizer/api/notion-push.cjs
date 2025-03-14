
const { Client } = require("@notionhq/client");

module.exports = async function handler(req, res) {
  
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { apiKey, pageId } = req.body;
  if (!apiKey || !pageId) {
    return res.status(400).json({ error: "Missing API Key or Page ID" });
  }

  const notion = new Client({ auth: apiKey });

  try {
    const response = await notion.blocks.children.append({
      block_id: pageId,
      children: [
        {
          object: "block",
          paragraph: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: "🔥 Vercel Serverless Function 테스트 성공!\n\n여기에 새로운 블록이 추가됩니다.",
                },
              },
            ],
          },
        },
      ],
    });

    // ✅ CORS 문제 방지 헤더 추가
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    return res.status(200).json({ success: true, response });
  } catch (error) {
    return res.status(500).json({ error: "Failed to add block", details: error });
  }
}