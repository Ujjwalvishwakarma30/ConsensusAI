import { NextResponse } from "next/server";
import { askModel } from "@/lib/openrouter";
import { MODELS } from "@/lib/models";
import { generateSummary } from "@/lib/summarizer";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const results = await Promise.allSettled(
      MODELS.map(async (m) => {
        try {
          const result = await askModel(
            m.model,
            prompt
          );

          return {
            model: m.name,
            answer: result.answer,
            latency: result.latency,
          };
        } catch {
          return {
            model: m.name,
            answer:
              "❌ Model unavailable or insufficient credits.",
            latency: 0,
          };
        }
      })
    );

    const responses = results
      .filter(
        (
          r
        ): r is PromiseFulfilledResult<{
          model: string;
          answer: string;
          latency: number;
        }> => r.status === "fulfilled"
      )
      .map((r) => r.value);

    const summary = await generateSummary(
      prompt,
      responses
    );

    return NextResponse.json({
      success: true,
      responses,
      summary,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to get responses",
      },
      { status: 500 }
    );
  }
}