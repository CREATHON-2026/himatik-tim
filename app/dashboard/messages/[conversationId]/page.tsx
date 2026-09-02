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
  const [orderBriefEnabled, setOrderBriefEnabled] = useState(true);

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
      // Disable order brief panel if database error
      if (err.includes('does not exist') || err.includes('P2021')) {
        setOrderBriefEnabled(false);
      }
      // Don't show error toast for expected 404
      if (!err.includes('NOT_FOUND') && !err.includes('does not exist')) {
        toast({
          title: "Error",
          description: err,
          variant: "destructive",
        });
      }
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

  // Fetch brief on mount (only if enabled)
  useEffect(() => {
    if (conversationId && orderBriefEnabled) {
      fetchBrief();
    }
  }, [conversationId, orderBriefEnabled, fetchBrief]);

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
            onClick={() => router.back()}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Kembali
          </Button>

          <div className="flex-1">
            <h1 className="text-lg font-semibold text-gray-900">
              Chat dengan Creator
            </h1>
            <p className="text-xs text-gray-600">Diskusikan detail pesanan Anda</p>
          </div>

          {/* Mobile tab indicator */}
          {isMobile && orderBriefEnabled && completeness.missingFields.length > 0 && (
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
          // Mobile: Tabs (or just chat if order brief disabled)
          orderBriefEnabled ? (
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
            // Just chat without tabs
            <div className="h-full">
              <ChatArea conversationId={conversationId} />
            </div>
          )
        ) : (
          // Desktop: Side by side or full width chat
          <div className="flex h-full">
            {/* Chat - Left/Center */}
            <div className={orderBriefEnabled ? "flex-1 overflow-hidden" : "w-full max-w-4xl mx-auto overflow-hidden"}>
              <ChatArea conversationId={conversationId} />
            </div>

            {/* Order Brief Panel - Right (only if enabled) */}
            {orderBriefEnabled && (
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
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Chat Area Component
 * Interactive chat with local state (backend integration pending)
 */
function ChatArea({ conversationId }: { conversationId: string }) {
  const [messages, setMessages] = React.useState<Array<{role: "buyer" | "creator", content: string, timestamp: string}>>([]);
  const [inputMessage, setInputMessage] = React.useState("");
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    const now = new Date();
    const timestamp = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    setMessages(prev => [...prev, {
      role: "buyer",
      content: inputMessage,
      timestamp
    }]);
    setInputMessage("");

    // Simulate creator response after a delay
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: "creator",
        content: "Terima kasih atas pesannya! Creator akan segera merespons.",
        timestamp: `${now.getHours().toString().padStart(2, '0')}:${(now.getMinutes() + 1).toString().padStart(2, '0')}`
      }]);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Info Banner */}
      <div className="px-4 py-2 bg-blue-50 border-b border-blue-100">
        <p className="text-xs text-blue-700 text-center">
          <span className="font-semibold">💡 Mode Demo:</span> Chat ini berfungsi dengan state lokal. Integrasi backend sedang dalam pengembangan.
        </p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-violet-100 mb-4">
              <MessageSquare className="w-8 h-8 text-violet-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Mulai Percakapan dengan Creator
            </h3>
            <p className="text-sm text-gray-600 max-w-md mx-auto mb-2">
              Tanyakan tentang produk, diskusikan detail pesanan, atau minta saran dari creator.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-violet-50 text-violet-700 rounded-full text-xs mt-3">
              <span className="font-medium">Conversation ID:</span>
              <code className="font-mono">{conversationId.slice(0, 16)}...</code>
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg, idx) => (
              <DemoMessage key={idx} {...msg} />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0 p-4 border-t bg-gray-50">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Ketik pesan..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={!inputMessage.trim()}
            className="px-6"
          >
            Kirim
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
          <span>💡</span>
          <span>Jelaskan acara, tanggal, budget, dan preferensi Anda untuk pesanan yang lebih detail</span>
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
