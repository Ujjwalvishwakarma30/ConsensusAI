"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

interface ModelResponse {
  model: string;
  answer: string;
  latency: number;
}

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [responses, setResponses] = useState<ModelResponse[]>([]);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  async function askAI() {
    if (!prompt.trim()) return;

    setLoading(true);
    setResponses([]);
    setSummary("");

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setResponses(data.responses);
        setSummary(data.summary);
      } else {
        alert("Failed to get response");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-2">
          ConsensusAI
        </h1>

        <p className="text-gray-400 mb-8">
          Compare responses from multiple AI models and generate a consensus answer.
        </p>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask anything..."
            rows={5}
            className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-4 outline-none resize-none"
          />

          <button
            onClick={askAI}
            disabled={loading}
            className="mt-4 px-6 py-3 rounded-lg bg-white text-black font-semibold hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Generating..." : "Ask AI"}
          </button>
        </div>

        {responses.length > 0 && (
          <div className="mt-8 space-y-6">
            {responses.map((response, index) => (
              <div
                key={index}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">
                    {response.model}
                  </h2>

                  <span className="text-sm text-gray-400">
                    {response.latency} ms
                  </span>
                </div>

                <div className="prose prose-invert max-w-none">
                  <ReactMarkdown>
                    {response.answer}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
          </div>
        )}

        {summary && (
          <div className="mt-8 border-2 border-green-500 bg-zinc-900 rounded-xl p-6">
            <h2 className="text-3xl font-bold mb-4 text-green-400">
              Consensus Summary
            </h2>

            <div className="prose prose-invert max-w-none">
              <ReactMarkdown>
                {summary}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}