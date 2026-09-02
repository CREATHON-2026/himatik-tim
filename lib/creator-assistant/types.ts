/**
 * Type definitions for Ask Gifteria Creator Assistant
 */

import type { 
  CreatorKnowledgeArticle, 
  MessageAnswerStatus, 
  KnowledgeStatus, 
  RiskLevel 
} from "@prisma/client";

export type { CreatorKnowledgeArticle, MessageAnswerStatus, KnowledgeStatus, RiskLevel };

export interface RetrievedKnowledge {
  article: CreatorKnowledgeArticle;
  score: number;
  matchedKeywords: string[];
}

export interface RetrievalResult {
  results: RetrievedKnowledge[];
  hasApprovedKnowledge: boolean;
  highestScore: number;
  threshold: number;
}

export interface UserContext {
  isAuthenticated: boolean;
  userId?: string;
  userEmail?: string;
  hasCreatorProfile: boolean;
  creatorStatus?: string | null;
  hasActiveApplication?: boolean;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ActionConfig {
  key: string;
  label: string;
  href: string;
  variant: "default" | "outline" | "secondary" | "ghost" | "accent";
  requiresAuth?: boolean;
  visibilityRule?: (ctx: UserContext) => boolean;
}

export interface SSEMetaEvent {
  conversationId: string;
  sources: Array<{
    id: string;
    title: string;
    category: string;
    version: number;
    riskLevel: RiskLevel;
  }>;
  actions: string[];
}

export interface SSEDeltaEvent {
  delta: string;
}

export interface SSEDoneEvent {
  messageId: string;
  answerStatus: MessageAnswerStatus;
}

export interface SSEErrorEvent {
  error: string;
}

export interface PromptContext {
  approvedKnowledge: string;
  safeUserContext: string;
  boundedConversation: string;
}

export interface GroundingMetrics {
  totalArticles: number;
  highestScore: number;
  averageScore: number;
  hasHighRiskArticle: boolean;
}
