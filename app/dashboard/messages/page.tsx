"use client";

/**
 * Messages Page - Chat with Order Brief
 * Layout: Sidebar | Conversation List | Chat | Order Brief Panel
 */

import React, { useState } from "react";
import { MessageSquare, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function MessagesPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] bg-[#FAFAF9]">
      {/* Page Header */}
      <div className="flex-shrink-0 px-6 py-4 border-b bg-white">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-violet-50">
            <MessageSquare className="w-5 h-5 text-violet-600" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Pesan / Chat</h1>
            <p className="text-sm text-gray-600">
              Diskusi dengan buyer dan creator
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Conversation List - Left */}
        <div className="w-80 flex-shrink-0 border-r bg-white overflow-y-auto">
          <ConversationList />
        </div>

        {/* Empty State - Center */}
        <div className="flex-1 flex items-center justify-center p-8">
          <Card className="max-w-md p-8 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center">
              <MessageSquare className="w-8 h-8 text-gray-400" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900">
                Pilih Percakapan
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                Pilih percakapan dari daftar untuk melihat chat dan Order Brief
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function ConversationList() {
  return (
    <div className="p-4 space-y-2">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-sm text-gray-700">Percakapan</h2>
        <span className="text-xs text-gray-500">0 pesan</span>
      </div>

      <div className="text-center py-8 text-sm text-gray-500">
        Belum ada percakapan
      </div>

      {/* Demo: Link to Ask Gifteria which has conversation */}
      <Card className="p-3 hover:bg-gray-50 cursor-pointer border-violet-200">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-violet-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm text-gray-900">
              Ask Gifteria (Demo)
            </h3>
            <p className="text-xs text-gray-600 truncate mt-0.5">
              Gunakan Ask Gifteria untuk demo Order Brief
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
