import { corpus, type Chunk } from "./corpus";

const tokenize = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s-]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1);

// Document frequency for IDF weighting, computed once at module init.
const df = new Map<string, number>();
const docTokens = corpus.map((c) => new Set(tokenize(c.text)));
for (const tokens of docTokens) {
  for (const t of tokens) df.set(t, (df.get(t) ?? 0) + 1);
}
const N = corpus.length;
const idf = (t: string) => Math.log(1 + N / (1 + (df.get(t) ?? 0)));

/**
 * Lexical retrieval (IDF-weighted token overlap) over the site corpus.
 * Deliberately dependency-free; swap for pgvector similarity when Supabase
 * credentials land — `retrieve()` keeps the same signature.
 */
export function retrieve(query: string, k = 4): Chunk[] {
  const qTokens = new Set(tokenize(query));
  if (qTokens.size === 0) return [];

  const scored = corpus.map((chunk, i) => {
    let score = 0;
    for (const t of qTokens) if (docTokens[i].has(t)) score += idf(t);
    return { chunk, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, k)
    .map((s) => s.chunk);
}
