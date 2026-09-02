-- CreateEnum
CREATE TYPE "OrderBriefStatus" AS ENUM ('DRAFT', 'AWAITING_REVIEW', 'PARTIALLY_AGREED', 'AGREED', 'SUPERSEDED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "OrderBriefRevisionCreatedByType" AS ENUM ('AI', 'BUYER', 'CREATOR', 'OPERATIONS');

-- CreateEnum
CREATE TYPE "OrderBriefRevisionStatus" AS ENUM ('DRAFT', 'PROPOSED', 'AGREED', 'SUPERSEDED');

-- CreateEnum
CREATE TYPE "OrderBriefConsentParty" AS ENUM ('BUYER', 'CREATOR');

-- CreateEnum
CREATE TYPE "OrderBriefFieldState" AS ENUM ('EXPLICIT', 'INFERRED_NEEDS_CONFIRMATION', 'MISSING', 'CONFLICT', 'HUMAN_CONFIRMED', 'NOT_APPLICABLE');

-- CreateTable
CREATE TABLE "order_briefs" (
    "id" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,
    "orderId" TEXT,
    "createdById" TEXT NOT NULL,
    "currentRevisionId" TEXT,
    "status" "OrderBriefStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_briefs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_brief_revisions" (
    "id" TEXT NOT NULL,
    "orderBriefId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "snapshotJson" JSONB NOT NULL,
    "snapshotHash" TEXT,
    "sourceFromMessageId" TEXT,
    "sourceThroughMessageId" TEXT,
    "createdByType" "OrderBriefRevisionCreatedByType" NOT NULL,
    "createdById" TEXT,
    "modelName" TEXT,
    "promptVersion" TEXT,
    "schemaVersion" TEXT NOT NULL DEFAULT '1.0',
    "status" "OrderBriefRevisionStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "immutableAt" TIMESTAMP(3),

    CONSTRAINT "order_brief_revisions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_brief_consents" (
    "id" TEXT NOT NULL,
    "orderBriefId" TEXT NOT NULL,
    "revisionId" TEXT NOT NULL,
    "party" "OrderBriefConsentParty" NOT NULL,
    "actorUserId" TEXT NOT NULL,
    "snapshotHash" TEXT NOT NULL,
    "agreedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_brief_consents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_brief_audit_events" (
    "id" TEXT NOT NULL,
    "orderBriefId" TEXT NOT NULL,
    "revisionId" TEXT,
    "actorUserId" TEXT,
    "eventType" TEXT NOT NULL,
    "metadataJson" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_brief_audit_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "order_brief_revisions_orderBriefId_version_key" ON "order_brief_revisions"("orderBriefId", "version");

-- CreateIndex
CREATE UNIQUE INDEX "order_brief_consents_revisionId_party_key" ON "order_brief_consents"("revisionId", "party");

-- AddForeignKey
ALTER TABLE "order_briefs" ADD CONSTRAINT "order_briefs_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_briefs" ADD CONSTRAINT "order_briefs_currentRevisionId_fkey" FOREIGN KEY ("currentRevisionId") REFERENCES "order_brief_revisions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_brief_revisions" ADD CONSTRAINT "order_brief_revisions_orderBriefId_fkey" FOREIGN KEY ("orderBriefId") REFERENCES "order_briefs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_brief_revisions" ADD CONSTRAINT "order_brief_revisions_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_brief_consents" ADD CONSTRAINT "order_brief_consents_orderBriefId_fkey" FOREIGN KEY ("orderBriefId") REFERENCES "order_briefs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_brief_consents" ADD CONSTRAINT "order_brief_consents_revisionId_fkey" FOREIGN KEY ("revisionId") REFERENCES "order_brief_revisions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_brief_consents" ADD CONSTRAINT "order_brief_consents_actorUserId_fkey" FOREIGN KEY ("actorUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_brief_audit_events" ADD CONSTRAINT "order_brief_audit_events_orderBriefId_fkey" FOREIGN KEY ("orderBriefId") REFERENCES "order_briefs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_brief_audit_events" ADD CONSTRAINT "order_brief_audit_events_revisionId_fkey" FOREIGN KEY ("revisionId") REFERENCES "order_brief_revisions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_brief_audit_events" ADD CONSTRAINT "order_brief_audit_events_actorUserId_fkey" FOREIGN KEY ("actorUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
