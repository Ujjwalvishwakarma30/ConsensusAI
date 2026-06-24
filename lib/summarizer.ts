import { askModel } from "./openrouter";

interface ResponseData {
  model: string;
  answer: string;
}

export async function generateSummary(
  question: string,
  responses: ResponseData[]
) {
  const combinedResponses = responses
    .map(
      (response) =>
        `MODEL: ${response.model}

ANSWER:
${response.answer}`
    )
    .join("\n\n====================\n\n");

  const prompt = `
You are an expert AI evaluator and answer quality judge.

QUESTION:
${question}

MODEL RESPONSES:

${combinedResponses}

Your task is to analyze all responses and create a professional AI Consensus Report.

Instructions:

1. Identify which model provided the best overall answer.
2. Explain why that model won.
3. List key agreement points across all models.
4. List important differences between the responses.
5. Generate the best final answer by combining the strongest parts of all responses.
6. Give a confidence score from 0-100.
7. Be objective and concise.

Return your answer in EXACTLY this format:

# 🏆 Winner Model

<Model Name>

## Why It Won

<short explanation>

# 🤝 Agreement Points

- Point 1
- Point 2
- Point 3

# ⚠️ Differences

- Difference 1
- Difference 2

# ✅ Best Final Answer

<best combined answer>

# 📊 Confidence Score

<score>/100
`;

  try {
    const result = await askModel(
      "deepseek/deepseek-chat-v3",
      prompt
    );

    return result.answer;
  } catch (error) {
    console.error("Summary generation failed:", error);

    return `
# 🏆 Winner Model

Unable to determine

# 🤝 Agreement Points

Summary generation failed.

# ⚠️ Differences

Summary generation failed.

# ✅ Best Final Answer

Unable to generate consensus answer.

# 📊 Confidence Score

0/100
`;
  }
}