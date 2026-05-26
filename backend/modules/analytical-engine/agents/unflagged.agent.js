async function geminiSummarize(metrics) {
  const prompt = `Summarize this developer's 6-hour session in 1 sentences. Neutral tone.

Stats:
- Added: ${metrics.totalAdds} lines
- Deleted: ${metrics.totalDeletes} lines
- Files changed: ${metrics.filesChangedCount}
- Commits: ${metrics.messages.join(", ")}

Just factual summary. No coaching, no judgment.`;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });

  return response.text;
}
