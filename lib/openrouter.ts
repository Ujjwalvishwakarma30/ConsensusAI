import axios from "axios";

export async function askModel(
  model: string,
  prompt: string
) {
  try {
    const startTime = Date.now();

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const latency = Date.now() - startTime;

    return {
      answer:
        response.data.choices?.[0]?.message?.content ||
        "No response received",
      latency,
    };
  } catch (error: any) {
    console.error("\n====================");
    console.error(`MODEL FAILED: ${model}`);
    console.error("====================");

    if (error.response) {
      console.error(
        JSON.stringify(
          error.response.data,
          null,
          2
        )
      );
    } else {
      console.error(error.message);
    }

    throw error;
  }
}