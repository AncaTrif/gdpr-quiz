const express = require('express');
const Anthropic = require('@anthropic-ai/sdk');
const path = require('path');

const app = express();
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/bonus-question', async (req, res) => {
  try {
    const response = await client.messages.create({
      model: 'claude-opus-4-8',
      max_tokens: 1024,
      thinking: { type: 'adaptive' },
      messages: [{
        role: 'user',
        content: `Generate one unique quiz question about GDPR or EU AI Act compliance for a technical interview prep tool.

Return ONLY a valid JSON object with this exact structure (no markdown, no explanation):
{
  "tag": "gdpr" | "euai" | "both",
  "q": "question text",
  "opts": ["Option A text", "Option B text", "Option C text", "Option D text"],
  "correct": 0,
  "law": "Art. X: brief citation.",
  "take": "Practical takeaway in 1-2 sentences."
}

Rules:
- "correct" is the 0-based index into "opts" of the right answer
- The correct answer must be genuinely correct and legally accurate
- The wrong options must be plausible but clearly wrong on reflection
- "law" cites the specific article and its principle
- "take" is a practical compliance tip
- Do NOT repeat common questions about 72-hour breach notification, Art. 5(1)(e) storage limitation, Art. 4(5) pseudonymisation, or subliminal techniques
- Make it challenging but fair`
      }]
    });

    const text = response.content.find(b => b.type === 'text')?.text || '';
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return res.status(500).json({ error: 'Failed to parse question from Claude response' });
    }
    const question = JSON.parse(jsonMatch[0]);
    res.json(question);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
