"use client";

/**
 * Conversation Detail Page with Order Brief
 * Desktop: Chat | Order Brief Panel (right side)
 * Mobile: Tabs between Chat and Order Brief
 */

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { MessageSquare, FileText, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrderBriefPanel } from "@/components/order-brief";
import { useOrderBrief } from "@/components/order-brief";
import { useToast } from "@/components/ui/use-toast";

export default function ConversationPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const conversationId = params.conversationId as string;
  
  const [isMobile, setIsMobile] = useState(false);

  const {
    snapshot,
    completeness,
    clarifications,
    status,
    isLoading,
    isCompiling,
    isRefreshing,
    error,
    fetchBrief,
    compileBrief,
    refreshBrief,
    updateField,
  } = useOrderBrief({
    conversationId,
    onSuccess: () => {
      toast({
        title: "Berhasil",
        description: "Order Brief telah diperbarui",
      });
    },
    onError: (err) => {
      toast({
        title: "Error",
        description: err,
        variant: "destructive",
      });
    },
  });

  // Check if mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Fetch brief on mount
  useEffect(() => {
    if (conversationId) {
      fetchBrief();
    }
  }, [conversationId, fetchBrief]);

  const handleCompile = async () => {
    try {
      await compileBrief();
    } catch (err) {
      // Error handled by hook
    }
  };

  const handleRefresh = async () => {
    try {
      await refreshBrief();
    } catch (err) {
      // Error handled by hook
    }
  };

  const handleFieldEdit = async (fieldPath: string, value: unknown) => {
    try {
      await updateField(fieldPath, value);
    } catch (err) {
      // Error handled by hook
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] bg-[#FAFAF9]">
      {/* Header */}
      <div className="flex-shrink-0 px-4 py-3 border-b bg-white">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/dashboard/messages")}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Kembali
          </Button>

          <div className="flex-1">
            <h1 className="text-lg font-semibold text-gray-900">
              Percakapan
            </h1>
            <p className="text-xs text-gray-600">ID: {conversationId.slice(0, 8)}...</p>
          </div>

          {/* Mobile tab indicator */}
          {isMobile && (
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-md font-medium">
                {completeness.missingFields.length} perlu dilengkapi
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {isMobile ? (
          // Mobile: Tabs
          <Tabs defaultValue="chat" className="h-full flex flex-col">
            <TabsList className="w-full justify-start rounded-none border-b">
              <TabsTrigger value="chat" className="flex-1">
                <MessageSquare className="w-4 h-4 mr-2" />
                Chat
              </TabsTrigger>
              <TabsTrigger value="brief" className="flex-1">
                <FileText className="w-4 h-4 mr-2" />
                Order Brief
                {completeness.missingFields.length > 0 && (
                  <span className="ml-2 px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded text-xs">
                    {completeness.missingFields.length}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="flex-1 m-0 overflow-hidden">
              <ChatArea conversationId={conversationId} />
            </TabsContent>

            <TabsContent value="brief" className="flex-1 m-0 overflow-hidden">
              <OrderBriefPanel
                snapshot={snapshot}
                completeness={completeness}
                clarifications={clarifications}
                status={status}
                isCompiling={isCompiling || isRefreshing}
                onCompile={handleCompile}
                onRefresh={handleRefresh}
                onFieldEdit={handleFieldEdit}
                className="h-full"
              />
            </TabsContent>
          </Tabs>
        ) : (
          // Desktop: Side by side
          <div className="flex h-full">
            {/* Chat - Left/Center */}
            <div className="flex-1 overflow-hidden">
              <ChatArea conversationId={conversationId} />
            </div>

            {/* Order Brief Panel - Right */}
            <div className="w-[400px] flex-shrink-0 border-l bg-white overflow-hidden">
              <OrderBriefPanel
                snapshot={snapshot}
                completeness={completeness}
                clarifications={clarifications}
                status={status}
                isCompiling={isCompiling || isRefreshing}
                onCompile={handleCompile}
                onRefresh={handleRefresh}
                onFieldEdit={handleFieldEdit}
                className="h-full"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Chat Area Component
 * Placeholder for actual chat implementation
 */
function ChatArea({ conversationId }: { conversationId: string }) {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="text-center py-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm">
            <MessageSquare className="w-4 h-4" />
            <span>
              Chat untuk conversation {conversationId.slice(0, 8)}...
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Sistem chat buyer-creator akan diintegrasikan di sini
          </p>
        </div>

        {/* Demo Messages */}
        <DemoMessage
          role="buyer"
          content="Halo, saya mau pesan buket wisuda"
          timestamp="10:30"
        />
        <DemoMessage
          role="creator"
          content="Halo! Untuk kapan dan acara apa bukunya?"
          timestamp="10:32"
        />
        <DemoMessage
          role="buyer"
          content="Untuk wisuda saya hari Sabtu besok. Budget sekitar 150 ribu. Warna soft ya"
          timestamp="10:35"
        />
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0 p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Ketik pesan..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            disabled
          />
          <Button disabled>Kirim</Button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Chat interface akan diintegrasikan dengan sistem conversation yang sudah ada
        </p>
      </div>
    </div>
  );
}

function DemoMessage({
  role,
  content,
  timestamp,
}: {
  role: "buyer" | "creator";
  content: string;
  timestamp: string;
}) {
  const isBuyer = role === "buyer";

  return (
    <div className={`flex ${isBuyer ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] px-4 py-2 rounded-lg ${
          isBuyer
            ? "bg-violet-500 text-white"
            : "bg-gray-100 text-gray-900"
        }`}
      >
        <p className="text-sm">{content}</p>
        <p
          className={`text-xs mt-1 ${
            isBuyer ? "text-violet-200" : "text-gray-500"
          }`}
        >
          {timestamp}
        </p>
      </div>
    </div>
  );
}
