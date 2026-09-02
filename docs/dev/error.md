12:25:01 PM: Netlify Build                                                 
12:25:01 PM: ────────────────────────────────────────────────────────────────
12:25:01 PM: ​
12:25:01 PM: ❯ Version
12:25:01 PM:   @netlify/build 36.4.4
12:25:01 PM: ​
12:25:01 PM: ❯ Flags
12:25:01 PM:   accountId: 69522c5f613264ea9898fa36
12:25:01 PM:   baseRelDir: true
12:25:01 PM:   buildId: 6a97a50e36b40c00080bc45f
12:25:01 PM:   deployId: 6a97a50e36b40c00080bc461
12:25:01 PM: ​
12:25:01 PM: ❯ Current directory
12:25:01 PM:   /opt/build/repo
12:25:01 PM: ​
12:25:01 PM: ❯ Config file
12:25:01 PM:   No config file was defined: using default values.
12:25:01 PM: ​
12:25:01 PM: ❯ Context
12:25:01 PM:   production
12:25:01 PM: ​
12:25:01 PM: ❯ Using Next.js Runtime - v5.15.13
12:25:03 PM: Next.js cache restored
12:25:03 PM: ​
12:25:03 PM: Build command from Netlify app                                
12:25:03 PM: ────────────────────────────────────────────────────────────────
12:25:03 PM: ​
12:25:03 PM: $ npm run build
12:25:03 PM: > creathon@0.1.0 build
12:25:03 PM: > next build
12:25:04 PM: ▲ Next.js 16.3.4 (Turbopack)
12:25:04 PM: ✓ Running next.config.ts took 34ms
12:25:04 PM:   Creating an optimized production build ...
12:25:21 PM: > Build error occurred
12:25:21 PM: Error: Turbopack build failed with 15 errors:
12:25:21 PM: ./app/checkout/page.tsx:6:60
12:25:21 PM: Error: Module not found: Can't resolve '@tanstack/react-query'
12:25:21 PM:    4 | import Link from "next/link";
12:25:21 PM:    5 | import Image from "next/image";
12:25:21 PM: >  6 | import { useRouter, useSearchParams } from "next/navigation";
12:25:21 PM:      |                                                            ^
12:25:21 PM: >  7 | import { useQuery } from "@tanstack/react-query";
12:25:21 PM:      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
12:25:21 PM:    8 | import {
12:25:21 PM:    9 |   ArrowLeft,
12:25:21 PM:   10 |   Sparkles,
12:25:21 PM: Import traces:
12:25:21 PM:   Client Component Browser:
12:25:21 PM:     ./app/checkout/page.tsx [Client Component Browser]
12:25:21 PM:     ./app/checkout/page.tsx [Server Component]
12:25:21 PM:   Client Component SSR:
12:25:21 PM:     ./app/checkout/page.tsx [Client Component SSR]
12:25:21 PM:     ./app/checkout/page.tsx [Server Component]
12:25:21 PM: https://nextjs.org/docs/messages/module-not-found
12:25:21 PM: ./app/dashboard/creator/orders/[id]/page.tsx:6:1
12:25:21 PM: Error: Module not found: Can't resolve '@tanstack/react-query'
12:25:21 PM:   4 | import Link from "next/link";
12:25:21 PM:   5 | import Image from "next/image";
12:25:21 PM: > 6 | import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
12:25:21 PM:     | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
12:25:21 PM:   7 | import {
12:25:21 PM:   8 |   ArrowLeft,
12:25:21 PM:   9 |   Clock,
12:25:21 PM: Import traces:
12:25:21 PM:   Client Component Browser:
12:25:21 PM:     ./app/dashboard/creator/orders/[id]/page.tsx [Client Component Browser]
12:25:21 PM:     ./app/dashboard/creator/orders/[id]/page.tsx [Server Component]
12:25:21 PM:   Client Component SSR:
12:25:21 PM:     ./app/dashboard/creator/orders/[id]/page.tsx [Client Component SSR]
12:25:21 PM:     ./app/dashboard/creator/orders/[id]/page.tsx [Server Component]
12:25:21 PM: https://nextjs.org/docs/messages/module-not-found
12:25:21 PM: ./app/dashboard/creator/orders/page.tsx:4:1
12:25:21 PM: Error: Module not found: Can't resolve '@tanstack/react-query'
12:25:21 PM:   2 |
12:25:21 PM:   3 | import * as React from "react";
12:25:21 PM: > 4 | import { useQuery } from "@tanstack/react-query";
12:25:21 PM:     | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
12:25:21 PM:   5 | import {
12:25:21 PM:   6 |   Search,
12:25:21 PM:   7 |   ClipboardList,
12:25:21 PM: Import traces:
12:25:21 PM:   Client Component Browser:
12:25:21 PM:     ./app/dashboard/creator/orders/page.tsx [Client Component Browser]
12:25:21 PM:     ./app/dashboard/creator/orders/page.tsx [Server Component]
12:25:21 PM:   Client Component SSR:
12:25:21 PM:     ./app/dashboard/creator/orders/page.tsx [Client Component SSR]
12:25:21 PM:     ./app/dashboard/creator/orders/page.tsx [Server Component]
12:25:21 PM: https://nextjs.org/docs/messages/module-not-found
12:25:21 PM: ./app/dashboard/creator/payout/page.tsx:3:39
12:25:21 PM: Error: Module not found: Can't resolve '@tanstack/react-query'
12:25:21 PM:   1 | ﻿"use client";
12:25:21 PM:   2 |
12:25:21 PM: > 3 | import React, { useState } from "react";
12:25:21 PM:     |                                       ^
12:25:21 PM: > 4 | import { useQuery } from "@tanstack/react-query";
12:25:21 PM:     | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
12:25:21 PM:   5 | import { Wallet, RefreshCw, Info, HelpCircle } from "lucide-react";
12:25:21 PM:   6 | import { getPayoutDashboardData } from "@/features/payout/api";
12:25:21 PM:   7 | import { PayoutBalanceHeader } from "@/features/payout/components/PayoutBalanceHeader";
12:25:21 PM: Import traces:
12:25:21 PM:   Client Component Browser:
12:25:21 PM:     ./app/dashboard/creator/payout/page.tsx [Client Component Browser]
12:25:21 PM:     ./app/dashboard/creator/payout/page.tsx [Server Component]
12:25:21 PM:   Client Component SSR:
12:25:21 PM:     ./app/dashboard/creator/payout/page.tsx [Client Component SSR]
12:25:21 PM:     ./app/dashboard/creator/payout/page.tsx [Server Component]
12:25:21 PM: https://nextjs.org/docs/messages/module-not-found
12:25:21 PM: ./app/dashboard/creator/products/[id]/page.tsx:5:1
12:25:21 PM: Error: Module not found: Can't resolve '@tanstack/react-query'
12:25:21 PM:   3 | import * as React from "react";
12:25:21 PM:   4 | import { useRouter } from "next/navigation";
12:25:21 PM: > 5 | import { useMutation } from "@tanstack/react-query";
12:25:21 PM:     | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
12:25:21 PM:   6 | import { toast } from "sonner";
12:25:21 PM:   7 | import { ArrowLeft, Sparkles, Flower2, Archive } from "lucide-react";
12:25:21 PM:   8 |
12:25:21 PM: Import traces:
12:25:21 PM:   Client Component Browser:
12:25:21 PM:     ./app/dashboard/creator/products/[id]/page.tsx [Client Component Browser]
12:25:21 PM:     ./app/dashboard/creator/products/[id]/page.tsx [Server Component]
12:25:21 PM:   Client Component SSR:
12:25:21 PM:     ./app/dashboard/creator/products/[id]/page.tsx [Client Component SSR]
12:25:21 PM:     ./app/dashboard/creator/products/[id]/page.tsx [Server Component]
12:25:21 PM: https://nextjs.org/docs/messages/module-not-found
12:25:21 PM: ./app/dashboard/creator/profile/page.tsx:6:1
12:25:21 PM: Error: Module not found: Can't resolve '@tanstack/react-query'
12:25:21 PM:   4 | import { ArrowLeft, Sparkles, Pencil } from "lucide-react";
12:25:21 PM:   5 | import Link from "next/link";
12:25:21 PM: > 6 | import { useQueryClient } from "@tanstack/react-query";
12:25:21 PM:     | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
12:25:21 PM:   7 | import { Button } from "@/components/ui/button";
12:25:21 PM:   8 | import { CreatorProfileForm } from "@/features/creator-profile/components/CreatorProfileForm";
12:25:21 PM:   9 | import { CreatorProfileView } from "@/features/creator-profile/components/CreatorProfileView";
12:25:21 PM: Import traces:
12:25:21 PM:   Client Component Browser:
12:25:21 PM:     ./app/dashboard/creator/profile/page.tsx [Client Component Browser]
12:25:21 PM:     ./app/dashboard/creator/profile/page.tsx [Server Component]
12:25:21 PM:   Client Component SSR:
12:25:21 PM:     ./app/dashboard/creator/profile/page.tsx [Client Component SSR]
12:25:21 PM:     ./app/dashboard/creator/profile/page.tsx [Server Component]
12:25:21 PM: https://nextjs.org/docs/messages/module-not-found
12:25:21 PM: ./app/katalog/[id]/page.tsx:6:1
12:25:21 PM: Error: Module not found: Can't resolve '@tanstack/react-query'
12:25:21 PM:   4 | import Link from "next/link";
12:25:21 PM:   5 | import { useRouter } from "next/navigation";
12:25:21 PM: > 6 | import { useQuery } from "@tanstack/react-query";
12:25:21 PM:     | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
12:25:21 PM:   7 | import {
12:25:21 PM:   8 |   ShieldCheck,
12:25:21 PM:   9 |   Heart,
12:25:21 PM: Import traces:
12:25:21 PM:   Client Component Browser:
12:25:21 PM:     ./app/katalog/[id]/page.tsx [Client Component Browser]
12:25:21 PM:     ./app/katalog/[id]/page.tsx [Server Component]
12:25:21 PM:   Client Component SSR:
12:25:21 PM:     ./app/katalog/[id]/page.tsx [Client Component SSR]
12:25:21 PM:     ./app/katalog/[id]/page.tsx [Server Component]
12:25:21 PM: https://nextjs.org/docs/messages/module-not-found
12:25:21 PM: ./app/katalog/page.tsx:5:30
12:25:21 PM: Error: Module not found: Can't resolve '@tanstack/react-query'
12:25:21 PM:   3 | import * as React from "react";
12:25:21 PM:   4 | import Link from "next/link";
12:25:21 PM: > 5 | import Image from "next/image";
12:25:21 PM:     |                              ^
12:25:21 PM: > 6 | import { useQuery } from "@tanstack/react-query";
12:25:21 PM:     | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
12:25:21 PM:   7 | import {
12:25:21 PM:   8 |   Sparkles,
12:25:21 PM:   9 |   Search,
12:25:21 PM: Import traces:
12:25:21 PM:   Client Component Browser:
12:25:21 PM:     ./app/katalog/page.tsx [Client Component Browser]
12:25:21 PM:     ./app/katalog/page.tsx [Server Component]
12:25:21 PM:   Client Component SSR:
12:25:21 PM:     ./app/katalog/page.tsx [Client Component SSR]
12:25:21 PM:     ./app/katalog/page.tsx [Server Component]
12:25:21 PM: https://nextjs.org/docs/messages/module-not-found
12:25:21 PM: ./app/orders/[id]/page.tsx:6:1
12:25:21 PM: Error: Module not found: Can't resolve '@tanstack/react-query'
12:25:21 PM:   4 | import Link from "next/link";
12:25:21 PM:   5 | import Image from "next/image";
12:25:21 PM: > 6 | import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
12:25:21 PM:     | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
12:25:21 PM:   7 | import {
12:25:21 PM:   8 |   Sparkles,
12:25:21 PM:   9 |   CheckCircle2,
12:25:21 PM: Import traces:
12:25:21 PM:   Client Component Browser:
12:25:21 PM:     ./app/orders/[id]/page.tsx [Client Component Browser]
12:25:21 PM:     ./app/orders/[id]/page.tsx [Server Component]
12:25:21 PM:   Client Component SSR:
12:25:21 PM:     ./app/orders/[id]/page.tsx [Client Component SSR]
12:25:21 PM:     ./app/orders/[id]/page.tsx [Server Component]
12:25:21 PM: https://nextjs.org/docs/messages/module-not-found
12:25:21 PM: ./components/providers/query-provider.tsx:4:1
12:25:21 PM: Error: Module not found: Can't resolve '@tanstack/react-query'
12:25:21 PM:   2 |
12:25:21 PM:   3 | import * as React from "react";
12:25:21 PM: > 4 | import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
12:25:21 PM:     | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
12:25:21 PM:   5 | import { Toaster } from "sonner";
12:25:21 PM:   6 |
12:25:21 PM:   7 | export function QueryProvider({ children }: { children: React.ReactNode }) {
12:25:21 PM: Import trace:
12:25:21 PM:   Server Component:
12:25:21 PM:     ./components/providers/query-provider.tsx
12:25:21 PM:     ./app/layout.tsx
12:25:21 PM: https://nextjs.org/docs/messages/module-not-found
12:25:21 PM: ./features/creator-profile/hooks/useCreatorProfile.ts:14:1
12:25:21 PM: Error: Module not found: Can't resolve '@tanstack/react-query'
12:25:21 PM:   12 | "use client";
12:25:21 PM:   13 |
12:25:21 PM: > 14 | import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
12:25:21 PM:      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
12:25:21 PM:   15 | import * as profileApi from "../api";
12:25:21 PM:   16 | import type { CreatorProfile, UpdateProfileInput } from "../types";
12:25:21 PM:   17 |
12:25:21 PM: Import traces:
12:25:21 PM:   Client Component Browser:
12:25:21 PM:     ./features/creator-profile/hooks/useCreatorProfile.ts [Client Component Browser]
12:25:21 PM:     ./app/dashboard/creator/profile/page.tsx [Client Component Browser]
12:25:21 PM:     ./app/dashboard/creator/profile/page.tsx [Server Component]
12:25:21 PM:   Client Component SSR:
12:25:21 PM:     ./features/creator-profile/hooks/useCreatorProfile.ts [Client Component SSR]
12:25:21 PM:     ./app/dashboard/creator/profile/page.tsx [Client Component SSR]
12:25:21 PM:     ./app/dashboard/creator/profile/page.tsx [Server Component]
12:25:21 PM: https://nextjs.org/docs/messages/module-not-found
12:25:21 PM: ./features/orders/components/CreatorOrderCard.tsx:5:30
12:25:21 PM: Error: Module not found: Can't resolve '@tanstack/react-query'
12:25:21 PM:   3 | import * as React from "react";
12:25:21 PM:   4 | import Link from "next/link";
12:25:21 PM: > 5 | import Image from "next/image";
12:25:21 PM:     |                              ^
12:25:21 PM: > 6 | import { useMutation, useQueryClient } from "@tanstack/react-query";
12:25:21 PM:     | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
12:25:21 PM:   7 | import {
12:25:21 PM:   8 |   Clock,
12:25:21 PM:   9 |   CheckCircle2,
12:25:21 PM: Import traces:
12:25:21 PM:   Client Component Browser:
12:25:21 PM:     ./features/orders/components/CreatorOrderCard.tsx [Client Component Browser]
12:25:21 PM:     ./app/dashboard/creator/orders/page.tsx [Client Component Browser]
12:25:21 PM:     ./app/dashboard/creator/orders/page.tsx [Server Component]
12:25:21 PM:   Client Component SSR:
12:25:21 PM:     ./features/orders/components/CreatorOrderCard.tsx [Client Component SSR]
12:25:21 PM:     ./app/dashboard/creator/orders/page.tsx [Client Component SSR]
12:25:21 PM:     ./app/dashboard/creator/orders/page.tsx [Server Component]
12:25:21 PM: https://nextjs.org/docs/messages/module-not-found
12:25:21 PM: ./features/payout/components/BankAccountCard.tsx:6:1
12:25:21 PM: Error: Module not found: Can't resolve '@tanstack/react-query'
12:25:21 PM:   4 | import { Building2, Edit2, CheckCircle2, X } from "lucide-react";
12:25:21 PM:   5 | import { toast } from "sonner";
12:25:21 PM: > 6 | import { useMutation, useQueryClient } from "@tanstack/react-query";
12:25:21 PM:     | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
12:25:21 PM:   7 | import { updateBankAccount } from "../api";
12:25:21 PM:   8 | import { BankAccount } from "../types";
12:25:21 PM:   9 |
12:25:21 PM: Import traces:
12:25:21 PM:   Client Component Browser:
12:25:21 PM:     ./features/payout/components/BankAccountCard.tsx [Client Component Browser]
12:25:21 PM:     ./app/dashboard/creator/payout/page.tsx [Client Component Browser]
12:25:21 PM:     ./app/dashboard/creator/payout/page.tsx [Server Component]
12:25:21 PM:   Client Component SSR:
12:25:21 PM:     ./features/payout/components/BankAccountCard.tsx [Client Component SSR]
12:25:21 PM:     ./app/dashboard/creator/payout/page.tsx [Client Component SSR]
12:25:21 PM:     ./app/dashboard/creator/payout/page.tsx [Server Component]
12:25:21 PM: https://nextjs.org/docs/messages/module-not-found
12:25:21 PM: ./features/payout/components/RequestPayoutModal.tsx:6:1
12:25:21 PM: Error: Module not found: Can't resolve '@tanstack/react-query'
12:25:21 PM:   4 | import { X, Building2, AlertCircle, ArrowRight } from "lucide-react";
12:25:21 PM:   5 | import { toast } from "sonner";
12:25:21 PM: > 6 | import { useMutation, useQueryClient } from "@tanstack/react-query";
12:25:21 PM:     | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
12:25:21 PM:   7 | import { requestPayout } from "../api";
12:25:21 PM:   8 | import { BankAccount } from "../types";
12:25:21 PM:   9 |
12:25:21 PM: Import traces:
12:25:21 PM:   Client Component Browser:
12:25:21 PM:     ./features/payout/components/RequestPayoutModal.tsx [Client Component Browser]
12:25:21 PM:     ./app/dashboard/creator/payout/page.tsx [Client Component Browser]
12:25:21 PM:     ./app/dashboard/creator/payout/page.tsx [Server Component]
12:25:21 PM:   Client Component SSR:
12:25:21 PM:     ./features/payout/components/RequestPayoutModal.tsx [Client Component SSR]
12:25:21 PM:     ./app/dashboard/creator/payout/page.tsx [Client Component SSR]
12:25:21 PM:     ./app/dashboard/creator/payout/page.tsx [Server Component]
12:25:21 PM: https://nextjs.org/docs/messages/module-not-found
12:25:21 PM: ./features/products/hooks/useCreatorProduct.ts:7:1
12:25:21 PM: Error: Module not found: Can't resolve '@tanstack/react-query'
12:25:21 PM:    5 | "use client";
12:25:21 PM:    6 |
12:25:21 PM: >  7 | import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
12:25:21 PM:      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
12:25:21 PM:    8 | import * as productApi from "../api";
12:25:21 PM:    9 | import type { Product, UpdateProductInput } from "../types";
12:25:21 PM:   10 |
12:25:21 PM: Import traces:
12:25:21 PM:   Client Component Browser:
12:25:21 PM:     ./features/products/hooks/useCreatorProduct.ts [Client Component Browser]
12:25:21 PM:     ./app/dashboard/creator/products/[id]/page.tsx [Client Component Browser]
12:25:21 PM:     ./app/dashboard/creator/products/[id]/page.tsx [Server Component]
12:25:21 PM:   Client Component SSR:
12:25:21 PM:     ./features/products/hooks/useCreatorProduct.ts [Client Component SSR]
12:25:21 PM:     ./app/dashboard/creator/products/[id]/page.tsx [Client Component SSR]
12:25:21 PM:     ./app/dashboard/creator/products/[id]/page.tsx [Server Component]
12:25:21 PM: https://nextjs.org/docs/messages/module-not-found
12:25:21 PM:     at <unknown> (./app/checkout/page.tsx:6:60)
12:25:21 PM:     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
12:25:21 PM:     at <unknown> (./app/dashboard/creator/orders/[id]/page.tsx:6:1)
12:25:21 PM:     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
12:25:21 PM:     at <unknown> (./app/dashboard/creator/orders/page.tsx:4:1)
12:25:21 PM:     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
12:25:21 PM:     at <unknown> (./app/dashboard/creator/payout/page.tsx:3:39)
12:25:21 PM:     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
12:25:21 PM:     at <unknown> (./app/dashboard/creator/products/[id]/page.tsx:5:1)
12:25:21 PM:     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
12:25:21 PM:     at <unknown> (./app/dashboard/creator/profile/page.tsx:6:1)
12:25:21 PM:     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
12:25:21 PM:     at <unknown> (./app/katalog/[id]/page.tsx:6:1)
12:25:21 PM:     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
12:25:21 PM:     at <unknown> (./app/katalog/page.tsx:5:30)
12:25:21 PM:     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
12:25:21 PM:     at <unknown> (./app/orders/[id]/page.tsx:6:1)
12:25:21 PM:     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
12:25:21 PM:     at <unknown> (./components/providers/query-provider.tsx:4:1)
12:25:21 PM:     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
12:25:21 PM:     at <unknown> (./features/creator-profile/hooks/useCreatorProfile.ts:14:1)
12:25:21 PM:     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
12:25:21 PM:     at <unknown> (./features/orders/components/CreatorOrderCard.tsx:5:30)
12:25:21 PM:     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
12:25:21 PM:     at <unknown> (./features/payout/components/BankAccountCard.tsx:6:1)
12:25:21 PM:     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
12:25:21 PM:     at <unknown> (./features/payout/components/RequestPayoutModal.tsx:6:1)
12:25:21 PM:     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
12:25:21 PM:     at <unknown> (./features/products/hooks/useCreatorProduct.ts:7:1)
12:25:21 PM:     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
12:25:21 PM: ​
12:25:21 PM: "build.command" failed                                        
12:25:21 PM: ────────────────────────────────────────────────────────────────
12:25:21 PM: ​
12:25:21 PM:   Error message
12:25:21 PM:   Command failed with exit code 1: npm run build (https://ntl.fyi/exit-code-1)
12:25:21 PM: ​
12:25:21 PM:   Error location
12:25:21 PM:   In Build command from Netlify app:
12:25:21 PM:   npm run build
12:25:21 PM: ​
12:25:21 PM:   Resolved config
12:25:21 PM:   build:
12:25:21 PM:     command: npm run build
12:25:21 PM:     commandOrigin: ui
12:25:21 PM:     environment:
12:25:21 PM:       - DATABASE_URL
12:25:21 PM:       - DIRECT_URL
12:25:21 PM:       - NEXT_PUBLIC_SUPABASE_ANON_KEY
12:25:21 PM:       - NEXT_PUBLIC_SUPABASE_URL
12:25:21 PM:       - OPENROUTER_API_KEY
12:25:21 PM:     publish: /opt/build/repo/.next
12:25:21 PM:     publishOrigin: ui
12:25:21 PM:   plugins:
12:25:21 PM:     - inputs: {}
12:25:21 PM:       origin: ui
12:25:21 PM:       package: "@netlify/plugin-nextjs"
12:25:21 PM: Build failed due to a user error: Build script returned non-zero exit code: 2
12:25:22 PM: Failed during stage 'building site': Build script returned non-zero exit code: 2 (https://ntl.fyi/exit-code-2)
12:25:22 PM: Failing build: Failed to build site
12:25:22 PM: Finished processing build request in 34.776s