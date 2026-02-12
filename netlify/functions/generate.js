const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.handler = async function(event, context) {
  // Sirf POST request allow karein
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { prompt } = JSON.parse(event.body);

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Ye fast aur sasta hai testing ke liye
      messages: [
        { role: "system", content: "You are a web developer. Return ONLY the HTML code for the website requested. No explanation." },
        { role: "user", content: prompt }
      ],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ html: response.choices[0].message.content }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
