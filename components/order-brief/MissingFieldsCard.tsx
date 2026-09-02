"use client";

/**
 * Missing Fields Card
 * Shows list of required fields that are missing
 */

import React from "react";
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface MissingFieldsCardProps {
  missingFields: string[];
}

export function MissingFieldsCard({ missingFields }: MissingFieldsCardProps) {
  if (missingFields.length === 0) return null;

  return (
    <Alert variant="destructive" className="bg-amber-50 border-amber-200">
      <AlertTriangle className="h-4 w-4 text-amber-600" />
      <AlertTitle className="text-amber-900">
        {missingFields.length} Field Belum Lengkap
      </AlertTitle>
      <AlertDescription className="text-amber-800 text-xs mt-2">
        <ul className="list-disc list-inside space-y-1">
          {missingFields.slice(0, 5).map((field) => (
            <li key={field}>{formatFieldName(field)}</li>
          ))}
          {missingFields.length > 5 && (
            <li className="text-amber-700">
              ...dan {missingFields.length - 5} field lainnya
            </li>
          )}
        </ul>
      </AlertDescription>
    </Alert>
  );
}

function formatFieldName(fieldPath: string): string {
  const [section, field] = fieldPath.split(".");
  const sectionNames: Record<string, string> = {
    product: "Produk",
    occasion: "Acara",
    visual: "Visual",
    size: "Ukuran",
    financial: "Finansial",
    personalization: "Personalisasi",
    fulfillment: "Pengiriman",
    notes: "Catatan",
  };

  const fieldNames: Record<string, string> = {
    productType: "Jenis Produk",
    quantity: "Jumlah",
    occasion: "Acara",
    buyerBudget: "Budget",
    requestedFulfillmentDate: "Tanggal Pengiriman",
    fulfillmentMethod: "Metode Pengiriman",
    originalVisualTerms: "Deskripsi Visual",
    requestedSize: "Ukuran",
  };

  const sectionLabel = sectionNames[section] || section;
  const fieldLabel = fieldNames[field] || field;

  return `${sectionLabel}: ${fieldLabel}`;
}
