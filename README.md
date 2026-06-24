# ConsensusAI 🚀

ConsensusAI is a Multi-LLM Answer Aggregation Platform that queries multiple AI models, compares their responses, and generates an AI-powered consensus report with winner selection and confidence scoring.

## Features

* Multi-LLM response generation
* DeepSeek + GPT integration via OpenRouter
* AI-powered consensus engine
* Winner model selection
* Confidence score generation
* Latency tracking
* Markdown rendering
* Modern responsive UI
* Real-time answer comparison

## Demo Workflow

User Question

↓

DeepSeek Response

GPT Response

↓

AI Judge Engine

↓

Consensus Report

* Winner Model
* Agreement Points
* Differences
* Best Final Answer
* Confidence Score

## Tech Stack

* Next.js 16
* TypeScript
* Tailwind CSS
* OpenRouter API
* DeepSeek V3
* GPT-4o-mini

## Project Structure

```text
app/
├── api/
│   └── ask/
│       └── route.ts

lib/
├── models.ts
├── openrouter.ts
├── summarizer.ts

app/page.tsx
```

## Installation

```bash
git clone https://github.com/UjjwalVishwakarma30/ConsensusAI.git

cd ConsensusAI

npm install

npm run dev
```

Create a `.env.local` file:

```env
OPENROUTER_API_KEY=your_api_key_here
```

## Current Capabilities

* Query multiple AI models simultaneously
* Compare responses side-by-side
* Generate consensus reports
* Determine winner model
* Calculate confidence scores
* Measure model latency

## Future Enhancements

* Claude Integration
* Gemini Integration
* PDF Upload & RAG
* Chat History
* Export Reports
* Streaming Responses
* Cost Analytics Dashboard

## Author

### Ujjwal Vishwakarma

* GitHub: https://github.com/UjjwalVishwakarma30
* LinkedIn: https://www.linkedin.com/in/ujjwal-vishwakarma-362791287

## License

MIT License
