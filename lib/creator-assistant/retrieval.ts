/**
 * Knowledge retrieval system for Ask Gifteria Creator Assistant
 * CRITICAL: Only retrieves APPROVED articles that are currently effective
 */

import { prisma } from "@/lib/prisma";
import type { CreatorKnowledgeArticle } from "@prisma/client";
import type { RetrievalResult, RetrievedKnowledge } from "./types";
import { RETRIEVAL_CONFIG, HIGH_RISK_PATTERNS } from "./config";
import { containsHighRiskPattern } from "./validation";

/**
 * Retrieve approved knowledge articles relevant to the user's question
 * 
 * SAFETY RULES:
 * 1. Only status = APPROVED
 * 2. effectiveFrom must be in the past or null
 * 3. expiresAt must be in the future or null
 * 4. Minimum score threshold must be met
 * 5. Higher threshold for policy/financial questions
 */
export async function retrieveKnowledge(
  question: string
): Promise<RetrievalResult> {
  const now = new Date();
  
  // Fetch only APPROVED articles that are currently effective
  const articles = await prisma.creatorKnowledgeArticle.findMany({
    where: {
      status: "APPROVED",
      OR: [
        { effectiveFrom: null },
        { effectiveFrom: { lte: now } },
      ],
      AND: [
        {
          OR: [
            { expiresAt: null },
            { expiresAt: { gte: now } },
          ],
        },
      ],
    },
    orderBy: {
      approvedAt: "desc",
    },
  });

  // If no approved knowledge exists, return empty result
  if (articles.length === 0) {
    return {
      results: [],
      hasApprovedKnowledge: false,
      highestScore: 0,
      threshold: RETRIEVAL_CONFIG.MIN_THRESHOLD,
    };
  }

  // Normalize question for matching
  const normalizedQuestion = normalizeText(question);
  const questionWords = normalizedQuestion.split(/\s+/).filter((w) => w.length > 2);
  
  // Determine if this is a high-risk question requiring stricter matching
  const isHighRisk = containsHighRiskPattern(question);
  const threshold = isHighRisk 
    ? RETRIEVAL_CONFIG.POLICY_THRESHOLD 
    : RETRIEVAL_CONFIG.MIN_THRESHOLD;

  // Score each article
  const scoredArticles: RetrievedKnowledge[] = articles
    .map((article) => {
      const score = scoreArticle(article, normalizedQuestion, questionWords);
      const matchedKeywords = extractMatchedKeywords(article, questionWords);
      
      return {
        article,
        score,
        matchedKeywords,
      };
    })
    .filter((result) => result.score >= threshold)
    .sort((a, b) => b.score - a.score)
    .slice(0, RETRIEVAL_CONFIG.MAX_ARTICLES);

  // Additional filtering for high-risk questions
  if (isHighRisk && scoredArticles.length > 0) {
    // Only keep POLICY or LEGAL_OR_FINANCIAL articles for high-risk questions
    const policyArticles = scoredArticles.filter(
      (result) => 
        result.article.riskLevel === "POLICY" || 
        result.article.riskLevel === "LEGAL_OR_FINANCIAL"
    );
    
    // If we have policy articles with good scores, use only those
    if (policyArticles.length > 0 && policyArticles[0].score >= RETRIEVAL_CONFIG.POLICY_THRESHOLD) {
      return {
        results: policyArticles,
        hasApprovedKnowledge: true,
        highestScore: policyArticles[0].score,
        threshold,
      };
    }
    
    // Otherwise, no sufficient knowledge for this high-risk question
    return {
      results: [],
      hasApprovedKnowledge: true, // Knowledge exists, but not suitable for this question
      highestScore: scoredArticles[0]?.score || 0,
      threshold,
    };
  }

  const highestScore = scoredArticles[0]?.score || 0;

  return {
    results: scoredArticles,
    hasApprovedKnowledge: articles.length > 0,
    highestScore,
    threshold,
  };
}

/**
 * Score an article's relevance to the question
 */
