import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt } = JSON.parse(req.body);

    const response = await openai.chat.completions.create({
      model: "gpt-4o", // Ya jo bhi model aap use karna chahein
      messages: [
        { 
          role: "system", 
          content: "You are a world-class web developer. Return ONLY full, valid HTML code with Tailwind CSS. Do not include any markdown formatting like ```html. Start with <!DOCTYPE html>." 
        },
        { role: "user", content: `Create a professional website for: ${prompt}` }
      ],
    });

    res.status(200).json({ html: response.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
