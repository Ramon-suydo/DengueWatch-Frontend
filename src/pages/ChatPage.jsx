import { MessageCircle, Send } from 'lucide-react';

function ChatPage() {
  return (
    <main className="flex flex-col min-h-[calc(100vh-7rem)] space-y-6 py-6 px-4 sm:px-6">
      {/* Header Section */}
      <section className="space-y-2 text-center">
        <h1 className="text-2xl font-bold text-navy">AI Assistant</h1>
        <p className="text-sm text-ink/70">
          Your dengue risk AI chatbot is coming soon.
        </p>
      </section>

      {/* Chat Icon Section */}
      <div className="flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-navy/10">
            <MessageCircle size={56} className="text-navy" />
          </div>
          <p className="text-sm text-ink/60">Chat interface coming soon</p>
        </div>
      </div>

      {/* Disabled Chat Input */}
      <div className="space-y-3">
        <div className="relative">
          <input
            className="w-full rounded-2xl border border-navy/10 bg-sand px-4 py-3.5 text-base text-ink/30 shadow-soft outline-none placeholder:text-ink/30 disabled:cursor-not-allowed"
            disabled
            placeholder="Chat coming soon..."
            type="text"
          />
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-lg bg-navy/20 text-navy/50 disabled:cursor-not-allowed"
            disabled
          >
            <Send size={16} />
          </button>
        </div>
        <p className="text-xs text-ink/50 text-center">
          Chat functionality is under development. Check back soon!
        </p>
      </div>

      {/* Bottom spacing for nav */}
      <div className="h-4" />
    </main>
  );
}

export default ChatPage;