function scoreArticle(
  article: CreatorKnowledgeArticle,
  normalizedQuestion: string,
  questionWords: string[]
): number {
  let score = 0;
  const weights = RETRIEVAL_CONFIG.WEIGHTS;

  const normalizedTitle = normalizeText(article.title);
  const normalizedContent = normalizeText(article.content);
  const normalizedCategory = normalizeText(article.category);
  const keywords = article.keywords 
    ? article.keywords.split(",").map((k) => normalizeText(k.trim()))
    : [];

  // Exact phrase match in title (highest signal)
  if (normalizedTitle.includes(normalizedQuestion)) {
    score += weights.EXACT_PHRASE;
  }

  // Exact phrase match in content
  if (normalizedContent.includes(normalizedQuestion)) {
    score += weights.EXACT_PHRASE * 0.5;
  }

  // Title word matches
  const titleWords = normalizedTitle.split(/\s+/);
  const titleMatches = questionWords.filter((word) =>
    titleWords.includes(word)
  ).length;
  score += (titleMatches / Math.max(questionWords.length, 1)) * weights.TITLE_MATCH;

  // Keyword matches
  let keywordMatches = 0;
  for (const keyword of keywords) {
    if (normalizedQuestion.includes(keyword)) {
      keywordMatches += 2;
    } else {
      const keywordWords = keyword.split(/\s+/);
      const matches = questionWords.filter((word) => keywordWords.includes(word));
      keywordMatches += matches.length * 0.5;
    }
  }
  score += Math.min(keywordMatches, 3) * weights.KEYWORD_MATCH;

  // Category match
  if (normalizedQuestion.includes(normalizedCategory)) {
    score += weights.CATEGORY_MATCH;
  }

  // Content word matches (weak signal, capped)
  const contentWords = normalizedContent.split(/\s+/).slice(0, 200); // Limit to first 200 words
  const contentMatches = questionWords.filter((word) =>
    contentWords.includes(word)
  ).length;
  score += Math.min((contentMatches / Math.max(questionWords.length, 1)) * weights.CONTENT_MATCH, 1.0);

  // Boost for recent approvals (recency bonus)
  if (article.approvedAt) {
    const daysSinceApproval = (Date.now() - article.approvedAt.getTime()) / (1000 * 60 * 60 * 24);
    if (daysSinceApproval < 30) {
      score += 0.1;
    }
  }

  return score;
}

/**
 * Extract which keywords from the article matched the question
 */
function extractMatchedKeywords(
  article: CreatorKnowledgeArticle,
  questionWords: string[]
): string[] {
  if (!article.keywords) return [];

  const keywords = article.keywords.split(",").map((k) => k.trim());
  const matched: string[] = [];

  for (const keyword of keywords) {
    const normalizedKeyword = normalizeText(keyword);
    const keywordWords = normalizedKeyword.split(/\s+/);
    
    const hasMatch = questionWords.some((qWord) =>
      keywordWords.includes(qWord)
    );
    
    if (hasMatch) {
      matched.push(keyword);
    }
  }

  return matched.slice(0, 5); // Limit to 5 matched keywords
}

/**
 * Normalize text for matching
 */
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/[^\w\s]/g, " ") // Replace non-word chars with space
    .replace(/\s+/g, " ") // Collapse multiple spaces
    .trim();
}

/**
 * Format retrieved knowledge for prompt context
 */
export function formatKnowledgeForPrompt(results: RetrievedKnowledge[]): string {
  if (results.length === 0) {
    return "Tidak ada knowledge resmi yang tersedia.";
  }

  return results
    .map((result, index) => {
      const article = result.article;
      return `
[ARTICLE ${index + 1}]
Title: ${article.title}
Category: ${article.category}
Risk Level: ${article.riskLevel}
Version: ${article.version}
Approved: ${article.approvedAt?.toISOString().split("T")[0] || "N/A"}
Effective From: ${article.effectiveFrom?.toISOString().split("T")[0] || "Immediately"}
Expires: ${article.expiresAt?.toISOString().split("T")[0] || "No expiry"}

Content:
${article.content}

Allowed Actions: ${article.allowedActionKeys ? JSON.stringify(article.allowedActionKeys) : "[]"}
---
`.trim();
    })
    .join("\n\n");
}

/**
 * Check if retrieval result is sufficient to answer the question
 */
export function isSufficientKnowledge(
  result: RetrievalResult,
  question: string
): boolean {
  // No approved knowledge at all
  if (!result.hasApprovedKnowledge) {
    return false;
  }

  // No results passed threshold
  if (result.results.length === 0) {
    return false;
  }

  // High-risk questions require high-risk articles
  const isHighRisk = containsHighRiskPattern(question);
  if (isHighRisk) {
    const hasPolicyArticle = result.results.some(
      (r) => 
        r.article.riskLevel === "POLICY" || 
        r.article.riskLevel === "LEGAL_OR_FINANCIAL"
    );
    
    if (!hasPolicyArticle) {
      return false;
    }
    
    // Require higher score for policy questions
    if (result.highestScore < RETRIEVAL_CONFIG.POLICY_THRESHOLD) {
      return false;
    }
  }

  return true;
}

/**
 * Get summary of sources for metadata event
 */
export function getSourcesSummary(results: RetrievedKnowledge[]) {
  return results.map((result) => ({
    id: result.article.id,
    title: result.article.title,
    category: result.article.category,
    version: result.article.version,
    riskLevel: result.article.riskLevel,
  }));
}
