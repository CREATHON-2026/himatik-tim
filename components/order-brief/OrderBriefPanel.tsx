"use client";

/**
 * Order Brief Panel - Main Container
 * Displays structured brief with evidence and clarifications
 */

import React from "react";
import { cn } from "@/lib/utils";
import { AlertCircle, Sparkles } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OrderBriefHeader } from "./OrderBriefHeader";
import { OrderBriefField } from "./OrderBriefField";
import { MissingFieldsCard } from "./MissingFieldsCard";
import { ClarificationQuestions } from "./ClarificationQuestions";
import { CompletenessIndicator } from "./CompletenessIndicator";
import { DISCLAIMERS } from "@/lib/order-brief/config";
import type {
  OrderBriefSnapshot,
  BriefCompleteness,
  ClarificationQuestion,
} from "@/lib/order-brief/types";

interface OrderBriefPanelProps {
  snapshot: OrderBriefSnapshot | null;
  completeness: BriefCompleteness;
  clarifications: ClarificationQuestion[];
  status: "DRAFT" | "AWAITING_REVIEW" | "AGREED";
  isCompiling?: boolean;
  onCompile?: () => void;
  onRefresh?: () => void;
  onFieldEdit?: (fieldPath: string, value: unknown) => void;
  className?: string;
}

export function OrderBriefPanel({
  snapshot,
  completeness,
  clarifications,
  status,
  isCompiling = false,
  onCompile,
  onRefresh,
  onFieldEdit,
  className,
}: OrderBriefPanelProps) {
  if (!snapshot) {
    return (
      <div className={cn("flex flex-col h-full p-4 space-y-4", className)}>
        <OrderBriefHeader
          title="Order Brief"
          status={status}
          completeness={completeness}
        />

        <Card className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-violet-50 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-violet-600" />
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Order Brief Belum Dibuat</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              AI akan merangkum percakapan Anda menjadi spesifikasi pesanan yang
              terstruktur dengan evidence dari setiap field.
            </p>
          </div>

          {onCompile && (
            <Button
              onClick={onCompile}
              disabled={isCompiling}
              className="mt-4"
            >
              {isCompiling ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                  Menyusun Brief...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Susun Brief dengan AI
                </>
              )}
            </Button>
          )}

          <Alert className="mt-4 text-left">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-xs">
              {DISCLAIMERS.AI_EXTRACTION_NOTICE}
            </AlertDescription>
          </Alert>
        </Card>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col h-full overflow-hidden", className)}>
      {/* Header */}
      <div className="flex-shrink-0 p-4 border-b bg-white">
        <OrderBriefHeader
          title="Order Brief"
          status={status}
          completeness={completeness}
          onRefresh={onRefresh}
          isRefreshing={isCompiling}
        />

        {/* Draft Disclaimer */}
        {status === "DRAFT" && (
          <Alert className="mt-3 bg-amber-50 border-amber-200">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-xs text-amber-800">
              {DISCLAIMERS.DRAFT_DISCLAIMER}
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Completeness Indicator */}
        <CompletenessIndicator completeness={completeness} />

        {/* Missing Fields Alert */}
        {completeness.missingFields.length > 0 && (
          <MissingFieldsCard missingFields={completeness.missingFields} />
        )}

        {/* Clarification Questions */}
        {clarifications.length > 0 && (
          <ClarificationQuestions questions={clarifications} />
        )}

        {/* Product Section */}
        {snapshot.product && (
          <BriefSection title="Produk">
            <OrderBriefField
              label="Jenis Produk"
              fieldPath="product.productType"
              field={snapshot.product.productType}
              onEdit={onFieldEdit}
            />
            <OrderBriefField
              label="Jumlah"
              fieldPath="product.quantity"
              field={snapshot.product.quantity}
              onEdit={onFieldEdit}
            />
          </BriefSection>
        )}

        {/* Occasion Section */}
        {snapshot.occasion && (
          <BriefSection title="Acara & Penerima">
            <OrderBriefField
              label="Acara"
              fieldPath="occasion.occasion"
              field={snapshot.occasion.occasion}
              onEdit={onFieldEdit}
            />
            <OrderBriefField
              label="Deskripsi Penerima"
              fieldPath="occasion.recipientDescription"
              field={snapshot.occasion.recipientDescription}
              onEdit={onFieldEdit}
            />
          </BriefSection>
        )}

        {/* Visual Section */}
        {snapshot.visual && (
          <BriefSection title="Preferensi Visual">
            <OrderBriefField
              label="Deskripsi Visual"
              fieldPath="visual.originalVisualTerms"
              field={snapshot.visual.originalVisualTerms}
              onEdit={onFieldEdit}
            />
            <OrderBriefField
              label="Warna"
              fieldPath="visual.colorPreference"
              field={snapshot.visual.colorPreference}
              onEdit={onFieldEdit}
            />
            <OrderBriefField
              label="Gaya"
              fieldPath="visual.stylePreference"
              field={snapshot.visual.stylePreference}
              onEdit={onFieldEdit}
            />
          </BriefSection>
        )}

        {/* Size Section */}
        {snapshot.size && (
          <BriefSection title="Ukuran">
            <OrderBriefField
              label="Ukuran yang Diminta"
              fieldPath="size.requestedSize"
              field={snapshot.size.requestedSize}
              onEdit={onFieldEdit}
            />
            <OrderBriefField
              label="Dimensi"
              fieldPath="size.dimensions"
              field={snapshot.size.dimensions}
              onEdit={onFieldEdit}
            />
          </BriefSection>
        )}

        {/* Financial Section */}
        {snapshot.financial && (
          <BriefSection title="Finansial">
            <OrderBriefField
              label="Budget Buyer"
              fieldPath="financial.buyerBudget"
              field={snapshot.financial.buyerBudget}
              onEdit={onFieldEdit}
              formatValue={(v) =>
                v ? `Rp${Number(v).toLocaleString("id-ID")}` : null
              }
            />
            <OrderBriefField
              label="Harga Creator"
              fieldPath="financial.creatorQuotedPrice"
              field={snapshot.financial.creatorQuotedPrice}
              formatValue={(v) =>
                v ? `Rp${Number(v).toLocaleString("id-ID")}` : null
              }
              readOnly
            />
          </BriefSection>
        )}

        {/* Personalization Section */}
        {snapshot.personalization && (
          <BriefSection title="Personalisasi">
            <OrderBriefField
              label="Teks Kartu"
              fieldPath="personalization.cardText"
              field={snapshot.personalization.cardText}
              onEdit={onFieldEdit}
            />
            <OrderBriefField
              label="Nama Kustom"
              fieldPath="personalization.customName"
              field={snapshot.personalization.customName}
              onEdit={onFieldEdit}
            />
          </BriefSection>
        )}

        {/* Fulfillment Section */}
        {snapshot.fulfillment && (
          <BriefSection title="Pengiriman">
            <OrderBriefField
              label="Tanggal Diminta"
              fieldPath="fulfillment.requestedFulfillmentDate"
              field={snapshot.fulfillment.requestedFulfillmentDate}
              onEdit={onFieldEdit}
            />
            <OrderBriefField
              label="Tanggal Komitmen Creator"
              fieldPath="fulfillment.creatorCommittedDate"
              field={snapshot.fulfillment.creatorCommittedDate}
              readOnly
            />
            <OrderBriefField
              label="Metode"
              fieldPath="fulfillment.fulfillmentMethod"
              field={snapshot.fulfillment.fulfillmentMethod}
              onEdit={onFieldEdit}
            />
            <OrderBriefField
              label="Area Pengiriman"
              fieldPath="fulfillment.deliveryArea"
              field={snapshot.fulfillment.deliveryArea}
              onEdit={onFieldEdit}
            />
          </BriefSection>
        )}

        {/* Notes Section */}
        {snapshot.notes && (
          <BriefSection title="Catatan Tambahan">
            <OrderBriefField
              label="Catatan Khusus"
              fieldPath="notes.specialNotes"
              field={snapshot.notes.specialNotes}
              onEdit={onFieldEdit}
            />
          </BriefSection>
        )}
      </div>
    </div>
  );
}

function BriefSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="p-4 space-y-3">
      <h3 className="font-semibold text-sm text-gray-900">{title}</h3>
      <div className="space-y-3">{children}</div>
    </Card>
  );
}
